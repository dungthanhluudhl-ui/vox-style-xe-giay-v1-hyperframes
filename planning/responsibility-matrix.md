# Ma trận trách nhiệm pipeline dựng video

Tài liệu tham chiếu cố định: mỗi task trong pipeline do ai/gì đảm nhiệm. Khi phát sinh task mới hoặc cần đổi tier model, chỉ sửa file này (và `scripts/model-routing.json` nếu đổi model), không cần đổi kiến trúc.

Ký hiệu:
- **Claude** = xử lý trực tiếp trong session điều phối chính.
- **9router[tier]** = script gọi model qua 9router (`http://localhost:20128/v1`). Tier tra trong `scripts/model-routing.json`.
- **Local** = script/CLI chạy local, không gọi AI (ffmpeg, ffprobe, sharp, whisper.cpp, remotion CLI, tsc, eslint...).

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
| 1. Generate: theme, transition xé giấy dùng chung, khung `Root.tsx`, toàn bộ scene (kể cả scene đầu tiên) | 9router[reasoning_generator] | script tự bundle skill docs + style tokens + shotlist + (từ scene 2) code scene trước làm ví dụ convention |
| 2. Verify tự động | Local | `tsc --noEmit`, `eslint`, render smoke-test (`npx remotion render` đúng dải frame scene đang xử lý — bắt lỗi runtime-only mà tsc/eslint không thấy, ví dụ `interpolate()` output-range sai) |
| 3. Review | 9router[reasoning_reviewer] | `cx/gpt-5.6-sol-review` — verdict PASS/FAIL + danh sách lỗi |
| 4. Nếu FAIL: gửi lỗi lại generator, lặp bước 1–3 | Local orchestration | tối đa 3 lần trước khi escalate |
| 5. Ghi file + cập nhật `pipeline/run-log.md` | Local | — |
| 6. Hết lần vẫn FAIL, hoặc vấn đề mang tính sản phẩm | Claude | đọc code/log chi tiết để xử lý |
| 7. PASS bình thường | Claude | chỉ đọc báo cáo ngắn, không đọc code |

Ghi chú: agent gọi qua 9router **không** tự có quyền truy cập skill Remotion của Claude Code — script phải chủ động đọc file skill liên quan (`remotion-best-practices`, `remotion-markup`, `remotion-create/video-layout.md`, `remotion-interactivity`, `remotion-captions/display-captions.md`) và nhét vào prompt mỗi lần gọi.

**Quy tắc bắt buộc: KHÔNG BAO GIỜ batch nhiều scene trong 1 lần gọi `scripts/07-codegen.router.mjs`.** Đã kiểm chứng thật: request càng nhiều scene, model sinh càng nhiều token, thời gian gọi cộng dồn theo số scene và dễ vượt timeout mạng — nguyên nhân thật của các lỗi `fetch failed`/`HeadersTimeoutError` từng gặp, KHÔNG phải do máy quá tải khi render smoke-test. Luôn gọi 1 scene / 1 lần.

**Chạy song song nhiều scene để tăng tốc:** chạy nhiều lệnh `scripts/07-codegen.router.mjs --scenes=SNN` (mỗi lệnh 1 scene) như các **process hệ điều hành riêng biệt cùng lúc**, mỗi lệnh thêm cờ `--no-root-sync` — chế độ này không đọc/ghi `src/Root.tsx`, không đụng `src/styles/theme.ts`/`src/components/*` (dùng type cục bộ trong scene nếu cần), không chạy render smoke-test (vì `Root.tsx` chưa có scene mới nên chưa render được gì có nghĩa) — nhờ vậy loại bỏ hoàn toàn race condition ghi đè file dùng chung giữa các process. Sau khi TẤT CẢ scene song song đã xong, chạy **một lần duy nhất** `node scripts/08-sync-root.mjs` (script local, không gọi AI, đọc `planning/scene-plan.json` + quét `src/scenes/*.tsx` hiện có để tự ráp lại toàn bộ `src/Root.tsx`), rồi mới chạy 1 lần `tsc`/`eslint`/render smoke-test tổng cho dải scene mới.

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
Từ khi repo đã có git backup (2026-09-20), **không** tạo thêm file kiểu "trước-khi-sửa"/"v1"/"v2" trong `pipeline/*-history/` mỗi lần sửa lỗi hay chạy lại một bước — git đã lưu đúng việc này tốt hơn (`git log`, `git diff <commit> -- <file>`, `git show <commit>:<file>`). Việc này tránh cộng dồn số file vô hạn theo mỗi vòng sửa lỗi của mỗi video khi sản xuất hàng loạt. Các file lịch sử đã có sẵn trong `pipeline/scene-plan-history/` (tạo trước khi có git) được giữ nguyên, không cần dọn.

## Điều phối / Báo cáo (xuyên suốt)
| Task | Ai/gì đảm nhiệm |
|---|---|
| Quyết định bước kế tiếp, chọn đúng script + model/tier | Claude |
| Cập nhật `pipeline/run-log.md` sau mỗi bước | Claude / script |
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
