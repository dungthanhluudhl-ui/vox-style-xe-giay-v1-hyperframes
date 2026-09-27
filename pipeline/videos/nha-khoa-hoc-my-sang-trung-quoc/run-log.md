
- **2026-09-26T18:49:36.314Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 603 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\nha-khoa-hoc-my-sang-trung-quoc\transcripts\raw-captions.json

- **2026-09-26T18:51:07.043Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 350 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\nha-khoa-hoc-my-sang-trung-quoc\captions\captions.json

- **2026-09-26T18:53:43.830Z** — `scripts/run-stages-1-6.mjs --video=nha-khoa-hoc-my-sang-trung-quoc` — THẤT BẠI trước Stage 5 — Nhánh media (Stage 02b):   [9router] xong sau 4.2s
- [2026-09-26T18:53:05.955Z] [2-tao-chuyen-dong][bước 16] click — Bấm nút Bắt đầu tạo để gửi prompt tiếng Anh yêu cầu Agent tạo video từ các ảnh có sẵn. (@e198, model: 4170ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 01:53:06)
  [9router] xong sau 5.2s
- [2026-09-26T18:53:11.506Z] [2-tao-chuyen-dong][bước 17] click — Agent chat liên tục báo lỗi hệ thống 'Đã xảy ra lỗi. Hãy thử lại.', bấm nút Bắt đầu phiên mới (@e109) để mở session mới và thử lại yêu cầu. (@e109, model: 5152ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 01:53:11)
  [9router] xong sau 7.4s
- [2026-09-26T18:53:19.296Z] [2-tao-chuyen-dong][bước 18] fill — Điền yêu cầu tạo chuyển động video vào ô chat phiên mới để bắt đầu tạo video. (@e121, model: 7453ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 01:53:19)
  [9router] xong sau 4.5s
- [2026-09-26T18:53:24.071Z] [2-tao-chuyen-dong][bước 19] click — Bấm nút Bắt đầu tạo để gửi yêu cầu tạo chuyển động video vào phiên mới của Agent. (@e204, model: 4475ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 01:53:24)
  [9router] xong sau 4.4s
- [2026-09-26T18:53:28.731Z] [2-tao-chuyen-dong][bước 20] wait — Agent đang xử lý yêu cầu tạo chuyển động (hiển thị ba chấm và nút Dừng), chờ Flow xử lý. (model: 4365ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 01:53:34)
  [9router] xong sau 4.5s
- [2026-09-26T18:53:38.960Z] [2-tao-chuyen-dong][bước 21] fill — Agent tiếp tục báo lỗi với prompt tiếng Việt, thử dùng lệnh tiếng Anh ngắn gọn rõ ràng để yêu cầu Agent tạo chuyển động cho các ảnh. (@e121, model: 4544ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 01:53:39)
  [9router] xong sau 4.5s
- [2026-09-26T18:53:43.808Z] [2-tao-chuyen-dong][bước 22] blocked — Tài khoản hiện tại đã hết credit (hiển thị 0 credit ở góc trên bên phải) khiến Flow liên tục báo lỗi không thể tạo video tiếp. (model: 4536ms)

⚠ AGENT BỊ CHẶN ở giai đoạn "2-tao-chuyen-dong" (account "flow-02"): Tài khoản đã hết credit (0 credit), Flow không thể tạo thêm video.
Có vẻ hết credit/hạn mức — sẽ tự động thử account dự phòng tiếp theo trong scripts/flow-accounts.json (nếu có).
Nếu là lỗi khác, xử lý xong rồi chạy lại lệnh này — session đã lưu trong profile nên không cần đăng nhập lại lần sau.

Log chi tiết: C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\nha-khoa-hoc-my-sang-trung-quoc\media-generate-log.md
Trình duyệt do agent-browser quản lý (session "flow-media-agent-flow-02") vẫn có thể đang mở — dùng "C:\vox-style-xe-giay-v1-hyperframes\node_modules\agent-browser\bin\agent-browser-win32-x64.exe --session flow-media-agent-flow-02 close" để đóng khi xong.

⚠ Lỗi xảy ra SAU KHI project Flow đã tồn tại (giai đoạn "2-tao-chuyen-dong", account "flow-02") — KHÔNG tự động đổi sang account khác vì project chỉ account "flow-02" mới truy cập được. Dừng lại để giữ nguyên ảnh/video đã tạo, tránh tạo lại từ đầu tốn credit.
Chạy lại đúng lệnh này để tiếp tục project đó: --video=nha-khoa-hoc-my-sang-trung-quoc --flow-account=flow-02 --resume-project="https://flow.google.com/project/9d6b3bf9-1b69-4930-ade9-4e3d68f0e503" --retry-animate

- **2026-09-26T19:11:13.677Z** — `scripts/run-stages-1-6.mjs --video=nha-khoa-hoc-my-sang-trung-quoc` — THẤT BẠI trước Stage 5 — Nhánh media (Stage 02b): - [2026-09-26T19:10:38.410Z] [1-tao-anh][bước 17] click — Bấm nút 'Thử lại' để gửi lại yêu cầu tạo ảnh cho Agent. (@e91, model: 3722ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 02:10:38)
  [9router] xong sau 4.7s
- [2026-09-26T19:10:43.494Z] [1-tao-anh][bước 18] click — Bắt đầu phiên chat mới để xoá sạch ngữ cảnh lỗi an toàn trước đó (@e49, model: 4685ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 02:10:43)
  [9router] xong sau 10.1s
- [2026-09-26T19:10:53.795Z] [1-tao-anh][bước 19] fill — Điền yêu cầu tạo 8 ảnh vào ô chat của phiên mới với mô tả an toàn để tránh bộ lọc chính sách. (@e61, model: 10055ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 02:10:54)
  [9router] xong sau 3.8s
- [2026-09-26T19:10:57.901Z] [1-tao-anh][bước 20] click — Bấm nút 'Bắt đầu tạo' (@e108) để gửi yêu cầu tạo 8 ảnh cho Flow Agent. (@e108, model: 3829ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 02:10:58)
  [9router] xong sau 3.7s
- [2026-09-26T19:11:01.865Z] [1-tao-anh][bước 21] wait — Flow Agent đang xử lý tạo ảnh (hiển thị nút Dừng và hiệu ứng đang xử lý), chờ một lúc để hệ thống tạo ảnh. (model: 3745ms)
  [9router] gọi ag/gemini-3.7-flash-medium... (bắt đầu 02:11:07)
  [9router] xong sau 6.5s
- [2026-09-26T19:11:13.653Z] [1-tao-anh][bước 22] blocked — Google Flow liên tục báo 'Đã xảy ra lỗi. Hãy thử lại.' và không tạo được ảnh do lỗi hệ thống hoặc bộ lọc an toàn với nội dung prompt. (model: 6520ms)

⚠ AGENT BỊ CHẶN ở giai đoạn "1-tao-anh" (account "flow-03"): Flow Agent báo lỗi 'Đã xảy ra lỗi. Hãy thử lại.' liên tục khi xử lý prompt, không thể tạo ảnh.
Lý do chưa khớp từ khoá quota/human-needed đã biết — KHÔNG tự động chuyển account để an toàn. Kiểm tra cửa sổ Chrome đang mở và tự xử lý.
Nếu là lỗi khác, xử lý xong rồi chạy lại lệnh này — session đã lưu trong profile nên không cần đăng nhập lại lần sau.

Log chi tiết: C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\nha-khoa-hoc-my-sang-trung-quoc\media-generate-log.md
Trình duyệt do agent-browser quản lý (session "flow-media-agent-flow-03") vẫn có thể đang mở — dùng "C:\vox-style-xe-giay-v1-hyperframes\node_modules\agent-browser\bin\agent-browser-win32-x64.exe --session flow-media-agent-flow-03 close" để đóng khi xong.

Không chuyển sang account dự phòng khác (lý do không đáng fallback) — dừng hẳn tại đây.

⚠ ĐÃ DỪNG SAU 1 LẦN THỬ ACCOUNT:
  - "flow-03": giai đoạn "1-tao-anh" — blocked: Flow Agent báo lỗi 'Đã xảy ra lỗi. Hãy thử lại.' liên tục khi xử lý prompt, không thể tạo ảnh.

Log chi tiết: C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\nha-khoa-hoc-my-sang-trung-quoc\media-generate-log.md

- **2026-09-26T19:17:54.184Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 8 ảnh + 7 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/nha-khoa-hoc-my-sang-trung-quoc/media/{images,videos}/

- **2026-09-26T19:26:39.602Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 15 asset (8 ảnh, 7 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/nha-khoa-hoc-my-sang-trung-quoc/media-analysis/manifest.json

- **2026-09-26T19:27:40.862Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 10 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/nha-khoa-hoc-my-sang-trung-quoc/scene-plan.json + scene-plan.md

- **2026-09-26T19:28:21.602Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 15 shot trên 10 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/nha-khoa-hoc-my-sang-trung-quoc/shotlist.json + shotlist.md

- **2026-09-26T19:30:07.075Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-26T19:30:09.497Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-26T19:30:14.825Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-26T19:30:15.918Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-26T19:30:53.066Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-26T19:31:14.533Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-26T19:31:29.163Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-26T19:31:35.297Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-26T19:31:38.713Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-26T19:32:18.761Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-26T19:32:18.828Z** — `scripts/run-stages-1-6.mjs --video=nha-khoa-hoc-my-sang-trung-quoc` — Stage 1-7 xong — 10 scene (S01,S02,S03,S04,S05,S06,S07,S08,S09,S10), Stage 7 PASS, index.html đã ráp.

- **2026-09-26T19:33:31.756Z** — `scripts/07b-integration-check.hf.mjs --video=nha-khoa-hoc-my-sang-trung-quoc` — Stage 7b integration check PASS — 10/10 scene, có audio, có caption-track, hyperframes check ok=true (45 mốc/15 shot, 45.2s).

- **2026-09-26T19:38:30.526Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\nha-khoa-hoc-my-sang-trung-quoc-full.mp4, 140346369 bytes (133.8MB), 298.2s render time, quality=looks. Xác minh ffprobe: duration=91.167s (khớp audio thật 91.200s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.6s, browser_probe=0.7s, video_extract=6.9s, audio_process=5.6s, file_server=0.0s, capture_calibration=3.8s, capture_disk=169.6s, encode=87.5s, assemble=11.0s.

- **2026-09-26T19:48:27.613Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 11 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/nha-khoa-hoc-my-sang-trung-quoc/scene-plan.json + scene-plan.md

- **2026-09-26T19:49:17.425Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 15 shot trên 11 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/nha-khoa-hoc-my-sang-trung-quoc/shotlist.json + shotlist.md

- **2026-09-26T19:50:42.128Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-26T19:50:52.622Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-26T19:51:00.020Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-26T19:51:02.634Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-26T19:51:40.289Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-26T19:51:42.560Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-26T19:51:45.304Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-26T19:52:28.859Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-26T19:52:41.620Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-26T19:53:04.268Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 3 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-26T19:53:49.257Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 2 lần thử bằng cx/gpt-6-luna (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-26T19:53:49.331Z** — `scripts/run-stages-1-6.mjs --video=nha-khoa-hoc-my-sang-trung-quoc` — Stage 1-7 xong — 11 scene (S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11), Stage 7 PASS, index.html đã ráp.

- **2026-09-26T19:55:03.561Z** — `scripts/07b-integration-check.hf.mjs --video=nha-khoa-hoc-my-sang-trung-quoc` — Stage 7b integration check FAIL (45 mốc/15 shot, 47.5s):
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 123,
    "infoCount": 0,
    "findings": [
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"7.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"16.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"31.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"32.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"37.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"39.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"41.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"44.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"45.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"47.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"49.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"51.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"53.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"57.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"58.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"63.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"68.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"71.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"72.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"73.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"74.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"76.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"76.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"77.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"78.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"79.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"80.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"82.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"82.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"83.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"84.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"85.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"86.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"87.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"87.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"88.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"89.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"90.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
        "bbox": {
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
        "message": "This HTML composition file has 435 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\caption-track.html",
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
        "message": "<section class=\"artwork\" data-start=\"0\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s02.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"punch\" data-start=\"0.72\" data-track-index=\"1\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s02.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"icon-stage\" data-start=\"3.32\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s02.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"question-stage\" data-start=\"6.12\" data-track-index=\"3\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s02.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#s02-artwork\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#s02-artwork",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s02.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#s02-artwork\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "3 tl.fromTo() calls target \".punch-plate\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": ".punch-plate",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s03.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\".punch-plate\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"image-shot\" data-start=\"0\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s04.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"0.64\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s04.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"4.05\" data-track-index=\"3\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s04.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"6.22\" data-track-index=\"4\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s04.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"9.52\" data-track-index=\"5\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s04.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"s04-frozen-funds-video\"> has data-start=\"5.08\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#s04-frozen-funds-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s04.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"5.08\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"s05-video\"> has data-start=\"4.36\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#s05-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s05.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"4.36\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"shot-image\" data-start=\"0\" data-track-index=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"overlay\" data-start=\"1.28\" data-track-index=\"1\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"overlay\" data-start=\"3.78\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"overlay\" data-start=\"6.58\" data-track-index=\"3\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"scientist-video\"> has data-start=\"5.12\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#scientist-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"5.12\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#scientist-image\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#scientist-image",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#scientist-image\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"0\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s07.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"punch-wrap\" data-start=\"1\" data-track-index=\"3\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s07.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"callout-wrap\" data-start=\"3.6\" data-track-index=\"4\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s07.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"callout-wrap\" data-start=\"8.4\" data-track-index=\"5\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s07.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"check-wrap\" data-start=\"10.2\" data-track-index=\"6\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s07.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"headline\" data-start=\"1.42\" data-track-index=\"2\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s08.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section class=\"label\" data-start=\"4.42\" data-track-index=\"3\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s08.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"s08-video\"> has data-start=\"3.68\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#s08-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s08.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"3.68\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#hero-image\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#hero-image",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\nha-khoa-hoc-my-sang-trung-quoc\\compositions\\scene-s10.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#hero-image\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
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
    "errorCount": 5,
    "warningCount": 13,
    "infoCount": 41,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 33.938,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "span.word.active",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 33.938,
        "lastSeen": 35.916,
        "occurrences": 16,
        "heldMs": 1977.9999999999945
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 34.242,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"34.200000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 34.242,
        "lastSeen": 35.307,
        "occurrences": 7,
        "heldMs": 1065.0000000000048
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 34.242,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"34.200000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 34.242,
        "lastSeen": 35.307,
        "occurrences": 7,
        "heldMs": 1065.0000000000048
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 34.242,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"34.200000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 34.242,
        "lastSeen": 35.003,
        "occurrences": 7,
        "heldMs": 761.0000000000027
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 34.546,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"34.200000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 34.546,
        "lastSeen": 35.307,
        "occurrences": 6,
        "heldMs": 761.0000000000027
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 21.696,
        "selector": "div.video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -270,
          "top": -480,
          "right": 1350,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s04 > div:nth-of-type(1)",
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
          "left": 270,
          "right": 270,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -270,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 21.696,
        "lastSeen": 24.744,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 33.072,
        "selector": "#s05-video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -270,
          "top": -480,
          "right": 1350,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
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
          "left": 270,
          "right": 270,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -270,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 33.072,
        "lastSeen": 35.688,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 33.072,
        "selector": "#s05-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -216,
          "top": -384,
          "right": 1296,
          "bottom": 2304,
          "width": 1512,
          "height": 2688
        },
        "containerSelector": "#s05-image-shot",
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
          "left": 216,
          "right": 216,
          "top": 384,
          "bottom": 384
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -216,
          "y": -384,
          "width": 1512,
          "height": 2688
        },
        "firstSeen": 33.072,
        "lastSeen": 35.688,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 33.938,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1469.33,
          "right": 860.66,
          "bottom": 1552.33,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"33.270000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1469.33,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 33.938,
        "lastSeen": 34.09,
        "occurrences": 2,
        "heldMs": 152.00000000000102
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 33.938,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1469.33,
          "right": 860.66,
          "bottom": 1552.33,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"33.270000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1469.33,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 33.938,
        "lastSeen": 34.09,
        "occurrences": 2,
        "heldMs": 152.00000000000102
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 33.938,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1469.33,
          "right": 860.66,
          "bottom": 1552.33,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"33.270000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1469.33,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 33.938,
        "lastSeen": 34.09,
        "occurrences": 2,
        "heldMs": 152.00000000000102
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 35.46,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"35.410000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 35.46,
        "lastSeen": 35.764,
        "occurrences": 4,
        "heldMs": 304.00000000000205
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 35.46,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"35.410000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 35.46,
        "lastSeen": 35.916,
        "occurrences": 5,
        "heldMs": 455.99999999999596
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 35.46,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"35.410000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 35.46,
        "lastSeen": 35.916,
        "occurrences": 3,
        "heldMs": 455.99999999999596
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 35.688,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"35.410000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 35.688,
        "lastSeen": 35.916,
        "occurrences": 3,
        "heldMs": 227.99999999999443
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 45.744,
        "selector": "#video-wrap",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -304,
          "top": -480,
          "right": 1316,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s06 > div:nth-of-type(1)",
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
          "left": 304,
          "right": 236,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": -304,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 45.744,
        "lastSeen": 48.816,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 69.2,
        "selector": "#s08-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -280.8,
          "top": -499.2,
          "right": 1360.8,
          "bottom": 2419.2,
          "width": 1641.6,
          "height": 2918.4
        },
        "containerSelector": "div.visual-wrapper",
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
          "left": 280.8,
          "right": 280.8,
          "top": 499.2,
          "bottom": 499.2
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -280.8,
          "y": -499.2,
          "width": 1641.6,
          "height": 2918.4
        },
        "firstSeen": 69.2,
        "lastSeen": 71.12,
        "occurrences": 3,
        "heldMs": 1920.0000000000018
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 86.392,
        "selector": "#scene-media-motion",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -43.2,
          "top": -76.8,
          "right": 1123.2,
          "bottom": 1996.8,
          "width": 1166.4,
          "height": 2073.6
        },
        "containerSelector": "div.media-window",
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
          "left": 43.2,
          "right": 43.2,
          "top": 76.8,
          "bottom": 76.8
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s11.html",
        "bbox": {
          "x": -43.2,
          "y": -76.8,
          "width": 1166.4,
          "height": 2073.6
        },
        "firstSeen": 86.392,
        "lastSeen": 91.16,
        "occurrences": 4,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 1.016,
        "selector": "#migration-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -284.55,
          "top": -480,
          "right": 1335.45,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "div.video-stage",
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
          "left": 284.55,
          "right": 255.45,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "5.08",
          "data-media-start": "1",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -284.55,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 1.016,
        "lastSeen": 1.016,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 2.54,
        "selector": "#migration-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -270.06,
          "top": -480,
          "right": 1349.94,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "div.video-stage",
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
          "left": 270.06,
          "right": 269.94,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "5.08",
          "data-media-start": "1",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -270.06,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 2.54,
        "lastSeen": 2.54,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 4.064,
        "selector": "#migration-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -255.89,
          "top": -480,
          "right": 1364.11,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "div.video-stage",
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
          "left": 255.89,
          "right": 284.11,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "5.08",
          "data-media-start": "1",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -255.89,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 4.064,
        "lastSeen": 4.064,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 6.776,
        "selector": "#s02-artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -288.08,
          "top": -447.58,
          "right": 1309.26,
          "bottom": 2380.76,
          "width": 1597.34,
          "height": 2828.34
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
          "left": 288.08,
          "right": 229.26,
          "top": 447.58,
          "bottom": 460.76
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -288.08,
          "y": -447.58,
          "width": 1597.34,
          "height": 2828.34
        },
        "firstSeen": 6.776,
        "lastSeen": 6.776,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 9.32,
        "selector": "#s02-artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -323.23,
          "top": -497.12,
          "right": 1337.83,
          "bottom": 2434.54,
          "width": 1661.06,
          "height": 2931.66
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
          "left": 323.23,
          "right": 257.83,
          "top": 497.12,
          "bottom": 514.54
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -323.23,
          "y": -497.12,
          "width": 1661.06,
          "height": 2931.66
        },
        "firstSeen": 9.32,
        "lastSeen": 9.32,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 11.864,
        "selector": "#s02-artwork",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -355.71,
          "top": -547.19,
          "right": 1363.71,
          "bottom": 2484.83,
          "width": 1719.42,
          "height": 3032.01
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
          "left": 355.71,
          "right": 283.71,
          "top": 547.19,
          "bottom": 564.83
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -355.71,
          "y": -547.19,
          "width": 1719.42,
          "height": 3032.01
        },
        "firstSeen": 11.864,
        "lastSeen": 11.864,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 14.984,
        "selector": "#s03-hero",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -220.54,
          "top": -345.55,
          "right": 1300.54,
          "bottom": 2358.58,
          "width": 1521.07,
          "height": 2704.13
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
          "left": 220.54,
          "right": 220.54,
          "top": 345.55,
          "bottom": 438.58
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.12",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -220.54,
          "y": -345.55,
          "width": 1521.07,
          "height": 2704.13
        },
        "firstSeen": 14.984,
        "lastSeen": 14.984,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 17.12,
        "selector": "#s03-hero",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -240.08,
          "top": -392.59,
          "right": 1320.08,
          "bottom": 2381.04,
          "width": 1560.17,
          "height": 2773.63
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
          "left": 240.08,
          "right": 240.08,
          "top": 392.59,
          "bottom": 461.04
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.12",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -240.08,
          "y": -392.59,
          "width": 1560.17,
          "height": 2773.63
        },
        "firstSeen": 17.12,
        "lastSeen": 17.12,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 19.256,
        "selector": "#s03-hero",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -259.79,
          "top": -440.03,
          "right": 1339.79,
          "bottom": 2403.68,
          "width": 1599.59,
          "height": 2843.71
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
          "left": 259.79,
          "right": 259.79,
          "top": 440.03,
          "bottom": 483.68
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "7.12",
          "data-track-index": "0",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -259.79,
          "y": -440.03,
          "width": 1599.59,
          "height": 2843.71
        },
        "firstSeen": 19.256,
        "lastSeen": 19.256,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 21.696,
        "selector": "#s04-fee-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -136.89,
          "top": -245.26,
          "right": 1216.89,
          "bottom": 2180.26,
          "width": 1353.78,
          "height": 2425.52
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
          "left": 136.89,
          "right": 136.89,
          "top": 245.26,
          "bottom": 260.26
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": -136.89,
          "y": -245.26,
          "width": 1353.78,
          "height": 2425.52
        },
        "firstSeen": 21.696,
        "lastSeen": 21.696,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 23.22,
        "selector": "#s04-fee-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -196.67,
          "top": -352.36,
          "right": 1276.67,
          "bottom": 2287.36,
          "width": 1473.34,
          "height": 2639.73
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
          "left": 196.67,
          "right": 196.67,
          "top": 352.36,
          "bottom": 367.36
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": -196.67,
          "y": -352.36,
          "width": 1473.34,
          "height": 2639.73
        },
        "firstSeen": 23.22,
        "lastSeen": 23.22,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 24.744,
        "selector": "#s04-fee-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -214.76,
          "top": -384.77,
          "right": 1294.76,
          "bottom": 2319.77,
          "width": 1509.52,
          "height": 2704.55
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
          "left": 214.76,
          "right": 214.76,
          "top": 384.77,
          "bottom": 399.77
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": -214.76,
          "y": -384.77,
          "width": 1509.52,
          "height": 2704.55
        },
        "firstSeen": 24.744,
        "lastSeen": 24.744,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 27.048,
        "selector": "div.video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -258.93,
          "top": -460.32,
          "right": 1338.93,
          "bottom": 2380.32,
          "width": 1597.86,
          "height": 2840.64
        },
        "containerSelector": "#slot-scene-s04 > div:nth-of-type(1)",
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
          "left": 258.93,
          "right": 258.93,
          "top": 460.32,
          "bottom": 460.32
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -258.93,
          "y": -460.32,
          "width": 1597.86,
          "height": 2840.64
        },
        "firstSeen": 27.048,
        "lastSeen": 27.048,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 28.98,
        "selector": "div.video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -210.98,
          "top": -375.07,
          "right": 1290.98,
          "bottom": 2295.07,
          "width": 1501.96,
          "height": 2670.14
        },
        "containerSelector": "#slot-scene-s04 > div:nth-of-type(1)",
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
          "left": 210.98,
          "right": 210.98,
          "top": 375.07,
          "bottom": 375.07
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -210.98,
          "y": -375.07,
          "width": 1501.96,
          "height": 2670.14
        },
        "firstSeen": 28.98,
        "lastSeen": 28.98,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 30.912,
        "selector": "div.video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -162.76,
          "top": -289.34,
          "right": 1242.76,
          "bottom": 2209.34,
          "width": 1405.51,
          "height": 2498.69
        },
        "containerSelector": "#slot-scene-s04 > div:nth-of-type(1)",
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
          "left": 162.76,
          "right": 162.76,
          "top": 289.34,
          "bottom": 289.34
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -162.76,
          "y": -289.34,
          "width": 1405.51,
          "height": 2498.69
        },
        "firstSeen": 30.912,
        "lastSeen": 30.912,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 34.38,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"34.200000\"] > div:nth-of-type(1)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.3,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 34.38,
        "lastSeen": 34.38,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 35.688,
        "selector": "div.headline-plate > h1:nth-of-type(1)",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 133.33,
          "top": 1433.05,
          "right": 860.66,
          "bottom": 1516.05,
          "width": 727.33,
          "height": 83
        },
        "containerSelector": "[data-start=\"35.410000\"] > div:nth-of-type(1)",
        "text": "HARVARD BỊ CẮT PHÍ",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.3,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 133.33,
          "y": 1433.05,
          "width": 727.33,
          "height": 83
        },
        "firstSeen": 35.688,
        "lastSeen": 35.688,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 38.192,
        "selector": "#s05-video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -274,
          "top": -487.1,
          "right": 1354,
          "bottom": 2407.1,
          "width": 1627.99,
          "height": 2894.21
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
          "left": 274,
          "right": 274,
          "top": 487.1,
          "bottom": 487.1
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -274,
          "y": -487.1,
          "width": 1627.99,
          "height": 2894.21
        },
        "firstSeen": 38.192,
        "lastSeen": 38.192,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 40.64,
        "selector": "#s05-video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -291.55,
          "top": -518.3,
          "right": 1371.55,
          "bottom": 2438.3,
          "width": 1663.09,
          "height": 2956.61
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
          "left": 291.55,
          "right": 291.55,
          "top": 518.3,
          "bottom": 518.3
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -291.55,
          "y": -518.3,
          "width": 1663.09,
          "height": 2956.61
        },
        "firstSeen": 40.64,
        "lastSeen": 40.64,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 43.088,
        "selector": "#s05-video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -308.99,
          "top": -549.31,
          "right": 1388.99,
          "bottom": 2469.31,
          "width": 1697.98,
          "height": 3018.62
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
          "left": 308.99,
          "right": 308.99,
          "top": 549.31,
          "bottom": 549.31
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -308.99,
          "y": -549.31,
          "width": 1697.98,
          "height": 3018.62
        },
        "firstSeen": 43.088,
        "lastSeen": 43.088,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 45.744,
        "selector": "#scientist-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -246.06,
          "top": -412.97,
          "right": 1326.06,
          "bottom": 2319.54,
          "width": 1572.13,
          "height": 2732.52
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
          "left": 246.06,
          "right": 246.06,
          "top": 412.97,
          "bottom": 399.54
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": -246.06,
          "y": -412.97,
          "width": 1572.13,
          "height": 2732.52
        },
        "firstSeen": 45.744,
        "lastSeen": 45.744,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 47.28,
        "selector": "#scientist-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -254.68,
          "top": -434.97,
          "right": 1334.68,
          "bottom": 2354.97,
          "width": 1589.36,
          "height": 2789.95
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
          "left": 254.68,
          "right": 254.68,
          "top": 434.97,
          "bottom": 434.97
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": -254.68,
          "y": -434.97,
          "width": 1589.36,
          "height": 2789.95
        },
        "firstSeen": 47.28,
        "lastSeen": 47.28,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 48.816,
        "selector": "#scientist-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -262.72,
          "top": -470.29,
          "right": 1342.72,
          "bottom": 2376.72,
          "width": 1605.45,
          "height": 2847
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
          "left": 262.72,
          "right": 262.72,
          "top": 470.29,
          "bottom": 456.72
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": -262.72,
          "y": -470.29,
          "width": 1605.45,
          "height": 2847
        },
        "firstSeen": 48.816,
        "lastSeen": 48.816,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 50.592,
        "selector": "#video-wrap",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -300.96,
          "top": -480,
          "right": 1319.04,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s06 > div:nth-of-type(1)",
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
          "left": 300.96,
          "right": 239.04,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": -300.96,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 50.592,
        "lastSeen": 50.592,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 51.72,
        "selector": "#video-wrap",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -287.28,
          "top": -480,
          "right": 1332.72,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s06 > div:nth-of-type(1)",
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
          "left": 287.28,
          "right": 252.72,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": -287.28,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 51.72,
        "lastSeen": 51.72,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 52.848,
        "selector": "#video-wrap",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -273.37,
          "top": -480,
          "right": 1346.63,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s06 > div:nth-of-type(1)",
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
          "left": 273.37,
          "right": 266.63,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": -273.37,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 52.848,
        "lastSeen": 52.848,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 55.856,
        "selector": "#video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -15.61,
          "top": -25.73,
          "right": 1095.61,
          "bottom": 1945.73,
          "width": 1111.21,
          "height": 1971.46
        },
        "containerSelector": "#slot-scene-s07 > div:nth-of-type(1)",
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
          "left": 15.61,
          "right": 15.61,
          "top": 25.73,
          "bottom": 25.73
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -15.61,
          "y": -25.73,
          "width": 1111.21,
          "height": 1971.46
        },
        "firstSeen": 55.856,
        "lastSeen": 55.856,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 59.24,
        "selector": "#video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -123.28,
          "top": -218.02,
          "right": 1203.28,
          "bottom": 2138.02,
          "width": 1326.56,
          "height": 2356.03
        },
        "containerSelector": "#slot-scene-s07 > div:nth-of-type(1)",
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
          "left": 123.28,
          "right": 123.28,
          "top": 218.02,
          "bottom": 218.02
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -123.28,
          "y": -218.02,
          "width": 1326.56,
          "height": 2356.03
        },
        "firstSeen": 59.24,
        "lastSeen": 59.24,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 62.624,
        "selector": "#video-stage",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -240.84,
          "top": -427.97,
          "right": 1320.84,
          "bottom": 2347.97,
          "width": 1561.68,
          "height": 2775.94
        },
        "containerSelector": "#slot-scene-s07 > div:nth-of-type(1)",
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
          "left": 240.84,
          "right": 240.84,
          "top": 427.97,
          "bottom": 427.97
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -240.84,
          "y": -427.97,
          "width": 1561.68,
          "height": 2775.94
        },
        "firstSeen": 62.624,
        "lastSeen": 62.624,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 65.616,
        "selector": "#s08-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -216.27,
          "top": -384.48,
          "right": 1296.27,
          "bottom": 2304.48,
          "width": 1512.54,
          "height": 2688.96
        },
        "containerSelector": "div.visual-wrapper",
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
          "left": 216.27,
          "right": 216.27,
          "top": 384.48,
          "bottom": 384.48
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -216.27,
          "y": -384.48,
          "width": 1512.54,
          "height": 2688.96
        },
        "firstSeen": 65.616,
        "lastSeen": 65.616,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 66.72,
        "selector": "#s08-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -232.96,
          "top": -414.14,
          "right": 1312.96,
          "bottom": 2334.14,
          "width": 1545.91,
          "height": 2748.29
        },
        "containerSelector": "div.visual-wrapper",
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
          "left": 232.96,
          "right": 232.96,
          "top": 414.14,
          "bottom": 414.14
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -232.96,
          "y": -414.14,
          "width": 1545.91,
          "height": 2748.29
        },
        "firstSeen": 66.72,
        "lastSeen": 66.72,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 67.824,
        "selector": "#s08-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -270.7,
          "top": -481.25,
          "right": 1350.7,
          "bottom": 2401.25,
          "width": 1621.4,
          "height": 2882.5
        },
        "containerSelector": "div.visual-wrapper",
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
          "left": 270.7,
          "right": 270.7,
          "top": 481.25,
          "bottom": 481.25
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -270.7,
          "y": -481.25,
          "width": 1621.4,
          "height": 2882.5
        },
        "firstSeen": 67.824,
        "lastSeen": 67.824,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 69.2,
        "selector": "#s08-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -294.84,
          "top": -480,
          "right": 1325.16,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s08 > div:nth-of-type(1)",
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
          "left": 294.84,
          "right": 245.16,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {
          "data-start": "3.68",
          "data-duration": "3.2",
          "data-media-start": "2",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -294.84,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 69.2,
        "lastSeen": 69.2,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 70.16,
        "selector": "#s08-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -273.71,
          "top": -480,
          "right": 1346.29,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s08 > div:nth-of-type(1)",
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
          "left": 273.71,
          "right": 266.29,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {
          "data-start": "3.68",
          "data-duration": "3.2",
          "data-media-start": "2",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -273.71,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 70.16,
        "lastSeen": 70.16,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 71.12,
        "selector": "#s08-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -251.47,
          "top": -480,
          "right": 1368.53,
          "bottom": 2400,
          "width": 1620,
          "height": 2880
        },
        "containerSelector": "#slot-scene-s08 > div:nth-of-type(1)",
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
          "left": 251.47,
          "right": 288.53,
          "top": 480,
          "bottom": 480
        },
        "dataAttributes": {
          "data-start": "3.68",
          "data-duration": "3.2",
          "data-media-start": "2",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": -251.47,
          "y": -480,
          "width": 1620,
          "height": 2880
        },
        "firstSeen": 71.12,
        "lastSeen": 71.12,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 73.144,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -202.62,
          "top": -403.2,
          "right": 1330.98,
          "bottom": 2323.2,
          "width": 1533.6,
          "height": 2726.4
        },
        "containerSelector": "#slot-scene-s09 > div:nth-of-type(1)",
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
          "left": 202.62,
          "right": 250.98,
          "top": 403.2,
          "bottom": 403.2
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -202.62,
          "y": -403.2,
          "width": 1533.6,
          "height": 2726.4
        },
        "firstSeen": 73.144,
        "lastSeen": 73.144,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 75.22,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -194.07,
          "top": -403.2,
          "right": 1339.53,
          "bottom": 2323.2,
          "width": 1533.6,
          "height": 2726.4
        },
        "containerSelector": "#slot-scene-s09 > div:nth-of-type(1)",
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
          "left": 194.07,
          "right": 259.53,
          "top": 403.2,
          "bottom": 403.2
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -194.07,
          "y": -403.2,
          "width": 1533.6,
          "height": 2726.4
        },
        "firstSeen": 75.22,
        "lastSeen": 75.22,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 77.296,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -181.84,
          "top": -403.2,
          "right": 1351.76,
          "bottom": 2323.2,
          "width": 1533.6,
          "height": 2726.4
        },
        "containerSelector": "#slot-scene-s09 > div:nth-of-type(1)",
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
          "left": 181.84,
          "right": 271.76,
          "top": 403.2,
          "bottom": 403.2
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -181.84,
          "y": -403.2,
          "width": 1533.6,
          "height": 2726.4
        },
        "firstSeen": 77.296,
        "lastSeen": 77.296,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 79.984,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -217.94,
          "top": -385.68,
          "right": 1297.94,
          "bottom": 2305.68,
          "width": 1515.88,
          "height": 2691.36
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
          "left": 217.94,
          "right": 217.94,
          "top": 385.68,
          "bottom": 385.68
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -217.94,
          "y": -385.68,
          "width": 1515.88,
          "height": 2691.36
        },
        "firstSeen": 79.984,
        "lastSeen": 79.984,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 81.94,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -279.25,
          "top": -438.57,
          "right": 1359.25,
          "bottom": 2358.57,
          "width": 1638.49,
          "height": 2797.13
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
          "left": 279.25,
          "right": 279.25,
          "top": 438.57,
          "bottom": 438.57
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -279.25,
          "y": -438.57,
          "width": 1638.49,
          "height": 2797.13
        },
        "firstSeen": 81.94,
        "lastSeen": 81.94,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 83.896,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -216.16,
          "top": -384.16,
          "right": 1296.16,
          "bottom": 2304.16,
          "width": 1512.32,
          "height": 2688.31
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
          "left": 216.16,
          "right": 216.16,
          "top": 384.16,
          "bottom": 384.16
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -216.16,
          "y": -384.16,
          "width": 1512.32,
          "height": 2688.31
        },
        "firstSeen": 83.896,
        "lastSeen": 83.896,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 91.16,
    "samples": [
      1.016,
      2.54,
      4.064,
      6.776,
      9.32,
      11.864,
      14.984,
      17.12,
      19.256,
      21.696,
      23.22,
      24.744,
      27.048,
      28.98,
      30.912,
      33.072,
      34.38,
      35.688,
      38.192,
      40.64,
      43.088,
      45.744,
      47.28,
      48.816,
      50.592,
      51.72,
      52.848,
      55.856,
      59.24,
      62.624,
      65.616,
      66.72,
      67.824,
      69.2,
      70.16,
      71.12,
      73.144,
      75.22,
      77.296,
      79.984,
      81.94,
      83.896,
      86.392,
      88.18,
      89.968,
      91.16
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 59,
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
    "warningCount": 3,
    "infoCount": 0,
    "findings": [
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.57:1; WCAG AA requires 3:1.",
        "text": "100.000",
        "fg": "rgb(255,106,26)",
        "bg": "rgb(203,190,169)",
        "ratio": 1.57,
        "requiredRatio": 3,
        "suggestedColor": "rgb(176,73,18)",
        "large": true,
        "selector": "div > div:nth-of-type(12) > div > div:nth-of-type(27) > div > span:nth-of-type(1)",
        "dataAttributes": {
          "data-from-ms": "24730",
          "data-to-ms": "25440"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 354.625,
          "y": 1482.2003173828125,
          "width": 216.046875,
          "height": 62
        },
        "time": 24.744
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.6:1; WCAG AA requires 3:1.",
        "text": "đô",
        "fg": "rgb(247,244,236)",
        "bg": "rgb(183,198,200)",
        "ratio": 1.6,
        "requiredRatio": 3,
        "suggestedColor": "rgb(108,107,104)",
        "large": true,
        "selector": "div > div:nth-of-type(12) > div > div:nth-of-type(27) > div > span:nth-of-type(2)",
        "dataAttributes": {
          "data-from-ms": "25440",
          "data-to-ms": "25620"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 570.671875,
          "y": 1482.2003173828125,
          "width": 77.96875,
          "height": 62
        },
        "time": 24.744
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 2.83:1; WCAG AA requires 3:1.",
        "text": "la.",
        "fg": "rgb(247,244,236)",
        "bg": "rgb(99,155,164)",
        "ratio": 2.83,
        "requiredRatio": 3,
        "suggestedColor": "rgb(71,70,68)",
        "large": true,
        "selector": "div > div:nth-of-type(12) > div > div:nth-of-type(27) > div > span:nth-of-type(3)",
        "dataAttributes": {
          "data-from-ms": "25620",
          "data-to-ms": "25760"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 648.640625,
          "y": 1482.2003173828125,
          "width": 76.734375,
          "height": 62
        },
        "time": 24.744
      }
    ],
    "enabled": true,
    "samples": [
      1.016,
      24.744,
      47.28,
      69.2,
      89.968
    ],
    "checked": 24,
    "passed": 21
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


- **2026-09-26T19:57:07.653Z** — `scripts/07b-integration-check.hf.mjs --video=nha-khoa-hoc-my-sang-trung-quoc` — Stage 7b integration check PASS — 11/11 scene, có audio, có caption-track, hyperframes check ok=true (45 mốc/15 shot, 46.3s).

- **2026-09-26T20:02:36.771Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\nha-khoa-hoc-my-sang-trung-quoc-full.mp4, 130156989 bytes (124.1MB), 328.5s render time, quality=looks. Xác minh ffprobe: duration=91.167s (khớp audio thật 91.200s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.8s, browser_probe=0.7s, video_extract=6.8s, audio_process=5.6s, file_server=0.0s, capture_calibration=4.2s, capture_disk=186.7s, encode=99.1s, assemble=12.1s.

- **2026-09-26T20:09:21.333Z** — `scripts/07-codegen.hf.router.mjs --video=nha-khoa-hoc-my-sang-trung-quoc --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- `#crisis-video-wrapper` là wrapper KHÔNG có `data-start` nhưng `<video id="crisis-video">` bên trong có `data-start="4.36"` — cấu trúc này hợp lệ về lint. Tuy nhiên `#crisis-video-wrapper` có `position: absolute; inset: 0` được set qua CSS inline (`position: absolute; inset: 0; z-index: 2`) nhưng KHÔNG có `data-start`, nên nó hiển thị NGAY từ t=0 (opacity=0 ban đầu do GSAP fromTo, nhưng trước khi GSAP seek, phần tử này vẫn tồn tại trong DOM và có thể che `#photo-shot`). Vấn đề thực sự: `#crisis-video-wrapper` có `opacity: 0` chỉ do GSAP set lúc seek — nếu timeline chưa seek (t=0 trước khi tween chạy), wrapper này opacity mặc định = 1 (CSS không set opacity:0), che toàn bộ `#photo-shot` bên dưới. Phải set `opacity: 0` trong CSS cho `#crisis-video-wrapper` để đảm bảo trạng thái t=0 đúng.
- Shot S05-1: `atMs=33850`, scene `startMs=32200` → overlay xuất hiện tại `(33850-32200)/1000 = 1.65s`, `holdMs=2200` → `data-duration="2.2"` — khớp. Nhưng icon "fall" trong shotlist là mũi tên rơi xuống, code dùng SVG path vẽ đường đi lên (`M14 18 L32 36 L44 29 L65 57` + mũi tên phải) — icon không khớp ngữ nghĩa "fall" (mũi tên lao dốc xuống). Đây là sai nội dung icon được giao (icon "fall" phải là mũi tên hướng xuống).
- `#crisis-video-wrapper` có `data-layout-allow-overflow` đặt trực tiếp trên wrapper này — wrapper này bao phủ toàn bộ màn hình và tồn tại suốt composition, khiến audit layout bị tắt cho mọi phần tử con bên trong (bao gồm `#crisis-video`) trong toàn bộ thời gian, không phải chỉ cho trường hợp overflow cố ý cụ thể.

ADVISORY:
- CSS định nghĩa các class `.hf-text-ink`, `.hf-text-light`, v.v. hai lần (lặp lại trong cùng `<style>`) — thừa, nên xóa bản trùng.
- Shot S05-2 `videoHoldNote` yêu cầu `data-duration` của `<video>` = 8.16s — code đặt đúng `data-duration="8.16"`, tốt.
- Overlay timing S05-2: "SIẾT HỌC VIỆN" `atMs=37800`, scene `startMs=32200` → `5.6s`, `holdMs=2400` → duration 2.4s — khớp code. "CHẶN CỬA DU HỌC" `atMs=40600` → `8.4s`, holdMs=2200 → 2.2s — khớp. "CẮT TRỢ CẤP" `atMs=43200` → `11.0s`, holdMs=1400 → 1.4s — khớp. Tốt.
- `#crisis-video-wrapper` scale 1.5x zoom-in được thực hiện bằng GSAP tween trên wrapper (không có `data-start`) — hợp lệ theo videoHoldNote, không vi phạm.
- Các overlay dùng `padding-top` cố định (242px, 270px, 420px, 315px) để định vị — nếu text dài hơn dự kiến có thể bị lệch; cân nhắc dùng flex/grid với `align-items` để linh hoạt hơn.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\nha-khoa-hoc-my-sang-trung-quoc-s05
