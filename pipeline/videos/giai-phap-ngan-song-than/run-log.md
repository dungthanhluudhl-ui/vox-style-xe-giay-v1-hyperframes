
- **2026-09-25T11:51:19.577Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 623 captions, ghi ra C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\giai-phap-ngan-song-than\transcripts\raw-captions.json

- **2026-09-25T11:52:35.933Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 336 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra C:\vox-style-xe-giay-v1-hyperframes\public\videos\giai-phap-ngan-song-than\captions\captions.json

- **2026-09-25T11:55:46.985Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 6 ảnh + 6 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "flow-02"), phân loại vào public/videos/giai-phap-ngan-song-than/media/{images,videos}/

- **2026-09-25T11:56:29.984Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 12 asset (6 ảnh, 6 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/giai-phap-ngan-song-than/media-analysis/manifest.json

- **2026-09-25T11:57:09.499Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 8 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/giai-phap-ngan-song-than/scene-plan.json + scene-plan.md

- **2026-09-25T11:57:53.590Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 12 shot trên 8 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/giai-phap-ngan-song-than/shotlist.json + shotlist.md

- **2026-09-25T11:59:11.944Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S08` — Codegen HyperFrames scene [S08] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s08.html.

- **2026-09-25T12:00:54.188Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s07

- **2026-09-25T12:02:07.172Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S06` — Codegen HyperFrames scene [S06] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s06

- **2026-09-25T12:02:23.641Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s05

- **2026-09-25T12:02:27.492Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`gsap_css_transform_conflict`**: `#burst-vector-svg` có CSS không có `transform` nhưng tween dùng `transformOrigin: "50% 100%"` inline trong `fromTo` vars — không phải lỗi conflict trực tiếp, tuy nhiên `scaleY` tween trên `#burst-vector-svg` kết hợp với `transformOrigin` đặt trong tween vars là hợp lệ. Tuy nhiên, `#img-06-el` có CSS `transform-origin: 46% 62%` và bị tween `scale` bởi GSAP — đây là conflict tiềm ẩn (`gsap_css_transform_conflict`): CSS `transform-origin` trên element bị GSAP tween transform.
- **`gsap_animates_clip_element`**: `tl.fromTo("#shot-1-content", { scale: 1.15, opacity: 0 }, ...)` — `#shot-1-content` có class `shot1-content` không phải `.clip`, nhưng nó là con trực tiếp của `.clip#shot-1`. Không vi phạm trực tiếp, nhưng `#shot-1-content` không có `data-start` nên không phải clip — OK.
- **`gsap_relative_value_second_writer` / determinism risk**: Camera shake dùng chuỗi `.to("#vid-05", { x: -16, y: 10 ... }).to("#vid-05", { x: 14, y: -12 ... })` — các tween liên tiếp trên cùng element với giá trị tuyệt đối, OK về mặt determinism. Tuy nhiên `#vid-05` đồng thời bị tween `scale` (6.04s, 6.2s) VÀ tween `x/y` shake (7.80s) — hai thuộc tính khác nhau, không conflict.
- **`video_nested_in_timed_element`**: `#vid-05` có `data-start` và là con trực tiếp của `#root` — không bị nest trong timed element khác. OK.
- **Overlay timing mismatch**: Shotlist `S03-1` có `atMs: 22330` (rel: 2.37s) với `holdMs: 1700` → overlay "ĐIỂM YẾU CHÍ MẠNG" kết thúc tại 4.07s. Nhưng shotlist ghi overlay text là **"KHÔNG GIẢM ĐỘNG NĂNG"** tại `atMs: 24500` (rel: 4.54s). Code dùng badge-warning với text "ĐIỂM YẾU CHÍ MẠNG" cho icon warning tại 2.37s — đây là **notes** của shotlist ("icon warning chớp đỏ cam tại cụm từ 'điểm yếu chí mạng'"), không phải overlay text chính thức. Overlay type là `icon` không phải `label` — code render thành badge text thay vì icon đơn thuần, nhưng đây là diễn giải sáng tạo chấp nhận được.
- **`bg-grid` và `bg-spotlight` không có `data-start`**: Là untimed elements, không có `position: absolute; inset: 0` tự động từ runtime — chúng tự có `position: absolute; inset: 0` trong CSS. OK.
- **`window.__timelines = window.__timelines || {}`**: Skill docs nói runtime tạo registry trước scripts, không cần dòng này nhưng không gây lỗi — chấp nhận được.
- **CSS `transform-origin` conflict thực sự**: `#img-06-el` có `transform-origin: 46% 62%` trong CSS, đồng thời bị `tl.fromTo("#img-06-el", { scale: 1.0 }, { scale: 1.14, ... })` — lint sẽ bắt `gsap_css_transform_conflict`. Cần xóa CSS `transform-origin` và đặt vào tween vars (`transformOrigin: "46% 62%"`).
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s03

- **2026-09-25T12:02:40.230Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s04

- **2026-09-25T12:03:13.901Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s02

- **2026-09-25T12:04:00.544Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s01

- **2026-09-25T12:06:08.496Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S06` — Codegen HyperFrames scene [S06] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s06

- **2026-09-25T12:06:28.574Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s04

- **2026-09-25T12:07:32.547Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S05` — Codegen HyperFrames scene [S05] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s05

- **2026-09-25T12:08:28.124Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S02` — Codegen HyperFrames scene [S02] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s02

- **2026-09-25T12:08:44.448Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s01

- **2026-09-25T12:08:44.495Z** — `scripts/run-stages-1-6.mjs --video=giai-phap-ngan-song-than` — Stage 1-6 xong, Stage 7 THẤT BẠI (mã 1) — 8 scene (S01,S02,S03,S04,S05,S06,S07,S08). Xem log ở trên hoặc sửa bằng --issue-file rồi chạy lại đúng scene.

- **2026-09-25T12:16:24.708Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s03

- **2026-09-25T12:25:24.085Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
(chưa qua được verify)
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\giai-phap-ngan-song-than-s07

- **2026-09-25T12:33:17.944Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-25T12:35:33.809Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-25T12:37:43.207Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-25T12:39:39.511Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-25T12:41:08.764Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-25T12:43:03.505Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-25T12:44:32.389Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-25T12:45:46.333Z** — `scripts/07b-integration-check.hf.mjs --video=giai-phap-ngan-song-than` — Stage 7b integration check FAIL:
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 97,
    "infoCount": 0,
    "findings": [
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"7.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.340000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.290000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"12.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.110000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"15.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"15.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"16.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.570000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.790000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"31.590000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"32.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"33.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.490000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.740000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"37.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"39.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.120000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"41.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"42.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.970000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"44.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.090000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"49.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"49.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"51.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.990000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.470000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"57.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"58.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"63.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.530000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.130000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.010000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"67.710000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"68.130000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"68.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"69.600000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"70.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"71.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"72.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"73.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"74.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
        "bbox": {
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
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 54.44s and 54.53s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
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
        "message": "This HTML composition file has 407 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\caption-track.html",
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
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"vid-05\"> has data-start=\"6.04\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#vid-05",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s03.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"6.04\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 331 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s03.html",
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
        "message": "This HTML composition file has 304 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s04.html",
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
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"shot-2-video\"> has data-start=\"4.71\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#shot-2-video",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"4.71\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#punch-phrase-1 .punch-box\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#punch-phrase-1 .punch-box",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#punch-phrase-1 .punch-box\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "gsap_repeated_fromto_without_baseline",
        "severity": "warning",
        "message": "2 tl.fromTo() calls target \"#vector-overlay-shot2 .reversal-card\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#vector-overlay-shot2 .reversal-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s06.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#vector-overlay-shot2 .reversal-card\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 318 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s06.html",
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
        "message": "<section data-start=\"0\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\giai-phap-ngan-song-than\\compositions\\scene-s08.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      }
    ],
    "filesScanned": 10
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
    "errorCount": 2,
    "warningCount": 2,
    "infoCount": 10,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 32.967,
        "selector": "#footer-note > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 60,
          "top": 1463.5,
          "right": 387.08,
          "bottom": 1487.5,
          "width": 327.08,
          "height": 24
        },
        "containerSelector": "span.word.active",
        "text": "MÔ HÌNH VẬT LÝ THỦY ĐỘNG LỰC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 60,
          "y": 1463.5,
          "width": 327.08,
          "height": 24
        },
        "firstSeen": 32.967,
        "lastSeen": 33.841,
        "occurrences": 3,
        "heldMs": 874.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 39.46,
        "selector": "#footer-note > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 60,
          "top": 1463.5,
          "right": 387.08,
          "bottom": 1487.5,
          "width": 327.08,
          "height": 24
        },
        "containerSelector": "[data-start=\"39.240000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "MÔ HÌNH VẬT LÝ THỦY ĐỘNG LỰC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 60,
          "y": 1463.5,
          "width": 327.08,
          "height": 24
        },
        "firstSeen": 39.46,
        "lastSeen": 40.085,
        "occurrences": 6,
        "heldMs": 625
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 33.092,
        "selector": "#footer-note > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 60,
          "top": 1463.5,
          "right": 387.08,
          "bottom": 1487.5,
          "width": 327.08,
          "height": 24
        },
        "containerSelector": "[data-start=\"32.850000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "MÔ HÌNH VẬT LÝ THỦY ĐỘNG LỰC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 60,
          "y": 1463.5,
          "width": 327.08,
          "height": 24
        },
        "firstSeen": 33.092,
        "lastSeen": 33.591,
        "occurrences": 5,
        "heldMs": 499.00000000000233
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 33.966,
        "selector": "#footer-note > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 60,
          "top": 1463.5,
          "right": 387.08,
          "bottom": 1487.5,
          "width": 327.08,
          "height": 24
        },
        "containerSelector": "[data-start=\"33.650000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "MÔ HÌNH VẬT LÝ THỦY ĐỘNG LỰC",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 60,
          "y": 1463.5,
          "width": 327.08,
          "height": 24
        },
        "firstSeen": 33.966,
        "lastSeen": 34.465,
        "occurrences": 5,
        "heldMs": 499.00000000000233
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 4.156,
        "selector": "div.warning-badge-title",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 334.13,
          "top": 920.86,
          "right": 745.87,
          "bottom": 966.66,
          "width": 411.74,
          "height": 45.8
        },
        "containerSelector": "#slot-scene-s01 > div:nth-of-type(1) > div:nth-of-type(3)",
        "text": "THẤT BẠI KỸ THUẬT",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 334.13,
          "y": 920.86,
          "width": 411.74,
          "height": 45.8
        },
        "firstSeen": 4.156,
        "lastSeen": 4.156,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 4.156,
        "selector": "div.warning-badge-desc",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 339.98,
          "top": 974.3,
          "right": 740.01,
          "bottom": 1005.79,
          "width": 400.03,
          "height": 31.49
        },
        "containerSelector": "#slot-scene-s01 > div:nth-of-type(1) > div:nth-of-type(3)",
        "text": "NGUY CƠ NGẬP LỤT TĂNG CAO",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 339.98,
          "y": 974.3,
          "width": 400.03,
          "height": 31.49
        },
        "firstSeen": 4.156,
        "lastSeen": 4.156,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 4.156,
        "selector": "#vid-03",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -60.48,
          "top": -109.53,
          "right": 1140.48,
          "bottom": 2025.51,
          "width": 1200.96,
          "height": 2135.04
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
          "left": 60.48,
          "right": 60.48,
          "top": 109.53,
          "bottom": 105.51
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "5.2",
          "data-track-index": "0",
          "data-media-start": "1.5",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -60.48,
          "y": -109.53,
          "width": 1200.96,
          "height": 2135.04
        },
        "firstSeen": 4.156,
        "lastSeen": 4.156,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 12.467,
        "selector": "#shot-1-camera",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -89.46,
          "top": -144,
          "right": 1152.54,
          "bottom": 2064,
          "width": 1242,
          "height": 2208
        },
        "containerSelector": "#shot-1-unfold",
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
          "left": 89.46,
          "right": 72.54,
          "top": 144,
          "bottom": 144
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -89.46,
          "y": -144,
          "width": 1242,
          "height": 2208
        },
        "firstSeen": 12.467,
        "lastSeen": 12.467,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 32.343,
        "selector": "div.diagram-caption-tag",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 233.67,
          "top": 1406.89,
          "right": 450.4,
          "bottom": 1518.96,
          "width": 216.73,
          "height": 112.07
        },
        "containerSelector": "span.word.active",
        "text": "MẶT CẮT: SEAWALL RAMP FAILURE",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 233.67,
          "y": 1406.89,
          "width": 216.73,
          "height": 112.07
        },
        "firstSeen": 32.343,
        "lastSeen": 32.343,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 37.4,
        "selector": "#footer-note > span:nth-of-type(1)",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 60,
          "top": 1463.5,
          "right": 387.08,
          "bottom": 1487.5,
          "width": 327.08,
          "height": 24
        },
        "containerSelector": "[data-start=\"36.740000\"] > div:nth-of-type(1)",
        "text": "MÔ HÌNH VẬT LÝ THỦY ĐỘNG LỰC",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 0.33,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 60,
          "y": 1463.5,
          "width": 327.08,
          "height": 24
        },
        "firstSeen": 37.4,
        "lastSeen": 37.4,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 45.711,
        "selector": "#camera-rig",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -27.5,
          "top": -44.45,
          "right": 1102.5,
          "bottom": 1964.45,
          "width": 1130,
          "height": 2008.9
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
          "left": 27.5,
          "right": 22.5,
          "top": 44.45,
          "bottom": 44.45
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": -27.5,
          "y": -44.45,
          "width": 1130,
          "height": 2008.9
        },
        "firstSeen": 45.711,
        "lastSeen": 45.711,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 54.022,
        "selector": "#old-wall-badge > text:nth-of-type(1)",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 619.65,
          "top": 610.49,
          "right": 807.3,
          "bottom": 634.28,
          "width": 187.65,
          "height": 23.79
        },
        "containerSelector": "#slot-scene-s06 > div:nth-of-type(1) > div:nth-of-type(1)",
        "text": "KÈ CŨ (TRÀN ĐỈNH)",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": 619.65,
          "y": 610.49,
          "width": 187.65,
          "height": 23.79
        },
        "firstSeen": 54.022,
        "lastSeen": 54.022,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "text_occluded",
        "severity": "info",
        "time": 54.022,
        "selector": "#parabol-angle-marker > text:nth-of-type(1)",
        "message": "Text is hidden beneath an opaque element.",
        "rect": {
          "left": 476.87,
          "top": 682.85,
          "right": 527.79,
          "bottom": 710.61,
          "width": 50.93,
          "height": 27.76
        },
        "containerSelector": "#slot-scene-s06 > div:nth-of-type(1) > div:nth-of-type(1)",
        "text": "180°",
        "fixHint": "Give the text its own zone, raise its stacking order above the covering element, or mark intentional layering with data-layout-allow-occlusion.",
        "coveredFraction": 1,
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": 476.87,
          "y": 682.85,
          "width": 50.93,
          "height": 27.76
        },
        "firstSeen": 54.022,
        "lastSeen": 54.022,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 70.644,
        "selector": "#hero-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 17.79,
          "top": 278.71,
          "right": 1062.21,
          "bottom": 1301.29,
          "width": 1044.43,
          "height": 1022.58
        },
        "containerSelector": "div.hero-image-wrapper",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 62,
          "top": 322,
          "right": 1018,
          "bottom": 1258,
          "width": 956,
          "height": 936
        },
        "overflow": {
          "left": 44.21,
          "right": 44.21,
          "top": 43.29,
          "bottom": 43.29
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s08.html",
        "bbox": {
          "x": 17.79,
          "y": 278.71,
          "width": 1044.43,
          "height": 1022.58
        },
        "firstSeen": 70.644,
        "lastSeen": 70.644,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 74.8,
    "samples": [
      4.156,
      12.467,
      20.778,
      29.089,
      37.4,
      45.711,
      54.022,
      62.333,
      70.644,
      74.8
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 14,
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
    "warningCount": 4,
    "infoCount": 0,
    "findings": [
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.34:1; WCAG AA requires 3:1.",
        "text": "THẤT BẠI KỸ THUẬT",
        "fg": "rgb(255,106,26)",
        "bg": "rgb(104,134,154)",
        "ratio": 1.34,
        "requiredRatio": 3,
        "suggestedColor": "rgb(97,40,10)",
        "large": true,
        "selector": "div > div:nth-of-type(1) > div > div:nth-of-type(7) > div > div:nth-of-type(2)",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": 334.13134765625,
          "y": 920.8628540039062,
          "width": 411.7373046875,
          "height": 45.8016357421875
        },
        "time": 4.156
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.05:1; WCAG AA requires 3:1.",
        "text": "90°",
        "fg": "rgb(247,244,236)",
        "bg": "rgb(241,238,242)",
        "ratio": 1.05,
        "requiredRatio": 3,
        "suggestedColor": "rgb(139,138,133)",
        "large": true,
        "selector": "div > div:nth-of-type(3) > div > section:nth-of-type(1) > div > svg > text",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 345.1820068359375,
          "y": 727.465576171875,
          "width": 89.8304443359375,
          "height": 59.886962890625
        },
        "time": 20.778
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.17:1; WCAG AA requires 3:1.",
        "text": "KÈ CŨ (TRÀN ĐỈNH)",
        "fg": "rgb(247,244,236)",
        "bg": "rgb(231,227,217)",
        "ratio": 1.17,
        "requiredRatio": 3,
        "suggestedColor": "rgb(131,129,125)",
        "large": true,
        "selector": "div > div:nth-of-type(6) > div > section > div > div > svg > g:nth-of-type(1) > text",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": 619.65283203125,
          "y": 610.4869384765625,
          "width": 188.0404052734375,
          "height": 23.79132080078125
        },
        "time": 54.022
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.17:1; WCAG AA requires 3:1.",
        "text": "180°",
        "fg": "rgb(247,244,236)",
        "bg": "rgb(231,227,217)",
        "ratio": 1.17,
        "requiredRatio": 3,
        "suggestedColor": "rgb(131,129,125)",
        "large": true,
        "selector": "div > div:nth-of-type(6) > div > section > div > div > svg > g:nth-of-type(2) > text",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s06.html",
        "bbox": {
          "x": 476.8663024902344,
          "y": 682.8521728515625,
          "width": 50.928253173828125,
          "height": 27.75653076171875
        },
        "time": 54.022
      }
    ],
    "enabled": true,
    "samples": [
      4.156,
      20.778,
      37.4,
      54.022,
      70.644
    ],
    "checked": 43,
    "passed": 39
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
    "latestVersion": "0.8.75",
    "updateAvailable": true
  }
}


- **2026-09-25T12:49:31.515Z** — `scripts/07-codegen.hf.router.mjs --video=giai-phap-ngan-song-than --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-25T12:50:16.611Z** — `scripts/07b-integration-check.hf.mjs --video=giai-phap-ngan-song-than` — Stage 7b integration check PASS — 8/8 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-25T12:51:11.633Z** — `scripts/07b-integration-check.hf.mjs --video=giai-phap-ngan-song-than` — Stage 7b integration check PASS — 8/8 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-25T12:54:54.336Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\giai-phap-ngan-song-than-full.mp4, 99318851 bytes (94.7MB), 222.1s render time, quality=looks. Xác minh ffprobe: duration=74.800s (khớp audio thật 75.117s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.9s, browser_probe=0.7s, video_extract=6.2s, audio_process=3.7s, file_server=0.5s, capture_calibration=3.6s, capture_disk=127.9s, encode=56.5s, assemble=4.2s.

- **2026-09-25T14:42:25.827Z** — qa-blank-frame-audit: 8 scene kiểm tra, 1 bị flag (S06) — report tại `C:\vox-style-xe-giay-v1-hyperframes\pipeline\videos\giai-phap-ngan-song-than\contact-sheet\report.md`
