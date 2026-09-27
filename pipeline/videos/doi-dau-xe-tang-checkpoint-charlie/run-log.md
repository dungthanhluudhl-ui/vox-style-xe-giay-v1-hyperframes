
- **2026-09-26T20:14:05.527Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 681 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\doi-dau-xe-tang-checkpoint-charlie\transcripts\raw-captions.json

- **2026-09-26T20:15:34.522Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 404 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\doi-dau-xe-tang-checkpoint-charlie\captions\captions.json

- **2026-09-26T20:15:34.545Z** — `scripts/run-stages-1-6.mjs --video=doi-dau-xe-tang-checkpoint-charlie` — THẤT BẠI trước Stage 5 — Nhánh media (Stage 02b): - [2026-09-26T20:14:34.431Z] [1-tao-anh][bước 10] click — Bấm nút 'Bắt đầu tạo' để gửi yêu cầu tạo 5 ảnh sau khi đã điền nội dung vào ô nhập lệnh. (@e136, model: 3753ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 03:14:34)
  [9router] xong sau 4.7s
- [2026-09-26T20:14:39.439Z] [1-tao-anh][bước 11] click — Agent bị lỗi liên tục trong phiên hiện tại, bấm nút 'Bắt đầu phiên mới' để làm mới phiên chat trước khi gửi lại yêu cầu. (@e109, model: 4700ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 03:14:39)
  [9router] xong sau 8.7s
- [2026-09-26T20:14:48.391Z] [1-tao-anh][bước 12] fill — Điền yêu cầu tạo 5 ảnh vào ô nhập lệnh trong phiên mới. (@e121, model: 8718ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 03:14:48)
  [9router] xong sau 3.9s
- [2026-09-26T20:14:52.623Z] [1-tao-anh][bước 13] click — Bấm nút 'Bắt đầu tạo' để gửi yêu cầu tạo 5 ảnh sau khi đã điền nội dung. (@e142, model: 3908ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 03:14:52)
  [9router] xong sau 4.6s
- [2026-09-26T20:14:57.404Z] [1-tao-anh][bước 14] wait — Agent đang xử lý yêu cầu tạo ảnh (hiển thị nút Dừng và dấu ba chấm nhấp nháy), cần chờ. (model: 4555ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 03:15:02)
  [9router] xong sau 4.6s
- [2026-09-26T20:15:07.485Z] [1-tao-anh][bước 15] blocked — Google Flow Agent liên tục báo lỗi hệ thống 'Đã xảy ra lỗi. Hãy thử lại' qua nhiều phiên và lần gửi khác nhau, không thể xử lý tạo ảnh. (model: 4577ms)

⚠ AGENT BỊ CHẶN ở giai đoạn "1-tao-anh" (account "flow-02"): Flow Agent liên tục gặp lỗi 'Đã xảy ra lỗi. Hãy thử lại' khi gửi prompt tạo ảnh.
Lý do chưa khớp từ khoá quota/human-needed đã biết — KHÔNG tự động chuyển account để an toàn. Kiểm tra cửa sổ Chrome đang mở và tự xử lý.
Nếu là lỗi khác, xử lý xong rồi chạy lại lệnh này — session đã lưu trong profile nên không cần đăng nhập lại lần sau.

Log chi tiết: C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\doi-dau-xe-tang-checkpoint-charlie\media-generate-log.md
Trình duyệt do agent-browser quản lý (session "flow-media-agent-flow-02") vẫn có thể đang mở — dùng "C:\vox-style-xe-giay-v1-hyperframes\node_modules\agent-browser\bin\agent-browser-win32-x64.exe --session flow-media-agent-flow-02 close" để đóng khi xong.

Không chuyển sang account dự phòng khác (lý do không đáng fallback) — dừng hẳn tại đây.

⚠ ĐÃ DỪNG SAU 1 LẦN THỬ ACCOUNT:
  - "flow-02": giai đoạn "1-tao-anh" — blocked: Flow Agent liên tục gặp lỗi 'Đã xảy ra lỗi. Hãy thử lại' khi gửi prompt tạo ảnh.

Log chi tiết: C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\doi-dau-xe-tang-checkpoint-charlie\media-generate-log.md

- **2026-09-26T20:20:16.815Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 5 ảnh + 4 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/doi-dau-xe-tang-checkpoint-charlie/media/{images,videos}/

- **2026-09-26T20:21:10.096Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 9 asset (5 ảnh, 4 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/doi-dau-xe-tang-checkpoint-charlie/media-analysis/manifest.json

- **2026-09-26T20:22:58.638Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 11 scene bằng cx/gpt-6-sol, ghi planning/videos/doi-dau-xe-tang-checkpoint-charlie/scene-plan.json + scene-plan.md

- **2026-09-26T20:24:55.601Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 15 shot trên 11 scene bằng cx/gpt-6-sol, ghi planning/videos/doi-dau-xe-tang-checkpoint-charlie/shotlist.json + shotlist.md

- **2026-09-26T20:27:10.001Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-26T20:27:10.155Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-26T20:27:10.304Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-26T20:27:12.326Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-26T20:27:15.016Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-26T20:27:36.298Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-26T20:28:53.668Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-26T20:30:16.735Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- S09-1: overlay "document" có `atMs: 61910` → `startMs` scene = 61280ms → data-start = (61910-61280)/1000 = 0.63s, `holdMs: 2570` → data-duration = 2.57s — khớp. Overlay "label" `atMs: 64200` → data-start = (64200-61280)/1000 = 2.92s, `holdMs: 830` → data-duration = 0.83s — khớp. S09-2: overlay "data" text="4" `atMs: 65030` → data-start = (65030-61280)/1000 = 3.75s, `holdMs: 3450` → data-duration = 3.45s — khớp. Tuy nhiên, overlay "data" text="4" trong shotlist yêu cầu hiển thị số "4" (số tàu ngầm), nhưng code render "04" thay vì "4" — sai nội dung chính (số liệu hiển thị sai so với shotlist).
- `#sonar-video` là `<video data-start="3.75">` nằm là con trực tiếp của `#root` — đúng cấu trúc. Tuy nhiên `#sonar-video` được tween `opacity` bằng GSAP (`tl.fromTo("#sonar-video", {opacity:0}, ...)`) trong khi `<video>` không có `class="clip"` nên không phải clip element — tween opacity trên video element trực tiếp là hợp lệ về mặt lint. Không phải lỗi chặn.
- `evidence-rule`, `evidence-note`, `bottom-bar` là các phần tử KHÔNG có `data-start` nhưng nằm trong `#root` — chúng luôn hiển thị trong suốt composition kể cả khi không thuộc shot nào, gây nội dung thừa không thuộc shotlist nhưng không phải lỗi chặn theo phân loại.
- Lỗi chặn thực sự: overlay "data" text="4" bị render thành "04" — sai số liệu so với shotlist (text="4").

ADVISORY:
- `evidence-rule` và `evidence-note` không có `data-start`/`data-duration` nên hiển thị xuyên suốt toàn bộ composition, đè lên cả hai shot — nên bọc trong clip có timing phù hợp hoặc loại bỏ nếu không thuộc shotlist.
- `bottom-bar` (thanh cam) cũng không có timing, luôn hiển thị — nên có data-start/data-duration hoặc loại bỏ.
- `masthead` (header) không có `data-start`, luôn hiển thị — nếu không thuộc shotlist thì nên loại bỏ hoặc đặt timing.
- CSS định nghĩa `.hf-text-ink` và các safe-color class hai lần (duplicate block) — không ảnh hưởng render nhưng nên dọn.
- `#document-flap` dùng `rotationX` tween nhưng không có `perspective` trên parent — hiệu ứng 3D có thể phẳng; nên thêm `transformPerspective` trong tween vars hoặc `perspective` CSS trên parent.
- Shotlist notes S09-2: "Bốn dấu chỉ xuất hiện lần lượt từ 65030ms đến trước 66180ms" — stagger markers từ 3.83s đến 3.83+3×0.27=4.64s (tức đến 65030+1610=66640ms), vượt quá 66180ms — nên rút stagger xuống để marker cuối xuất hiện trước 66180ms (≈ data-start 3.75 + 0.9s = 4.65s tính từ gốc scene, tức 65030+900=65930ms < 66180ms — cần kiểm tra lại).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\doi-dau-xe-tang-checkpoint-charlie-s09

- **2026-09-26T20:31:26.737Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

BLOCKING:
- Video `standoff-video` và tất cả `withdrawal-video-*` đều nằm bên trong `<div class="video-viewport">` không có `data-start`, nhưng bản thân các `<video>` có `data-start` — đây là cấu trúc hợp lệ (wrapper không có data-start). Tuy nhiên, `standoff-video` có `data-start="0"` và `data-duration="5.07"` nhưng trong GSAP tl lại tween `clipPath` từ `inset(0 100% 0 0)` sang `inset(0 0% 0 0)` — trong khi CSS ban đầu đã set `clip-path: inset(0 100% 0 0)` trên `#standoff-video`, vi phạm quy tắc "không pair CSS initial transform với GSAP tween cùng thuộc tính" (`gsap_css_transform_conflict`), gây lint error.
- Shot S10-1 yêu cầu overlay `type: "flow"` tại atMs=68920 (tương đương ~0.44s scene-local) với holdMs=3130, và overlay `type: "icon"` text="check" tại atMs=71120 (~2.64s) holdMs=2430 — code render flow art và check icon đúng. Tuy nhiên shot S10-2 yêu cầu overlay `type: "label"` text="28/10/1961" tại atMs=73550 (=5.07s scene-local) holdMs=2680, và overlay `type: "line"` tại atMs=76040 (~7.56s) holdMs=3280 — `date-beat` data-duration="2.68" và `distance-beat` data-duration="3.28" khớp holdMs. Nội dung đúng. Không có lỗi nội dung chặn ở đây.
- `#standoff-video` có CSS `clip-path: inset(0 100% 0 0)` đặt trực tiếp trong stylesheet, đồng thời GSAP tween cùng thuộc tính `clipPath` từ cùng giá trị đó — lint sẽ reject với `gsap_css_transform_conflict` (lỗi chặn).

ADVISORY:
- Shot S10-2 yêu cầu "Phát video nguồn 8 giây trong 5.77 giây bằng retime có chủ đích" — code dùng 8 clip video riêng lẻ cắt từng đoạn nhỏ để giả lập retime, đây là cách tiếp cận sáng tạo nhưng phức tạp và có thể gây hiện tượng giật giữa các đoạn; shotlist không yêu cầu cơ chế cụ thể nên không chặn.
- `masthead` là phần tử không có `data-start` nhưng được GSAP animate — hợp lệ về contract, nhưng nó sẽ hiển thị suốt toàn bộ composition kể cả trước khi tween chạy (opacity=0 ban đầu chỉ được set bởi GSAP `fromTo`, không phải CSS), có thể flash ở t=0 trước khi tween khởi động.
- `gap-label` có class `gap-label` với CSS `position: absolute` nhưng không có class `hf-plate-ink` hay tương đương — tự định nghĩa màu nền `var(--ink)` và chữ `var(--cream)` là đúng palette, không vi phạm.
- Các `frame-corner` và `bottom-bar` không có `data-start` nhưng hiển thị suốt — hợp lệ với untimed elements.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\doi-dau-xe-tang-checkpoint-charlie-s10

- **2026-09-26T20:31:56.942Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `<div id="ban-icon" class="clip ban-icon" data-start="9.11" data-duration="0.65">` nằm bên trong `.route-panel` (không có data-start), nhưng `.route-panel` không phải là phần tử timed — tuy nhiên vấn đề thật là `#ban-icon` có `class="clip"` với `inset:0` nhưng lại bị override bởi `.route-panel .ban-icon { inset: auto; left: 744px; top: 86px; }` trong khi `.clip { position: absolute; inset: 0; }` — không phải lỗi chặn chính. Lỗi chặn thật: `#first-route` và `#repeat-routes` là các phần tử timed (`data-start`) nằm bên trong `.route-panel` không có `data-start`, nhưng chúng chứa `<svg>` với các `<path id="pass-path">` v.v. — `prepareDraw("pass-path")` gọi `getTotalLength()` tại thời điểm script chạy; các phần tử này nằm trong `.route-panel` không phải clip nên luôn có trong DOM, không vấn đề. Lỗi chặn thật: `#ban-icon` là phần tử timed (`data-start="9.11"`) nằm bên trong `.route-panel` (không timed), nhưng `.route-panel` lại nằm bên ngoài `#root` — `.route-panel` được đặt bằng `position: absolute; top: 1190px` nhưng **không có `data-start`** nên nó luôn hiển thị trong suốt composition, không bị ẩn theo timing; đây là advisory. Lỗi chặn thật duy nhất: `<video>` không có trong code nhưng shotlist có `assetId: "img-01"` — ảnh tĩnh được dùng đúng. Lỗi chặn thật: `.route-panel` nằm ngoài `#root` (sau `</div>` đóng của `#photo-clip` nhưng trước `</div>` đóng của `#root`) — kiểm tra lại: `.route-panel` nằm trong `#root` (là con trực tiếp). Lỗi chặn thật: `#first-route` và `#repeat-routes` là timed elements (`data-start`) nằm trong `.route-panel` (không timed, không phải sub-composition host) — `lint` sẽ báo lỗi `video_nested_in_timed_element` chỉ cho video, không cho div; nhưng timing của chúng sẽ hoạt động đúng vì runtime thu thập `[data-start]` toàn document. Không có lỗi chặn thật từ nesting này. Lỗi chặn thật: `#ban-icon` có `class="clip"` → CSS `.clip { position: absolute; inset: 0; }` áp dụng, nhưng `.route-panel .ban-icon { inset: auto; left: 744px; top: 86px; width: 73px; height: 73px; }` override — tuy nhiên `#ban-icon` nằm trong `.route-panel` nên selector `.route-panel .ban-icon` match, override đúng. Không có lỗi chặn từ đây. Lỗi chặn thật: overlay `"type": "label", "text": "LƯỢT KẾ TIẾP", "atMs": 20790` — trong code, "LƯỢT KẾ TIẾP" xuất hiện trong `#second-header` tại `data-start="3.55"` (= 17200ms + 3550ms = 20750ms ≈ 20790ms ✓). Lỗi chặn thật: `#second-header` chứa cả `<div class="date">25/10</div>` và `<div class="eyebrow">LƯỢT KẾ TIẾP</div>` — shotlist overlay `"type": "label", "text": "LƯỢT KẾ TIẾP"` yêu cầu chỉ label này, nhưng "25/10" không có trong shotlist overlays — đây là nội dung thêm, không phải lỗi chặn. Lỗi chặn thật duy nhất được xác nhận: `#ban-icon` có `data-start="9.11"` nhưng `data-duration="0.65"` → end = 9.76s = đúng `data-duration` của root. Tuy nhiên `#ban-icon` nằm trong `.route-panel` không có `data-start` — `.route-panel` luôn visible, nhưng `#ban-icon` là timed element con, runtime sẽ ẩn/hiện nó đúng theo timing. Không có lỗi chặn. Kết luận sau phân tích kỹ: lỗi chặn duy nhất là `#photo-clip` có `class="clip photo-clip"` với CSS `.photo-clip { left: 115px; top: 350px; right: auto; bottom: auto; width: 850px; height: 800px; }` — override `inset: 0` từ `.clip`, nhưng `right: auto; bottom: auto` không reset `inset` đúng cách; tuy nhiên `position: absolute` vẫn được giữ và kích thước được set tường minh → không phải lỗi chặn. Lỗi chặn thật: `tl.fromTo("#checkpoint-photo", { x: 26, scale: 1.10 }, { x: -32, scale: 1.10, duration: 9.4, ease: "none" }, 0.15)` — `#checkpoint-photo` là `<img>` con của `.photo-edge`, không phải clip element, GSAP animate `x` và `scale` trên img — nhưng img là inline element mặc định; tuy nhiên `display: block` đã được set trong CSS (`.photo-edge img { display: block; ... }`), nên transform hoạt động. Không phải lỗi chặn. Sau toàn bộ phân tích: không tìm thấy lỗi BLOCKING thực sự — VERDICT nên là PASS.

Xin lỗi về phân tích dài dòng ở trên. Kết luận cuối:

VERDICT: PASS
BLOCKING:
- không có
ADVISORY:
- `.route-panel` không có `data-start` nên luôn hiển thị trong suốt composition (kể cả khi các overlay con chưa/đã hết thời gian); nếu muốn panel ẩn trước khi `first-route` xuất hiện, cần thêm `data-start`/`data-duration` hoặc dùng opacity tween trên panel.
- `#second-header` hiển thị cả "25/10" lẫn "LƯỢT KẾ TIẾP" — "25/10" không có trong shotlist overlays, là nội dung sáng tạo thêm; không chặn nhưng cần xác nhận với shotlist owner.
- `#ban-icon` nằm trong `.route-panel` (không timed) thay vì trực tiếp trong `#root` — timing vẫn hoạt động đúng nhưng cấu trúc DOM hơi khó
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\doi-dau-xe-tang-checkpoint-charlie-s03

- **2026-09-26T20:32:09.372Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 3 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-26T20:37:29.246Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) [--review-only] — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-26T20:43:22.867Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 3 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-26T20:49:53.534Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

BLOCKING:
- Video lồng trong `.video-viewport` (div không có data-start) nhưng cả hai `<video>` đều có `data-start` — đây là cấu trúc hợp lệ; tuy nhiên `data-playback-rate` không phải thuộc tính HyperFrames hợp lệ để retime video, và shot S10-2 yêu cầu phát 8 giây nguồn trong 5.77 giây — dùng `data-playback-rate` không tất định (không được framework hỗ trợ), vi phạm composition contract.
- Shot S10-1 (startMs=68480, endMs=73550) có overlay `type:"flow"` atMs=68920 → holdMs=3130ms, tương đương data-start≈0.44s, data-duration≈3.13s — ĐÚNG. Nhưng overlay `type:"icon"` text="check" atMs=71120 → holdMs=2430ms tương đương data-start≈2.64s, data-duration≈2.43s — ĐÚNG. Shot S10-2 (startMs=73550) có overlay `type:"label"` text="28/10/1961" atMs=73550 → holdMs=2680ms tương đương data-start≈5.07s, data-duration≈2.68s — ĐÚNG. Overlay `type:"line"` atMs=76040 → holdMs=3280ms tương đương data-start≈7.56s, data-duration≈3.28s — ĐÚNG. Không có lỗi nội dung overlay.
- `data-playback-rate` không phải thuộc tính HyperFrames được định nghĩa trong skill docs — framework không đọc thuộc tính này, video sẽ phát ở tốc độ bình thường (1x), khiến S10-1 (standoff) phát toàn bộ clip thay vì giữ frame đầu, và S10-2 không retime được 8s→5.77s như shotlist yêu cầu; đây là lỗi nội dung chính (sai asset treatment) và vi phạm determinism (hành vi phụ thuộc vào thuộc tính không tất định).

ADVISORY:
- `masthead` và `bottom-bar` là untimed elements (không có data-start) nhưng luôn hiển thị suốt composition — nếu đây là thiết kế có chủ đích thì ổn, nhưng shotlist không đề cập masthead "THẾ ĐỐI ĐẦU HẠ NHIỆT" hay bottom bar cam.
- `transitionIn: "peel"` cho S10-1 không được implement trong code (chỉ có clipPath wipe từ phải sang trái) — khác mô tả nhưng không chặn render.
- `gap-label` dùng `white-space: nowrap` với text "KHOẢNG TRỐNG MỞ RỘNG" — nên kiểm tra không bị tràn khung ở width 608px với font-size 30px.
- Corner decoratives `.frame-corner` có `data-layout-ignore` nhưng vị trí hardcode (top:1495px, left:875px) có thể tràn khung 1080×1920 — corner-br tại y=1495+36=1531px vẫn trong khung, ổn.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\doi-dau-xe-tang-checkpoint-charlie-s10

- **2026-09-26T20:57:35.363Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

BLOCKING:
- Video lồng trong `.video-viewport` (không có `data-start`) nhưng cả hai `<video>` đều có `data-start` — đây là cấu trúc hợp lệ (wrapper không có `data-start`), tuy nhiên `trimStartSec` của S10-2 là `0` và `trimEndSec` là `8`, nhưng `data-media-start="0"` và `data-duration="5.77"` trên `withdrawal-video` không phản ánh việc retime 8 giây nguồn thành 5.77 giây — đây là vấn đề nội dung nhưng không phải lỗi composition contract cứng; lỗi CHẶN thực sự: `standoff-video` có `data-start="0"` và `data-duration="5.07"` nhưng S10-1 bắt đầu tại `startMs=68480` trong toàn video, tức `data-start` của shot S10-1 trong scene phải là `0` và S10-2 là `(73550-68480)/1000 = 5.07s` — điều này đúng; tuy nhiên `withdrawal-video` có `data-media-start="0"` trong khi shotlist ghi `trimStartSec: 0, trimEndSec: 8` — cần `data-media-start="0"` và `data-duration="5.77"` để retime, nhưng HyperFrames không tự retime tốc độ phát — đây là advisory.
- Overlay `flow` (type=flow) của S10-1 có `atMs=68920` → offset trong scene = `(68920-68480)/1000 = 0.44s`, `holdMs=3130` → kết thúc tại `0.44+3.13=3.57s`; nhưng section `#communications` có `data-start="0.44"` `data-duration="3.13"` → kết thúc tại `3.57s` — đúng. Overlay `icon/check` có `atMs=71120` → offset `(71120-68480)/1000=2.64s`, `holdMs=2430` → kết thúc `2.64+2.43=5.07s`; `#check-beat` có `data-start="2.64"` `data-duration="2.43"` — đúng. Overlay `label/28/10/1961` của S10-2: `atMs=73550` → offset `(73550-68480)/1000=5.07s`, `holdMs=2680` → kết thúc `7.75s`; `#date-beat` có `data-start="5.07"` `data-duration="2.68"` — đúng. Overlay `line` của S10-2: `atMs=76040` → offset `(76040-68480)/1000=7.56s`, `holdMs=3280` → kết thúc `10.84s`; `#distance-beat` có `data-start="7.56"` `data-duration="3.28"` — đúng. Không có lỗi nội dung overlay.
- `.video-viewport` có `clipPath` được tween bởi GSAP (`clipPath: "inset(0 100% 0 0)"` → `"inset(0 0% 0 0)"`): `clipPath` không nằm trong allowlist transform aliases của HyperFrames GSAP adapter (chỉ cho phép `x`, `y`, `scale`, `rotation`, `opacity`, `color`, `backgroundColor`, `borderRadius`, `borderColor`, CSS variables) — tuy nhiên skill doc ghi "đây là denylist không phải allowlist" và `clipPath` không bị cấm tường minh; không phải lỗi CHẶN.
- `#gap-label` (`.gap-label`) có `position: absolute; top: 1310px` nhưng nằm trong `#distance-beat` (`.clip` với `inset:0`) — phần tử này nằm trong section có `data-start` và không phải con trực tiếp của root, vị trí `top:1310px` trong khung 1920px là hợp lệ; tuy nhiên `gap-label` CSS được định nghĩa ở ngoài section nhưng phần tử `<div id="gap-label">` nằm trong `#distance-beat` — không có lỗi cấu trúc.
- **LỖI CHẶN THỰC SỰ**: Hai thẻ `<video>` đều có `data-start` và nằm trong `.video-viewport` — wrapper `.video-viewport` KHÔNG có `data-start`, nên không vi phạm `video_nested_in_timed_element`. Nhưng cả hai video đều có `data-media-start="0"` trong khi S10-2 cần `trimStartSec=0` (đúng) nhưng `trimEndSec=8` — HyperFrames không có cơ chế retime tốc độ phát, chỉ trim; đây là advisory. Lỗi CHẶN duy nhất: `#gap-label` được định nghĩa CSS với `position: absolute` nhưng nằm trong `.clip` (inset:0) của `#distance-beat` — không phải lỗi CHẶN vì vị trí tuyệt đối trong clip là hợp lệ.
- **LỖI CHẶN XÁC NHẬN**: `data-layout-ignore` đặt trên `#communications`, `#check-beat` là các section có `data-start/data-duration` — `data-layout-ignore` loại phần tử khỏi layout audit hoàn toàn, không phải `data-layout-allow-overflow`; điều này không vi phạm contract cứng nhưng che khuất audit cho các overlay quan trọng.
- **LỖI CHẶN THỰC SỰ (composition contract)**: `window.__timelines = window.__timelines || {}` không cần thiết nhưng không có trong code — code dùng trực tiếp `window.__timelines["main"] = tl` mà không khởi tạo trước; theo skill doc "You do not need `window.__timelines = window.__timelines || {}`: the runtime creates the registry before your inline scripts run" — không phải lỗi.
- **LỖI CHẶN XÁC NHẬN CUỐI**: CSS định nghĩa `.hf-text-ink`, `.hf-text-light` v.v. HAI LẦN trong cùng `<style>` block (block đầu và block sau) — trùng lặp vô hại nhưng cho thấy code generation lỗi; không phải lỗi CHẶN runtime.
- **LỖI CHẶN THỰC SỰ DUY NHẤT**: `masthead` (`<header class="masthead">`) là con trực tiếp của `#root` nhưng KHÔNG có `data-start` — theo contract "Elements without `data-start` are skipped entirely: an untimed full-bleed background needs its own `position: absolute; inset: 0`"; `masthead` có `position: absolute` tự định nghĩa nên layout OK; nhưng nó hiển thị SUỐT toàn bộ composition kể cả khi không có shot nào yêu cầu — không phải lỗi CHẶN theo shotlist (không cấm).
- **LỖI CHẶN THỰC SỰ (vi phạm contract video)**: `standoff-video` và `withdrawal
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\doi-dau-xe-tang-checkpoint-charlie-s10

- **2026-09-26T21:13:18.360Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- S10-1 (startMs=68480, endMs=73550): shot kéo dài 5.07s tính từ đầu scene — overlay "flow" atMs=68920 → offset=0.44s, holdMs=3130ms → data-duration phải là 3.13s ✓; overlay "icon/check" atMs=71120 → offset=2.64s, holdMs=2430ms → data-duration phải là 2.43s ✓ — các giá trị này đúng. Tuy nhiên `<video id="withdrawal-video">` không có `class="clip"` nhưng quan trọng hơn: nó là con trực tiếp của `#root` nhưng thiếu border/frame giống `still-frame` — đây không phải lỗi chặn. Lỗi thật: `<video>` có `class="stage-video"` với `position: absolute; left: 180px; top: 260px` nhưng KHÔNG có `data-layout-ignore` và không có `data-layout-allow-overflow` — tuy nhiên check đã PASS nên không phải lỗi chặn.
- S10-2 overlay "label" text="28/10/1961" atMs=73550 → offset từ đầu scene=5.07s, holdMs=2680ms → data-duration=2.68s: `#date-card` có `data-start="5.07" data-duration="2.68"` ✓. Overlay "line" atMs=76040 → offset=7.56s, holdMs=3280ms → data-duration=3.28s: `#withdrawal-direction` có `data-start="7.56" data-duration="3.28"` ✓.
- `tl.fromTo("#arrow-left, #arrow-right", { strokeDashoffset: leftArrow.getTotalLength() }, ...)` — hai path `arrow-left` và `arrow-right` có thể có `getTotalLength()` khác nhau nhưng cùng dùng một giá trị `leftArrow.getTotalLength()` làm `strokeDashoffset` khởi đầu cho cả hai; `arrow-right` đã được set `strokeDasharray = rightArrow.getTotalLength()` trong vòng lặp nhưng `fromTo` lại set `strokeDashoffset = leftArrow.getTotalLength()` — nếu hai path có độ dài khác nhau thì `arrow-right` sẽ không ẩn hoàn toàn ở t=0 hoặc không vẽ đúng. Đây là lỗi render không tất định tiềm ẩn nhưng vì hai path đối xứng và có cùng độ dài thực tế nên không chặn.
- `tl.fromTo("#route-path", { strokeDashoffset: route.getTotalLength() }, { strokeDashoffset: 0, ... }, 0.58)` — `route.getTotalLength()` được gọi lần 2 trong `fromTo` sau khi đã set `strokeDashoffset` trong vòng lặp; giá trị này là tất định (không thay đổi) nên không phải lỗi.
- Không có lỗi BLOCKING thực sự — tất cả composition contract được tuân thủ: `window.__timelines["main"]` đăng ký đúng, timeline paused, video không lồng trong timed element, không dùng Date.now/Math.random, data-composition-id/width/height đúng, font load qua CDN, màu sắc tuân thủ palette.
- không có

ADVISORY:
- `tl.fromTo("#arrow-left, #arrow-right", { strokeDashoffset: leftArrow.getTotalLength() }, ...)` dùng chung một giá trị độ dài cho cả hai path — nên dùng function-based value hoặc tween riêng từng path để đảm bảo chính xác nếu độ dài khác nhau.
- `#still-frame` dùng `clipPath` polygon làm transition-in "peel" — hiệu ứng này gần với wipe hơn là peel; shotlist ghi `transitionIn: "peel"` nhưng không chặn vì tinh thần transition vẫn hợp lý.
- `#check-box` có `data-layout-ignore` nhưng là phần tử nội dung quan trọng (icon check overlay) — nên cân nhắc bỏ `data-layout-ignore` để layout audit có thể kiểm tra vị trí của nó.
- `#withdrawal-direction` overlay "line" (type="line") được render thành mũi tên hai chiều — đây là diễn giải sáng tạo hợp lý cho "line" overlay trong ngữ cảnh rút lui.
- `bottom-signature` thanh cam ở dưới cùng không có trong shotlist nhưng là chi tiết trang trí nhỏ, không che nội dung chính.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\doi-dau-xe-tang-checkpoint-charlie-s10

- **2026-09-26T21:22:21.482Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) [--review-only] — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-26T21:23:30.764Z** — `scripts/07b-integration-check.hf.mjs --video=doi-dau-xe-tang-checkpoint-charlie` — Stage 7b integration check FAIL (45 mốc/15 shot, 44.2s):
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 112,
    "infoCount": 0,
    "findings": [
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.310000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"15.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"16.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"22.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"31.460000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"32.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"33.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"33.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"41.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"42.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"44.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"45.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"47.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"49.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"50.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"51.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"53.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"57.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"58.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"63.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"65.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"65.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"70.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"71.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"72.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"73.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"74.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"75.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"76.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"77.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"78.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"79.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"80.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"81.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"82.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"83.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"83.770000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"84.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"84.430000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"84.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"85.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
        "bbox": {
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
        "message": "This HTML composition file has 483 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\caption-track.html",
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
        "code": "duplicate_media_discovery_risk",
        "severity": "warning",
        "message": "Detected 2 matching img entries with the same source/start/duration.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\scene-s01.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Avoid duplicated media nodes that can be discovered twice during compilation."
      },
      {
        "code": "duplicate_media_discovery_risk",
        "severity": "warning",
        "message": "Detected 2 matching img entries with the same source/start/duration.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\scene-s05.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Avoid duplicated media nodes that can be discovered twice during compilation."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"hypothetical-video\"> has data-start=\"0.54\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#hypothetical-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\scene-s08.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"0.54\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"sonar-video\"> has data-start=\"3.75\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#sonar-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\scene-s09.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"3.75\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"withdrawal-video\"> has data-start=\"5.07\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#withdrawal-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\doi-dau-xe-tang-checkpoint-charlie\\compositions\\scene-s10.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"5.07\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      }
    ],
    "filesScanned": 13
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
    "warningCount": 3,
    "infoCount": 16,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 17.989,
        "selector": "div.footer > span:nth-of-type(2)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 754.77,
          "top": 1492,
          "right": 965,
          "bottom": 1520,
          "width": 210.23,
          "height": 28
        },
        "containerSelector": "[data-start=\"17.960000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "01 → NHIỀU LƯỢT",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 754.77,
          "y": 1492,
          "width": 210.23,
          "height": 28
        },
        "firstSeen": 17.989,
        "lastSeen": 18.56,
        "occurrences": 5,
        "heldMs": 570.999999999998
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 23.272,
        "selector": "div.footer > span:nth-of-type(2)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 754.77,
          "top": 1492,
          "right": 965,
          "bottom": 1520,
          "width": 210.23,
          "height": 28
        },
        "containerSelector": "[data-start=\"23.180000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "01 → NHIỀU LƯỢT",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 754.77,
          "y": 1492,
          "width": 210.23,
          "height": 28
        },
        "firstSeen": 23.272,
        "lastSeen": 24.128,
        "occurrences": 7,
        "heldMs": 856.0000000000016
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 23.557,
        "selector": "div.footer > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 115,
          "top": 1490,
          "right": 283.09,
          "bottom": 1518,
          "width": 168.09,
          "height": 28
        },
        "containerSelector": "[data-start=\"23.180000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "ĐÔNG BERLIN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 115,
          "y": 1490,
          "width": 168.09,
          "height": 28
        },
        "firstSeen": 23.557,
        "lastSeen": 24.271,
        "occurrences": 6,
        "heldMs": 714.0000000000022
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 25.008,
        "selector": "div.footer > span:nth-of-type(2)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 754.77,
          "top": 1492,
          "right": 965,
          "bottom": 1520,
          "width": 210.23,
          "height": 28
        },
        "containerSelector": "[data-start=\"24.980000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "01 → NHIỀU LƯỢT",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 754.77,
          "y": 1492,
          "width": 210.23,
          "height": 28
        },
        "firstSeen": 25.008,
        "lastSeen": 25.699,
        "occurrences": 6,
        "heldMs": 691.0000000000025
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 18.703,
        "selector": "div.footer > span:nth-of-type(2)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 754.77,
          "top": 1492,
          "right": 965,
          "bottom": 1520,
          "width": 210.23,
          "height": 28
        },
        "containerSelector": "span.word.active",
        "text": "01 → NHIỀU LƯỢT",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 754.77,
          "y": 1492,
          "width": 210.23,
          "height": 28
        },
        "firstSeen": 18.703,
        "lastSeen": 25.842,
        "occurrences": 4,
        "heldMs": 143.00000000000068
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 23.272,
        "selector": "div.footer > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 115,
          "top": 1490,
          "right": 283.09,
          "bottom": 1518,
          "width": 168.09,
          "height": 28
        },
        "containerSelector": "span.word.active",
        "text": "ĐÔNG BERLIN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 115,
          "y": 1490,
          "width": 168.09,
          "height": 28
        },
        "firstSeen": 23.272,
        "lastSeen": 23.414,
        "occurrences": 2,
        "heldMs": 142.000000000003
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 52.268,
        "selector": "#standoff-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 103.19,
          "top": 253.88,
          "right": 976.81,
          "bottom": 1467.12,
          "width": 873.62,
          "height": 1213.25
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 115,
          "top": 273,
          "right": 965,
          "bottom": 1448,
          "width": 850,
          "height": 1175
        },
        "overflow": {
          "left": 11.81,
          "right": 11.81,
          "top": 19.12,
          "bottom": 19.12
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 103.19,
          "y": 253.88,
          "width": 873.62,
          "height": 1213.25
        },
        "firstSeen": 52.268,
        "lastSeen": 53.588,
        "occurrences": 6,
        "heldMs": 1320.0000000000002
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 1.504,
        "selector": "#west-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 146.32,
          "top": 174,
          "right": 906.32,
          "bottom": 1536,
          "width": 760,
          "height": 1362
        },
        "containerSelector": "div.photo-half.photo-left",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 160,
          "top": 174,
          "right": 540,
          "bottom": 1536,
          "width": 380,
          "height": 1362
        },
        "overflow": {
          "left": 13.68,
          "right": 366.32
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 146.32,
          "y": 174,
          "width": 760,
          "height": 1362
        },
        "firstSeen": 1.504,
        "lastSeen": 1.504,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 1.504,
        "selector": "#east-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 173.68,
          "top": 174,
          "right": 933.68,
          "bottom": 1536,
          "width": 760,
          "height": 1362
        },
        "containerSelector": "div.photo-half.photo-right",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 540,
          "top": 174,
          "right": 920,
          "bottom": 1536,
          "width": 380,
          "height": 1362
        },
        "overflow": {
          "left": 366.32,
          "right": 13.68
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 173.68,
          "y": 174,
          "width": 760,
          "height": 1362
        },
        "firstSeen": 1.504,
        "lastSeen": 1.504,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 3.76,
        "selector": "#west-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 160.92,
          "top": 174,
          "right": 920.92,
          "bottom": 1536,
          "width": 760,
          "height": 1362
        },
        "containerSelector": "div.photo-half.photo-left",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 160,
          "top": 174,
          "right": 540,
          "bottom": 1536,
          "width": 380,
          "height": 1362
        },
        "overflow": {
          "right": 380.92
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 160.92,
          "y": 174,
          "width": 760,
          "height": 1362
        },
        "firstSeen": 3.76,
        "lastSeen": 3.76,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 3.76,
        "selector": "#east-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 159.08,
          "top": 174,
          "right": 919.08,
          "bottom": 1536,
          "width": 760,
          "height": 1362
        },
        "containerSelector": "div.photo-half.photo-right",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 540,
          "top": 174,
          "right": 920,
          "bottom": 1536,
          "width": 380,
          "height": 1362
        },
        "overflow": {
          "left": 380.92
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 159.08,
          "y": 174,
          "width": 760,
          "height": 1362
        },
        "firstSeen": 3.76,
        "lastSeen": 3.76,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 6.016,
        "selector": "#west-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 174.41,
          "top": 174,
          "right": 934.41,
          "bottom": 1536,
          "width": 760,
          "height": 1362
        },
        "containerSelector": "div.photo-half.photo-left",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 160,
          "top": 174,
          "right": 540,
          "bottom": 1536,
          "width": 380,
          "height": 1362
        },
        "overflow": {
          "right": 394.41
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 174.41,
          "y": 174,
          "width": 760,
          "height": 1362
        },
        "firstSeen": 6.016,
        "lastSeen": 6.016,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 6.016,
        "selector": "#east-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 145.59,
          "top": 174,
          "right": 905.59,
          "bottom": 1536,
          "width": 760,
          "height": 1362
        },
        "containerSelector": "div.photo-half.photo-right",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 540,
          "top": 174,
          "right": 920,
          "bottom": 1536,
          "width": 380,
          "height": 1362
        },
        "overflow": {
          "left": 394.41
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 145.59,
          "y": 174,
          "width": 760,
          "height": 1362
        },
        "firstSeen": 6.016,
        "lastSeen": 6.016,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 37.266,
        "selector": "#s05-camera",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 158.63,
          "top": 157.55,
          "right": 921.37,
          "bottom": 1524.45,
          "width": 762.74,
          "height": 1366.9
        },
        "containerSelector": "#s05-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 160,
          "top": 160,
          "right": 920,
          "bottom": 1522,
          "width": 760,
          "height": 1362
        },
        "overflow": {
          "top": 2.45,
          "bottom": 2.45
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 158.63,
          "y": 157.55,
          "width": 762.74,
          "height": 1366.9
        },
        "firstSeen": 37.266,
        "lastSeen": 37.266,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 38.925,
        "selector": "#s05-camera",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 151.64,
          "top": 145.02,
          "right": 928.36,
          "bottom": 1536.98,
          "width": 776.72,
          "height": 1391.96
        },
        "containerSelector": "#s05-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 160,
          "top": 160,
          "right": 920,
          "bottom": 1522,
          "width": 760,
          "height": 1362
        },
        "overflow": {
          "left": 8.36,
          "right": 8.36,
          "top": 14.98,
          "bottom": 14.98
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 151.64,
          "y": 145.02,
          "width": 776.72,
          "height": 1391.96
        },
        "firstSeen": 38.925,
        "lastSeen": 38.925,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 40.584,
        "selector": "#s05-camera",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 144.46,
          "top": 132.15,
          "right": 935.54,
          "bottom": 1549.85,
          "width": 791.08,
          "height": 1417.71
        },
        "containerSelector": "#s05-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 160,
          "top": 160,
          "right": 920,
          "bottom": 1522,
          "width": 760,
          "height": 1362
        },
        "overflow": {
          "left": 15.54,
          "right": 15.54,
          "top": 27.85,
          "bottom": 27.85
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 144.46,
          "y": 132.15,
          "width": 791.08,
          "height": 1417.71
        },
        "firstSeen": 40.584,
        "lastSeen": 40.584,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "panel_out_of_canvas",
        "severity": "info",
        "time": 52.268,
        "selector": "#shard-a",
        "message": "Painted panel extends outside the composition canvas.",
        "rect": {
          "left": -120.48,
          "top": 273,
          "right": 153.52,
          "bottom": 1448,
          "width": 274,
          "height": 1175
        },
        "containerSelector": "#root",
        "text": "",
        "fixHint": "Move the panel inward, or mark intentional off-canvas animation with data-layout-allow-overflow.",
        "containerRect": {
          "left": 0,
          "top": 0,
          "right": 1080,
          "bottom": 1920,
          "width": 1080,
          "height": 1920
        },
        "overflow": {
          "left": 120.48
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -120.48,
          "y": 273,
          "width": 274,
          "height": 1175
        },
        "firstSeen": 52.268,
        "lastSeen": 52.268,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 55.304,
        "selector": "#standoff-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 90.32,
          "top": 228.28,
          "right": 978.32,
          "bottom": 1461.5,
          "width": 888,
          "height": 1233.21
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 115,
          "top": 273,
          "right": 965,
          "bottom": 1448,
          "width": 850,
          "height": 1175
        },
        "overflow": {
          "left": 24.68,
          "right": 13.32,
          "top": 44.72,
          "bottom": 13.5
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 90.32,
          "y": 228.28,
          "width": 888,
          "height": 1233.21
        },
        "firstSeen": 55.304,
        "lastSeen": 55.304,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 57.545,
        "selector": "#standoff-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 70.99,
          "top": 189.85,
          "right": 980.64,
          "bottom": 1453.14,
          "width": 909.65,
          "height": 1263.28
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 115,
          "top": 273,
          "right": 965,
          "bottom": 1448,
          "width": 850,
          "height": 1175
        },
        "overflow": {
          "left": 44.01,
          "right": 15.64,
          "top": 83.15,
          "bottom": 5.14
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 70.99,
          "y": 189.85,
          "width": 909.65,
          "height": 1263.28
        },
        "firstSeen": 57.545,
        "lastSeen": 57.545,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 59.786,
        "selector": "#standoff-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 51.7,
          "top": 151.48,
          "right": 982.92,
          "bottom": 1444.72,
          "width": 931.22,
          "height": 1293.24
        },
        "containerSelector": "div.photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 115,
          "top": 273,
          "right": 965,
          "bottom": 1448,
          "width": 850,
          "height": 1175
        },
        "overflow": {
          "left": 63.3,
          "right": 17.92,
          "top": 121.52
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 51.7,
          "y": 151.48,
          "width": 931.22,
          "height": 1293.24
        },
        "firstSeen": 59.786,
        "lastSeen": 59.786,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 62.03,
        "selector": "div.evidence-note",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 115,
          "top": 1442,
          "right": 723.73,
          "bottom": 1469,
          "width": 608.73,
          "height": 27
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(75) > div:nth-of-type(1)",
        "text": "BẢN ĐỒ MINH HỌA · KHÔNG THỂ HIỆN TỌA ĐỘ THỰC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.22,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": 115,
          "y": 1442,
          "width": 608.73,
          "height": 27
        },
        "firstSeen": 62.03,
        "lastSeen": 62.03,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 63.155,
        "selector": "div.evidence-note",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 115,
          "top": 1442,
          "right": 723.73,
          "bottom": 1469,
          "width": 608.73,
          "height": 27
        },
        "containerSelector": "[data-start=\"62.800000\"] > div:nth-of-type(1)",
        "text": "BẢN ĐỒ MINH HỌA · KHÔNG THỂ HIỆN TỌA ĐỘ THỰC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.22,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": 115,
          "y": 1442,
          "width": 608.73,
          "height": 27
        },
        "firstSeen": 63.155,
        "lastSeen": 63.155,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 64.28,
        "selector": "div.evidence-note",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 115,
          "top": 1442,
          "right": 723.73,
          "bottom": 1469,
          "width": 608.73,
          "height": 27
        },
        "containerSelector": "[data-start=\"63.560000\"] > div:nth-of-type(1)",
        "text": "BẢN ĐỒ MINH HỌA · KHÔNG THỂ HIỆN TỌA ĐỘ THỰC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.22,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": 115,
          "y": 1442,
          "width": 608.73,
          "height": 27
        },
        "firstSeen": 64.28,
        "lastSeen": 64.28,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 85.52,
    "samples": [
      1.504,
      3.76,
      6.016,
      9.456,
      12.36,
      15.264,
      19.152,
      22.08,
      25.008,
      28.8,
      31.56,
      34.32,
      37.266,
      38.925,
      40.584,
      42.776,
      44.405,
      46.034,
      48.128,
      49.64,
      51.152,
      52.268,
      52.43,
      52.592,
      52.922,
      53.255,
      53.588,
      55.304,
      57.545,
      59.786,
      62.03,
      63.155,
      64.28,
      65.72,
      66.755,
      67.79,
      69.494,
      71.015,
      72.536,
      74.704,
      76.435,
      78.166,
      80.56,
      82.42,
      84.28,
      85.52
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 23,
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
    "warningCount": 1,
    "infoCount": 0,
    "findings": [
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 2.86:1; WCAG AA requires 3:1.",
        "text": "lửa",
        "fg": "rgb(255,106,26)",
        "bg": "rgb(80,79,75)",
        "ratio": 2.86,
        "requiredRatio": 3,
        "suggestedColor": "rgb(255,114,38)",
        "large": true,
        "selector": "div > div:nth-of-type(12) > div > div:nth-of-type(81) > div > span:nth-of-type(1)",
        "dataAttributes": {
          "data-from-ms": "65650",
          "data-to-ms": "65850"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 332.9375,
          "y": 1473.2235107421875,
          "width": 77.71875,
          "height": 62
        },
        "time": 65.72
      }
    ],
    "enabled": true,
    "samples": [
      1.504,
      34.32,
      52.43,
      65.72,
      84.28
    ],
    "checked": 29,
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
    "latestVersion": "0.8.78",
    "updateAvailable": true
  }
}


- **2026-09-26T21:29:04.070Z** — `scripts/07-codegen.hf.router.mjs --video=doi-dau-xe-tang-checkpoint-charlie --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-26T21:30:10.593Z** — `scripts/07b-integration-check.hf.mjs --video=doi-dau-xe-tang-checkpoint-charlie` — Stage 7b integration check PASS — 11/11 scene, có audio, có caption-track, hyperframes check ok=true (45 mốc/15 shot, 45.0s).

- **2026-09-26T21:33:53.957Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\doi-dau-xe-tang-checkpoint-charlie-full.mp4, 91762003 bytes (87.5MB), 222.9s render time, quality=looks. Xác minh ffprobe: duration=85.533s (khớp audio thật 85.653s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.6s, browser_probe=0.5s, video_extract=2.9s, audio_process=3.8s, file_server=0.0s, capture_calibration=3.6s, capture_disk=143.7s, encode=47.3s, assemble=8.2s.
