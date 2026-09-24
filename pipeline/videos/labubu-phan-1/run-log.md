
- **2026-09-23T14:13:11.796Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp (model=medium, lang=vi) -> 548 captions, ghi ra pipeline/videos/labubu-phan-1/transcripts/raw-captions.json

- **2026-09-23T14:15:00.382Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 360 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/labubu-phan-1/captions/captions.json

- **2026-09-23T14:21:17.410Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 7 ảnh + 7 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/labubu-phan-1/media/{images,videos}/

- **2026-09-23T14:22:36.764Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 14 asset (7 ảnh, 7 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/labubu-phan-1/media-analysis/manifest.json

- **2026-09-23T14:24:04.728Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 10 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/labubu-phan-1/scene-plan.json + scene-plan.md

- **2026-09-23T14:25:00.551Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 15 shot trên 10 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/labubu-phan-1/shotlist.json + shotlist.md

- **2026-09-23T14:27:49.186Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-23T14:28:17.792Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-23T14:29:21.380Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`gsap_css_transform_conflict` trên `.tape-tl` và `.tape-br`**: Hai phần tử `.paper-tape` có CSS `transform: rotate(-32deg)` / `rotate(-25deg)` nhưng không có tween GSAP nào chạm vào chúng — đây không phải lỗi conflict thực sự vì GSAP không tween cùng property. Tuy nhiên cần kiểm tra lại.
- **`gsap_css_transform_conflict` thực sự trên `#cardWrapper`**: CSS không có transform tĩnh, nhưng `fromTo` đầu tiên set `rotationZ: -2, scale: 0.94` rồi tween về `rotationZ: 0, scale: 1` — OK. Tuy nhiên tween rung sau (`rotationZ: 0 → 1.2`) dùng `fromTo` với from `rotationZ: 0` chốt lại bằng `tl.set("#cardWrapper", { rotationZ: 0 }, 5.33)` — giá trị tuyệt đối, hợp lệ.
- **`#arrowHead` dùng `back.out(1.5)`**: Vi phạm quy tắc "smooth beats bouncy" — `back.out` chỉ dùng cho register explicitly-playful, không phải mũi tên diagram phóng sự điều tra. Phải đổi sang `power3.out`.
- **`#questionDot` tween `scale: 0 → 1` nhưng thiếu `transformOrigin`**: `<circle>` SVG không có `transform-origin` CSS tường minh, GSAP sẽ dùng default center của SVG viewport thay vì tâm circle tại `cx=50, cy=82` — có thể render sai vị trí. Cần thêm `svgOrigin: "50 82"` hoặc `transformOrigin: "50px 82px"` trong tween.
- **`#boxImage` idle breathe dùng `repeat: 3, yoyo: true` → 4 half-cycles = 4.8s, kết thúc tại `1.3 + 4.8 = 6.1s`**, sau đó `tl.set("#boxImage", { scale: 1 }, 6.1)` — logic đúng. Nhưng `tl.set` trên `#boxImage` (không phải `.clip`) là hợp lệ.
- **`#questionGlow` và `#questionBadge` dùng `repeat: 3, yoyo: true` (4 half-cycles × 0.25s = 1.0s)** bắt đầu tại `5.9s`, kết thúc `6.9s` — nhưng `#questionOverlay` bị ẩn tại `6.93s`. Không có `tl.set` chốt lại `scale/opacity` của glow và badge về trạng thái cuối sau khi yoyo xong — có thể kẹt ở giá trị giữa chừng khi seek. Cần thêm `tl.set` chốt sau khi repeat kết thúc.
- **`data-layout-allow-overflow="true"` đặt trên `#cardWrapper` và `#boxImage`**: `#cardWrapper` là phần tử con cụ thể — chấp nhận được. Nhưng `#boxImage` là `<img>` bên trong `#cardWrapper` đã có overflow:hidden — không cần thiết và có thể gây nhầm lẫn audit scope.
- **`assetTreatment` yêu cầu "các hình nhân người bìa carton xung quanh đổi sang grayscale tương phản cao với bóng cam đặc"** — code không áp dụng bất kỳ CSS filter grayscale nào lên ảnh hay các phần tử phụ. Tuy nhiên theo quy tắc dự án "ảnh luôn dùng làm nền toàn khung, giữ nguyên màu" — đây là mâu thuẫn giữa shotlist và quy tắc dự án, không phải lỗi code.
- **`transitionIn: "peel"` được mô phỏng bằng `clipPath` polygon + `peelFlap`**: Chấp nhận được về tinh thần, nhưng `clipPath` animation trên `#cardWrapper` (`polygon(25% 0%...)`) không thực sự tạo hiệu ứng peel góc — nó chỉ wipe từ trái sang. Đây là sai lệch rõ so với mô tả "bóc nhãn hé lộ" nhưng không vi phạm composition contract.

**Lỗi cứng cần sửa**: `back.out` trên `#arrowHead` (vi phạm style DNA motion doctrine), thiếu `transformOrigin`/`svgOrigin` trên `#questionDot` scale tween (silent render bug), thiếu `tl.set` chốt trạng thái sau repeat yoyo của `#questionGlow` và `#questionBadge`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\labubu-phan-1-s06

- **2026-09-23T14:29:27.979Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\labubu-phan-1-s09

- **2026-09-23T14:29:34.172Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-23T14:30:15.170Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (lint error)**: `<video id="vid-01-media" data-start="0" data-duration="3.19">` nằm bên trong `#shot-1` (untimed wrapper) — nhưng video tự mang `data-start`, trong khi `#shot-1-camera` và `#video-frame-container` là ancestors không timed. Tuy nhiên vấn đề thật hơn: video có `data-start="0"` nhưng không có `class="clip"` và nằm sâu trong DOM — lint sẽ cảnh báo `timed_element_missing_clip_class`. Quan trọng hơn: `#shot-1` (div cha) không có `data-start`/`data-duration` nhưng video con lại có — đây là pattern hợp lệ về mặt kỹ thuật, nhưng cần kiểm tra kỹ.

- **Camera shake dùng `tl.to` tương đối trên `y` sau `fromTo` trên cùng `#shot-1-camera`**: Tại t=0 có `fromTo(#shot-1-camera, {scale:1.0}, {scale:1.08, duration:3.19})`, sau đó tại t=0.22 có `tl.to(#shot-1-camera, {y:-14})`, t=0.27 `{y:10}`, v.v. — đây là **`gsap_relative_value_second_writer`** risk: nhiều tween ghi `y` trên cùng element theo chuỗi `to()` không dùng `fromTo()`, khi seek lẻ frame sẽ desync. Phải dùng `fromTo` với endpoint tường minh cho mỗi shake step.

- **`back.out(1.4)` trên `#icon-warning-box`**: Vi phạm doctrine "smooth beats bouncy" — `back.out` chỉ dùng cho register explicitly-playful. Tone của scene này là investigative/serious (toà án, rủi ro pháp lý), không phải playful. Phải đổi sang `power3.out`.

- **`#shot-1` fade out bằng `tl.to("#shot-1", {opacity:0, duration:0.01}, 3.19)`**: `#shot-1` không phải `.clip` element (không có `data-start`) nên framework không quản lý visibility — tween opacity trực tiếp trên nó là hợp lệ về mặt kỹ thuật. Tuy nhiên `#shot-1` chứa video `data-start="0" data-duration="3.19"` — framework sẽ ẩn video tại t=3.19 rồi, nhưng các overlay con (`#label-inflation`, `#icon-rise-box`, `#gavel-strike`) không có `data-start` nên sẽ vẫn visible sau 3.19s trừ khi bị ẩn bởi parent opacity. Đây là thiết kế mong manh nhưng không phải lỗi cứng.

- **`warning-triangle-path` là `<polygon>` không phải `<path>`**: `getTotalLength()` không tồn tại trên `<polygon>` element — sẽ throw runtime error (hoặc trả về undefined), khiến `strokeDashoffset` animation bị skip silently. Phải đổi thành `<path d="M50,14 L90,82 L10,82 Z">` để dùng `getTotalLength()`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\labubu-phan-1-s10

- **2026-09-23T14:30:40.708Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-23T14:30:52.520Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-23T14:31:07.481Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-23T14:31:18.184Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (error)**: `<video id="vid-05" data-start="0" data-duration="5.22">` nằm bên trong `#shot-1` là một phần tử không có `data-start`, nhưng quan trọng hơn — video này có `data-start` trong khi tổ tiên `#shot1-unfold` và `#shot1-camera` không có `data-start`. Tuy nhiên vấn đề thực sự là `#shot-1` (`.shot-stage`) không có `data-start` nhưng video bên trong lại có — cần kiểm tra lại. Thực ra lỗi nghiêm trọng hơn: **video có `data-start="0"` và `data-duration="5.22"` nhưng nằm trong `.newspaper-card` → `.video-window`**, không phải trực tiếp con của root. Lint sẽ bắt nếu bất kỳ ancestor nào cũng có `data-start`. Cần xác nhận `#shot1-unfold` không có `data-start` — trong code này không có, nên tạm ổn về rule này.

- **Shot 1 không có `data-start`/`data-duration` trên `#shot-1`**: `#shot-1` dùng class `shot-stage` (không phải `clip`) và không có `data-start`/`data-duration`. Điều này có nghĩa Shot 1 luôn visible trong suốt composition (kể cả khi Shot 2 đang hiển thị từ 5.22s–10.08s), gây **occlusion/overlap** với Shot 2. Đúng ra `#shot-1` phải có `data-start="0" data-duration="5.22" class="clip"` để framework ẩn nó đúng lúc.

- **`gsap_css_transform_conflict` tiềm năng**: `#shot2-polaroid-inner` có CSS `transform-origin: 50% 10%` nhưng không có CSS `transform` khởi tạo — tuy nhiên `#shot2-polaroid` được tween `rotation: 3` trong `fromTo`, còn `#shot2-polaroid-inner` được tween `rotation: -1.5 → 1.5`. Hai phần tử khác nhau nên không conflict trực tiếp. Tuy nhiên `.shot1-camera` có CSS không có `transform` ban đầu nhưng được tween `scale: 1 → 1.05` — `fromTo` với `scale: 1` ở from là an toàn.

- **`data-layout-allow-overflow` đặt trên `#shot1-camera` và `#shot2-polaroid`**: Theo quy tắc bắt buộc, không được đặt trên `#root`, nhưng đặt trên các phần tử con cụ thể là chấp nhận được. Tuy nhiên `#shot1-camera` bao toàn bộ Shot 1 — blast radius rộng nhưng không vi phạm cứng.

- **Lỗi chính cần sửa**: `#shot-1` phải là `class="clip" data-start="0" data-duration="5.22"` để framework quản lý visibility đúng, tránh Shot 1 đè lên Shot 2.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\labubu-phan-1-s04

- **2026-09-23T14:34:22.162Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-23T14:35:41.360Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-23T14:35:43.946Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-23T14:40:24.184Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="shot1-video">` có `data-start="0"` và `data-duration="3.6"` nhưng nằm bên trong `.media-viewport` → `.media-card` → `#shot-1` (không có data-start) → `#root`. Tuy nhiên vấn đề thực sự là video có `data-start` nằm trong một ancestor element không phải sub-comp host — cần kiểm tra lại. Thực ra `#shot-1` không có `data-start` nên không vi phạm rule này. **Tuy nhiên**, video có `data-start="0"` + `data-duration="3.6"` nhưng lại bị ẩn/hiện bởi `tl.set("#shot-1", {opacity: 0}, 3.6)` — framework sẽ tự quản lý visibility của video theo `data-start/data-duration`, có thể xung đột với việc ẩn container `#shot-1` bằng GSAP.

- **`gsap_animates_clip_element` risk**: `tl.set("#shot-1", {opacity: 0}, 3.6)` và `tl.set("#shot-2", {opacity: 1}, 3.6)` — `#shot-1`/`#shot-2` không có `data-start` nên không phải clip element, nhưng `#shot-2` ban đầu `opacity: 0` trong CSS rồi được set `opacity: 1` bằng GSAP — đây là pattern dễ gây desync khi seek ngược.

- **`gsap_css_transform_conflict`**: `#shot2-img` có tween `fromTo({x: -30, scale: 1.06}, {x: 25, scale: 1.06})` — `scale` không thay đổi giữa from và to nhưng không phải lỗi cứng. Tuy nhiên không có CSS transform conflict rõ ràng ở đây.

- **Thiếu `class="clip"` trên video**: `<video id="shot1-video">` có `data-start` nhưng không cần `class="clip"` (đúng với quy ước — video không cần class clip). OK.

- **`data-layout-allow-overflow` đặt trên `<video>` element**: `data-layout-allow-overflow="true"` đặt trực tiếp trên `<video id="shot1-video">` — không sai cứng nhưng không có tác dụng vì video không phải container có overflow.

- **Shot 2 không có `data-start` trên `<img>`**: `<img id="shot2-img">` không có `data-start` — đây là ảnh tĩnh dùng làm nền, không cần timing riêng, OK. Nhưng `#shot-2` container cũng không có `data-start/data-duration`, toàn bộ shot 2 được điều khiển bằng GSAP opacity set — không phải clip thật, framework không biết shot 2 tồn tại từ 3.6s-6.81s. Điều này có thể gây vấn đề với layout audit vì các element của shot 2 luôn trong DOM nhưng ẩn bằng CSS `opacity: 0`.

- **`s2-punch-phrase` exit không được animate**: Label "LÀN SÓNG VĂN HÓA" xuất hiện lúc 5.21s, holdMs 1600ms → nên exit ~6.81s (cuối clip). Không có tween exit — OK vì clip kết thúc tại đó.

- **`s2-label` exit tại 5.6s nhưng `s2-punch-phrase` vào lúc 5.21s**: Hai element overlap từ 5.21s đến 5.6s — `s2-label` (VƯỢT XA GIẢI TRÍ) và `s2-punch-phrase` (LÀN SÓNG VĂN HÓA) cùng hiển thị trong `.s2-top-block` — có thể gây `content_overlap` nếu chúng cùng vị trí.

- **Lỗi nghiêm trọng nhất — `Math.random()` không dùng nhưng SVG `feTurbulence` grain**: `feTurbulence` với `baseFrequency="0.75"` là deterministic (không random theo frame), OK.

- **`#s1-punch-phrase` exit tại 2.44s nhưng `#s1-clock-badge` exit tại 2.78s**: Cả hai nằm trong `.s1-header-bar` — không overlap vị trí nên OK.

Lỗi **nghiêm trọng nhất cần sửa**: Shot 1 và Shot 2 không được khai báo là clip (`data-start`/`data-duration`) — toàn bộ timing dựa vào GSAP opacity manipulation thay vì HyperFrames clip system. Điều này không vi phạm contract cứng (không bắt buộc phải dùng clip system) nhưng kết hợp với việc `<video>` có `data-start="0" data-duration="3.6"` nằm trong container không có timing → framework sẽ show/hide video theo timing riêng của nó, trong khi container `#shot-1` bị ẩn bởi GSAP tại t=3.6s — **có thể gây double-hide hoặc flash**.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\labubu-phan-1-s09

- **2026-09-23T14:45:02.180Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (lint error)**: `<video id="shot1-video" data-start="0" data-duration="3.6">` nằm bên trong `#shot-1` là một container không có `data-start`, nhưng `#shot-1` lại là con trực tiếp của root — không vi phạm rule này. Tuy nhiên, `#shot-1` **không có** `data-start`/`data-duration`, trong khi `#shot-2` có. Shot 1 sẽ luôn hiển thị (không bị ẩn theo timing), chồng lên Shot 2 trong khoảng 3.6s–6.81s. Cần thêm `data-start="0" data-duration="3.6"` vào `#shot-1`.
- **`tl.set("#shot-1", { opacity: 0 }, 3.6)`** vi phạm quy tắc không tween `opacity`/`visibility` trên `.clip` element (hoặc element có `data-start`). Nếu `#shot-1` được thêm `data-start`, đây là `gsap_animates_clip_element`. Nếu không thêm `data-start`, thì Shot 1 không được ẩn đúng cách bởi framework. Cần xử lý bằng cách cho `#shot-1` là timed clip và bỏ `tl.set`.
- **`#shot1-video` có `data-start="0" data-duration="3.6"` nhưng nằm trong `media-viewport` → `shot1-card` → `#shot-1`**: nếu `#shot-1` được thêm `data-start`, video sẽ bị lint bắt lỗi `video_nested_in_timed_element`. Giải pháp: bỏ `data-start`/`data-duration` khỏi video (để framework suy ra từ media length), hoặc time wrapper thay vì video.
- **`tl.to("#s1-punch-phrase", { opacity: 0, y: -20, ... }, 2.44)`**: dùng `y` tương đối sau `fromTo` đã set `y: 0` — không phải relative value (`+=`) nên không vi phạm `gsap_relative_value_second_writer`, nhưng `y: -20` là absolute, OK.
- **`tl.to(["#shot1-card", "#s1-tag-1", "#s1-tag-2"], { opacity: 0, ... }, 3.35)`**: nếu `#shot1-card` không phải clip element thì OK. Không vi phạm.
- **Shot 1 header bar (`#s1-punch-phrase`, `#s1-clock-badge`) không có `data-start`** — chúng nằm ngoài `#shot-1` timed scope, sẽ hiển thị ngay từ t=0 kể cả khi Shot 2 đang chạy (vì `#shot-1` không được ẩn đúng cách). Đây là hệ quả của issue chính ở trên.

**Root cause**: `#shot-1` thiếu `data-start="0" data-duration="3.6"` khiến Shot 1 không được framework quản lý timing, dẫn đến chồng lấn với Shot 2 trong nửa sau composition.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\labubu-phan-1-s09

- **2026-09-23T14:49:51.950Z** — `scripts/07-codegen.hf.router.mjs --video=labubu-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-23T14:50:59.879Z** — `scripts/07b-integration-check.hf.mjs --video=labubu-phan-1` — Stage 7b integration check PASS — 10/10 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-23T14:55:57.827Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\labubu-phan-1-full.mp4, 279516359 bytes (266.6MB), 297.2s render time, quality=looks. Xác minh ffprobe: duration=70.800s (khớp audio thật 71.262s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=11.3s, browser_probe=0.8s, video_extract=4.4s, audio_process=3.9s, file_server=0.0s, capture_calibration=4.7s, capture_disk=192.3s, encode=62.3s, assemble=8.8s.
