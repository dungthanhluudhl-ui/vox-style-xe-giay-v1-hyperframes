
- **2026-09-25T11:14:14.319Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 518 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\manh-thu-con-non-yeu-ot\transcripts\raw-captions.json

- **2026-09-25T11:15:59.991Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 300 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\manh-thu-con-non-yeu-ot\captions\captions.json

- **2026-09-25T11:19:14.874Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 6 ảnh + 5 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/manh-thu-con-non-yeu-ot/media/{images,videos}/

- **2026-09-25T11:20:00.011Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 11 asset (6 ảnh, 5 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/manh-thu-con-non-yeu-ot/media-analysis/manifest.json

- **2026-09-25T11:20:55.998Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 7 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/manh-thu-con-non-yeu-ot/scene-plan.json + scene-plan.md

- **2026-09-25T11:21:39.817Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 12 shot trên 7 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/manh-thu-con-non-yeu-ot/shotlist.json + shotlist.md

- **2026-09-25T11:23:19.788Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-25T11:23:51.142Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-25T11:24:26.316Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-25T11:24:46.931Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-25T11:24:54.534Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-25T11:25:36.530Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-25T11:26:07.069Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S06` — Codegen HyperFrames scene [S06] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`#root` hardcodes `width: 1080px; height: 1920px`** thay vì `width: 100%; height: 100%`. Vi phạm composition contract — runtime stamp pixel size qua `data-width`/`data-height`, không phải CSS cứng trên root.
- **`<video id="video-s06-1">` và `<img id="img-s06-2">` có `data-start` nhưng nằm bên trong `#media-frame` — một phần tử con của `#media-frame-wrapper` không có `data-start`**. Tuy nhiên vấn đề thật hơn là: video/img có `data-layout-allow-overflow="true"` đặt trực tiếp trên chúng — không phải lỗi contract nhưng không cần thiết và có thể gây nhầm lẫn audit. Vấn đề nghiêm trọng hơn: `#media-frame-wrapper` không có `data-start`/`data-duration` nhưng chứa các timed element — layout audit sẽ thấy media asset timed nằm trong wrapper không timed, có thể gây `video_nested_in_timed_element` nếu wrapper được coi là timed ancestor (cần kiểm tra thêm, nhưng đây là rủi ro).
- **GSAP tween `border` property** (`tl.to("#step-1", { border: "2px dashed #141414" })`): GSAP không tween shorthand `border` đáng tin cậy — đây là layout property, không phải transform/opacity, và không nằm trong allowlist. Sẽ gây silent failure hoặc render không đúng.
- **`tl.to("#step-1", { backgroundColor, color, border })` và tương tự** — tween `color` và `backgroundColor` trực tiếp trên `.timeline-step` elements là OK về mặt allowlist, nhưng `border` shorthand thì không. Cần tách thành `borderColor`, `borderWidth`, `borderStyle` riêng hoặc dùng `gsap.set()` tức thì thay vì tween.
- **`yoyo: true, repeat: 1`** trên `#media-frame` rotation tween: `repeat: 1` với `yoyo: true` → tween chạy forward rồi backward = 2 lần tổng, kết thúc tại `rotation: -0.6` (giá trị from), không phải `0`. Nếu muốn kết thúc tại `0`, cần `repeat: 0` (không yoyo) hoặc điều chỉnh lại logic.
- **`.punch-card` và `.label-card` dùng `bottom: 500px`** — đây là CSS positioning cứng, không phải `inset: 0`. Các clip này là direct children của `#root` nên runtime sẽ force `position: absolute; top: 0; left: 0` lên chúng, override `bottom: 500px`. Cần dùng `top` thay vì `bottom` để positioning hoạt động đúng, hoặc đặt trong wrapper.
- **`.icon-card` dùng `top: 340px; right: 96px`** — tương tự, là direct child của `#root`, runtime sẽ anchor `top:0; left:0`. `right: 96px` sẽ không hoạt động. Cần dùng `left` thay vì `right`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\manh-thu-con-non-yeu-ot-s06

- **2026-09-25T11:26:07.099Z** — `scripts/run-stages-1-6.mjs --video=manh-thu-con-non-yeu-ot` — Stage 1-6 xong, Stage 7 THẤT BẠI (mã 1) — 7 scene (S01,S02,S03,S04,S05,S06,S07). Xem log ở trên hoặc sửa bằng --issue-file rồi chạy lại đúng scene.

- **2026-09-25T11:29:33.045Z** — `scripts/07-codegen.hf.router.mjs --video=manh-thu-con-non-yeu-ot --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-25T11:30:34.734Z** — `scripts/07b-integration-check.hf.mjs --video=manh-thu-con-non-yeu-ot` — Stage 7b integration check PASS — 7/7 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-25T11:31:26.849Z** — `scripts/07b-integration-check.hf.mjs --video=manh-thu-con-non-yeu-ot` — Stage 7b integration check PASS — 7/7 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-25T11:34:31.521Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\manh-thu-con-non-yeu-ot-full.mp4, 75626701 bytes (72.1MB), 184.2s render time, quality=looks. Xác minh ffprobe: duration=59.833s (khớp audio thật 59.907s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.9s, browser_probe=0.6s, video_extract=4.6s, audio_process=2.7s, file_server=0.0s, capture_calibration=3.5s, capture_disk=105.9s, encode=48.2s, assemble=6.3s.

- **2026-09-25T14:42:01.351Z** — qa-blank-frame-audit: 7 scene kiểm tra, 0 bị flag (none) — report tại `C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\manh-thu-con-non-yeu-ot\contact-sheet\report.md`
