# Vox-style DNA — ADN v2 (mặc định từ 03/10/2026)

Bộ đặc tả "DNA phong cách" của dòng video Vox-style (collage grayscale + cam, khung dọc 9:16).
Đây là **tài liệu thuần** (Markdown + JSON). Nền tảng thiết kế trích từ repo
[`vox-style-3`](https://github.com/dungthanhluudhl-ui/vox-style-3) (video V10-V13, kiến thức v1); các quyết định
riêng v2 (cảnh asset = media thuần + camera liên tục, chữ A-roll nhấn mạnh narration, bỏ mascot/thẻ chữ trên media)
đã được kiểm chứng bằng video thật của repo này. v1 (kèm ảnh/contact sheet tham chiếu kiểu v1) lưu ở `archive/adn-v1/`
— **không đọc trừ khi người dùng yêu cầu**.

## Thứ tự đọc

1. **[`STYLE_DNA.md`](STYLE_DNA.md)** — tài liệu chính, tự đủ: nhận diện thị giác, chữ & caption, hai loại cảnh
   (asset / đồ hoạ), chữ A-roll (mục 4b), chuyển động & nhịp, khung tư duy biên tập, ngưỡng chất lượng.
2. **[`references/v2-reference-profile.md`](references/v2-reference-profile.md)** — hồ sơ tham chiếu v2 bằng chữ + số đo.
3. **[`references/worked-examples.md`](references/worked-examples.md)** — 12 ví dụ "lời thoại → quyết định hình ảnh"
   (kiến thức v1; chỉ còn đúng cho CẢNH ĐỒ HOẠ — cảnh asset v2 là media thuần).
4. **[`references/editorial-framework.md`](references/editorial-framework.md)** — schema một cảnh + "ý nghĩa trước, component sau".
5. [`references/visual-languages.md`](references/visual-languages.md), [`animation-variants.md`](references/animation-variants.md),
   [`quality-bars.md`](references/quality-bars.md), [`lessons.md`](references/lessons.md) — chỉ cảnh đồ hoạ dùng 13 ngôn ngữ thị giác.
6. **[`style-tokens.json`](style-tokens.json)** — số liệu chính xác (màu, font, canvas, safe zone) dùng lập trình trực tiếp.

## Quan trọng
- Style UI (chrome) ≠ style media nguồn: media nguồn của từng video nằm ở `public/videos/<slug>/media/`.
- Canvas 1080×1920 @30fps; nền giấy `#E7E3D9`, mực `#141414`, cam nhấn `#FF6A1A`, font Be Vietnam Pro 700/900.
- Cảnh asset: không chữ/thẻ/icon trên hình (ngoại lệ DUY NHẤT: chữ A-roll, mục 4b); cảnh đồ hoạ chỉ khi thiếu asset phù hợp.
