# Quy trình dựng video (Vox-style xé giấy) bằng HyperFrames

Repo sản xuất NHIỀU video, mỗi video xác định bằng 1 slug ngắn không dấu (vd `ban-an-473-phan-1`).
Mọi nội dung riêng của 1 video nằm trong thư mục con `videos/<slug>/` bên trong từng nhóm
(`content/`, `public/`, `planning/`, `pipeline/`, `hyperframes/`). Phần dùng CHUNG cho mọi video
(style DNA, script pipeline) nằm ở gốc của từng nhóm, không lặp lại theo video.

**HyperFrames là framework dựng video mặc định từ video 5 trở đi.** 4 video đầu (`an-le-64`,
`an-le-64-phan-2`, `tham-hoa-itaewon-phan-1`, `tham-hoa-itaewon-phan-2`) được dựng bằng Remotion,
giữ nguyên làm archive tại `archive/remotion-legacy/` (xem mục "Archive: pipeline Remotion cũ" ở
cuối file) — không migrate lại, không phát triển tiếp trên nhánh đó.

## Input cần nhận từ bạn (cho MỖI video mới, slug ví dụ `<slug>`)
- **Audio sạch**: đặt vào `public/videos/<slug>/audio/narration.mp3`
- **Script video**: đặt vào `content/videos/<slug>/script.txt`
- **Media nguồn** (ảnh/video): đặt vào `public/videos/<slug>/media/images/` và `public/videos/<slug>/media/videos/` — nếu chưa có, dùng Stage 2b (Google Flow, xem `responsibility-matrix.md` mục 2b) để tự tạo.
- **Style DNA**: dùng CHUNG cho mọi video, đã có sẵn ở `planning/style-dna/` — chỉ cần đọc/điều chỉnh (xem `planning/style-dna-integration.md`), không tạo lại cho từng video.

## Các bước dựng 1 video (chạy với `--video=<slug>` ở mọi script `.router.mjs`)

**Mặc định — chạy 1 lệnh duy nhất cho Stage 1-7:**
```
node scripts/run-stages-1-6.mjs --video=<slug>
```
Tự động hoá ĐÚNG 2 nhánh song song mô tả bên dưới (Stage 1-6, enforced trong code — không còn phụ
thuộc trí nhớ agent), rồi tự chạy tiếp Stage 7 (`07-codegen-hf-parallel.mjs`) trừ khi truyền
`--skip-stage7`. Hỗ trợ resume từ giữa khi cần sửa 1 nhánh riêng: `--transcript-from=1|2|skip`,
`--media-from=2b|3|skip` (vd `--media-from=3` nếu Stage 2b đã chạy xong nhưng Stage 3 lỗi). Dừng
lại sau Stage 7 — KHÔNG tự động chạy tiếp Stage 7b/8/9 (integration check/render), vẫn cần chạy tay
bước 9-10 dưới đây sau khi Stage 7 xong.

### Chạy tay từng bước (debug/resume 1 phần, vd `--issue-file=...`, hoặc khi orchestrator trên chưa đủ)

Bước 1-4 chạy theo **2 nhánh song song** (mặc định đã kiểm chứng thật ở video `ban-an-35-phan-1`,
xem `planning/responsibility-matrix.md` mục 2b) — Nhánh B không đọc gì từ Nhánh A nên chạy đồng
thời để rút ngắn tổng thời gian, không cần chờ tuần tự như trước:

- **Nhánh A (transcript)**:
  1. `scripts/01-audio-transcribe.local.mjs` — transcribe audio thô (whisper.cpp local).
  2. `scripts/02-audio-clean-transcript.router.mjs --script=... --audio=...` — sửa/align transcript, ghi `public/videos/<slug>/captions/captions.json`.
- **Nhánh B (media, chạy song song với Nhánh A, không chờ Nhánh A)**:
  3. *(không có sẵn media)* `scripts/02b-media-generate.router.mjs --video=<slug>` — tạo ảnh/video qua Google Flow.
  4. `scripts/03-media-analyze.router.mjs --video=<slug>` — chạy NGAY khi bước 3 xong (không chờ Nhánh A) — phân tích + chuẩn hoá tên media nguồn, ghi `pipeline/videos/<slug>/media-analysis/manifest.json`.

Từ bước 5 trở đi cần **cả 2 nhánh đã xong** (Stage 5 đọc cả `captions.json` lẫn `manifest.json`):

5. *(bỏ qua nếu style DNA đã có sẵn/dùng chung — xem ghi chú "Vì sao không có `scripts/04-*`" trong `responsibility-matrix.md`)*
6. `scripts/05-scene-plan.router.mjs --video=<slug>` — lập Scene Plan, ghi `planning/videos/<slug>/scene-plan.json`/`.md`.
7. `scripts/06-shotlist.router.mjs --video=<slug>` — lập Shotlist, ghi `planning/videos/<slug>/shotlist.json`/`.md`.
8. Codegen HyperFrames (generator→verify `hyperframes check`→reviewer→retry), luôn 1 scene/lần:
   - **Mặc định (≥2 scene)**: `node scripts/07-codegen-hf-parallel.mjs --video=<slug> --scenes=S01,S02,...,SNN [--concurrency=10]` — worker-pool song song, tự ráp `index.html` khi tất cả scene PASS.
   - Tuần tự/debug 1 scene riêng: `node scripts/07-codegen.hf.router.mjs --video=<slug> --scenes=SNN [--issue-file=...]`.
   - `caption-track.html` được `syncRootHf()` tự sinh tất định từ `captions.json` mỗi lần ráp (`scripts/lib/generate-caption-track-hf.mjs`) — không cần thao tác tay.
9. Sau khi Stage 8 ráp xong: **đi thẳng sang Render, KHÔNG có bước Preview/QA bắt buộc ở giữa** (xem
   `planning/responsibility-matrix.md` mục 7-8). Render bằng `node scripts/09-render.hf.mjs
   --video=<slug>` (chỉ khi được yêu cầu render chính thức) — wrapper tất định tự cố định `--quality
   looks` + output `out/<slug>-full.mp4`, KHÔNG gõ tay lệnh `npx hyperframes render` thô (sự cố thật
   đã xảy ra: gõ tay lệch cả preset lẫn đường dẫn, xem `planning/responsibility-matrix.md` mục 8).
   Trước khi render, wrapper **tự động chạy Stage 7b** (`scripts/07b-integration-check.hf.mjs
   --video=<slug>`) làm preflight bắt buộc — verify LẠI project đã ráp (không chỉ từng scene riêng lẻ:
   `hyperframes check` + `--caption-zone`, đủ scene, có audio, có caption-track), từ chối render nếu
   FAIL, không có cờ bỏ qua. KHÔNG cần tự chạy `hyperframes check` tay trên project đã ráp nữa — script
   đã bao gồm bước này. Sau render, script tự chạy **bắt buộc** `ffprobe` (duration khớp audio thật)
   và ghi `pipeline/videos/<slug>/completion-manifest.json` — chỉ được coi video "hoàn tất" khi file
   này tồn tại và mọi field `*Ok` đều `true` (xem `planning/responsibility-matrix.md` mục P2.3).
10. Preview (`npx hyperframes preview --background`, xem `hyperframes/videos/<slug>/CLAUDE.md`) và
    vision QA (9router chụp vài khung hình, nhận xét text) **chỉ dùng khi có lý do cụ thể**: đang
    debug 1 vấn đề đã biết, người dùng yêu cầu xem trước, hoặc lần đầu áp dụng kỹ thuật/kiến trúc
    mới chưa từng kiểm chứng — KHÔNG chạy mặc định cho mọi video (sự cố thật đã xảy ra ở video
    `ban-an-473-phan-2` khi Claude tự ý làm bước này dù không ai yêu cầu, xem
    `planning/responsibility-matrix.md` mục 7).

## Trạng thái hiện tại
- [x] Scaffold dự án Remotion ban đầu, sau đó di trú toàn bộ sang HyperFrames (xem lịch sử `git log`/mục Archive bên dưới).
- [x] Khung điều phối 9router (`scripts/lib/router-client.mjs`, `scripts/model-routing.json`, đã test thật).
- [x] Audit toàn diện + tham số hoá pipeline theo `--video=<slug>` để sản xuất hàng loạt (2026-09-20).
- [x] **Di trú kiến trúc Remotion → HyperFrames hoàn tất (2026-09-21).** Giai đoạn A-D (xem
  `C:\Users\DTL\.claude\plans\repo-d-ng-video-e2e-kind-flamingo.md`) đạt Checkpoint D 6.2/10.
  Giai đoạn E (video 5 "ban-an-473-phan-1") dựng end-to-end thành công, Checkpoint E đạt — người
  dùng xác nhận chất lượng vượt mong đợi so với cả 4 video Remotion trước, sau khi vá 2 bug thật
  (caption-track chưa generalize, z-index rò rỉ stacking context — xem memory
  `feedback_incremental_buildout` bài học #4-5). Giai đoạn F (dọn dẹp Remotion, chuyển HyperFrames
  thành mặc định chính thức) đang thực hiện.
- [x] **Đóng backlog P1/P2 độ tin cậy pipeline (2026-09-23, commit `91edca2`)** — Stage 7b assembled
  integration check, caption safe-zone contract (`--caption-zone`, kèm hạ vị trí mặc định phụ đề 15%),
  parse log render vào run-log, completion manifest, sửa 1 phần phân loại retry lỗi mạng/nội dung.
  Chi tiết đầy đủ ở `planning/responsibility-matrix.md` mục "Nhật ký audit chưa xử lý". Phần CHƯA
  xong (tách retry `review()` riêng, không tốn oan ngân sách attempt) hoãn có chủ đích, không phải
  blocker cho việc dựng video mới.

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
  2. Phụ đề vẫn bị che khuất đúng bằng thời lượng scene S01 (0-10.68s) — do `.clip` trong `index.html` thiếu `isolation: isolate`, khiến z-index nội bộ 1 scene (vd `.brand-bottom-bar` z-index:20) thoát stacking context, đè lên slot `caption-track` ở stacking context gốc trang. Đã thêm `isolation: isolate` vào `.clip` trong `sync-root-hf-lib.mjs` — cô lập vĩnh viễn cho mọi slot/video. **(Đính chính 2026-09-26: đặt rule này trên selector `.clip` dùng chung với scene chính là nguyên nhân gốc của bug trống hình/thẻ bị kéo dài về sau — nay root chỉ style class riêng `.hf-slot`, xem `planning/incident-log.md` mục 2026-09-26.)**
  - Xác minh cuối bằng vision agent (9router) trực tiếp trên file MP4 render lại: 10/10 mốc giây 1→101 đều thấy phụ đề + karaoke-highlight đúng.
- [x] **Checkpoint E đạt (2026-09-21)** — người dùng xem lại bản đã sửa phụ đề, xác nhận đạt.

### Video "ban-an-473-phan-2" (video thứ 6, phần tiếp theo bản án 473)
- [x] Nhận script + audio (2026-09-22) từ `Vox style 3.1_test/.../Bản án số 473/Phan2` — không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp) + align với script gốc qua 9router (2026-09-22) — 504/504 caption khớp đúng thời lượng audio thật (131.600s), cơ chế tự chia đôi khi tràn token hoạt động đúng (1 lần tràn).
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-22) — 7 ảnh + 6 video (768×1376/720×1280, 8.0s/clip), không lặp lại lỗi collage khổ ngang của video 5.
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-22) — 13/13 asset.
- [x] Scene Plan (2026-09-22) — 18 scene, dùng đủ 13/13 asset (6 scene text-only theo thiết kế).
- [x] Shotlist (2026-09-22) — 20 shot / 18 scene. Phát hiện + sửa 1 bug thật trong `scripts/06-shotlist.router.mjs`: bảng markdown dùng nhầm field `o.text` cho overlay kiểu `icon` (chỉ có field `name`) → mọi icon hiển thị `"undefined"` trong `shotlist.md` (dữ liệu JSON gốc vẫn đúng, chỉ sai phần hiển thị .md) — đã vá, áp dụng mọi video sau.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-22) — lần đầu chạy thẳng 18 scene song song NGAY TỪ SCENE ĐẦU (không bootstrap 1 scene riêng trước như các video trước), phát hiện + sửa tận gốc 1 bug race condition thật trong `scripts/07-codegen.hf.router.mjs`: bước scaffold PROJECT CHUNG của video dùng tên thư mục tạm CỐ ĐỊNH (không gắn sceneId/pid) — 10 process chạy song song cùng thấy project chung "chưa tồn tại" nên cùng ghi/xoá chung 1 thư mục, gây 11/18 scene fail hạ tầng ngay từ đầu. Đã sửa tên thư mục tạm thành unique per-process, xem `planning/responsibility-matrix.md` mục 6. Sau khi sửa: 8/9 scene retry PASS ngay; scene còn lại (S10) + 2 scene lỗi nội dung thật từ lần chạy đầu (S12: text bị che khuất; S17: nhiều lỗi GSAP determinism) xử lý bằng `--issue-file`, PASS trong 1-3 lần thử.
- [x] QA project đã ráp phát hiện thêm 3 lỗi content_overlap/contrast không lộ ra ở test standalone riêng lẻ từng scene (S09, S06, S14, S18 — 1 trong số đó là regression phát sinh khi sửa contrast S18 lần đầu) — cả 2 loại lỗi (`content_overlap` do punch-phrase bị nhân bản chồng thời gian, gặp độc lập ở cả S09 và S18) đã vá bằng `--issue-file` + thêm gotcha mới vào `KNOWN_GOTCHAS_HF`. `hyperframes check` cuối trên project đã ráp (18/18 scene): ok=true, 0 lỗi lint/runtime/layout, contrast 46/47 đạt (1 case biên 2.99/3.0 do làm tròn, không phải lỗi thật).
- [x] Render bản đầy đủ (2026-09-21) — `out/ban-an-473-phan-2-full.mp4`, **131.600s** (khớp chính xác audio thật 131.600083s), 1080×1920 h264/aac, 207.4MB. Xác minh bằng ffprobe.
- **Bài học quy trình quan trọng (2026-09-21):** sau khi Stage 6 xong sạch lỗi, Claude tự ý mở
  `hyperframes preview --background` và tự chụp snapshot + gửi vision agent QA toàn bộ scene
  trước khi render — người dùng chỉ rõ đây KHÔNG phải bước bắt buộc của pipeline (tốn token vô
  ích, không phải video nào cũng cần). Đã sửa `planning/responsibility-matrix.md` mục 7-8: đi
  thẳng Stage 6 → Stage 8 (Render), chỉ preview/snapshot/vision QA khi có lý do cụ thể (debug,
  người dùng yêu cầu, hoặc nghi ngờ rõ ràng sau khi xem kết quả thật).
- [ ] **Đang chờ người dùng xem `out/ban-an-473-phan-2-full.mp4` và xác nhận Checkpoint.**

### Video "vua-chuot-ratking-phan-1" (chủ đề mới — hiện tượng khoa học kỳ lạ "Vua chuột/Rat King", video ngắn 32s, khác dòng nội dung bản án/thảm hoạ các video trước)
- [x] Nhận script (SRT) + audio (2026-09-23) từ `Vox style 3.1_test/.../input audio + transcript/Vui vẻ/` — không có media nguồn sẵn. Script gốc chuyển tay từ SRT sang văn xuôi (`content/videos/vua-chuot-ratking-phan-1/script.txt`, tách số thứ tự/timestamp, giữ nguyên câu chữ).
- [x] Transcribe (whisper.cpp) + align với script gốc qua 9router (2026-09-23) — 172/172 caption khớp 100% script gốc, timestamp cuối 32039ms = đúng audio thật (32.039s).
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-23) — 5 ảnh + 5 video (768×1376/720×1280, 8.0s/clip) qua account "default", không cần fallback, không lặp lỗi collage khổ ngang.
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-23) — 10/10 asset.
- [x] Scene Plan (2026-09-23) — 4 scene, dùng đủ 10/10 asset, mọi scene ≥5s.
- [x] Shotlist (2026-09-23) — 10 shot / 4 scene. Phát hiện shotlist.md vẫn hiển thị `icon:"undefined"` dù bug này từng được ghi là "đã vá" ở video `ban-an-473-phan-2` (dòng ghi chú phía trên) — đọc code xác nhận bản vá trước đó dùng sai fallback field (`o.name`) trong khi overlay `icon` thực tế dùng field `o.icon`. Sửa đúng field tại `scripts/06-shotlist.router.mjs` (`o.text ?? o.icon ?? o.name`), áp dụng mọi video sau.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-23) — chạy thẳng 4 scene song song, 3/4 PASS ngay lần đầu; S04 fail nội dung sau 3 lần thử (5 lỗi GSAP cụ thể: xung đột 2 tween cùng ghi `x` cùng lúc, tween `width` bị cấm allowlist thay vì `scaleX`, `innerText` dùng sai trong `fromTo()`, `transformOrigin` đặt sai trong `fromVars`, nghi ngờ occlusion) — đọc log, viết `--issue-file` sửa đúng 5 điểm, PASS ngay lần retry đầu.
- [x] **2 bug thật phát hiện ở Stage 7b/render, cả 2 đều tổng quát hoá cho mọi video sau, không riêng video này:**
  1. `scripts/lib/hf-check.mjs` (`runHyperframesCheck()`, dùng chung Stage 7 verify + Stage 7b) cắt `raw` còn 6000 ký tự TRƯỚC KHI trả về — `passed` tính từ JSON đầy đủ nên không sai, nhưng file `integration-check.log` ghi từ bản đã cắt, nên khi có nhiều cảnh báo lint (không gây fail) đứng trước phần lỗi thật (runtime/layout/contrast), log FAIL không đọc được nguyên nhân thật. Các nơi gọi khác đã tự cắt riêng cho console (2000-4000 ký tự) nên bỏ cap ở đây an toàn. Đã sửa: trả `raw` đầy đủ.
  2. Sau khi sửa (1), lộ ra lỗi thật: `layout` check FAIL 80 `content_overlap` — nguyên nhân gốc là từ `"ấy."` trong `captions.json` bị Stage 2 align gán `startMs===endMs===10520` (0 độ dài, trùng đúng mốc từ đầu câu kế tiếp). `scripts/lib/generate-caption-track-hf.mjs` tính duration của trang phụ đề chứa từ này = 0, sinh ra `.clip` với `data-duration="0.000000"` — runtime HyperFrames xử lý duration=0 như "luôn hiển thị" thay vì "không bao giờ hiển thị", khiến trang này kẹt đè lên mọi trang sau suốt ~17.7s còn lại video. Đã sửa: lọc bỏ hẳn các trang duration≤0 trước khi sinh HTML (trang liền trước đã tự kết thúc đúng mốc đó nên không tạo khoảng hở; nội dung 0ms vốn không thể hiển thị ở bất kỳ frame nào nên không mất gì). Gotcha này có thể tái diễn ở bất kỳ video nào có từ cuối câu bị align trùng mốc với từ đầu câu kế tiếp — cần theo dõi qua `pipeline/codegen-issues.jsonl` nếu tái diễn.
  - Sau cả 2 fix: Stage 7b PASS sạch (4/4 scene, audio, caption-track, `hyperframes check` ok=true).
- [x] Render bản đầy đủ (2026-09-23) — `out/vua-chuot-ratking-phan-1-full.mp4`, **32.067s** (khớp audio thật 32.039s), 1080×1920 h264/aac, 60.0MB. `completion-manifest.json` xác nhận mọi field `*Ok` đều `true`.

### Video "labubu-phan-1" (chủ đề mới — sự sụp đổ của trào lưu blind box/Labubu, input lấy từ `Vox style 3.1_test/.../Lóng/Labubu_phan1`, script dạng văn xuôi sẵn không cần chuyển từ SRT)
- [x] Nhận script + audio (2026-09-23) — audio 71.262s. Không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp) + align với script gốc qua 9router (2026-09-23) — 360/360 caption khớp 100% số từ script gốc, timestamp cuối 70.8s hợp lý với audio thật.
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-23) — 7 ảnh + 7 video (768×1376/720×1280, 8.0s/clip) qua account "default", không cần fallback, không lặp lỗi collage khổ ngang (xác nhận bằng ffprobe).
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-23) — 14/14 asset.
- [x] Scene Plan (2026-09-23) — 10 scene, dùng đủ 14/14 asset (S08 text-only theo thiết kế).
- [x] Shotlist (2026-09-23) — 15 shot / 10 scene, không còn bug "undefined" ở icon.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-23) — chạy thẳng 10 scene song song, 6/10 PASS ngay lần đầu (S01,S02,S03,S05,S07,S08); 4 scene FAIL nội dung (S04, S06, S09, S10) được Claude đọc log + sửa bằng `--issue-file` targeted, S04/S06/S10 PASS ngay lần retry đầu. S09 cần 3 vòng issue-file: vòng 1 sửa đúng lỗi contrast WCAG AA ban đầu nhưng làm lộ vấn đề kiến trúc timing shot-wrapper; vòng 2 (hướng dẫn của Claude) áp dụng SAI cách sửa (đẩy `data-start` lên wrapper bọc `<video>`), vi phạm rule cứng `media_missing_data_start`/`video_nested_in_timed_element` — Claude đọc thẳng source code linter (`hyperframes` CLI, `dist/cli.js`) để xác nhận đúng contract thay vì đoán tiếp, viết vòng 3 đảo ngược đúng phần sai (giữ `data-start` trên `<video>`, không đặt lên wrapper, giữ nguyên `tl.set` opacity thủ công) + sửa thêm 1 lỗi overlap label thật — PASS ngay lần thử đó. 10/10 scene PASS.
- [x] Stage 7b integration check PASS (2026-09-23) — 10/10 scene, có audio, có caption-track, `hyperframes check` ok=true.
- [x] Render bản đầy đủ (2026-09-23) — `out/labubu-phan-1-full.mp4`, **70.800s** (khớp audio thật 71.262s), 1080×1920 h264/aac, 266.6MB. `completion-manifest.json` xác nhận mọi field `*Ok` đều `true`. **Chưa được người dùng xem/xác nhận.**

### Video "cach-hoat-dong-cua-kinh-te-meo" (chủ đề mới — giải thích các khái niệm kinh tế qua ẩn dụ "Mèo", video DÀI NHẤT từ trước tới nay: audio 460.5s/7.67 phút, script 2235 từ, gấp ~3.5-6x mọi video trước)
- [x] Nhận script + audio (2026-09-23) từ `Vox style 3.1_test/.../Lóng/cách hoạt động của nền kinh tế`.
- [x] Transcribe (whisper.cpp, ~29 phút do audio dài + chạy CPU-only, xem memory `project_whisper_gpu_cpu`) + align với script gốc qua 9router (2026-09-23) — 2235/2235 caption khớp 100% script gốc.
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-23) — 21 ảnh + 20 video (768×1376/720×1280, 8.0s/clip) qua account "default", quy mô lớn nhất từ trước tới nay (trước đó tối đa 7+7).
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-23) — 41/41 asset.
- [x] Scene Plan (2026-09-23) — **51 scene** (nhiều nhất từ trước tới nay), dùng 40/41 asset, mọi scene ≥5.13s.
- [x] Shotlist (2026-09-23) — 52 shot / 51 scene.
- [x] **2 lỗi framework thật phát hiện + sửa do quy mô script lớn (áp dụng mọi video dài sau này):**
  1. `scripts/05-scene-plan.router.mjs` và `scripts/06-shotlist.router.mjs` gọi 9router 1 lần duy nhất, KHÔNG có cơ chế retry/chia nhỏ khi tràn token (khác Stage 2 đã có) — với script 2235 từ, timeout mặc định 120s + `maxTokens: 8000` không đủ. Đã tăng: Stage 5 timeout 120s→240s + maxTokens 8000→16000; Stage 6 timeout 120s→300s + maxTokens 8000→24000.
  2. `scripts/07-codegen.hf.router.mjs` parse `VERDICT: PASS` bằng regex `/VERDICT:\s*PASS/i` không khớp khi reviewer viết markdown bold (`VERDICT: **PASS**`) — khiến scene PASS thật bị phân loại nhầm FAIL. Sửa regex thành `/VERDICT:\s*[*_#\s]*PASS/i`.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-23) — chạy thẳng 51 scene song song (concurrency=10, đã xác nhận với người dùng trước khi chạy do quy mô lớn chưa từng làm): 43/51 PASS ngay lần đầu. 8 scene FAIL được Claude điều tra bằng cách tự chạy `hyperframes check --json` trực tiếp (không dựa mô tả reviewer — phát hiện 3/8 là báo động giả: S25/S27/S38 reviewer nghi ngờ nhưng check thực tế hoàn toàn sạch). 4 lỗi content thật sửa bằng `--issue-file`: S03 (2 dòng chữ giá đè nhau), S30 (lớp "dramatic spotlight" che khuất chat bubble), S31 (contrast chữ thấp), S43 (card đè lên node sơ đồ). Tất cả PASS trong 1-2 lần retry sau khi có issue-file đúng lỗi thật.
- [x] Stage 7b integration check — lần đầu FAIL: scene S18 (`#punch-phrase-wrapper` đặt `top:1300px`) lấn vào vùng an toàn phụ đề (y>1529px), lỗi chỉ lộ ra khi ráp chung với caption-track thật (đúng gotcha đã ghi nhận từ video `su-kien-thien-an-mon`). Sửa `top` xuống `1160px`, ráp lại, Stage 7b PASS lần 2 (51/51 scene, audio, caption-track, `hyperframes check` ok=true).
- [x] Render bản đầy đủ (2026-09-23) — `out/cach-hoat-dong-cua-kinh-te-meo-full.mp4`, **453.700s**, 1080×1920 h264/aac, 1216.6MB, render mất 32 phút (capture 24m18s + encode 6m13s, GPU hardware NVIDIA GTX 1660 SUPER — xác nhận render chạy 100% local, không phụ thuộc hạ tầng cloud).
- [x] **Gotcha mới: `completion-manifest.json` có `ffprobeOk: false`** (video 453.700s vs audio gốc 460.523s, lệch 6.823s) — đã điều tra bằng `ffmpeg silencedetect` xác nhận đây là 7.16s khoảng lặng THẬT ở cuối audio gốc (sau câu thoại cuối), không phải nội dung bị mất. Người dùng đã xem cảnh báo và xác nhận chấp nhận. **Bài học tổng quát**: `ffprobeOk` so sánh naive với độ dài file audio gốc, không tính trường hợp audio có đuôi lặng dài — không tự động coi `ffprobeOk: false` là lỗi thật, luôn dùng `ffmpeg silencedetect` kiểm tra trước khi kết luận (xem chi tiết `pipeline/videos/cach-hoat-dong-cua-kinh-te-meo/run-log.md`).
- [x] **Người dùng đã xem cảnh báo duration và xác nhận chấp nhận bản render hiện tại (2026-09-24).**

### 8 video dựng 24–25/09 (mục tóm tắt bổ sung 2026-09-26 — số liệu lấy tất định từ `completion-manifest.json` + dòng render trong `run-log.md` từng video; chi tiết đầy đủ trong run-log)
| Video | Scene | Thời lượng | Render | Thời gian render | Kích thước |
|---|---|---|---|---|---|
| `tien-viet-nam-phan-1` | 7 | 66.9s | 2026-09-24 | 244.2s | 129.6MB |
| `ngan-hang-tao-tien-phan-1` | 16 | 129.2s | 2026-09-24 | 438.3s | 230.1MB |
| `ha-noi-cam-xe-may` | 12 | 85.7s | 2026-09-24 | 270.0s | 97.2MB |
| `hinh-phat-treo-co-o-nhat-ban` | 54 | 437.3s | 2026-09-25 | 1048.5s | 208.2MB |
| `ajinomoto-chip-phan-1` | 19 | 162.1s | 2026-09-25 | 517.5s | 174.9MB |
| `manh-thu-con-non-yeu-ot` | 7 | 59.8s | 2026-09-25 | 184.2s | 72.1MB |
| `giai-phap-ngan-song-than` | 8 | 74.8s | 2026-09-25 | 222.1s | 94.7MB |
| `nvidia-phu-song-viet-nam` | 10 | 81.5s | 2026-09-25 (render lại sau bản sửa .hf-slot) | 221.7s | 91.3MB |

Tất cả có `completion-manifest.json` mọi field `*Ok=true`. ⚠ **MỌI video HyperFrames render TRƯỚC bản sửa gốc bug
trống hình** (`.hf-slot`, commit `8f33140`, 25/09 18:27 UTC) — tức mọi video trừ `nvidia` (render lại) và
`ban-an-425-phan-1` — dùng bản ráp CŨ: file mp4 đã xuất có thể còn lỗi mất hình/mất chữ ở scene có pattern "shot
`.clip` không z-index + nền z-index dương" (đã xác nhận: hinh-phat S01/S03/S16/S18, kinh-te-meo S23/S47). Muốn chắc: `node scripts/09-render.hf.mjs --video=<slug>` (tự ráp lại bằng bản sửa + 7b theo shot). Kết quả
quét từng video: `planning/incident-log.md`.

### Video "ban-an-425-phan-1" (bản án chạy biên chế giáo viên, 149.8s, 18 scene/20 shot — video KIỂM CHỨNG end-to-end pipeline tối ưu 2026-09-26)
- [x] Stage 1-6 xong trước đó. Stage 7 lần đầu (pipeline cũ) fail hàng loạt — nguyên nhân chính là lỗi hạ tầng
  (reviewer Sonnet hết hạn mức: 97/186 lần thử mất), người dùng dừng build.
- [x] Dựng lại toàn bộ từ Stage 7 bằng pipeline mới (commit `ece1003` + cổng review BLOCKING/ADVISORY,
  ghi chú treatment ảnh/giữ frame video, kiểm tra asset, caption-zone seek 10 mốc): 18/18 PASS, Stage 7b PASS
  (60 mốc/20 shot), render `out/ban-an-425-phan-1-full.mp4` 149.800s khớp audio, `completion-manifest.json`
  đủ `*Ok=true`. Audit khung hình 3/shot: 59/60 ok, 1 flag là báo nhầm (animation vào đúng mốc chụp).
  Chấm mù 11 scene: bản cuối tốt hơn bản cổng review cũ (overall 6.14 vs 5.49). Chi tiết + 5 nguyên nhân gốc
  đã sửa: `planning/incident-log.md` mục "Kiểm chứng end-to-end…".

### Video "doi-dau-xe-tang-checkpoint-charlie" (đối đầu xe tăng Mỹ-Liên Xô tại Checkpoint Charlie 1961, 85.65s, 11 scene/15 shot)
- [x] Nhận script + audio (2026-09-27) từ `Vox style 3.1_test/.../@theodongsukien123` — không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp) + align với script gốc qua 9router (2026-09-27) — 404/404 caption khớp audio thật (85.653s).
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-27) — account `flow-02` bị lỗi hệ thống chung chung "Đã xảy ra lỗi. Hãy thử lại" ngay ở bước tạo ảnh (không phải thông báo hết credit/quota cụ thể — không đủ bằng chứng kết luận nguyên nhân), người dùng tự tạo thủ công 5 ảnh + 4 video trong project Flow đó, tải lại bằng `--resume-project=<url>` (giữ nguyên `--flow-account=flow-02`). 5 ảnh (768×1376) + 4 video (720×1280, 8.0s/clip) — xác nhận đúng khổ dọc bằng ffprobe.
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-27) — 9/9 asset.
- [x] Scene Plan (2026-09-27) — 11 scene, dùng đủ 9/9 asset.
- [x] Shotlist (2026-09-27) — 15 shot/11 scene.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-27) — 8/11 scene PASS ngay lần đầu (song song). 3 scene cần can thiệp, phát hiện + sửa **2 lỗi thật tổng quát trong `scripts/lib/review-gate.mjs`** (áp dụng mọi video sau):
  1. **S03** — `parseReviewVerdict()` bắt khối `VERDICT`/`BLOCKING` ĐẦU TIÊN trong text thay vì khối CUỐI CÙNG, khi reviewer viết dài dòng tự phản biện rồi đổi ý ở cuối ("Kết luận cuối: VERDICT: PASS") — scene PASS thật bị báo FAIL. Sửa: luôn parse từ occurrence `VERDICT:` cuối cùng trở đi.
  2. **S10** — reviewer liệt kê MỖI bước kiểm tra hợp đồng làm 1 dòng trong `BLOCKING` (kể cả khi tự kết luận ngay trong dòng đó là "không phải lỗi chặn"/"không có lỗi ở đây"), script coi MỌI dòng là lỗi chặn thật kể cả dòng tự phủ nhận chính nó — FAIL 3/3 dù reviewer đã kết luận không có lỗi. Sửa: thêm gate `SELF_RESOLVED_RE`/`SELF_RESOLVED_HARD_RE` riêng (hẹp hơn `HARD_RE` gốc, không bị nhầm khi dòng chỉ NÊU TÊN quy tắc contract để xác nhận tuân thủ, không phải vi phạm). Cả 2 vá đã qua test hồi quy (không ảnh hưởng các category demotion cũ, không hạ nhầm lỗi thật trộn chung câu với câu tự-phủ-nhận).
   - **S10 (đính chính 27/09):** shotlist gốc yêu cầu "phát 8 giây video nguồn trong 5.77 giây bằng retime". Lúc dựng, pipeline lầm tưởng HyperFrames không hỗ trợ đổi tốc độ nên sửa S10-1 sang ảnh tĩnh và S10-2 thành trim 5.77 giây đầu; bản video cũ giữ nguyên. Thực tế `data-playback-rate` là tính năng chính thức trong `.agents/skills/hyperframes-core/references/creator-editing-recipes.md` (mục Constant speed). Ghi chú tự động `videoRetimeNote` đã được sửa để không cấm oan tính năng này cho video sau; xem `planning/responsibility-matrix.md` mục 6.
  - **S03 lộ thêm 1 lỗi caption-zone chỉ thấy khi ráp chung** (Stage 7b, không lộ ở test standalone riêng scene): `.footer` trang trí (không thuộc yêu cầu shotlist) đặt ở y≈1490-1518px, đúng vùng caption 2 dòng có thể chiếm (~1400-1546px) → `content_overlap` thật với chữ phụ đề. Sửa: xoá hẳn `.footer` (không thay thế).
- [x] Stage 7b integration check PASS (2026-09-27) — 11/11 scene, audio, caption-track, `hyperframes check` ok=true.
- [x] Render bản đầy đủ (2026-09-27) — `out/doi-dau-xe-tang-checkpoint-charlie-full.mp4`, **85.533s** (khớp audio thật 85.653s), 1080×1920 h264/aac, 87.5MB. `completion-manifest.json` xác nhận mọi field `*Ok=true`. **Chưa được người dùng xem/xác nhận.**

### Video "lay-bac-tu-phim-x-quang" (giải phẫu công nghệ thu hồi bạc từ phim X-quang, 49.4s, 6 scene/12 shot)
- [x] Nhận script + audio (2026-09-28) từ `Vox style 3.1_test/.../Có Thể Lấy Bạc Từ Phim X-quang` — không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp CUDA) + align với script gốc qua 9router (2026-09-28) — 218/218 từ khớp script gốc, audio thật 49.575s.
- [x] Tạo media qua Google Flow (Stage 2b, 2026-09-28) — account `flow-02` theo yêu cầu người dùng (account `default` hết credit video). **Bất thường thật CHƯA rõ nguyên nhân gốc**: Giai đoạn 2 (tạo chuyển động) báo "hoàn thành thành công" nhưng file zip tải về **0 video, chỉ 13 ảnh** (11 prompt gốc, không rõ tại sao dư 2). Không có thông báo blocked/quota rõ ràng nào được agent phát hiện. Người dùng xác nhận chấp nhận bản chỉ dùng ảnh tĩnh thay vì tốn thêm credit điều tra/thử lại account khác — xem chi tiết đầy đủ trong `pipeline/videos/lay-bac-tu-phim-x-quang/run-log.md`. **Cần theo dõi nếu tái diễn ở video sau dùng flow-02**: có thể là dấu hiệu account này cũng đã cạn hạn mức tạo video mà UI Flow không báo đủ rõ để agent nhận diện.
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-28) — 13/13 ảnh (0 video).
- [x] Scene Plan (2026-09-28) — 6 scene, dùng ảnh tĩnh (không có clip chuyển động).
- [x] Shotlist (2026-09-28) — 12 shot/6 scene.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-28) — 5/6 scene PASS ngay lần đầu (song song). **1 bug race condition thật phát hiện + sửa** trong `scripts/07-codegen.hf.router.mjs`: khi N scene cùng bootstrap project HyperFrames chung lần đầu, bước đọc/ghi lại `meta.json` không có bảo vệ — 1 process (S03) đọc trúng lúc process khác đang ghi dở, `JSON.parse` trúng nội dung rỗng → crash cả scene dù bootstrap thực chất đã thành công. Đã sửa bằng try/catch an toàn (field `meta.name` chỉ cosmetic, đã grep xác nhận không dùng ở đâu khác trong pipeline) — xem `planning/responsibility-matrix.md` mục 6. S03 PASS ngay lần chạy lại đầu tiên sau khi sửa.
- [x] Stage 7b integration check PASS (2026-09-28) — 6/6 scene, audio, caption-track, `hyperframes check` ok=true (36 mốc/12 shot).
- [x] Render bản đầy đủ (2026-09-28) — `out/lay-bac-tu-phim-x-quang-full.mp4`, **49.367s** (khớp audio thật 49.575s), 1080×1920 h264/aac, 47.4MB. `completion-manifest.json` xác nhận mọi field `*Ok=true`. **Chưa được người dùng xem/xác nhận.**

### Video "nguon-goc-ra-doi-cua-ai" (lịch sử ý tưởng AI — Hobbes → Boole → Shannon → Turing, 307.4s, 37 scene/37 shot — lần đầu dùng flag `--images-only` mới thêm ở Stage 2b)
- [x] Nhận script + audio (2026-09-28) từ `Vox style 3.1_test/.../kiến thức thú vị/Hóa ra AI được ra đời ĐỈNH CHÓP như vậy` — không có media nguồn sẵn.
- [x] Transcribe (whisper.cpp CUDA) + align với script gốc qua 9router (2026-09-28) — 1032/1032 từ khớp script gốc (script dài nhất kể từ `cach-hoat-dong-cua-kinh-te-meo`), cơ chế tự chia đôi khi tràn token hoạt động đúng (nhiều lần chia tới depth=3), audio thật 307.416s.
- [x] **Thêm mới flag `--images-only`** cho `scripts/02b-media-generate.router.mjs` (+ pass-through qua `scripts/run-stages-1-6.mjs`) — theo yêu cầu người dùng chỉ cần ảnh tĩnh, bỏ qua hẳn Giai đoạn 2 (tạo chuyển động) thay vì phải sinh video rồi bỏ đi. Tạo media qua Google Flow (Stage 2b, 2026-09-28, account `default`) — 11 ảnh, 0 video (chủ động, đúng thiết kế).
- [x] Phân tích + chuẩn hoá tên media qua 9router[vision] (2026-09-28) — 11/11 ảnh.
- [x] Scene Plan (2026-09-28) — 37 scene (nhiều thứ nhì từ trước tới nay, sau `cach-hoat-dong-cua-kinh-te-meo` 51 scene).
- [x] Shotlist (2026-09-28) — 37 shot/37 scene.
- [x] Dựng composition qua nhánh HyperFrames (2026-09-28) — chạy thẳng 37 scene song song (concurrency=10): **37/37 PASS ngay lần đầu**, không cần `--issue-file` can thiệp tay, không gặp lại race condition bootstrap đã vá ở video trước.
- [x] Stage 7b integration check PASS (2026-09-28) — 37/37 scene, audio, caption-track, `hyperframes check` ok=true (111 mốc/37 shot).
- [x] Render bản đầy đủ (2026-09-28) — `out/nguon-goc-ra-doi-cua-ai-full.mp4`, **307.433s** (khớp audio thật 307.416s), 1080×1920 h264/aac, 194.4MB, render mất 10m24s (37 scene/9223 frame). `completion-manifest.json` xác nhận mọi field `*Ok=true`. **Chưa được người dùng xem/xác nhận.**

## Archive: pipeline Remotion cũ (4 video đầu, `archive/remotion-legacy/`)

Giữ lại đúng nguyên trạng để tham khảo/sửa lỗi cho 4 video archive — KHÔNG áp dụng cho video mới.

### Các bước dựng 1 video bằng Remotion (lịch sử)
1-6. Giống hệt pipeline HyperFrames ở trên (Stage 1-6 framework-agnostic).
7. `archive/remotion-legacy/scripts/07-codegen.router.mjs --video=<slug> --scenes=SNN` (hoặc
   `07-codegen-parallel.mjs` cho ≥2 scene, cùng thư mục) — sinh code từng scene, tự ráp
   `src/Root.tsx` (`archive/remotion-legacy/scripts/lib/sync-root-lib.mjs`).
8. Preview bằng `npm run dev` (Remotion Studio), chọn đúng composition id (PascalCase của slug, vd `AnLe64`).
9. Render bằng `npx remotion render <CompositionId> out/<slug>-full.mp4`.

### Tối ưu render Remotion — đã đo thật, không đoán (2026-09-20/21)
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
  toàn. Mức ~5.8-6.4x thời lượng thật (54s video ~5m45s render) nhiều khả năng là chi phí VỐN CÓ
  của kiến trúc render Chromium-per-frame + decode video nguồn của Remotion trên 1 máy, không
  phải lỗi cấu hình.
