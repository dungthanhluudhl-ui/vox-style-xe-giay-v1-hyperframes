# Quy trình dựng video (Vox-style xé giấy) bằng Remotion

## Input cần nhận từ bạn
- **Audio sạch**: đặt vào `public/audio/`
- **Script video**: đặt vào `content/`
- **Media nguồn** (ảnh/video): đặt vào `public/media/images/` và `public/media/videos/`
- **Style DNA**: điền vào `planning/style-dna-integration.md`, đặt file tham chiếu (ảnh/video mẫu, texture giấy, font...) vào `public/style/`

## Các bước dựng video
1. Đọc script + nghe audio → lập **Scene Plan** (`planning/scene-plan.md`): chia lời thoại thành các scene, mô tả ý tưởng hình ảnh và kiểu chuyển cảnh xé giấy cho từng scene.
2. Từ Scene Plan → lập **Shotlist** (`planning/shotlist.md`): chia mỗi scene thành các shot chi tiết (frame start/end, chuyển động, asset, text on-screen).
3. Transcribe audio thành caption JSON (`public/captions/`) bằng `@remotion/install-whisper-cpp` — xem `.agents/skills/remotion-captions/transcribe-captions.md`.
4. Dựng từng scene thành component trong `src/scenes/`, ráp lại trong `src/Root.tsx`.
5. Hiển thị caption bằng `@remotion/captions` — xem `.agents/skills/remotion-captions/display-captions.md`.
6. Preview bằng `npm run dev` (Remotion Studio).
7. Render bằng `npx remotion render` (chỉ khi được yêu cầu render chính thức).

## Trạng thái hiện tại
- [x] Scaffold dự án Remotion (blank template)
- [x] Cài skill Remotion (`.agents/skills/`, `.claude/skills/`)
- [x] Khung điều phối 9router (`scripts/lib/router-client.mjs`, `scripts/model-routing.json`, đã test thật)
- [x] Nhận script + audio + media + style DNA (2026-09-20) — xem `planning/style-dna-integration.md`. PDF bản án sẽ cung cấp sau, chưa cần cho giai đoạn hiện tại.
- [x] Phân tích media nguồn qua 9router[vision] (2026-09-20) — 14 asset đã mô tả + gắn tag + chuẩn hoá tên file (`img-NN-slug`/`vid-NN-slug`) + đổi `media/video/`→`media/videos/`. Xem `pipeline/media-analysis/manifest.json`. Ảnh dùng làm nền, không cutout (theo yêu cầu người dùng).
- [x] Transcribe audio (whisper.cpp local) + sửa transcript qua 9router (2026-09-20) — dùng script gốc làm ground truth để align, khớp 100%. Xem `public/captions/an-le-64-captions.json`.
- [x] Scene Plan (2026-09-20) — 7 scene, xem `planning/scene-plan.md` / `planning/scene-plan.json`
- [x] Shotlist (2026-09-20) — 14 shot / 7 scene, xem `planning/shotlist.md` / `planning/shotlist.json`
- [x] Caption — `public/captions/an-le-64-captions.json`, hiển thị qua `src/components/Captions.tsx` (mount 1 lần ở `Root.tsx`)
- [x] Dựng composition (code Remotion qua 9router) (2026-09-20) — 7 scene PASS, tsc+eslint sạch toàn dự án. Composition `AnLe64`, 1480 frames (49.34s), 1080×1920@30fps.
- [x] Render bản đầy đủ không lỗi (2026-09-20, đã audit sửa xong) — `out/an-le-64-full.mp4`, **49.39s** (khớp đúng audio thật 49.343s). Đã qua audit 4 lỗi từ bản demo đầu (z-index/caption, audio timestamp, pacing S06-S08 → gộp còn S05-S07) + 3 vòng sửa lỗi runtime `interpolate()`/boxShadow. Kiến trúc code-gen song song-an-toàn (`--no-root-sync` + `scripts/08-sync-root.mjs`) đã xây và kiểm chứng (S06+S07 chạy song song thành công), dùng cho video nhiều scene sau này. **Người dùng đã xem & xác nhận đạt** (2026-09-20).
- [x] Backup checkpoint lên GitHub (2026-09-20) — commit `685f606`, `origin/main`.
- [ ] Chưa có `scripts/04-*`: bỏ qua có chủ đích — Stage 4 (phân tích style DNA từ ảnh mẫu) không cần vì style DNA được kế thừa nguyên bộ từ `vox-style-3` (xem `planning/style-dna/README.md`), không phải lỗ hổng.
- [ ] Pipeline hiện hard-code cho đúng 1 video ("Án lệ 64") — chưa hỗ trợ sản xuất nhiều video song song. Xem audit + kế hoạch tham số hoá `--video=<slug>` tại `C:\Users\DTL\.claude\plans\b-n-c-th-c-i-vast-dragonfly.md`.
