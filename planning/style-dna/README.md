# vox-style-dna

Bộ đặc tả "DNA phong cách" của dòng video Vox-style (collage grayscale + cam, khung dọc
9:16), trích xuất từ repo [`vox-style-3`](https://github.com/dungthanhluudhl-ui/vox-style-3)
(video V10-V13, phiên bản style hiện hành). Đây là **tài liệu thuần** (Markdown + JSON +
ảnh mẫu) — không kèm code/component/script của repo gốc. Mục đích: khi bắt đầu một dự án
hoàn toàn mới, agent chỉ cần đọc thư mục này để hiểu đúng phong cách mong muốn, không cần
người dùng mô tả lại từ đầu.

## Thứ tự đọc đề xuất

1. **[`STYLE_DNA.md`](STYLE_DNA.md)** — đọc trước tiên. Tài liệu chính, tự đủ: nhận diện thị
   giác, xử lý cutout, chữ & caption, 13 ngôn ngữ thị giác, animation, icon vocabulary, khung
   tư duy biên tập, ngưỡng chất lượng.
2. **[`examples/`](examples/)** — xem song song ảnh mẫu thật để hình dung trực quan, đặc
   biệt `examples/contact-sheet-full-video.png`.
3. **[`references/worked-examples.md`](references/worked-examples.md)** — 12 ví dụ thật
   "lời thoại → quyết định hình ảnh", đọc trước khi quyết định hình ảnh cho BẤT KỲ cảnh nào.
4. **[`references/editorial-framework.md`](references/editorial-framework.md)** — schema dữ
   liệu cho một cảnh + nguyên tắc "ý nghĩa trước, component sau".
5. Phần còn lại khi cần: [`references/visual-languages.md`](references/visual-languages.md),
   [`references/animation-variants.md`](references/animation-variants.md),
   [`references/quality-bars.md`](references/quality-bars.md),
   [`references/lessons.md`](references/lessons.md).
6. **[`style-tokens.json`](style-tokens.json)** — số liệu chính xác (mã màu, font, canvas,
   safe zone, ngưỡng số) để dùng lập trình/tra cứu nhanh.

## Prompt mẫu để brief cho một agent ở dự án mới

```
Đọc toàn bộ thư mục vox-style-dna/ trước khi dựng bất kỳ cảnh nào. Đây là DNA phong
cách video bắt buộc phải tuân theo — màu sắc, font, xử lý ảnh cắt, caption, ngôn ngữ
thị giác, animation và ngưỡng chất lượng đã được quyết định sẵn trong đó. Không hỏi
lại về phong cách trừ khi tôi chủ động muốn đổi. Đọc STYLE_DNA.md trước, rồi
references/worked-examples.md trước khi quyết định hình ảnh cho từng cảnh cụ thể.
```

## Lưu ý

- Bộ DNA này KHÔNG phải hướng dẫn vận hành một pipeline cụ thể (không có lệnh `py -3
  scripts/xxx.py` nào ở đây) — nó mô tả các quyết định THIẾT KẾ để có thể tái hiện ở bất kỳ
  công cụ/stack nào (Remotion, After Effects, một pipeline tự viết...).
- Repo nguồn có kèm một bộ script Python thực thi các ngưỡng chất lượng này thành gate tự
  động, và một thư viện component Remotion hiện thực các quy tắc này thành code — cả hai đều
  KHÔNG được copy vào đây theo đúng yêu cầu (bộ DNA này chỉ trích xuất phong cách, không
  phải dự án). Nếu muốn dựng bằng đúng stack Remotion như bản gốc, các quy tắc trong
  `references/quality-bars.md` là đặc tả để hiện thực lại các gate đó.
- **Đã điều chỉnh (2026-09-20) cho dự án `vox-style-xe-giay-V1`**: bản DNA gốc trích từ
  `vox-style-3` nghiêng về việc TỰ DỰNG hình ảnh (diagram/cutout/data) cho mọi cảnh — hợp lý
  khi không có media chuẩn bị sẵn. Dự án hiện tại có media (ảnh/video) được AI tạo riêng cho
  đúng kịch bản, và code Remotion tự sinh cho diagram/icon phức tạp trong thực tế dễ lỗi/xấu
  hơn nhiều so với dùng media thật. Vì vậy `STYLE_DNA.md`, `references/editorial-framework.md`
  và `references/visual-languages.md` đã được sửa trực tiếp để ưu tiên dùng media nguồn có
  sẵn trước, chỉ dựng bằng code khi không có asset phù hợp hoặc cần overlay số liệu/vị trí
  chính xác. Nếu tái dùng bộ DNA này cho một dự án KHÁC không có media chuẩn bị sẵn, cân nhắc
  quay lại nguyên tắc gốc (ưu tiên tự dựng theo `visualTransformation`) thay vì bản đã sửa.
- **Đã điều chỉnh (2026-09-26)**: `STYLE_DNA.md` §2 thêm "ngoại lệ chính thức" — ảnh AI Flow (Stage 2b) là
  tranh paper-collage có màu, dựng NGUYÊN MÀU (không grayscale/bóng cam/filter bằng code). Trước đó ngoại lệ
  này chỉ nằm rải rác trong prompt từng script (Stage 5, Stage 7) và THIẾU ở Stage 6 → mâu thuẫn làm reviewer
  Stage 7 lật qua lật lại. Nay §2 là nguồn duy nhất, các script trỏ về đây.
