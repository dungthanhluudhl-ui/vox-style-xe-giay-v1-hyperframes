
- **2026-09-30T05:51:21.964Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 2839 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\ban-an-301-2025-tphcm\transcripts\raw-captions.json

- **2026-09-30T05:52:07.572Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 23 ảnh + 0 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/ban-an-301-2025-tphcm/media/{images,videos}/

- **2026-09-30T05:53:11.638Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 23 asset (23 ảnh, 0 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/ban-an-301-2025-tphcm/media-analysis/manifest.json

- **2026-09-30T05:54:59.954Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 1666 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\ban-an-301-2025-tphcm\captions\captions.json

- **2026-09-30T05:56:57.253Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 41 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-301-2025-tphcm/scene-plan.json + scene-plan.md

- **2026-09-30T05:58:27.033Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 42 shot trên 41 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/ban-an-301-2025-tphcm/shotlist.json + shotlist.md

- **2026-09-30T05:58:27.054Z** — `scripts/run-stages-1-6.mjs --video=ban-an-301-2025-tphcm` — Stage 1-6 xong (41 scene: S01,S02,S03,S04,S05,S06,S07,S08,S09,S10,S11,S12,S13,S14,S15,S16,S17,S18,S19,S20,S21,S22,S23,S24,S25,S26,S27,S28,S29,S30,S31,S32,S33,S34,S35,S36,S37,S38,S39,S40,S41) — bỏ qua Stage 7 (--skip-stage7).

- **2026-09-30T06:02:08.859Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-30T06:02:18.603Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-30T06:03:15.459Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-30T06:03:17.628Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-30T06:03:32.302Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-30T06:03:38.615Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S09` — Codegen HyperFrames scene [S09] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s09.html.

- **2026-09-30T06:03:46.414Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-30T06:04:06.202Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S10` — Codegen HyperFrames scene [S10] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s10.html.

- **2026-09-30T06:04:21.283Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S12` — Codegen HyperFrames scene [S12] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s12.html.

- **2026-09-30T06:04:34.466Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-30T06:05:17.449Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-30T06:05:19.002Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S16` — Codegen HyperFrames scene [S16] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s16.html.

- **2026-09-30T06:05:20.923Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S17` — Codegen HyperFrames scene [S17] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s17.html.

- **2026-09-30T06:05:32.567Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S11` — Codegen HyperFrames scene [S11] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s11.html.

- **2026-09-30T06:06:08.588Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S14` — Codegen HyperFrames scene [S14] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s14.html.

- **2026-09-30T06:06:16.915Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S15` — Codegen HyperFrames scene [S15] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s15.html.

- **2026-09-30T06:06:27.155Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S13` — Codegen HyperFrames scene [S13] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s13.html.

- **2026-09-30T06:08:11.968Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S21` — Codegen HyperFrames scene [S21] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s21.html.

- **2026-09-30T06:08:23.317Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S18` — Codegen HyperFrames scene [S18] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s18.html.

- **2026-09-30T06:08:24.866Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S23` — Codegen HyperFrames scene [S23] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s23.html.

- **2026-09-30T06:09:16.998Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S19` — Codegen HyperFrames scene [S19] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s19.html.

- **2026-09-30T06:09:18.077Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S24` — Codegen HyperFrames scene [S24] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- Khung player tự thêm các mốc “00:00:01” và “00:00:08” không có trong shotlist; đây là số liệu cụ thể chưa được giao, cần bỏ hoặc thay bằng trạng thái không kèm số.
ADVISORY:
- Hai label và biểu tượng doc xuất hiện đúng mốc, nhưng đều giữ đến hết scene thay vì theo holdMs trong shotlist.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-301-2025-tphcm-s24

- **2026-09-30T06:09:35.118Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S26` — Codegen HyperFrames scene [S26] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s26.html.

- **2026-09-30T06:09:39.254Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S25` — Codegen HyperFrames scene [S25] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s25.html.

- **2026-09-30T06:10:19.887Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S28` — Codegen HyperFrames scene [S28] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s28.html.

- **2026-09-30T06:10:20.800Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S22` — Codegen HyperFrames scene [S22] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL
BLOCKING:
- Shotlist yêu cầu kết thúc bằng con dấu đỏ tiếp nhận đầu thú, nhưng code dùng con dấu màu cam; sai chi tiết thị giác chính của shot.
ADVISORY:
- Hai overlay không rời màn hình sau holdMs mà tiếp tục hiện đến cuối shot.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\ban-an-301-2025-tphcm-s22

- **2026-09-30T06:10:22.457Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S29` — Codegen HyperFrames scene [S29] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s29.html.

- **2026-09-30T06:10:34.286Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S20` — Codegen HyperFrames scene [S20] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s20.html.

- **2026-09-30T06:11:06.386Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S32` — Codegen HyperFrames scene [S32] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s32.html.

- **2026-09-30T06:11:07.887Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S27` — Codegen HyperFrames scene [S27] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s27.html.

- **2026-09-30T06:12:11.408Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S31` — Codegen HyperFrames scene [S31] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s31.html.

- **2026-09-30T06:12:21.829Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S30` — Codegen HyperFrames scene [S30] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s30.html.

- **2026-09-30T06:13:08.562Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S35` — Codegen HyperFrames scene [S35] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s35.html.

- **2026-09-30T06:13:12.984Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S37` — Codegen HyperFrames scene [S37] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s37.html.

- **2026-09-30T06:13:38.345Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S33` — Codegen HyperFrames scene [S33] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s33.html.

- **2026-09-30T06:13:42.896Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S39` — Codegen HyperFrames scene [S39] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s39.html.

- **2026-09-30T06:13:49.845Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S36` — Codegen HyperFrames scene [S36] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s36.html.

- **2026-09-30T06:13:59.349Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S34` — Codegen HyperFrames scene [S34] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s34.html.

- **2026-09-30T06:14:09.814Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S40` — Codegen HyperFrames scene [S40] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s40.html.

- **2026-09-30T06:14:23.234Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S38` — Codegen HyperFrames scene [S38] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s38.html.

- **2026-09-30T06:15:18.099Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S41` — Codegen HyperFrames scene [S41] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s41.html.

- **2026-09-30T06:22:30.709Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S24 --issue-file=C:\Users\DTL\AppData\Local\Temp\claude\c--vox-style-xe-giay-v1-hyperframes\9110acf6-dd01-4b61-ad59-98d3bf2c9603\scratchpad\issue-s24.txt` — Codegen HyperFrames scene [S24] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s24.html.

- **2026-09-30T06:24:11.449Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S22 --issue-file=C:\Users\DTL\AppData\Local\Temp\claude\c--vox-style-xe-giay-v1-hyperframes\9110acf6-dd01-4b61-ad59-98d3bf2c9603\scratchpad\issue-s22.txt` — Codegen HyperFrames scene [S22] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s22.html.

- **2026-09-30T06:26:50.547Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-301-2025-tphcm` — Stage 7b integration check FAIL (126 mốc/42 shot, 97.1s):
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 477,
    "infoCount": 0,
    "findings": [
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 493 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\index.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Split coherent scenes or layers into separate .html files under compositions/, then mount them from the parent with data-composition-src so each file stays small enough to inspect, revise, and validate independently."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.032000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.064000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"7.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"12.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"15.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"16.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.770000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.370000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"22.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"31.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"32.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"33.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"33.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"37.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"39.690000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"41.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"42.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"44.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"45.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"47.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"49.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"50.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"51.370000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"53.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"53.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"57.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"58.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"68.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"70.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"70.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"71.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"72.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"73.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"73.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"74.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"75.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"76.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"77.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"78.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"79.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"80.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"81.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"81.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"82.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"83.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"84.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"85.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"86.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"87.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"88.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"89.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"90.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"90.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"91.460000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"92.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"93.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"93.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"94.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"95.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"96.370000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"97.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"98.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"98.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"99.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"99.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"101.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"102.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"103.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"104.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"105.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"105.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"106.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"107.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"107.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"108.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"109.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"110.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"110.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"111.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"112.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"113.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"114.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"115.670000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"116.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"117.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"118.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"118.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"119.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"120.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"121.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"122.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"123.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"124.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"124.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"125.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"126.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"128.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"128.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"129.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"130.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"131.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"131.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"132.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"133.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"134.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"135.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"136.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"137.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"138.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"139.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"140.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"141.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"142.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"143.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"144.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"145.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"146.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"146.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"147.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"148.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"149.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"150.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"150.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"151.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"152.310000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"153.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"153.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"154.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"156.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"157.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"158.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"158.870000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"159.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"160.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"161.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"161.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"162.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"163.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"164.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"165.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"165.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"166.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"167.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"168.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"168.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"169.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"170.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"170.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"171.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"172.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"173.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"173.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"174.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"175.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"177.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"177.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"178.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"179.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"180.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"182.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"184.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"185.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"186.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"187.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"188.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"189.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"191.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"191.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"191.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"191.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"191.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"192.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"193.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"194.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"195.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"195.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"196.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"197.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"198.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"198.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"199.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"200.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"201.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"202.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"202.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"203.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"204.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"205.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"205.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"206.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"207.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"207.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"208.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"209.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"210.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"211.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"212.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"213.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"213.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"214.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"215.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"216.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"217.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"218.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"218.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"220.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"220.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"221.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"221.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"222.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"222.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"223.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"224.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"225.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"226.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"227.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"227.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"228.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"229.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"230.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"231.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"231.770000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"232.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"233.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"234.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"235.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"236.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"237.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"237.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"238.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"239.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"240.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"241.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"242.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"242.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"243.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"244.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"245.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"246.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"246.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"247.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"248.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"249.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"249.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"250.310000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"251.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"251.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"252.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"252.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"253.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"254.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"255.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"256.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"257.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"258.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"258.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"259.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"260.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"261.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"262.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"263.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"264.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"265.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"265.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"266.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"267.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"268.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"269.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"269.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"271.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"271.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"272.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"272.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"273.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"274.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"275.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"276.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"277.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"277.930000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"278.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"279.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"280.810000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"281.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"282.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"282.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"283.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"284.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"285.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"286.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"287.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"287.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"288.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"289.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"290.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"291.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"292.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"293.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"294.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"294.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"295.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"296.370000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"297.190000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"297.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"298.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"298.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"299.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"300.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"301.410000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"302.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"303.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"304.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"304.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"305.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"306.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"307.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"308.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"309.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"310.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"311.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"311.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"311.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"312.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"313.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"313.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"314.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"315.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"316.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"316.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"317.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"318.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"318.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"319.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"320.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"321.420000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"321.940000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"322.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"323.540000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"324.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"325.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"326.130000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"326.890000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"327.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"328.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"329.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"330.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"331.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"332.350000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"333.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"335.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"335.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"336.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"337.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"338.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"339.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"339.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"340.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"340.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"341.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"342.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"343.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"344.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"345.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"345.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"346.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"347.610000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"348.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"349.250000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"350.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"351.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"352.460000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"353.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"354.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"355.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"356.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"357.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"357.780000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"358.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"359.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"360.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"361.210000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"361.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"362.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"363.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"364.550000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"365.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"366.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"366.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"367.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"368.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"369.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"369.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 0.03s and 0.17s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 0.06s and 0.17s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 0.06s and 0.20s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 191.12s and 191.25s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 191.15s and 191.25s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 191.20s and 191.25s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 191.15s and 191.29s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 191.20s and 191.29s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 191.20s and 191.32s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 1863 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\caption-track.html",
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
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 348 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s12.html",
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
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 363 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s14.html",
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
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 359 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s20.html",
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
        "message": "2 tl.fromTo() calls target \"#card-3\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#card-3",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s25.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#card-3\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#card-tin\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#card-tin",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s27.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#card-tin\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_timeline_set_initial_hide",
        "severity": "warning",
        "message": "Initial hidden state for \"#badge-kien\" is set via tl.set(...) at position 0 inside the paused timeline. A zero-duration set at 0 does not render while the playhead sits exactly at 0, so frame 0 shows the un-hidden state.",
        "selector": "#badge-kien",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s27.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Use gsap.set(...) (immediate, outside the timeline) for initial states, or author the hidden state directly in CSS/attributes."
      },
      {
        "code": "gsap_timeline_set_initial_hide",
        "severity": "warning",
        "message": "Initial hidden state for \"#badge-tin\" is set via tl.set(...) at position 0 inside the paused timeline. A zero-duration set at 0 does not render while the playhead sits exactly at 0, so frame 0 shows the un-hidden state.",
        "selector": "#badge-tin",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s27.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Use gsap.set(...) (immediate, outside the timeline) for initial states, or author the hidden state directly in CSS/attributes."
      },
      {
        "code": "gsap_timeline_set_initial_hide",
        "severity": "warning",
        "message": "Initial hidden state for \"#outcome-card\" is set via tl.set(...) at position 0 inside the paused timeline. A zero-duration set at 0 does not render while the playhead sits exactly at 0, so frame 0 shows the un-hidden state.",
        "selector": "#outcome-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s27.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Use gsap.set(...) (immediate, outside the timeline) for initial states, or author the hidden state directly in CSS/attributes."
      },
      {
        "code": "gsap_timeline_set_initial_hide",
        "severity": "warning",
        "message": "Initial hidden state for \"#path-left\" is set via tl.set(...) at position 0 inside the paused timeline. A zero-duration set at 0 does not render while the playhead sits exactly at 0, so frame 0 shows the un-hidden state.",
        "selector": "#path-left",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s27.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Use gsap.set(...) (immediate, outside the timeline) for initial states, or author the hidden state directly in CSS/attributes."
      },
      {
        "code": "gsap_timeline_set_initial_hide",
        "severity": "warning",
        "message": "Initial hidden state for \"#path-right\" is set via tl.set(...) at position 0 inside the paused timeline. A zero-duration set at 0 does not render while the playhead sits exactly at 0, so frame 0 shows the un-hidden state.",
        "selector": "#path-right",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s27.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Use gsap.set(...) (immediate, outside the timeline) for initial states, or author the hidden state directly in CSS/attributes."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s30.html",
        "bbox": {
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
        "message": "2 tl.fromTo() calls target \"#ceiling-bar\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#ceiling-bar",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s30.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#ceiling-bar\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<section data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s32.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "overlapping_gsap_tweens",
        "severity": "warning",
        "message": "GSAP tweens overlap on \"#btn-apply\" for scale between 5.60s and 5.60s.",
        "selector": "#btn-apply",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s34.html",
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
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#mitigating-docs-pack\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#mitigating-docs-pack",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\ban-an-301-2025-tphcm\\compositions\\scene-s35.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#mitigating-docs-pack\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      }
    ],
    "filesScanned": 43
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
    "errorCount": 24,
    "warningCount": 8,
    "infoCount": 65,
    "findings": [
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 209.432,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#scene-s25 > div:nth-of-type(2)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 209.432,
        "lastSeen": 214.148,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 209.432,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#label-step-1",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 209.432,
        "lastSeen": 215.669,
        "occurrences": 14,
        "heldMs": 6237.000000000024
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 217.96,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "div.bg-photo-wrapper > img:nth-of-type(1)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 217.96,
        "lastSeen": 224.68,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 228.612,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#card-kien",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 228.612,
        "lastSeen": 233.688,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 237.588,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#spotlight-overlay",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 237.588,
        "lastSeen": 244.212,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 242.242,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#overlay-2-wrap > div:nth-of-type(1) > div:nth-of-type(4) > div:nth-of-type(2)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 242.242,
        "lastSeen": 244.212,
        "occurrences": 5,
        "heldMs": 1969.9999999999989
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 248.588,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#main-asset",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 248.588,
        "lastSeen": 255.092,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 255.837,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "span.punch-white",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 255.837,
        "lastSeen": 257.073,
        "occurrences": 3,
        "heldMs": 1235.99999999999
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 255.837,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "span.punch-orange",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 255.837,
        "lastSeen": 257.073,
        "occurrences": 3,
        "heldMs": 1235.99999999999
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 258.852,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#diagram-frame",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 258.852,
        "lastSeen": 263.628,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 267.62,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#photo-container > img:nth-of-type(1)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 267.62,
        "lastSeen": 274.82,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 279.22,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#compensation-card",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 279.22,
        "lastSeen": 285.22,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 287.971,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "h1.dossier-main-title",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 287.971,
        "lastSeen": 294.151,
        "occurrences": 14,
        "heldMs": 6180.000000000007
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 288.62,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "div.dossier-sheet",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 288.62,
        "lastSeen": 292.82,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 296.432,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#mockup-card",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 296.432,
        "lastSeen": 303.068,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 307.268,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#slot-scene-s35 > div:nth-of-type(1)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 307.268,
        "lastSeen": 313.232,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 317.02,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "div.cards-list > div:nth-of-type(1)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 317.02,
        "lastSeen": 322.42,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 326.42,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "div.bg-layer > img:nth-of-type(1)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 326.42,
        "lastSeen": 333.02,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 336.62,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#scene-s38 > div:nth-of-type(1) > div:nth-of-type(2) > img:nth-of-type(1)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 336.62,
        "lastSeen": 340.82,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 344.206,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "div.origin-title",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 344.206,
        "lastSeen": 354.711,
        "occurrences": 21,
        "heldMs": 10504.999999999996
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 344.828,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#origin-node",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 344.828,
        "lastSeen": 352.652,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 356.45,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#media-peel-container > div:nth-of-type(1) > img:nth-of-type(1)",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 356.45,
        "lastSeen": 358.235,
        "occurrences": 2,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 358.235,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "span.highlight-orange",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 358.235,
        "lastSeen": 360.891,
        "occurrences": 7,
        "heldMs": 2656.000000000006
      },
      {
        "code": "text_occluded",
        "severity": "error",
        "time": 363,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "img.bg-img",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 363,
        "lastSeen": 370.16,
        "occurrences": 4,
        "heldMs": 0
      },
      {
        "code": "connector_orphan",
        "severity": "warning",
        "time": 65.728,
        "selector": "#path-pursuit",
        "message": "Connector shaft is visible while both endpoints are not on stage.",
        "rect": {
          "left": 230,
          "top": 960,
          "right": 630,
          "bottom": 1180,
          "width": 400,
          "height": 220
        },
        "containerSelector": "#flow-layer",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 230,
          "y": 960,
          "width": 400,
          "height": 220
        },
        "firstSeen": 65.728,
        "lastSeen": 70.102,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "connector_orphan",
        "severity": "warning",
        "time": 65.728,
        "selector": "#path-escape",
        "message": "Connector shaft is visible while both endpoints are not on stage.",
        "rect": {
          "left": 678,
          "top": 840,
          "right": 880,
          "bottom": 948,
          "width": 202,
          "height": 108
        },
        "containerSelector": "#flow-layer",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 678,
          "y": 840,
          "width": 202,
          "height": 108
        },
        "firstSeen": 65.728,
        "lastSeen": 70.102,
        "occurrences": 3,
        "heldMs": 0
      },
      {
        "code": "rotation_pivot_drift",
        "severity": "warning",
        "time": 123.688,
        "selector": "#orange-target-reticle",
        "dataAttributes": {},
        "sourceFile": "index.html",
        "bbox": {
          "x": 82.805,
          "y": 434.995,
          "width": 804.81,
          "height": 804.81
        },
        "rect": {
          "left": 82.805,
          "top": 434.995,
          "right": 887.615,
          "bottom": 1239.8049999999998,
          "width": 804.81,
          "height": 804.81
        },
        "message": "Rotating element's bounding-box center drifts 338px across rotation — it is not spinning about its own center (check transformOrigin/svgOrigin).",
        "fixHint": "The bounding-box center should stay fixed while the element spins; check its transformOrigin/svgOrigin so rotation pivots about the element's own center rather than a point in a coordinate space it was resized out of.",
        "firstSeen": 123.688,
        "lastSeen": 123.688,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 310.218,
        "selector": "div.doc-sheet.doc-sheet-1 > div:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 249.39,
          "top": 758.31,
          "right": 406.49,
          "bottom": 782.48,
          "width": 157.1,
          "height": 24.17
        },
        "containerSelector": "#stamp-already-considered",
        "text": "KHẮC PHỤC HẬU QUẢ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s35.html",
        "bbox": {
          "x": 249.39,
          "y": 758.31,
          "width": 157.1,
          "height": 24.17
        },
        "firstSeen": 310.218,
        "lastSeen": 310.25,
        "occurrences": 2,
        "heldMs": 31.999999999982265
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 310.218,
        "selector": "div.doc-sheet.doc-sheet-2 > div:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 259.54,
          "top": 754.18,
          "right": 363.53,
          "bottom": 777.34,
          "width": 103.99,
          "height": 23.16
        },
        "containerSelector": "#stamp-already-considered",
        "text": "TÌNH TIẾT MỚI",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s35.html",
        "bbox": {
          "x": 259.54,
          "y": 754.18,
          "width": 103.99,
          "height": 23.16
        },
        "firstSeen": 310.218,
        "lastSeen": 310.25,
        "occurrences": 2,
        "heldMs": 31.999999999982265
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 310.218,
        "selector": "div.doc-sheet.doc-sheet-3 > div:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 265.61,
          "top": 756.55,
          "right": 411.57,
          "bottom": 775.09,
          "width": 145.96,
          "height": 18.54
        },
        "containerSelector": "#stamp-already-considered",
        "text": "BIÊN LAI ĐÓNG TIỀN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s35.html",
        "bbox": {
          "x": 265.61,
          "y": 756.55,
          "width": 145.96,
          "height": 18.54
        },
        "firstSeen": 310.218,
        "lastSeen": 310.25,
        "occurrences": 2,
        "heldMs": 31.999999999982265
      },
      {
        "code": "connector_orphan",
        "severity": "warning",
        "time": 348.74,
        "selector": "#path-left",
        "message": "Connector shaft is visible while its endpoint #card-years is not on stage.",
        "rect": {
          "left": 290,
          "top": 550,
          "right": 540,
          "bottom": 700,
          "width": 250,
          "height": 150
        },
        "containerSelector": "svg.flow-svg",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s27.html",
        "bbox": {
          "x": 290,
          "y": 550,
          "width": 250,
          "height": 150
        },
        "firstSeen": 348.74,
        "lastSeen": 352.652,
        "occurrences": 2,
        "heldMs": 0
      },
      {
        "code": "connector_orphan",
        "severity": "warning",
        "time": 348.74,
        "selector": "#path-right",
        "message": "Connector shaft is visible while its endpoint #card-years is not on stage.",
        "rect": {
          "left": 540,
          "top": 550,
          "right": 790,
          "bottom": 700,
          "width": 250,
          "height": 150
        },
        "containerSelector": "svg.flow-svg",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s27.html",
        "bbox": {
          "x": 540,
          "y": 550,
          "width": 250,
          "height": 150
        },
        "firstSeen": 348.74,
        "lastSeen": 352.652,
        "occurrences": 2,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 2.508,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -104.65,
          "top": -186.04,
          "right": 1184.65,
          "bottom": 2106.06,
          "width": 1289.31,
          "height": 2292.1
        },
        "containerSelector": "#clip-bg",
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
          "left": 104.65,
          "right": 104.65,
          "top": 186.04,
          "bottom": 186.06
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -104.65,
          "y": -186.04,
          "width": 1289.31,
          "height": 2292.1
        },
        "firstSeen": 2.508,
        "lastSeen": 2.508,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 6.27,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -123.76,
          "top": -220.02,
          "right": 1203.76,
          "bottom": 2140.03,
          "width": 1327.53,
          "height": 2360.05
        },
        "containerSelector": "#clip-bg",
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
          "left": 123.76,
          "right": 123.76,
          "top": 220.02,
          "bottom": 220.03
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -123.76,
          "y": -220.02,
          "width": 1327.53,
          "height": 2360.05
        },
        "firstSeen": 6.27,
        "lastSeen": 6.27,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 10.032,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -142.63,
          "top": -253.57,
          "right": 1222.63,
          "bottom": 2173.58,
          "width": 1365.27,
          "height": 2427.15
        },
        "containerSelector": "#clip-bg",
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
          "left": 142.63,
          "right": 142.63,
          "top": 253.57,
          "bottom": 253.58
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -142.63,
          "y": -253.57,
          "width": 1365.27,
          "height": 2427.15
        },
        "firstSeen": 10.032,
        "lastSeen": 10.032,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 20.588,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -31.09,
          "top": -118.75,
          "right": 1182.51,
          "bottom": 2038.75,
          "width": 1213.6,
          "height": 2157.5
        },
        "containerSelector": "div.media-viewport",
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
          "left": 31.09,
          "right": 102.51,
          "top": 118.75,
          "bottom": 118.75
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -31.09,
          "y": -118.75,
          "width": 1213.6,
          "height": 2157.5
        },
        "firstSeen": 20.588,
        "lastSeen": 20.588,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 22.85,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -80.2,
          "top": -134.3,
          "right": 1150.89,
          "bottom": 2054.3,
          "width": 1231.09,
          "height": 2188.61
        },
        "containerSelector": "div.media-viewport",
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
          "left": 80.2,
          "right": 70.89,
          "top": 134.3,
          "bottom": 134.3
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -80.2,
          "y": -134.3,
          "width": 1231.09,
          "height": 2188.61
        },
        "firstSeen": 22.85,
        "lastSeen": 22.85,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 22.85,
        "selector": "#svg-clock-minute",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 637.03,
          "top": 831.68,
          "right": 637.62,
          "bottom": 848.95,
          "width": 0.59,
          "height": 17.27
        },
        "containerSelector": "#clock-badge > svg:nth-of-type(1)",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 492,
          "top": 782,
          "right": 588,
          "bottom": 878,
          "width": 96,
          "height": 96
        },
        "overflow": {
          "right": 49.62
        },
        "dataAttributes": {
          "data-svg-origin": "100 100"
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 637.03,
          "y": 831.68,
          "width": 0.59,
          "height": 17.27
        },
        "firstSeen": 22.85,
        "lastSeen": 22.85,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 25.112,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -129.6,
          "top": -149.86,
          "right": 1118.99,
          "bottom": 2069.86,
          "width": 1248.59,
          "height": 2219.71
        },
        "containerSelector": "div.media-viewport",
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
          "left": 129.6,
          "right": 38.99,
          "top": 149.86,
          "bottom": 149.86
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -129.6,
          "y": -149.86,
          "width": 1248.59,
          "height": 2219.71
        },
        "firstSeen": 25.112,
        "lastSeen": 25.112,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 67.915,
        "selector": "#escape-beacon",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 1100.28,
          "top": 1049.53,
          "right": 1132.46,
          "bottom": 1081.71,
          "width": 32.18,
          "height": 32.18
        },
        "containerSelector": "#flow-layer",
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
          "right": 52.46
        },
        "dataAttributes": {
          "data-svg-origin": "880 840"
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 1100.28,
          "y": 1049.53,
          "width": 32.18,
          "height": 32.18
        },
        "firstSeen": 67.915,
        "lastSeen": 67.915,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 92.096,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -13.93,
          "top": -24.77,
          "right": 1093.93,
          "bottom": 1944.77,
          "width": 1107.86,
          "height": 1969.54
        },
        "containerSelector": "div.photo-container",
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
          "left": 13.93,
          "right": 13.93,
          "top": 24.77,
          "bottom": 24.77
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -13.93,
          "y": -24.77,
          "width": 1107.86,
          "height": 1969.54
        },
        "firstSeen": 92.096,
        "lastSeen": 92.096,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 94.04,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -37.21,
          "top": -66.14,
          "right": 1117.21,
          "bottom": 1986.14,
          "width": 1154.41,
          "height": 2052.29
        },
        "containerSelector": "div.photo-container",
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
          "left": 37.21,
          "right": 37.21,
          "top": 66.14,
          "bottom": 66.14
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -37.21,
          "y": -66.14,
          "width": 1154.41,
          "height": 2052.29
        },
        "firstSeen": 94.04,
        "lastSeen": 94.04,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 95.984,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -60.05,
          "top": -106.75,
          "right": 1140.05,
          "bottom": 2026.75,
          "width": 1200.1,
          "height": 2133.5
        },
        "containerSelector": "div.photo-container",
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
          "left": 60.05,
          "right": 60.05,
          "top": 106.75,
          "bottom": 106.75
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -60.05,
          "y": -106.75,
          "width": 1200.1,
          "height": 2133.5
        },
        "firstSeen": 95.984,
        "lastSeen": 95.984,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 109.864,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -70.36,
          "top": -125.09,
          "right": 1150.36,
          "bottom": 2045.09,
          "width": 1220.72,
          "height": 2170.18
        },
        "containerSelector": "div.photo-wrapper",
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
          "left": 70.36,
          "right": 70.36,
          "top": 125.09,
          "bottom": 125.09
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -70.36,
          "y": -125.09,
          "width": 1220.72,
          "height": 2170.18
        },
        "firstSeen": 109.864,
        "lastSeen": 109.864,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 113.14,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -54.05,
          "top": -96.1,
          "right": 1134.05,
          "bottom": 2016.1,
          "width": 1188.11,
          "height": 2112.19
        },
        "containerSelector": "div.photo-wrapper",
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
          "left": 54.05,
          "right": 54.05,
          "top": 96.1,
          "bottom": 96.1
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -54.05,
          "y": -96.1,
          "width": 1188.11,
          "height": 2112.19
        },
        "firstSeen": 113.14,
        "lastSeen": 113.14,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 116.416,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -37.85,
          "top": -67.3,
          "right": 1117.85,
          "bottom": 1987.3,
          "width": 1155.71,
          "height": 2054.59
        },
        "containerSelector": "div.photo-wrapper",
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
          "left": 37.85,
          "right": 37.85,
          "top": 67.3,
          "bottom": 67.3
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -37.85,
          "y": -67.3,
          "width": 1155.71,
          "height": 2054.59
        },
        "firstSeen": 116.416,
        "lastSeen": 116.416,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 133.328,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -31.38,
          "top": -172.8,
          "right": 1561.62,
          "bottom": 2092.8,
          "width": 1593,
          "height": 2265.6
        },
        "containerSelector": "div.photo-viewport",
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
          "left": 31.38,
          "right": 481.62,
          "top": 172.8,
          "bottom": 172.8
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -31.38,
          "y": -172.8,
          "width": 1593,
          "height": 2265.6
        },
        "firstSeen": 133.328,
        "lastSeen": 133.328,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 135.485,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -79.59,
          "top": -172.8,
          "right": 1513.41,
          "bottom": 2092.8,
          "width": 1593,
          "height": 2265.6
        },
        "containerSelector": "div.photo-viewport",
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
          "left": 79.59,
          "right": 433.41,
          "top": 172.8,
          "bottom": 172.8
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -79.59,
          "y": -172.8,
          "width": 1593,
          "height": 2265.6
        },
        "firstSeen": 135.485,
        "lastSeen": 135.485,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 137.642,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -127.81,
          "top": -172.8,
          "right": 1465.19,
          "bottom": 2092.8,
          "width": 1593,
          "height": 2265.6
        },
        "containerSelector": "div.photo-viewport",
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
          "left": 127.81,
          "right": 385.19,
          "top": 172.8,
          "bottom": 172.8
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -127.81,
          "y": -172.8,
          "width": 1593,
          "height": 2265.6
        },
        "firstSeen": 137.642,
        "lastSeen": 137.642,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 140.952,
        "selector": "#camera-zoom",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -83.04,
          "top": -114.2,
          "right": 1163.04,
          "bottom": 2034.2,
          "width": 1246.07,
          "height": 2148.4
        },
        "containerSelector": "#camera-shake",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": -40,
          "top": -40,
          "right": 1120,
          "bottom": 1960,
          "width": 1160,
          "height": 2000
        },
        "overflow": {
          "left": 43.04,
          "right": 43.04,
          "top": 74.2,
          "bottom": 74.2
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": -83.04,
          "y": -114.2,
          "width": 1246.07,
          "height": 2148.4
        },
        "firstSeen": 140.952,
        "lastSeen": 140.952,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 143.76,
        "selector": "#camera-zoom",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -99.45,
          "top": -142.5,
          "right": 1179.45,
          "bottom": 2062.5,
          "width": 1278.9,
          "height": 2205
        },
        "containerSelector": "#camera-shake",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": -40,
          "top": -40,
          "right": 1120,
          "bottom": 1960,
          "width": 1160,
          "height": 2000
        },
        "overflow": {
          "left": 59.45,
          "right": 59.45,
          "top": 102.5,
          "bottom": 102.5
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": -99.45,
          "y": -142.5,
          "width": 1278.9,
          "height": 2205
        },
        "firstSeen": 143.76,
        "lastSeen": 143.76,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 146.568,
        "selector": "#camera-zoom",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -116.04,
          "top": -171.1,
          "right": 1196.04,
          "bottom": 2091.1,
          "width": 1312.08,
          "height": 2262.2
        },
        "containerSelector": "#camera-shake",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": -40,
          "top": -40,
          "right": 1120,
          "bottom": 1960,
          "width": 1160,
          "height": 2000
        },
        "overflow": {
          "left": 76.04,
          "right": 76.04,
          "top": 131.1,
          "bottom": 131.1
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s17.html",
        "bbox": {
          "x": -116.04,
          "y": -171.1,
          "width": 1312.08,
          "height": 2262.2
        },
        "firstSeen": 146.568,
        "lastSeen": 146.568,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 152.23,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -26.52,
          "top": -38.71,
          "right": 1097.11,
          "bottom": 1958.86,
          "width": 1123.63,
          "height": 1997.57
        },
        "containerSelector": "#media-viewport",
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
          "left": 26.52,
          "right": 17.11,
          "top": 38.71,
          "bottom": 38.86
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -26.52,
          "y": -38.71,
          "width": 1123.63,
          "height": 1997.57
        },
        "firstSeen": 152.23,
        "lastSeen": 152.23,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 154.504,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -132.45,
          "top": -193.27,
          "right": 1165.39,
          "bottom": 2114,
          "width": 1297.84,
          "height": 2307.26
        },
        "containerSelector": "#media-viewport",
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
          "left": 132.45,
          "right": 85.39,
          "top": 193.27,
          "bottom": 194
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -132.45,
          "y": -193.27,
          "width": 1297.84,
          "height": 2307.26
        },
        "firstSeen": 154.504,
        "lastSeen": 154.504,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 157.922,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -102.8,
          "top": -93.05,
          "right": 1185.85,
          "bottom": 2197.89,
          "width": 1288.66,
          "height": 2290.94
        },
        "containerSelector": "#bg-photo-wrapper",
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
          "left": 102.8,
          "right": 105.85,
          "top": 93.05,
          "bottom": 277.89
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -102.8,
          "y": -93.05,
          "width": 1288.66,
          "height": 2290.94
        },
        "firstSeen": 157.922,
        "lastSeen": 157.922,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 160.775,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -98.01,
          "top": -104.48,
          "right": 1197.99,
          "bottom": 2199.52,
          "width": 1296,
          "height": 2304
        },
        "containerSelector": "#bg-photo-wrapper",
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
          "left": 98.01,
          "right": 117.99,
          "top": 104.48,
          "bottom": 279.52
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -98.01,
          "y": -104.48,
          "width": 1296,
          "height": 2304
        },
        "firstSeen": 160.775,
        "lastSeen": 160.775,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 163.628,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -146.14,
          "top": -258.93,
          "right": 1199.86,
          "bottom": 2133.97,
          "width": 1346,
          "height": 2392.9
        },
        "containerSelector": "#bg-photo-wrapper",
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
          "left": 146.14,
          "right": 119.86,
          "top": 258.93,
          "bottom": 213.97
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -146.14,
          "y": -258.93,
          "width": 1346,
          "height": 2392.9
        },
        "firstSeen": 163.628,
        "lastSeen": 163.628,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 175.048,
        "selector": "#camera-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -16.31,
          "top": -26.09,
          "right": 1096.31,
          "bottom": 1951.89,
          "width": 1112.62,
          "height": 1977.98
        },
        "containerSelector": "#shot-s21-1",
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
          "left": 16.31,
          "right": 16.31,
          "top": 26.09,
          "bottom": 31.89
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true"
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": -16.31,
          "y": -26.09,
          "width": 1112.62,
          "height": 1977.98
        },
        "firstSeen": 175.048,
        "lastSeen": 175.048,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 176.71,
        "selector": "#camera-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -37.58,
          "top": -60.13,
          "right": 1117.58,
          "bottom": 1993.5,
          "width": 1155.17,
          "height": 2053.63
        },
        "containerSelector": "#shot-s21-1",
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
          "left": 37.58,
          "right": 37.58,
          "top": 60.13,
          "bottom": 73.5
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true"
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": -37.58,
          "y": -60.13,
          "width": 1155.17,
          "height": 2053.63
        },
        "firstSeen": 176.71,
        "lastSeen": 176.71,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 178.372,
        "selector": "#camera-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -51.19,
          "top": -81.91,
          "right": 1131.19,
          "bottom": 2020.11,
          "width": 1182.38,
          "height": 2102.02
        },
        "containerSelector": "#shot-s21-1",
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
          "left": 51.19,
          "right": 51.19,
          "top": 81.91,
          "bottom": 100.11
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true"
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": -51.19,
          "y": -81.91,
          "width": 1182.38,
          "height": 2102.02
        },
        "firstSeen": 178.372,
        "lastSeen": 178.372,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 189.572,
        "selector": "#bg-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -9.67,
          "top": -17.18,
          "right": 1089.67,
          "bottom": 1937.18,
          "width": 1099.33,
          "height": 1954.37
        },
        "containerSelector": "#scene-container",
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
          "left": 9.67,
          "right": 9.67,
          "top": 17.18,
          "bottom": 17.18
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -9.67,
          "y": -17.18,
          "width": 1099.33,
          "height": 1954.37
        },
        "firstSeen": 189.572,
        "lastSeen": 189.572,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 192.185,
        "selector": "#bg-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -24.19,
          "top": -43.01,
          "right": 1104.19,
          "bottom": 1963.01,
          "width": 1128.38,
          "height": 2006.02
        },
        "containerSelector": "#scene-container",
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
          "left": 24.19,
          "right": 24.19,
          "top": 43.01,
          "bottom": 43.01
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -24.19,
          "y": -43.01,
          "width": 1128.38,
          "height": 2006.02
        },
        "firstSeen": 192.185,
        "lastSeen": 192.185,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 194.798,
        "selector": "#bg-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -38.72,
          "top": -68.83,
          "right": 1118.72,
          "bottom": 1988.83,
          "width": 1157.44,
          "height": 2057.66
        },
        "containerSelector": "#scene-container",
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
          "left": 38.72,
          "right": 38.72,
          "top": 68.83,
          "bottom": 68.83
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -38.72,
          "y": -68.83,
          "width": 1157.44,
          "height": 2057.66
        },
        "firstSeen": 194.798,
        "lastSeen": 194.798,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 217.96,
        "selector": "#bg-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -50.65,
          "top": -111.21,
          "right": 1130.65,
          "bottom": 1988.88,
          "width": 1181.3,
          "height": 2100.1
        },
        "containerSelector": "div.bg-photo-wrapper",
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
          "left": 50.65,
          "right": 50.65,
          "top": 111.21,
          "bottom": 68.88
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -50.65,
          "y": -111.21,
          "width": 1181.3,
          "height": 2100.1
        },
        "firstSeen": 217.96,
        "lastSeen": 217.96,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 221.32,
        "selector": "#bg-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -62.05,
          "top": -110.43,
          "right": 1142.05,
          "bottom": 2030.18,
          "width": 1204.09,
          "height": 2140.61
        },
        "containerSelector": "div.bg-photo-wrapper",
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
          "left": 62.05,
          "right": 62.05,
          "top": 110.43,
          "bottom": 110.18
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -62.05,
          "y": -110.43,
          "width": 1204.09,
          "height": 2140.61
        },
        "firstSeen": 221.32,
        "lastSeen": 221.32,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 224.68,
        "selector": "#bg-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -73.39,
          "top": -109.55,
          "right": 1153.39,
          "bottom": 2071.38,
          "width": 1226.77,
          "height": 2180.93
        },
        "containerSelector": "div.bg-photo-wrapper",
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
          "left": 73.39,
          "right": 73.39,
          "top": 109.55,
          "bottom": 151.38
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s09.html",
        "bbox": {
          "x": -73.39,
          "y": -109.55,
          "width": 1226.77,
          "height": 2180.93
        },
        "firstSeen": 224.68,
        "lastSeen": 224.68,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "connector_orphan",
        "severity": "info",
        "time": 233.688,
        "selector": "#path-left",
        "message": "Connector shaft is visible while its endpoint #punch-box is not on stage.",
        "rect": {
          "left": 292,
          "top": 900,
          "right": 536,
          "bottom": 1000,
          "width": 244,
          "height": 100
        },
        "containerSelector": "svg.connector-svg",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s27.html",
        "bbox": {
          "x": 292,
          "y": 900,
          "width": 244,
          "height": 100
        },
        "firstSeen": 233.688,
        "lastSeen": 233.688,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "connector_orphan",
        "severity": "info",
        "time": 233.688,
        "selector": "#path-right",
        "message": "Connector shaft is visible while its endpoint #punch-box is not on stage.",
        "rect": {
          "left": 544,
          "top": 900,
          "right": 788,
          "bottom": 1000,
          "width": 244,
          "height": 100
        },
        "containerSelector": "svg.connector-svg",
        "fixHint": "Show the shaft only after both ends are on, and hide it with the earlier exit. Do not give the line its own clock.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s27.html",
        "bbox": {
          "x": 544,
          "y": 900,
          "width": 244,
          "height": 100
        },
        "firstSeen": 233.688,
        "lastSeen": 233.688,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 237.588,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -35.26,
          "top": -57.67,
          "right": 1115.26,
          "bottom": 1987.7,
          "width": 1150.52,
          "height": 2045.38
        },
        "containerSelector": "div.bg-container",
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
          "left": 35.26,
          "right": 35.26,
          "top": 57.67,
          "bottom": 67.7
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -35.26,
          "y": -57.67,
          "width": 1150.52,
          "height": 2045.38
        },
        "firstSeen": 237.588,
        "lastSeen": 237.588,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 240.9,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -50.44,
          "top": -82.49,
          "right": 1130.44,
          "bottom": 2016.84,
          "width": 1180.87,
          "height": 2099.33
        },
        "containerSelector": "div.bg-container",
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
          "left": 50.44,
          "right": 50.44,
          "top": 82.49,
          "bottom": 96.84
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -50.44,
          "y": -82.49,
          "width": 1180.87,
          "height": 2099.33
        },
        "firstSeen": 240.9,
        "lastSeen": 240.9,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 244.212,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -65.5,
          "top": -107.13,
          "right": 1145.5,
          "bottom": 2045.76,
          "width": 1211,
          "height": 2152.9
        },
        "containerSelector": "div.bg-container",
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
          "left": 65.5,
          "right": 65.5,
          "top": 107.13,
          "bottom": 125.76
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -65.5,
          "y": -107.13,
          "width": 1211,
          "height": 2152.9
        },
        "firstSeen": 244.212,
        "lastSeen": 244.212,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 248.588,
        "selector": "#main-asset",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -40.77,
          "top": -72.48,
          "right": 1120.77,
          "bottom": 1992.48,
          "width": 1161.54,
          "height": 2064.96
        },
        "containerSelector": "#camera-rig",
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
          "left": 40.77,
          "right": 40.77,
          "top": 72.48,
          "bottom": 72.48
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s29.html",
        "bbox": {
          "x": -40.77,
          "y": -72.48,
          "width": 1161.54,
          "height": 2064.96
        },
        "firstSeen": 248.588,
        "lastSeen": 248.588,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 251.84,
        "selector": "#main-asset",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -23.49,
          "top": -41.76,
          "right": 1103.49,
          "bottom": 1961.76,
          "width": 1126.98,
          "height": 2003.52
        },
        "containerSelector": "#camera-rig",
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
          "left": 23.49,
          "right": 23.49,
          "top": 41.76,
          "bottom": 41.76
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s29.html",
        "bbox": {
          "x": -23.49,
          "y": -41.76,
          "width": 1126.98,
          "height": 2003.52
        },
        "firstSeen": 251.84,
        "lastSeen": 251.84,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 255.092,
        "selector": "#main-asset",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -12.96,
          "top": -23.04,
          "right": 1092.96,
          "bottom": 1943.04,
          "width": 1105.92,
          "height": 1966.08
        },
        "containerSelector": "#camera-rig",
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
          "left": 12.96,
          "right": 12.96,
          "top": 23.04,
          "bottom": 23.04
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s29.html",
        "bbox": {
          "x": -12.96,
          "y": -23.04,
          "width": 1105.92,
          "height": 1966.08
        },
        "firstSeen": 255.092,
        "lastSeen": 255.092,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 267.62,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -199.17,
          "top": -155.03,
          "right": 1214.87,
          "bottom": 2075.03,
          "width": 1414.05,
          "height": 2230.06
        },
        "containerSelector": "#photo-container",
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
          "left": 199.17,
          "right": 134.87,
          "top": 155.03,
          "bottom": 155.03
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -199.17,
          "y": -155.03,
          "width": 1414.05,
          "height": 2230.06
        },
        "firstSeen": 267.62,
        "lastSeen": 267.62,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 271.22,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -188.24,
          "top": -180.37,
          "right": 1257.94,
          "bottom": 2100.37,
          "width": 1446.19,
          "height": 2280.75
        },
        "containerSelector": "#photo-container",
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
          "left": 188.24,
          "right": 177.94,
          "top": 180.37,
          "bottom": 180.37
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -188.24,
          "y": -180.37,
          "width": 1446.19,
          "height": 2280.75
        },
        "firstSeen": 271.22,
        "lastSeen": 271.22,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 274.82,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -177.31,
          "top": -205.72,
          "right": 1301.01,
          "bottom": 2125.72,
          "width": 1478.33,
          "height": 2331.44
        },
        "containerSelector": "#photo-container",
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
          "left": 177.31,
          "right": 221.01,
          "top": 205.72,
          "bottom": 205.72
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s18.html",
        "bbox": {
          "x": -177.31,
          "y": -205.72,
          "width": 1478.33,
          "height": 2331.44
        },
        "firstSeen": 274.82,
        "lastSeen": 274.82,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 279.22,
        "selector": "#camera-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -13.23,
          "top": -26.47,
          "right": 1093.23,
          "bottom": 1940.57,
          "width": 1106.46,
          "height": 1967.04
        },
        "containerSelector": "div.camera-viewport",
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
          "left": 13.23,
          "right": 13.23,
          "top": 26.47,
          "bottom": 20.57
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true"
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": -13.23,
          "y": -26.47,
          "width": 1106.46,
          "height": 1967.04
        },
        "firstSeen": 279.22,
        "lastSeen": 279.22,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 279.22,
        "selector": "#play-caption",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "div.compensation-title",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 279.22,
        "lastSeen": 279.22,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 282.22,
        "selector": "#camera-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -30.46,
          "top": -60.94,
          "right": 1110.46,
          "bottom": 1967.35,
          "width": 1140.91,
          "height": 2028.29
        },
        "containerSelector": "div.camera-viewport",
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
          "left": 30.46,
          "right": 30.46,
          "top": 60.94,
          "bottom": 47.35
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true"
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": -30.46,
          "y": -60.94,
          "width": 1140.91,
          "height": 2028.29
        },
        "firstSeen": 282.22,
        "lastSeen": 282.22,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 285.22,
        "selector": "#camera-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -41.04,
          "top": -82.12,
          "right": 1121.04,
          "bottom": 1983.8,
          "width": 1162.08,
          "height": 2065.92
        },
        "containerSelector": "div.camera-viewport",
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
          "left": 41.04,
          "right": 41.04,
          "top": 82.12,
          "bottom": 63.8
        },
        "dataAttributes": {
          "data-layout-allow-overflow": "true"
        },
        "sourceFile": "compositions/scene-s15.html",
        "bbox": {
          "x": -41.04,
          "y": -82.12,
          "width": 1162.08,
          "height": 2065.92
        },
        "firstSeen": 285.22,
        "lastSeen": 285.22,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 317.02,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -8.53,
          "top": -15.17,
          "right": 1088.53,
          "bottom": 1935.17,
          "width": 1097.06,
          "height": 1950.34
        },
        "containerSelector": "div.bg-container",
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
          "left": 8.53,
          "right": 8.53,
          "top": 15.17,
          "bottom": 15.17
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -8.53,
          "y": -15.17,
          "width": 1097.06,
          "height": 1950.34
        },
        "firstSeen": 317.02,
        "lastSeen": 317.02,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 319.72,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -21.49,
          "top": -38.21,
          "right": 1101.49,
          "bottom": 1958.21,
          "width": 1122.98,
          "height": 1996.42
        },
        "containerSelector": "div.bg-container",
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
          "left": 21.49,
          "right": 21.49,
          "top": 38.21,
          "bottom": 38.21
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -21.49,
          "y": -38.21,
          "width": 1122.98,
          "height": 1996.42
        },
        "firstSeen": 319.72,
        "lastSeen": 319.72,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 322.42,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -34.45,
          "top": -61.25,
          "right": 1114.45,
          "bottom": 1981.25,
          "width": 1148.9,
          "height": 2042.5
        },
        "containerSelector": "div.bg-container",
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
          "left": 34.45,
          "right": 34.45,
          "top": 61.25,
          "bottom": 61.25
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -34.45,
          "y": -61.25,
          "width": 1148.9,
          "height": 2042.5
        },
        "firstSeen": 322.42,
        "lastSeen": 322.42,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 326.42,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -46.49,
          "top": -74.39,
          "right": 1126.49,
          "bottom": 2010.92,
          "width": 1172.99,
          "height": 2085.31
        },
        "containerSelector": "div.bg-layer",
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
          "left": 46.49,
          "right": 46.49,
          "top": 74.39,
          "bottom": 90.92
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -46.49,
          "y": -74.39,
          "width": 1172.99,
          "height": 2085.31
        },
        "firstSeen": 326.42,
        "lastSeen": 326.42,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 329.72,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -35.15,
          "top": -56.25,
          "right": 1115.15,
          "bottom": 1988.75,
          "width": 1150.31,
          "height": 2044.99
        },
        "containerSelector": "div.bg-layer",
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
          "left": 35.15,
          "right": 35.15,
          "top": 56.25,
          "bottom": 68.75
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -35.15,
          "y": -56.25,
          "width": 1150.31,
          "height": 2044.99
        },
        "firstSeen": 329.72,
        "lastSeen": 329.72,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 333.02,
        "selector": "#bg-photo",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -23.81,
          "top": -38.1,
          "right": 1103.81,
          "bottom": 1966.57,
          "width": 1127.63,
          "height": 2004.67
        },
        "containerSelector": "div.bg-layer",
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
          "left": 23.81,
          "right": 23.81,
          "top": 38.1,
          "bottom": 46.57
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -23.81,
          "y": -38.1,
          "width": 1127.63,
          "height": 2004.67
        },
        "firstSeen": 333.02,
        "lastSeen": 333.02,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 336.62,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -68.65,
          "top": -163.37,
          "right": 1195.14,
          "bottom": 2083.37,
          "width": 1263.79,
          "height": 2246.75
        },
        "containerSelector": "#bg-container",
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
          "left": 68.65,
          "right": 115.14,
          "top": 163.37,
          "bottom": 163.37
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -68.65,
          "y": -163.37,
          "width": 1263.79,
          "height": 2246.75
        },
        "firstSeen": 336.62,
        "lastSeen": 336.62,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 338.72,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -106.63,
          "top": -185.55,
          "right": 1182.11,
          "bottom": 2105.55,
          "width": 1288.74,
          "height": 2291.1
        },
        "containerSelector": "#bg-container",
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
          "left": 106.63,
          "right": 102.11,
          "top": 185.55,
          "bottom": 185.55
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -106.63,
          "y": -185.55,
          "width": 1288.74,
          "height": 2291.1
        },
        "firstSeen": 338.72,
        "lastSeen": 338.72,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 340.498,
        "selector": "span.tag-text-victim.hf-text-ink",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 428.97,
          "top": 902.31,
          "right": 651.03,
          "bottom": 974.41,
          "width": 222.06,
          "height": 72.1
        },
        "containerSelector": "span.tag-text-convict.hf-text-ink",
        "text": "NẠN NHÂN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s38.html",
        "bbox": {
          "x": 428.97,
          "y": 902.31,
          "width": 222.06,
          "height": 72.1
        },
        "firstSeen": 340.498,
        "lastSeen": 340.498,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 340.498,
        "selector": "span.tag-text-victim.hf-text-ink",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 428.97,
          "top": 902.31,
          "right": 651.03,
          "bottom": 974.41,
          "width": 222.06,
          "height": 72.1
        },
        "containerSelector": "span.tag-sub-convict.hf-text-ink",
        "text": "NẠN NHÂN",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s38.html",
        "bbox": {
          "x": 428.97,
          "y": 902.31,
          "width": 222.06,
          "height": 72.1
        },
        "firstSeen": 340.498,
        "lastSeen": 340.498,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 340.82,
        "selector": "#hero-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -144.6,
          "top": -207.72,
          "right": 1169.09,
          "bottom": 2127.72,
          "width": 1313.69,
          "height": 2335.45
        },
        "containerSelector": "#bg-container",
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
          "left": 144.6,
          "right": 89.09,
          "top": 207.72,
          "bottom": 207.72
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": -144.6,
          "y": -207.72,
          "width": 1313.69,
          "height": 2335.45
        },
        "firstSeen": 340.82,
        "lastSeen": 340.82,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 360.02,
        "selector": "#play-caption",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 344.08,
          "top": 447,
          "right": 735.92,
          "bottom": 477,
          "width": 391.84,
          "height": 30
        },
        "containerSelector": "#plate-2",
        "text": "TIẾP DIỄN TOÀN BỘ SỰ VIỆC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s24.html",
        "bbox": {
          "x": 344.08,
          "y": 447,
          "width": 391.84,
          "height": 30
        },
        "firstSeen": 360.02,
        "lastSeen": 360.02,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 363,
        "selector": "#camera-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -43.2,
          "top": -76.8,
          "right": 1123.2,
          "bottom": 1996.8,
          "width": 1166.4,
          "height": 2073.6
        },
        "containerSelector": "#shot-1-bg",
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
        "sourceFile": "compositions/scene-s41.html",
        "bbox": {
          "x": -43.2,
          "y": -76.8,
          "width": 1166.4,
          "height": 2073.6
        },
        "firstSeen": 363,
        "lastSeen": 363,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 363,
        "selector": "#clock-minute",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 385.16,
          "top": 825.69,
          "right": 391.75,
          "bottom": 840.1,
          "width": 6.58,
          "height": 14.41
        },
        "containerSelector": "#clock-svg",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 275.44,
          "top": 796,
          "right": 363.44,
          "bottom": 884,
          "width": 88,
          "height": 88
        },
        "overflow": {
          "right": 28.31
        },
        "dataAttributes": {
          "data-svg-origin": "100 100"
        },
        "sourceFile": "compositions/scene-s41.html",
        "bbox": {
          "x": 385.16,
          "y": 825.69,
          "width": 6.58,
          "height": 14.41
        },
        "firstSeen": 363,
        "lastSeen": 363,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 365.685,
        "selector": "#camera-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -27.11,
          "top": -48.19,
          "right": 1107.11,
          "bottom": 1968.19,
          "width": 1134.22,
          "height": 2016.38
        },
        "containerSelector": "#shot-1-bg",
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
          "left": 27.11,
          "right": 27.11,
          "top": 48.19,
          "bottom": 48.19
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s41.html",
        "bbox": {
          "x": -27.11,
          "y": -48.19,
          "width": 1134.22,
          "height": 2016.38
        },
        "firstSeen": 365.685,
        "lastSeen": 365.685,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 368.37,
        "selector": "#camera-wrapper",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -10.8,
          "top": -19.2,
          "right": 1090.8,
          "bottom": 1939.2,
          "width": 1101.6,
          "height": 1958.4
        },
        "containerSelector": "#shot-1-bg",
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
          "left": 10.8,
          "right": 10.8,
          "top": 19.2,
          "bottom": 19.2
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s41.html",
        "bbox": {
          "x": -10.8,
          "y": -19.2,
          "width": 1101.6,
          "height": 1958.4
        },
        "firstSeen": 368.37,
        "lastSeen": 368.37,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 370.16,
    "samples": [
      2.508,
      6.27,
      10.032,
      13.848,
      15.81,
      17.772,
      20.588,
      22.85,
      25.112,
      28.04,
      30.17,
      32.3,
      34.592,
      35.9,
      37.208,
      39.846,
      42.495,
      45.144,
      49.24,
      52.735,
      56.23,
      59.702,
      61.415,
      63.128,
      65.728,
      67.915,
      70.102,
      73.456,
      76.3,
      79.144,
      82.992,
      85.92,
      88.848,
      92.096,
      94.04,
      95.984,
      99.36,
      102.48,
      105.6,
      109.864,
      113.14,
      116.416,
      119.872,
      121.78,
      123.688,
      126.346,
      128.425,
      130.504,
      133.328,
      135.485,
      137.642,
      140.952,
      143.76,
      146.568,
      149.956,
      152.23,
      154.504,
      157.922,
      160.775,
      163.628,
      167.212,
      169.735,
      172.258,
      175.048,
      176.71,
      178.372,
      181.15,
      183.655,
      186.16,
      189.572,
      192.185,
      194.798,
      198.804,
      202.2,
      205.596,
      209.432,
      211.79,
      214.148,
      217.96,
      221.32,
      224.68,
      228.612,
      231.15,
      233.688,
      237.588,
      240.9,
      244.212,
      248.588,
      251.84,
      255.092,
      258.852,
      261.24,
      263.628,
      267.62,
      271.22,
      274.82,
      279.22,
      282.22,
      285.22,
      288.62,
      290.72,
      292.82,
      296.432,
      299.75,
      303.068,
      307.268,
      310.25,
      313.232,
      317.02,
      319.72,
      322.42,
      326.42,
      329.72,
      333.02,
      336.62,
      338.72,
      340.82,
      344.828,
      348.74,
      352.652,
      356.45,
      358.235,
      360.02,
      363,
      365.685,
      368.37,
      370.16
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 97,
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
        "message": "Contrast is 2.89:1; WCAG AA requires 3:1.",
        "text": "HỒ SƠ VỤ ÁN",
        "fg": "rgb(20,20,20)",
        "bg": "rgb(150,74,34)",
        "ratio": 2.89,
        "requiredRatio": 3,
        "suggestedColor": "rgb(178,178,178)",
        "large": true,
        "selector": "div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 112,
          "y": 867.9523315429688,
          "width": 236.1875,
          "height": 45
        },
        "time": 2.508
      }
    ],
    "enabled": true,
    "samples": [
      2.508,
      85.92,
      172.258,
      267.62,
      368.37
    ],
    "checked": 36,
    "passed": 35
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
    "latestVersion": "0.8.91",
    "updateAvailable": true
  }
}


- **2026-09-30T06:36:47.529Z** — `scripts/07-codegen.hf.router.mjs --video=ban-an-301-2025-tphcm --scenes=S24 --issue-file=C:\Users\DTL\AppData\Local\Temp\claude\c--vox-style-xe-giay-v1-hyperframes\9110acf6-dd01-4b61-ad59-98d3bf2c9603\scratchpad\issue-s24-v2.txt` — Codegen HyperFrames scene [S24] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: cx/gpt-6-sol) — đã chuyển đổi thành compositions/scene-s24.html.

- **2026-09-30T06:38:36.803Z** — `scripts/07b-integration-check.hf.mjs --video=ban-an-301-2025-tphcm` — Stage 7b integration check PASS — 41/41 scene, có audio, có caption-track, hyperframes check ok=true (126 mốc/42 shot, 97.8s).

- **2026-09-30T06:53:33.187Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\ban-an-301-2025-tphcm-full.mp4, 375053674 bytes (357.7MB), 895.9s render time, quality=looks. Xác minh ffprobe: duration=370.167s (khớp audio thật 370.160s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=6.3s, browser_probe=1.1s, video_extract=0.0s, audio_process=16.4s, file_server=0.4s, capture_calibration=5.5s, capture_disk=599.0s, encode=234.3s, assemble=19.7s.
