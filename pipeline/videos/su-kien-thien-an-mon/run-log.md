
- **2026-09-22T15:12:25.154Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp (model=medium, lang=vi) -> 821 captions, ghi ra pipeline\videos\su-kien-thien-an-mon\transcripts\raw-captions.json

- **2026-09-22T15:15:19.154Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 450 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public\videos\su-kien-thien-an-mon\captions\captions.json

- **2026-09-22T15:42:07.895Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 6 ảnh + 5 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/su-kien-thien-an-mon/media/{images,videos}/

- **2026-09-22T15:49:38.115Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 11 asset (6 ảnh, 5 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/su-kien-thien-an-mon/media-analysis/manifest.json

- **2026-09-22T15:51:15.720Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 14 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/su-kien-thien-an-mon/scene-plan.json + scene-plan.md

- **2026-09-22T15:52:02.670Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 28 shot trên 14 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/su-kien-thien-an-mon/shotlist.json + shotlist.md

- **2026-09-22T15:54:11.036Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-22T15:54:14.187Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-22T15:54:24.793Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-22T15:55:35.582Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-22T15:55:42.445Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-22T15:56:00.521Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-22T15:56:02.372Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-22T15:56:43.073Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-22T15:57:00.273Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-22T15:57:31.241Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (error)**: `<video id="vid-shot1">` và `<video id="vid-shot2">` đều có `data-start` nhưng nằm trong `<div id="video-wrapper">` — wrapper này không có `data-start` nên không vi phạm rule "video nested in timed element" trực tiếp. Tuy nhiên, `#vid-shot1` có `data-start="0"` và `#vid-shot2` có `data-start="4.6"` — cả hai đều là timed video elements nằm trong một wrapper không timed, điều này hợp lệ. *(Bỏ qua issue này — không vi phạm)*

- **`gsap_relative_value_second_writer` / seek desync trên `#vid-shot1` và `#vid-shot2`**: GSAP tween `x: -60` trên `#vid-shot1` và `scale: 1.16 → 1.02` trên `#vid-shot2` — đây là camera motion trên chính thẻ `<video>`. Tuy nhiên, video elements đã có CSS `top: -5%; left: -10%; width: 120%; height: 110%` — GSAP tween thêm `x`/`scale` transform lên cùng element không có CSS transform ban đầu, nên không có conflict. *(Bỏ qua)*

- **`onUpdate` dùng `toLocaleString("vi-VN")` — NON-DETERMINISTIC**: `toLocaleString` phụ thuộc locale của browser/OS tại thời điểm render, không đảm bảo tất định giữa các môi trường render khác nhau. Kết quả có thể là `"1.000.000"` hoặc `"1,000,000"` tùy runtime. Phải hardcode format thủ công (vd: `Math.floor(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")`) thay vì `toLocaleString`.

- **`#root` hardcode `width: 1080px; height: 1920px`**: Vi phạm contract — root phải dùng `width: 100%; height: 100%`. Canvas size đã được khai báo qua `data-width`/`data-height`, runtime sẽ stamp kích thước đó. Hardcode pixel trên `#root` gây conflict với cách runtime sizing hoạt động.

- **`tl.set(counterEl, { innerText: "150.000" }, 5.74)`**: Dùng `innerText` với giá trị string `"150.000"` — format này không nhất quán với output của counter (sẽ ra `"150000"` từ `Math.floor(150000)` nếu không format). Nhỏ nhưng gây flash sai giá trị tại t=5.74s.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\su-kien-thien-an-mon-s05

- **2026-09-22T15:57:48.495Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-22T15:57:59.165Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-22T15:58:09.637Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-22T16:00:28.062Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S14` — Codegen HyperFrames scene [S14] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (error)**: `<video id="main-video">` có `data-start="0" data-duration="10"` đồng thời là direct child của `#root` (cũng có `data-start` ngầm định = 0). Tuy nhiên vấn đề nghiêm trọng hơn: video có `data-start` + `data-duration` riêng, nhưng GSAP lại tween trực tiếp `#main-video` với `scale`, `x`, `y` — vi phạm quy tắc không tween `.clip` element (video có `data-start` là timed element). Cần bỏ `data-start`/`data-duration` khỏi video và để video là untimed media, hoặc tween wrapper div thay vì tween video trực tiếp.

- **`gsap_animates_clip_element` (error)**: Nhiều tween nhắm thẳng vào các `.clip` element có `data-start` (timed elements): `#punch-1`, `#warning-overlay`, `#chip-tanks`, `#punch-2`, `#diagram-cordon` — tất cả đều bị tween `opacity`, `scale`, `y`, `x`. Framework sở hữu visibility của clip element; phải animate wrapper/child bên trong thay vì animate chính clip element.

- **`gsap_css_transform_conflict` (error)**: `#main-video` có `transform-origin: 50% 50%` trong CSS nhưng cũng bị GSAP tween `scale`, `x`, `y` — CSS transform và GSAP transform conflict trên cùng element.

- **Timing mismatch với shotlist**: Shot 1 kết thúc lúc 5.56s (tính từ 0), Shot 2 từ 5.56s–10s. Punch-phrase "23 SƯ ĐOÀN VŨ TRANG" theo shotlist `atMs=119500, holdMs=2400` → xuất hiện lúc 0s, hold 2.4s (đúng). Label "XE TĂNG & TRỰC THĂNG" theo shotlist `atMs=124040` → tương đương ~4.54s từ đầu scene, nhưng code đặt `data-start="4.0"` (lệch ~0.54s). Punch "TIẾN VÀO BẮC KINH" theo shotlist `atMs=126780` → ~7.28s từ đầu, code đặt `data-start="7.0"` (chấp nhận được). Diagram `atMs=127530` → ~8.03s, code đặt `data-start="7.6"` (lệch ~0.43s — minor).

- **Punch-card và diagram-card chồng lấn nhau trong Shot 2**: `#punch-2` (`top: 200px`) và `#diagram-cordon` (`top: 440px`) cùng hiển thị từ 7.0s–10.0s. Diagram-card có chiều cao lớn (radar 200px + text + padding) có thể đè lên punch-card — cần kiểm tra `text_occluded` / `content_overlap`.

- **`data-layout-allow-overflow="true"` trên root**: Đặt trên root sẽ silence toàn bộ layout audit cho mọi descendant — quá rộng, nên scope xuống từng element cụ thể có overflow có chủ đích.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\su-kien-thien-an-mon-s14

- **2026-09-22T16:03:34.461Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-22T16:04:04.771Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-22T16:07:59.485Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-22T16:09:03.655Z** — `scripts/07-codegen.hf.router.mjs --video=su-kien-thien-an-mon --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-23T13:24:48.358Z** — `scripts/07b-integration-check.hf.mjs --video=su-kien-thien-an-mon` — Stage 7b integration check FAIL:
Cờ layout đặt sai chỗ trên root: compositions/scene-s02.html (data-layout-allow-overflow); compositions/scene-s03.html (data-layout-allow-overflow); compositions/scene-s08.html (data-layout-allow-overflow); compositions/scene-s09.html (data-layout-allow-overflow); compositions/scene-s10.html (data-layout-allow-overflow); compositions/scene-s11.html (data-layout-allow-overflow); compositions/scene-s14.html (data-layout-allow-overflow) — di chuyển xuống đúng phần tử con cụ thể.
