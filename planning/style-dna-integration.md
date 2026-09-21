# Style DNA — Vox-style grayscale + cam, 9:16

**Đã nhận đầy đủ** (2026-09-20), trích từ dự án trước của user (`vox-style-3`). Toàn bộ tài liệu gốc nằm ở [`style-dna/`](style-dna/) — đọc theo đúng thứ tự:

1. [`style-dna/STYLE_DNA.md`](style-dna/STYLE_DNA.md) — tài liệu chính, tự đủ.
2. [`style-dna/examples/`](style-dna/examples/) — ảnh mẫu thật + `README.md` mô tả từng ảnh (không cần agent nào xem lại ảnh, mô tả text đã đầy đủ).
3. [`style-dna/references/worked-examples.md`](style-dna/references/worked-examples.md) — đọc trước khi quyết định hình ảnh cho bất kỳ cảnh nào.
4. [`style-dna/references/editorial-framework.md`](style-dna/references/editorial-framework.md) — schema dữ liệu 1 cảnh, nguyên tắc "ý nghĩa trước, component sau".
5. [`style-dna/references/visual-languages.md`](style-dna/references/visual-languages.md), [`animation-variants.md`](style-dna/references/animation-variants.md), [`quality-bars.md`](style-dna/references/quality-bars.md), [`lessons.md`](style-dna/references/lessons.md).
6. [`style-dna/style-tokens.json`](style-dna/style-tokens.json) — số liệu chính xác (màu, font, canvas, safe zone) dùng lập trình trực tiếp.

## Tóm tắt nhanh (chi tiết đầy đủ ở các file trên)
- Canvas mặc định: **1080×1920 @30fps** (9:16). Đổi 16:9 chỉ khi được yêu cầu rõ.
- Màu: nền giấy `#E7E3D9`, mực `#141414`, cam nhấn `#FF6A1A` (màu nhấn DUY NHẤT), card `#F5F0E4`, chữ trên nền tối `#F7F4EC`.
- Font: **Be Vietnam Pro**, chỉ weight 700/900, hỗ trợ dấu tiếng Việt.
- Cutout: người → grayscale + bóng cam đổ cứng; vật thể → giữ màu gốc, không bóng.
- Caption: 4 từ/dòng, neo `bottom: 440px`, mount một lần ở cấp timeline tổng, sync theo timestamp cấp từ.
- 13 ngôn ngữ thị giác (cutout/map/diagram/timeline/flow/data/...) — không ngôn ngữ nào >50% số cảnh, hầu hết cảnh mạnh xếp chồng ≥2 ngôn ngữ.
- Nguyên tắc biên tập quan trọng nhất: **"ý nghĩa trước, component sau"** — xác định quan hệ hình ảnh cụ thể cần THẤY HÌNH THÀNH trước khi chọn animation.

## Quan trọng: style UI (chrome) ≠ style media nguồn
- **Style DNA ở trên** = ngôn ngữ đồ hoạ/UI của toàn bộ video (nền, chữ, icon, caption, bố cục, cutout treatment).
- **Media nguồn** (`public/videos/<slug>/media/`) = nội dung minh hoạ riêng cho TỪNG video (khác `public/style/` là style DNA dùng chung). Vd video "Án lệ 64": `public/videos/an-le-64/media/` — 9 ảnh thực tế + 5 video paper-tear animation (8s/clip), xem `pipeline/videos/an-le-64/media-analysis/manifest.json` để biết mỗi asset dùng cho ý nào.
- **Quyết định 2026-09-20 (đơn giản hoá phạm vi hiện tại)**: 9 ảnh nguồn dùng làm **ảnh nền** (background), KHÔNG áp dụng xử lý cutout (grayscale+bóng cam) như DNA mô tả cho người/vật thể cắt nền. Việc cutout nhân vật/asset sẽ bổ sung sau khi được yêu cầu — tương tự PDF bản án, đây là hạng mục hoãn lại (deferred), không phải bỏ vĩnh viễn.
- Shot nào không có asset phù hợp → dựng bằng component đồ hoạ thuần (card/diagram/label) theo đúng style DNA, không cần media ngoài.

## Còn thiếu / cần làm rõ thêm
- [x] Font file "Be Vietnam Pro" — giải quyết xong. HyperFrames (mặc định từ video 5): nạp qua đúng 1 thẻ `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap">` trong `<head>` mỗi composition, dùng trực tiếp `font-family: "Be Vietnam Pro", sans-serif` — KHÔNG dùng `@font-face`/`local()` trỏ file `.ttf` (gây lỗi 404 runtime, xem `KNOWN_GOTCHAS_HF` trong `scripts/07-codegen.hf.router.mjs`). *(Archive Remotion, 4 video đầu: cài `@remotion/google-fonts`, `theme.ts` load qua `loadFont()` từ `@remotion/google-fonts/BeVietnamPro`.)*
- [ ] 15 icon vocabulary: không còn cấp thiết — sau khi áp dụng quy tắc media-first (xem `style-dna/README.md`, mục "Đã điều chỉnh"), scene ưu tiên dùng media thật, diagram/icon tự vẽ chỉ còn là overlay nhẹ khi thật sự không có asset phù hợp. Chưa cần xây bộ icon vocabulary riêng.
- [ ] PDF bản án/án lệ liên quan (nếu có) — **người dùng xác nhận sẽ cung cấp sau**, chưa cần cho giai đoạn hiện tại.
