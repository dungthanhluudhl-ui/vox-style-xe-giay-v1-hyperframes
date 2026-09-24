
- **2026-09-24T11:16:04.158Z** — `scripts/02b-media-generate.router.mjs` — Tạo & tải media qua Google Flow: 8 ảnh + 8 video bằng ag/gemini-3.7-flash-medium (prompt viết bởi ag/gemini-3.7-flash-medium, account "default"), phân loại vào public/videos/tien-viet-nam-phan-1/media/{images,videos}/

- **2026-09-24T11:16:57.239Z** — `scripts/01-audio-transcribe.local.mjs` — Transcribed narration.mp3 bằng whisper.cpp CUDA (model=medium, lang=vi) -> 421 captions, ghi ra pipeline/videos/tien-viet-nam-phan-1/transcripts/raw-captions.json

- **2026-09-24T11:18:27.750Z** — `scripts/03-media-analyze.router.mjs` — Phân tích 16 asset (8 ảnh, 8 video) bằng ag/gemini-3.8-flash-high, chuẩn hoá tên file (img-NN-slug / vid-NN-slug), ghi manifest tại pipeline/videos/tien-viet-nam-phan-1/media-analysis/manifest.json

- **2026-09-24T11:18:41.131Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 348 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/tien-viet-nam-phan-1/captions/captions.json

- **2026-09-24T11:21:19.115Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 284 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/tien-viet-nam-phan-1/captions/captions.json

- **2026-09-24T11:22:52.397Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 7 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/tien-viet-nam-phan-1/scene-plan.json + scene-plan.md

- **2026-09-24T11:24:09.565Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 8 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/tien-viet-nam-phan-1/scene-plan.json + scene-plan.md

- **2026-09-24T11:29:52.693Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 348 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/tien-viet-nam-phan-1/captions/captions.json

- **2026-09-24T11:31:49.544Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 8 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/tien-viet-nam-phan-1/scene-plan.json + scene-plan.md

- **2026-09-24T11:36:55.358Z** — `scripts/02-audio-clean-transcript.router.mjs` — Cleaned 348 captions (mode=align-với-script-gốc) bằng ag/gemini-3.7-flash-medium, ghi ra public/videos/tien-viet-nam-phan-1/captions/captions.json

- **2026-09-24T11:38:30.458Z** — `scripts/05-scene-plan.router.mjs` — Scene Plan: 7 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/tien-viet-nam-phan-1/scene-plan.json + scene-plan.md

- **2026-09-24T11:39:46.448Z** — `scripts/06-shotlist.router.mjs` — Shotlist: 16 shot trên 7 scene bằng ag/gemini-3.8-flash-high, ghi planning/videos/tien-viet-nam-phan-1/shotlist.json + shotlist.md

- **2026-09-24T11:43:34.425Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S04` — Codegen HyperFrames scene [S04] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s04.html.

- **2026-09-24T11:43:55.335Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-24T11:44:02.975Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S06` — Codegen HyperFrames scene [S06] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s06.html.

- **2026-09-24T11:44:15.986Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="vid-07">` có `data-start="0"` nhưng lại nằm trong `#root` (composition root cũng có `data-start="0"`). Theo lint rule, video có `data-start` không được nằm trong element cha cũng có `data-start`. Cần bỏ `data-start`/`data-duration` khỏi thẻ `<video>` và để timing do wrapper div kiểm soát, hoặc bỏ `data-start` khỏi root (root `data-start="0"` là convention nhưng vẫn tạo ra ancestor có `data-start`).
- **`gsap_css_transform_conflict`**: `#vid-07` có CSS `transform-origin: 50% 50%` nhưng không có CSS `transform` ban đầu — tuy nhiên GSAP tween `scale: 2.2 → 1.0` rồi tiếp tục `scale: 1.12` trên cùng element. Vấn đề nghiêm trọng hơn: `#img-01` có CSS `transform-origin: 50% 50%` và GSAP tween `y: -240, scale: 1.06` — nếu CSS có `transform` ban đầu sẽ conflict. Cần dùng `fromTo` với explicit start state thay vì để CSS transform.
- **`gsap_relative_value_second_writer` risk**: `#vid-07` bị tween `scale` hai lần liên tiếp (0→0.7s: `2.2→1.0`, rồi 0.7→4.8s: `→1.12`). Tween thứ hai dùng `tl.to()` không khai báo fromVars — khi seek lẻ frame có thể desync. Nên dùng `fromTo` với `{ scale: 1.0 }` explicit cho tween thứ hai.
- **`lenQ` khai báo trùng**: biến `lenQ` và `lenR` được khai báo hai lần (một lần ở setup SVG ban đầu, một lần trong block `if (qPath)` / `if (risePath)` của timeline) — sẽ gây lỗi `SyntaxError: Identifier 'lenQ' has already been declared` trong strict mode, khiến toàn bộ script không chạy và `window.__timelines["main"]` không được đăng ký (silent failure hoàn toàn).
- **`html, body` hardcode `width: 1080px; height: 1920px`**: theo contract, canvas size do `data-width`/`data-height` trên root quyết định; hardcode px trên `html`/`body` có thể gây layout conflict với runtime.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\tien-viet-nam-phan-1-s01

- **2026-09-24T11:44:23.630Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S02` — Codegen HyperFrames scene [S02] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s02.html.

- **2026-09-24T11:45:56.113Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`video_nested_in_timed_element`**: `<video id="shot1-video" data-start="0" data-duration="4">` nằm bên trong `#shot1` là một phần tử có `data-start` ngầm định (thông qua `tl.set("#shot1", {opacity:0}, 4.0)` — tuy nhiên `#shot1` không có `data-start` attribute trực tiếp nên rule này không trigger). Tuy nhiên video có `data-start="0"` và `data-duration="4"` nhưng **không có `class="clip"`** — lint sẽ warn `timed_element_missing_clip_class`.
- **`brand-bottom-bar` hardcode `width: 1080px`**: vi phạm quy tắc không hardcode pixel width trên phần tử layout — dùng `width: 100%` thay thế.
- **Shot 1 và Shot 2 không có `data-start`/`data-duration`**: `#shot1`, `#shot2` là các timed element được điều khiển bằng `tl.set(...opacity)` nhưng không có `data-start`/`data-duration` attribute — framework không biết đây là clip, visibility không được quản lý đúng, và `#shot2` khởi đầu với `opacity: 0` trong CSS nhưng không có `data-start` nên sẽ hiển thị ngay từ t=0 trước khi GSAP set nó (silent bug: frame render tại t=0 sẽ thấy cả shot2).
- **`gsap_css_transform_conflict` tiềm năng**: `#shot1-card` có CSS không có transform nhưng tween `rotationZ`/`y` — OK. Tuy nhiên `#shot2-camera` không có CSS transform — OK. Không có conflict rõ ràng ở đây.
- **`#shot2` opacity:0 trong CSS nhưng không phải clip**: Vì `#shot2` không có `data-start`, framework không ẩn nó — nó chỉ ẩn nhờ CSS `opacity:0`. Khi render seek đến t=0, GSAP chưa chạy, `#shot2` vẫn `opacity:0` nhờ CSS. Nhưng đây là pattern không đúng contract — nên dùng `data-start`/`data-duration` để framework quản lý visibility.
- **`img-06` không có `data-start`/`data-duration`**: `<img id="shot2-img">` không có timing attributes — không phải vấn đề lớn vì nó nằm trong shot2 layer, nhưng thiếu nhất quán.
- **Overlay zones (`#punch1-zone`, `#label1-zone`, `#label2-zone`, `#question-badge`, `#ban-badge`) không có `data-start`/`data-duration`**: Các overlay này được animate bằng GSAP nhưng không khai báo là clip — `lint` sẽ không warn vì chúng không có `data-start`, nhưng nếu render seek đến giữa chừng, trạng thái opacity phụ thuộc hoàn toàn vào GSAP seek — đây là pattern chấp nhận được nhưng cần đảm bảo `fromTo` được dùng đúng (đã dùng `fromTo` — OK).
- **`window.__timelines = window.__timelines || {}`**: Theo skill doc, runtime tạo registry trước khi script chạy, không cần dòng này — không phải lỗi cứng nhưng thừa.

**Lỗi nghiêm trọng nhất**: `#shot1` và `#shot2` không có `data-start`/`data-duration` — framework không quản lý visibility của chúng, dẫn đến silent render bug khi seek.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\tien-viet-nam-phan-1-s03

- **2026-09-24T11:46:04.584Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] KHÔNG đạt sau 3 lần thử — cần Claude can thiệp. Verdict cuối:
VERDICT: FAIL

ISSUES:
- **`data-layout-allow-overflow="true"` đặt trực tiếp trên `<video id="vid-02">` và `<img id="img-08">`, `<video id="vid-04">`, `<img id="img-04">`**: Các phần tử media này có `data-start` (tức là timed elements), và cờ `data-layout-allow-overflow` trên chúng sẽ tắt layout audit cho toàn bộ subtree của chúng. Tuy nhiên vấn đề nghiêm trọng hơn là: các phần tử `.vox-card` (overlay text) cùng tồn tại song song — nếu card bị overflow thật thì cờ này không che được vì nó nằm trên media element khác, không phải trên card. Cần đánh giá lại: nếu overflow là cố ý (zoom scale vượt khung), đặt cờ trên đúng phần tử gây overflow, không phải trên media element có `data-start` (timed element).
- **`tl.to("#vid-02", ...)` — tween GSAP trực tiếp trên phần tử `<video>` có `data-start`**: Phần tử `<video id="vid-02">` là timed element (có `data-start`). Tween `scale`/`x`/`y` trên chính video element này có thể xung đột với framework visibility management. Đúng hơn nên bọc video trong một wrapper div và tween wrapper đó.
- **`tl.to("#s1-punch", { opacity: 0, ... })` và `tl.to("#s2-label", { opacity: 0, ... })` — tween `opacity` trực tiếp trên `.clip` element**: `#s1-punch` và `#s2-label` đều có `class="clip"` và `data-start`/`data-duration`. Tween `opacity` (và `y`) trực tiếp trên clip element vi phạm rule "never tween a `.clip` with autoAlpha or visibility" — lint sẽ reject với `gsap_animates_clip_element`. Cần animate một child wrapper bên trong thay vì animate chính `.clip`.
- **`tl.to("#vid-02", { scale: 1.02, ... }, 0.06)` — giá trị tương đối ngầm định**: Chuỗi tween `tl.to` liên tiếp trên `#vid-02` dùng `gsap.to()` (không phải `fromTo`) với các giá trị tuyệt đối nhưng phụ thuộc vào state của tween trước — đây là pattern dễ desync khi seek không tuần tự. Nên dùng `fromTo` với endpoint tường minh cho mỗi đoạn.
- **`window.__timelines = window.__timelines || {}` không cần thiết và có thể gây nhầm lẫn**: Theo skill doc, runtime tạo registry trước khi script chạy — dòng này không gây lỗi nhưng là anti-pattern được doc cảnh báo không cần viết.
Project standalone tạm còn giữ tại: C:\vox-style-xe-giay-v1-hyperframes\hyperframes\.gen-tmp\tien-viet-nam-phan-1-s07

- **2026-09-24T11:49:32.660Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S07` — Codegen HyperFrames scene [S07] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s07.html.

- **2026-09-24T11:49:52.775Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S01` — Codegen HyperFrames scene [S01] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s01.html.

- **2026-09-24T11:52:17.896Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S03` — Codegen HyperFrames scene [S03] PASS sau 3 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s03.html.

- **2026-09-24T11:53:52.228Z** — `scripts/07b-integration-check.hf.mjs --video=tien-viet-nam-phan-1` — Stage 7b integration check FAIL:
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
        "message": "<div class=\"caption-page\" data-start=\"0.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"1.760000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"2.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"3.820000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"5.980000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"6.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"7.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"8.440000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"9.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"10.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"11.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"12.860000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"13.660000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"14.380000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"15.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"18.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"19.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"20.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"21.920000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"22.620000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.260000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"23.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"24.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"25.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"26.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"27.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"28.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"29.850000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.080000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"30.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"31.060000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"32.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"34.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"35.140000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"36.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"38.220000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"39.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.020000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"40.700000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
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
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"42.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"42.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"43.580000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"44.180000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"45.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"46.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"47.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"48.100000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"49.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"50.150000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"51.050000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"52.900000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.390000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.510000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.630000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"54.750000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.280000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"55.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"56.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"57.000000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"57.680000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"58.360000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.040000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"59.720000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.400000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"60.800000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"61.480000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.160000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"62.840000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"63.520000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.200000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"64.880000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"65.560000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Add a stable, human-readable id such as id=\"hero-title\" or id=\"scene-1-card\" to every timeline-visible element you want agents or Studio to edit."
      },
      {
        "code": "studio_missing_editable_id",
        "severity": "warning",
        "message": "<div class=\"caption-page\" data-start=\"66.300000\"> has no id, so Studio cannot use a stable edit target for its timeline and canvas controls.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
        "bbox": {
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
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 54.51s and 54.56s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
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
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 54.63s and 54.68s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
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
        "message": "GSAP tweens overlap on \".caption-card\" for opacity, y between 54.75s and 54.80s.",
        "selector": ".caption-card",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
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
        "message": "This HTML composition file has 427 lines. Smaller sub-compositions are easier to read, iterate on, and diff.",
        "selector": "[data-composition-id]",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\caption-track.html",
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
        "message": "<video id=\"vid-04\"> has data-start=\"5.36\" inside a sub-composition. Nested media timing is local to its composition by default; a nonzero value can be confused with a legacy root-global timestamp.",
        "selector": "#vid-04",
        "dataAttributes": {},
        "sourceFile": "C:\\vox-style-xe-giay-v1-hyperframes\\hyperframes\\videos\\tien-viet-nam-phan-1\\compositions\\scene-s07.html",
        "bbox": {
          "x": 0,
          "y": 0,
          "width": 0,
          "height": 0
        },
        "time": 0,
        "fixHint": "Keep data-start=\"5.36\" if it is composition-local. If this is a legacy root-global timestamp, add data-hf-media-start-basis=\"global\"; otherwise convert it to local time by subtracting the host start."
      }
    ],
    "filesScanned": 9
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
    "errorCount": 6,
    "warningCount": 4,
    "infoCount": 7,
    "findings": [
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 43.848,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 129.18,
          "top": 1467.15,
          "right": 644.18,
          "bottom": 1522.95,
          "width": 515,
          "height": 55.8
        },
        "containerSelector": "span.word.active",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 129.18,
          "y": 1467.15,
          "width": 515,
          "height": 55.8
        },
        "firstSeen": 43.848,
        "lastSeen": 45.472,
        "occurrences": 13,
        "heldMs": 1624.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 44.223,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 113.04,
          "top": 1440.06,
          "right": 648.27,
          "bottom": 1498.05,
          "width": 535.23,
          "height": 57.99
        },
        "containerSelector": "[data-start=\"44.180000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 113.04,
          "y": 1440.06,
          "width": 535.23,
          "height": 57.99
        },
        "firstSeen": 44.223,
        "lastSeen": 44.972,
        "occurrences": 5,
        "heldMs": 749.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 44.223,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 113.04,
          "top": 1440.06,
          "right": 648.27,
          "bottom": 1498.05,
          "width": 535.23,
          "height": 57.99
        },
        "containerSelector": "[data-start=\"44.180000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 113.04,
          "y": 1440.06,
          "width": 535.23,
          "height": 57.99
        },
        "firstSeen": 44.223,
        "lastSeen": 44.972,
        "occurrences": 5,
        "heldMs": 749.0000000000023
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 45.097,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 113,
          "top": 1440,
          "right": 648.28,
          "bottom": 1498,
          "width": 535.28,
          "height": 58
        },
        "containerSelector": "[data-start=\"45.000000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 113,
          "y": 1440,
          "width": 535.28,
          "height": 58
        },
        "firstSeen": 45.097,
        "lastSeen": 45.722,
        "occurrences": 4,
        "heldMs": 625
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 45.097,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 113,
          "top": 1440,
          "right": 648.28,
          "bottom": 1498,
          "width": 535.28,
          "height": 58
        },
        "containerSelector": "[data-start=\"45.000000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 113,
          "y": 1440,
          "width": 535.28,
          "height": 58
        },
        "firstSeen": 45.097,
        "lastSeen": 45.722,
        "occurrences": 5,
        "heldMs": 625
      },
      {
        "code": "content_overlap",
        "severity": "error",
        "time": 45.222,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 113,
          "top": 1440,
          "right": 648.28,
          "bottom": 1498,
          "width": 535.28,
          "height": 58
        },
        "containerSelector": "[data-start=\"45.000000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 113,
          "y": 1440,
          "width": 535.28,
          "height": 58
        },
        "firstSeen": 45.222,
        "lastSeen": 45.722,
        "occurrences": 5,
        "heldMs": 500
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 28.607,
        "selector": "#punch-card > span:nth-of-type(1)",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 203.6,
          "top": 256.44,
          "right": 414.72,
          "bottom": 283.46,
          "width": 211.12,
          "height": 27.02
        },
        "containerSelector": "#punch-card > h1:nth-of-type(1)",
        "text": "BIẾN ĐỘNG KINH TẾ",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s04.html",
        "bbox": {
          "x": 203.6,
          "y": 256.44,
          "width": 211.12,
          "height": 27.02
        },
        "firstSeen": 28.607,
        "lastSeen": 28.732,
        "occurrences": 2,
        "heldMs": 125
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 43.848,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 129.18,
          "top": 1467.15,
          "right": 644.18,
          "bottom": 1522.95,
          "width": 515,
          "height": 55.8
        },
        "containerSelector": "[data-start=\"43.580000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 129.18,
          "y": 1467.15,
          "width": 515,
          "height": 55.8
        },
        "firstSeen": 43.848,
        "lastSeen": 44.098,
        "occurrences": 3,
        "heldMs": 250
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 43.973,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 117.23,
          "top": 1447.07,
          "right": 647.21,
          "bottom": 1504.49,
          "width": 529.98,
          "height": 57.42
        },
        "containerSelector": "[data-start=\"43.580000\"] > div:nth-of-type(1) > span:nth-of-type(2)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 117.23,
          "y": 1447.07,
          "width": 529.98,
          "height": 57.42
        },
        "firstSeen": 43.973,
        "lastSeen": 44.098,
        "occurrences": 2,
        "heldMs": 125
      },
      {
        "code": "content_overlap",
        "severity": "warning",
        "time": 44.473,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 113,
          "top": 1440,
          "right": 648.28,
          "bottom": 1498,
          "width": 535.28,
          "height": 58
        },
        "containerSelector": "[data-start=\"44.180000\"] > div:nth-of-type(1) > span:nth-of-type(1)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 113,
          "y": 1440,
          "width": 535.28,
          "height": 58
        },
        "firstSeen": 44.473,
        "lastSeen": 44.972,
        "occurrences": 5,
        "heldMs": 499.00000000000233
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 3.713,
        "selector": "#shot-1-camera",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -47.41,
          "top": -84.29,
          "right": 1127.41,
          "bottom": 2004.29,
          "width": 1174.82,
          "height": 2088.58
        },
        "containerSelector": "#shot-1-visual",
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
          "left": 47.41,
          "right": 47.41,
          "top": 84.29,
          "bottom": 84.29
        },
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s01.html",
        "bbox": {
          "x": -47.41,
          "y": -84.29,
          "width": 1174.82,
          "height": 2088.58
        },
        "firstSeen": 3.713,
        "lastSeen": 3.713,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 11.139,
        "selector": "#shot1-video",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 38.43,
          "top": 229.17,
          "right": 1041.57,
          "bottom": 1200.83,
          "width": 1003.13,
          "height": 971.65
        },
        "containerSelector": "#media-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 60,
          "top": 250,
          "right": 1020,
          "bottom": 1180,
          "width": 960,
          "height": 930
        },
        "overflow": {
          "left": 21.57,
          "right": 21.57,
          "top": 20.83,
          "bottom": 20.83
        },
        "dataAttributes": {
          "data-start": "0",
          "data-duration": "6.06",
          "data-media-start": "0.5",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": 38.43,
          "y": 229.17,
          "width": 1003.13,
          "height": 971.65
        },
        "firstSeen": 11.139,
        "lastSeen": 11.139,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 18.565,
        "selector": "#shot2-image",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -77.59,
          "top": 137.78,
          "right": 1114.26,
          "bottom": 1292.22,
          "width": 1191.85,
          "height": 1154.44
        },
        "containerSelector": "#media-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 60,
          "top": 250,
          "right": 1020,
          "bottom": 1180,
          "width": 960,
          "height": 930
        },
        "overflow": {
          "left": 137.59,
          "right": 94.26,
          "top": 112.22,
          "bottom": 112.22
        },
        "dataAttributes": {
          "data-start": "6.06",
          "data-duration": "5.00",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s02.html",
        "bbox": {
          "x": -77.59,
          "y": 137.78,
          "width": 1191.85,
          "height": 1154.44
        },
        "firstSeen": 18.565,
        "lastSeen": 18.565,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 40.843,
        "selector": "#shot2-img",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": 105.93,
          "top": 309.69,
          "right": 1008.35,
          "bottom": 1402.31,
          "width": 902.42,
          "height": 1092.63
        },
        "containerSelector": "div.media-viewport",
        "fixHint": "Resize/reposition the child or container, or mark intentional overflow with data-layout-allow-overflow.",
        "containerRect": {
          "left": 103,
          "top": 339,
          "right": 957,
          "bottom": 1373,
          "width": 854,
          "height": 1034
        },
        "overflow": {
          "right": 51.35,
          "top": 29.31,
          "bottom": 29.31
        },
        "dataAttributes": {
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s03.html",
        "bbox": {
          "x": 105.93,
          "y": 309.69,
          "width": 902.42,
          "height": 1092.63
        },
        "firstSeen": 40.843,
        "lastSeen": 40.843,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "content_overlap",
        "severity": "info",
        "time": 43.848,
        "selector": "h3.coupon-title",
        "message": "Two text blocks overlap and may render unreadable.",
        "rect": {
          "left": 129.18,
          "top": 1467.15,
          "right": 644.18,
          "bottom": 1522.95,
          "width": 515,
          "height": 55.8
        },
        "containerSelector": "[data-start=\"43.580000\"] > div:nth-of-type(1) > span:nth-of-type(3)",
        "text": "TEM PHIẾU ĐỔI LƯƠNG",
        "fixHint": "Give each block its own zone, or mark intentional layering with data-layout-allow-overlap.",
        "dataAttributes": {},
        "sourceFile": "compositions/scene-s05.html",
        "bbox": {
          "x": 129.18,
          "y": 1467.15,
          "width": 515,
          "height": 55.8
        },
        "firstSeen": 43.848,
        "lastSeen": 43.848,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 63.121,
        "selector": "#vid-04",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -13.61,
          "top": -24.19,
          "right": 1093.61,
          "bottom": 1944.19,
          "width": 1107.22,
          "height": 1968.38
        },
        "containerSelector": "#slot-scene-s07 > div:nth-of-type(1)",
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
          "left": 13.61,
          "right": 13.61,
          "top": 24.19,
          "bottom": 24.19
        },
        "dataAttributes": {
          "data-start": "5.36",
          "data-duration": "3",
          "data-media-start": "1.5",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -13.61,
          "y": -24.19,
          "width": 1107.22,
          "height": 1968.38
        },
        "firstSeen": 63.121,
        "lastSeen": 63.121,
        "occurrences": 1,
        "heldMs": 0
      },
      {
        "code": "container_overflow",
        "severity": "info",
        "time": 66.834,
        "selector": "#img-04",
        "message": "Element extends outside a clipping layout container.",
        "rect": {
          "left": -108,
          "top": -214,
          "right": 1188,
          "bottom": 2090,
          "width": 1296,
          "height": 2304
        },
        "containerSelector": "#slot-scene-s07 > div:nth-of-type(1)",
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
          "left": 108,
          "right": 108,
          "top": 214,
          "bottom": 170
        },
        "dataAttributes": {
          "data-start": "8.36",
          "data-duration": "2.634",
          "data-hf-authored-opacity": ""
        },
        "sourceFile": "compositions/scene-s07.html",
        "bbox": {
          "x": -108,
          "y": -214,
          "width": 1296,
          "height": 2304
        },
        "firstSeen": 66.834,
        "lastSeen": 66.834,
        "occurrences": 1,
        "heldMs": 0
      }
    ],
    "duration": 66.834,
    "samples": [
      3.713,
      11.139,
      18.565,
      25.991,
      33.417,
      40.843,
      48.269,
      55.695,
      63.121,
      66.834
    ],
    "transitionSamples": [],
    "transitionSamplesDropped": 0,
    "tolerance": 2,
    "totalIssueCount": 17,
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
      3.713,
      18.565,
      33.417,
      48.269,
      63.121
    ],
    "checked": 37,
    "passed": 37
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
    "latestVersion": "0.8.65",
    "updateAvailable": true
  }
}


- **2026-09-24T11:58:29.725Z** — `scripts/07-codegen.hf.router.mjs --video=tien-viet-nam-phan-1 --scenes=S05` — Codegen HyperFrames scene [S05] PASS sau 2 lần thử bằng ag/gemini-3.8-flash-high (review: ag/claude-sonnet-4-6) — đã chuyển đổi thành compositions/scene-s05.html.

- **2026-09-24T11:59:20.311Z** — `scripts/07b-integration-check.hf.mjs --video=tien-viet-nam-phan-1` — Stage 7b integration check PASS — 7/7 scene, có audio, có caption-track, hyperframes check ok=true.

- **2026-09-24T12:03:25.058Z** — `scripts/09-render.hf.mjs` — Render bản đầy đủ: out\tien-viet-nam-phan-1-full.mp4, 135930041 bytes (129.6MB), 244.2s render time, quality=looks. Xác minh ffprobe: duration=66.867s (khớp audio thật 66.834s), 1080x1920 h264. Capture mode: screenshot (tắt fast-capture do: a CSS 3D rendering context (perspective / preserve-3d / backface-visibility)). GPU mode: hardware (WebGL renderer vendor="Google Inc. (NVIDIA)" renderer="ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER (0x000021C4) Direct3D11 vs_5_0 ps_5_0, D3D11)"). Stage timing: compile=3.5s, browser_probe=0.9s, video_extract=5.4s, audio_process=4.3s, file_server=0.5s, capture_calibration=4.2s, capture_disk=152.6s, encode=58.3s, assemble=4.9s.
