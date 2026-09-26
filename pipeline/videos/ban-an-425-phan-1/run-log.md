
- **2026-09-25T18:37:46.495Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 1032 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ban-an-425-phan-1\transcripts\raw-captions.json

- **2026-09-25T18:39:40.018Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 608 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\ban-an-425-phan-1\captions\captions.json

- **2026-09-25T18:43:19.592Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 8 ảnh + 6 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/ban-an-425-phan-1/media/{images,videos}/

- **2026-09-25T18:44:04.880Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 14 asset (8 ảnh, 6 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ban-an-425-phan-1/media-analysis/manifest.json

- **2026-09-25T18:45:27.812Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 18 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-425-phan-1/scene-plan.json + scene-plan.md

- **2026-09-25T18:46:38.321Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 20 shot trên 18 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-425-phan-1/shotlist.json + shotlist.md

- **2026-09-25T18:46:38.345Z** — `scripts/run-stages-1-6.mjs --video=ban-an-425-phan-1` — Stage 1-6 xong (18 scene: S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18) — bỏ qua Stage 7 (--skip-stage7).

- **2026-09-25T18:48:32.852Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-25T18:48:36.751Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-25T18:48:50.292Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-25T18:51:04.165Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`gsap.set()` calls outside timeline trước khi `window.__timelines["main"] = tl`**: Các `gsap.set("#top-header", ...)`, `gsap.set(".split-card", ...)`, v.v. được gọi trực tiếp (không qua `tl.set()`), điều này không deterministic khi seek — state ban đầu phụ thuộc vào thứ tự thực thi script chứ không phải timeline position. Phải dùng `tl.set(el, vars, 0)` hoặc `gsap.fromTo()` với from-state tường minh.
- **`tl.to("#camera-rig", { scale: 1.035, y: -14, ... }, 0)` dùng giá trị tuyệt đối nhưng `#camera-rig` không có initial state tường minh trong timeline**: Nếu seek về t=0, GSAP `to()` sẽ snapshot current state làm from-state — có thể desync. Phải dùng `fromTo` với `{ scale: 1, y: 0 }` → `{ scale: 1.035, y: -14 }`.
- **`tl.to("#lock-icon", { rotation: 6, ... repeat: 3, yoyo: true })` dùng `to()` với repeat/yoyo mà không có from-state tường minh**: Tương tự vấn đề trên — `rotation` không được set ban đầu, seek lại sẽ snapshot sai. Dùng `fromTo` hoặc `tl.set` trước.
- **`tl.fromTo(["#flying-arrow-1", "#flying-arrow-2"], { strokeDashoffset: 12 }, { strokeDashoffset: 0, repeat: 3 })` — giá trị `strokeDashoffset: 12` là tương đối với dasharray=6**: Không phải lỗi contract cứng, nhưng `repeat: 3` với `ease: "none"` và không có `yoyo: true` sẽ reset về 12 mỗi lần — hành vi này không deterministic khi seek vào giữa repeat cycle.
- **`#punch-card` có `top: 1260px` + `height: 216px` = bottom tại 1476px, nằm trong safe zone 1529px — OK**, nhưng `#punch-card` nằm bên trong `#camera-rig` vốn có `tl.to` scale lên 1.035 và y: -14 — điều này có thể đẩy punch-card ra ngoài frame cuối. Không có `data-layout-allow-overflow` trên `#punch-card` hay `#camera-rig`.
- **`tl.to("#card-left", { scale: 1.02, yoyo: true, repeat: 1 })` và `tl.to("#punch-card", { x: 3, repeat: 5, yoyo: true })` — dùng `to()` với repeat/yoyo không có from-state**: Seek vào giữa sẽ snapshot sai starting value. Phải dùng `fromTo`.
- **`#peel-layer` có `data-layout-allow-overflow="true"` nhưng nằm trong `#scene-clip` (clip element)**: `#peel-layer` có `inset: -20px` tức là tràn ra ngoài clip — cần `data-layout-allow-overflow` trên `#scene-clip` hoặc `#peel-layer`, nhưng `#peel-layer` đã có. Tuy nhiên `#scene-clip` là `.clip` element — tween `#peel-layer` với `yPercent: -115, xPercent: 35, rotation: 14` sẽ đẩy nó ra ngoài canvas mà không có overflow flag trên parent clip.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s11

- **2026-09-25T18:51:16.096Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T18:51:17.228Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s05

- **2026-09-25T18:51:31.331Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s04

- **2026-09-25T18:51:36.866Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s01

- **2026-09-25T18:51:40.678Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T18:51:49.072Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T18:52:12.697Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s13

- **2026-09-25T18:52:23.861Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s12

- **2026-09-25T18:53:16.608Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s14

- **2026-09-25T18:54:29.731Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s15

- **2026-09-25T18:55:23.694Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s16

- **2026-09-25T18:55:24.097Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s05

- **2026-09-25T18:55:33.602Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s04

- **2026-09-25T18:55:35.612Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s18

- **2026-09-25T18:55:58.926Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T18:56:43.855Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s01

- **2026-09-25T18:56:45.278Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T18:56:48.767Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-25T18:56:54.110Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T18:58:31.414Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s13

- **2026-09-25T18:58:42.144Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s15

- **2026-09-25T18:59:21.334Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s14

- **2026-09-25T18:59:24.957Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s12

- **2026-09-25T18:59:53.554Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s18

- **2026-09-25T19:00:07.275Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s16

- **2026-09-25T19:00:59.283Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-25T19:07:14.924Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s05

- **2026-09-25T19:08:20.324Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s04

- **2026-09-25T19:08:20.336Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s01

- **2026-09-25T19:11:15.041Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s06

- **2026-09-25T19:11:25.911Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T19:13:14.634Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T19:14:51.604Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T19:15:33.350Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s11

- **2026-09-25T19:16:23.702Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s12

- **2026-09-25T19:17:48.917Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s13

- **2026-09-25T19:19:58.728Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s15

- **2026-09-25T19:20:10.737Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s14

- **2026-09-25T19:21:34.298Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s16

- **2026-09-25T19:24:48.247Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-25T19:25:34.722Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s18

- **2026-09-25T19:25:57.772Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s05

- **2026-09-25T19:28:41.613Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T19:29:03.187Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s06

- **2026-09-25T19:29:24.802Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s01

- **2026-09-25T19:32:58.707Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s11

- **2026-09-25T19:33:10.260Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T19:33:33.029Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T19:37:03.281Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s13

- **2026-09-25T19:37:18.730Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s15

- **2026-09-25T19:38:56.203Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s14

- **2026-09-25T19:40:12.870Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s16

- **2026-09-25T19:42:25.365Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-25T19:43:04.280Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s18

- **2026-09-25T19:51:03.520Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-25T19:51:33.520Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s05

- **2026-09-25T19:51:49.557Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-25T19:52:19.400Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-25T19:56:04.482Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Asset treatment sai rõ shotlist: chỉ dùng một ảnh `parents-searching-missing-child`, không có collage đôi bạn học/quán cà phê và ảnh bé gái giữ nguyên màu.
- Thiếu xử lý nhân vật grayscale với bóng cam `#ff7a1a`; code còn chủ động đặt `filter: none`.
- Transition flip chỉ áp dụng cho lớp overlay `.stage`, không lật toàn bộ nội dung cảnh/ảnh như mô tả “flip tiết lộ nội dung”.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T19:56:07.797Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `<video id="main-video">` là timed element nhưng thiếu `class="clip"`.
- Sai treatment shotlist: video phải chạy đến khoảng 7.8s rồi giữ frame tĩnh và chỉ zoom chậm ở 1.2s cuối; code lại zoom liên tục suốt 9s và không thể hiện điểm freeze/trim 7.8s.
- Label và icon không kết thúc theo `holdMs` của shotlist mà tiếp tục hiển thị đến hết scene.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T19:56:57.517Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Chưa triển khai freeze-frame từ 7.8s đến 11.54s; video hiện được seek/phát xuyên suốt `data-duration="11.54"`, nên không bảo đảm dừng tại khung hình 7.8s như shotlist yêu cầu.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T19:58:41.058Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-25T20:00:02.758Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `.parallax-bg` cố ý dùng `inset: -40px` và tiếp tục scale/di chuyển vượt khung nhưng thiếu `data-layout-allow-overflow` trên chính phần tử này, có thể làm `hyperframes check` báo lỗi overflow.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s11

- **2026-09-25T20:04:02.608Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `<video id="vid-transfer">` là timed element nhưng thiếu `class="clip"`.
- `#phone-icon-card` có CSS `transform: translateX(-50%)` đồng thời được GSAP tween `scale/y`, gây `gsap_css_transform_conflict`.
- Chưa đúng đoạn giữ frame cuối: video chạy đến 8.0s rồi bị ẩn trong 0.18s cuối, thay vì chạy đến 7.8s và giữ frame tĩnh 0.38s.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s15

- **2026-09-25T20:04:16.952Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Sai asset/treatment chính: chỉ dùng một ảnh `img-04-parents-searching-missing-child.jpg`, không thể hiện collage đôi bạn ở quán cà phê và ảnh bé gái giữ nguyên màu; cũng thiếu xử lý nhân vật grayscale với bóng cam.
- Sai timing overlay: `#punch-wrapper` làm cả icon và câu “SÁT HẠCH VIÊN CHỨC” xuất hiện từ 6.46s, trong khi punch-phrase phải xuất hiện lúc 7.21s.
- Không tuân thủ `holdMs`: card “GIÁO VIÊN HỢP ĐỒNG” và punch-phrase không có animation thoát, nên tồn tại đến hết cảnh.
- `#punch-wrapper` ở `top:1280px` có nguy cơ chồng/che phần dưới của `#card-contract` bắt đầu tại `top:1085px`, nhưng không xử lý bố cục hoặc đánh dấu occlusion có chủ đích.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T20:04:36.820Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Xung đột transform: `#center-seam` và `#seam-tag` có CSS `transform: translateX(-50%)` nhưng đồng thời được GSAP animate `scale/scaleY`, dễ gây `gsap_css_transform_conflict`.
- Hai label không kết thúc theo `holdMs`: “CHƯA XÒE TIỀN” và “TỰ MÓC HẦU BAO” xuất hiện đúng thời điểm nhưng giữ đến hết scene thay vì lần lượt 2 giây.
- Shotlist yêu cầu nền spotlight tối và camera parallax; code dùng nền kem sáng, không có chuyển động parallax.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s11

- **2026-09-25T20:04:51.639Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-25T20:05:00.494Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-25T20:05:01.805Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-25T20:05:16.932Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Các mảnh `.shard` có `z-index: 25` che UI chữ (`z-index: 10`) trong transition đầu shot 1 nhưng `.shatter-container` không có `data-layout-allow-occlusion`; có nguy cơ bị `text_occluded`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-25T20:05:18.336Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Viền quanh video chỉ là khung chữ nhật với `box-shadow`, chưa thể hiện hiệu ứng viền giấy xé theo shotlist.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s05

- **2026-09-25T20:06:23.173Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Freeze-frame được tạo bằng video phụ và các event `loadedmetadata`/`seeked`, nên trạng thái canvas phụ thuộc thời điểm tải/seek bất đồng bộ, không tất định theo playhead HyperFrames; có thể render nền trống thay vì frame tại 7.8s.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T20:06:23.649Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `<video data-start="0">` là timed element nhưng thiếu `class="clip"`.
- Không triển khai đúng đoạn giữ frame tĩnh từ 7.8s đến 9s; video vẫn tiếp tục phát trong khi chỉ có tween zoom.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T20:08:16.541Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Overlay “MANG ĐI TRẢ NỢ” có `holdMs: 2500` nên phải kết thúc khoảng 7.31s, nhưng timeline không có exit và giữ đến hết scene 7.8s.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s18

- **2026-09-25T20:12:22.149Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Ba overlay (`date-badge`, `phone-status`, `amount-card`) có thời điểm bắt đầu/kết thúc theo shotlist nhưng thiếu `class="clip"`, `data-start` và `data-duration`; hiện chỉ được điều khiển bằng GSAP, không khai báo timing theo composition contract.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s15

- **2026-09-25T20:12:47.002Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `#camera` được zoom tới `scale: 1.05`, cố ý tràn khung nhưng thiếu `data-layout-allow-overflow="true"` trên chính phần tử này; có thể khiến `hyperframes check` báo lỗi layout.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s18

- **2026-09-25T20:12:48.177Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Thiếu hiệu ứng viền giấy xé quanh khung video theo shotlist; hiện chỉ là card chữ nhật bo góc với border và shadow phẳng.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s05

- **2026-09-25T20:12:56.927Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Video chạy suốt 9 giây (`data-duration="9"`), không dừng tại 7,8 giây và giữ frame tĩnh 1,2 giây cuối như shotlist.
- Zoom-in diễn ra suốt 9 giây thay vì tập trung vào đoạn freeze 1,2 giây cuối.
- Overlay label và icon không có animation thoát theo `holdMs`; chúng tồn tại đến hết scene, lâu hơn thời lượng yêu cầu.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T20:12:57.025Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Asset/bố cục sai rõ shotlist: dùng `img-04-parents-searching-missing-child.jpg` làm một ảnh toàn khung, không phải collage đôi bạn học ở quán cà phê Vũng Tàu và ảnh bé gái.
- Thiếu treatment chính: nhân vật grayscale với bóng cam `#ff7a1a`, trong khi code giữ nguyên toàn bộ ảnh và chỉ thêm bóng cam cho khung card.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T20:13:13.276Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Chưa triển khai freeze-frame: video chạy liên tục suốt 11.54s thay vì phát đến khoảng 7.8s rồi giữ khung hình cuối 3.74s.
- Ken Burns pan-right đang diễn ra gần như toàn cảnh, thay vì kết hợp chủ yếu với đoạn freeze-frame cuối theo shotlist.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T20:13:17.892Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `#root` đang hardcode `width: 1080px; height: 1920px` thay vì `width: 100%; height: 100%`, vi phạm quy ước sizing của composition root và có thể gây lỗi layout khi runtime đóng kích thước canvas.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-25T20:13:28.611Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Xung đột CSS/GSAP transform: `.dashed-line` đặt `transform: scaleY(0)` rồi GSAP tween `scaleY`; `.vs-badge` đặt `transform: scale(0)` rồi GSAP tween `scale`. Dễ bị lint `gsap_css_transform_conflict`; bỏ transform khởi tạo trong CSS và giữ trạng thái đầu trong `fromTo()`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s11

- **2026-09-25T20:17:28.683Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Video chạy đủ 8.18s thay vì dừng tại 7.8s và giữ frame tĩnh 0.38s cuối như shotlist.
- Punch phrase không kết thúc sau hold 2.2s; nó tiếp tục hiển thị đến hết scene.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s15

- **2026-09-25T20:17:47.037Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-25T20:17:50.852Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Cả ảnh quán cà phê và ảnh cháu gái đều dùng cùng file `img-04-parents-searching-missing-child.jpg`, nên không thể hiện đúng collage gồm hai chủ thể khác nhau theo shotlist.
- Màu nhấn chủ đạo nhiều nơi dùng `#ff6a1a` thay vì màu cam chỉ định `#ff7a1a`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-25T20:17:53.022Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-sol) — đã chuyển đổi thành compositions/scene-s18.html.

- **2026-09-25T20:18:17.565Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Video không được giữ frame tĩnh trong 1,2 giây cuối: thẻ video vẫn phát liên tục đến 9s; tween `scale` chỉ zoom, không freeze tại mốc 7,8s.
- Các overlay label/icon/punch được điều khiển theo thời gian nhưng thiếu `data-start` và `data-duration`/`class="clip"` theo composition contract.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-25T20:18:36.945Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Freeze-frame không đúng contract: GSAP tween `currentTime` của `<video>` trong khi HyperFrames sở hữu việc seek media. Với `data-duration="11.54"`, video có thể tiếp tục phát sau 7.8s thay vì giữ khung hình; cần tách đoạn video 0–7.8s và một lớp freeze-frame riêng cho 3.74s cuối.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-25T20:18:40.663Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `#peel-edge` di chuyển ra ngoài khung (`x: 1085`) nhưng thiếu `data-layout-allow-overflow`.
- `#camera-stage-inner` scale `1.025` và dịch `y: -10` tạo overflow có chủ đích nhưng chưa được đánh dấu trên chính phần tử này.
- Thời lượng `holdMs` của hai label không được thực hiện; `#label-left` và `#label-right` hiện rồi giữ đến hết scene thay vì lần lượt kết thúc sau 2 giây.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s11

- **2026-09-25T20:19:17.359Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `.strikethrough-line` đặt `transform: scaleX(0)` trong CSS rồi GSAP tiếp tục tween `scaleX`, vi phạm `gsap_css_transform_conflict`; cần bỏ transform CSS và khai báo trạng thái đầu hoàn toàn bằng `fromTo()`.
- `img-01` bị đặt trong các card nhỏ thay vì làm nền ảnh toàn khung như yêu cầu asset treatment; đặc biệt shot 2 chỉ hiển thị ảnh trong vùng cao khoảng 388px, lệch rõ so với crop nửa dưới/pan-down làm hình ảnh chính.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-26T09:52:51.272Z** — **Dựng lại end-to-end từ Stage 7 bằng pipeline mới (commit ece1003: dự phòng model tự động, autofix, 7b theo shot)** — 12 scene cũ + gen-tmp đã sao lưu ra scratchpad rồi xoá để sinh lại toàn bộ 18 scene.

- **2026-09-26T09:54:30.157Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-26T09:55:35.716Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-26T09:56:37.780Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Không thực hiện asset treatment bắt buộc: hero không grayscale nhân vật, không giữ màu chọn lọc cho vali/cọc tiền và không thể hiện rõ bóng cam lệch 8px.
- Caption dùng nền bán trong suốt `rgba(14,14,14,0.95)`, vi phạm yêu cầu nền đặc opacity 1 khi chữ hiển thị.
- Màu bóng card dùng `#ff7a1a`, lệch palette/style token cam chuẩn `#FF6A1A`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s02

- **2026-09-26T09:57:01.471Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Hình nền không thể hiện rõ assetTreatment “grayscale bóng cam #ff7a1a”; code giữ nguyên màu ảnh và không có xử lý grayscale/accent cam.
- Thêm flow diagram lớn (“BÀ BẠN HỌC”, “TRƯỞNG PHÒNG GIAO THÔNG”, “NHỜ VẢ”) không có trong shotlist, chiếm phần lớn khung hình và làm lệch composition chính của shot.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s09

- **2026-09-26T09:57:05.259Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-26T09:57:30.168Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-26T09:57:49.455Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-26T09:57:51.390Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Code tự xử lý ảnh thành cutout: duplicate ảnh, `filter: grayscale()`, overlay bóng cam và `clip-path`; trái với rule dự án yêu cầu dùng ảnh nguyên bản, không thêm xử lý cutout/filter/tách nền/đổ bóng.
- Dùng cam `#FF6A1A` thay vì màu shotlist yêu cầu `#FF7A1A` cho bóng người (nếu cần giữ đúng treatment của shot).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s03

- **2026-09-26T09:58:26.967Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-26T09:59:02.604Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Freeze-frame 1.2s cuối không được đảm bảo: `data-playback-rate="0"` không phải thuộc tính HyperFrames được hỗ trợ/documented; video `vid-freeze` có thể tiếp tục phát thay vì giữ frame tĩnh.
- `vid-freeze` bắt đầu ở `data-media-start="7.8"` nhưng source chỉ còn đến khoảng 8s (`trimEndSec: 8`), nên không đủ dữ liệu để giữ nguyên frame suốt 1.2s như shotlist yêu cầu.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-26T09:59:03.648Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-26T09:59:05.911Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Video được khai báo `data-duration="11.54"` nên sẽ tiếp tục phát thay vì dừng ở 7.8s rồi freeze-frame 3.74s; code chưa triển khai freeze-frame/trim cuối đúng shotlist.
- `data-media-start="0"` có nhưng không có cơ chế giới hạn playback source ở `trimEndSec=8` hoặc tạo frame tĩnh cho đoạn 7.8–11.54s; phần Ken Burns cuối chỉ animate wrapper, không đảm bảo video đã đứng hình.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s07

- **2026-09-26T09:59:26.857Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-26T10:00:21.041Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-26T10:01:17.906Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-26T10:01:21.073Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-26T10:02:08.142Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- Vi phạm `gsap_css_transform_conflict`: `.strike-line` có CSS `transform: translateY(...) scaleX(0)` nhưng GSAP tween `scaleX`; `.fake-stamp` có CSS `transform: rotate(-8deg)` nhưng GSAP tween `rotation`.
- Shot S17-2 lệch rõ khỏi shotlist: thay vì tập trung vào crop nửa dưới của ảnh và pan-down, code phủ phần lớn khung bằng dossier card/infographic tự dựng, khiến ảnh “TRƯỢT” chỉ còn một dải nhỏ phía dưới.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s17

- **2026-09-26T10:02:14.718Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
ISSUES:
- `#camera-wrap` có zoom/strike scale `1.14` và zoom kéo dài `1.045`, gây overflow có chủ đích nhưng không có `data-layout-allow-overflow` trên đúng phần tử.

Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s18

- **2026-09-26T10:10:10.742Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-26T10:10:29.880Z** — **Dựng lại end-to-end từ Stage 7 (lượt 2) — thêm cổng review lỗi CHẶN/GÓP Ý + ghi chú treatment ảnh (review-gate.mjs), Stage 6 không sinh lệnh xử lý màu ảnh** — lượt 1 (11/18 PASS) đã sao lưu ra scratchpad.

- **2026-09-26T10:11:56.301Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-26T10:12:14.810Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-26T10:12:20.442Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-26T10:12:49.527Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-26T10:12:50.927Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-26T10:12:51.263Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-26T10:13:00.398Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-26T10:14:01.597Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-26T10:14:13.723Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-26T10:14:37.713Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-26T10:14:55.218Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- Cơ chế freeze-frame phụ thuộc vào `loadeddata`/`seeked`/`timeupdate`, `onUpdate` và `drawImage()` từ video; đây là logic dựa trên event/trạng thái playback không seek-deterministic, nên `#freeze-canvas` có thể rỗng hoặc không giữ đúng frame cuối khi render, khiến nội dung video chính không hiển thị đúng ở 1.2 giây cuối.
ADVISORY:
- Overlay label bắt đầu đúng mốc 4.75s nhưng giữ đến hết shot thay vì `holdMs: 2000`.
- Money icon bắt đầu đúng mốc 5.94s nhưng giữ đến hết shot thay vì `holdMs: 2200`.
- Punch phrase bắt đầu đúng mốc 6.78s nhưng giữ đến hết shot; shotlist yêu cầu `holdMs: 2200`.
- `TỰ NGUYỆN ỨNG TIỀN` và `100.000.000 ĐỒNG` được dựng trong panel lớn hơn đáng kể so với overlay độc lập trong shotlist; vẫn đúng nội dung nhưng có thể làm nhịp punch nặng hơn mô tả.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s10

- **2026-09-26T10:15:18.780Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-26T10:15:25.242Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-26T10:15:28.566Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-26T10:15:34.850Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s17.html.

- **2026-09-26T10:15:39.718Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- Dùng sai asset so với shotlist: shot yêu cầu collage đôi bạn học ở quán cà phê Vũng Tàu (`img-04`), nhưng code trỏ tới `assets/img-04-parents-searching-missing-child.jpg`, thể hiện chủ đề bố mẹ tìm con mất tích.
ADVISORY:
- Overlay `GIÁO VIÊN HỢP ĐỒNG` không được ẩn sau hold 2200ms tại khoảng 5.39s mà tiếp tục giữ đến hết shot.
- Icon `doc`/badge không được ẩn sau hold 2000ms tại khoảng 8.46s mà tiếp tục giữ đến hết shot.
- Punch phrase được reveal tại đúng mốc nhưng giữ tới hết scene, trong khi holdMs là 2200ms và kết thúc dự kiến khoảng 9.41s.
- Shotlist mô tả ảnh giữ nguyên màu và bố cục collage; code thêm nhiều lớp khung, callout, metadata và panel thông tin ngoài shotlist. Chi tiết này vẫn hợp Style DNA nhưng nên cân nhắc giảm để trọng tâm nằm ở nội dung chính.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-425-phan-1-s08

- **2026-09-26T10:17:06.785Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-26T10:17:15.611Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s18.html.

- **2026-09-26T10:20:50.205Z** — Thêm kiểm tra asset tất định + videoHoldNote (HyperFrames tự giữ frame cuối, đo SSIM 0.985) — chạy lại S08 (reviewer báo nhầm sai asset theo tên file) và S10 (freeze canvas không tất định).

- **2026-09-26T10:22:39.783Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-26T10:24:37.460Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-26T10:25:53.719Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-425-phan-1` — Stage 7b integration check FAIL (60 mốc/20 shot, 52.2s):
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 175,
    "infoCount": 0,
    "findings": [
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"7.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"12.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"16.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"22.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"31.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"33.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"37.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"37.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"39.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"39.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"41.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"44.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"45.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"49.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"50.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"51.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"53.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"57.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"58.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"65.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"65.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"68.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"70.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"71.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"71.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"72.310000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"73.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"75.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"76.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"77.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"78.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"79.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"80.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"81.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"82.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"83.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"84.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"85.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"85.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"86.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"87.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"88.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"89.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"90.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"92.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"93.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"94.310000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"95.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"96.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"97.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"98.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"98.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"99.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"101.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"101.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"102.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"103.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"104.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"105.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"105.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"106.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"107.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"108.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"109.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"110.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"111.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"112.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"113.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"115.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"116.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"116.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"117.543000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"118.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"119.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"120.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"121.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"122.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"123.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"125.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"125.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"126.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"127.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"128.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"128.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"129.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"130.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"131.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"133.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"133.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"134.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"135.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"137.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"138.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"139.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"140.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"141.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"142.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"143.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"144.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"145.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"146.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"146.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"148.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"149.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
        "bbox": {
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
        "message": "This HTML composition file has 703 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \"#scale-group\" for rotation between 1.70s and 1.70s.",
        "selector": "#scale-group",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s01.html",
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
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"vid-05-freeze\"> has data-start=\"7.8\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#vid-05-freeze",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s07.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"7.8\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#video-wrapper\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#video-wrapper",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s10.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#video-wrapper\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 352 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s11.html",
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
        "message": "2 tl.fromTo() calls target \"#node-3\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#node-3",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s13.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#node-3\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s14.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div data-start=\"0.8\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s14.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div data-start=\"1.45\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s14.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div data-start=\"2.1\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s14.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div data-start=\"6.22\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s14.html",
        "bbox": {
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
        "message": "2 tl.fromTo() calls target \"#cameraRig\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#cameraRig",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s14.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#cameraRig\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "duplicate_media_discovery_risk",
        "severity": "warning",
        "message": "Detected 2 matching img entries with the same source/start/duration.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s17.html",
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
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 335 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-425-phan-1\\compositions\\scene-s17.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Split this sub-composition further into smaller .html files, then mount them from the parent with data-composition-src so each file stays small enough to inspect, revise, and validate independently."
      }
    ],
    "filesScanned": 20
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
    "errorCount": 3,
    "warningCount": 5,
    "infoCount": 51,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 103.785,
        "selector": "div.punch-dept-text",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 83,
          "top": 1450.84,
          "right": 567.36,
          "bottom": 1484.84,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "span.word.active",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1450.84,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 103.785,
        "lastSeen": 104.785,
        "occurrences": 2,
        "heldMs": 1000
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 104.035,
        "selector": "div.punch-dept-text",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 83,
          "top": 1450.39,
          "right": 567.36,
          "bottom": 1484.39,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "[data-start=\"103.600000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1450.39,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 104.035,
        "lastSeen": 104.535,
        "occurrences": 4,
        "heldMs": 500
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 104.785,
        "selector": "div.punch-dept-text",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 83,
          "top": 1450.39,
          "right": 567.36,
          "bottom": 1484.39,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "[data-start=\"104.590000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1450.39,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 104.785,
        "lastSeen": 105.285,
        "occurrences": 3,
        "heldMs": 500
      },
      {
        "code": "container_overflow",
        "severity": "warning",
        "time": 14.4,
        "selector": "div.card-tape",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 807.19,
          "top": 372.88,
          "right": 928.81,
          "bottom": 413.12,
          "width": 121.61,
          "height": 40.23
        },
        "containerSelector": "#hero-card",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 100,
          "top": 380,
          "right": 980,
          "bottom": 1310,
          "width": 880,
          "height": 930
        },
        "overflow": {
          "top": 7.12
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 807.19,
          "y": 372.88,
          "width": 121.61,
          "height": 40.23
        },
        "firstSeen": 14.4,
        "lastSeen": 18.6,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "rotation_pivot_drift",
        "severity": "warning",
        "time": 87.664,
        "selector": "g.flying-bill",
        "dataAttributes": {},
        "sourceFile": "index.html",
        "bbox": {
          "x": 805.3000000000001,
          "y": 373.995,
          "width": 75.34,
          "height": 55.01
        },
        "rect": {
          "left": 805.3000000000001,
          "top": 373.995,
          "right": 880.64,
          "bottom": 429.005,
          "width": 75.34,
          "height": 55.01
        },
        "message": "Rotating element's bounding-box center drifts 112px across rotation — it is not spinning about its own center (check transformOrigin/svgOrigin).",
        "fixHint": "The bounding-box center should stay fixed while the element spins; check its transformOrigin/svgOrigin so rotation pivots about the element's own center rather than a point in a coordinate space it was resized out of.",
        "firstSeen": 87.664,
        "lastSeen": 87.664,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 105.035,
        "selector": "div.punch-dept-text",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 83,
          "top": 1450.39,
          "right": 567.36,
          "bottom": 1484.39,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "[data-start=\"104.590000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1450.39,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 105.035,
        "lastSeen": 105.285,
        "occurrences": 2,
        "heldMs": 250
      },
      {
        "code": "connector_orphan",
        "severity": "warning",
        "time": 123.242,
        "selector": "#flow-path-bg",
        "message": "Connector shaft is visible while its endpoint #stamp-container is not on stage.",
        "rect": {
          "left": 232.66,
          "top": 498.28,
          "right": 827.51,
          "bottom": 875.02,
          "width": 594.85,
          "height": 376.74
        },
        "containerSelector": "svg.flow-svg-overlay",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s16.html",
        "bbox": {
          "x": 232.66,
          "y": 498.28,
          "width": 594.85,
          "height": 376.74
        },
        "firstSeen": 123.242,
        "lastSeen": 126.968,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "connector_orphan",
        "severity": "warning",
        "time": 123.242,
        "selector": "#flow-path",
        "message": "Connector shaft is visible while its endpoint #stamp-container is not on stage.",
        "rect": {
          "left": 232.66,
          "top": 498.28,
          "right": 827.51,
          "bottom": 875.02,
          "width": 594.85,
          "height": 376.74
        },
        "containerSelector": "svg.flow-svg-overlay",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s16.html",
        "bbox": {
          "x": 232.66,
          "y": 498.28,
          "width": 594.85,
          "height": 376.74
        },
        "firstSeen": 123.242,
        "lastSeen": 126.968,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 1.4,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -6.37,
          "top": -11.33,
          "right": 1086.37,
          "bottom": 1931.33,
          "width": 1092.74,
          "height": 1942.66
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
          "left": 6.37,
          "right": 6.37,
          "top": 11.33,
          "bottom": 11.33
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -6.37,
          "y": -11.33,
          "width": 1092.74,
          "height": 1942.66
        },
        "firstSeen": 1.4,
        "lastSeen": 1.4,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 3.5,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -19.17,
          "top": -34.08,
          "right": 1099.17,
          "bottom": 1954.08,
          "width": 1118.34,
          "height": 1988.16
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
          "left": 19.17,
          "right": 19.17,
          "top": 34.08,
          "bottom": 34.08
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -19.17,
          "y": -34.08,
          "width": 1118.34,
          "height": 1988.16
        },
        "firstSeen": 3.5,
        "lastSeen": 3.5,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 5.6,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -31.97,
          "top": -56.83,
          "right": 1111.97,
          "bottom": 1976.83,
          "width": 1143.94,
          "height": 2033.66
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
          "left": 31.97,
          "right": 31.97,
          "top": 56.83,
          "bottom": 56.83
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -31.97,
          "y": -56.83,
          "width": 1143.94,
          "height": 2033.66
        },
        "firstSeen": 5.6,
        "lastSeen": 5.6,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 8.2,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 51.09,
          "top": 179.97,
          "right": 1005.82,
          "bottom": 972.09,
          "width": 954.73,
          "height": 792.12
        },
        "containerSelector": "div.hero-img-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 129,
          "top": 229,
          "right": 951,
          "bottom": 911,
          "width": 822,
          "height": 682
        },
        "overflow": {
          "left": 77.91,
          "right": 54.82,
          "top": 49.03,
          "bottom": 61.09
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 51.09,
          "y": 179.97,
          "width": 954.73,
          "height": 792.12
        },
        "firstSeen": 8.2,
        "lastSeen": 8.2,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 10,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 47.36,
          "top": 149.71,
          "right": 1045.86,
          "bottom": 978.14,
          "width": 998.49,
          "height": 828.43
        },
        "containerSelector": "div.hero-img-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 129,
          "top": 229,
          "right": 951,
          "bottom": 911,
          "width": 822,
          "height": 682
        },
        "overflow": {
          "left": 81.64,
          "right": 94.86,
          "top": 79.29,
          "bottom": 67.14
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 47.36,
          "y": 149.71,
          "width": 998.49,
          "height": 828.43
        },
        "firstSeen": 10,
        "lastSeen": 10,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 11.8,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 45.09,
          "top": 131.14,
          "right": 1070.44,
          "bottom": 981.85,
          "width": 1025.35,
          "height": 850.71
        },
        "containerSelector": "div.hero-img-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 129,
          "top": 229,
          "right": 951,
          "bottom": 911,
          "width": 822,
          "height": 682
        },
        "overflow": {
          "left": 83.91,
          "right": 119.44,
          "top": 97.86,
          "bottom": 70.85
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 45.09,
          "y": 131.14,
          "width": 1025.35,
          "height": 850.71
        },
        "firstSeen": 11.8,
        "lastSeen": 11.8,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 14.4,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 95.28,
          "top": 374.78,
          "right": 984.72,
          "bottom": 1315.22,
          "width": 889.44,
          "height": 940.44
        },
        "containerSelector": "div.hero-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 104,
          "top": 384,
          "right": 976,
          "bottom": 1306,
          "width": 872,
          "height": 922
        },
        "overflow": {
          "left": 8.72,
          "right": 8.72,
          "top": 9.22,
          "bottom": 9.22
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 95.28,
          "y": 374.78,
          "width": 889.44,
          "height": 940.44
        },
        "firstSeen": 14.4,
        "lastSeen": 14.4,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 16.5,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 82.2,
          "top": 360.95,
          "right": 997.8,
          "bottom": 1329.05,
          "width": 915.6,
          "height": 968.1
        },
        "containerSelector": "div.hero-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 104,
          "top": 384,
          "right": 976,
          "bottom": 1306,
          "width": 872,
          "height": 922
        },
        "overflow": {
          "left": 21.8,
          "right": 21.8,
          "top": 23.05,
          "bottom": 23.05
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 82.2,
          "y": 360.95,
          "width": 915.6,
          "height": 968.1
        },
        "firstSeen": 16.5,
        "lastSeen": 16.5,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 18.6,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 69.12,
          "top": 347.12,
          "right": 1010.88,
          "bottom": 1342.88,
          "width": 941.76,
          "height": 995.76
        },
        "containerSelector": "div.hero-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 104,
          "top": 384,
          "right": 976,
          "bottom": 1306,
          "width": 872,
          "height": 922
        },
        "overflow": {
          "left": 34.88,
          "right": 34.88,
          "top": 36.88,
          "bottom": 36.88
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 69.12,
          "y": 347.12,
          "width": 941.76,
          "height": 995.76
        },
        "firstSeen": 18.6,
        "lastSeen": 18.6,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 21.216,
        "selector": "#hero-courtroom-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 14.17,
          "top": 694.5,
          "right": 1065.83,
          "bottom": 1232.75,
          "width": 1051.67,
          "height": 538.25
        },
        "containerSelector": "#hero-image-wrapper",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 70,
          "top": 715,
          "right": 1010,
          "bottom": 1200,
          "width": 940,
          "height": 485
        },
        "overflow": {
          "left": 55.83,
          "right": 55.83,
          "top": 20.5,
          "bottom": 32.75
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 14.17,
          "y": 694.5,
          "width": 1051.67,
          "height": 538.25
        },
        "firstSeen": 21.216,
        "lastSeen": 21.216,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 23.04,
        "selector": "#hero-courtroom-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 36.63,
          "top": 703.7,
          "right": 1043.37,
          "bottom": 1218.95,
          "width": 1006.75,
          "height": 515.26
        },
        "containerSelector": "#hero-image-wrapper",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 70,
          "top": 715,
          "right": 1010,
          "bottom": 1200,
          "width": 940,
          "height": 485
        },
        "overflow": {
          "left": 33.37,
          "right": 33.37,
          "top": 11.3,
          "bottom": 18.95
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 36.63,
          "y": 703.7,
          "width": 1006.75,
          "height": 515.26
        },
        "firstSeen": 23.04,
        "lastSeen": 23.04,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 24.864,
        "selector": "#hero-courtroom-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 58.72,
          "top": 712.74,
          "right": 1021.28,
          "bottom": 1205.39,
          "width": 962.57,
          "height": 492.65
        },
        "containerSelector": "#hero-image-wrapper",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 70,
          "top": 715,
          "right": 1010,
          "bottom": 1200,
          "width": 940,
          "height": 485
        },
        "overflow": {
          "left": 11.28,
          "right": 11.28,
          "top": 2.26,
          "bottom": 5.39
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 58.72,
          "y": 712.74,
          "width": 962.57,
          "height": 492.65
        },
        "firstSeen": 24.864,
        "lastSeen": 24.864,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 27.464,
        "selector": "#court-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 55.87,
          "top": 325.12,
          "right": 1066.75,
          "bottom": 1374.88,
          "width": 1010.88,
          "height": 1049.76
        },
        "containerSelector": "#video-inner",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 72,
          "top": 364,
          "right": 1008,
          "bottom": 1336,
          "width": 936,
          "height": 972
        },
        "overflow": {
          "left": 16.13,
          "right": 58.75,
          "top": 38.88,
          "bottom": 38.88
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-media-start": "0.5",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 55.87,
          "y": 325.12,
          "width": 1010.88,
          "height": 1049.76
        },
        "firstSeen": 27.464,
        "lastSeen": 27.464,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 29.54,
        "selector": "#court-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 34.63,
          "top": 325.12,
          "right": 1045.51,
          "bottom": 1374.88,
          "width": 1010.88,
          "height": 1049.76
        },
        "containerSelector": "#video-inner",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 72,
          "top": 364,
          "right": 1008,
          "bottom": 1336,
          "width": 936,
          "height": 972
        },
        "overflow": {
          "left": 37.37,
          "right": 37.51,
          "top": 38.88,
          "bottom": 38.88
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-media-start": "0.5",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 34.63,
          "y": 325.12,
          "width": 1010.88,
          "height": 1049.76
        },
        "firstSeen": 29.54,
        "lastSeen": 29.54,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 31.616,
        "selector": "#court-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 13.72,
          "top": 325.12,
          "right": 1024.6,
          "bottom": 1374.88,
          "width": 1010.88,
          "height": 1049.76
        },
        "containerSelector": "#video-inner",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 72,
          "top": 364,
          "right": 1008,
          "bottom": 1336,
          "width": 936,
          "height": 972
        },
        "overflow": {
          "left": 58.28,
          "right": 16.6,
          "top": 38.88,
          "bottom": 38.88
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.92",
          "data-media-start": "0.5",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 13.72,
          "y": 325.12,
          "width": 1010.88,
          "height": 1049.76
        },
        "firstSeen": 31.616,
        "lastSeen": 31.616,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 56.444,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 75.73,
          "top": 243.59,
          "right": 1004.27,
          "bottom": 807.22,
          "width": 928.53,
          "height": 563.63
        },
        "containerSelector": "#photo-img-wrap",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 83,
          "top": 248,
          "right": 997,
          "bottom": 802.81,
          "width": 914,
          "height": 554.81
        },
        "overflow": {
          "left": 7.27,
          "right": 7.27,
          "top": 4.41,
          "bottom": 4.41
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 75.73,
          "y": 243.59,
          "width": 928.53,
          "height": 563.63
        },
        "firstSeen": 56.444,
        "lastSeen": 56.444,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 59.3,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 64.72,
          "top": 236.9,
          "right": 1015.28,
          "bottom": 813.91,
          "width": 950.56,
          "height": 577.01
        },
        "containerSelector": "#photo-img-wrap",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 83,
          "top": 248,
          "right": 997,
          "bottom": 802.81,
          "width": 914,
          "height": 554.81
        },
        "overflow": {
          "left": 18.28,
          "right": 18.28,
          "top": 11.1,
          "bottom": 11.1
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 64.72,
          "y": 236.9,
          "width": 950.56,
          "height": 577.01
        },
        "firstSeen": 59.3,
        "lastSeen": 59.3,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 62.156,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 53.84,
          "top": 230.3,
          "right": 1026.16,
          "bottom": 820.51,
          "width": 972.31,
          "height": 590.21
        },
        "containerSelector": "#photo-img-wrap",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 83,
          "top": 248,
          "right": 997,
          "bottom": 802.81,
          "width": 914,
          "height": 554.81
        },
        "overflow": {
          "left": 29.16,
          "right": 29.16,
          "top": 17.7,
          "bottom": 17.7
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 53.84,
          "y": 230.3,
          "width": 972.31,
          "height": 590.21
        },
        "firstSeen": 62.156,
        "lastSeen": 62.156,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 65.848,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 40.59,
          "top": 216.48,
          "right": 1065.61,
          "bottom": 1043.52,
          "width": 1025.01,
          "height": 827.05
        },
        "containerSelector": "div.hero-img-wrapper",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 74,
          "top": 254,
          "right": 1006,
          "bottom": 1006,
          "width": 932,
          "height": 752
        },
        "overflow": {
          "left": 33.41,
          "right": 59.61,
          "top": 37.52,
          "bottom": 37.52
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 40.59,
          "y": 216.48,
          "width": 1025.01,
          "height": 827.05
        },
        "firstSeen": 65.848,
        "lastSeen": 65.848,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 68.53,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 8.76,
          "top": 205.23,
          "right": 1061.64,
          "bottom": 1054.77,
          "width": 1052.88,
          "height": 849.53
        },
        "containerSelector": "div.hero-img-wrapper",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 74,
          "top": 254,
          "right": 1006,
          "bottom": 1006,
          "width": 932,
          "height": 752
        },
        "overflow": {
          "left": 65.24,
          "right": 55.64,
          "top": 48.77,
          "bottom": 48.77
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 8.76,
          "y": 205.23,
          "width": 1052.88,
          "height": 849.53
        },
        "firstSeen": 68.53,
        "lastSeen": 68.53,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 71.212,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -23.43,
          "top": 193.88,
          "right": 1057.59,
          "bottom": 1066.12,
          "width": 1081.03,
          "height": 872.24
        },
        "containerSelector": "div.hero-img-wrapper",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 74,
          "top": 254,
          "right": 1006,
          "bottom": 1006,
          "width": 932,
          "height": 752
        },
        "overflow": {
          "left": 97.43,
          "right": 51.59,
          "top": 60.12,
          "bottom": 60.12
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -23.43,
          "y": 193.88,
          "width": 1081.03,
          "height": 872.24
        },
        "firstSeen": 71.212,
        "lastSeen": 71.212,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 74.8,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -6.8,
          "top": -12.1,
          "right": 1086.8,
          "bottom": 1932.1,
          "width": 1093.61,
          "height": 1944.19
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
          "left": 6.8,
          "right": 6.8,
          "top": 12.1,
          "bottom": 12.1
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -6.8,
          "y": -12.1,
          "width": 1093.61,
          "height": 1944.19
        },
        "firstSeen": 74.8,
        "lastSeen": 74.8,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 77.5,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -20.47,
          "top": -36.38,
          "right": 1100.47,
          "bottom": 1956.38,
          "width": 1120.93,
          "height": 1992.77
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
          "left": 20.47,
          "right": 20.47,
          "top": 36.38,
          "bottom": 36.38
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -20.47,
          "y": -36.38,
          "width": 1120.93,
          "height": 1992.77
        },
        "firstSeen": 77.5,
        "lastSeen": 77.5,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 80.2,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -34.13,
          "top": -60.67,
          "right": 1114.13,
          "bottom": 1980.67,
          "width": 1148.26,
          "height": 2041.34
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
          "left": 34.13,
          "right": 34.13,
          "top": 60.67,
          "bottom": 60.67
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -34.13,
          "y": -60.67,
          "width": 1148.26,
          "height": 2041.34
        },
        "firstSeen": 80.2,
        "lastSeen": 80.2,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 90.864,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 56.53,
          "top": 293.18,
          "right": 1023.47,
          "bottom": 1046.82,
          "width": 966.95,
          "height": 753.65
        },
        "containerSelector": "#hero-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 60,
          "top": 295,
          "right": 1020,
          "bottom": 1045,
          "width": 960,
          "height": 750
        },
        "overflow": {
          "left": 3.47,
          "right": 3.47
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 56.53,
          "y": 293.18,
          "width": 966.95,
          "height": 753.65
        },
        "firstSeen": 90.864,
        "lastSeen": 90.864,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 93.54,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 45.01,
          "top": 284.2,
          "right": 1034.99,
          "bottom": 1055.8,
          "width": 989.98,
          "height": 771.61
        },
        "containerSelector": "#hero-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 60,
          "top": 295,
          "right": 1020,
          "bottom": 1045,
          "width": 960,
          "height": 750
        },
        "overflow": {
          "left": 14.99,
          "right": 14.99,
          "top": 10.8,
          "bottom": 10.8
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 45.01,
          "y": 284.2,
          "width": 989.98,
          "height": 771.61
        },
        "firstSeen": 93.54,
        "lastSeen": 93.54,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 96.216,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 33.58,
          "top": 275.29,
          "right": 1046.42,
          "bottom": 1064.71,
          "width": 1012.83,
          "height": 789.41
        },
        "containerSelector": "#hero-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 60,
          "top": 295,
          "right": 1020,
          "bottom": 1045,
          "width": 960,
          "height": 750
        },
        "overflow": {
          "left": 26.42,
          "right": 26.42,
          "top": 19.71,
          "bottom": 19.71
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 33.58,
          "y": 275.29,
          "width": 1012.83,
          "height": 789.41
        },
        "firstSeen": 96.216,
        "lastSeen": 96.216,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 99.56,
        "selector": "#video-motion-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -2.86,
          "top": 352.77,
          "right": 1038.42,
          "bottom": 1297.23,
          "width": 1041.28,
          "height": 944.46
        },
        "containerSelector": "#video-frame-outer",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 50,
          "top": 380,
          "right": 1030,
          "bottom": 1270,
          "width": 980,
          "height": 890
        },
        "overflow": {
          "left": 52.86,
          "right": 8.42,
          "top": 27.23,
          "bottom": 27.23
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": -2.86,
          "y": 352.77,
          "width": 1041.28,
          "height": 944.46
        },
        "firstSeen": 99.56,
        "lastSeen": 99.56,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 101.9,
        "selector": "div.bridge-sub",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 83,
          "top": 1439.8,
          "right": 665.78,
          "bottom": 1471.8,
          "width": 582.78,
          "height": 32
        },
        "containerSelector": "[data-start=\"101.730000\"] > div:nth-of-type(1)",
        "text": "CHUYỂN TIẾP NHỜ VẢ SANG CƠ QUAN NỘI VỤ",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.22,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1439.8,
          "width": 582.78,
          "height": 32
        },
        "firstSeen": 101.9,
        "lastSeen": 101.9,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 101.9,
        "selector": "#video-motion-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 5.1,
          "top": 342.1,
          "right": 1069.9,
          "bottom": 1307.9,
          "width": 1064.8,
          "height": 965.8
        },
        "containerSelector": "#video-frame-outer",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 50,
          "top": 380,
          "right": 1030,
          "bottom": 1270,
          "width": 980,
          "height": 890
        },
        "overflow": {
          "left": 44.9,
          "right": 39.9,
          "top": 37.9,
          "bottom": 37.9
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 5.1,
          "y": 342.1,
          "width": 1064.8,
          "height": 965.8
        },
        "firstSeen": 101.9,
        "lastSeen": 101.9,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 103.535,
        "selector": "div.punch-dept-text",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 83,
          "top": 1468.73,
          "right": 567.36,
          "bottom": 1502.73,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "[data-start=\"102.670000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1468.73,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 103.535,
        "lastSeen": 103.535,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 103.535,
        "selector": "div.punch-dept-text",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 83,
          "top": 1468.73,
          "right": 567.36,
          "bottom": 1502.73,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "[data-start=\"102.670000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1468.73,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 103.535,
        "lastSeen": 103.535,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 103.535,
        "selector": "div.punch-dept-text",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 83,
          "top": 1468.73,
          "right": 567.36,
          "bottom": 1502.73,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "[data-start=\"102.670000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1468.73,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 103.535,
        "lastSeen": 103.535,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 104.24,
        "selector": "div.punch-dept-text",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 83,
          "top": 1450.39,
          "right": 567.36,
          "bottom": 1484.39,
          "width": 484.36,
          "height": 34
        },
        "containerSelector": "[data-start=\"103.600000\"] > div:nth-of-type(1)",
        "text": "PHÒNG NỘI VỤ • UBND THÀNH PHỐ",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.37,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 83,
          "y": 1450.39,
          "width": 484.36,
          "height": 34
        },
        "firstSeen": 104.24,
        "lastSeen": 104.24,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 104.24,
        "selector": "#video-motion-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 12.98,
          "top": 331.61,
          "right": 1100.91,
          "bottom": 1318.39,
          "width": 1087.94,
          "height": 986.78
        },
        "containerSelector": "#video-frame-outer",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 50,
          "top": 380,
          "right": 1030,
          "bottom": 1270,
          "width": 980,
          "height": 890
        },
        "overflow": {
          "left": 37.02,
          "right": 70.91,
          "top": 48.39,
          "bottom": 48.39
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s13.html",
        "bbox": {
          "x": 12.98,
          "y": 331.61,
          "width": 1087.94,
          "height": 986.78
        },
        "firstSeen": 104.24,
        "lastSeen": 104.24,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 106.536,
        "selector": "span.speaker-pill",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 133.9,
          "top": 260.58,
          "right": 441.1,
          "bottom": 323.72,
          "width": 307.2,
          "height": 63.14
        },
        "containerSelector": "p.quote-body",
        "text": "CHUYÊN VIÊN NỘI VỤ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s14.html",
        "bbox": {
          "x": 133.9,
          "y": 260.58,
          "width": 307.2,
          "height": 63.14
        },
        "firstSeen": 106.536,
        "lastSeen": 106.536,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 107.404,
        "selector": "#cameraRig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -27.6,
          "top": -28.56,
          "right": 1095.6,
          "bottom": 1968.24,
          "width": 1123.2,
          "height": 1996.8
        },
        "containerSelector": "#slot-scene-s14 > div:nth-of-type(1)",
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
          "left": 27.6,
          "right": 15.6,
          "top": 28.56,
          "bottom": 48.24
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s14.html",
        "bbox": {
          "x": -27.6,
          "y": -28.56,
          "width": 1123.2,
          "height": 1996.8
        },
        "firstSeen": 107.404,
        "lastSeen": 107.404,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 109.81,
        "selector": "#cameraRig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -19.55,
          "top": -15.69,
          "right": 1087.55,
          "bottom": 1952.51,
          "width": 1107.11,
          "height": 1968.19
        },
        "containerSelector": "#slot-scene-s14 > div:nth-of-type(1)",
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
          "left": 19.55,
          "right": 7.55,
          "top": 15.69,
          "bottom": 32.51
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s14.html",
        "bbox": {
          "x": -19.55,
          "y": -15.69,
          "width": 1107.11,
          "height": 1968.19
        },
        "firstSeen": 109.81,
        "lastSeen": 109.81,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 112.216,
        "selector": "#cameraRig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -11.45,
          "top": -2.73,
          "right": 1079.45,
          "bottom": 1936.67,
          "width": 1090.91,
          "height": 1939.39
        },
        "containerSelector": "#slot-scene-s14 > div:nth-of-type(1)",
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
          "left": 11.45,
          "top": 2.73,
          "bottom": 16.67
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s14.html",
        "bbox": {
          "x": -11.45,
          "y": -2.73,
          "width": 1090.91,
          "height": 1939.39
        },
        "firstSeen": 112.216,
        "lastSeen": 112.216,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 115.456,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -1.84,
          "top": -3.26,
          "right": 1081.84,
          "bottom": 1923.26,
          "width": 1083.67,
          "height": 1926.53
        },
        "containerSelector": "#slot-scene-s15 > div:nth-of-type(1)",
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
          "top": 3.26,
          "bottom": 3.26
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -1.84,
          "y": -3.26,
          "width": 1083.67,
          "height": 1926.53
        },
        "firstSeen": 115.456,
        "lastSeen": 115.456,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 117.91,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -15.07,
          "top": -26.78,
          "right": 1095.07,
          "bottom": 1946.78,
          "width": 1110.13,
          "height": 1973.57
        },
        "containerSelector": "#slot-scene-s15 > div:nth-of-type(1)",
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
          "left": 15.07,
          "right": 15.07,
          "top": 26.78,
          "bottom": 26.78
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -15.07,
          "y": -26.78,
          "width": 1110.13,
          "height": 1973.57
        },
        "firstSeen": 117.91,
        "lastSeen": 117.91,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 120.364,
        "selector": "#video-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -29.21,
          "top": -51.94,
          "right": 1109.21,
          "bottom": 1971.94,
          "width": 1138.43,
          "height": 2023.87
        },
        "containerSelector": "#slot-scene-s15 > div:nth-of-type(1)",
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
          "left": 29.21,
          "right": 29.21,
          "top": 51.94,
          "bottom": 51.94
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -29.21,
          "y": -51.94,
          "width": 1138.43,
          "height": 2023.87
        },
        "firstSeen": 120.364,
        "lastSeen": 120.364,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 123.242,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 6.98,
          "top": 245.73,
          "right": 1093.16,
          "bottom": 1278.28,
          "width": 1086.19,
          "height": 1032.55
        },
        "containerSelector": "div.media-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 54,
          "top": 300,
          "right": 1026,
          "bottom": 1224,
          "width": 972,
          "height": 924
        },
        "overflow": {
          "left": 47.02,
          "right": 67.16,
          "top": 54.27,
          "bottom": 54.28
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 6.98,
          "y": 245.73,
          "width": 1086.19,
          "height": 1032.55
        },
        "firstSeen": 123.242,
        "lastSeen": 123.242,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 125.105,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -20.88,
          "top": 233.54,
          "right": 1090.96,
          "bottom": 1290.48,
          "width": 1111.85,
          "height": 1056.94
        },
        "containerSelector": "div.media-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 54,
          "top": 300,
          "right": 1026,
          "bottom": 1224,
          "width": 972,
          "height": 924
        },
        "overflow": {
          "left": 74.88,
          "right": 64.96,
          "top": 66.46,
          "bottom": 66.48
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -20.88,
          "y": 233.54,
          "width": 1111.85,
          "height": 1056.94
        },
        "firstSeen": 125.105,
        "lastSeen": 125.105,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 126.968,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -48.8,
          "top": 221.29,
          "right": 1088.82,
          "bottom": 1302.73,
          "width": 1137.62,
          "height": 1081.44
        },
        "containerSelector": "div.media-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 54,
          "top": 300,
          "right": 1026,
          "bottom": 1224,
          "width": 972,
          "height": 924
        },
        "overflow": {
          "left": 102.8,
          "right": 62.82,
          "top": 78.71,
          "bottom": 78.73
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -48.8,
          "y": 221.29,
          "width": 1137.62,
          "height": 1081.44
        },
        "firstSeen": 126.968,
        "lastSeen": 126.968,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 129.168,
        "selector": "#s1-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 63.75,
          "top": 239.53,
          "right": 1016.25,
          "bottom": 1108.47,
          "width": 952.49,
          "height": 868.94
        },
        "containerSelector": "#s1-photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 80,
          "top": 254,
          "right": 1000,
          "bottom": 1094,
          "width": 920,
          "height": 840
        },
        "overflow": {
          "left": 16.25,
          "right": 16.25,
          "top": 14.47,
          "bottom": 14.47
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": 63.75,
          "y": 239.53,
          "width": 952.49,
          "height": 868.94
        },
        "firstSeen": 129.168,
        "lastSeen": 129.168,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 130.605,
        "selector": "#s1-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 36.12,
          "top": 214.32,
          "right": 1043.88,
          "bottom": 1133.68,
          "width": 1007.76,
          "height": 919.36
        },
        "containerSelector": "#s1-photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 80,
          "top": 254,
          "right": 1000,
          "bottom": 1094,
          "width": 920,
          "height": 840
        },
        "overflow": {
          "left": 43.88,
          "right": 43.88,
          "top": 39.68,
          "bottom": 39.68
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": 36.12,
          "y": 214.32,
          "width": 1007.76,
          "height": 919.36
        },
        "firstSeen": 130.605,
        "lastSeen": 130.605,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 132.042,
        "selector": "#s1-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 19.07,
          "top": 198.76,
          "right": 1060.93,
          "bottom": 1149.24,
          "width": 1041.87,
          "height": 950.48
        },
        "containerSelector": "#s1-photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 80,
          "top": 254,
          "right": 1000,
          "bottom": 1094,
          "width": 920,
          "height": 840
        },
        "overflow": {
          "left": 60.93,
          "right": 60.93,
          "top": 55.24,
          "bottom": 55.24
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": 19.07,
          "y": 198.76,
          "width": 1041.87,
          "height": 950.48
        },
        "firstSeen": 132.042,
        "lastSeen": 132.042,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 134.8,
        "selector": "#s2-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 39.81,
          "top": 233.91,
          "right": 1040.19,
          "bottom": 949.09,
          "width": 1000.37,
          "height": 715.18
        },
        "containerSelector": "#s2-photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 80,
          "top": 254,
          "right": 1000,
          "bottom": 914,
          "width": 920,
          "height": 660
        },
        "overflow": {
          "left": 40.19,
          "right": 40.19,
          "top": 20.09,
          "bottom": 35.09
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": 39.81,
          "y": 233.91,
          "width": 1000.37,
          "height": 715.18
        },
        "firstSeen": 134.8,
        "lastSeen": 134.8,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 137.5,
        "selector": "#s2-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 12.41,
          "top": 223.94,
          "right": 1067.59,
          "bottom": 978.3,
          "width": 1055.18,
          "height": 754.36
        },
        "containerSelector": "#s2-photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 80,
          "top": 254,
          "right": 1000,
          "bottom": 914,
          "width": 920,
          "height": 660
        },
        "overflow": {
          "left": 67.59,
          "right": 67.59,
          "top": 30.06,
          "bottom": 64.3
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": 12.41,
          "y": 223.94,
          "width": 1055.18,
          "height": 754.36
        },
        "firstSeen": 137.5,
        "lastSeen": 137.5,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 140.2,
        "selector": "#s2-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -4.14,
          "top": 217.91,
          "right": 1084.14,
          "bottom": 995.94,
          "width": 1088.29,
          "height": 778.03
        },
        "containerSelector": "#s2-photo-frame",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 80,
          "top": 254,
          "right": 1000,
          "bottom": 914,
          "width": 920,
          "height": 660
        },
        "overflow": {
          "left": 84.14,
          "right": 84.14,
          "top": 36.09,
          "bottom": 81.94
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": -4.14,
          "y": 217.91,
          "width": 1088.29,
          "height": 778.03
        },
        "firstSeen": 140.2,
        "lastSeen": 140.2,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 149.8,
    "samples": [
      1.4,
      3.5,
      5.6,
      8.2,
      10,
      11.8,
      14.4,
      16.5,
      18.6,
      21.216,
      23.04,
      24.864,
      27.464,
      29.54,
      31.616,
      33.8,
      35,
      36.2,
      38.2,
      40,
      41.8,
      45.308,
      48.77,
      52.232,
      56.444,
      59.3,
      62.156,
      65.848,
      68.53,
      71.212,
      74.8,
      77.5,
      80.2,
      83.416,
      85.54,
      87.664,
      90.864,
      93.54,
      96.216,
      99.56,
      101.9,
      104.24,
      107.404,
      109.81,
      112.216,
      115.456,
      117.91,
      120.364,
      123.242,
      125.105,
      126.968,
      129.168,
      130.605,
      132.042,
      134.8,
      137.5,
      140.2,
      143.56,
      145.9,
      148.24,
      149.8
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
    "warningCount": 0,
    "infoCount": 0,
    "findings": [],
    "enabled": true,
    "samples": [
      1.4,
      31.616,
      71.212,
      112.216,
      148.24
    ],
    "checked": 74,
    "passed": 74
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


- **2026-09-26T10:28:26.589Z** — 7b chặn render: S13 chữ "PHÒNG NỘI VỤ • UBND THÀNH PHỐ" đè phụ đề (content_overlap). Gốc: caption-zone gate chỉ lấy mẫu khung cuối scene (seek mặc định [1]) — đã thêm seek 10 mốc cho verify Stage 7 (caption-zone.mjs SCENE_CAPTION_SEEK), chạy lại S13.

- **2026-09-26T10:33:44.077Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-425-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-5.6-luna-review) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-26T10:34:48.641Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-425-phan-1` — Stage 7b integration check PASS — 18/18 scene, có audio, có caption-track, hyperframes check ok=true (60 mốc/20 shot, 49.2s).

- **2026-09-26T10:41:33.073Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\ban-an-425-phan-1-full.mp4, 130755158 bytes (124.7MB), 403.9s render time, quality=looks. Xác minh ffprobe: duration=149.800s (khớp audio thật 149.806s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=4.9s, browser_probe=0.7s, video_extract=6.4s, audio_process=9.9s, file_server=0.0s, capture_calibration=5.0s, capture_disk=263.8s, encode=82.1s, assemble=21.1s.

- **2026-09-26T10:44:10.908Z** — qa-blank-frame-audit (theo shot): 20 shot, 1 bị flag (S06-2:partial) — video `C:\vox-style-xe-giay-v1-hyperframes\out\ban-an-425-phan-1-full.mp4`, report `C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ban-an-425-phan-1\contact-sheet\report.md`
