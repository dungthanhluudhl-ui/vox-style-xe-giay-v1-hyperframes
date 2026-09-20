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

## Trạng thái hiện tại
- [x] Scaffold dự án Remotion (blank template)
- [x] Cài skill Remotion (`.agents/skills/`, `.claude/skills/`)
- [x] Khung điều phối 9router (`scripts/lib/router-client.mjs`, `scripts/model-routing.json`, đã test thật)
- [x] Backup checkpoint lên GitHub (2026-09-20) — commit `685f606`, `origin/main`.
- [x] Audit toàn diện + tham số hoá pipeline theo `--video=<slug>` để sản xuất hàng loạt (2026-09-20) — mọi script `03/05/06/07/08` nhận `--video=`, cấu trúc thư mục chuyển sang `videos/<slug>/` trong từng nhóm (`content/`, `public/`, `planning/`, `pipeline/`, `src/`). Chi tiết đầy đủ tại `C:\Users\DTL\.claude\plans\b-n-c-th-c-i-vast-dragonfly.md`.

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
