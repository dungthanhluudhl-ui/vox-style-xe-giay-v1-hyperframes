# POC E2E: nguồn PDF bản án trong pipeline đầy đủ (Stage 1 → 7b → render)

Kết quả 2026-09-30: **đạt**. Video 35s (5 scene) từ Bản án 935/2024/HS-PT; người dùng đã xem mp4 và xác nhận ổn.

## Đầu vào
- Audio: cắt 35.4s từ `narration.mp3` video ban-an-935-2024-tphcm (từ "Tòa phúc thẩm xác định…" tới hết mức án).
- Script: 3 đoạn tương ứng (đoạn 55–57). PDF: `content/videos/e2e/source/*.pdf` (tên file gốc là "ban an 23 2023 ben tre", nội dung thật là bản án 935/2024/HS-PT).

## Lệnh đã chạy (gốc = `poc/pdf-source-e2e`, env 9router từ `../../.env`)
`node scripts/run-stages-1-6.mjs --video=e2e --flow-account=default --images-only` → Stage 1–7; sau đó
`07-codegen-hf-parallel.mjs --scenes=…` chạy lại scene lỗi, `07b-integration-check.hf.mjs`, `09-render.hf.mjs`.
Mini-root dùng junction tới `scripts/`, `node_modules`, `.agents`, `planning/style-dna`, `pipeline/.flow-profile`, `pipeline/.cache`
(đã gỡ sau POC, không commit). Muốn chạy lại: tạo lại junction bằng PowerShell `New-Item -ItemType Junction`. **Gỡ junction bằng `cmd /c rmdir`** (không `Remove-Item -Recurse`, sẽ xoá dữ liệu gốc).

## Kết quả
| Bước | Kết quả |
|---|---|
| Stage 1–2 | 236 captions |
| Stage 2b (Flow thật) ‖ 2c | 3 ảnh Flow ‖ 4 `doc-*`; đối chiếu script–PDF: 4 khớp, 2 gần khớp, 0 không thấy |
| Stage 3/5/6 | 5 scene, 7 shot; `doc-02`→S02, `doc-01`+`doc-03` liên tiếp→S05 |
| Stage 7 | PASS 5/5 (xem bài học 1–2) |
| 7b / render | PASS; `out/e2e-full.mp4` 1080×1920 h264/aac 30fps 35.000s, quality looks (mp4 không commit, `.gitignore`) |
| Vision QA | thẻ bản án ở giữa khung ~90% rộng, chữ rõ, không cắt/che, phụ đề không đè |

## Bài học
1. **Reviewer bịa quy ước tên file** (`assets/doc-02.*`) → FAIL S02, generator đổi tên sai → `missing_local_asset`. Đã vá tất định trong `scripts/lib/review-gate.mjs` (xem `responsibility-matrix.md` mục 6).
2. **`cx/gpt-6-sol` làm generator hết 120s** khi 5 scene song song (prompt lớn); trả lời câu ngắn vẫn 2.4s. Cấu hình `model-routing.json` chưa commit của session khác đã đổi generator sang model này; POC chạy lại S04/S05 với routing của HEAD (`ag/gemini-3.8-flash-high`, generator) nên S01–S03 sinh bởi `cx/gpt-6-sol`, S04–S05 bởi gemini. Kết luận: chọn model generator + `--concurrency` là biến riêng, không liên quan nâng cấp PDF.
3. Ghi file JSON từ PowerShell bằng `Set-Content -Encoding utf8` thêm BOM → `JSON.parse` lỗi; dùng `git show … > file` từ bash.
4. Vision (Gemini) chặn `recitation` nếu yêu cầu chép nguyên văn chữ trong ảnh; chỉ hỏi bố cục/độ đọc được (`vision-check.mjs`).

## Tệp
Log chạy `e2e-*.log`, khung chụp `e2e-final-snapshots/`, kết quả từng stage trong `pipeline|planning|hyperframes|public/videos/e2e/`.
