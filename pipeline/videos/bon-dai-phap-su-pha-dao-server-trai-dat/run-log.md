
- **2026-09-27T18:28:45.054Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 431 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\bon-dai-phap-su-pha-dao-server-trai-dat\transcripts\raw-captions.json

- **2026-09-27T18:29:20.053Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 246 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\bon-dai-phap-su-pha-dao-server-trai-dat\captions\captions.json

- **2026-09-27T18:33:33.676Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 8 ảnh + 8 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/bon-dai-phap-su-pha-dao-server-trai-dat/media/{images,videos}/

- **2026-09-27T18:34:21.138Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 16 asset (8 ảnh, 8 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/bon-dai-phap-su-pha-dao-server-trai-dat/media-analysis/manifest.json

- **2026-09-27T18:35:46.359Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 8 scene bằng cx/gpt-6-sol, ghi planning/videos/bon-dai-phap-su-pha-dao-server-trai-dat/scene-plan.json + scene-plan.md

- **2026-09-27T18:37:27.071Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 18 shot trên 8 scene bằng cx/gpt-6-sol, ghi planning/videos/bon-dai-phap-su-pha-dao-server-trai-dat/shotlist.json + shotlist.md

- **2026-09-27T18:39:13.018Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-27T18:39:15.591Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-27T18:39:18.609Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-27T18:39:20.181Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-27T18:39:20.355Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-27T18:39:31.798Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-27T18:39:35.564Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-27T18:39:44.903Z** — `scripts/07-codegen.hf.router.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-27T18:39:45.023Z** — `scripts/run-stages-1-6.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat` — Stage 1-7 xong — 8 scene (S01,S02,S03,S04,S05,S06,S07,S08), Stage 7 PASS, index.html đã ráp.

- **2026-09-27T18:40:46.364Z** — `scripts/07b-integration-check.hf.mjs --video=bon-dai-phap-su-pha-dao-server-trai-dat` — Stage 7b integration check PASS — 8/8 scene, có audio, có caption-track, hyperframes check ok=true (54 mốc/18 shot, 41.6s).

- **2026-09-27T18:43:51.528Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\bon-dai-phap-su-pha-dao-server-trai-dat-full.mp4, 82544599 bytes (78.7MB), 184.6s render time, quality=looks. Xác minh ffprobe: duration=59.200s (khớp audio thật 59.304s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.3s, browser_probe=0.7s, video_extract=5.2s, audio_process=2.9s, file_server=0.0s, capture_calibration=3.3s, capture_disk=107.2s, encode=46.9s, assemble=6.6s.
