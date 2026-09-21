
- **2026-09-21T14:02:51.344Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp (model=medium, lang=vi) -> 673 captions, ghi ra pipeline/videos/ban-an-473-phan-1/transcripts/raw-captions.json

- **2026-09-21T14:13:29.805Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 395 captions (mode=align-với-script-gốc) bằng ag/gemini-3.8-flash-high, ghi ra public/videos/ban-an-473-phan-1/captions/captions.json

- **2026-09-21T14:22:35.032Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 2 ảnh + 2 video bằng ag/gemini-3.8-flash-high (prompt viết bởi ag/gemini-3.8-flash-high), phân loại vào public/videos/ban-an-473-phan-1/media/{images,videos}/

- **2026-09-21T14:26:25.436Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 2 ảnh + 2 video bằng ag/gemini-3.8-flash-high (prompt viết bởi ag/gemini-3.8-flash-high), phân loại vào public/videos/ban-an-473-phan-1/media/{images,videos}/

- **2026-09-21T14:44:25.419Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 6 ảnh + 6 video bằng ag/gemini-3.8-flash-high (prompt viết bởi ag/gemini-3.8-flash-high), phân loại vào public/videos/ban-an-473-phan-1/media/{images,videos}/

- **2026-09-21T14:45:58.327Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 12 asset (6 ảnh, 6 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ban-an-473-phan-1/media-analysis/manifest.json

- **2026-09-21T14:49:06.969Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 14 scene bằng cx/gpt-5.6-sol, ghi planning/videos/ban-an-473-phan-1/scene-plan.json + scene-plan.md

- **2026-09-21T14:53:49.597Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 15 shot trên 14 scene bằng cx/gpt-5.6-sol, ghi planning/videos/ban-an-473-phan-1/shotlist.json + shotlist.md

- **2026-09-21T15:04:52.361Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-473-phan-1-s01

- **2026-09-21T15:11:04.941Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-21T15:16:34.660Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-21T15:16:38.260Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-21T15:16:38.984Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-21T15:16:42.082Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-21T15:16:59.152Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-21T15:17:04.903Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-21T15:17:14.060Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-21T15:17:50.001Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-21T15:18:56.583Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-21T15:19:06.423Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-21T15:20:15.938Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-21T15:20:28.146Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-21T15:27:16.207Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-473-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 3 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-21T15:37:09.575Z** — `hyperframes check` trên project đã ráp (14/14 scene): ok=true, lint 0 lỗi/20 cảnh báo cosmetic, runtime/layout/contrast sạch. Render `npx hyperframes render --quality looks` — 101.833s (ffprobe), 1080x1920 h264/aac, khớp audio thật (101.810s, lệch 0.023s). Video hoàn chỉnh end-to-end qua nhánh HyperFrames (Giai đoạn E) — đầu tiên ở quy mô 14 scene + codegen song song concurrency=10 (13/13 scene PASS trong ngân sách tự động retry, không cần --issue-file can thiệp tay).

- **2026-09-21T16:18:50.948Z** — Bug thật phát hiện SAU khi người dùng xem bản render đầu (2026-09-21): phụ đề karaoke hoàn toàn không xuất hiện trong suốt cả video. Nguyên nhân gốc #1: compositions/caption-track.html (Giai đoạn A) trước đây chỉ tồn tại viết tay, hard-code riêng cho video test an-le-64 — chưa từng được tổng quát hoá thành bước sinh tất định trong pipeline sản xuất thật. Đã sửa: viết scripts/lib/generate-caption-track-hf.mjs (sinh caption-track.html tất định từ captions.json, port đúng applyFourWordPageBreaks() + dùng thẳng createTikTokStyleCaptions() thật của @remotion/captions), gọi tự động trong syncRootHf() mỗi lần ráp — áp dụng cho MỌI video từ nay, không cần thao tác tay. Sau khi vá #1, kiểm tra lại bằng vision agent phát hiện nguyên nhân gốc #2: phụ đề vẫn bị che khuất đúng trong suốt 0-10.68s (khớp chính xác thời lượng scene S01) — do CSS .clip trong index.html (sync-root-hf-lib.mjs) thiếu isolation: isolate, khiến z-index dùng NỘI BỘ trong scene S01 (vd .brand-bottom-bar z-index:20) thoát khỏi stacking context của chính nó và đè lên slot caption-track ở stacking context gốc của trang (track-index KHÔNG quyết định layering, chỉ CSS z-index mới quyết định — xem hyperframes-core/references/tracks-and-clips.md). Đã sửa: thêm isolation: isolate vào .clip trong sync-root-hf-lib.mjs — cô lập stacking context từng slot vĩnh viễn, áp dụng cho MỌI scene/video từ nay, không phụ thuộc việc scene có dùng z-index cẩn thận hay không. Xác minh cuối bằng vision agent (9router) trên CHÍNH file MP4 render lại: 10/10 mốc từ giây 1 đến 101 đều thấy phụ đề + karaoke-highlight đúng. Render lại: out/ban-an-473-phan-1-full.mp4, 101.833s (khớp audio 101.810s), 159.9MB.
