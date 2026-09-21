# Quy trình dựng video (Vox-style xé giấy) bằng Remotion

Repo sản xuất NHIỀU video, mỗi video xác định bằng 1 slug ngắn không dấu (vd `an-le-64`). Mọi
nội dung riêng của 1 video nằm trong thư mục con `videos/<slug>/` bên trong từng nhóm
(`content/`, `public/`, `planning/`, `pipeline/`, `src/`). Phần dùng CHUNG cho mọi video (style
DNA, component, theme, script pipeline) nằm ở gốc của từng nhóm, không lặp lại theo video.

## Input cần nhận từ bạn (cho MỖI video mới, slug ví dụ `<slug>`)
- **Audio sạch**: đặt vào `public/videos/<slug>/audio/narration.mp3`
- **Script video**: đặt vào `content/videos/<slug>/script.txt`
- **Media nguồn** (ảnh/video): đặt vào `public/videos/<slug>/media/images/` và `public/videos/<slug>/media/videos/`
- **Style DNA**: dùng CHUNG cho mọi video, đã có sẵn ở `planning/style-dna/` — chỉ cần đọc/điều chỉnh (xem `planning/style-dna-integration.md`), không tạo lại cho từng video. File/asset tham chiếu style (texture giấy, font mẫu...) đặt vào `public/style/` (cũng dùng chung).

## Các bước dựng 1 video (chạy với `--video=<slug>` ở mọi script `.router.mjs`/`08-sync-root.mjs`)
1. `scripts/01-audio-transcribe.local.mjs` — transcribe audio thô (whisper.cpp local).
2. `scripts/02-audio-clean-transcript.router.mjs --script=... --audio=...` — sửa/align transcript, ghi `public/videos/<slug>/captions/captions.json`.
3. `scripts/03-media-analyze.router.mjs --video=<slug>` — phân tích + chuẩn hoá tên media nguồn, ghi `pipeline/videos/<slug>/media-analysis/manifest.json`.
4. *(bỏ qua nếu style DNA đã có sẵn/dùng chung — xem ghi chú "Vì sao không có `scripts/04-*`" trong `responsibility-matrix.md`)*
5. `scripts/05-scene-plan.router.mjs --video=<slug>` — lập Scene Plan, ghi `planning/videos/<slug>/scene-plan.json`/`.md`.
6. `scripts/06-shotlist.router.mjs --video=<slug>` — lập Shotlist, ghi `planning/videos/<slug>/shotlist.json`/`.md`.
7. `scripts/07-codegen.router.mjs --video=<slug> --scenes=SNN` — sinh code từng scene (generator→verify→reviewer→retry), tự động ráp `src/Root.tsx` sau mỗi scene (trừ khi `--no-root-sync` để chạy song song nhiều scene, xem ghi chú trong `responsibility-matrix.md`).
8. `scripts/08-sync-root.mjs --video=<slug>` — chỉ cần chạy tay khi dùng chế độ song song ở bước 7.
9. Preview bằng `npm run dev` (Remotion Studio), chọn đúng composition id (PascalCase của slug, vd `AnLe64`).
10. Render bằng `npx remotion render <CompositionId> out/<slug>-full.mp4` (chỉ khi được yêu cầu render chính thức).

## Tối ưu render (Stage 8) — đã đo thật, không đoán (2026-09-20/21)
Trước đây `remotion.config.ts` không cấu hình `concurrency`/`hardware-acceleration` gì cả, nên
mỗi lần render rơi vào mặc định của Remotion (`min(8, cores/2)` = 8 trên máy này, Xeon E5-2629 v3
8 core/16 thread). Đã audit bằng `npx remotion benchmark` (công cụ chính thức của Remotion) +
1 lần render full video thật để kiểm chứng, thay vì đoán:
- Benchmark mẫu 300 frame (`AnLe64Phan2`, 2 vòng đo độc lập): concurrency=8 (mặc định cũ) luôn
  là mốc CHẬM NHẤT trong mọi mốc test (4/8/12/16 và 2/3/4/6); concurrency≈3-4 nhất quán nhanh
  nhất qua cả 2 vòng dù có nhiễu thời gian tuyệt đối giữa 2 lần chạy khác thời điểm.
- `--hardware-acceleration=if-possible` (NVENC, RTX 1660 Super) đo riêng ở concurrency=4: KHÔNG
  tạo khác biệt đo được so với không bật (69.5s vs 68.8s, trong khoảng nhiễu) — đúng như docs
  Remotion: hardware-acceleration chỉ tăng tốc bước ENCODE, không tăng tốc phần Chromium
  render/composite từng frame (bottleneck thật ở đây) — không bật, tránh thêm phức tạp
  (CRF không tương thích hardware-acceleration, phải đổi qua video-bitrate, file nặng hơn) mà
  không đổi lại gì.
- Render FULL video thật (`AnLe64Phan2`, 1628 frame/54.27s) để kiểm chứng cuối: baseline (mặc
  định cũ) **5m45.587s**, concurrency=4 **5m33.704s** — cải thiện thật nhưng khiêm tốn (~3.4%),
  KHÔNG lớn như benchmark mẫu 300 frame gợi ý (~20%). Output 2 bản ffprobe xác nhận giống hệt
  (duration/resolution/codec), không đổi chất lượng.
- **Kết luận**: đã set `Config.setConcurrency(4)` trong `remotion.config.ts` — thắng nhỏ, an
  toàn, áp dụng mặc định cho mọi render sau này. Mức ~5.8-6.4x thời lượng thật (54s video ~5m45s
  render) nhiều khả năng là chi phí VỐN CÓ của kiến trúc render Chromium-per-frame + decode
  video nguồn của Remotion trên 1 máy, không phải lỗi cấu hình — không có cờ nào trong tài liệu
  Remotion khắc phục được mức này. Đường duy nhất tài liệu Remotion mô tả cho tăng tốc theo bậc
  độ lớn là **Remotion Lambda** (render phân tán trên nhiều máy cloud song song) — chưa triển
  khai (cần AWS + phát sinh chi phí cloud), để bạn quyết định nếu muốn theo hướng đó sau.

## Trạng thái hiện tại
- [x] Scaffold dự án Remotion (blank template)
- [x] Cài skill Remotion (`.agents/skills/`, `.claude/skills/`)
- [x] Khung điều phối 9router (`scripts/lib/router-client.mjs`, `scripts/model-routing.json`, đã test thật)
- [x] Backup checkpoint lên GitHub (2026-09-20) — commit `685f606`, `origin/main`.
- [x] Audit toàn diện + tham số hoá pipeline theo `--video=<slug>` để sản xuất hàng loạt (2026-09-20) — mọi script `03/05/06/07/08` nhận `--video=`, cấu trúc thư mục chuyển sang `videos/<slug>/` trong từng nhóm (`content/`, `public/`, `planning/`, `pipeline/`, `src/`). Chi tiết đầy đủ tại `C:\Users\DTL\.claude\plans\b-n-c-th-c-i-vast-dragonfly.md`.
- [ ] **Đang di trú kiến trúc Remotion → HyperFrames** (chạy song song, không cutover cứng) cho video MỚI trở đi — 4 video Remotion hiện có giữ nguyên làm archive. Giai đoạn A-D đã xong và đạt (Checkpoint D: 6.2/10, xác nhận bằng vision agent 9router). Giai đoạn E (video 5 "ban-an-473-phan-1", 2026-09-21) — codegen (14 scene, `scripts/07-codegen-hf-parallel.mjs` concurrency=10, mới tạo) + render đã xong (`hyperframes check` ok=true, 101.833s khớp audio), **đang chờ người dùng xem & xác nhận đạt** trước khi coi Checkpoint E hoàn tất. Chi tiết đầy đủ + bài học kỹ thuật: memory dự án (`project_vox_style_xe_giay`, `feedback_incremental_buildout`) và `C:\Users\DTL\.claude\plans\repo-d-ng-video-e2e-kind-flamingo.md`.

### Video "an-le-64" (video đầu tiên, đã hoàn chỉnh và đã migrate vào cấu trúc mới)
- [x] Nhận script + audio + media + style DNA (2026-09-20). PDF bản án sẽ cung cấp sau, chưa cần cho giai đoạn hiện tại.
- [x] Phân tích media nguồn qua 9router[vision] (2026-09-20) — 14 asset đã mô tả + gắn tag + chuẩn hoá tên file (`img-NN-slug`/`vid-NN-slug`). Xem `pipeline/videos/an-le-64/media-analysis/manifest.json`. Ảnh dùng làm nền, không cutout (theo yêu cầu người dùng).
- [x] Transcribe audio (whisper.cpp local) + sửa transcript qua 9router (2026-09-20) — dùng script gốc làm ground truth để align, khớp 100%. Xem `public/videos/an-le-64/captions/captions.json`.
- [x] Scene Plan (2026-09-20) — 7 scene, xem `planning/videos/an-le-64/scene-plan.md`/`.json`.
- [x] Shotlist (2026-09-20) — 14 shot / 7 scene, xem `planning/videos/an-le-64/shotlist.md`/`.json`.
- [x] Caption — `public/videos/an-le-64/captions/captions.json`, hiển thị qua `src/components/Captions.tsx` (mount 1 lần ở `Root.tsx`, dùng chung mọi video, nhận `src` qua prop).
- [x] Dựng composition (code Remotion qua 9router) (2026-09-20) — 7 scene PASS, tsc+eslint sạch toàn dự án. Composition `AnLe64`, 1480 frames (49.34s), 1080×1920@30fps.
- [x] Render bản đầy đủ không lỗi (2026-09-20, đã audit sửa xong) — `out/an-le-64-full.mp4`, **49.39s** (khớp đúng audio thật 49.343s). Đã qua audit 4 lỗi từ bản demo đầu (z-index/caption, audio timestamp, pacing S06-S08 → gộp còn S05-S07) + 3 vòng sửa lỗi runtime `interpolate()`/boxShadow. **Người dùng đã xem & xác nhận đạt** (2026-09-20).
- [x] Migrate vào cấu trúc `videos/<slug>/` đa-video (2026-09-20) — di chuyển toàn bộ file, sửa import/staticFile path, render lại xác nhận vẫn đúng 49.39s, không lỗi.

### Video "an-le-64-phan-2" (video thứ 2, đã hoàn chỉnh)
- [x] Toàn bộ pipeline end-to-end (2026-09-20) — script/audio/media do người dùng cung cấp thủ công. Composition `AnLe64Phan2`, 7 scene, 1628 frames (54.27s), 1080×1920@30fps. `out/an-le-64-phan-2-full.mp4` render **54.31s** không lỗi. Chi tiết đầy đủ ở `pipeline/videos/an-le-64-phan-2/run-log.md` và memory dự án.

### Video "tham-hoa-itaewon-phan-1" (video thứ 3, đã hoàn chỉnh — lần đầu dùng Stage 2b Flow media-agent trong sản xuất thật)
- [x] Nhận script + audio (2026-09-20) từ `Vox style 3.1_test/.../tham hoa itaewon/phan1` — không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp) + align với script gốc qua 9router (2026-09-20) — 441/441 caption khớp đúng số từ script, 0 cảnh báo audio dính đoạn khác. **Sửa lỗi thật phát hiện qua video này**: `scripts/02-audio-clean-transcript.router.mjs` bị tràn token (JSON cắt cụt giữa chừng) với script dài do model "thinking" ẩn tốn hàng chục nghìn token reasoning không nằm trong tầm kiểm soát của tham số `maxTokens` phía client — sửa tận gốc bằng cơ chế tự chia đôi đệ quy khi phát hiện tràn (`finish_reason=max_tokens`/parse lỗi), không cần đoán trước ngưỡng an toàn. Video 1/2 (227 từ) không gặp vì đủ nhỏ lọt 1 lần gọi.
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-20) — 6 ảnh + 5 video (720×1280, 8.0s/clip), lần đầu chạy Stage 2b thật trong pipeline sản xuất (trước đó mới test bằng slug tạm).
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-20) — 11/11 asset.
- [x] Scene Plan (2026-09-20) — 13 scene, dùng đủ 11/11 asset, tất cả ≥5.5s (đạt ngưỡng pacing rút ra từ video 1).
- [x] Shotlist (2026-09-20) — 13 shot / 13 scene.
- [x] Dựng composition qua 9router (2026-09-20) — 13/13 scene PASS ngay lần thử đầu (chạy song song concurrency=3), tsc+eslint sạch. Composition `ThamHoaItaewonPhan1`, 3031 frames (101.03s), 1080×1920@30fps.
- [x] Render bản đầy đủ không lỗi (2026-09-20) — `out/tham-hoa-itaewon-phan-1-full.mp4`, **101.08s** (khớp audio thật 101.13s).

### Video "tham-hoa-itaewon-phan-2" (video thứ 4, đã hoàn chỉnh — lần đầu chạy Stage 7 song song ở quy mô 16 scene, phát hiện 1 bug race condition thật)
- [x] Nhận script + audio (2026-09-20) từ `Vox style 3.1_test/.../tham hoa itaewon/phan2` — không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp) + align với script gốc qua 9router (2026-09-20) — 562/562 caption khớp đúng số từ script (script dài nhất từ trước tới nay, 124s audio), cơ chế tự chia đôi khi tràn token (xây cho video 3) hoạt động đúng như thiết kế.
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-20) — 7 ảnh + 7 video (720×1280, 8.0s/clip).
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-20) — 14/14 asset.
- [x] Scene Plan (2026-09-20) — 16 scene, dùng đủ 14/14 asset, tất cả ≥5.3s.
- [x] Shotlist (2026-09-20) — 17 shot / 16 scene.
- [x] Dựng composition qua 9router (2026-09-20) — chạy song song concurrency=3 lần đầu ở quy mô 16 scene, phát hiện + sửa tận gốc 1 bug race condition thật trong `scripts/07-codegen.router.mjs`: `verify()` trước đây quét `tsc`/`eslint --fix` trên TOÀN BỘ `src/` kể cả ở chế độ `--no-root-sync`, khiến verify() của 1 scene có thể bắt/ghi đè nhầm file của scene khác đang sinh dở cùng lúc (xác nhận thật: scene S01 bị báo lỗi nằm trong file của scene S03). Fix: scope `eslint` vào đúng file vừa ghi, lọc output `tsc` chỉ giữ lỗi của đúng file đó. Sau khi sửa: 4 scene lỗi (1 do race đã tự hết, 3 lỗi nội dung thật sửa qua `--issue-file`) đều PASS, 16/16 scene PASS, tsc+eslint sạch. Composition `ThamHoaItaewonPhan2`, 3718 frames (123.93s), 1080×1920@30fps. (Giữa chừng cũng gặp lỗi hạn mức tài khoản ChatGPT/Codex đứng sau model `cx/gpt-5.6-sol` — không phải lỗi trong repo, người dùng tự reset hạn mức.)
- [x] Render bản đầy đủ không lỗi (2026-09-20) — `out/tham-hoa-itaewon-phan-2-full.mp4`, **123.99s** (khớp audio thật 124.19s).

### Video "ban-an-473-phan-1" (video thứ 5, Giai đoạn E — video đầu tiên dựng qua nhánh HyperFrames)
- [x] Nhận script + audio (2026-09-21) từ `Vox style 3.1_test/.../Bản án số 473/Phan1` — không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp) + align với script gốc qua 9router (2026-09-21) — 395/395 caption khớp đúng thời lượng audio thật (101.810s). Sửa 1 lỗi thật phát hiện qua video này: `scripts/02-audio-clean-transcript.router.mjs` thiếu `mkdirSync` trước khi ghi output (khác Stage 1 đã có) — chỉ lộ ra khi thư mục `captions/` của video mới chưa tồn tại, đã vá tận gốc.
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-21) — 6 ảnh + 6 video (768×1376/720×1280, 8.0s/clip). Gặp 1 lỗi thật: Flow Agent gộp 6 prompt thành 1 ảnh khổ ngang 16:9 duy nhất (kiểu collage) thay vì 6 ảnh dọc riêng biệt — phát hiện bằng `ffprobe` đo width/height (không xem ảnh trực tiếp). Đã sửa `buildScenePromptListMessage()` nêu tường minh số ảnh + khổ dọc + cấm gộp, xem `planning/responsibility-matrix.md` mục 2b. Lần retry Giai đoạn 2 (tạo chuyển động) đầu tiên bị Flow báo lỗi hệ thống "video failed to generate" (không tính phí) cho cả 6 video — thêm flag `--retry-animate` vào `02b-media-generate.router.mjs` để tạo lại đúng bước 2 trên project đã có ảnh đúng mà không tốn credit tạo ảnh lại, lần 2 thành công 6/6.
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-21) — 12/12 asset.
- [x] Scene Plan (2026-09-21) — 14 scene, dùng đủ 12/12 asset (2 scene text-only theo thiết kế).
- [x] Shotlist (2026-09-21) — 15 shot / 14 scene.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-21) — lần đầu chạy `scripts/07-codegen.hf.router.mjs` ở quy mô thật (không phải project test) và lần đầu có bản song song `scripts/07-codegen-hf-parallel.mjs` (mới viết, mirror đúng `07-codegen-parallel.mjs` bên Remotion, concurrency=10). S01 fail 3 lần đầu (contrast WCAG AA không đạt, rồi lỗi `querySelector` dùng template literal khiến bundler crash) — bổ sung 2 gotcha cứng vào `KNOWN_GOTCHAS_HF`, PASS ngay sau đó. 13 scene còn lại chạy song song concurrency=10: 13/13 PASS trong ngân sách tự động retry (S03/S08 2 lần, S14 3 lần), không cần `--issue-file` can thiệp tay. `hyperframes check` trên project đã ráp (14/14 scene): ok=true, lint 0 lỗi/20 cảnh báo cosmetic, runtime/layout/contrast sạch.
- [x] Render bản đầy đủ (2026-09-21) — `out/ban-an-473-phan-1-full.mp4`, **101.833s** (khớp audio thật 101.810s), 1080×1920 h264/aac. Người dùng xem, xác nhận **chất lượng vượt mong đợi, ít lỗi vặt hơn cả 4 video Remotion trước** — nhưng phát hiện 1 lỗi thật: phụ đề karaoke hoàn toàn không xuất hiện suốt video.
- [x] Chẩn đoán + sửa lỗi thiếu phụ đề (2026-09-21) — 2 nguyên nhân gốc chồng nhau, cả 2 đều generalize cho MỌI video sau này (không riêng video này), xem chi tiết + bài học đầy đủ trong `run-log.md` và memory `feedback_incremental_buildout`:
  1. `compositions/caption-track.html` (Giai đoạn A) trước đây chỉ tồn tại viết tay cho project test `an-le-64`, chưa từng được sinh tất định cho video thật — viết mới `scripts/lib/generate-caption-track-hf.mjs` (port đúng `applyFourWordPageBreaks()` + dùng thẳng `createTikTokStyleCaptions()` của `@remotion/captions`), gọi tự động trong `syncRootHf()`.
  2. Phụ đề vẫn bị che khuất đúng bằng thời lượng scene S01 (0-10.68s) — do `.clip` trong `index.html` thiếu `isolation: isolate`, khiến z-index nội bộ 1 scene (vd `.brand-bottom-bar` z-index:20) thoát stacking context, đè lên slot `caption-track` ở stacking context gốc trang. Đã thêm `isolation: isolate` vào `.clip` trong `sync-root-hf-lib.mjs` — cô lập vĩnh viễn cho mọi slot/video.
  - Xác minh cuối bằng vision agent (9router) trực tiếp trên file MP4 render lại: 10/10 mốc giây 1→101 đều thấy phụ đề + karaoke-highlight đúng.
- [ ] **Checkpoint E**: đang chờ người dùng xem lại bản đã sửa phụ đề và xác nhận đạt.
