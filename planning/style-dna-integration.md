# Style DNA v2 — cách áp dụng cho repo này

ADN v2 là **mặc định từ 03/10/2026** (v1 ở `archive/adn-v1/`, chỉ đọc khi được yêu cầu). Toàn bộ tài liệu nằm ở [`style-dna/`](style-dna/) — đọc theo thứ tự trong [`style-dna/README.md`](style-dna/README.md):
`STYLE_DNA.md` → `references/v2-reference-profile.md` → `worked-examples.md` (kiến thức v1, chỉ cho cảnh đồ hoạ) → `editorial-framework.md` → các tham chiếu khác → `style-tokens.json` (số liệu dùng lập trình).

## Tóm tắt nhanh
- Canvas **1080×1920 @30fps**; nền giấy `#E7E3D9`, mực `#141414`, cam nhấn `#FF6A1A` (màu nhấn DUY NHẤT), card `#F5F0E4`, chữ trên nền tối `#F7F4EC`; font **Be Vietnam Pro** 700/900.
- **Hai loại cảnh:** (1) **cảnh asset** = media thuần (ảnh/video/`doc-NN`) + phụ đề + camera liên tục — dựng TẤT ĐỊNH (`scripts/lib/asset-scene.mjs`), KHÔNG chữ/thẻ/icon trên hình; (2) **cảnh đồ hoạ** CHỈ khi không có asset phù hợp (13 ngôn ngữ thị giác, ≤3 khối chữ, không xoay) — do generator + reviewer dựng.
- **Chữ A-roll** (ngoại lệ duy nhất cho chữ trên cảnh asset): chỉ khi narration đặt câu hỏi/khẳng định mấu chốt; hiện ĐÚNG LÚC từ neo narration (khớp mốc từng từ), đủ thời gian đọc (không đủ → bỏ), không thẻ/khung; asset mờ đi/thu nhỏ/dùng dải trống để chữ nổi; `doc-NN` không bao giờ bị làm mờ.
- Không thanh cam đáy; nền lưới CHUYỂN ĐỘNG; không phần tử nào xoay (trừ bộ phận vẽ thuần trong sơ đồ đồ hoạ); camera 1 tween/shot `ease:"none"`, đổi shot chỉ khi đổi asset.
- Caption: 4 từ/dòng, neo `bottom: 374px`, mount một lần ở cấp timeline tổng, sync theo timestamp cấp từ; nội dung scene luôn trong y≤1390.
- **Mascot đã bỏ** (người dùng quyết định 03/10/2026): không còn cảnh mascot/beat/thẻ chữ.

## Quan trọng: style UI (chrome) ≠ style media nguồn
- ADN = ngôn ngữ đồ hoạ/UI của video. **Media nguồn** (`public/videos/<slug>/media/`) = nội dung minh hoạ riêng cho từng video; ảnh nguồn dùng NGUYÊN màu, không xử lý cutout (quyết định 2026-09-20).
- Font: nạp qua đúng 1 thẻ `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap">` (HyperFrames hoist về root).
- PDF bản án (`doc-NN`) hỗ trợ từ 2026-09-30 (Stage 2c, `responsibility-matrix.md` mục 2c): asset tương đương, đặt giữa khung `contain`, giữ nguyên bản.
