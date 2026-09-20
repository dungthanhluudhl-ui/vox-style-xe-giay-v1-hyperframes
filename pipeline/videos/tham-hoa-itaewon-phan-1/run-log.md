
- **2026-09-20T11:44:34.395Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp (model=medium, lang=vi) -> 757 captions, ghi ra pipeline/videos/tham-hoa-itaewon-phan-1/transcripts/raw-captions.json

- **2026-09-20T12:01:11.552Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 441 captions (mode=align-với-script-gốc) bằng ag/gemini-3.8-flash-high, ghi ra public/videos/tham-hoa-itaewon-phan-1/captions/captions.json

- **2026-09-20T12:10:11.159Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 6 ảnh + 5 video bằng ag/gemini-3.8-flash-high (prompt viết bởi ag/gemini-3.8-flash-high), phân loại vào public/videos/tham-hoa-itaewon-phan-1/media/{images,videos}/

- **2026-09-20T12:11:05.208Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 11 asset (6 ảnh, 5 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/tham-hoa-itaewon-phan-1/media-analysis/manifest.json

- **2026-09-20T12:14:35.249Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 13 scene bằng cx/gpt-5.6-sol, ghi planning/videos/tham-hoa-itaewon-phan-1/scene-plan.json + scene-plan.md

- **2026-09-20T12:19:08.686Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 13 shot trên 13 scene bằng cx/gpt-5.6-sol, ghi planning/videos/tham-hoa-itaewon-phan-1/shotlist.json + shotlist.md

- **2026-09-20T12:23:19.860Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S02` — Codegen scenes [S02] PASS sau 3 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene02.tsx

- **2026-09-20T12:23:22.035Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S01` — Codegen scenes [S01] PASS sau 2 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene01.tsx

- **2026-09-20T12:23:37.155Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S03` — Codegen scenes [S03] PASS sau 2 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene03.tsx

- **2026-09-20T12:26:04.883Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S05` — Codegen scenes [S05] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene05.tsx

- **2026-09-20T12:26:53.434Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S06` — Codegen scenes [S06] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene06.tsx

- **2026-09-20T12:29:28.757Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S07` — Codegen scenes [S07] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene07.tsx

- **2026-09-20T12:30:52.254Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S04` — Codegen scenes [S04] PASS sau 3 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene04.tsx

- **2026-09-20T12:32:40.530Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S08` — Codegen scenes [S08] PASS sau 2 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene08.tsx

- **2026-09-20T12:32:43.251Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S09` — Codegen scenes [S09] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene09.tsx

- **2026-09-20T12:34:16.295Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S10` — Codegen scenes [S10] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene10.tsx

- **2026-09-20T12:36:06.345Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S11` — Codegen scenes [S11] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene11.tsx

- **2026-09-20T12:37:57.407Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S13` — Codegen scenes [S13] PASS sau 1 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene13.tsx

- **2026-09-20T12:42:08.046Z** — `scripts/07-codegen.router.mjs --video=tham-hoa-itaewon-phan-1 --scenes=S12` — Codegen scenes [S12] PASS sau 2 lần thử bằng cx/gpt-5.6-sol (review: cx/gpt-5.6-sol-review). Files: src/videos/tham-hoa-itaewon-phan-1/scenes/Scene12.tsx

- **2026-09-20T12:52:04.626Z** — tsc+eslint sạch toàn repo. Render `npx remotion render ThamHoaItaewonPhan1 out/tham-hoa-itaewon-phan-1-full.mp4` — 101.077s (ffprobe), 1080x1920, khớp audio thật (101.133s). Video hoàn chỉnh end-to-end.
