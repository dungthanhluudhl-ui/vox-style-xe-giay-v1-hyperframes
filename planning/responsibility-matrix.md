# Ma trận trách nhiệm pipeline dựng video

Tài liệu tham chiếu cố định: mỗi task trong pipeline do ai/gì đảm nhiệm. Khi phát sinh task mới hoặc cần đổi tier model, chỉ sửa file này (và `scripts/model-routing.json` nếu đổi model), không cần đổi kiến trúc.

Ký hiệu:
- **Claude** = xử lý trực tiếp trong session điều phối chính.
- **9router[tier]** = script gọi model qua 9router (`http://localhost:20128/v1`). Tier tra trong `scripts/model-routing.json`.
- **Local** = script/CLI chạy local, không gọi AI (ffmpeg, ffprobe, sharp, whisper.cpp, hyperframes CLI, remotion CLI/tsc/eslint cho archive...).

**HyperFrames là framework mặc định từ video 5 trở đi** (xem mục 6). 4 video đầu dùng Remotion,
giữ nguyên archive tại `archive/remotion-legacy/` — các ghi chú riêng Remotion trong tài liệu này
được đánh dấu rõ "(archive)".

**Repo sản xuất nhiều video.** Mọi script `02b/03/05/06/07-*.router.mjs` nhận tham số bắt buộc `--video=<slug>` (slug = tên ngắn không dấu, vd `ban-an-473-phan-1`), tự suy ra toàn bộ đường dẫn qua `scripts/lib/video-paths.mjs` (nguồn xác thực duy nhất cho convention đường dẫn — sửa 1 chỗ này nếu cần đổi cấu trúc thư mục). Nội dung riêng từng video nằm trong `videos/<slug>/` bên trong mỗi nhóm (`content/`, `public/`, `planning/`, `pipeline/`, `hyperframes/`); phần dùng chung (style DNA, script) nằm ở gốc mỗi nhóm.

## 1. Intake & Validation
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Lấy metadata audio (format, duration, sample rate) | Local | ffprobe |
| Lấy metadata ảnh/video nguồn | Local | ffprobe / sharp |
| Đọc & nắm cấu trúc script text | Claude | — |

## 2. Xử lý Audio
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Transcribe audio → text + timestamp thô | Local | whisper.cpp (`@remotion/install-whisper-cpp`) — audio tiếng Việt phải dùng model đa ngôn ngữ (`medium`/`large-v3`), không dùng bản `.en` |
| Convert whisper output → `Caption[]` chuẩn | Local | `toCaptions()` |
| Sửa lỗi chính tả/dấu câu transcript, giữ nguyên timestamp | 9router[text_cleanup] | `ag/gemini-3.8-flash-high` |
| Chuẩn hoá loudness, kiểm tra clipping/khoảng lặng | Local | ffmpeg loudnorm |

> Cần kiểm tra thực tế khi có audio thật: so sánh chất lượng transcribe tiếng Việt giữa whisper.cpp local vs. gửi thẳng audio cho `ag/gemini-3.8-flash-*` qua 9router (model hỗ trợ `audioInput` trực tiếp). Whisper.cpp cho timestamp đáng tin cậy hơn; quyết định chốt sau khi thử dữ liệu thật.

## 2b. Tạo ảnh/video minh hoạ tự động qua Google Flow
Thay bước tự tay tạo ảnh/video trong Google Flow rồi copy vào `public/videos/<slug>/media/`
— **không bắt buộc**, vẫn có thể tiếp tục copy tay như trước, đây chỉ là đường tự động thêm vào.

| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Chia kịch bản thành phân cảnh + viết prompt ảnh tiếng Anh (tỉ lệ số cảnh theo độ dài kịch bản) | 9router[scene_image_prompt_writer] | `ag/gemini-3.8-flash-high` |
| Quyết định hành động điều khiển trình duyệt (click/fill/scroll/wait/download/done/blocked) mỗi bước | 9router[browser_agent] | `ag/gemini-3.8-flash-high`, nhìn screenshot đánh số [N] + danh sách accessibility (ref `@eN`) |
| Thực thi hành động trên Chrome thật qua CDP | Local | `agent-browser` (Vercel Labs, binary native, gọi thẳng không qua shell) |
| Giải nén zip tải về (nếu có) + phân loại ảnh/video theo đuôi file vào đúng `imagesDir`/`videosDir`, chờ tất định (poll hệ thống file) cho tới khi tải thực sự xong trước khi phân loại | Local | `adm-zip` |

Script: `scripts/02b-media-generate.router.mjs --video=<slug> [--flow-account=<tên>] [--style-notes="..."] [--resume-project=<url>]`.
`--resume-project=<url>` mở lại project Flow đã tạo (URL tự lưu vào
`pipeline/videos/<slug>/flow-project.json` sau Giai đoạn 1 mỗi lần chạy), bỏ qua hẳn Giai đoạn
1+2, chỉ chạy Giai đoạn 3 (tải file) — dùng khi tải lỗi/thiếu file, tránh tốn credit tạo lại.
Log chi tiết từng bước → `pipeline/videos/<slug>/media-generate-log.md`; 1 dòng tóm tắt cuối → `pipeline/videos/<slug>/run-log.md` (đúng convention chung).

**Gotcha môi trường thật đã gặp khi setup (đọc trước khi debug lại, giống tinh thần đoạn
`--no-root-sync` ở mục 6):**
- Google chặn đăng nhập tương tác qua Chrome bị automation điều khiển (`navigator.webdriver`).
  Đăng nhập lần đầu cho MỖI tài khoản (`--flow-account=`) phải làm thủ công: đóng HẾT Chrome
  đang chạy (kể cả chạy nền không cửa sổ), mở Chrome thường (không qua agent-browser) trỏ
  `--user-data-dir` vào đúng `pipeline/.flow-profile/<tên tài khoản>/`, đăng nhập, đóng lại.
  Chi phí một lần/tài khoản — không lặp lại cho các lần chạy sau hay khi đổi qua lại giữa các
  tài khoản đã thiết lập sẵn.
- Windows Chrome's singleton-instance bỏ qua âm thầm `--user-data-dir` nếu ĐÃ có Chrome khác
  đang chạy (kể cả chạy nền) — chỉ ảnh hưởng bước đăng nhập thủ công nêu trên, KHÔNG ảnh hưởng
  các lần chạy tự động sau đó (agent-browser tự quản lý daemon/profile riêng).
- LUÔN dùng đường dẫn TUYỆT ĐỐI cho `--profile`/`--download-path` của agent-browser — nó chạy
  dạng daemon nền, giữ nguyên working directory của lần gọi đầu tiên.
- 2 nút "More options" dễ nhầm trên trang project Flow: nút cạnh mỗi ảnh ("More options for
  the project" → Rename/Trash/Delete, SAI) và nút ở thanh trên cùng gần avatar account
  ("More options" → Download project/..., ĐÚNG — dùng để tải cả project 1 lần dạng zip).
- Model có thể trả `done` ngay khi THẤY thông báo "bắt đầu tải" (vd "Downloading project..."),
  chưa phải lúc file tải xong thật (tải xuống trình duyệt không hiện trong page DOM/screenshot
  nên model không tự phán đoán chính xác được) — script tự chờ tất định bằng cách poll thư mục
  tải tạm (không còn `.crdownload`, danh sách file ổn định vài giây) trước khi phân loại, thay
  vì tin lời model.
- Hết credit/hạn mức tạo ảnh ở 1 tài khoản: thiết lập thêm 1 tài khoản Flow khác (đăng nhập thủ
  công 1 lần vào `--flow-account=<tên khác>`), rồi chỉ cần đổi flag đó ở lần chạy sau.
- Model từng bấm "Download project" khi 1 video trong project VẪN CÒN đang render, làm thiếu
  file trong zip tải về — đã thêm yêu cầu tường minh trong prompt giai đoạn 3: cuộn qua hết khu
  vực media xác nhận không còn item đang xử lý trước khi tải. Nếu vẫn gặp lại, dùng
  `--resume-project=<url>` (xem trên) để tải lại từ đúng project đó, không cần tạo lại từ đầu.
- Mỗi bước `action=wait` từng mặc định/trần khá dài (3000ms/15000ms), cộng thêm độ trễ gọi
  model cho bước kiểm tra tiếp theo khiến tổng thời gian chờ thực tế đo được ~16-23s/lần — đã
  rút xuống 2000ms/6000ms và yêu cầu model ưu tiên chờ ngắn, kiểm tra lại thường xuyên hơn.
- **Lỗi thật đã gặp (video "ban-an-473-phan-1", 2026-09-21): Flow Agent gộp toàn bộ N prompt
  thành 1 ảnh khổ NGANG 16:9 duy nhất** (kiểu minh hoạ "danh sách prompt"/collage nhiều cảnh
  trong 1 ô) thay vì tạo N ảnh dọc 9:16 riêng biệt như 2 video trước đó vẫn tạo đúng — nguyên
  nhân do `buildScenePromptListMessage()` gửi cả danh sách prompt gộp thành 1 tin nhắn duy nhất
  cho Flow Agent (AI ngoài tầm kiểm soát của repo) tự diễn giải cách tách ảnh, không có gì đảm
  bảo tất định. Hậu quả dây chuyền: bước tạo chuyển động (Giai đoạn 2) sau đó tạo video 9:16 từ
  đúng nguồn ảnh sai khổ ngang này (ép crop), nên cả ảnh lẫn video tải về đều dùng không được.
  Phát hiện bằng `ffprobe` đo width/height thật (KHÔNG cần xem ảnh trực tiếp) — 4 file cùng
  1376×768 dù tải 2 lần khác nhau, không phải lỗi tải thiếu file (khác gotcha phía trên). Đã sửa
  `buildScenePromptListMessage()`: nêu tường minh số ảnh chính xác cần tạo, khổ dọc 9:16, và cấm
  rõ ràng việc gộp nhiều cảnh vào 1 ảnh — nhưng vì Flow Agent vẫn là AI ngoài tầm kiểm soát, đây
  chỉ giảm rủi ro chứ không đảm bảo tuyệt đối; nếu tái diễn, kiểm tra lại bằng `ffprobe` (đúng số
  file + đúng tỉ lệ dọc) trước khi đi tiếp Giai đoạn 2, đừng chỉ tin log "done" của model.

## 3. Xử lý Media nguồn (ảnh/video)
Media tới đây từ Stage 2b (tự động qua Google Flow) hoặc copy tay như trước — cả 2 đường đều
đổ vào đúng `imagesDir`/`videosDir` không đổi, Stage 3 không cần biết nguồn gốc.

| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Trích metadata (resolution, duration, codec) | Local | ffprobe / sharp |
| Tạo contact sheet (lưới thumbnail để review) | Local | ffmpeg + sharp |
| Phân tích nội dung từng ảnh/video (mô tả, gắn tag, đánh giá dùng được) | 9router[vision_cheap] | `ag/gemini-3.8-flash-low` |
| Đề xuất đoạn cắt/khung hình phù hợp cho từng clip | 9router[vision_standard] | `ag/gemini-3.8-flash-high` |
| Thực thi cắt/crop/resize theo quyết định đã chọn | Local | ffmpeg |

## 4. Style DNA (khi nhận tài liệu style)
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Phân tích ảnh/video mẫu style (màu, texture giấy, cơ chế xé) | 9router[vision_standard] | `ag/gemini-3.8-flash-high` |
| Tổng hợp thành design tokens (text/JSON) | 9router[text_cleanup hoặc reasoning_generator nếu phức tạp] | — |
| Nạp trực tiếp `STYLE_DNA.md`/`style-tokens.json` vào prompt generator mỗi lần codegen (không có file theme trung gian như `theme.ts` bên Remotion) | Local | `scripts/07-codegen.hf.router.mjs` |

## 5. Lập kế hoạch nội dung
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Lập Scene Plan | 9router[reasoning_generator] | `cx/gpt-5.6-sol` hoặc `ag/claude-opus-4-6-thinking` |
| Lập Shotlist | 9router[reasoning_generator hoặc reasoning_alt] | `cx/gpt-6-astra` |
| Đọc & chốt Scene Plan/Shotlist trước khi dựng code | Claude | — (text, không nặng context) |

## 6. Dựng video (code HyperFrames)
Mô hình **generator → verify → reviewer**, chạy trong script, Claude chỉ nhận báo cáo cuối. Kiến
trúc quan trọng (đã kiểm chứng qua Checkpoint D + Giai đoạn E, xem memory
`feedback_incremental_buildout`): **LLM chỉ sinh 1 composition STANDALONE** (`index.html`,
`composition-id="main"`, không biết gì về sub-composition/`<template>`) trong 1 project tạm
riêng mỗi scene (`hyperframes/.gen-tmp/<slug>-<sceneId>/`) — bắt LLM tự sinh đúng khuôn dạng
sub-composition trực tiếp đã bị bác bỏ vì làm giảm điểm khớp Style DNA rõ rệt.

| Bước | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| 1. Generate: composition standalone cho 1 scene, project tạm riêng | 9router[reasoning_generator] | script tự bundle skill docs HyperFrames + `STYLE_DNA.md`/`style-tokens.json` + shotlist |
| 2. Verify tự động | Local | `npx hyperframes check --json` chạy TRÊN PROJECT TẠM RIÊNG scene đó (cách ly hoàn toàn, không race khi song song) |
| 3. Review | 9router[reasoning_reviewer] | `ag/claude-sonnet-4-6` — verdict PASS/FAIL + danh sách lỗi |
| 4. Nếu FAIL: gửi lỗi lại generator, lặp bước 1–3 | Local orchestration | tối đa 3 lần trước khi escalate |
| 5. PASS: chuyển đổi tất định standalone → `compositions/scene-sNN.html`, ráp `index.html` | Local, tất định, KHÔNG AI | `scripts/lib/sync-root-hf-lib.mjs` (`standaloneToSubComposition()` + `syncRootHf()`) — gọi tự động, trừ khi `--no-root-sync` |
| 6. Ghi file + cập nhật `pipeline/videos/<slug>/run-log.md` | Local | — |
| 7. Hết lần vẫn FAIL, hoặc vấn đề mang tính sản phẩm | Claude | đọc code/log chi tiết để xử lý, sửa targeted bằng `--issue-file` |
| 8. PASS bình thường | Claude | chỉ đọc báo cáo ngắn, không đọc code |

`syncRootHf()` cũng tự sinh tất định `compositions/caption-track.html` từ `captions.json` mỗi
lần ráp (`scripts/lib/generate-caption-track-hf.mjs`, port đúng `applyFourWordPageBreaks()` +
`createTikTokStyleCaptions()` của `@remotion/captions`) và mount `<audio>` — không cần thao tác
tay cho bất kỳ video nào.

**Quy tắc bắt buộc (giữ nguyên từ bản Remotion): KHÔNG BAO GIỜ batch nhiều scene trong 1 lần gọi.** Luôn 1 scene/lần: `node scripts/07-codegen.hf.router.mjs --video=<slug> --scenes=SNN [--issue-file=...]`.

**Chạy song song nhiều scene — MẶC ĐỊNH cho mọi video từ 2 scene trở lên:**
`node scripts/07-codegen-hf-parallel.mjs --video=<slug> --scenes=S01,S02,...,SNN [--concurrency=10]` — mirror đúng worker-pool đã kiểm chứng bên Remotion (xem "Lịch sử: pipeline Remotion" bên dưới), nhưng AN TOÀN HƠN theo kiến trúc: mỗi scene HyperFrames sinh trong project tạm RIÊNG THƯ MỤC (không phải cùng chia sẻ `src/` như Remotion), nên không còn nhóm lỗi race-condition-verify-quét-nhầm-file từng gặp bên Remotion. Khi TẤT CẢ scene PASS, script tự gọi `syncRootHf()` ráp `index.html`.

**Đã kiểm chứng thật lần đầu ở quy mô lớn (video "ban-an-473-phan-1", 2026-09-21, 14 scene, concurrency=10):** 13/13 scene (S02-S14) PASS trong ngân sách tự động retry (đa số 1 lần, S03/S08 2 lần, S14 3 lần), không cần `--issue-file` can thiệp tay, 0 lỗi mạng/timeout — kết quả tốt hơn cả mốc Remotion (15/16). Trước khi vào vòng song song, S01 (chạy riêng để bootstrap) fail 3 lần đầu do 2 gotcha thật của HyperFrames chưa từng gặp bên Remotion (contrast WCAG AA không đạt, `querySelector` dùng template literal khiến bundler crash) — đã vá vào `KNOWN_GOTCHAS_HF` trong `scripts/07-codegen.hf.router.mjs`, PASS ngay sau đó.

**`KNOWN_GOTCHAS_HF`** (trong `scripts/07-codegen.hf.router.mjs`) là nơi tích luỹ mọi lỗi
HyperFrames-cụ-thể tổng quát hoá được (contrast, template-literal selector, quy tắc file ảnh
"cutout"...) — khi Claude xử lý escalation hoặc phát hiện lỗi lặp lại qua `pipeline/codegen-issues.jsonl` (field `framework: "hyperframes"`, dùng chung với Remotion), thêm gotcha mới vào đây thay vì chỉ sửa 1 lần cho scene đang lỗi.

**Bug thật đã sửa ở tầng ráp (`sync-root-hf-lib.mjs`), áp dụng cho MỌI video:** CSS `.clip` (style mọi slot `data-composition-src` trong `index.html`) phải có `isolation: isolate` — thiếu dòng này, z-index dùng NỘI BỘ trong 1 scene có thể thoát stacking context và đè lên slot khác (kể cả `caption-track` dù luôn nằm sau trong DOM). Xem memory `feedback_incremental_buildout` bài học #5 để biết đầy đủ cách phát hiện + tại sao track-index không liên quan.

Chỉ chạy `scripts/07-codegen.hf.router.mjs` tuần tự/thủ công (không qua orchestrator) khi có lý do cụ thể, ví dụ đang debug/sửa riêng 1 scene bằng `--issue-file`.

### Model generator/reviewer — đã đổi qua POC kiểm chứng (2026-09-22)

Trước đây dùng `cx/gpt-5.6-sol` (generator) + `cx/gpt-5.6-sol-review` (reviewer). Đã chạy POC
song song 5 cặp model × 3 scene thật của video "ban-an-473-phan-1" (S01 phức tạp/từng fail thật,
S04 đơn giản/text-only, S06 trung bình) để tìm model rẻ/nhanh hơn nhưng chất lượng tương đương —
xem đầy đủ dữ liệu + phương pháp tại `poc/hyperframes/codegen-poc.mjs` (đã tham số hoá
`--video=`/`--gen-model=`/`--review-model=`/`--gen-max-tokens=`/`--review-max-tokens=`),
`poc/hyperframes/score-render.mjs` (rubric chấm điểm 1-10, tái dùng được cho lần audit sau), và
kết quả thô tại `poc/hyperframes/poc-results/model-compare/`.

**Kết quả (PASS/3 scene, tổng 3 scene):**

| Cặp | PASS | Tổng attempts | Tổng token | Tổng thời gian | Điểm chấm TB |
|---|---|---|---|---|---|
| `ag/gemini-3.1-pro-low` + `ag/claude-sonnet-4-6` | 0/3 ❌ | 9 | 424K | 1052s | — (loại) |
| `cx/gpt-5.6-sol` + `cx/gpt-5.6-sol-review` (cũ) | 3/3 | 6 | 205K | 1325s | 6.00 |
| **`ag/gemini-3.8-flash-high` + `ag/claude-sonnet-4-6` (MỚI, mặc định)** | 3/3 | 6 | 322K | 509s (2.6x nhanh hơn) | **6.33** |
| `ag/gemini-3.8-flash-high` + `ag/gemini-3.8-flash-high` (tự chấm điểm mình) | 3/3 | 7 | 370K | 581s (2.3x nhanh hơn) | 6.00 |
| `ag/gemini-3.8-flash-high` + `ag/gpt-oss-120b-medium` | 3/3 | 5 (ít nhất) | 254K | 438s (3x nhanh hơn) | 6.00 |

**Kết luận:**
- **Thời gian**: xác nhận tiết kiệm thật, cả 3 cặp dùng `gemini-3.8-flash-high` làm generator đều
  nhanh hơn baseline 2.3-3 lần (latency ẩn của reasoning phía `cx/gpt-5.6-sol` rất cao dù token
  không nhiều hơn).
- **Token/chi phí $**: KHÔNG xác nhận được là rẻ hơn — các cặp Gemini dùng NHIỀU token hơn
  baseline (205K → 254-370K). 9router `/v1/models` không trả đơn giá, không có cách kiểm chứng
  chi phí $ thật từ trong repo — cần tự kiểm tra dashboard nhà cung cấp nếu muốn biết chính xác.
- **Chất lượng hình ảnh**: ngang nhau giữa 4 cặp PASS (6.00-6.33, chấm bằng `score-render.mjs`
  so với chính scene đó ở video 5 đã duyệt) — không có bằng chứng model rẻ hơn làm giảm chất
  lượng.
- **`ag/gemini-3.1-pro-low` KHÔNG phù hợp vai trò generator** — fail cả 3/3 scene kể cả scene
  đơn giản nhất (text-only), trái với dự đoán ban đầu dựa trên capability (context/reasoning) —
  bài học: capability số liệu không thay thế được kiểm chứng thật trên đúng task.
- **Cặp tự-chấm-điểm-mình** (`gemini-3.8-flash-high` làm cả 2 vai) chạy được nhưng kém hiệu quả
  nhất trong 3 cặp thành công (nhiều attempts/token nhất) — dùng được khi cần nhưng không phải
  lựa chọn tối ưu.
- Người dùng đã tự xem 12 bản render POC (`pipeline/.cache/model-compare-renders/`, không commit
  — tái tạo được bằng cách chạy lại POC) và xác nhận đạt trước khi đổi.

**Xếp hạng fallback (đổi thủ công bằng cách sửa `scripts/model-routing.json`, không có cơ chế tự
động — xem `feedback_incremental_buildout`):**
- **Generator**: 1) `ag/gemini-3.8-flash-high` (mặc định) → 2) `cx/gpt-5.6-sol` (=
  `reasoning_generator_alt` trong `model-routing.json`, chậm hơn nhưng đã kiểm chứng chắc chắn
  chạy được). KHÔNG dùng `ag/gemini-3.1-pro-low` (đã loại). Chưa có lựa chọn #3 đã kiểm chứng —
  cần POC riêng nếu muốn thêm (vd `ag/gemini-pro-agent`, chưa test).
- **Reviewer**: 1) `ag/claude-sonnet-4-6` (mặc định) → 2) `ag/gpt-oss-120b-medium` (rẻ/nhanh nhất,
  chất lượng tương đương) → 3) `ag/gemini-3.8-flash-high` (tự chấm điểm mình — dùng được nhưng
  kém hiệu quả nhất) → 4) `cx/gpt-5.6-sol-review` (cũ, dự phòng cuối cùng).

**2 gotcha mới phát hiện qua POC** (đã thêm vào `KNOWN_GOTCHAS_HF`, chưa từng gặp với
`cx/gpt-5.6-sol`): `gsap_relative_value_second_writer` (giá trị GSAP tương đối `+=N` xung đột
writer khác cùng thuộc tính) và `text_occluded` (chữ bị phần tử khác che khuất) — cả 2 đều tự sửa
được trong ngân sách 3 lần thử, không cần can thiệp tay, nhưng theo dõi qua
`pipeline/codegen-issues.jsonl` nếu tái diễn nhiều.

## 7. Preview & QA
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Preview | Local | `npx hyperframes preview --background` (xem `hyperframes/videos/<slug>/CLAUDE.md`) |
| Kiểm tra hình ảnh preview có khớp ý đồ/style không | 9router[vision_standard] | `hyperframes snapshot` chụp vài frame gửi review, trả nhận xét text — KHÔNG Claude tự xem |
| Sửa code theo phản hồi QA | Claude (hoặc quay lại bước generate ở Stage 6 nếu là lỗi code) | — |

## 8. Render
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Render video cuối (chỉ khi được yêu cầu rõ) | Local | `npx hyperframes render --quality looks -o out/<slug>-full.mp4 hyperframes/videos/<slug>` |
| Kiểm tra file render (duration, resolution, không lỗi) | Local | ffprobe |
| Xác nhận nội dung hiển thị đúng (vd phụ đề, hiệu ứng xuyên suốt) trước khi coi Checkpoint đạt | 9router[vision_standard] | trích frame bằng ffmpeg tại nhiều mốc + gửi vision agent — bài học thật: `hyperframes check` PASS không đảm bảo mọi lớp nội dung THỰC SỰ hiển thị (vd bug stacking-context ở mục 6) |

## Lịch sử: pipeline Remotion (archive, 4 video đầu — KHÔNG áp dụng cho video mới)

Giữ nguyên để tham khảo/sửa lỗi cho `archive/remotion-legacy/`.

Mô hình generator → verify → reviewer y hệt tinh thần mục 6, nhưng: generate ghi file scene
`src/videos/<slug>/scenes/SceneNN.tsx`; verify chạy `tsc --noEmit` + `eslint` + render smoke-test
(`npx remotion render <CompositionId>` đúng dải frame scene — bắt lỗi runtime-only như
`interpolate()` output-range sai); ráp `src/Root.tsx` tất định qua `scripts/lib/sync-root-lib.mjs`.
Agent qua 9router không tự có quyền truy cập skill Remotion — script phải tự đọc file skill
(`remotion-best-practices`, `remotion-markup`, `remotion-create/video-layout.md`,
`remotion-interactivity`, `remotion-captions/display-captions.md`) và nhét vào prompt.

`theme.ts` (`src/styles/theme.ts`) và component dùng chung (`src/components/*`) do generator
tạo/mở rộng CHỈ MỘT LẦN CHO CẢ REPO (video đầu tiên tạo nền tảng, các video sau tái sử dụng).

**Quy tắc không batch nhiều scene** — đã kiểm chứng: request càng nhiều scene, model sinh càng
nhiều token, thời gian gọi cộng dồn dễ vượt timeout mạng (`fetch failed`/`HeadersTimeoutError`),
KHÔNG phải do máy quá tải khi render smoke-test.

**Chạy song song mặc định ≥2 scene**: `scripts/07-codegen-parallel.mjs --video=<slug> --scenes=... [--concurrency=10]`, worker-pool, mỗi tiến trình con `--no-root-sync`.

**Bug thật đã sửa (video "tham-hoa-itaewon-phan-2", 16 scene, concurrency=3):** `--no-root-sync`
KHÔNG loại bỏ hoàn toàn race condition như từng tưởng — `verify()` vẫn chạy `tsc`/`eslint --fix`
trên TOÀN BỘ `src/`, nên verify() của 1 scene có thể đọc/ghi đè nhầm file scene KHÁC đang sinh dở
cùng lúc (xác nhận thật: lỗi verify S01 nằm trong file `Scene03.tsx`). Sửa: `verify()` scope
`eslint` đúng file vừa ghi, lọc output `tsc` chỉ giữ lỗi đúng file đó.

**Render smoke-test KHÔNG chạy trong luồng song song mặc định** — chỉ chạy khi `07-codegen.router.mjs` chạy TUẦN TỰ (video 1). Luồng song song (video 3/4) không render thử trong lúc codegen; an toàn runtime dựa vào review + render final + `codegen-issues.jsonl`.

**Concurrency mặc định = 10** (nâng từ 3, kiểm chứng 2026-09-20): 16 scene, 15/16 PASS, 0 lỗi
mạng/timeout. 5/16 scene lỗi `tsc: Cannot find module` sai ở lần thử đầu (tranh chấp I/O cục bộ
Windows khi 10 tiến trình `npx tsc`/`npx eslint` đồng thời), tự PASS lần 2 — chấp nhận đổi lấy
tốc độ.

**Log lỗi codegen dùng chung Remotion + HyperFrames — `pipeline/codegen-issues.jsonl`** (field
`framework` phân biệt): mỗi attempt FAIL được ghi 1 dòng JSON `{ts, video, scene, attempt, stage,
detail}` — dùng để audit định kỳ tìm lỗi lặp lại, đưa vào `KNOWN_GOTCHAS`/`KNOWN_GOTCHAS_HF`
tương ứng.

Chỉ chạy song song scene CỦA CÙNG 1 VIDEO; không chạy song song 2 video nếu cả hai cần MỞ RỘNG
`theme.ts`/component dùng chung cùng lúc (race ở lớp dùng-chung — xử lý tuần tự hoặc merge tay).

### Tối ưu render Remotion
Đã đo thật `Config.setConcurrency(4)` trong `remotion.config.ts` — xem chi tiết đầy đủ (benchmark, kết luận) tại `planning/README.md` mục "Archive: pipeline Remotion cũ".

## Ghi chú vận hành: không tự tạo file lưu-lịch-sử thủ công
Từ khi repo đã có git backup (2026-09-20), **không** tạo thêm file kiểu "trước-khi-sửa"/"v1"/"v2" trong `pipeline/videos/<slug>/*-history/` mỗi lần sửa lỗi hay chạy lại một bước — git đã lưu đúng việc này tốt hơn (`git log`, `git diff <commit> -- <file>`, `git show <commit>:<file>`). Việc này tránh cộng dồn số file vô hạn theo mỗi vòng sửa lỗi của mỗi video khi sản xuất hàng loạt. Các file lịch sử đã có sẵn trong `pipeline/scene-plan-history/` (tạo trước khi có git) được giữ nguyên, không cần dọn.

## Điều phối / Báo cáo (xuyên suốt)
| Task | Ai/gì đảm nhiệm |
|---|---|
| Quyết định bước kế tiếp, chọn đúng script + model/tier | Claude |
| Cập nhật `pipeline/videos/<slug>/run-log.md` sau mỗi bước | Claude / script |
| Báo cáo tiến độ, xin xác nhận khi cần | Claude |

## Quy ước đặt tên script
`scripts/<số-thứ-tự>-<giai-đoạn>-<tên-task>.<owner>.mjs`, ví dụ thực tế trong repo:
- `scripts/01-audio-transcribe.local.mjs`
- `scripts/02-audio-clean-transcript.router.mjs`
- `scripts/02b-media-generate.router.mjs` (tạo ảnh/video qua Google Flow — xem mục 2b; số thứ
  tự có hậu tố "b" vì chèn thêm sau khi 02/03 đã tồn tại, không renumber các script cũ)
- `scripts/03-media-analyze.router.mjs`
- `scripts/05-scene-plan.router.mjs`
- `scripts/06-shotlist.router.mjs`
- `scripts/07-codegen.hf.router.mjs` — codegen HyperFrames, mặc định từ video 5 (xem mục 6)
- `scripts/07-codegen-hf-parallel.mjs` (local, không gọi AI trực tiếp — orchestrator worker-pool, mặc định cho ≥2 scene, xem mục 6)
- `scripts/08-sync-root.hf.mjs` (local, không gọi AI — CLI ráp `index.html` thủ công, thường không cần gọi riêng vì `07-codegen-hf-parallel.mjs` đã tự gọi khi xong)
- `scripts/lib/generate-caption-track-hf.mjs` (local, không gọi AI — sinh `caption-track.html` tất định, gọi tự động bởi `syncRootHf()`)
- Hậu tố `.hf.`/`-hf-` phân biệt nhánh HyperFrames.

Archive (Remotion, 4 video đầu — không dùng cho video mới): `scripts/07-codegen.router.mjs`,
`scripts/07-codegen-parallel.mjs`, `scripts/08-sync-root.mjs`.

Hậu tố `.local.mjs` / `.router.mjs` cho biết ngay loại xử lý. Mọi script `.router.mjs` dùng chung `scripts/lib/router-client.mjs` và tra model qua `scripts/model-routing.json`.

**Vì sao không có `04`**: Stage 4 (phân tích style DNA từ ảnh/video mẫu, xem mục 4 phía trên) không cần script vì Style DNA của dự án này được kế thừa nguyên bộ từ `vox-style-3` (xem `planning/style-dna/README.md`), không phải phân tích lại từ đầu. Số thứ tự giữ nguyên khoảng trống này để phản ánh đúng vị trí Stage 4 trong pipeline — không phải lỗi đánh số.
