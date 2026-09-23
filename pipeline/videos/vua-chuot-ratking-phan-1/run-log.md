
- **2026-09-23T09:50:38.847Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp (model=medium, lang=vi) -> 252 captions, ghi ra pipeline/videos/vua-chuot-ratking-phan-1/transcripts/raw-captions.json

- **2026-09-23T09:51:08.457Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 172 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/vua-chuot-ratking-phan-1/captions/captions.json

- **2026-09-23T09:56:28.149Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 5 ảnh + 5 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/vua-chuot-ratking-phan-1/media/{images,videos}/

- **2026-09-23T09:57:14.107Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 10 asset (5 ảnh, 5 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/vua-chuot-ratking-phan-1/media-analysis/manifest.json

- **2026-09-23T09:58:33.649Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 4 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/vua-chuot-ratking-phan-1/scene-plan.json + scene-plan.md

- **2026-09-23T09:59:15.385Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 10 shot trên 4 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/vua-chuot-ratking-phan-1/shotlist.json + shotlist.md

- **2026-09-23T10:00:41.348Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 10 shot trên 4 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/vua-chuot-ratking-phan-1/shotlist.json + shotlist.md

- **2026-09-23T10:04:08.550Z** — `scripts/07-codegen.hf.router.mjs --video=vua-chuot-ratking-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-23T10:04:24.960Z** — `scripts/07-codegen.hf.router.mjs --video=vua-chuot-ratking-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-23T10:04:44.800Z** — `scripts/07-codegen.hf.router.mjs --video=vua-chuot-ratking-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-23T10:07:01.280Z** — `scripts/07-codegen.hf.router.mjs --video=vua-chuot-ratking-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`gsap_css_transform_conflict` trên `#vid-03`**: CSS class `.collage-media` không set transform, nhưng tween `pan camera` dùng `tl.to("#vid-03", { x: -20, ... }, 0.1)` chạy song song với `tl.fromTo("#vid-03", { x: 20 }, { ... }, 0.1)` — hai tween cùng ghi `x` trên cùng phần tử tại cùng thời điểm (cả hai bắt đầu tại `0.1`). GSAP overwrite behavior không tất định khi seek ngược, gây desync. Cần gộp pan vào `fromTo` duy nhất hoặc đặt pan bắt đầu sau khi entrance kết thúc (`0.85`).
- **`width` tween trên `#meter-fill`** (`width: "12%" → "88%"`): `width` là layout property, bị cấm trong allowlist GSAP của HyperFrames (gây reflow, không tất định dưới seek song song). Phải dùng `scaleX` với `transformOrigin: "0% 50%"` thay thế.
- **`innerText` tween thiếu `snap` đúng cách**: `{ innerText: 8 }` trong `fromVars` của `fromTo` — GSAP không hỗ trợ `innerText` làm from-value trong `fromTo` theo cách này (chỉ hoạt động với `to()`). Cần dùng `tl.to("#counter-val", { innerText: 32, snap: { innerText: 1 }, duration: 0.65 }, 9.4)` và set giá trị khởi đầu bằng `gsap.set("#counter-val", { innerText: 8 })` tại đúng thời điểm `9.27` trên timeline.
- **`video_nested_in_timed_element` tiềm ẩn**: `<video id="vid-03">` mang `data-start` và là direct child của root — đúng. Tuy nhiên `<figure id="knot-reticle">` cũng mang `data-start` và được đặt chồng lên vùng video — không vi phạm rule nhưng cần kiểm tra `check` về occlusion vì reticle che phủ video đang active.
- **`transformOrigin` set trong `fromVars` của `fromTo`** (`transformOrigin: "0% 0%"` trên `#vid-03` và `"50% 50%"` trên `#img-02`): `transformOrigin` trong `fromVars` không được GSAP xử lý đúng — phải set bằng `gsap.set()` trước timeline hoặc đặt trong `toVars`, không phải `fromVars`.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\vua-chuot-ratking-phan-1-s04

- **2026-09-23T10:08:46.627Z** — `scripts/07-codegen.hf.router.mjs --video=vua-chuot-ratking-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 1 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-23T10:09:36.740Z** — `scripts/07b-integration-check.hf.mjs --video=vua-chuot-ratking-phan-1` — Stage 7b integration check FAIL:
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 50,
    "infoCount": 0,
    "findings": [
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-ch

- **2026-09-23T10:11:11.850Z** — `scripts/07b-integration-check.hf.mjs --video=vua-chuot-ratking-phan-1` — Stage 7b integration check FAIL:
hyperframes check FAILED (nội dung):
{
  "ok": false,
  "strict": false,
  "lint": {
    "ok": true,
    "errorCount": 0,
    "warningCount": 50,
    "infoCount": 0,
    "findings": [
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"0.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.240000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"4.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.230000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"7.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.270000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.030000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.640000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"12.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.330000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.950000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"15.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"16.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"17.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.370000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.830000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.960000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"22.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.450000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.070000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.730000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.320000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.910000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.650000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.500000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"31.170000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
        "bbox": {
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
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 10.52s and 10.69s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
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
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 13.68s and 13.85s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\caption-track.html",
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
        "message": "2 tl.fromTo() calls target \"#img-05-media\" with no stable baseline. The last-authored fromTo \"from\" values become the element's resting state for any seek before the first tween actually runs, because GSAP applies fromTo from-values at authoring time (immediateRender), not at tween position.",
        "selector": "#img-05-media",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\scene-s01.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add `immediateRender: false` to the destination vars of each future fromTo, or set a safe resting state with an earlier `tl.set(\"#img-05-media\", { ... }, 0)`. Pre-first-tween seeks must not inherit whichever fromTo call happened to author last."
      },
      {
        "code": "nested_media_start_basis_ambiguous",
        "severity": "warning",
        "message": "<video id=\"vid-05-media\"> has data-start=\"5.66\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#vid-05-media",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\scene-s03.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"5.66\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      },
      {
        "code": "timeline_track_too_dense",
        "severity": "warning",
        "message": "Track 1 has 4 timed elements in this HTML file. Smaller sub-compositions keep timelines easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\scene-s03.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Move coherent scene groups into smaller .html files and mount them from the parent with data-composition-src so the timeline stays easier to inspect, revise, and validate."
      },
      {
        "code": "composition_file_too_large",
        "severity": "warning",
        "message": "This HTML composition file has 306 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\vua-chuot-ratking-phan-1\\compositions\\scene-s04.html",
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
    "filesScanned": 6
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
    "errorCount": 46,
    "warningCount": 34,
    "infoCount": 0,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 10.597,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1473.46,
          "right": 580.28,
          "bottom": 1535.46,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(16) > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1473.46,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 10.597,
        "lastSeen": 11.843,
        "occurrences": 9,
        "heldMs": 1246.0000000000005
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 11.22,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "span.word.active",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 11.22,
        "lastSeen": 31.79,
        "occurrences": 68,
        "heldMs": 17702
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 11.968,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(17) > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 11.968,
        "lastSeen": 12.716,
        "occurrences": 6,
        "heldMs": 747.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 11.968,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(17) > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 11.968,
        "lastSeen": 12.716,
        "occurrences": 6,
        "heldMs": 747.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 12.841,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"12.730000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 12.841,
        "lastSeen": 13.589,
        "occurrences": 6,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 13.713,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 13.713,
        "lastSeen": 32.039,
        "occurrences": 153,
        "heldMs": 18326
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 14.087,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "span.word.active",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 14.087,
        "lastSeen": 31.79,
        "occurrences": 69,
        "heldMs": 14835
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 15.085,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"14.950000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 15.085,
        "lastSeen": 15.708,
        "occurrences": 3,
        "heldMs": 622.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 15.085,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"14.950000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 15.085,
        "lastSeen": 15.708,
        "occurrences": 3,
        "heldMs": 622.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 17.578,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"17.520000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 17.578,
        "lastSeen": 18.326,
        "occurrences": 5,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 17.578,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"17.520000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 17.578,
        "lastSeen": 18.326,
        "occurrences": 5,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 17.578,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"17.520000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 17.578,
        "lastSeen": 18.326,
        "occurrences": 5,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 17.578,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"17.520000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 17.578,
        "lastSeen": 18.326,
        "occurrences": 5,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 19.074,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.000000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 19.074,
        "lastSeen": 19.822,
        "occurrences": 6,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 19.074,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.000000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 19.074,
        "lastSeen": 19.822,
        "occurrences": 6,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 19.074,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.000000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 19.074,
        "lastSeen": 19.822,
        "occurrences": 5,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 19.074,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.000000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 19.074,
        "lastSeen": 19.822,
        "occurrences": 5,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 21.068,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(31) > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 21.068,
        "lastSeen": 21.692,
        "occurrences": 4,
        "heldMs": 623.9999999999987
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 21.068,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(31) > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 21.068,
        "lastSeen": 21.692,
        "occurrences": 4,
        "heldMs": 623.9999999999987
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 21.068,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(31) > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 21.068,
        "lastSeen": 21.692,
        "occurrences": 4,
        "heldMs": 623.9999999999987
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 21.816,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"21.700000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 21.816,
        "lastSeen": 22.44,
        "occurrences": 4,
        "heldMs": 624.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 21.816,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"21.700000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 21.816,
        "lastSeen": 22.44,
        "occurrences": 5,
        "heldMs": 624.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 21.816,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"21.700000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 21.816,
        "lastSeen": 22.44,
        "occurrences": 4,
        "heldMs": 624.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 21.816,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"21.700000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 21.816,
        "lastSeen": 22.44,
        "occurrences": 5,
        "heldMs": 624.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 22.564,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"22.500000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 22.564,
        "lastSeen": 23.312,
        "occurrences": 7,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 22.564,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"22.500000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 22.564,
        "lastSeen": 23.312,
        "occurrences": 4,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 22.564,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"22.500000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 22.564,
        "lastSeen": 23.312,
        "occurrences": 4,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 23.437,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"23.380000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 23.437,
        "lastSeen": 24.185,
        "occurrences": 6,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 23.437,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"23.380000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 23.437,
        "lastSeen": 24.185,
        "occurrences": 6,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 23.437,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"23.380000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 23.437,
        "lastSeen": 24.185,
        "occurrences": 6,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 23.437,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"23.380000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 23.437,
        "lastSeen": 24.185,
        "occurrences": 6,
        "heldMs": 747.9999999999975
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 24.808,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"24.720000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 24.808,
        "lastSeen": 25.432,
        "occurrences": 4,
        "heldMs": 623.9999999999987
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 24.808,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"24.720000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 24.808,
        "lastSeen": 25.432,
        "occurrences": 4,
        "heldMs": 623.9999999999987
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 24.808,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"24.720000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 24.808,
        "lastSeen": 25.432,
        "occurrences": 4,
        "heldMs": 623.9999999999987
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 24.808,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"24.720000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 24.808,
        "lastSeen": 25.432,
        "occurrences": 4,
        "heldMs": 623.9999999999987
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 26.18,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"26.070000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 26.18,
        "lastSeen": 26.699,
        "occurrences": 5,
        "heldMs": 519.0000000000019
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 26.18,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"26.070000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 26.18,
        "lastSeen": 26.699,
        "occurrences": 4,
        "heldMs": 519.0000000000019
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 26.18,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"26.070000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 26.18,
        "lastSeen": 26.699,
        "occurrences": 5,
        "heldMs": 519.0000000000019
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 26.18,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"26.070000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 26.18,
        "lastSeen": 26.699,
        "occurrences": 4,
        "heldMs": 519.0000000000019
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 29.047,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"29.000000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 29.047,
        "lastSeen": 29.795,
        "occurrences": 7,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 29.047,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"29.000000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 29.047,
        "lastSeen": 29.795,
        "occurrences": 7,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 30.543,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"30.500000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 30.543,
        "lastSeen": 31.166,
        "occurrences": 5,
        "heldMs": 623.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 30.543,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"30.500000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 30.543,
        "lastSeen": 31.166,
        "occurrences": 5,
        "heldMs": 623.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 30.543,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"30.500000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 30.543,
        "lastSeen": 31.166,
        "occurrences": 5,
        "heldMs": 623.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 31.291,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"31.170000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 31.291,
        "lastSeen": 32.039,
        "occurrences": 5,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 31.291,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"31.170000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 31.291,
        "lastSeen": 32.039,
        "occurrences": 5,
        "heldMs": 748.0000000000011
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 13.713,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(20) > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 13.713,
        "lastSeen": 14.212,
        "occurrences": 4,
        "heldMs": 499.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 13.713,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1477.02,
          "right": 606.16,
          "bottom": 1539.02,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(20) > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1477.02,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 13.713,
        "lastSeen": 14.212,
        "occurrences": 5,
        "heldMs": 499.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 13.713,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1477.02,
          "right": 606.16,
          "bottom": 1539.02,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(20) > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1477.02,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 13.713,
        "lastSeen": 14.212,
        "occurrences": 4,
        "heldMs": 499.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 14.461,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"14.330000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 14.461,
        "lastSeen": 14.96,
        "occurrences": 4,
        "heldMs": 499.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 14.461,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"14.330000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 14.461,
        "lastSeen": 14.96,
        "occurrences": 4,
        "heldMs": 499.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 14.461,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"14.330000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 14.461,
        "lastSeen": 14.96,
        "occurrences": 5,
        "heldMs": 499.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 15.833,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"15.730000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 15.833,
        "lastSeen": 16.331,
        "occurrences": 5,
        "heldMs": 497.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 15.833,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"15.730000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 15.833,
        "lastSeen": 16.082,
        "occurrences": 4,
        "heldMs": 249.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 15.833,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"15.730000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 15.833,
        "lastSeen": 16.331,
        "occurrences": 5,
        "heldMs": 497.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 15.833,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"15.730000\"] > div:nth-of-type(1) > span:nth-of-type(4)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 15.833,
        "lastSeen": 16.082,
        "occurrences": 4,
        "heldMs": 249.00000000000057
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 15.833,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"15.730000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 15.833,
        "lastSeen": 16.331,
        "occurrences": 5,
        "heldMs": 497.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 15.833,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"15.730000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 15.833,
        "lastSeen": 16.331,
        "occurrences": 5,
        "heldMs": 497.9999999999993
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 16.456,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"16.320000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 16.456,
        "lastSeen": 16.83,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 16.456,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"16.320000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 16.456,
        "lastSeen": 16.83,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 16.456,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"16.320000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 16.456,
        "lastSeen": 16.83,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 16.456,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"16.320000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 16.456,
        "lastSeen": 16.83,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 16.954,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"16.860000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 16.954,
        "lastSeen": 17.453,
        "occurrences": 4,
        "heldMs": 498.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 16.954,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"16.860000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 16.954,
        "lastSeen": 17.453,
        "occurrences": 4,
        "heldMs": 498.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 16.954,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"16.860000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 16.954,
        "lastSeen": 17.079,
        "occurrences": 2,
        "heldMs": 125
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 18.45,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"18.370000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 18.45,
        "lastSeen": 18.949,
        "occurrences": 5,
        "heldMs": 499.00000000000233
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 18.45,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"18.370000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 18.45,
        "lastSeen": 18.949,
        "occurrences": 3,
        "heldMs": 499.00000000000233
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 18.45,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"18.370000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 18.45,
        "lastSeen": 18.949,
        "occurrences": 5,
        "heldMs": 499.00000000000233
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 18.45,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"18.370000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 18.45,
        "lastSeen": 18.949,
        "occurrences": 3,
        "heldMs": 499.00000000000233
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 19.946,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.830000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 19.946,
        "lastSeen": 20.32,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 19.946,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.830000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 19.946,
        "lastSeen": 20.32,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 19.946,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.830000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 19.946,
        "lastSeen": 20.32,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 19.946,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"19.830000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 19.946,
        "lastSeen": 20.32,
        "occurrences": 3,
        "heldMs": 373.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 20.445,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"20.370000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 20.445,
        "lastSeen": 20.944,
        "occurrences": 4,
        "heldMs": 498.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 20.445,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"20.370000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 20.445,
        "lastSeen": 20.944,
        "occurrences": 4,
        "heldMs": 498.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 20.445,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"20.370000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 20.445,
        "lastSeen": 20.944,
        "occurrences": 4,
        "heldMs": 498.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 20.445,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"20.370000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 20.445,
        "lastSeen": 20.944,
        "occurrences": 4,
        "heldMs": 498.99999999999875
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 24.31,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"24.180000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 24.31,
        "lastSeen": 24.684,
        "occurrences": 3,
        "heldMs": 374.00000000000233
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 24.31,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(15) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 499.72,
          "top": 1471.75,
          "right": 580.28,
          "bottom": 1533.75,
          "width": 80.56,
          "height": 62
        },
        "containerSelector": "[data-start=\"24.180000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "ấy.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "10520",
          "data-to-ms": "10520"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 499.72,
          "y": 1471.75,
          "width": 80.56,
          "height": 62
        },
        "firstSeen": 24.31,
        "lastSeen": 24.684,
        "occurrences": 3,
        "heldMs": 374.00000000000233
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 24.31,
        "selector": "#slot-caption-track > div:nth-of-type(1) > div:nth-of-type(19) > div:nth-of-type(1) > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 473.84,
          "top": 1471.75,
          "right": 606.16,
          "bottom": 1533.75,
          "width": 132.32,
          "height": 62
        },
        "containerSelector": "[data-start=\"24.180000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "King.",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {
          "data-from-ms": "13680",
          "data-to-ms": "13680"
        },
        "sourceFile": "compositions/caption-track.html",
        "bbox": {
          "x": 473.84,
          "y": 1471.75,
          "width": 132.32,
          "height": 62
        },
        "firstSeen": 24.31,
        "lastSeen": 24.684,
        "occurrences": 3,
        "heldMs": 374.00000000000233
      }
    ],
    "duration": 32.039,
    "samples": [
      1.78,
      5.34,
      8.9,
      12.46,
      16.02,
      19.579,
      23.139,
      26.699,
      30.259,
      32.039
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 112,
    "truncated": true
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
    "warningCount": 5,
    "infoCount": 0,
    "findings": [
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 2.01:1; WCAG AA requires 3:1.",
        "text": "SỐ LƯỢNG GHI NHẬN THỰC TẾ",
        "fg": "rgb(255,106,26)",
        "bg": "rgb(220,216,206)",
        "ratio": 2.01,
        "requiredRatio": 3,
        "suggestedColor": "rgb(205,85,21)",
        "large": true,
        "selector": "div > div:nth-of-type(4) > div > section:nth-of-type(4) > span",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 173.0041961669922,
          "y": 1300.550537109375,
          "width": 743.2125854492188,
          "height": 22.13037109375
        },
        "time": 30.259
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.29:1; WCAG AA requires 3:1.",
        "text": "3 ĐẾN 8+ CON",
        "fg": "rgb(247,244,236)",
        "bg": "rgb(220,216,206)",
        "ratio": 1.29,
        "requiredRatio": 3,
        "suggestedColor": "rgb(124,122,118)",
        "large": true,
        "selector": "div > div:nth-of-type(4) > div > section:nth-of-type(4) > h1",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 173.0041961669922,
          "y": 1333.7462158203125,
          "width": 743.2125854492188,
          "height": 68.9700927734375
        },
        "time": 30.259
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 2.01:1; WCAG AA requires 3:1.",
        "text": "3",
        "fg": "rgb(255,106,26)",
        "bg": "rgb(220,216,206)",
        "ratio": 2.01,
        "requiredRatio": 3,
        "suggestedColor": "rgb(205,85,21)",
        "large": true,
        "selector": "div > div:nth-of-type(4) > div > section:nth-of-type(4) > h1 > span:nth-of-type(1)",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 173.0041961669922,
          "y": 1328.213623046875,
          "width": 43.98704528808594,
          "height": 79.300537109375
        },
        "time": 30.259
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 2.01:1; WCAG AA requires 3:1.",
        "text": "8",
        "fg": "rgb(255,106,26)",
        "bg": "rgb(220,216,206)",
        "ratio": 2.01,
        "requiredRatio": 3,
        "suggestedColor": "rgb(205,85,21)",
        "large": true,
        "selector": "#counter-val",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 385.966064453125,
          "y": 1328.213623046875,
          "width": 43.72772216796875,
          "height": 79.300537109375
        },
        "time": 30.259
      },
      {
        "code": "contrast_aa_failure",
        "severity": "warning",
        "message": "Contrast is 1.29:1; WCAG AA requires 3:1.",
        "text": "TẬP HỢP THẮT CHẶT THÀNH MỘT KHỐI",
        "fg": "rgb(196,191,180)",
        "bg": "rgb(220,216,206)",
        "ratio": 1.29,
        "requiredRatio": 3,
        "suggestedColor": "rgb(125,122,115)",
        "large": true,
        "selector": "div > div:nth-of-type(4) > div > section:nth-of-type(4) > p",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 173.0041961669922,
          "y": 1411.9373779296875,
          "width": 743.2125854492188,
          "height": 25.8187255859375
        },
        "time": 30.259
      }
    ],
    "enabled": true,
    "samples": [
      1.78,
      8.9,
      16.02,
      23.139,
      30.259
    ],
    "checked": 39,
    "passed": 34
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
    "latestVersion": "0.8.61",
    "updateAvailable": true
  }
}


- **2026-09-23T10:13:49.590Z** — `scripts/07b-integration-check.hf.mjs --video=vua-chuot-ratking-phan-1` — Stage 7b integration check PASS — 4/4 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-23T10:14:28.571Z** — `scripts/07b-integration-check.hf.mjs --video=vua-chuot-ratking-phan-1` — Stage 7b integration check PASS — 4/4 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-23T10:16:40.413Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\vua-chuot-ratking-phan-1-full.mp4, 62906668 bytes (60.0MB), 131.3s render time, quality=looks. Xác minh ffprobe: duration=32.067s (khớp audio thật 32.039s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=6.1s, browser_probe=0.5s, video_extract=3.3s, audio_process=2.3s, file_server=0.4s, capture_calibration=3.7s, capture_disk=76.2s, encode=25.4s, assemble=2.7s.

- **2026-09-23T13:19:12.113Z** — `scripts/07-codegen.hf.router.mjs --video=vua-chuot-ratking-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

  **Ghi chú (2026-09-23):** lần chạy này là TEST regression cho bản vá `verify()` (chặn cờ layout đặt sai trên root, xem `C:\Users\DTL\.claude\plans\h-y-c-c-c-ch-warm-boot.md`) — không phải cập nhật nội dung thật. `compositions/scene-s01.html` bị AI sinh lại đã được KHÔI PHỤC về đúng bản dùng để render `out/vua-chuot-ratking-phan-1-full.mp4` (backup lấy trước khi chạy test) ngay sau đó, kèm chạy lại `syncRootHf()` để ráp lại `index.html` khớp bản gốc. Không có thay đổi nội dung thật nào tồn tại lại sau lần chạy này.

- **2026-09-23T13:25:19.206Z** — `scripts/07b-integration-check.hf.mjs --video=vua-chuot-ratking-phan-1` — Stage 7b integration check FAIL:
Cờ layout đặt sai chỗ trên root: compositions/scene-s02.html (data-layout-allow-overflow); compositions/scene-s03.html (data-layout-allow-overflow); compositions/scene-s04.html (data-layout-allow-overflow) — di chuyển xuống đúng phần tử con cụ thể.
