# Ma trận trách nhiệm pipeline dựng video

Tài liệu tham chiếu cố định: mỗi task trong pipeline do ai/gì đảm nhiệm. Khi phát sinh task mới hoặc cần đổi tier model, chỉ sửa file này (và `scripts/model-routing.json` nếu đổi model), không cần đổi kiến trúc.

Ký hiệu:
- **Claude** = xử lý trực tiếp trong session điều phối chính.
- **9router[tier]** = script gọi model qua 9router (`http://localhost:20128/v1`). Tier tra trong `scripts/model-routing.json`.
- **Local** = script/CLI chạy local, không gọi AI (ffmpeg, ffprobe, sharp, whisper.cpp, remotion CLI, tsc, eslint...).

**Repo sản xuất nhiều video.** Mọi script `03/05/06/07-*.router.mjs` và `08-sync-root.mjs` nhận tham số bắt buộc `--video=<slug>` (slug = tên ngắn không dấu, vd `an-le-64`), tự suy ra toàn bộ đường dẫn qua `scripts/lib/video-paths.mjs` (nguồn xác thực duy nhất cho convention đường dẫn — sửa 1 chỗ này nếu cần đổi cấu trúc thư mục). Nội dung riêng từng video nằm trong `videos/<slug>/` bên trong mỗi nhóm (`content/`, `public/`, `planning/`, `pipeline/`, `src/`); phần dùng chung (style DNA, component, theme, script) nằm ở gốc mỗi nhóm.

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

## 3. Xử lý Media nguồn (ảnh/video)
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
| Viết `src/styles/theme.ts` từ design tokens | Claude | — |

## 5. Lập kế hoạch nội dung
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Lập Scene Plan | 9router[reasoning_generator] | `cx/gpt-5.6-sol` hoặc `ag/claude-opus-4-6-thinking` |
| Lập Shotlist | 9router[reasoning_generator hoặc reasoning_alt] | `cx/gpt-6-astra` |
| Đọc & chốt Scene Plan/Shotlist trước khi dựng code | Claude | — (text, không nặng context) |

## 6. Dựng video (code Remotion)
Mô hình **generator → verify → reviewer**, chạy trong script, Claude chỉ nhận báo cáo cuối:

| Bước | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| 1. Generate: CHỈ (các) file scene `src/videos/<slug>/scenes/SceneNN.tsx` (lần đầu tiên trong cả repo thì kèm theo theme.ts + component dùng chung — xem ghi chú dưới) | 9router[reasoning_generator] | script tự bundle skill docs + style tokens + shotlist + (từ scene 2 của video) code scene trước làm ví dụ convention |
| 2. Ráp `src/Root.tsx` (khối riêng cho video này, giữ nguyên khối video khác) | Local, tất định, KHÔNG AI | `scripts/lib/sync-root-lib.mjs` — gọi tự động ngay trong `verify()` của bước 3, trừ khi `--no-root-sync` |
| 3. Verify tự động | Local | `tsc --noEmit`, `eslint`, render smoke-test (`npx remotion render <CompositionId>` đúng dải frame scene đang xử lý — bắt lỗi runtime-only mà tsc/eslint không thấy, ví dụ `interpolate()` output-range sai) |
| 4. Review | 9router[reasoning_reviewer] | `cx/gpt-5.6-sol-review` — verdict PASS/FAIL + danh sách lỗi |
| 5. Nếu FAIL: gửi lỗi lại generator, lặp bước 1–4 | Local orchestration | tối đa 3 lần trước khi escalate |
| 6. Ghi file + cập nhật `pipeline/videos/<slug>/run-log.md` | Local | — |
| 7. Hết lần vẫn FAIL, hoặc vấn đề mang tính sản phẩm | Claude | đọc code/log chi tiết để xử lý |
| 8. PASS bình thường | Claude | chỉ đọc báo cáo ngắn, không đọc code |

Ghi chú: agent gọi qua 9router **không** tự có quyền truy cập skill Remotion của Claude Code — script phải chủ động đọc file skill liên quan (`remotion-best-practices`, `remotion-markup`, `remotion-create/video-layout.md`, `remotion-interactivity`, `remotion-captions/display-captions.md`) và nhét vào prompt mỗi lần gọi.

**Generator không bao giờ viết `src/Root.tsx` nữa** (kể cả scene đầu tiên của video đầu tiên) — việc ráp Root.tsx (Sequence theo frame, mount `<Audio>`+`<Captions src=...>`, khai báo `<Composition id={PascalCase(slug)}>`) hoàn toàn do `scripts/lib/sync-root-lib.mjs` đảm nhiệm, tất định 100%, không AI. `theme.ts` (`src/styles/theme.ts`) và component dùng chung (`src/components/*`) vẫn do generator tạo/mở rộng, nhưng CHỈ MỘT LẦN CHO CẢ REPO (video đầu tiên tạo nền tảng, các video sau tái sử dụng, chỉ bổ sung field/type mới khi thật sự cần — không xoá/đổi field cũ vì các video khác đang dùng chung).

**Quy tắc bắt buộc: KHÔNG BAO GIỜ batch nhiều scene trong 1 lần gọi `scripts/07-codegen.router.mjs`.** Đã kiểm chứng thật: request càng nhiều scene, model sinh càng nhiều token, thời gian gọi cộng dồn theo số scene và dễ vượt timeout mạng — nguyên nhân thật của các lỗi `fetch failed`/`HeadersTimeoutError` từng gặp, KHÔNG phải do máy quá tải khi render smoke-test. Luôn gọi 1 scene / 1 lần: `node scripts/07-codegen.router.mjs --video=<slug> --scenes=SNN`.

**Chạy song song nhiều scene để tăng tốc:** chạy nhiều lệnh `scripts/07-codegen.router.mjs --video=<slug> --scenes=SNN` (mỗi lệnh 1 scene) như các **process hệ điều hành riêng biệt cùng lúc**, mỗi lệnh thêm cờ `--no-root-sync` — chế độ này không gọi `sync-root-lib.mjs`, không đụng `src/styles/theme.ts`/`src/components/*` (dùng type cục bộ trong scene nếu cần), không chạy render smoke-test (vì `Root.tsx` chưa có scene mới nên chưa render được gì có nghĩa) — nhờ vậy loại bỏ hoàn toàn race condition ghi đè file dùng chung giữa các process. Chỉ chạy song song các scene CỦA CÙNG 1 VIDEO; không chạy song song 2 video khác nhau nếu cả hai đều cần MỞ RỘNG theme.ts/component dùng chung trong cùng lúc (vẫn có thể race ở lớp dùng-chung này — xử lý tuần tự phần mở rộng dùng chung, hoặc merge tay sau). Sau khi TẤT CẢ scene song song đã xong, chạy **một lần duy nhất** `node scripts/08-sync-root.mjs --video=<slug>` (script local, không gọi AI, đọc `planning/videos/<slug>/scene-plan.json` + quét `src/videos/<slug>/scenes/*.tsx` hiện có để tự ráp lại khối Root.tsx của video này, giữ nguyên khối video khác), rồi chạy 1 lần `tsc`/`eslint`/render smoke-test tổng cho dải scene mới.

## 7. Preview & QA
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Chạy Remotion Studio preview | Local | `npx remotion studio` |
| Kiểm tra hình ảnh preview có khớp ý đồ/style không | 9router[vision_standard] | chụp vài frame gửi review, trả nhận xét text |
| Sửa code theo phản hồi QA | Claude (hoặc quay lại bước generate ở Stage 6 nếu là lỗi code) | — |

## 8. Render
| Task | Ai/gì đảm nhiệm | Công cụ |
|---|---|---|
| Render video cuối (chỉ khi được yêu cầu rõ) | Local | `npx remotion render` |
| Kiểm tra file render (duration, resolution, không lỗi) | Local | ffprobe |

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
- `scripts/03-media-analyze.router.mjs`
- `scripts/05-scene-plan.router.mjs`
- `scripts/06-shotlist.router.mjs`
- `scripts/07-codegen.router.mjs`
- `scripts/08-sync-root.mjs` (local, không có hậu tố owner vì không gọi AI — script mechanical thuần)

Hậu tố `.local.mjs` / `.router.mjs` cho biết ngay loại xử lý. Mọi script `.router.mjs` dùng chung `scripts/lib/router-client.mjs` và tra model qua `scripts/model-routing.json`.

**Vì sao không có `04`**: Stage 4 (phân tích style DNA từ ảnh/video mẫu, xem mục 4 phía trên) không cần script vì Style DNA của dự án này được kế thừa nguyên bộ từ `vox-style-3` (xem `planning/style-dna/README.md`), không phải phân tích lại từ đầu. Số thứ tự giữ nguyên khoảng trống này để phản ánh đúng vị trí Stage 4 trong pipeline — không phải lỗi đánh số.
