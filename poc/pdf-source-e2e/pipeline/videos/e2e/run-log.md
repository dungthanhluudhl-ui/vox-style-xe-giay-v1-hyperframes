
- **2026-09-30T09:55:37.070Z** — `scripts/02c-pdf-source.local.mjs` — Xử lý 1 PDF (23 trang): 4 ảnh trích dẫn doc-NN → media/documents/; đối chiếu script: khớp 4, gần khớp 2, không thấy 0 (xem case-source/crosscheck.md)

- **2026-09-30T09:55:57.895Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 236 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\pipeline\videos\e2e\transcripts\raw-captions.json

- **2026-09-30T09:56:26.790Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 133 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\public\videos\e2e\captions\captions.json

- **2026-09-30T09:59:59.650Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 3 ảnh + 0 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/e2e/media/{images,videos}/

- **2026-09-30T10:00:15.233Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 7 asset (3 ảnh, 0 video, 4 ảnh trích dẫn PDF doc-NN (không qua vision)) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/e2e/media-analysis/manifest.json

- **2026-09-30T10:02:20.045Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 5 scene bằng cx/gpt-6-sol, ghi planning/videos/e2e/scene-plan.json + scene-plan.md

- **2026-09-30T10:05:30.568Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 7 shot trên 5 scene bằng cx/gpt-6-sol, ghi planning/videos/e2e/shotlist.json + shotlist.md

- **2026-09-30T10:08:07.255Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-30T10:11:41.024Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- Overlay timing sai lệch so với shotlist: shotlist dùng startMs tuyệt đối (sceneId S02, startMs=5440ms), các atMs của overlay phải được tính bằng (atMs - startMs)/1000 = (7420-5440)/1000=1.98s, (10100-5440)/1000=4.66s, (11400-5440)/1000=5.96s — các giá trị data-start trong code khớp đúng, NHƯNG data-duration của toàn scene phải là (13000-5440)/1000=7.56s và code ghi đúng 7.56s; tuy nhiên overlay "7 NĂM TÙ" có data-start="5.96" + data-duration="1.60" = kết thúc tại 7.56s, trùng đúng data-duration của root — theo quy tắc half-open window [start, start+duration), frame cuối 7.56s sẽ KHÔNG render overlay này, nhưng đây là vấn đề biên rất nhỏ, không phải lỗi chặn thực sự.
- Ảnh tài liệu dùng src="assets/doc-02-verdict.png" nhưng assetId là "doc-02" — tên file thực tế do script kiểm tra tất định riêng, tuy nhiên đây là file ảnh tĩnh (không phải video), và shotlist không chỉ định extension/tên file cụ thể; không thể kết luận sai asset từ tên file.
- CSS class `.document` override `inset: 0` của `.clip` bằng `top: 790px; right: 43px; bottom: auto; left: 43px; height: auto` — đây là intentional layout (thẻ tài liệu canh giữa, không full-frame), nhưng phần tử này có `data-start` nên là timed element; runtime sẽ force `position: absolute; top: 0; left: 0` lên direct children của root có `data-start`, ghi đè `top: 790px` và `left: 43px`, khiến thẻ tài liệu bị đặt sai vị trí (góc trên trái thay vì giữa khung). Đây là lỗi hiển thị chắc chắn từ code — thẻ doc sẽ không hiện đúng vị trí theo assetTreatment.

ADVISORY:
- Transition "peel" được mô phỏng bằng clipPath inset từ dưới lên (inset(0 0 100% 0) → inset(0 0 0% 0)), đây là wipe từ trên xuống chứ không phải peel cổ điển; tinh thần gần đúng nhưng không hoàn toàn khớp mô tả "peel".
- bottom-bar (#FF6A1A) không có data-start nên là untimed element — cần tự đặt position:absolute; inset:0 hoặc định vị rõ ràng; hiện tại dùng position:absolute với right/bottom/left tường minh nên vẫn hiển thị đúng, không phải lỗi chặn.
- Overlay "7 NĂM TÙ" và "24 TỶ 925 TRIỆU ĐỒNG" cùng dùng class `upper-overlay` (data-track-index="1") — hai clip này không overlap thời gian (1.98–4.06s và 5.96–7.56s) nên không gây content_overlap, ổn.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s02

- **2026-09-30T10:12:30.281Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s05

- **2026-09-30T10:12:30.520Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s03

- **2026-09-30T10:12:30.535Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s04

- **2026-09-30T10:19:15.836Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s05

- **2026-09-30T10:19:16.008Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s03

- **2026-09-30T10:19:16.025Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s04

- **2026-09-30T10:19:16.067Z** — `scripts/run-stages-1-6.mjs --video=e2e` — Stage 1-6 xong, Stage 7 THẤT BẠI (mã 1) — 5 scene (S01,S02,S03,S04,S05). Xem log ở trên hoặc sửa bằng --issue-file rồi chạy lại đúng scene.

- **2026-09-30T10:26:37.454Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 2 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-30T10:28:29.813Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-30T10:33:22.946Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s04

- **2026-09-30T10:35:15.298Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s05

- **2026-09-30T10:40:08.419Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s04

- **2026-09-30T10:42:00.792Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 1 lần thử — cần Claude can thiệp. generator cx/gpt-6-sol + dự phòng cx/gpt-6-sol KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: 9router timeout sau 120000ms khi gọi cx/gpt-6-sol).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\poc\pdf-source-e2e\hyperframes\.gen-tmp\e2e-s05

- **2026-09-30T10:45:00.861Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-30T10:45:32.819Z** — `scripts/07-codegen.hf.router.mjs --video=e2e --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-30T10:46:27.675Z** — `scripts/07b-integration-check.hf.mjs --video=e2e` — Stage 7b integration check PASS — 5/5 scene, có audio, có caption-track, hyperframes check ok=true (21 mốc/7 shot, 30.3s).

- **2026-09-30T10:48:03.117Z** — `scripts/07b-integration-check.hf.mjs --video=e2e` — Stage 7b integration check PASS — 5/5 scene, có audio, có caption-track, hyperframes check ok=true (21 mốc/7 shot, 25.0s).

- **2026-09-30T10:49:41.659Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\e2e-full.mp4, 17729069 bytes (16.9MB), 98.1s render time, quality=looks. Xác minh ffprobe: duration=35.000s (khớp audio thật 35.400s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=6.1s, browser_probe=0.4s, video_extract=0.0s, audio_process=2.3s, file_server=0.0s, capture_calibration=3.9s, capture_disk=57.4s, encode=14.8s, assemble=5.1s.
