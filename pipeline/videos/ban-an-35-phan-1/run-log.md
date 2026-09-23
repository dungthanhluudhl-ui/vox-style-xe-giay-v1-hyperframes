
- **2026-09-22T17:17:12.417Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp (model=medium, lang=vi) -> 1572 captions, ghi ra pipeline/videos/ban-an-35-phan-1/transcripts/raw-captions.json

- **2026-09-22T17:26:40.565Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 907 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/ban-an-35-phan-1/captions/captions.json

- **2026-09-22T17:27:02.154Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 8 ảnh + 5 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/ban-an-35-phan-1/media/{images,videos}/

- **2026-09-22T17:28:40.452Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 13 asset (8 ảnh, 5 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ban-an-35-phan-1/media-analysis/manifest.json

- **2026-09-22T17:31:05.156Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 24 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-35-phan-1/scene-plan.json + scene-plan.md

- **2026-09-22T17:32:31.982Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 36 shot trên 24 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-35-phan-1/shotlist.json + shotlist.md

- **2026-09-22T17:34:48.984Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-22T17:34:54.990Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-22T17:35:41.659Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-22T17:36:07.559Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-22T17:36:13.420Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-22T17:36:18.405Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-22T17:36:21.481Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-22T17:36:21.963Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-22T17:36:26.754Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-22T17:36:47.814Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`body` và `#root` hardcode `width: 1080px; height: 1920px`** thay vì `width: 100%; height: 100%`. Root phải dùng `width: 100%; height: 100%` — canvas size đến từ `data-width`/`data-height`, không hardcode pixel trên `#root`.
- **`tl.to("#original-name", { opacity: 0, duration: 0.05 }, 5.10)`** — đây là tween `opacity` trên một phần tử không phải `.clip`, về mặt kỹ thuật không vi phạm `gsap_animates_clip_element`, nhưng kết hợp với sticker đè lên là intentional occlusion — không phải lỗi cứng, bỏ qua.
- **`#punch-banner` và `#doc-stamp` không có `data-start`/`data-duration`** — hai overlay này là timed elements (xuất hiện theo timeline) nhưng không được khai báo là clip. Không gây silent failure vì chúng luôn trong DOM và GSAP kiểm soát opacity/transform, nhưng thiếu `class="clip"` + `data-start` khiến lint cảnh báo `timed_element_missing_clip_class` và Studio không nhận diện được edit target.
- **Shotlist yêu cầu label "HỒ SƠ BẢN ÁN" xuất hiện tại `atMs: 72560` (≈1.6s từ đầu scene) và punch-phrase "QUY ƯỚC: ÔNG HÙNG" tại `atMs: 76280` (≈5.32s)** — timing trong code khớp (1.60s và 5.32s), nhưng `holdMs: 2200` cho label ngụ ý nó phải **biến mất** sau 2.2s (≈3.8s). Code không có exit animation cho `#doc-stamp` — nó ở lại suốt, vi phạm `holdMs` của shotlist.
- **`personElements` là NodeList được capture trước khi timeline build** — `tl.to(personElements, ...)` truyền NodeList trực tiếp vào GSAP, không phải selector string. Điều này ổn với GSAP nhưng `strokeDashoffset` được set bằng `el.style.strokeDashoffset = len` (inline style) rồi tween về 0 — không dùng `fromTo` nên start state phụ thuộc vào inline style tại registration time. Trong sub-comp re-seek context sẽ desync, nhưng đây là standalone nên không phải lỗi cứng.
- **`data-layout-allow-overflow="true"` đặt trên `#root`** — blast radius quá rộng, suppress toàn bộ layout audit cho mọi descendant. Nên scope hẹp hơn vào `#camera-rig` (đã có) thay vì cả root.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-35-phan-1-s08

- **2026-09-22T17:37:30.446Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-22T17:38:38.684Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S19` — Codegen HyperFrames scene [S19] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s19.html.

- **2026-09-22T17:39:19.284Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-22T17:39:49.470Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S17` — Codegen HyperFrames scene [S17] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s17.html.

- **2026-09-22T17:39:52.468Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-22T17:40:09.708Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S20` — Codegen HyperFrames scene [S20] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s20.html.

- **2026-09-22T17:40:18.657Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S21` — Codegen HyperFrames scene [S21] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s21.html.

- **2026-09-22T17:40:24.642Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-22T17:40:29.527Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-22T17:40:45.136Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S18` — Codegen HyperFrames scene [S18] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s18.html.

- **2026-09-22T17:40:48.800Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-22T17:42:30.773Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S22` — Codegen HyperFrames scene [S22] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s22.html.

- **2026-09-22T17:43:36.082Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S24` — Codegen HyperFrames scene [S24] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-35-phan-1-s24

- **2026-09-22T17:44:56.951Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S23` — Codegen HyperFrames scene [S23] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-35-phan-1-s23

- **2026-09-22T17:48:34.328Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-22T17:52:28.339Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S23` — Codegen HyperFrames scene [S23] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-35-phan-1-s23

- **2026-09-22T17:53:54.061Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S24` — Codegen HyperFrames scene [S24] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s24.html.

- **2026-09-22T17:57:57.303Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S23` — Codegen HyperFrames scene [S23] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s23.html.

- **2026-09-22T18:04:39.848Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-22T18:06:55.179Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-22T18:11:31.445Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-35-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-23T13:24:07.934Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-35-phan-1` — Stage 7b integration check FAIL:
Cờ layout đặt sai chỗ trên root: compositions/scene-s03.html (data-layout-allow-overflow); compositions/scene-s04.html (data-layout-allow-overflow); compositions/scene-s07.html (data-layout-allow-overflow); compositions/scene-s09.html (data-layout-allow-overflow); compositions/scene-s10.html (data-layout-allow-overflow); compositions/scene-s13.html (data-layout-allow-overflow); compositions/scene-s15.html (data-layout-allow-overflow, data-layout-allow-overlap, data-layout-allow-occlusion); compositions/scene-s17.html (data-layout-allow-overflow); compositions/scene-s20.html (data-layout-allow-overflow); compositions/scene-s23.html (data-layout-allow-overflow); compositions/scene-s24.html (data-layout-allow-overflow) — di chuyển xuống đúng phần tử con cụ thể.
