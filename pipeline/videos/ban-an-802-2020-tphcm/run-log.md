
- **2026-09-30T14:04:19.191Z** — `scripts/02c-pdf-source.local.mjs` — Xử lý 1 PDF (4 trang): 3 ảnh trích dẫn doc-NN → media/documents/; đối chiếu script: khớp 10, gần khớp 0, không thấy 0 (xem case-source/crosscheck.md)

- **2026-09-30T14:07:27.455Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 2304 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ban-an-802-2020-tphcm\transcripts\raw-captions.json

- **2026-09-30T14:09:38.639Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 12 ảnh + 0 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/ban-an-802-2020-tphcm/media/{images,videos}/

- **2026-09-30T14:10:04.266Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 15 asset (12 ảnh, 0 video, 3 ảnh trích dẫn PDF doc-NN (không qua vision)) bằng ag/gemini-3.7-flash-medium, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ban-an-802-2020-tphcm/media-analysis/manifest.json

- **2026-09-30T14:10:27.702Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 1417 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\ban-an-802-2020-tphcm\captions\captions.json

- **2026-09-30T14:11:46.508Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 42 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-802-2020-tphcm/scene-plan.json + scene-plan.md

- **2026-09-30T14:13:16.843Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 44 shot trên 42 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-802-2020-tphcm/shotlist.json + shotlist.md

- **2026-09-30T14:13:16.870Z** — `scripts/run-stages-1-6.mjs --video=ban-an-802-2020-tphcm` — Stage 1-6 xong (42 scene: S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19,S20,S21,S22,S23,S24,S25,S26,S27,S28,S29,S30,S31,S32,S33,S34,S35,S36,S37,S38,S39,S40,S41,S42) — bỏ qua Stage 7 (--skip-stage7).

- **2026-09-30T14:15:11.825Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-30T14:15:16.708Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-30T14:15:35.106Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-30T14:15:37.732Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-30T14:15:45.737Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-30T14:15:49.923Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-30T14:15:56.829Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-30T14:16:01.218Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S20` — Codegen HyperFrames scene [S20] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s20.html.

- **2026-09-30T14:16:39.766Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-30T14:16:42.595Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S18` — Codegen HyperFrames scene [S18] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s18.html.

- **2026-09-30T14:16:48.035Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-30T14:16:54.117Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S17` — Codegen HyperFrames scene [S17] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s17.html.

- **2026-09-30T14:16:55.307Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S21` — Codegen HyperFrames scene [S21] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s21.html.

- **2026-09-30T14:17:00.110Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S23` — Codegen HyperFrames scene [S23] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s23.html.

- **2026-09-30T14:17:03.412Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S22` — Codegen HyperFrames scene [S22] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s22.html.

- **2026-09-30T14:17:14.799Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-30T14:17:36.719Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S19` — Codegen HyperFrames scene [S19] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s19.html.

- **2026-09-30T14:17:40.879Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S24` — Codegen HyperFrames scene [S24] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s24.html.

- **2026-09-30T14:17:47.044Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S27` — Codegen HyperFrames scene [S27] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s27.html.

- **2026-09-30T14:17:48.217Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-30T14:17:50.347Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-30T14:17:58.120Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S28` — Codegen HyperFrames scene [S28] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s28.html.

- **2026-09-30T14:17:59.908Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-30T14:18:08.829Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S31` — Codegen HyperFrames scene [S31] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s31.html.

- **2026-09-30T14:18:25.899Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-30T14:18:44.937Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S26` — Codegen HyperFrames scene [S26] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s26.html.

- **2026-09-30T14:18:47.762Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S36` — Codegen HyperFrames scene [S36] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s36.html.

- **2026-09-30T14:18:56.026Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-30T14:19:00.345Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S06` — Codegen HyperFrames scene [S06] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- Overlay "KẾT HÔN 2010" (atMs 40750 = 0.77s scene-local) và "LY HÔN 03/2019" (atMs 45490 = 5.51s scene-local) và icon person (atMs 48540 = 8.56s scene-local) được đặt trong `#scene-clip` có `data-start="0" data-duration="10.14"` nhưng KHÔNG có `data-start`/`data-duration` riêng trên từng overlay element — các overlay này hiển thị suốt toàn bộ shot thay vì chỉ trong khoảng `holdMs` theo shotlist; visibility hoàn toàn do GSAP opacity kiểm soát nhưng không có tween fade-out, nên chúng giữ nguyên đến hết scene thay vì tắt sau holdMs (2400ms / 1500ms).
- `<video>` không có trong code nhưng asset `img-10` là ảnh tĩnh — không phải lỗi chặn về video; tuy nhiên `#card-divorce` (overlay "LY HÔN 03/2019") được đặt bên trong `#scene-clip` có `data-start` và bản thân `#card-divorce` không có `data-start` riêng, đồng thời không có tween ẩn nó sau holdMs 2400ms — overlay này hiển thị từ 5.51s đến hết 10.14s thay vì chỉ 2.4s; tương tự `#card-marriage` hiển thị từ 0.77s đến hết scene thay vì tắt sau 2400ms, và `#card-person` hiển thị từ 8.56s đến hết thay vì tắt sau 1500ms — đây là sai nội dung/timing so với shotlist (holdMs bị bỏ qua hoàn toàn).
ADVISORY:
- `window.__timelines = window.__timelines || {}` trước khi gán là không cần thiết (runtime tạo registry trước scripts chạy) nhưng không gây lỗi.
- Tear SVG vẽ dần là sáng tạo thêm ngoài shotlist, hợp tinh thần nhưng cần đảm bảo không che chữ overlay trong caption zone.
- Camera zoom-in trên `#photo-img` (scale 1.0→1.04, y 0→-25) trong 10.14s với `sine.inOut` phù hợp mô tả shotlist.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-802-2020-tphcm-s06

- **2026-09-30T14:19:28.277Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S25` — Codegen HyperFrames scene [S25] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s25.html.

- **2026-09-30T14:19:37.171Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S38` — Codegen HyperFrames scene [S38] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s38.html.

- **2026-09-30T14:19:42.704Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S34` — Codegen HyperFrames scene [S34] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s34.html.

- **2026-09-30T14:19:45.123Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S32` — Codegen HyperFrames scene [S32] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s32.html.

- **2026-09-30T14:19:47.887Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S35` — Codegen HyperFrames scene [S35] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s35.html.

- **2026-09-30T14:20:01.256Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S42` — Codegen HyperFrames scene [S42] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s42.html.

- **2026-09-30T14:20:27.795Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S30` — Codegen HyperFrames scene [S30] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s30.html.

- **2026-09-30T14:20:28.196Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S37` — Codegen HyperFrames scene [S37] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s37.html.

- **2026-09-30T14:20:30.745Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S29` — Codegen HyperFrames scene [S29] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s29.html.

- **2026-09-30T14:21:05.230Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S33` — Codegen HyperFrames scene [S33] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s33.html.

- **2026-09-30T14:21:36.339Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S39` — Codegen HyperFrames scene [S39] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s39.html.

- **2026-09-30T14:22:09.243Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S40` — Codegen HyperFrames scene [S40] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

BLOCKING:
- Trạm 2, 3, 4 hiển thị nội dung "ĐIỂM QUAY ĐẦU 02/03/04" tự bịa — shotlist chỉ cung cấp 3 tên cụ thể: "LÚC CHUẨN BỊ" (trạm 1), "LÚC NGỒI CHỜ" (trạm 5), "KHI VÀO PHÒNG" (trạm 6); các trạm còn lại không có tên trong overlays/notes, code không được tự chế tên cụ thể mà phải dùng placeholder trung tính hoặc chỉ đánh số.

ADVISORY:
- `gsap.set(...)` gọi ngoài timeline (trước khi tl được tạo và đăng ký) có thể gây desync khi seek về t=0 trong sub-composition; nên dùng `tl.set(...)` hoặc `tl.fromTo(...)` với fromVars tường minh thay thế.
- `window.__timelines = window.__timelines || {}` không cần thiết (runtime tạo registry trước script), nhưng không gây lỗi.
- `#walker-marker` được đặt là con trực tiếp của `.clip` (data-start="0") nhưng không có data-start riêng — đây là hợp lệ vì nó không phải timed element, chỉ là phần tử con bình thường.
- Thời điểm animation các trạm lệch so với atMs trong shotlist (vd overlay "LÚC NGỒI CHỜ" atMs 328800 ≈ 6.22s nhưng card-5 xuất hiện ở 5.8s) — advisory nhẹ, không chặn.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-802-2020-tphcm-s40

- **2026-09-30T14:22:44.835Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S41` — Codegen HyperFrames scene [S41] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s41.html.

- **2026-09-30T14:24:55.729Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S40 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-802-s40.txt` — Codegen HyperFrames scene [S40] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s40.html.

- **2026-09-30T14:25:25.045Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-802-2020-tphcm --scenes=S06 --issue-file=C:/Users/DTL/AppData/Local/Temp/claude/c--vox-style-xe-giay-v1-hyperframes/0e8a5cbe-9339-444d-a0ec-495161cc1320/scratchpad/issue-802-s06.txt` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-30T14:27:23.122Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-802-2020-tphcm` — Stage 7b integration check PASS — 42/42 scene, có audio, có caption-track, hyperframes check ok=true (132 mốc/44 shot, 101.5s).

- **2026-09-30T14:39:42.548Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\ban-an-802-2020-tphcm-full.mp4, 134865810 bytes (128.6MB), 739.0s render time, quality=looks. Xác minh ffprobe: duration=346.967s (khớp audio thật 346.950s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=10.0s, browser_probe=1.1s, video_extract=0.0s, audio_process=18.8s, file_server=0.0s, capture_calibration=5.8s, capture_disk=510.9s, encode=138.7s, assemble=40.3s.
