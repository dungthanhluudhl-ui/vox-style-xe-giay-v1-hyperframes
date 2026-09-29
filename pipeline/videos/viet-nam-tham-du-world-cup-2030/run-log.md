
- **2026-09-27T17:16:33.680Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 570 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\viet-nam-tham-du-world-cup-2030\transcripts\raw-captions.json

- **2026-09-27T17:17:53.671Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 352 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\viet-nam-tham-du-world-cup-2030\captions\captions.json

- **2026-09-27T17:21:29.595Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 9 ảnh + 7 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/viet-nam-tham-du-world-cup-2030/media/{images,videos}/

- **2026-09-27T17:22:22.652Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 16 asset (9 ảnh, 7 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/viet-nam-tham-du-world-cup-2030/media-analysis/manifest.json

- **2026-09-27T17:23:51.439Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 11 scene bằng cx/gpt-6-sol, ghi planning/videos/viet-nam-tham-du-world-cup-2030/scene-plan.json + scene-plan.md

- **2026-09-27T17:25:42.357Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 18 shot trên 11 scene bằng cx/gpt-6-sol, ghi planning/videos/viet-nam-tham-du-world-cup-2030/shotlist.json + shotlist.md

- **2026-09-27T17:27:10.902Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-27T17:27:17.860Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-27T17:27:29.922Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-27T17:27:32.356Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-27T17:27:33.418Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-27T17:27:37.080Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-27T17:27:38.359Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-27T17:27:41.810Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-27T17:27:48.306Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-27T17:27:49.600Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-27T17:28:37.379Z** — `scripts/07-codegen.hf.router.mjs --video=viet-nam-tham-du-world-cup-2030 --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 1 lần thử bằng cx/gpt-6-sol (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-27T17:28:37.498Z** — `scripts/run-stages-1-6.mjs --video=viet-nam-tham-du-world-cup-2030` — Stage 1-7 xong — 11 scene (S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11), Stage 7 PASS, index.html đã ráp.

- **2026-09-27T17:29:54.753Z** — `scripts/07b-integration-check.hf.mjs --video=viet-nam-tham-du-world-cup-2030` — Stage 7b integration check PASS — 11/11 scene, có audio, có caption-track, hyperframes check ok=true (54 mốc/18 shot, 47.7s).

- **2026-09-27T17:34:07.662Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\viet-nam-tham-du-world-cup-2030-full.mp4, 111624992 bytes (106.5MB), 252.3s render time, quality=looks. Xác minh ffprobe: duration=87.400s (khớp audio thật 87.531s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.5s, browser_probe=0.7s, video_extract=5.4s, audio_process=3.9s, file_server=0.0s, capture_calibration=3.4s, capture_disk=157.9s, encode=59.7s, assemble=9.1s.
