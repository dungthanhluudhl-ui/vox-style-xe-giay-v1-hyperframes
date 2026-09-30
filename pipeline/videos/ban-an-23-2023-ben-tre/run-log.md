
- **2026-09-30T11:14:51.087Z** — `scripts/02c-pdf-source.local.mjs` — Xử lý 1 PDF (10 trang): 3 ảnh trích dẫn doc-NN → media/documents/; đối chiếu script: khớp 7, gần khớp 1, không thấy 0 (xem case-source/crosscheck.md)

- **2026-09-30T11:18:09.798Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 2025 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ban-an-23-2023-ben-tre\transcripts\raw-captions.json

- **2026-09-30T11:18:58.938Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 16 ảnh + 0 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/ban-an-23-2023-ben-tre/media/{images,videos}/

- **2026-09-30T11:19:44.215Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 19 asset (16 ảnh, 0 video, 3 ảnh trích dẫn PDF doc-NN (không qua vision)) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ban-an-23-2023-ben-tre/media-analysis/manifest.json

- **2026-09-30T11:21:06.760Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 1193 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\ban-an-23-2023-ben-tre\captions\captions.json

- **2026-09-30T11:25:07.051Z** — `scripts/run-stages-1-6.mjs --video=ban-an-23-2023-ben-tre` — THẤT BẠI ở Stage 5: Gọi cx/gpt-6-sol để lập scene plan (script 5340 ký tự, 1193 từ có timestamp, 19 media asset)...
  [9router] gọi cx/gpt-6-sol... (bắt đầu 18:21:06)
  [9router] TIMEOUT sau 240.0s
file:///C:/vox-style-xe-giay-v1-hyperframes/scripts/lib/router-client.mjs:74
      throw new Error(`9router timeout sau ${timeoutMs}ms khi gọi ${model}`);
            ^

Error: 9router timeout sau 240000ms khi gọi cx/gpt-6-sol
    at callModel (file:///C:/vox-style-xe-giay-v1-hyperframes/scripts/lib/router-client.mjs:74:13)
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
    at async file:///C:/vox-style-xe-giay-v1-hyperframes/scripts/05-scene-plan.router.mjs:152:18

Node.js v24.20.0

- **2026-09-30T12:11:00.976Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 35 scene bằng cx/gpt-6-sol, ghi planning/videos/ban-an-23-2023-ben-tre/scene-plan.json + scene-plan.md

- **2026-09-30T12:21:08.146Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 37 shot trên 35 scene bằng cx/gpt-6-sol, ghi planning/videos/ban-an-23-2023-ben-tre/shotlist.json + shotlist.md

- **2026-09-30T12:28:38.552Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-30T12:29:01.431Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S20` — Codegen HyperFrames scene [S20] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s20.html.

- **2026-09-30T12:29:06.680Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-30T12:29:08.834Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-30T12:29:54.730Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-30T12:29:54.939Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-30T12:29:57.100Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S21` — Codegen HyperFrames scene [S21] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s21.html.

- **2026-09-30T12:30:19.270Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-30T12:30:20.054Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-30T12:30:22.496Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-30T12:30:30.034Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-30T12:30:32.321Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-30T12:30:44.827Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S23` — Codegen HyperFrames scene [S23] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s23.html.

- **2026-09-30T12:30:54.252Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-30T12:30:55.635Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-30T12:31:01.718Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S17` — Codegen HyperFrames scene [S17] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s17.html.

- **2026-09-30T12:31:06.514Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-30T12:31:07.288Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S22` — Codegen HyperFrames scene [S22] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s22.html.

- **2026-09-30T12:31:17.374Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `card-scene` không có `data-start` nên runtime không tự đặt `position:absolute; inset:0` cho nó; đồng thời các phần tử con như `dark-zone`, `bottom-bar`, `diagram` nằm trong `card-scene` không phải con trực tiếp của `#root` — layout toàn cảnh có thể sai (dark-zone, bottom-bar không định vị đúng khung hình).
- `#overlay-open` dùng class `clip` (inset:0) nhưng lại đặt thêm `class="overlay overlay-top clip"` với `top: 310px` và `inset: auto; height: auto` trong `.overlay` — CSS `.clip { position:absolute; inset:0 }` xung đột với `.overlay { inset: auto; height: auto; top: 310px }`, thứ tự cascade không đảm bảo `inset:auto` thắng `inset:0` trên mọi trình duyệt, có thể khiến overlay bị kéo full-height che toàn khung.
- `#overlay-choice` tương tự: class `clip` + class `overlay overlay-lower` xung đột inset, cùng vấn đề trên.
- `.question-mark` dùng `position: absolute; left: 470px; top: 1140px` nhưng nằm trong `.clip#question-icon` (inset:0, position:absolute so với #root) — tuy nhiên `.question-mark` không phải phần tử timed nên không được runtime đặt absolute; nó là con của `.clip` nên định vị absolute so với `.clip` là đúng, nhưng `left:470px; top:1140px` là hardcode px trên canvas 1080×1920, không dùng `%` hay layout container — nếu `.clip` bị inset:0 đúng thì OK, nhưng kết hợp với lỗi inset xung đột ở trên, vị trí thực tế không tất định.
ADVISORY:
- `card-scene` nên thêm `data-start="0" data-duration="7.11"` và class `clip` để runtime quản lý, hoặc bỏ wrapper và đặt các con trực tiếp vào `#root`.
- Overlay text "Một nhánh đi vào vùng tối; các nhánh khác khép lại" chỉ hiển thị 0.72s (holdMs=710ms) — rất ngắn để đọc, nhưng đây là giá trị từ shotlist nên chỉ ghi nhận.
- `#question-dot` dùng `scale: 0 → 1` với `transformOrigin: "50% 50%"` trên `<circle>` SVG — nên dùng `svgOrigin` thay vì `transformOrigin` cho SVG element để tránh lệch tâm trên một số trình duyệt.
- `strokeDashoffset` được set bằng CSS inline trong script trước khi timeline chạy, nhưng `fromTo` ở `#question-curve` lại khai báo lại `strokeDashoffset: questionCurveLength` trong `fromVars` — redundant nhưng không gây lỗi.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s08

- **2026-09-30T12:31:17.585Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S26` — Codegen HyperFrames scene [S26] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s26.html.

- **2026-09-30T12:31:43.338Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- Overlay "KHOẢN NỢ" (type: label, atMs: 10120, holdMs: 3180) phải là một phần tử timed riêng với data-start/data-duration; hiện tại nó nằm trong #scene (data-start="0") và bị fade-out tại t=3.96s — không đúng với yêu cầu shotlist (xuất hiện tại 0.78s tương đương atMs, giữ đến ~4s, nhưng bị ẩn sớm tại 3.96s trong khi holdMs yêu cầu giữ đến ~3.96s tính từ atMs=0.78s → kết thúc ~3.96s, tạm chấp nhận; tuy nhiên "KHOẢN NỢ" là label overlay riêng, không phải nội dung cột — cột trái phải hiển thị nội dung khác hoặc label phải là phần tử timed độc lập)
- Overlay "20 NĂM TÙ" (type: punch-phrase, atMs: 11710 → t≈2.37s, holdMs: 2000 → kết thúc t≈4.37s) bị fade-out tại t=4.37s nhưng tween fade-out dùng `tl.to("#penalty-text", { opacity: 0 }, 4.37)` — opacity về 0 ngay tại điểm bắt đầu holdMs kết thúc, đúng; tuy nhiên sau đó choice-arrow xuất hiện tại t=4.38s và choice-arrowhead cũng tại t=4.38s trong khi shotlist yêu cầu mũi tên từ lựa chọn hành động dẫn tới ô hình phạt tại atMs=13720 (t≈4.38s) — penalty-text đã bị ẩn, ô hình phạt (#penalty) vẫn hiển thị nhưng text bên trong bị opacity:0, gây mâu thuẫn nội dung (ô hình phạt trống khi mũi tên chỉ vào)
- Mũi tên từ khoản nợ (debt-arrow) xuất hiện tại t=2.8s và notes yêu cầu "không để mũi tên từ khoản nợ chạm ô hình phạt" — path SVG `M 215 340 L 215 455` kết thúc tại y=455 trong viewBox 900×700, trong khi penalty box bắt đầu ngay bên dưới columns (~y=340+gap); không có cơ chế nào đảm bảo mũi tên dừng trước ô hình phạt về mặt hình học — cần xác minh tọa độ SVG không chạm vào vùng penalty
- `tl.to("#debt-label", { opacity: 0 }, 3.96)` và `tl.to("#penalty-text", { opacity: 0 }, 4.37)` tween opacity trực tiếp trên phần tử con của .clip nhưng sau đó không restore — nếu timeline bị seek lại (re-seek), opacity sẽ giữ nguyên 0 thay vì reset; nên dùng fromTo với endpoint tường minh để seek-safe
ADVISORY:
- SVG arrow-layer dùng `position: absolute; inset: 0` nhưng viewBox="0 0 900 700" không khớp với kích thước thực của .board — tọa độ mũi tên có thể lệch so với vị trí thực của các cột và ô hình phạt khi render
- Overlay type "line" (mũi tên nhân quả) được mô tả trong shotlist nhưng không có phần tử timed riêng với data-start/data-duration — các mũi tên SVG được animate bằng GSAP opacity thay vì là clip timed, không sai về runtime nhưng khó chỉnh sửa trong Studio
- .bottom-bar không có data-start nên là untimed element — cần `position: absolute; inset: auto 0 0 0` hoặc đặt trong clip để tránh layout collapse
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s02

- **2026-09-30T12:31:45.281Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S29` — Codegen HyperFrames scene [S29] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s29.html.

- **2026-09-30T12:31:50.406Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-30T12:32:15.588Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S33` — Codegen HyperFrames scene [S33] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s33.html.

- **2026-09-30T12:32:19.411Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `#motion-arrow` là `.clip` (data-start/data-duration) nhưng bên trong chứa `.motion-arrow` — GSAP tween `scaleX` trên `.motion-arrow` (con của clip) dùng `transform-origin: left center` trong CSS, đồng thời GSAP tween `scaleX` từ 0→1 trên cùng phần tử đó; CSS đã set `transform-origin` nhưng không có `transform` ban đầu — không phải conflict trực tiếp, tuy nhiên `.motion-arrow` có `opacity: 0` trong CSS và GSAP dùng `fromTo` với `opacity: 0 → 1`, đây là hợp lệ. Lỗi thật: `.clip { position: absolute; inset: 0; }` khiến `#motion-arrow` (clip) chiếm toàn khung, nhưng `.motion-arrow` bên trong được định vị bằng `position: absolute; top: 47%; left: 43%` — tuy nhiên `.motion-arrow` không có `position: absolute` tường minh trong CSS (chỉ có `display: block`), nên nó nằm trong flow của `.clip` (inset:0) và `top/left` không có hiệu lực → mũi tên không hiển thị đúng vị trí. Đây là lỗi hiển thị chắc chắn từ code: `.motion-arrow` thiếu `position: absolute` nên `top`/`left` bị bỏ qua.
- Overlay "Mũi tên chuyển động ngắn từ bờ về phía mương" theo shotlist là `type: "line"` mô tả mũi tên SVG/đồ họa chỉ hướng chuyển động — code dùng `div` với `border-top/border-right` tạo mũi tên CSS nhưng thiếu `position: absolute` trên `.motion-arrow` khiến phần tử không bao giờ hiện đúng vị trí (lỗi hiển thị nhận ra chắc chắn từ code).
ADVISORY:
- `data-layout-allow-overflow="true"` đặt trên `#scene-image` (một clip con) thay vì root là đúng hướng, nhưng lý do overflow ở đây là `scale: 1.08` trên img bên trong — nên đặt cờ trên `#scene-image` là hợp lý; không phải lỗi chặn.
- Pan camera cuối shot (x: -14 → -34 từ t=2.55 đến t=3.75) kết thúc sớm hơn nhiều so với cuối shot (7.18s) — ảnh đứng yên từ t=3.75 đến hết; có thể extend pan nhẹ đến gần cuối shot để khớp mô tả "pan rời phía người đẩy" liên tục hơn.
- Quote fade-out tại t=6.49 (duration 0.22s) kết thúc t=6.71, trong khi clip `#spoken-quote` kết thúc t=6.71 (5.06+1.65) — khớp đúng biên clip, tốt.
- `spotlight` và `title-mask` là phần tử không có `data-start` nhưng dùng `position: absolute` — cần đảm bảo chúng luôn hiển thị suốt shot; hiện tại không có timing nên luôn visible, đúng ý đồ.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s18

- **2026-09-30T12:32:21.607Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S34` — Codegen HyperFrames scene [S34] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s34.html.

- **2026-09-30T12:32:52.350Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S19` — Codegen HyperFrames scene [S19] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `#ban-mark` là `<div class="clip" data-start="4.65">` nhưng bên trong chứa `<div id="ban-mark-inner" class="ban-mark ban-mark-inner">` — class `.ban-mark-inner` trong CSS định nghĩa `opacity: 0` tĩnh, trong khi GSAP tween target `#ban-mark-inner` bằng `fromTo({opacity:0},{opacity:1})`. Tuy nhiên vấn đề nghiêm trọng hơn: `.ban-mark` CSS đặt `position: absolute; inset: auto; left: 82px; top: 240px` nhưng phần tử cha `#ban-mark` là `.clip` với `inset: 0` — tọa độ `top: 240px` tính từ góc clip (toàn khung), không phải từ vị trí mong muốn; điều này không phải lỗi chặn tự thân. Lỗi chặn thật: `#ban-mark` là `.clip` có `data-start="4.65"` nhưng GSAP tween `#ban-mark-inner` (con của clip) bằng `fromTo({scale:0.72, opacity:0, rotation:-12}, ...)` — CSS `.ban-mark-inner` đặt `opacity: 0` tĩnh, nên trước t=4.65 phần tử đã ẩn đúng; nhưng `#ban-mark` clip dùng `class="clip"` với `inset:0` trong khi `.ban-mark` CSS override `position:absolute; inset:auto; left:82px; top:240px` — hai class cùng áp lên một phần tử (`class="clip"` và `class="ban-mark ban-mark-inner"` trên phần tử CON, không phải cùng phần tử). Không có lỗi chặn ở đây. Lỗi chặn thật: `route-one` và `route-two` SVG dùng `stroke-dasharray: 1; stroke-dashoffset: 1` cố định trong CSS thay vì đo `getTotalLength()` — path thực tế dài hàng trăm đơn vị nhưng dasharray=1 khiến path hiển thị như chuỗi dash rất ngắn, tween `strokeDashoffset: 1→0` không tạo hiệu ứng vẽ đường mà chỉ dịch chuyển 1px — hai mũi tên chỉ hướng (overlay quan trọng của shotlist) sẽ không bao giờ hiển thị đúng.
- `#route-one` và `#route-two` là `.clip` có `data-start` nhưng SVG con `.route-one`/`.route-two` có `opacity: 0` trong CSS và GSAP tween `fromTo(".route-one", {opacity:1}, {opacity:1})` — opacity luôn là 1 trong tween nhưng CSS khởi tạo là 0; tween `fromTo` với `opacity:1→1` không thay đổi opacity, khiến SVG mũi tên không bao giờ hiện (opacity vẫn 0 từ CSS cho đến khi GSAP ghi đè, nhưng GSAP chỉ ghi `opacity:1` tại thời điểm tween bắt đầu — trước đó CSS `opacity:0` giữ ẩn, sau đó tween `fromTo(1,1)` không fade in). Hai overlay line quan trọng của shotlist không hiển thị được.
ADVISORY:
- Label `.route-label-one` và `.route-label-two` xuất hiện cùng lúc với clip cha (data-start của clip) nhưng không có animation riêng — nếu SVG path được sửa để vẽ đúng, label nên fade in sau khi path vẽ xong để tránh chữ xuất hiện trước mũi tên.
- Pan dọc từ khung trên xuống khung dưới (`y: -1931`) tại t=8.32s khớp gần đúng với shotlist (161320ms - 153000ms = 8.32s), tuy nhiên `data-duration="12.13"` nhưng shot kéo dài 12.13s (165130-153000=12130ms) — khớp đúng.
- `assetTreatment` yêu cầu "pan-right" nhưng tween x chỉ dịch từ -540 đến -578 (38px), rất nhỏ so với ảnh 2160px — pan phải rõ hơn để đọc được là pan-right.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s19

- **2026-09-30T12:32:57.149Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S24` — Codegen HyperFrames scene [S24] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `.label`, `.summary`, `.ban-mark` có `data-start`/`data-duration` nhưng nằm trong `#root` là con trực tiếp — đây là timed elements hợp lệ, NHƯNG `.label` và `.summary` và `.ban-mark` đều KHÔNG có `class="clip"` trong khi là timed div (lint sẽ cảnh báo `timed_element_missing_clip_class`); quan trọng hơn, `.label` có `data-start="0.38"` nhưng nằm trong `<section class="clip" data-start="0">` — kiểm tra lại: thực ra `.label`, `.summary`, `.ban-mark` là con trực tiếp của `#root`, không nằm trong section — không vi phạm `video_nested_in_timed_element`. Tuy nhiên `<section class="clip" data-start="0" data-duration="12.58">` bao bọc `<img>` (không phải video) nên không vi phạm video rule. Lỗi thật: `.label`, `.summary`, `.ban-mark` thiếu `class="clip"` — lint lỗi `timed_element_missing_clip_class` (warning, không blocking theo skill doc). Xem xét lại blocking thực sự.
- `<img id="s24-infographic">` nằm bên trong `<section data-start="0" data-duration="12.58" class="clip">` — `<img>` này KHÔNG có `data-start` riêng nên không vi phạm nesting rule; tuy nhiên GSAP tween `tl.fromTo("#s24-infographic", {scale:1.34}, ...)` animate `scale` trên một `<img>` không có `transform-origin` tường minh trong CSS và `object-fit: contain` — không phải lỗi blocking.
- Overlay `type: "line"` trong shotlist có text "Nửa hành vi mở từ chuẩn bị tới cú đẩy và che giấu" — code render thành "Chuỗi hành vi: chuẩn bị, cú đẩy, che giấu" — nội dung bị viết lại/rút gọn sai so với shotlist (thiếu "Nửa hành vi mở từ", thay "tới" bằng dấu phẩy, bỏ "và che giấu" thành dạng liệt kê khác ý).

ADVISORY:
- `.label`, `.summary`, `.ban-mark` thiếu `class="clip"` — lint sẽ warn `timed_element_missing_clip_class`; nên thêm để tránh cảnh báo và đảm bảo layout convention.
- CSS định nghĩa các class `.hf-text-ink`, `.hf-text-light`… hai lần liên tiếp (duplicate block) — thừa, nên xóa bản trùng.
- `body` có `width: 1080px; height: 1920px` hardcode — theo convention nên để `width/height: 100%` hoặc bỏ; canvas size đã được `data-width`/`data-height` trên root kiểm soát.
- `transitionIn: "grow"` của shot chưa được thể hiện rõ trong code (không có clip grow-in từ scale nhỏ lên); có thể thêm entrance scale cho `.art-frame` hoặc `#root` nếu muốn khớp shotlist hơn.
- Thời điểm `atMs` của overlay "ban" là 210440ms → offset trong scene = (210440-199740)/1000 = 10.7s — khớp đúng; "label" atMs 200120 → 0.38s — khớp; "line" atMs 205400 → 5.66s — khớp thời điểm nhưng nội dung text sai (xem BLOCKING).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s24

- **2026-09-30T12:33:04.992Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S25` — Codegen HyperFrames scene [S25] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s25.html.

- **2026-09-30T12:33:23.442Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S30` — Codegen HyperFrames scene [S30] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s30.html.

- **2026-09-30T12:33:54.835Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S27` — Codegen HyperFrames scene [S27] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. (chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s27

- **2026-09-30T12:34:00.394Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S31` — Codegen HyperFrames scene [S31] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s31.html.

- **2026-09-30T12:34:14.038Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S32` — Codegen HyperFrames scene [S32] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `<img id="court-image">` có `data-start` và nằm trong `.photo-frame` không có `data-start` — nhưng `.photo-frame` lại nằm ngoài mọi `.clip` có `data-start`, trong khi `<img>` tự mang `data-start="0"` và `class="clip"` đồng thời có `position:absolute; inset:0` kế thừa từ `.clip` — điều này ổn về lint, nhưng `<img class="clip">` với `inset:0` sẽ phủ toàn khung thay vì chỉ vùng `.photo-frame` (left:-130px, top:160px, width:940px, height:1030px bị ghi đè bởi `inset:0` từ `.clip`), khiến ảnh không bao giờ hiển thị đúng vùng crop đã định — lỗi hiển thị nhận ra chắc chắn từ code.
- Shotlist yêu cầu 3 overlay riêng biệt với thời điểm/holdMs khác nhau: (1) line "Nhánh bồi thường tách khỏi nhánh án tù" atMs=265510 holdMs=3580, (2) label "HƠN 200 TRIỆU" atMs=266420 holdMs=2740, (3) line "Nhánh cấp dưỡng kéo dài tới vị trí con và cha mẹ" atMs=268440 holdMs=4490 — code chỉ có 1 `explain-card` với nội dung tự chế ("Nhánh bồi thường tách riêng — cấp dưỡng tiếp tục tới các con và cha mẹ"), thiếu hẳn overlay (1) và (3) với đúng chữ shotlist; đây là sai/thiếu nội dung chính.
- Overlay "HƠN 200 TRIỆU" được đặt tĩnh bên trong `#responsibility-panel` (data-start=0, data-duration=8.8) thay vì là phần tử timed riêng với data-start≈2.22s (266420-264200=2220ms) và data-duration=2.74s theo shotlist — vi phạm composition contract: phần tử timed thiếu data-start/duration riêng.

ADVISORY:
- `transitionIn: "flip"` không được thể hiện trong code (không có CSS/GSAP flip transition khi scene vào); đây là advisory vì hiệu ứng chuyển cảnh thường do host/runtime xử lý.
- `.connector` dùng `::after` với `border` để tạo mũi tên — phần tử pseudo không thể animate bằng GSAP; mũi tên sẽ luôn hiện cùng lúc với connector thay vì xuất hiện sau khi scaleX hoàn thành.
- `data-layout-ignore` trên `.photo-frame` có thể che khuất lỗi layout thật nếu ảnh tràn khung sau khi sửa.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s32

- **2026-09-30T12:34:23.988Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S28` — Codegen HyperFrames scene [S28] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `#note-one`, `#note-two`, `#note-clock`, `#note-four` có class `clip` và `data-start`/`data-duration` nhưng CSS `.note` đặt `position: absolute; inset: auto 60px auto 60px; height: auto` — ghi đè `inset: 0` của `.clip`, điều này hợp lệ về layout. Tuy nhiên, các phần tử này đồng thời là `.clip` (framework owns visibility) và bị tween `opacity` trực tiếp bằng GSAP (`fromTo ... opacity: 0 → 1`), vi phạm quy tắc `gsap_animates_clip_element` — lint sẽ reject.
ADVISORY:
- `caption` div không có `data-start`/`data-duration` nên hiển thị suốt toàn bộ composition, bao gồm cả trước khi các note xuất hiện — có thể gây cảm giác caption "treo" không khớp với nội dung đang hiển thị.
- `chart-rules` decorative lines và orange tick marks là sáng tạo thêm ngoài shotlist, không che nội dung chính, chấp nhận được.
- Thời gian `data-start` của các note được tính từ đầu composition (0s) thay vì từ `startMs` của shot — cần xác nhận đây là scene-local timing đúng (startMs=236620ms là global, scene bắt đầu tại 236620ms, nên local offset của overlay đầu tiên là (237850-236620)/1000=1.23s — đúng).
- `bottom-bar` không có `data-start`/`data-duration` nên luôn hiển thị — không phải lỗi chặn nhưng là chi tiết trang trí thêm ngoài shotlist.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s28

- **2026-09-30T12:35:16.362Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S35` — Codegen HyperFrames scene [S35] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s35.html.

- **2026-09-30T12:38:32.990Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S28 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s28.txt` — Codegen HyperFrames scene [S28] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s28.html.

- **2026-09-30T12:38:38.260Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S08 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s08.txt` — Codegen HyperFrames scene [S08] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-30T12:38:38.738Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S18 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s18.txt` — Codegen HyperFrames scene [S18] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s18.html.

- **2026-09-30T12:39:49.268Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S27 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s27.txt` — Codegen HyperFrames scene [S27] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s27.html.

- **2026-09-30T12:40:39.463Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S32 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s32.txt` — Codegen HyperFrames scene [S32] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. (chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s32

- **2026-09-30T12:40:49.617Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S02 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s02.txt` — Codegen HyperFrames scene [S02] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-30T12:40:50.057Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S24 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s24.txt` — Codegen HyperFrames scene [S24] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s24.html.

- **2026-09-30T12:42:38.089Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S32 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s32-v2.txt` — Codegen HyperFrames scene [S32] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s32.html.

- **2026-09-30T12:43:04.196Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S19 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s19.txt` — Codegen HyperFrames scene [S19] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s19.html.

- **2026-09-30T12:44:40.349Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-23-2023-ben-tre` — Stage 7b integration check FAIL (111 mốc/37 shot, 73.8s):
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 385,
    "infoCount": 0,
    "findings": [
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 427 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\index.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Split coherent scenes or layers into separate .html files under compositions/, then mount them from the parent with data-composition-src so each file stays small enough to inspect, revise, and validate independently."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"0.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"1.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"2.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"3.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"5.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"5.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"7.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"7.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"8.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"8.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"9.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"10.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"10.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"11.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"12.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"13.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"14.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"15.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"16.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"16.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"17.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"19.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"20.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"20.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"21.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"22.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"23.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"24.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"24.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"25.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"26.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"27.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"28.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"28.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"30.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"30.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"31.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"32.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"33.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"34.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"35.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"36.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"36.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"37.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"38.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"39.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"40.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"41.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"42.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"43.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"44.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"45.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"47.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"47.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"48.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"49.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"50.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"51.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"51.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"52.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"53.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"54.130000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"55.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"56.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"57.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"57.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"58.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"59.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"60.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"62.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"62.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"63.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"65.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"65.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"65.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"66.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"66.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"67.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"68.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"69.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"70.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"71.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"72.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"72.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"73.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"74.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"75.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"76.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"77.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"77.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"78.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"79.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"81.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"82.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"83.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"83.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"84.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"85.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"86.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"86.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"87.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"88.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"89.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"90.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"90.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"91.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"92.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"93.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"94.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"95.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"96.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"97.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"98.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"98.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"100.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"100.770000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"101.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"102.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"103.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"103.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"104.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"105.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"107.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"108.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"109.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"110.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"112.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"112.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"114.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"116.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"116.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"116.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"116.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"117.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"118.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"118.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"119.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"120.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"120.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"121.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"122.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"123.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"124.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"125.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"126.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"127.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"129.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"129.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"130.460000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"132.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"132.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"133.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"134.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"135.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"136.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"137.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"138.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"138.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"140.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"141.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"142.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"143.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"144.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"145.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"145.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"146.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"147.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"149.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"150.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"150.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"152.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"153.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"153.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"154.370000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"155.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"156.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"157.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"157.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"159.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"160.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"161.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"162.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"163.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"164.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"165.130000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"165.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"167.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"168.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"168.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"169.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"170.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"172.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"173.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"174.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"175.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"176.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"176.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"177.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"179.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"180.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"181.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"182.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"184.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"185.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"187.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"187.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"187.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"187.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"188.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"188.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"189.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"189.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"190.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"191.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"192.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"193.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"194.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"195.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"196.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"197.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"198.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"199.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"200.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"201.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"202.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"203.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"204.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"204.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"205.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"206.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"207.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"208.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"209.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"209.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"210.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"211.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"212.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"213.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"214.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"214.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"215.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"216.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"217.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"218.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"219.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"221.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"221.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"222.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"223.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"224.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"225.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"226.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"227.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"228.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"228.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"229.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"230.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"231.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"232.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"234.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"234.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"235.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"236.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"237.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"237.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"238.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"239.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"240.130000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"241.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"242.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"243.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"244.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"244.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"245.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"246.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"247.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"248.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"249.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"249.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"250.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"252.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"253.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"254.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"255.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"256.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"257.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"258.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"258.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"259.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"260.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"261.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"262.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"263.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"264.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"265.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"266.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"267.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"268.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"269.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"270.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"271.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"273.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"273.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"274.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"274.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"275.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"276.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"277.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"278.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"279.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"280.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"281.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"282.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"283.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"283.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"284.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"285.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"287.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"287.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"288.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"290.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"291.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"291.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"292.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "<div class=\"caption-page\" data-start=\"293.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "message": "This HTML composition file has 1363 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\caption-track.html",
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
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"label\" data-start=\"1.05\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s03.html",
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
        "message": "<div class=\"label\" data-start=\"4.28\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s03.html",
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
        "message": "<div class=\"connector\" data-start=\"6.39\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s03.html",
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
        "message": "<div class=\"connector-dot\" data-start=\"6.39\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s03.html",
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
        "message": "<div class=\"label\" data-start=\"7.76\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s03.html",
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
        "code": "timed_element_missing_clip_class",
        "severity": "warning",
        "message": "<div> has timing attributes but no class=\"clip\". The runtime still hides it outside its time range, but Studio and the GSAP clip-ownership rules use .clip to recognise a clip, so leaving it off makes the element harder to edit and to lint.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s03.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add class=\"clip\" to the element so Studio and the linter can recognise it as a clip."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"cards\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s04.html",
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
        "message": "<section class=\"scene\" data-start=\"0\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s06.html",
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
        "message": "<div class=\"total-clip\" data-start=\"2.89\" data-track-index=\"1\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s06.html",
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
        "message": "<div class=\"schedule-clip\" data-start=\"4.83\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s06.html",
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
        "message": "<div class=\"ban-clip\" data-start=\"5.96\" data-track-index=\"3\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s06.html",
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
        "message": "<section class=\"scene-art\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s07.html",
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
        "message": "<section class=\"phone-mark\" data-start=\"1.18\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s07.html",
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
        "message": "<section class=\"label\" data-start=\"3.83\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s07.html",
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
        "message": "<section class=\"label\" data-start=\"6.52\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s07.html",
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
        "message": "<svg class=\"diagram\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s08.html",
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
        "message": "<div data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s09.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \"#photo-frame\" for scale between 0.65s and 0.68s.",
        "selector": "#photo-frame",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s09.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Shorten the earlier tween, move the later tween, or add `overwrite: \"auto\"`."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"annotation-layer\" data-start=\"1.42\" data-track-index=\"1\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s10.html",
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
        "message": "<section class=\"image-stage\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s12.html",
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
        "message": "<section class=\"concept-overlay\" data-start=\"0.82\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s12.html",
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
        "message": "<section class=\"concept-overlay\" data-start=\"3.42\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s12.html",
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
        "message": "<section class=\"concept-overlay\" data-start=\"7.69\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s12.html",
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
        "message": "<div class=\"photo-clip\" data-start=\"0\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s15.html",
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
        "message": "<section class=\"marker-clip\" data-start=\"0.08\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s15.html",
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
        "message": "<section class=\"marker-clip\" data-start=\"2.28\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s15.html",
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
        "message": "<section class=\"marker-clip\" data-start=\"3.89\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s15.html",
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
        "message": "<section class=\"clock-clip\" data-start=\"7.11\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s15.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \"#premeditation-timeline\" for x, scale between 0.35s and 0.75s.",
        "selector": "#premeditation-timeline",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s15.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Shorten the earlier tween, move the later tween, or add `overwrite: \"auto\"`."
      },
      {
        "code": "timeline_track_too_dense",
        "severity": "warning",
        "message": "Track 2 has 4 timed elements in this HTML file. Smaller sub-compositions keep timelines easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s15.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Move coherent scene groups into smaller .html files and mount them from the parent with data-composition-src so the timeline stays easier to inspect, revise, and validate."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#scene-image\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#scene-image",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s17.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#scene-image\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#scene-image img\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#scene-image img",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s18.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#scene-image img\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_function_value_hazard",
        "severity": "warning",
        "message": "Function-valued tween var for strokeDashoffset on \".route-one path\" measures layout at tween init, which is deterministic across cold render workers only while the measured layout never animates. Each render worker initializes tweens independently.",
        "selector": ".route-one path",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s19.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Compute the value once at build time (before the timeline is registered) and pass a constant, or derive it from fixed composition coordinates."
      },
      {
        "code": "gsap_function_value_hazard",
        "severity": "warning",
        "message": "Function-valued tween var for strokeDashoffset on \".route-two path\" measures layout at tween init, which is deterministic across cold render workers only while the measured layout never animates. Each render worker initializes tweens independently.",
        "selector": ".route-two path",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s19.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Compute the value once at build time (before the timeline is registered) and pass a constant, or derive it from fixed composition coordinates."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"0.12\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s20.html",
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
        "message": "<section data-start=\"5.8\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s20.html",
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
        "message": "<section data-start=\"7.12\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s20.html",
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
        "message": "<section class=\"scene-content\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s21.html",
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
        "message": "<section class=\"card-scene\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s22.html",
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
        "message": "<section data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s24.html",
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
        "message": "<div class=\"label\" data-start=\"0.38\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s24.html",
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
        "message": "<div class=\"summary\" data-start=\"5.66\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s24.html",
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
        "message": "<div class=\"ban-mark\" data-start=\"10.7\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s24.html",
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
        "message": "<section class=\"scene\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s26.html",
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
        "message": "<section class=\"doc-card\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s29.html",
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
        "message": "<section data-start=\"0.33\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s29.html",
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
        "message": "<section data-start=\"3.2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s29.html",
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
        "message": "<section data-start=\"6.62\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s29.html",
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
        "message": "<section class=\"scene-art\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s30.html",
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
        "message": "<section class=\"overlays\" data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s30.html",
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
        "message": "<section class=\"document-shot\" data-start=\"0\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s31.html",
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
        "message": "<section class=\"document-shot\" data-start=\"2.8\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s31.html",
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
        "message": "<section class=\"illustration-shot\" data-start=\"4.6\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s31.html",
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
        "message": "<section data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s35.html",
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
        "message": "<section data-start=\"0.6\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s35.html",
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
        "message": "<section data-start=\"3.76\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s35.html",
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
        "message": "<section data-start=\"3.94\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-23-2023-ben-tre\\compositions\\scene-s35.html",
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
    "filesScanned": 37
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
    "errorCount": 11,
    "warningCount": 20,
    "infoCount": 77,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 237.297,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "span.word.active",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.297,
        "lastSeen": 242.69,
        "occurrences": 15,
        "heldMs": 5393.000000000001
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 241.22,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"241.110000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 241.22,
        "lastSeen": 241.788,
        "occurrences": 3,
        "heldMs": 568.000000000012
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 241.22,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"241.110000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 241.22,
        "lastSeen": 241.788,
        "occurrences": 2,
        "heldMs": 568.000000000012
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 252.496,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "span.word.active",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 252.496,
        "lastSeen": 257.889,
        "occurrences": 13,
        "heldMs": 5393.000000000001
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 253.296,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"253.150000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 253.296,
        "lastSeen": 253.967,
        "occurrences": 2,
        "heldMs": 671.0000000000207
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 253.296,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"253.150000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 253.296,
        "lastSeen": 253.967,
        "occurrences": 3,
        "heldMs": 671.0000000000207
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 255.09,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"255.000000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 255.09,
        "lastSeen": 255.928,
        "occurrences": 2,
        "heldMs": 837.9999999999939
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 255.09,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"255.000000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 255.09,
        "lastSeen": 255.928,
        "occurrences": 3,
        "heldMs": 837.9999999999939
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 256.418,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"256.150000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 256.418,
        "lastSeen": 257.399,
        "occurrences": 4,
        "heldMs": 980.9999999999945
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 256.418,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"256.150000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 256.418,
        "lastSeen": 257.399,
        "occurrences": 2,
        "heldMs": 980.9999999999945
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 256.884,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"256.150000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 256.884,
        "lastSeen": 257.399,
        "occurrences": 3,
        "heldMs": 514.9999999999864
      },
      {
        "code": "escaped_container",
        "severity": "warning",
        "time": 155.426,
        "selector": "#scene-image",
        "message": "Positioned element renders far outside its offset parent — its coordinates were likely computed in a different frame (canvas/viewport pixels).",
        "rect": {
          "left": -525.76,
          "top": 0,
          "right": 1634.24,
          "bottom": 3870,
          "width": 2160,
          "height": 3870
        },
        "containerSelector": "div.photo-window",
        "text": "",
        "fixHint": "Compute left/top in the offset parent's frame (subtract its rect), or mark intentional placement with data-layout-allow-overflow.",
        "containerRect": {
          "left": 0,
          "top": 0,
          "right": 1080,
          "bottom": 1920,
          "width": 1080,
          "height": 1920
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -525.76,
          "y": 0,
          "width": 2160,
          "height": 3870
        },
        "firstSeen": 155.426,
        "lastSeen": 162.704,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 237.788,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.760000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.788,
        "lastSeen": 238.278,
        "occurrences": 3,
        "heldMs": 489.9999999999807
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 237.788,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.760000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.788,
        "lastSeen": 237.912,
        "occurrences": 2,
        "heldMs": 123.99999999999523
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 237.788,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.760000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.788,
        "lastSeen": 238.278,
        "occurrences": 2,
        "heldMs": 489.9999999999807
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 237.912,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.760000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.912,
        "lastSeen": 238.278,
        "occurrences": 2,
        "heldMs": 365.99999999998545
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 238.768,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"238.380000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 238.768,
        "lastSeen": 239.258,
        "occurrences": 2,
        "heldMs": 490.0000000000091
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 238.768,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"238.380000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 238.768,
        "lastSeen": 239.258,
        "occurrences": 2,
        "heldMs": 490.0000000000091
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 239.749,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"239.270000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 239.749,
        "lastSeen": 239.85,
        "occurrences": 2,
        "heldMs": 100.99999999999909
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 239.749,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"239.270000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 239.749,
        "lastSeen": 239.85,
        "occurrences": 2,
        "heldMs": 100.99999999999909
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 239.749,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"239.270000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 239.749,
        "lastSeen": 239.85,
        "occurrences": 2,
        "heldMs": 100.99999999999909
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 240.239,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"240.130000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 240.239,
        "lastSeen": 240.729,
        "occurrences": 2,
        "heldMs": 490.0000000000091
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 241.22,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"241.110000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 241.22,
        "lastSeen": 241.71,
        "occurrences": 2,
        "heldMs": 490.0000000000091
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 241.71,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"241.110000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 241.71,
        "lastSeen": 241.788,
        "occurrences": 2,
        "heldMs": 78.00000000000296
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 252.496,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1450.57,
          "right": 900.52,
          "bottom": 1532.07,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(282) > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1450.57,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 252.496,
        "lastSeen": 252.986,
        "occurrences": 2,
        "heldMs": 489.9999999999807
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 252.496,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1450.57,
          "right": 900.52,
          "bottom": 1532.07,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(282) > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1450.57,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 252.496,
        "lastSeen": 252.986,
        "occurrences": 2,
        "heldMs": 489.9999999999807
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 253.296,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"253.150000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 253.296,
        "lastSeen": 253.477,
        "occurrences": 2,
        "heldMs": 181.0000000000116
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 253.477,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"253.150000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 253.477,
        "lastSeen": 253.967,
        "occurrences": 2,
        "heldMs": 490.0000000000091
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 254.457,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"254.100000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 254.457,
        "lastSeen": 254.948,
        "occurrences": 2,
        "heldMs": 491.00000000001387
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 255.09,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"255.000000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 255.09,
        "lastSeen": 255.438,
        "occurrences": 2,
        "heldMs": 347.99999999998477
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 255.438,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"255.000000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 255.438,
        "lastSeen": 255.928,
        "occurrences": 2,
        "heldMs": 490.0000000000091
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 1.868,
        "selector": "#artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -50.85,
          "top": -78.33,
          "right": 1117.26,
          "bottom": 1998.34,
          "width": 1168.11,
          "height": 2076.67
        },
        "containerSelector": "#scene",
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
          "left": 50.85,
          "right": 37.26,
          "top": 78.33,
          "bottom": 78.34
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -50.85,
          "y": -78.33,
          "width": 1168.11,
          "height": 2076.67
        },
        "firstSeen": 1.868,
        "lastSeen": 1.868,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 4.67,
        "selector": "#artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -61.05,
          "top": -78.33,
          "right": 1107.07,
          "bottom": 1998.34,
          "width": 1168.11,
          "height": 2076.67
        },
        "containerSelector": "#scene",
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
          "left": 61.05,
          "right": 27.07,
          "top": 78.33,
          "bottom": 78.34
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -61.05,
          "y": -78.33,
          "width": 1168.11,
          "height": 2076.67
        },
        "firstSeen": 4.67,
        "lastSeen": 4.67,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 7.472,
        "selector": "#artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -71.24,
          "top": -78.33,
          "right": 1096.88,
          "bottom": 1998.34,
          "width": 1168.11,
          "height": 2076.67
        },
        "containerSelector": "#scene",
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
          "left": 71.24,
          "right": 16.88,
          "top": 78.33,
          "bottom": 78.34
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -71.24,
          "y": -78.33,
          "width": 1168.11,
          "height": 2076.67
        },
        "firstSeen": 7.472,
        "lastSeen": 7.472,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 18.042,
        "selector": "#s03-background",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 3.39,
          "top": -24.08,
          "right": 798.27,
          "bottom": 1400.08,
          "width": 794.88,
          "height": 1424.16
        },
        "containerSelector": "#slot-scene-s03 > div:nth-of-type(1)",
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
          "top": 24.08
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "9.96",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 3.39,
          "y": -24.08,
          "width": 794.88,
          "height": 1424.16
        },
        "firstSeen": 18.042,
        "lastSeen": 18.042,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 21.03,
        "selector": "#s03-background",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -7.33,
          "top": -24.08,
          "right": 787.55,
          "bottom": 1400.08,
          "width": 794.88,
          "height": 1424.16
        },
        "containerSelector": "#slot-scene-s03 > div:nth-of-type(1)",
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
          "left": 7.33,
          "top": 24.08
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "9.96",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -7.33,
          "y": -24.08,
          "width": 794.88,
          "height": 1424.16
        },
        "firstSeen": 21.03,
        "lastSeen": 21.03,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 24.018,
        "selector": "#s03-background",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -18.17,
          "top": -24.08,
          "right": 776.71,
          "bottom": 1400.08,
          "width": 794.88,
          "height": 1424.16
        },
        "containerSelector": "#slot-scene-s03 > div:nth-of-type(1)",
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
          "left": 18.17,
          "top": 24.08
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "9.96",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -18.17,
          "y": -24.08,
          "width": 794.88,
          "height": 1424.16
        },
        "firstSeen": 24.018,
        "lastSeen": 24.018,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 36.574,
        "selector": "#s05-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -18.31,
          "top": -32.54,
          "right": 1098.31,
          "bottom": 1952.54,
          "width": 1116.61,
          "height": 1985.09
        },
        "containerSelector": "div.image-layer",
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
          "left": 18.31,
          "right": 18.31,
          "top": 32.54,
          "bottom": 32.54
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -18.31,
          "y": -32.54,
          "width": 1116.61,
          "height": 1985.09
        },
        "firstSeen": 36.574,
        "lastSeen": 36.574,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 38.815,
        "selector": "#s05-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -29.65,
          "top": -52.7,
          "right": 1109.65,
          "bottom": 1972.7,
          "width": 1139.29,
          "height": 2025.41
        },
        "containerSelector": "div.image-layer",
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
          "left": 29.65,
          "right": 29.65,
          "top": 52.7,
          "bottom": 52.7
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -29.65,
          "y": -52.7,
          "width": 1139.29,
          "height": 2025.41
        },
        "firstSeen": 38.815,
        "lastSeen": 38.815,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 41.056,
        "selector": "#s05-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -40.93,
          "top": -72.77,
          "right": 1120.93,
          "bottom": 1992.77,
          "width": 1161.86,
          "height": 2065.54
        },
        "containerSelector": "div.image-layer",
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
          "left": 40.93,
          "right": 40.93,
          "top": 72.77,
          "bottom": 72.77
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -40.93,
          "y": -72.77,
          "width": 1161.86,
          "height": 2065.54
        },
        "firstSeen": 41.056,
        "lastSeen": 41.056,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 51.05,
        "selector": "#s07-road-art",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -35.88,
          "top": -103.78,
          "right": 1160.87,
          "bottom": 2023.78,
          "width": 1196.75,
          "height": 2127.55
        },
        "containerSelector": "section[data-start=\"0\"]",
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
          "left": 35.88,
          "right": 80.87,
          "top": 103.78,
          "bottom": 103.78
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -35.88,
          "y": -103.78,
          "width": 1196.75,
          "height": 2127.55
        },
        "firstSeen": 51.05,
        "lastSeen": 51.05,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 54.005,
        "selector": "#s07-road-art",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -43.57,
          "top": -86.4,
          "right": 1133.63,
          "bottom": 2006.4,
          "width": 1177.2,
          "height": 2092.8
        },
        "containerSelector": "section[data-start=\"0\"]",
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
          "left": 43.57,
          "right": 53.63,
          "top": 86.4,
          "bottom": 86.4
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -43.57,
          "y": -86.4,
          "width": 1177.2,
          "height": 2092.8
        },
        "firstSeen": 54.005,
        "lastSeen": 54.005,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 56.96,
        "selector": "#s07-road-art",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -51.23,
          "top": -69.31,
          "right": 1106.74,
          "bottom": 1989.31,
          "width": 1157.98,
          "height": 2058.62
        },
        "containerSelector": "section[data-start=\"0\"]",
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
          "left": 51.23,
          "right": 26.74,
          "top": 69.31,
          "bottom": 69.31
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -51.23,
          "y": -69.31,
          "width": 1157.98,
          "height": 2058.62
        },
        "firstSeen": 56.96,
        "lastSeen": 56.96,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 74.832,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -222.28,
          "top": -456.29,
          "right": 1460.72,
          "bottom": 2376.29,
          "width": 1683,
          "height": 2832.59
        },
        "containerSelector": "#slot-scene-s10 > div:nth-of-type(1)",
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
          "left": 222.28,
          "right": 380.72,
          "top": 456.29,
          "bottom": 456.29
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -222.28,
          "y": -456.29,
          "width": 1683,
          "height": 2832.59
        },
        "firstSeen": 74.832,
        "lastSeen": 74.832,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 77.895,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -294.93,
          "top": -519.49,
          "right": 1422.14,
          "bottom": 2439.49,
          "width": 1717.07,
          "height": 2958.98
        },
        "containerSelector": "#slot-scene-s10 > div:nth-of-type(1)",
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
          "left": 294.93,
          "right": 342.14,
          "top": 519.49,
          "bottom": 519.49
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -294.93,
          "y": -519.49,
          "width": 1717.07,
          "height": 2958.98
        },
        "firstSeen": 77.895,
        "lastSeen": 77.895,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 80.958,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -364.63,
          "top": -580.88,
          "right": 1379.61,
          "bottom": 2500.88,
          "width": 1744.24,
          "height": 3081.77
        },
        "containerSelector": "#slot-scene-s10 > div:nth-of-type(1)",
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
          "left": 364.63,
          "right": 299.61,
          "top": 580.88,
          "bottom": 580.88
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -364.63,
          "y": -580.88,
          "width": 1744.24,
          "height": 3081.77
        },
        "firstSeen": 80.958,
        "lastSeen": 80.958,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 85.016,
        "selector": "#breaker-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -4.81,
          "top": -8.54,
          "right": 1084.81,
          "bottom": 1928.54,
          "width": 1089.61,
          "height": 1937.09
        },
        "containerSelector": "#photo-scene",
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
          "left": 4.81,
          "right": 4.81,
          "top": 8.54,
          "bottom": 8.54
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s11.html",
        "bbox": {
          "x": -4.81,
          "y": -8.54,
          "width": 1089.61,
          "height": 1937.09
        },
        "firstSeen": 85.016,
        "lastSeen": 85.016,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 88.04,
        "selector": "#breaker-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -12.15,
          "top": -21.6,
          "right": 1092.15,
          "bottom": 1941.6,
          "width": 1104.3,
          "height": 1963.2
        },
        "containerSelector": "#photo-scene",
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
          "left": 12.15,
          "right": 12.15,
          "top": 21.6,
          "bottom": 21.6
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s11.html",
        "bbox": {
          "x": -12.15,
          "y": -21.6,
          "width": 1104.3,
          "height": 1963.2
        },
        "firstSeen": 88.04,
        "lastSeen": 88.04,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 91.064,
        "selector": "#breaker-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -19.39,
          "top": -34.46,
          "right": 1099.39,
          "bottom": 1954.46,
          "width": 1118.77,
          "height": 1988.93
        },
        "containerSelector": "#photo-scene",
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
          "left": 19.39,
          "right": 19.39,
          "top": 34.46,
          "bottom": 34.46
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s11.html",
        "bbox": {
          "x": -19.39,
          "y": -34.46,
          "width": 1118.77,
          "height": 1988.93
        },
        "firstSeen": 91.064,
        "lastSeen": 91.064,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 104.232,
        "selector": "#s13-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -22.66,
          "top": 0,
          "right": 1186.93,
          "bottom": 1920,
          "width": 1209.59,
          "height": 1920
        },
        "containerSelector": "div.image-stage",
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
          "left": 22.66,
          "right": 106.93
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": -22.66,
          "y": 0,
          "width": 1209.59,
          "height": 1920
        },
        "firstSeen": 104.232,
        "lastSeen": 104.232,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 107.49,
        "selector": "#s13-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -57.25,
          "top": 0,
          "right": 1152.34,
          "bottom": 1920,
          "width": 1209.59,
          "height": 1920
        },
        "containerSelector": "div.image-stage",
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
          "left": 57.25,
          "right": 72.34
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": -57.25,
          "y": 0,
          "width": 1209.59,
          "height": 1920
        },
        "firstSeen": 107.49,
        "lastSeen": 107.49,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 110.748,
        "selector": "#s13-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -91.84,
          "top": 0,
          "right": 1117.75,
          "bottom": 1920,
          "width": 1209.59,
          "height": 1920
        },
        "containerSelector": "div.image-stage",
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
          "left": 91.84,
          "right": 37.75
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": -91.84,
          "y": 0,
          "width": 1209.59,
          "height": 1920
        },
        "firstSeen": 110.748,
        "lastSeen": 110.748,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 121.972,
        "selector": "#premeditation-timeline",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -4.97,
          "top": 116.06,
          "right": 1083.86,
          "bottom": 1523.94,
          "width": 1088.83,
          "height": 1407.89
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 48,
          "top": 185,
          "right": 1032,
          "bottom": 1455,
          "width": 984,
          "height": 1270
        },
        "overflow": {
          "left": 52.97,
          "right": 51.86,
          "top": 68.94,
          "bottom": 68.94
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": -4.97,
          "y": 116.06,
          "width": 1088.83,
          "height": 1407.89
        },
        "firstSeen": 121.972,
        "lastSeen": 121.972,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 122.571,
        "selector": "[data-start=\"0.08\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 104,
          "top": 1116,
          "right": 144.03,
          "bottom": 1159,
          "width": 40.03,
          "height": 43
        },
        "containerSelector": "[data-start=\"2.28\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "01",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": 104,
          "y": 1116,
          "width": 40.03,
          "height": 43
        },
        "firstSeen": 122.571,
        "lastSeen": 122.571,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 122.571,
        "selector": "[data-start=\"0.08\"] > div:nth-of-type(1) > p:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 166.03,
          "top": 1116.27,
          "right": 467.38,
          "bottom": 1159.27,
          "width": 301.35,
          "height": 43
        },
        "containerSelector": "[data-start=\"2.28\"] > div:nth-of-type(1) > p:nth-of-type(1)",
        "text": "Lấy dây, thử điện",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": 166.03,
          "y": 1116.27,
          "width": 301.35,
          "height": 43
        },
        "firstSeen": 122.571,
        "lastSeen": 122.571,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 124.042,
        "selector": "[data-start=\"2.28\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 104,
          "top": 1116,
          "right": 151.23,
          "bottom": 1159,
          "width": 47.23,
          "height": 43
        },
        "containerSelector": "[data-start=\"3.89\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "02",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": 104,
          "y": 1116,
          "width": 47.23,
          "height": 43
        },
        "firstSeen": 124.042,
        "lastSeen": 124.042,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 124.042,
        "selector": "[data-start=\"2.28\"] > div:nth-of-type(1) > p:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 173.23,
          "top": 1116.27,
          "right": 527.8,
          "bottom": 1159.27,
          "width": 354.57,
          "height": 43
        },
        "containerSelector": "[data-start=\"3.89\"] > div:nth-of-type(1) > p:nth-of-type(1)",
        "text": "Phát hiện lớp bảo vệ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": 173.23,
          "y": 1116.27,
          "width": 354.57,
          "height": 43
        },
        "firstSeen": 124.042,
        "lastSeen": 124.042,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 124.81,
        "selector": "#premeditation-timeline",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 6.38,
          "top": 114.86,
          "right": 1097.06,
          "bottom": 1525.14,
          "width": 1090.68,
          "height": 1410.28
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 48,
          "top": 185,
          "right": 1032,
          "bottom": 1455,
          "width": 984,
          "height": 1270
        },
        "overflow": {
          "left": 41.62,
          "right": 65.06,
          "top": 70.14,
          "bottom": 70.14
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": 6.38,
          "y": 114.86,
          "width": 1090.68,
          "height": 1410.28
        },
        "firstSeen": 124.81,
        "lastSeen": 124.81,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 127.648,
        "selector": "#premeditation-timeline",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 18.51,
          "top": 113.6,
          "right": 1111.15,
          "bottom": 1526.4,
          "width": 1092.63,
          "height": 1412.81
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 48,
          "top": 185,
          "right": 1032,
          "bottom": 1455,
          "width": 984,
          "height": 1270
        },
        "overflow": {
          "left": 29.49,
          "right": 79.15,
          "top": 71.4,
          "bottom": 71.4
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": 18.51,
          "y": 113.6,
          "width": 1092.63,
          "height": 1412.81
        },
        "firstSeen": 127.648,
        "lastSeen": 127.648,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 131.048,
        "selector": "#dock-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -42.58,
          "top": -72.67,
          "right": 1119.17,
          "bottom": 1992.67,
          "width": 1161.76,
          "height": 2065.34
        },
        "containerSelector": "#slot-scene-s16 > div:nth-of-type(1)",
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
          "left": 42.58,
          "right": 39.17,
          "top": 72.67,
          "bottom": 72.67
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.54",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s16.html",
        "bbox": {
          "x": -42.58,
          "y": -72.67,
          "width": 1161.76,
          "height": 2065.34
        },
        "firstSeen": 131.048,
        "lastSeen": 131.048,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 133.31,
        "selector": "#dock-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -40.03,
          "top": -55.1,
          "right": 1101.96,
          "bottom": 1975.1,
          "width": 1141.99,
          "height": 2030.21
        },
        "containerSelector": "#slot-scene-s16 > div:nth-of-type(1)",
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
          "left": 40.03,
          "right": 21.96,
          "top": 55.1,
          "bottom": 55.1
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.54",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s16.html",
        "bbox": {
          "x": -40.03,
          "y": -55.1,
          "width": 1141.99,
          "height": 2030.21
        },
        "firstSeen": 133.31,
        "lastSeen": 133.31,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 135.572,
        "selector": "#dock-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -37.51,
          "top": -37.63,
          "right": 1084.83,
          "bottom": 1957.63,
          "width": 1122.34,
          "height": 1995.26
        },
        "containerSelector": "#slot-scene-s16 > div:nth-of-type(1)",
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
          "left": 37.51,
          "right": 4.83,
          "top": 37.63,
          "bottom": 37.63
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.54",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s16.html",
        "bbox": {
          "x": -37.51,
          "y": -37.63,
          "width": 1122.34,
          "height": 1995.26
        },
        "firstSeen": 135.572,
        "lastSeen": 135.572,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 138.828,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -4.08,
          "top": -73.92,
          "right": 1159.08,
          "bottom": 1993.92,
          "width": 1163.16,
          "height": 2067.84
        },
        "containerSelector": "#slot-scene-s17 > div:nth-of-type(1)",
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
          "left": 4.08,
          "right": 79.08,
          "top": 73.92,
          "bottom": 73.92
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -4.08,
          "y": -73.92,
          "width": 1163.16,
          "height": 2067.84
        },
        "firstSeen": 138.828,
        "lastSeen": 138.828,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 141.45,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -12.93,
          "top": -44.06,
          "right": 1116.64,
          "bottom": 1964.06,
          "width": 1129.57,
          "height": 2008.13
        },
        "containerSelector": "#slot-scene-s17 > div:nth-of-type(1)",
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
          "left": 12.93,
          "right": 36.64,
          "top": 44.06,
          "bottom": 44.06
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -12.93,
          "y": -44.06,
          "width": 1129.57,
          "height": 2008.13
        },
        "firstSeen": 141.45,
        "lastSeen": 141.45,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 144.072,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -23.43,
          "top": -8.74,
          "right": 1066.4,
          "bottom": 1928.74,
          "width": 1089.83,
          "height": 1937.47
        },
        "containerSelector": "#slot-scene-s17 > div:nth-of-type(1)",
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
          "left": 23.43,
          "top": 8.74,
          "bottom": 8.74
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -23.43,
          "y": -8.74,
          "width": 1089.83,
          "height": 1937.47
        },
        "firstSeen": 144.072,
        "lastSeen": 144.072,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 155.426,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -525.76,
          "top": 0,
          "right": 1634.24,
          "bottom": 3870,
          "width": 2160,
          "height": 3870
        },
        "containerSelector": "div.photo-window",
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
          "left": 525.76,
          "right": 554.24,
          "bottom": 1950
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -525.76,
          "y": 0,
          "width": 2160,
          "height": 3870
        },
        "firstSeen": 155.426,
        "lastSeen": 155.426,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 159.065,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -502,
          "top": 0,
          "right": 1658,
          "bottom": 3870,
          "width": 2160,
          "height": 3870
        },
        "containerSelector": "div.photo-window",
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
          "left": 502,
          "right": 578,
          "bottom": 1950
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -502,
          "y": 0,
          "width": 2160,
          "height": 3870
        },
        "firstSeen": 159.065,
        "lastSeen": 159.065,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 162.704,
        "selector": "#scene-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -502,
          "top": -1931,
          "right": 1658,
          "bottom": 1939,
          "width": 2160,
          "height": 3870
        },
        "containerSelector": "div.photo-window",
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
          "left": 502,
          "right": 578,
          "top": 1931,
          "bottom": 19
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "10.21",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s10.html",
        "bbox": {
          "x": -502,
          "y": -1931,
          "width": 2160,
          "height": 3870
        },
        "firstSeen": 162.704,
        "lastSeen": 162.704,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 166.916,
        "selector": "#police-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 155.49,
          "top": -1322.84,
          "right": 1384.92,
          "bottom": 3548.84,
          "width": 1229.43,
          "height": 4871.68
        },
        "containerSelector": "#slot-scene-s20 > div:nth-of-type(1)",
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
          "right": 304.92,
          "top": 1322.84,
          "bottom": 1628.84
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "8.93",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s20.html",
        "bbox": {
          "x": 155.49,
          "y": -1322.84,
          "width": 1229.43,
          "height": 4871.68
        },
        "firstSeen": 166.916,
        "lastSeen": 166.916,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "escaped_container",
        "severity": "info",
        "time": 166.916,
        "selector": "#police-photo",
        "message": "Positioned element renders far outside its offset parent — its coordinates were likely computed in a different frame (canvas/viewport pixels).",
        "rect": {
          "left": 155.49,
          "top": -1322.84,
          "right": 1384.92,
          "bottom": 3548.84,
          "width": 1229.43,
          "height": 4871.68
        },
        "containerSelector": "#slot-scene-s20 > div:nth-of-type(1)",
        "text": "",
        "fixHint": "Compute left/top in the offset parent's frame (subtract its rect), or mark intentional placement with data-layout-allow-overflow.",
        "containerRect": {
          "left": 0,
          "top": 0,
          "right": 1080,
          "bottom": 1920,
          "width": 1080,
          "height": 1920
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "8.93",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s20.html",
        "bbox": {
          "x": 155.49,
          "y": -1322.84,
          "width": 1229.43,
          "height": 4871.68
        },
        "firstSeen": 166.916,
        "lastSeen": 166.916,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 169.595,
        "selector": "#police-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 11.73,
          "top": -99.86,
          "right": 913.79,
          "bottom": 2325.86,
          "width": 902.06,
          "height": 2425.71
        },
        "containerSelector": "#slot-scene-s20 > div:nth-of-type(1)",
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
          "top": 99.86,
          "bottom": 405.86
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "8.93",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s20.html",
        "bbox": {
          "x": 11.73,
          "y": -99.86,
          "width": 902.06,
          "height": 2425.71
        },
        "firstSeen": 169.595,
        "lastSeen": 169.595,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 172.274,
        "selector": "#police-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -20.97,
          "top": -62.44,
          "right": 900.55,
          "bottom": 2288.44,
          "width": 921.52,
          "height": 2350.88
        },
        "containerSelector": "#slot-scene-s20 > div:nth-of-type(1)",
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
          "left": 20.97,
          "top": 62.44,
          "bottom": 368.44
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "8.93",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s20.html",
        "bbox": {
          "x": -20.97,
          "y": -62.44,
          "width": 921.52,
          "height": 2350.88
        },
        "firstSeen": 172.274,
        "lastSeen": 172.274,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "escaped_container",
        "severity": "info",
        "time": 184.474,
        "selector": "div.question-mark",
        "message": "Positioned element renders far outside its offset parent — its coordinates were likely computed in a different frame (canvas/viewport pixels).",
        "rect": {
          "left": 844,
          "top": 329,
          "right": 968,
          "bottom": 453,
          "width": 124,
          "height": 124
        },
        "containerSelector": "div.layout",
        "text": "?",
        "fixHint": "Compute left/top in the offset parent's frame (subtract its rect), or mark intentional placement with data-layout-allow-overflow.",
        "containerRect": {
          "left": 72,
          "top": 425,
          "right": 1008,
          "bottom": 1125,
          "width": 936,
          "height": 700
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s22.html",
        "bbox": {
          "x": 844,
          "y": 329,
          "width": 124,
          "height": 124
        },
        "firstSeen": 184.474,
        "lastSeen": 184.474,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 202.256,
        "selector": "#s24-infographic",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -76.42,
          "top": 18.61,
          "right": 1156.42,
          "bottom": 1667.39,
          "width": 1232.85,
          "height": 1648.78
        },
        "containerSelector": "div.art-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 42,
          "top": 178,
          "right": 1038,
          "bottom": 1508,
          "width": 996,
          "height": 1330
        },
        "overflow": {
          "left": 118.42,
          "right": 118.42,
          "top": 159.39,
          "bottom": 159.39
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": -76.42,
          "y": 18.61,
          "width": 1232.85,
          "height": 1648.78
        },
        "firstSeen": 202.256,
        "lastSeen": 202.256,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 206.03,
        "selector": "#s24-infographic",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -16.13,
          "top": 99.24,
          "right": 1096.13,
          "bottom": 1586.76,
          "width": 1112.27,
          "height": 1487.51
        },
        "containerSelector": "div.art-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 42,
          "top": 178,
          "right": 1038,
          "bottom": 1508,
          "width": 996,
          "height": 1330
        },
        "overflow": {
          "left": 58.13,
          "right": 58.13,
          "top": 78.76,
          "bottom": 78.76
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": -16.13,
          "y": 99.24,
          "width": 1112.27,
          "height": 1487.51
        },
        "firstSeen": 206.03,
        "lastSeen": 206.03,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 209.804,
        "selector": "#s24-infographic",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 19.61,
          "top": 147.04,
          "right": 1060.39,
          "bottom": 1538.96,
          "width": 1040.79,
          "height": 1391.92
        },
        "containerSelector": "div.art-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 42,
          "top": 178,
          "right": 1038,
          "bottom": 1508,
          "width": 996,
          "height": 1330
        },
        "overflow": {
          "left": 22.39,
          "right": 22.39,
          "top": 30.96,
          "bottom": 30.96
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 19.61,
          "y": 147.04,
          "width": 1040.79,
          "height": 1391.92
        },
        "firstSeen": 209.804,
        "lastSeen": 209.804,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 216.7,
        "selector": "#court-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 63.68,
          "top": 277.72,
          "right": 1016.32,
          "bottom": 1436.28,
          "width": 952.64,
          "height": 1158.56
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 74,
          "top": 292,
          "right": 1006,
          "bottom": 1422,
          "width": 932,
          "height": 1130
        },
        "overflow": {
          "left": 10.32,
          "right": 10.32,
          "top": 14.28,
          "bottom": 14.28
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s25.html",
        "bbox": {
          "x": 63.68,
          "y": 277.72,
          "width": 952.64,
          "height": 1158.56
        },
        "firstSeen": 216.7,
        "lastSeen": 216.7,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 219.328,
        "selector": "#court-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 52.83,
          "top": 264.52,
          "right": 1027.17,
          "bottom": 1449.48,
          "width": 974.35,
          "height": 1184.96
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 74,
          "top": 292,
          "right": 1006,
          "bottom": 1422,
          "width": 932,
          "height": 1130
        },
        "overflow": {
          "left": 21.17,
          "right": 21.17,
          "top": 27.48,
          "bottom": 27.48
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s25.html",
        "bbox": {
          "x": 52.83,
          "y": 264.52,
          "width": 974.35,
          "height": 1184.96
        },
        "firstSeen": 219.328,
        "lastSeen": 219.328,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 230.252,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -6.05,
          "top": -10.75,
          "right": 1086.05,
          "bottom": 1930.75,
          "width": 1092.1,
          "height": 1941.5
        },
        "containerSelector": "#slot-scene-s27 > div:nth-of-type(1)",
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
          "left": 6.05,
          "right": 6.05,
          "top": 10.75,
          "bottom": 10.75
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.96",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s27.html",
        "bbox": {
          "x": -6.05,
          "y": -10.75,
          "width": 1092.1,
          "height": 1941.5
        },
        "firstSeen": 230.252,
        "lastSeen": 230.252,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 232.64,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -32.29,
          "top": -57.41,
          "right": 1112.29,
          "bottom": 1977.41,
          "width": 1144.58,
          "height": 2034.82
        },
        "containerSelector": "#slot-scene-s27 > div:nth-of-type(1)",
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
          "left": 32.29,
          "right": 32.29,
          "top": 57.41,
          "bottom": 57.41
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.96",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s27.html",
        "bbox": {
          "x": -32.29,
          "y": -57.41,
          "width": 1144.58,
          "height": 2034.82
        },
        "firstSeen": 232.64,
        "lastSeen": 232.64,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 235.028,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -58.37,
          "top": -103.78,
          "right": 1138.37,
          "bottom": 2023.78,
          "width": 1196.75,
          "height": 2127.55
        },
        "containerSelector": "#slot-scene-s27 > div:nth-of-type(1)",
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
          "left": 58.37,
          "right": 58.37,
          "top": 103.78,
          "bottom": 103.78
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.96",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s27.html",
        "bbox": {
          "x": -58.37,
          "y": -103.78,
          "width": 1196.75,
          "height": 2127.55
        },
        "firstSeen": 235.028,
        "lastSeen": 235.028,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 236.807,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"236.550000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 236.807,
        "lastSeen": 236.807,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 237.297,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.000000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.297,
        "lastSeen": 237.297,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 237.297,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.000000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.297,
        "lastSeen": 237.297,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 237.297,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.000000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 237.297,
        "lastSeen": 237.297,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_box_overflow",
        "severity": "info",
        "time": 237.912,
        "selector": "#note-one-inner",
        "message": "Text extends outside its nearest visual/container box.",
        "rect": {
          "left": 53.84,
          "top": 227,
          "right": 447.46,
          "bottom": 270,
          "width": 393.63,
          "height": 43
        },
        "containerSelector": "#note-one",
        "text": "Điểm nhấn: nghĩ và thử",
        "fixHint": "Text is 394px x 43px inside 960px x 102px and overflows by up to 6px; widen the container to at least ~966px, or allow wrapping with max-width/fitTextFontSize.",
        "containerRect": {
          "left": 60,
          "top": 210,
          "right": 1020,
          "bottom": 312,
          "width": 960,
          "height": 102
        },
        "overflow": {
          "left": 6.16
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 53.84,
          "y": 227,
          "width": 393.63,
          "height": 43
        },
        "firstSeen": 237.912,
        "lastSeen": 237.912,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 237.912,
        "selector": "div.caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.09,
          "height": 35
        },
        "containerSelector": "[data-start=\"237.760000\"] > div:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.78,
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.09,
          "height": 35
        },
        "firstSeen": 237.912,
        "lastSeen": 237.912,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 237.912,
        "selector": "#timeline-art",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -18.55,
          "top": -69.5,
          "right": 1139.64,
          "bottom": 1989.5,
          "width": 1158.19,
          "height": 2059.01
        },
        "containerSelector": "#art",
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
          "left": 18.55,
          "right": 59.64,
          "top": 69.5,
          "bottom": 69.5
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": -18.55,
          "y": -69.5,
          "width": 1158.19,
          "height": 2059.01
        },
        "firstSeen": 237.912,
        "lastSeen": 237.912,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 238.768,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"238.380000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 238.768,
        "lastSeen": 238.768,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 239.258,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"238.380000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 239.258,
        "lastSeen": 239.258,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 239.85,
        "selector": "div.caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.09,
          "height": 35
        },
        "containerSelector": "[data-start=\"239.270000\"] > div:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.89,
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.09,
          "height": 35
        },
        "firstSeen": 239.85,
        "lastSeen": 239.85,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 239.85,
        "selector": "#timeline-art",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -50.47,
          "top": -87.46,
          "right": 1127.91,
          "bottom": 2007.46,
          "width": 1178.39,
          "height": 2094.91
        },
        "containerSelector": "#art",
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
          "left": 50.47,
          "right": 47.91,
          "top": 87.46,
          "bottom": 87.46
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": -50.47,
          "y": -87.46,
          "width": 1178.39,
          "height": 2094.91
        },
        "firstSeen": 239.85,
        "lastSeen": 239.85,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 240.239,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"240.130000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 240.239,
        "lastSeen": 240.239,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 240.729,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"240.130000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 240.729,
        "lastSeen": 240.729,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 241.788,
        "selector": "div.caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.09,
          "height": 35
        },
        "containerSelector": "[data-start=\"241.110000\"] > div:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.56,
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.09,
          "height": 35
        },
        "firstSeen": 241.788,
        "lastSeen": 241.788,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 241.788,
        "selector": "#timeline-art",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -82.4,
          "top": -105.41,
          "right": 1116.18,
          "bottom": 2025.41,
          "width": 1198.58,
          "height": 2130.82
        },
        "containerSelector": "#art",
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
          "left": 82.4,
          "right": 36.18,
          "top": 105.41,
          "bottom": 105.41
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": -82.4,
          "y": -105.41,
          "width": 1198.58,
          "height": 2130.82
        },
        "firstSeen": 241.788,
        "lastSeen": 241.788,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 242.2,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"242.120000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 242.2,
        "lastSeen": 242.2,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 242.69,
        "selector": "div.caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 271.95,
          "top": 1479,
          "right": 808.05,
          "bottom": 1514,
          "width": 536.1,
          "height": 35
        },
        "containerSelector": "[data-start=\"242.120000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "Nghĩ, thử, sửa hệ thống điện — rồi chờ.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s28.html",
        "bbox": {
          "x": 271.95,
          "y": 1479,
          "width": 536.1,
          "height": 35
        },
        "firstSeen": 242.69,
        "lastSeen": 242.69,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 252.496,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1450.57,
          "right": 900.52,
          "bottom": 1532.07,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(282) > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1450.57,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 252.496,
        "lastSeen": 252.496,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 252.986,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(282) > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 252.986,
        "lastSeen": 252.986,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 253.296,
        "selector": "#caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.03,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"253.150000\"] > div:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.69,
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.03,
          "height": 81.5
        },
        "firstSeen": 253.296,
        "lastSeen": 253.296,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 254.457,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"254.100000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 254.457,
        "lastSeen": 254.457,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 254.948,
        "selector": "#caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.04,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"254.100000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.04,
          "height": 81.5
        },
        "firstSeen": 254.948,
        "lastSeen": 254.948,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 255.09,
        "selector": "#caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.03,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"255.000000\"] > div:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.59,
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.03,
          "height": 81.5
        },
        "firstSeen": 255.09,
        "lastSeen": 255.09,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 256.884,
        "selector": "#caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 179.48,
          "top": 1441,
          "right": 900.52,
          "bottom": 1522.5,
          "width": 721.03,
          "height": 81.5
        },
        "containerSelector": "[data-start=\"256.150000\"] > div:nth-of-type(1)",
        "text": "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian.",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.72,
        "dataAttributes": {
          "data-layout-allow-caption-zone": "true"
        },
        "sourceFile": "compositions/scene-s30.html",
        "bbox": {
          "x": 179.48,
          "y": 1441,
          "width": 721.03,
          "height": 81.5
        },
        "firstSeen": 256.884,
        "lastSeen": 256.884,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 274.416,
        "selector": "#s33-artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -82.35,
          "top": -146.4,
          "right": 1162.35,
          "bottom": 2066.4,
          "width": 1244.7,
          "height": 2212.8
        },
        "containerSelector": "div.art-window",
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
          "left": 82.35,
          "right": 82.35,
          "top": 146.4,
          "bottom": 146.4
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s33.html",
        "bbox": {
          "x": -82.35,
          "y": -146.4,
          "width": 1244.7,
          "height": 2212.8
        },
        "firstSeen": 274.416,
        "lastSeen": 274.416,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 276.54,
        "selector": "#s33-artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -64.85,
          "top": -115.3,
          "right": 1144.85,
          "bottom": 2035.3,
          "width": 1209.71,
          "height": 2150.59
        },
        "containerSelector": "div.art-window",
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
          "left": 64.85,
          "right": 64.85,
          "top": 115.3,
          "bottom": 115.3
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s33.html",
        "bbox": {
          "x": -64.85,
          "y": -115.3,
          "width": 1209.71,
          "height": 2150.59
        },
        "firstSeen": 276.54,
        "lastSeen": 276.54,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 278.664,
        "selector": "#s33-artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -47.52,
          "top": -84.48,
          "right": 1127.52,
          "bottom": 2004.48,
          "width": 1175.04,
          "height": 2088.96
        },
        "containerSelector": "div.art-window",
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
          "left": 47.52,
          "right": 47.52,
          "top": 84.48,
          "bottom": 84.48
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s33.html",
        "bbox": {
          "x": -47.52,
          "y": -84.48,
          "width": 1175.04,
          "height": 2088.96
        },
        "firstSeen": 278.664,
        "lastSeen": 278.664,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 293.68,
    "samples": [
      1.868,
      4.67,
      7.472,
      10.682,
      12.695,
      14.708,
      18.042,
      21.03,
      24.018,
      27.824,
      30.545,
      33.266,
      36.574,
      38.815,
      41.056,
      43.856,
      45.815,
      47.774,
      51.05,
      54.005,
      56.96,
      60.352,
      62.485,
      64.618,
      67.39,
      69.415,
      71.44,
      74.832,
      77.895,
      80.958,
      85.016,
      88.04,
      91.064,
      94.876,
      97.57,
      100.264,
      104.232,
      107.49,
      110.748,
      114.352,
      116.5,
      118.648,
      121.972,
      124.81,
      127.648,
      131.048,
      133.31,
      135.572,
      138.828,
      141.45,
      144.072,
      147.256,
      149.41,
      151.564,
      155.426,
      159.065,
      162.704,
      166.916,
      169.595,
      172.274,
      175.838,
      178.505,
      181.172,
      184.474,
      186.76,
      189.046,
      192.404,
      195.155,
      197.906,
      202.256,
      206.03,
      209.804,
      214.072,
      216.7,
      219.328,
      222.596,
      224.87,
      227.144,
      230.252,
      232.64,
      235.028,
      237.912,
      239.85,
      241.788,
      244.884,
      247.59,
      250.296,
      253.296,
      255.09,
      256.884,
      258.64,
      259.48,
      260.32,
      261.24,
      261.78,
      262.32,
      262.984,
      263.44,
      263.896,
      265.96,
      268.6,
      271.24,
      274.416,
      276.54,
      278.664,
      281.66,
      284.03,
      286.4,
      289.12,
      290.83,
      292.54,
      293.68
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 108,
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
      1.868,
      74.832,
      159.065,
      239.85,
      292.54
    ],
    "checked": 28,
    "passed": 28
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
    "latestVersion": "0.8.96",
    "updateAvailable": true
  }
}


- **2026-09-30T12:50:03.018Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S30 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s30-7b.txt` — Codegen HyperFrames scene [S30] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `#scale-icon` có `class="clip"` và `data-start`/`data-duration` (timed element) nhưng lại nằm bên trong `<section class="clip scene" data-start="0">` — vi phạm quy tắc không lồng timed element vào timed element (lint: `video_nested_in_timed_element` áp dụng cho mọi timed element lồng nhau khi cả hai đều có `data-start`); cần đưa `#scale-icon` ra ngoài section hoặc bỏ `data-start`/`data-duration` trên section cha.
- `#caption` có `class="clip"` và `data-start`/`data-duration` cũng nằm trong `<section data-start="0">` — cùng lỗi lồng timed element, lint sẽ reject.
- Overlay "Đường thời gian lùi tới vạch sự việc đã xảy ra rồi dừng" (atMs 256390, holdMs 1680 → ~4.29s–5.97s trong shot) được render bằng `#caption` với nội dung tự chế "Tình tiết giảm nhẹ cân nhắc mức án — không thể quay ngược thời gian." thay vì đúng text shotlist; đây là sai nội dung chính của overlay type "line".
ADVISORY:
- `#event-label` xuất hiện lúc ~3.95s nhưng không có `data-start`/`data-duration` — phần tử này luôn tồn tại trong DOM (chỉ ẩn bằng opacity:0 trong CSS), không phải timed clip; không gây lỗi runtime nhưng không nhất quán với pattern timed overlay.
- CSS định nghĩa `.hf-text-ink`, `.hf-text-light`… hai lần (duplicate block) — thừa, nên dọn.
- `html, body { width: 1080px; height: 1920px }` hardcode px thay vì để responsive; không gây lỗi render nhưng trái quy ước.
- Backtrack animation bắt đầu lúc 3.05s (strokeDashoffset 800→0, tức vẽ từ phải sang trái) nhưng shotlist mô tả "đường thời gian thử lùi rồi dừng" — hướng animation hợp lý, chỉ lưu ý để reviewer kiểm tra trực quan.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s30

- **2026-09-30T12:50:20.724Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-23-2023-ben-tre --scenes=S28 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-s28-7b.txt` — Codegen HyperFrames scene [S28] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

BLOCKING:
- Nội dung overlay "Điểm nhấn bước nghĩ và thử" (atMs 237850, holdMs 1650) và "Điểm nhấn bước sửa hệ thống điện" (atMs 238380, holdMs 2100) bị thay thế bằng card tự chế "NGHĨ", "THỬ", "SỬA HỆ THỐNG ĐIỆN" — chữ overlay gốc trong shotlist không xuất hiện đúng như yêu cầu.
- Overlay "Điểm thực hiện xuất hiện sau khoảng chờ" (atMs 240310, holdMs 2640) bị render thành step-card với step-label chứa nguyên chuỗi mô tả ý đồ thay vì nội dung chữ thật — đây là chuỗi mô tả ý đồ của shotlist, không phải chữ hiển thị; code đã bịa nội dung không có trong shotlist.
- clock-mark dùng ký tự Unicode "◷" thay vì icon "clock" theo đúng type="icon" text="clock" trong shotlist — không phải lỗi asset nhưng là sai loại phần tử (icon phải dùng asset/SVG clock, không phải ký tự Unicode tự chế).
- `.clock-mark` có `position: absolute; inset: auto` nhưng lại có `class="clip"` — class clip áp CSS `.clip { position: absolute; inset: 0 }` ghi đè left/top đã khai báo, khiến phần tử không bao giờ hiện đúng vị trí (left:812px; top:1030px bị inset:0 override).
- `.step-card` có `class="clip"` — CSS `.clip { inset: 0 }` ghi đè `left`/`top` inline style, khiến tất cả step-card đều đè lên nhau tại inset:0 thay vì đúng vị trí thiết kế.

ADVISORY:
- Các chart-rule và timeline-rail/node là chi tiết sáng tạo thêm ngoài shotlist, không có trong overlays — chấp nhận được nếu không che nội dung chính, nhưng cần kiểm tra occlusion.
- Pan-right camera motion dùng x: -24 → 24 trên ảnh tĩnh là hợp lý, nhưng biên độ 48px trên ảnh 1080px rất nhỏ — có thể tăng để pan rõ hơn theo mô tả "pan chậm qua từng vị trí".
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-23-2023-ben-tre-s28

- **2026-09-30T12:53:27.035Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-23-2023-ben-tre` — Stage 7b integration check PASS — 35/35 scene, có audio, có caption-track, hyperframes check ok=true (111 mốc/37 shot, 71.1s).

- **2026-09-30T12:55:17.693Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-23-2023-ben-tre` — Stage 7b integration check PASS — 35/35 scene, có audio, có caption-track, hyperframes check ok=true (111 mốc/37 shot, 70.4s).

- **2026-09-30T13:06:42.258Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\ban-an-23-2023-ben-tre-full.mp4, 229067457 bytes (218.5MB), 684.0s render time, quality=looks. Xác minh ffprobe: duration=293.700s (khớp audio thật 293.680s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=7.9s, browser_probe=0.9s, video_extract=0.0s, audio_process=15.6s, file_server=0.4s, capture_calibration=4.3s, capture_disk=445.5s, encode=162.1s, assemble=35.0s.
