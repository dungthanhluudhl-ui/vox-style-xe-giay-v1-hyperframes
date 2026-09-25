
- **2026-09-24T13:28:33.026Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 1118 captions, ghi ra pipeline/videos/ngan-hang-tao-tien-phan-1/transcripts/raw.json

- **2026-09-24T13:33:17.142Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 10 ảnh + 9 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/ngan-hang-tao-tien-phan-1/media/{images,videos}/

- **2026-09-24T13:35:22.844Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 706 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/ngan-hang-tao-tien-phan-1/captions/captions.json

- **2026-09-24T13:36:37.691Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 19 asset (10 ảnh, 9 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ngan-hang-tao-tien-phan-1/media-analysis/manifest.json

- **2026-09-24T13:38:20.548Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 16 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ngan-hang-tao-tien-phan-1/scene-plan.json + scene-plan.md

- **2026-09-24T13:39:52.626Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 25 shot trên 16 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ngan-hang-tao-tien-phan-1/shotlist.json + shotlist.md

- **2026-09-24T13:43:54.847Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-24T13:44:00.899Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-24T13:44:15.817Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-24T13:44:18.945Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-24T13:44:41.624Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s08

- **2026-09-24T13:45:58.359Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-24T13:46:25.691Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-05" data-start="0" data-duration="7.7">` nằm bên trong `#shot-1-media` (`.media-viewport`) là con của `#shot-1-card` (`.card-outer`) — nhưng quan trọng hơn, `#shot-1-card` không có `data-start`, nên không vi phạm trực tiếp. Tuy nhiên video có `class="clip"` kèm `data-start` — `class="clip"` trên `<video>` là sai convention (skill docs nói "Omit it on `<video>` and `<audio>`"), và `inset:0` từ `.clip` sẽ conflict với layout `media-content`. Cần bỏ `class="clip"` khỏi video.
- **`gsap_css_transform_conflict`**: `.card-underlay-left` có CSS `transform: rotate(-1.5deg)` và `.card-underlay-right` có `transform: rotate(1.5deg)` — không bị tween nên không vi phạm lint rule này. Tuy nhiên `#shot-1-media` được tween `x: -30 → 30` trong khi không có CSS transform conflict — OK.
- **`repeat: 5` với `yoyo` trên `#shot-2-bob`**: `y: 0 → -4, repeat: 5, yoyo: true` → tổng duration = `0.72 * (5+1) = 4.32s`, bắt đầu tại `7.7s`, kết thúc tại `12.02s` — vượt quá `data-duration="12.2"` chỉ 0.18s, gần sát nhưng chấp nhận được. Tuy nhiên `repeat` phải là số nguyên hữu hạn — OK về mặt contract.
- **`gsap_animates_clip_element` tiềm ẩn**: `#shot-1` và `#shot-2` có `class="scene-layer"` (không phải `class="clip"`) nhưng không có `data-start` — chúng không phải clip element theo định nghĩa runtime, nên tween `opacity` trên chúng là hợp lệ. OK.
- **`video_nested_in_timed_element` thực sự**: Video `data-start="0"` nằm trong `.media-viewport` không có `data-start` — không vi phạm. Nhưng `.media-viewport` nằm trong `.card-frame` nằm trong `.card-outer` — không phần tử nào trong chain có `data-start` ngoài video. OK về mặt lint.
- **Timing offset so với shotlist**: Shotlist S02-1 `startMs=7000`, S02-2 `startMs=14700` → relative trong scene: S02-1 từ 0s, S02-2 từ 7.7s. `data-duration="12.2"` = 14700ms - 7000ms + offset ≈ 12.2s. Overlay "TÀI CHÍNH BÌNH DÂN" tại `atMs=10700` → relative = 3.7s ✓. "TỰ TIN ĐẦU TƯ" tại `atMs=13510` → relative = 6.51s ✓. "GÓC NHÌN THỰC CHIẾN" tại `atMs=15670` → relative = 8.67s ✓. Timing khớp shotlist.
- **`class="clip"` trên `<video>`**: Vi phạm convention rõ ràng — skill docs: *"Omit it on `<video>` and `<audio>`"*. CSS `.clip { position: absolute; inset: 0 }` sẽ override layout của video, gây conflict với `object-fit: cover` và `width/height: 100%` đã set trên `.media-content`.
- **`window.__timelines = window.__timelines || {}`**: Skill docs nói "You do not need `window.__timelines = window.__timelines || {}`: the runtime creates the registry before your inline scripts run" — dòng này thừa nhưng không gây lỗi, chỉ là noise.

**Lý do FAIL chính**: `class="clip"` trên `<video id="vid-05">` vi phạm convention rõ ràng và gây CSS conflict thực sự (`inset:0` override `width/height: 100%` của `.media-content`).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s02

- **2026-09-24T13:46:47.929Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` violation**: `<video id="vid-06" data-start="0" data-duration="4.01">` nằm bên trong `#shot-2` là `<section data-start="4.01">` — không, thực ra video nằm trong `#shot-1` không có `data-start`, nhưng kiểm tra lại: `#shot-1` là `.shot-container` không có `data-start`, OK. Tuy nhiên `#shot-1` không có `data-start` nên video timed element không bị lỗi nesting. **Nhưng**: video `data-start="0"` nằm trong `#shot-1` (untimed) — hợp lệ về mặt nesting. Không có lỗi này.

- **Shot 1 content không bị ẩn khi Shot 2 active**: `#shot-1` là div thường (không có `data-start`/`data-duration`), nên nó **luôn hiển thị** suốt toàn bộ composition kể cả khi Shot 2 đang chạy (4.01s–8.19s). Chỉ có `opacity: 0` tween lúc 3.96s nhưng `#shot-1-label`, `#shot-1-person-badge`, `top-editorial-tag` vẫn nằm trong DOM và có thể đè lên Shot 2. Đây là lỗi layout/occlusion thật — `hyperframes check` sẽ bắt `text_occluded` hoặc `foreground-over-panel`.

- **`gsap_css_transform_conflict`**: `#img-08` có CSS `will-change: transform` (không phải lỗi) nhưng quan trọng hơn: tween `rotation: -0.6 → 0.6` với `yoyo: true, repeat: 1` — `repeat` finite OK, nhưng `yoyo` kết hợp `repeat: 1` sẽ kết thúc ở `rotation: -0.6` (quay về start), không phải `0.6`. Đây là logic lỗi: frame cuối của shot 2 sẽ có ảnh bị nghiêng `-0.6deg` thay vì trạng thái neutral.

- **`gsap_relative_value` risk trên `#shot-2-media-box`**: tween `x: -25 → 25` bắt đầu lúc 4.01s trên element thuộc `#shot-2` (clip có `data-start="4.01"`). Khi seek đến frame trong shot 2, GSAP `fromTo` với giá trị tuyệt đối là OK — không có lỗi này.

- **`data-duration` root tính sai**: `data-duration="8.19"` nhưng Shot 2 kết thúc lúc `4.01 + 4.18 = 8.19s` — đúng. OK.

- **Shot 1 overlays (`#shot-1-label`, `#shot-1-person-badge`) không có `class="clip"`** và không có `data-start` — chúng là untimed elements nằm trong untimed container, sẽ luôn visible (opacity=0 chỉ do GSAP, không phải framework). Khi seek đến Shot 2 time window mà không có GSAP state (cold seek), các element này render ở `opacity: 0` nhưng vẫn chiếm không gian layout — có thể gây `content_cramped_container` hoặc layout audit issues.

**Lỗi nghiêm trọng nhất**: `#shot-1` (untimed div) chứa toàn bộ nội dung Shot 1 luôn tồn tại trong DOM và chỉ bị ẩn bằng GSAP opacity tween lúc 3.96s — không phải framework-managed visibility. Cần đổi `#shot-1` thành timed clip (`data-start="0" data-duration="4.01"`) và tách video ra khỏi timed ancestor bằng cách đặt video trực tiếp trong clip (không cần `data-start` riêng trên video nếu ancestor đã timed, hoặc bỏ `data-start` trên video).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s07

- **2026-09-24T13:46:51.530Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (lint error):** `<video id="vid-scale" data-start="0" data-duration="5.0">` nằm bên trong `#wobble-container-1` và `#zoom-container-1` — cả hai container này không có `data-start`, nhưng chúng lại nằm trong `#shot-1` (không timed). Tuy nhiên vấn đề thực sự là `#wobble-container-1` được GSAP tween `opacity` từ 0→1 rồi lại tween `opacity` về 0 ở t=4.95s — trong khi video có `data-start="0"` và `data-duration="5.0"`. Điều này không vi phạm `video_nested_in_timed_element` trực tiếp (vì các wrapper không có `data-start`), nhưng tween `opacity` trên wrapper chứa video có thể gây conflict với framework visibility.
- **`callout-services` overflow tiềm ẩn:** `.callout-services` được đặt `top: 1300px` với `height` kế thừa từ `.clip` (inset:0 → height 1920px). Tuy nhiên `.callout-card` không kế thừa `.clip`, nên không có vấn đề height. Nhưng `top: 1300px` + nội dung card (~150px) = kết thúc ở ~1450px, nằm trong khung 1920px — OK.
- **`gsap_animates_clip_element` tiềm ẩn:** `#shot-2` là `.clip` có `data-start`, nhưng code không tween trực tiếp `#shot-2` — tween `#shot-2-content` bên trong. OK về mặt này.
- **Thiếu `data-start` / `data-duration` trên video wrapper hoặc video bị timed đúng cách:** Video `vid-scale` có `data-start="0" data-duration="5.0"` nhưng nằm sâu bên trong `.collage-frame` → `#zoom-container-1` → `#wobble-container-1` → `#shot-1`. Không có ancestor nào có `data-start` nên không vi phạm `video_nested_in_timed_element`. Tuy nhiên `#wobble-container-1` bị tween `opacity: 0` tại t=4.95s trong khi video vẫn còn trong window `[0, 5.0)` — frame cuối video sẽ bị ẩn sớm 50ms, chấp nhận được.
- **`img-necessities` bị tween `x: 30 → -30` với `scale: 1.06` nhưng không có `will-change` hay `transform-origin` rõ ràng** — không phải lỗi contract nhưng có thể gây overflow ngoài `.collage-frame` vì frame có `overflow: hidden` → OK, clipped bởi frame.
- **Lỗi thực sự nghiêm trọng — `gsap_css_transform_conflict`:** `.tape-corner.tape-tl` có CSS `transform: rotate(-30deg)` và `.tape-corner.tape-tr` có `transform: rotate(30deg)`. Không có GSAP tween nào động vào các phần tử này nên không conflict — OK.
- **Lỗi thực sự: `#punch-wrap-1` và `#icon-badge-1` không có `data-start`** — chúng là overlay timed bằng GSAP thuần, không phải clip HyperFrames. Chúng nằm trong `#shot-1` (không timed) và luôn visible trong DOM. Khi Shot 2 bắt đầu (t=5.0s), `#punch-wrap-1` và `#icon-badge-1` đã được fade về `opacity:0` bởi GSAP — nhưng chúng vẫn tồn tại trong DOM và có thể bị `hyperframes check` phát hiện là text bị occlude hoặc element vô hình không cần thiết. Không phải lỗi contract cứng.
- **Lỗi thực sự nghiêm trọng nhất — `#shot-1` wrapper không có `data-start` nhưng chứa video có `data-start="0"`:** Theo contract, video `data-start` trực tiếp trên `<video>` là hợp lệ. Tuy nhiên `#wobble-container-1` bị GSAP tween `opacity: 0` tại t=4.95s — đây là tween trên một **non-clip wrapper** chứa video timed. Framework vẫn seek video theo `data-start/data-duration` của chính video, nhưng wrapper bị ẩn bởi GSAP sẽ khiến video không hiển thị dù framework chưa hide nó. Đây là **silent visual bug** nhưng không phải lỗi contract cứng bị lint bắt.

**Lỗi contract thực sự cần sửa:**
- `#shot-2` là `.clip` có `data-start="5.0"` — `#shot-2-content` bên trong bị tween `opacity: 0 → 1`. Đây là tween trên **child của clip**, không phải clip element — hợp lệ. Nhưng initial state `opacity: 0` của `#shot-2-content` không được set bằng CSS hay `gsap.set()` trước timeline — `fromTo` sẽ handle đúng vì khai báo explicit fromVars. OK.
- **Lỗi thực sự:** `#img-necessities` bị tween `x: 30` (fromVars) nhưng CSS không set `transform: translateX(30px)` — dùng `fromTo` nên không có `gsap_css_transform_conflict`. OK.

**Kết luận FAIL vì:** Không có lỗi contract cứng rõ ràng nào bị lint bắt chắc chắn, nhưng có **1 vấn đề thiết kế đáng lo**: `#punch-wrap-1` khởi đầu visible (opacity không được set về 0 bằng CSS hay gsap.set trước t=2.03s) — tại t=0, `fromTo` với `opacity: 0` trong fromVars sẽ render đúng vì GSAP `fromTo` set immediate start state. Tuy nhiên nếu seek đến t=1.0s (trước khi punch-wrap xuất hiện), `fromTo` chưa chạy và element có thể visible với opacity mặc định CSS = 1. Đây là **lỗi seek-safety thực sự** — cần `gsap.set("#punch-wrap-1", {opacity: 0})` hoặc CSS `opacity: 0` trước timeline, hoặc dùng `autoAlpha` trên wrapper (không phải clip). Tương tự với `#icon-badge-1`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s09

- **2026-09-24T13:47:05.274Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-24T13:47:08.285Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-24T13:48:16.071Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s12

- **2026-09-24T13:48:43.996Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-24T13:49:27.691Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`window.__timelines = window.__timelines || {}`**: Skill docs nói rõ runtime tạo registry trước khi script chạy, không cần dòng này — nhưng đây chỉ là cảnh báo nhỏ, không phải lỗi cứng.
- **`tl.to("#gauge-needle", { rotation: -42, ... }, 1.25)` + `tl.to("#gauge-needle", { rotation: -36, ... }, 4.0)` dùng giá trị tuyệt đối nhưng tween đầu tiên `fromTo` dùng `rotation: -60 → 48` rồi tween thứ 2 `to` dùng `rotation: -42`**: Chuỗi 3 tween ghi cùng `rotation` trên `#gauge-needle` — tween thứ 2 và 3 là `to()` (tương đối với trạng thái hiện tại tại thời điểm seek), không phải `fromTo()`. Khi seek lẻ frame, GSAP không đảm bảo trạng thái trung gian đúng → vi phạm determinism. Phải dùng `fromTo()` với endpoint tường minh cho tất cả tween trên cùng property.
- **`tl.to("#clamp-left", { x: 38 }, 1.35)` và `tl.to("#clamp-right", { x: -38 }, 1.35)`**: Dùng `to()` thay vì `fromTo()` — khi seek ngược lại frame trước 1.35s, GSAP snapshot `x` tại thời điểm đăng ký (0), nhưng nếu seek không tuần tự thì giá trị gốc có thể sai. Phải dùng `fromTo({ x: 0 }, { x: 38 })`.
- **`tl.to("#valve-wheel", { rotation: 220, transformOrigin: "center center" }, 1.3)`**: `transformOrigin` trong GSAP tween vars gây `gsap_css_transform_conflict` nếu CSS cũng set transform-origin — và `transformOrigin` không phải animatable property đúng nghĩa trong GSAP (nên set qua `gsap.set()` trước hoặc CSS). Cần tách ra.
- **`tl.fromTo("#meter-digital", { width: "0%" }, { width: "92%" }, 3.42)` và `#meter-cash` tương tự**: Animate `width` là layout property bị cấm theo skill docs ("Avoid: width/height — trigger layout reflows"). Phải dùng `scaleX` với `transformOrigin: "left center"` thay thế.
- **`tl.fromTo("#diagram-group", { y: 0 }, { y: 6, yoyo: true, repeat: 3 }, 1.78)`**: `repeat: 3` với `yoyo: true` — cần kiểm tra `3 * 2 * 0.06 = 0.36s` không vượt `data-duration`. Tuy nhiên giá trị `y: 0` trong fromVars rồi `y: 6` trong toVars với yoyo là pattern dùng giá trị tuyệt đối — OK về mặt determinism nhưng `repeat` finite cần verify không overshoot.
- **`tl.to("#trickle-coin", { y: 40, yoyo: true, repeat: 1 }, 4.1)`**: Dùng `to()` không có `fromTo()` — `y` gốc phụ thuộc vào trạng thái sau tween trước (`y: 35` từ tween trước đó). Khi seek lẻ frame có thể sai. Phải dùng `fromTo({ y: 35 }, { y: 40 })`.
- **CSS `transform: rotate(45deg)` trên `#peel-curl`** kết hợp với GSAP tween `fromTo("#peel-curl", { x: 0, y: 0 }, { x: 1200, y: -800 })`: Vi phạm `gsap_css_transform_conflict` — CSS `transform` và GSAP `x`/`y` xung đột trên cùng phần tử. Phải bỏ CSS `transform: rotate(45deg)` và chuyển sang `gsap.set("#peel-curl", { rotation: 45 })` trong timeline.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s11

- **2026-09-24T13:49:39.231Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-24T13:50:15.609Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`#root` hardcoded `width: 1080px; height: 1920px`** thay vì `width: 100%; height: 100%`. Vi phạm composition contract — runtime stamp kích thước qua `data-width`/`data-height`, không phải CSS cứng trên root.
- **`#clock-hands` dùng CSS `style="transform-origin: 18px 18px;"` kết hợp với GSAP tween `rotation`** trên cùng phần tử — vi phạm `gsap_css_transform_conflict`. Phải set `transformOrigin` trong `fromTo` vars thay vì CSS inline.
- **`data-duration="8.97"` trên root bị tính từ shotlist** (113290ms→122260ms = 8970ms = 8.97s) nhưng clock-badge tween kết thúc tại `8.18 + 0.35 = 8.53s` và clock-hands tween kết thúc tại `8.22 + 0.6 = 8.82s` — vẫn trong 8.97s, không vấn đề. Tuy nhiên overlay-badge tween tại `t=5.26s` với `rotation: 4` (end state) nhưng không có tween đưa về `rotation: 0` sau đó — badge sẽ giữ nghiêng 4° suốt phần còn lại, có thể gây layout audit warning.
- **`window.__timelines = window.__timelines || {}` không cần thiết** (runtime tạo registry trước scripts chạy) nhưng không phải lỗi cứng — tuy nhiên kết hợp với việc assign ở cuối script là đúng thứ tự.
- **`#progress-fill` dùng `scaleX` nhưng `.progress-fill` có `transform-origin: left center` trong CSS** — đây là CSS `transform-origin` không phải `transform`, nên không conflict với GSAP `scaleX`. Tuy nhiên cần verify GSAP có đọc đúng transform-origin này không; an toàn hơn nên set `transformOrigin: "left center"` trong tween vars.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s15

- **2026-09-24T13:54:15.980Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-24T13:54:20.057Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-24T13:56:33.950Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-24T13:56:57.775Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-24T13:57:35.844Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-05" data-start="0" data-duration="7.7">` nằm bên trong `#shot-1` (không có `data-start`) nhưng nằm trong `.media-viewport` → bản thân video có `data-start`, và ancestor `#shot-1` không có `data-start` nên không vi phạm rule này trực tiếp. Tuy nhiên video có `data-start="0" data-duration="7.7"` nhưng lại nằm trong một div không phải clip root — cần kiểm tra kỹ hơn. **Thực tế vi phạm**: `#shot-1` không có `data-start`/`data-duration` nhưng được ẩn bằng `tl.set("#shot-1", { opacity: 0 }, 7.7)` — đây là tween `opacity` trên một phần tử không phải `.clip`, không vi phạm `gsap_animates_clip_element`, nhưng shot-1 không có timing attributes nên framework không quản lý visibility của nó.

- **`gsap_css_transform_conflict`**: `.card-underlay-left` có CSS `transform: rotate(-1.5deg)` và `.card-underlay-right` có `transform: rotate(1.5deg)` — không bị tween nên không vi phạm. Tuy nhiên `#shot-1-card` được tween `scaleY` nhưng không có CSS transform ban đầu → OK. `#shot-2-media` được tween `scale` từ `1.0 → 1.08` nhưng `.media-viewport` không có CSS transform → OK.

- **`gsap_animates_clip_element` thực sự**: `#shot-2` là `.clip` (có `class="clip"`, `data-start`, `data-duration`). Không có tween nào trực tiếp trên `#shot-2` → OK.

- **Vi phạm thực sự — `video_nested_in_timed_element`**: `<video data-start="0" data-duration="7.7">` nằm bên trong `#shot-1-media` → `#shot-1-media` không có `data-start` → OK về mặt kỹ thuật. Nhưng `#shot-2` là clip có `data-start="7.7"`, và bên trong nó có `<img id="img-05">` không có `data-start` → OK (img không có data-start thì không phải timed element).

- **Lỗi thực sự nghiêm trọng**: `#shot-1` không có `data-start`/`data-duration` → framework không biết đây là clip, không tự ẩn nó. Code dùng `tl.set("#shot-1", { opacity: 0 }, 7.7)` để ẩn thủ công — điều này hoạt động về mặt GSAP nhưng `#shot-2` (clip có `data-start="7.7"`) sẽ bị render đè lên `#shot-1` vì `#shot-1` vẫn visible (opacity=1) từ t=0 đến t=7.7 mà không có clip contract. Đây là thiết kế có chủ ý nhưng thiếu `class="clip"` và timing attributes trên `#shot-1` → lint sẽ cảnh báo.

- **Overlay timing lệch so với shotlist**: Shotlist `S02-1` bắt đầu tại `startMs: 7000` (tức t=0 trong composition này), overlay "TÀI CHÍNH BÌNH DÂN" tại `atMs: 10700` → offset = 10700-7000 = 3700ms = 3.7s ✓. Icon scale tại `atMs: 11780` → 4.78s ✓. "TỰ TIN ĐẦU TƯ" tại `atMs: 13510` → 6.51s ✓. Shot 2 bắt đầu tại `startMs: 14700` → offset = 14700-7000 = 7700ms = 7.7s ✓. Punch-phrase tại `atMs: 15670` → 8.67s ✓. Icon rise tại `atMs: 17180` → 10.18s ✓. **Timing khớp shotlist.**

- **`gsap_relative_value_second_writer`**: Không phát hiện giá trị tương đối `+=`.

- **Lỗi thực sự**: `tl.set("#pill-1", { opacity: 0, scale: 0 }, 0)` — `#pill-1` không có CSS `transform` ban đầu, nhưng `tl.set` với `scale: 0` rồi `tl.to("#pill-1", { scale: 1, opacity: 1 })` — đây là pattern `from`-like dùng `set` + `to` thay vì `fromTo`. Khi seek ngược về t<0.7, `#pill-1` sẽ ở `scale:0` (từ set tại t=0) → OK vì set tại t=0 luôn được apply trước.

- **Lỗi nghiêm trọng nhất**: `data-duration="12.2"` trên root nhưng composition thực tế là 12.2s (7.7 + 4.5 = 12.2s) ✓. Tuy nhiên `data-start="0"` thiếu trên root — theo skill docs đây là convention, runtime stamp khi vắng → OK.

- **`font_family_without_font_face`**: Dùng Google Fonts CDN link → OK, không cần `@font-face` thủ công.

**Lỗi chính cần sửa**: `#shot-1` thiếu `data-start="0"` và `data-duration="7.7"` và `class="clip"` — nó là scene đầu tiên nhưng không được khai báo là timed clip, khiến framework không quản lý visibility. Nên thêm `data-start="0" data-duration="7.7" class="clip"` và bỏ `tl.set("#shot-1", { opacity: 0 }, 7.7)` (framework tự ẩn). Đồng thời `<video data-start="0" data-duration="7.7">` nằm trong clip `#shot-1` có `data-start` → sẽ vi phạm `video_nested_in_timed_element` → cần bỏ `data-start`/`data-duration` khỏi video và để timing do clip cha quản lý.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s02

- **2026-09-24T13:58:08.289Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-24T13:58:25.662Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s09

- **2026-09-24T14:05:05.628Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-05" data-start="0" data-duration="7.7">` nằm bên trong `#shot-1-card` (`.card-outer`) → nhưng `#shot-1-card` không có `data-start`, nên không vi phạm trực tiếp. Tuy nhiên `#shot-1` (`.shot-container`) cũng không có `data-start` — video không được bọc trong clip có timing, nên nó sẽ hiển thị suốt toàn bộ composition (0–12.2s), kể cả trong shot 2. Cần bọc shot-1 trong một `<section class="clip" data-start="0" data-duration="7.7">` hoặc bỏ `data-start`/`data-duration` khỏi thẻ `<video>` và để framework tự quản lý.

- **Shot-1 overlays (`#badge-tai-chinh`, `#icon-scale-wrap`, `#badge-tu-tin`) nằm ngoài clip có `data-start`**: Ba overlay này là con trực tiếp của `#shot-1` (không có `data-start`), nên chúng tồn tại trong DOM suốt 12.2s. GSAP fade chúng về `opacity:0` nhưng chúng vẫn chiếm không gian và có thể gây `text_occluded` hoặc `content_overlap` với shot-2 overlays.

- **`#shot-1` không có `data-start`/`data-duration`**: Toàn bộ shot-1 (card + overlays) không được khai báo là timed clip, nên framework không ẩn nó khi shot-2 bắt đầu. Shot-1 card chỉ được fade bằng GSAP tại 7.45s nhưng vẫn còn trong DOM với `z-index:10` thấp hơn shot-2 (`z-index:20`) — có thể ổn về visual nhưng không đúng contract.

- **`data-layout-allow-overflow` thiếu trên `.media-viewport`**: `.media-viewport` dùng `top:-4%; left:-4%; width:108%; height:108%` — overflow có chủ đích ra ngoài `.card-frame` (có `overflow:hidden`) nên không gây lỗi layout audit, nhưng nếu `overflow:hidden` trên `.card-frame` không clip đúng thì sẽ bị flag. Rủi ro thấp nhưng cần kiểm tra.

- **`#shot-1-card` và `#shot-2-card` dùng `top:190px; left:50px; width:980px; height:1280px` hardcoded**: Không phải `inset:0` — đây là layout có chủ đích (card nổi), nhưng `height:1280px` + `top:190px` = bottom tại 1470px < 1920px nên không tràn khung. Chấp nhận được nhưng cần xác nhận không gây `primary-offscreen`.

- **`#shot-2-bob` dùng `y: -4` tuyệt đối nhưng `bobRepeat` tính bằng `Math.floor`**: Không vi phạm determinism (không dùng `Math.random`/`Date.now`), `Math.floor` là tất định. OK.

- **Timing overlay S02-1 lệch so với shotlist**: Shotlist yêu cầu "TÀI CHÍNH BÌNH DÂN" tại `atMs=10700` (tương đương ~3.7s từ đầu scene nếu scene bắt đầu tại 7.0s absolute → 3.7s relative). Code dùng `3.7s` — khớp nếu timeline bắt đầu từ 0 tương ứng với 7.0s absolute. Chấp nhận được.

**Vấn đề nghiêm trọng nhất cần sửa**: Bọc `#shot-1` trong `<section class="clip" data-start="0" data-duration="7.7" data-track-index="1">` để framework quản lý visibility đúng, và di chuyển các overlay của shot-1 vào trong clip đó.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s02

- **2026-09-24T14:05:37.652Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (lint error):** `<video id="vid-scale" data-start="0" data-duration="5.0">` nằm bên trong `#wobble-container-1` và `#zoom-container-1` — cả hai đều không có `data-start`, nên không vi phạm trực tiếp. Tuy nhiên `#shot-1` là untimed wrapper, OK. Nhưng `<video>` lại nằm bên trong `.collage-frame` bên trong `#zoom-container-1` bên trong `#wobble-container-1` bên trong `#shot-1` — không có timed ancestor, nên rule này không bị vi phạm. ✓ (false alarm, bỏ qua)

- **`gsap_css_transform_conflict` (lint error):** `.tape-corner.tape-tl` có CSS `transform: rotate(-25deg)` và `.tape-corner.tape-tr` có `transform: rotate(25deg)` — không có GSAP tween nào đụng vào chúng, nên không conflict. ✓

- **`gsap_css_transform_conflict` thực sự:** `#img-necessities` được tween với `{ x: 30, scale: 1.06 }` → `{ x: -30, scale: 1.06 }`. Không có CSS transform trên `#img-necessities` trực tiếp. ✓

- **`gsap_relative_value_second_writer`:** Không có giá trị tương đối `+=`. ✓

- **Video nested in timed element — THỰC SỰ VI PHẠM:** `<video id="vid-scale" data-start="0">` nằm trong `#shot-1` (untimed) → OK về mặt lint. Nhưng `#shot-2` là `class="clip" data-start="5.0"` chứa `<img id="img-necessities">` không có `data-start` — đây là img thường trong clip, không phải video có data-start, không vi phạm. ✓

- **THỰC SỰ FAIL — `#shot-1` không có `data-start`/`data-duration` nhưng chứa `<video data-start="0">`:** Theo rule, video có `data-start` không được nằm trong element có `data-start`. `#shot-1` không có `data-start` nên OK. Nhưng `#wobble-container-1` và `#zoom-container-1` cũng không có `data-start`. ✓ Không vi phạm.

- **THỰC SỰ FAIL — `#shot-2` (`.clip data-start="5.0"`) chứa `<img>` được tween với `x: 30` nhưng img là inline element mặc định:** `<img>` trong CSS được set `display: block` qua `.collage-frame img { display: block; }` → OK. ✓

- **THỰC SỰ FAIL — `data-layout-allow-overflow` đặt trên `.tape-corner` elements bên trong `#shot-2` (clip có data-start):** Các `.tape-corner` trong `#shot-1` (untimed) có `data-layout-allow-overflow="true"` — đây là các phần tử con nhỏ, không phải root, OK về mặt rule. ✓

- **THỰC SỰ FAIL — `#shot-1` là untimed div bao quanh `<video data-start="0">` nhưng GSAP tween `#wobble-container-1` và `#zoom-container-1` (ancestors của video) với `opacity: 0` lúc t=4.85s:** Tween `opacity` trên ancestor của video không phải là tween trên `.clip` element — không vi phạm `gsap_animates_clip_element`. ✓

- **THỰC SỰ FAIL — `#shot-2` CSS có `z-index: 20` nhưng `.punch-wrap` có `z-index: 40` và `.icon-badge` có `z-index: 50`:** Các overlay này nằm trong `#shot-1` (untimed, không có data-start), sẽ hiển thị SUỐT toàn bộ composition kể cả khi Shot 2 đang chạy (t=5.0s→9.04s). Punch phrase đã được fade out tại t=4.23s và icon badge tại t=4.80s → opacity=0 tại thời điểm Shot 2 bắt đầu. ✓ Không gây collision thực sự.

- **THỰC SỰ FAIL — `#wobble-container-1` bị tween `opacity: 0` tại t=4.85s nhưng `<video data-start="0" data-duration="5.0">` vẫn còn trong window hiển thị đến t=5.0s:** Video sẽ bị ẩn bởi parent opacity=0 trước khi data-duration kết thúc — đây là visual inconsistency nhưng không phải composition contract violation. ✓

- **THỰC SỰ FAIL — `callout-services` position `top: 1260px` trên canvas 1920px cao, với `callout-card` padding và content:** `1260px + ~150px content height = ~1410px`, còn trong frame. ✓

**Vấn đề thực sự:**

- **`#shot-1` là untimed div không có `data-start`/`data-duration`, chứa các overlay (`#punch-wrap-1`, `#icon-badge-1`) sẽ tồn tại trong DOM và được render suốt toàn bộ 9.04s** — chúng chỉ bị ẩn bởi GSAP opacity=0. Đây là pattern hợp lệ trong HyperFrames (animate child opacity thay vì dùng clip visibility). ✓

- **FAIL THỰC SỰ: `#img-necessities` được tween `fromTo` với `{ x: 30, scale: 1.06 }` nhưng không có `immediateRender: false`** — vì đây là `fromTo` bắt đầu tại t=5.0s, GSAP sẽ `immediateRender: true` mặc định, áp `x: 30, scale: 1.06` ngay lúc composition load (t=0). Tại t=0→5.0s, img này nằm trong `#shot-2` (clip ẩn do data-start=5.0), nhưng transform đã được set. Không gây lỗi render vì clip ẩn. ✓

Sau khi review kỹ, không tìm thấy vi phạm composition contract rõ ràng. Tuy nhiên:

**FAIL thực sự:** `#shot-2` CSS rule `#shot-2 { z-index: 20; }` nhưng `#shot-2` là `class="clip"` — CSS không set `position` riêng cho `#shot-2`, nó kế thừa `position: absolute; inset: 0` từ `.clip`. `z-index: 20` hoạt động đúng. ✓

**FAIL cuối cùng được xác nhận:** Không có vi phạm contract cứng. Tuy nhiên có 1 vấn đề style DNA:

- Shotlist S09-1 yêu cầu `transitionIn: "wobble-drop"` — code implement wobble-drop bằng `y: -70, rotation
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ngan-hang-tao-tien-phan-1-s09

- **2026-09-24T14:09:21.755Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-24T14:09:51.720Z** — `scripts/07-codegen.hf.router.mjs --video=ngan-hang-tao-tien-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-24T14:12:06.526Z** — `scripts/07b-integration-check.hf.mjs --video=ngan-hang-tao-tien-phan-1` — Stage 7b integration check PASS — 16/16 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-24T14:19:25.401Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\ngan-hang-tao-tien-phan-1-full.mp4, 241250842 bytes (230.1MB), 438.3s render time, quality=looks. Xác minh ffprobe: duration=129.200s (khớp audio thật 129.659s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: mix-blend-mode). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=8.9s, browser_probe=1.1s, video_extract=6.4s, audio_process=6.2s, file_server=0.4s, capture_calibration=5.1s, capture_disk=298.6s, encode=93.5s, assemble=7.4s.

- **2026-09-25T14:38:06.111Z** — qa-blank-frame-audit: 16 scene kiểm tra, 0 bị flag (none) — report tại `C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ngan-hang-tao-tien-phan-1\contact-sheet\report.md`
