
- **2026-09-25T10:02:45.228Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 930 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ajinomoto-chip-phan-1\transcripts\raw-captions.json

- **2026-09-25T10:04:41.467Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 536 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\ajinomoto-chip-phan-1\captions\captions.json

- **2026-09-25T10:04:41.497Z** — `scripts/run-stages-1-6.mjs --video=ajinomoto-chip-phan-1` — THẤT BẠI trước Stage 5 — Nhánh media (Stage 02b):   6. Vox-style paper-tear animation aesthetic. Layered paper collage. Scene 6: The 2021 global semiconductor chip crisis. A dramatic scene showing an Intel corporate executive in a suit on a press stage, surrounded by warning headlines of chip shortages, highlighting a microscopic translucent film layer labeled 'ABF (Ajinomoto Build-up Film)' holding up the entire global chip supply chain. Tactile paper textures, torn edges, high-contrast 2D infographic illustration. 9:16 vertical composition
  7. Vox-style paper-tear animation aesthetic. Layered paper collage. Scene 7: A dramatic conceptual juxtaposition: a giant classic red-and-white Ajinomoto seasoning package on one side morphing seamlessly into an ultra-advanced glowing semiconductor microchip on the other side. A bold cut-out question mark in the center against a deep blue circuit paper background. Tactile paper textures, torn paper borders, high-contrast flat 2D illustration. 9:16 vertical composition
  8. Vox-style paper-tear animation aesthetic. Layered paper collage. Scene 8: The 1990s personal computer boom. Retro beige desktop computers, CRT monitors with green code, and fast-spinning clock speed dials tearing through the background, showing the explosive growth of computing power and rising semiconductor engineering challenges. Tactile paper textures, torn edges, nostalgic 90s tech paper cutout aesthetic, high-contrast 2D illustration. 9:16 vertical composition
  9. Vox-style paper-tear animation aesthetic. Layered paper collage. Scene 9: An extreme close-up of a tiny computer processor chip held between human fingers, measuring no bigger than a fingernail, with paper layers peeling back to reveal billions of microscopic transistors and dense layered nanofabrication pathways inside. Tactile paper textures, sharp torn paper edges, vibrant high-contrast 2D infographic illustration. 9:16 vertical composition
  10. Vox-style paper-tear animation aesthetic. Layered paper collage. Scene 10: The physical mismatch engineering dilemma: A close-up split comparison between the underside of a modern CPU chip with over 1,700 microscopic contact pins thinner than human hair, and a large green computer motherboard with wide trace lines and giant solder pads, illustrating the huge connection gap. Tactile paper textures, torn paper edges, high-contrast technical 2D illustration. 9:16 vertical composition

Mở https://flow.google.com/ (profile: C:\vox-style-xe-giay-v1-hyperframes\pipeline\.flow-profile\flow-02) ...
Đã vào: Google Flow – Studio sáng tạo AI cho video, hình ảnh và công cụ tuỳ chỉnh (https://flow.google.com/)

== 1-tao-anh (tối đa 25 bước) ==
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 17:02:55)
  [9router] xong sau 6.1s
- [2026-09-25T10:03:01.461Z] [1-tao-anh][bước 1] click — Bấm vào nút 'Dự án mới' để tạo một project mới. (@e3, model: 6097ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 17:03:10)
  [9router] xong sau 4.5s
- [2026-09-25T10:03:15.196Z] [1-tao-anh][bước 2] wait — Dự án mới đang được tạo và trang đang tải, cần chờ vài giây để vào giao diện project. (model: 4463ms)

⚠ Không chụp được màn hình ở giai đoạn "1-tao-anh", bước 3: Failed to read: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. (os error 10060)

⚠ TRÌNH DUYỆT/PHIÊN ĐÃ ĐÓNG giữa giai đoạn "1-tao-anh" (account "flow-02", người dùng tự đóng, hoặc lỗi kết nối nghiêm trọng): Failed to read: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. (os error 10060). KHÔNG tự động chuyển account.

Log chi tiết: C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ajinomoto-chip-phan-1\media-generate-log.md
Trình duyệt do agent-browser quản lý (session "flow-media-agent-flow-02") vẫn có thể đang mở — dùng "C:\vox-style-xe-giay-v1-hyperframes\node_modules\agent-browser\bin\agent-browser-win32-x64.exe --session flow-media-agent-flow-02 close" để đóng khi xong.

Không chuyển sang account dự phòng khác (lý do không đáng fallback) — dừng hẳn tại đây.

⚠ ĐÃ DỪNG SAU 1 LẦN THỬ ACCOUNT:
  - "flow-02": giai đoạn "1-tao-anh" — page-closed: Failed to read: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. (os error 10060)

Log chi tiết: C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ajinomoto-chip-phan-1\media-generate-log.md

- **2026-09-25T10:11:21.290Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 8 ảnh + 8 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/ajinomoto-chip-phan-1/media/{images,videos}/

- **2026-09-25T10:12:57.970Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 16 asset (8 ảnh, 8 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ajinomoto-chip-phan-1/media-analysis/manifest.json

- **2026-09-25T10:14:01.849Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 19 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ajinomoto-chip-phan-1/scene-plan.json + scene-plan.md

- **2026-09-25T10:15:03.949Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 20 shot trên 19 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ajinomoto-chip-phan-1/shotlist.json + shotlist.md

- **2026-09-25T10:17:22.457Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-25T10:17:25.876Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-25T10:17:27.720Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-25T10:17:44.854Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-25T10:18:08.226Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-25T10:18:14.692Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-25T10:18:57.783Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-25T10:19:31.072Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-25T10:19:41.482Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-25T10:20:33.236Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-04">` có `data-start="0"` nhưng nằm bên trong `#media-viewport` → `#card-frame` → `#card-stage` (không có data-start) — thực ra không vi phạm vì các ancestor không có `data-start`. Tuy nhiên `<video>` có `class="clip media-asset"` với `inset:0` nhưng lại nằm trong `#media-viewport` (không phải root), nên `class="clip"` ở đây không gây lỗi layout nhưng cần kiểm tra kỹ.
- **`data-layout-allow-overflow` đặt trực tiếp trên `<video>` và `#img-wrap`**: Theo quy tắc bắt buộc, cờ này phải đặt trên phần tử con cụ thể cần opt-out, không phải trên root — điều này OK về mặt kỹ thuật, nhưng đặt trên `<video>` (media element) là bất thường và có thể gây tắt audit không cần thiết.
- **`gsap_css_transform_conflict` trên `#img-07`**: CSS không set transform trực tiếp trên `#img-07`, nhưng tween `fromTo("#img-07", { x: 40, scale: 1.1 }, { x: -40, scale: 1.1 })` — `scale: 1.1` giống nhau ở cả from và to nên không phải conflict thật sự. Tuy nhiên `x: 40` (from) vs `x: -40` (to) là giá trị tuyệt đối, OK.
- **`gsap_relative_value_second_writer` tiềm ẩn**: `tl.to("#pill-1", { opacity: 0, y: -10 })` dùng `y: -10` là giá trị tuyệt đối — OK. Nhưng exit tween của pill-1 tại `t=2.2` chồng lên `data-duration` kết thúc tại `t=2.45` (0.65+1.8), tween exit kết thúc tại `2.2+0.25=2.45` — khớp đúng, không vấn đề.
- **`content_overlap` / `text_occluded` tiềm ẩn**: `#punch-box` có `punch-pos` với `top: 1100px` và `#pill-3` có `badge-bottom-left` với `top: 1220px` — hai phần tử này KHÔNG overlap về thời gian (punch kết thúc t=7.43, pill-3 bắt đầu t=10.1), OK.
- **Vi phạm rõ ràng — `badge-top-left` và `badge-bottom-left` override `inset:0` từ `.clip`**: Các overlay badge dùng `class="clip pill-badge badge-top-left"` — `.clip` set `inset:0` nhưng `.badge-top-left` chỉ set `top/left/right/bottom` riêng lẻ. Vì `.badge-top-left` set `right: auto; bottom: auto` nên `inset:0` bị ghi đè một phần — `width: auto; height: auto` cũng được set, nên kích thước co theo nội dung. Điều này có thể hoạt động nhưng là pattern dễ gây lỗi layout audit vì `inset:0` ban đầu kéo phần tử full-frame trước khi bị override.
- **`window.__timelines = window.__timelines || {}`**: Theo skill doc, runtime tạo registry trước khi script chạy, dòng này không cần thiết nhưng không gây lỗi — chỉ là noise.
- **Lỗi nghiêm trọng nhất — `#brand-bar` dùng `width: 1080px` hardcode**: Vi phạm quy tắc không hardcode pixel width trên phần tử layout. Nên dùng `width: 100%`.
- **`#card-stage` có `height: 1280px` và `top: 210px`**: `210 + 1280 = 1490px < 1920px` — không tràn khung, OK. Nhưng `width: 960px` + `left: 60px` = `1020px < 1080px` — OK.
- **`tl.set("#card-meta", { innerText: "..." })` tại t=7.66**: `innerText` không phải thuộc tính GSAP chuẩn cho `set()` — nên dùng DOM manipulation trực tiếp hoặc cách khác. Đây là lỗi tiềm ẩn có thể không hoạt động đúng khi seek.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ajinomoto-chip-phan-1-s03

- **2026-09-25T10:20:48.597Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-25T10:20:52.218Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-08" data-start="0" data-duration="9.55">` nằm bên trong `<div id="camera" class="camera-layer">` — phần tử cha `#camera` không có `data-start` nên không phải timed element theo nghĩa strict, nhưng `#camera` lại có `data-layout-allow-overflow="true"` đặt trực tiếp trên wrapper của video. Vấn đề thực sự: video có `data-start` nhưng cha trực tiếp là `#camera` không phải clip — đây là pattern hợp lệ về mặt kỹ thuật, tuy nhiên cần kiểm tra lại vì lint có thể bắt nếu `#camera` được coi là timed ancestor.

- **`data-layout-allow-overflow` đặt sai chỗ**: `data-layout-allow-overflow="true"` đặt trên `#camera` (wrapper của toàn bộ video layer) — cờ này lan xuống toàn bộ subtree qua `closest()`, tắt layout audit cho mọi phần tử con bên trong camera layer. Nên đặt trên phần tử cụ thể cần opt-out, không phải wrapper lớn.

- **Overlay slots thiếu `data-start`/`data-duration`**: `#slot-1`, `#slot-2`, `#slot-3` là các `div.overlay-slot` chứa card nhưng không có `data-start`/`data-duration` — chúng luôn hiển thị trong DOM (không bị ẩn bởi framework). Visibility hoàn toàn phụ thuộc vào GSAP `opacity: 0` khởi đầu. Nếu seek đến giữa timeline mà GSAP chưa chạy từ đầu, card có thể hiện ra sai thời điểm. Nên dùng `data-start`/`data-duration` trên wrapper hoặc ít nhất trên card để framework kiểm soát visibility.

- **Overlay 3 xuất hiện tại 7.20s nhưng freeze frame bắt đầu 8.0s**: Shotlist ghi overlay "CHUỖI BÁN DẪN ĐỈNH CAO" `atMs: 89230` = 89230 - 82030 = **7.20s** tương đối — hợp lệ. Tuy nhiên reticle xuất hiện lúc 7.9s trong khi overlay 3 đã hiện từ 7.20s, hai phần tử chồng lên nhau tại vùng giữa màn hình có thể gây `content_overlap`.

- **`window.__timelines = window.__timelines || {}`**: Theo skill docs, runtime đã tạo registry trước khi script chạy, dòng này không cần thiết nhưng không gây lỗi — minor.

- **Thiếu `class="clip"` trên video**: `<video id="vid-08">` không có `class="clip"` — lint sẽ warn `timed_element_missing_clip_class`. Tuy nhiên skill docs ghi "Omit it on `<video>` and `<audio>`" nên đây không phải lỗi thật.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ajinomoto-chip-phan-1-s09

- **2026-09-25T10:20:59.640Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S19` — Codegen HyperFrames scene [S19] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s19.html.

- **2026-09-25T10:21:02.734Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-25T10:21:09.604Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-25T10:21:11.692Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-crisis" data-start="0" data-duration="7.01">` nằm bên trong `#video-card` không có `data-start`, nhưng `#video-card` lại nằm bên trong `#camera-shake` và `#camera-pan` đều có `class="clip"` — tuy nhiên vấn đề thực sự là `<video>` có `data-start` trong khi tổ tiên `#camera-pan` và `#camera-shake` cũng có `class="clip"` với `data-start` tiềm ẩn. Kiểm tra lại: `#camera-pan` và `#camera-shake` có `class="clip"` nhưng **không có `data-start`** → không phải timed element → không vi phạm rule này. Tuy nhiên `<video>` có `data-start="0"` nằm trong `#video-card` không có `data-start` → **hợp lệ về mặt nesting**. Bỏ issue này.

- **`back.out` trên warning-stamp**: `ease: "back.out(1.4)"` dùng cho overlay warning — vi phạm style DNA "smooth beats bouncy", `back.out` chỉ dùng cho register explicitly-playful. Một cảnh khủng hoảng nghiêm trọng không phải context playful. Nên dùng `power4.out` hoặc `expo.out`.

- **`gsap_relative_value_second_writer` tiềm ẩn**: `#camera-shake` dùng `tl.to` với keyframes `y` tại t=0.02s, sau đó lại `tl.to` với keyframes `y` tại t=3.24s — hai tween ghi cùng thuộc tính `y` (và `x`) trên cùng phần tử ở các thời điểm khác nhau. Không dùng giá trị tương đối nên không vi phạm rule `gsap_relative_value_second_writer`, nhưng GSAP overwrite behavior giữa hai tween `to` trên cùng property có thể gây desync khi seek. Nên dùng `fromTo` với endpoint tường minh cho cả hai shake burst.

- **`#punch-card` exit tween dùng `y: -25` (giá trị tuyệt đối)** nhưng tween entry đã đưa `y` về `0` — exit tween là `tl.to` không phải `fromTo`, nên khi seek ngược lại giá trị `y` start của exit tween phụ thuộc vào state hiện tại thay vì được khai báo tường minh. Nên dùng `fromTo` cho exit tweens.

- **`#warning-stamp` exit tween**: tương tự — `tl.to` không khai báo from-state tường minh cho `scale` và `opacity`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ajinomoto-chip-phan-1-s10

- **2026-09-25T10:22:13.893Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s18.html.

- **2026-09-25T10:22:49.264Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-25T10:22:56.452Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="cpu-video" data-start="0" data-duration="8.21">` nằm bên trong `#video-frame` (không có data-start), nhưng `#video-frame` nằm trong `#pan-wrap` → `#pan-wrap` nằm trong `#strike-wrap`. Không có vấn đề trực tiếp ở đây vì các wrapper không có data-start. Tuy nhiên, `<video>` có `data-start` nhưng không có `class="clip"` — lint sẽ cảnh báo `timed_element_missing_clip_class`. Quan trọng hơn: video có `data-start="0"` và `data-duration="8.21"` nhưng lại nằm bên trong `#video-frame` không phải là sub-composition host — đây là cách dùng sai: video không cần `data-start`/`data-duration` khi nó không phải clip độc lập ở root level; thời gian nên được kiểm soát bởi wrapper hoặc bỏ data-start trên video.

- **`gsap_css_transform_conflict`**: `#counter-card` được định nghĩa với `top: 1185px` (CSS position tĩnh) và sau đó GSAP tween `y: 35 → 0`. Không có CSS `transform` tường minh nhưng `#punch-card` tương tự có `opacity: 0` trong CSS — GSAP `fromTo` với `opacity` sẽ conflict với CSS `opacity: 0` ban đầu (CSS initial state + GSAP fromTo cùng property).

- **`gsap_relative_value_second_writer` risk**: Laser scan dùng `repeat: 2, yoyo: true` với `y: 0 → 780` — `repeat` finite là OK, nhưng `yoyo` kết hợp với `repeat: 2` tạo ra 3 passes (0→780, 780→0, 0→780), tổng duration = 2.1×3 = 6.3s từ t=0.4s → t=6.7s, vượt qua nhiều mốc animation khác. Không phải lỗi contract nhưng có thể gây visual conflict.

- **Counter tween dùng object proxy `counterTarget`** với `onUpdate` — đây là pattern hợp lệ nhưng `counterTarget` là object JS thông thường, không phải DOM element. GSAP `fromTo(counterTarget, ...)` hoạt động nhưng `onUpdate` callback gọi `counterEl.textContent` — nếu seek ngược lại frame trước t=4.0s, `counterEl` sẽ hiển thị giá trị cuối cùng được set thay vì 0 (không deterministic khi seek). Cần dùng `snap` hoặc đảm bảo `fromTo` luôn reset đúng.

- **`data-layout-allow-overflow` thiếu**: `#punch-card` ở `top: 1355px`, height `140px` → bottom edge tại `1495px`. `#bottom-accent-bar` ở bottom:0 (height 1920px). Safe zone bottom thường là ~1529px (tùy project). Cần kiểm tra xem punch-card có bị cắt không, nhưng 1495px < 1529px nên tạm ổn.

- **Không có `data-start`/`data-duration` trên các clip div chính** (`#counter-card`, `#punch-card`, `#header-bar`): các phần tử này xuất hiện/biến mất hoàn toàn qua GSAP opacity nhưng không có timing attributes — lint sẽ không coi chúng là clips, và chúng sẽ visible ngay từ t=0 (trước khi GSAP tween chạy). `#punch-card` có `opacity: 0` trong CSS nên OK, nhưng `#counter-card` và `#header-bar` không có opacity:0 ban đầu → visible ngay từ frame 0 trước animation.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ajinomoto-chip-phan-1-s17

- **2026-09-25T10:22:56.486Z** — `scripts/run-stages-1-6.mjs --video=ajinomoto-chip-phan-1` — Stage 1-6 xong, Stage 7 THẤT BẠI (mã 1) — 19 scene (S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19). Xem log ở trên hoặc sửa bằng --issue-file rồi chạy lại đúng scene.

- **2026-09-25T10:26:09.702Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-25T10:26:24.233Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s17.html.

- **2026-09-25T10:27:33.440Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-25T10:29:22.239Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element` (lint error)**: `#vid-04` có `data-start` nhưng đồng thời bị tween `scale` từ 1→1.08 qua GSAP — không phải lỗi nesting, nhưng quan trọng hơn: `#vid-04` là `<video data-start>` và đồng thời bị tween `clipPath` + `scale` + `opacity`. Vấn đề thật: `#vid-04` vừa là timed element (có `data-start`) vừa bị tween `scale` — tween `scale` trên chính `.clip` video element vi phạm `gsap_animates_clip_element` (framework owns clip visibility/transform). Cần bọc video trong wrapper div timed, để tween scale/clipPath lên wrapper hoặc inner element.
- **`gsap_relative_value` / double-tween conflict trên `#img-07`**: element `#img-07` bị 2 `fromTo` riêng biệt cùng ghi `opacity` và `x` tại `t=7.66` — tween opacity (`opacity: 0→1`) và tween pan (`x: 30→-30, immediateRender: false`) chạy song song trên cùng element. `immediateRender: false` trên tween thứ hai không đủ để tránh conflict khi seek lẻ frame; nên gộp thành 1 `fromTo` duy nhất với đủ properties.
- **`video_nested_in_timed_element` thật sự**: `#vid-04` là `<video data-start="0">` nằm trực tiếp dưới `#root` — đây hợp lệ. Tuy nhiên `#clip-meta-1` (timed div, `data-start="0"`) chứa `#meta-shot-1` bị tween `clipPath` — `clipPath` tween trên child của clip là OK. Không có lỗi nesting thật ở đây.
- **Tween `scale` trên `<video data-start>` (chính element timed)**: `tl.fromTo("#vid-04", { scale: 1 }, { scale: 1.08, ... })` — `#vid-04` có `data-start` nên là timed/clip element; tween transform trực tiếp lên nó vi phạm `gsap_animates_clip_element`. Phải bọc video trong `<div class="clip" data-start data-duration>` và tween scale lên div wrapper (hoặc inner wrapper), để video bên trong không có `data-start`.
- **Timing TẢO BẸ KOMBU lệch shotlist**: shotlist `atMs: 30030, holdMs: 1200` → relative to scene start `19540ms`: `30030-19540 = 10490ms = 10.49s` — code dùng `data-start="10.49"` đúng. Nhưng `data-duration="0.81"` (đến 11.3s) trong khi shotlist `holdMs: 1200` → nên kéo đến `10.49+1.2=11.69s` vượt `data-duration="11.3"` của root — cần điều chỉnh hoặc clamp. Đây là minor nhưng overlay bị cắt sớm.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ajinomoto-chip-phan-1-s03

- **2026-09-25T10:34:13.897Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-04" data-start="0" data-duration="7.66">` nằm bên trong `#shot-1-scaler` → `#shot-1-frame` → `#shot-1-stage`. Mặc dù `#shot-1-stage` không có `data-start`, nhưng `<video>` tự mang `data-start` trong khi đồng thời là con của một phần tử không-timed — điều này ổn về mặt nesting. Tuy nhiên, `#shot-2-clip` (có `data-start="7.66"`) chứa `<img id="img-07">` được tween trực tiếp bằng GSAP (`x`, `scale`, `opacity`) — `<img>` không phải video nên không vi phạm `video_nested_in_timed_element`, nhưng tween `x: 30 → -30` trên `#img-07` là **giá trị tương đối không tường minh** kết hợp với `scale: 1.08` khởi đầu từ `fromTo` — thực ra đây là `fromTo` tuyệt đối, không vi phạm `gsap_relative_value_second_writer`.

- **`tl.set("#shot-1-stage", { opacity: 0 }, 7.66)`**: `#shot-1-stage` là phần tử **không có `data-start`** (untimed), nhưng việc dùng `tl.set` để ẩn nó tại t=7.66 là hợp lệ vì nó không phải `.clip`. Tuy nhiên, `#shot-1-stage` có `will-change: clip-path` và được tween `clipPath` + `opacity` — không vi phạm contract.

- **`badge-family-inner`, `badge-soup-inner` dùng class `badge-top-left` là position absolute với `top: 246px; left: 95px`** nhưng các clip cha (`#badge-family-clip`, `#badge-soup-clip`) đã có `inset: 0` từ `.clip` — các inner element dùng `position: absolute` tương đối với clip cha, đúng.

- **Vi phạm thật — `punch-pos` và `badge-bottom-left` dùng `position: absolute` với `top` cố định nhưng KHÔNG có `position: absolute` tường minh trên chính element đó**: `.punch-pos { position: absolute; top: 1040px; left: 90px; }` — class này không được định nghĩa trong CSS với `position: absolute`. Tương tự `.badge-bottom-left { position: absolute; top: 1220px; left: 95px; }` — không có `position: absolute` trong CSS rule. Các class này chỉ có `top`/`left` mà thiếu `position: absolute` → các giá trị `top`/`left` bị bỏ qua, layout sai.

- **`#shot-2-clip` chứa `#meta-shot-2` (class `card-meta`) và `#shot-2-frame` (class `media-card-frame`)** — cả hai dùng `position: absolute` với `top: 170px` và `top: 218px` tương đối với `.clip` (inset:0, full-frame). Đây là layout hợp lệ.

- **`<img id="img-07">` không có `data-start`/`data-duration`** — ảnh nằm trong `#shot-2-clip` (timed), không cần tự mang timing. Hợp lệ.

- **Tween `#img-07` với `opacity: 0 → 1` trong khi `#shot-2-clip` (cha) đã kiểm soát visibility qua `data-start`**: tween opacity trên con của clip là hợp lệ (không phải tween trên chính `.clip`).

**Lỗi thực sự cần sửa:**
- `.punch-pos` và `.badge-bottom-left` thiếu `position: absolute` trong CSS definition → `top`/`left` không có tác dụng, các overlay này render sai vị trí.
- `.badge-top-left` và `.icon-badge-pos` cũng thiếu `position: absolute` tường minh trong CSS (chỉ có `top`/`left` và `z-index`).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ajinomoto-chip-phan-1-s03

- **2026-09-25T10:36:30.631Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-25T10:37:35.757Z** — `scripts/07b-integration-check.hf.mjs --video=ajinomoto-chip-phan-1` — Stage 7b integration check FAIL:
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 147,
    "infoCount": 0,
    "findings": [
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.130000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"16.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"22.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.460000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"32.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"32.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"37.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"39.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"42.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"44.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"45.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"50.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"51.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.310000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"58.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"63.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"65.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"68.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"71.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"72.770000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"73.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"75.770000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"76.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"78.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"79.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"80.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"82.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"83.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"84.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"85.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"86.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"87.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"88.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"89.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"90.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"91.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"93.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"94.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"95.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"97.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"98.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"99.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"101.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"102.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"104.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"106.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"107.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"108.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"109.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"110.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"111.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"112.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"113.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"115.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"116.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"116.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"117.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"118.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"119.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"120.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"121.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"122.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"123.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"124.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"125.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"125.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"126.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"127.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"128.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"129.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"130.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"131.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"132.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"133.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"134.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"135.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"137.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"138.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"139.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"140.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"141.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"142.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"144.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"146.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"146.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"148.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"149.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"150.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"152.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"153.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"155.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"156.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"156.460000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"157.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"159.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"160.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"161.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 619 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Split this sub-composition further into smaller .html files, then mount them from the parent with data-composition-src so each file stays small enough to inspect, revise, and validate independently."
      },
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 338 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\scene-s04.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Split this sub-composition further into smaller .html files, then mount them from the parent with data-composition-src so each file stays small enough to inspect, revise, and validate independently."
      },
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 308 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\scene-s08.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Split this sub-composition further into smaller .html files, then mount them from the parent with data-composition-src so each file stays small enough to inspect, revise, and validate independently."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "3 tl.fromTo() calls target \"#scan-laser\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#scan-laser",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\scene-s17.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#scan-laser\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#label-data-pins\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#label-data-pins",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\scene-s17.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#label-data-pins\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#label-core-i7\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#label-core-i7",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\scene-s17.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#label-core-i7\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ajinomoto-chip-phan-1\\compositions\\scene-s19.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      }
    ],
    "filesScanned": 21
  },
  "runtime": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 0,
    "infoCount": 0,
    "findings": []
  },
  "layout": {
    "ok": false,
    "errorCount": 4,
    "warningCount": 1,
    "infoCount": 7,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 159.664,
        "selector": "#punch-phrase > div:nth-of-type(1) > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 206.81,
          "top": 1361.5,
          "right": 873.18,
          "bottom": 1516.01,
          "width": 666.37,
          "height": 154.51
        },
        "containerSelector": "span.word.active",
        "text": "KHOẢNG CÁCH QUÁ LỚN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s19.html",
        "bbox": {
          "x": 206.81,
          "y": 1361.5,
          "width": 666.37,
          "height": 154.51
        },
        "firstSeen": 159.664,
        "lastSeen": 161.829,
        "occurrences": 4,
        "heldMs": 1083.0000000000268
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 159.664,
        "selector": "#punch-phrase > div:nth-of-type(1) > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 206.81,
          "top": 1361.5,
          "right": 873.18,
          "bottom": 1516.01,
          "width": 666.37,
          "height": 154.51
        },
        "containerSelector": "[data-start=\"159.170000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "KHOẢNG CÁCH QUÁ LỚN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s19.html",
        "bbox": {
          "x": 206.81,
          "y": 1361.5,
          "width": 666.37,
          "height": 154.51
        },
        "firstSeen": 159.664,
        "lastSeen": 160.206,
        "occurrences": 3,
        "heldMs": 542.0000000000016
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 160.476,
        "selector": "#punch-phrase > div:nth-of-type(1) > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 175.66,
          "top": 1340,
          "right": 904.33,
          "bottom": 1508.95,
          "width": 728.67,
          "height": 168.95
        },
        "containerSelector": "[data-start=\"160.400000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "KHOẢNG CÁCH QUÁ LỚN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s19.html",
        "bbox": {
          "x": 175.66,
          "y": 1340,
          "width": 728.67,
          "height": 168.95
        },
        "firstSeen": 160.476,
        "lastSeen": 161.288,
        "occurrences": 3,
        "heldMs": 812.0000000000118
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 160.476,
        "selector": "#punch-phrase > div:nth-of-type(1) > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 175.66,
          "top": 1340,
          "right": 904.33,
          "bottom": 1508.95,
          "width": 728.67,
          "height": 168.95
        },
        "containerSelector": "[data-start=\"160.400000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "KHOẢNG CÁCH QUÁ LỚN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s19.html",
        "bbox": {
          "x": 175.66,
          "y": 1340,
          "width": 728.67,
          "height": 168.95
        },
        "firstSeen": 160.476,
        "lastSeen": 161.288,
        "occurrences": 4,
        "heldMs": 812.0000000000118
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 161.559,
        "selector": "#punch-phrase > div:nth-of-type(1) > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 175.66,
          "top": 1340,
          "right": 904.33,
          "bottom": 1508.95,
          "width": 728.67,
          "height": 168.95
        },
        "containerSelector": "[data-start=\"161.510000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "KHOẢNG CÁCH QUÁ LỚN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s19.html",
        "bbox": {
          "x": 175.66,
          "y": 1340,
          "width": 728.67,
          "height": 168.95
        },
        "firstSeen": 161.559,
        "lastSeen": 161.829,
        "occurrences": 2,
        "heldMs": 270.00000000001023
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 9.006,
        "selector": "#video-s01",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -37.1,
          "top": -65.95,
          "right": 1117.1,
          "bottom": 1985.95,
          "width": 1154.2,
          "height": 2051.9
        },
        "containerSelector": "#slot-scene-s01 > div:nth-of-type(1)",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 0,
          "top": 0,
          "right": 1080,
          "bottom": 1920,
          "width": 1080,
          "height": 1920
        },
        "overflow": {
          "left": 37.1,
          "right": 37.1,
          "top": 65.95,
          "bottom": 65.95
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "9.42",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -37.1,
          "y": -65.95,
          "width": 1154.2,
          "height": 2051.9
        },
        "firstSeen": 9.006,
        "lastSeen": 9.006,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 45.028,
        "selector": "#camera-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -11.77,
          "top": -20.93,
          "right": 1091.77,
          "bottom": 1940.93,
          "width": 1103.54,
          "height": 1961.86
        },
        "containerSelector": "#slot-scene-s05 > div:nth-of-type(1)",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 0,
          "top": 0,
          "right": 1080,
          "bottom": 1920,
          "width": 1080,
          "height": 1920
        },
        "overflow": {
          "left": 11.77,
          "right": 11.77,
          "top": 20.93,
          "bottom": 20.93
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -11.77,
          "y": -20.93,
          "width": 1103.54,
          "height": 1961.86
        },
        "firstSeen": 45.028,
        "lastSeen": 45.028,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 45.028,
        "selector": "#clock-hour",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 362.09,
          "top": 257.46,
          "right": 372.01,
          "bottom": 259.12,
          "width": 9.92,
          "height": 1.66
        },
        "containerSelector": "svg.clock-icon",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 307.13,
          "top": 248,
          "right": 353.13,
          "bottom": 294,
          "width": 46,
          "height": 46
        },
        "overflow": {
          "right": 18.88
        },
        "dataAttributes": {
          "data-svg-origin": "64 50"
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 362.09,
          "y": 257.46,
          "width": 9.92,
          "height": 1.66
        },
        "firstSeen": 45.028,
        "lastSeen": 45.028,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 81.05,
        "selector": "#camera-pan",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -36.48,
          "top": -9.12,
          "right": 1043.52,
          "bottom": 1910.88,
          "width": 1080,
          "height": 1920
        },
        "containerSelector": "#scene-s08",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 0,
          "top": 0,
          "right": 1080,
          "bottom": 1920,
          "width": 1080,
          "height": 1920
        },
        "overflow": {
          "left": 36.48,
          "top": 9.12
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -36.48,
          "y": -9.12,
          "width": 1080,
          "height": 1920
        },
        "firstSeen": 81.05,
        "lastSeen": 81.05,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 135.083,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 56.91,
          "top": 291.91,
          "right": 1023.09,
          "bottom": 1258.09,
          "width": 966.18,
          "height": 966.18
        },
        "containerSelector": "div.hero-image-wrap",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 64,
          "top": 299,
          "right": 1016,
          "bottom": 1251,
          "width": 952,
          "height": 952
        },
        "overflow": {
          "left": 7.09,
          "right": 7.09,
          "top": 7.09,
          "bottom": 7.09
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s12.html",
        "bbox": {
          "x": 56.91,
          "y": 291.91,
          "width": 966.18,
          "height": 966.18
        },
        "firstSeen": 135.083,
        "lastSeen": 135.083,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 160.206,
        "selector": "#punch-phrase > div:nth-of-type(1) > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 165.05,
          "top": 1338.34,
          "right": 914.93,
          "bottom": 1512.21,
          "width": 749.88,
          "height": 173.87
        },
        "containerSelector": "[data-start=\"159.170000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "KHOẢNG CÁCH QUÁ LỚN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s19.html",
        "bbox": {
          "x": 165.05,
          "y": 1338.34,
          "width": 749.88,
          "height": 173.87
        },
        "firstSeen": 160.206,
        "lastSeen": 160.206,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 161.559,
        "selector": "#punch-phrase > div:nth-of-type(1) > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 175.66,
          "top": 1340,
          "right": 904.33,
          "bottom": 1508.95,
          "width": 728.67,
          "height": 168.95
        },
        "containerSelector": "[data-start=\"161.510000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "KHOẢNG CÁCH QUÁ LỚN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s19.html",
        "bbox": {
          "x": 175.66,
          "y": 1340,
          "width": 728.67,
          "height": 168.95
        },
        "firstSeen": 161.559,
        "lastSeen": 161.559,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 162.1,
    "samples": [
      9.006,
      27.017,
      45.028,
      63.039,
      81.05,
      99.061,
      117.072,
      135.083,
      153.094,
      162.1
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 12,
    "truncated": false
  },
  "motion": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 0,
    "infoCount": 0,
    "findings": [],
    "enabled": false,
    "samples": 0
  },
  "contrast": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 0,
    "infoCount": 0,
    "findings": [],
    "enabled": true,
    "samples": [
      9.006,
      45.028,
      81.05,
      117.072,
      153.094
    ],
    "checked": 45,
    "passed": 45
  },
  "hdr": {
    "autoPromotion": null,
    "inspection": "available"
  },
  "snapshots": {
    "enabled": false,
    "files": [],
    "times": [],
    "findingFiles": []
  },
  "_meta": {
    "version": "0.8.56",
    "latestVersion": "0.8.75",
    "updateAvailable": true
  }
}


- **2026-09-25T10:39:13.746Z** — `scripts/07-codegen.hf.router.mjs --video=ajinomoto-chip-phan-1 --scenes=S19` — Codegen HyperFrames scene [S19] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s19.html.

- **2026-09-25T10:40:06.751Z** — `scripts/07b-integration-check.hf.mjs --video=ajinomoto-chip-phan-1` — Stage 7b integration check PASS — 19/19 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-25T10:41:00.226Z** — `scripts/07b-integration-check.hf.mjs --video=ajinomoto-chip-phan-1` — Stage 7b integration check PASS — 19/19 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-25T10:49:38.322Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\ajinomoto-chip-phan-1-full.mp4, 183417018 bytes (174.9MB), 517.5s render time, quality=looks. Xác minh ffprobe: duration=162.100s (khớp audio thật 162.168s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=21.7s, browser_probe=1.0s, video_extract=8.8s, audio_process=5.9s, file_server=0.0s, capture_calibration=4.7s, capture_disk=339.7s, encode=109.7s, assemble=15.2s.

- **2026-09-25T14:41:42.065Z** — qa-blank-frame-audit: 19 scene kiểm tra, 0 bị flag (none) — report tại `C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ajinomoto-chip-phan-1\contact-sheet\report.md`
