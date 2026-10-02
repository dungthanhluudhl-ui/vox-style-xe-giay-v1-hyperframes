# Capybara giấy xé — thư viện v1

Bộ đã chốt gồm **17 PNG 1024×1536 nền trong suốt**. Việc tạo thêm ảnh đã dừng theo yêu cầu của bạn. Có 14 biểu cảm/tư thế ở trang phục người dẫn chuyện, 2 pose miệng và 1 trang phục phóng viên. Chỉ 17 ID trong manifest.json được dùng; các biến thể chưa hoàn thành không được đưa vào catalog.

Mở **catalog.html** sau khi giải nén để xem toàn bộ asset, tìm theo ID/vai trò và thử nền giấy, trắng, tối hoặc xanh. CATALOG.md là danh mục dạng bảng. manifest.json là nguồn dữ liệu cho pipeline.

## Nhận diện cố định

Capybara mõm bè nâu đậm, tai tròn nhỏ, lông giấy nâu ấm, cơ thể thấp chắc, bàn chân và bàn tay dạng chân thú. Phong thái điềm tĩnh, hài nhẹ. Chất liệu giấy thủ công nhiều lớp, xơ giấy và mép xé kem đã nằm trong PNG. Áo sơ mi kem, gile than chì, điểm nhấn cam; phiên bản phóng viên mặc trench coat màu beige.

Giữ nguyên màu và alpha của PNG. Toàn bộ nhân vật, trang phục, biểu cảm và mép xé là một asset hoàn chỉnh; không tách quần áo, vẽ lại mặt hoặc thêm shadow/filter khi render. Các pose có cùng canvas, nhưng không được coi là frame animation đã căn khớp theo pixel.

## Cách dùng trong video

Media tiếp tục làm chủ đạo. Mascot dùng ở shot riêng khi người kể đặt vấn đề, đặt câu hỏi, bóc tách giả định, chuyển ý hoặc chốt ý. Shot mascot chỉ có nhân vật, nền giấy và caption đã được pipeline quy định. Không ghép ảnh/video minh họa hoặc đồ họa giải thích vào cùng shot. Chữ nhấn mạnh chỉ xuất hiện khi shotlist cấp phép.

Mặc định chọn gile người dẫn chuyện. Trench coat dùng khi đoạn mang vai trò tường thuật/phóng viên, không phải cứ nhắc tin tức là đổi trang phục. Giữ cùng trang phục xuyên một phân đoạn; một shot chọn một pose. Các đoạn nhạy cảm dùng serious, concerned hoặc sad; amused chỉ dùng với ví von nhẹ phù hợp nội dung.

Khung 1080×1920: contain toàn canvas PNG trong x40,y160,w1000,h1230. Giữ đủ đầu, tay, chân, không crop/mirror/stretch; không tự căn kích thước theo bbox từng pose vì dễ làm nhân vật nhảy cỡ. Bộ v1 có hai preset: hold và grow-600 (.97→1 trong 0,6 giây). Timing do Stage 6 cấp; Stage 7 áp dụng đúng preset.

Hai pose talk-closed và talk-open là asset tĩnh cho dẫn chuyện. **V1 chưa có lip-sync hoặc bộ frame miệng đã khóa hình học.** Không luân phiên hai ảnh theo âm lượng hoặc ngẫu nhiên: khác biệt nhỏ giữa các ảnh có thể gây rung toàn nhân vật. Muốn lip-sync cần một lượt dựng/căn frame riêng theo voice timing.

## Cấu trúc

- assets/: 17 PNG với tên khớp ID và GSAP 3.14.2 dùng cho template.
- manifest.json: ID, file, vai trò, trang phục, kích thước, alpha, bbox và SHA256.
- catalog.html / CATALOG.md: xem và chọn asset.
- PIPELINE_CONTRACT.md: trách nhiệm Stage 5, 6, 7 và điều kiện chặn.
- prompts/: prompt thiết kế gốc, prompt của các asset đã hoàn thành, context mẫu cho ba stage.
- templates/mascot-scene.html.txt: HTML HyperFrames dùng lại; chỉ bind asset, duration và preset từ shotlist, không viết renderer mới cho từng shot.
- sample-shotlist.json / validate-shotlist.py: ví dụ và kiểm tra ID thật, loại shot, nội dung phối hợp và preset.
- qa/: kiểm tra alpha/kích thước/mép silhouette, catalog và kết quả test template.

Kiểm tra shotlist:

```bash
python validate-shotlist.py manifest.json sample-shotlist.json
```

Để dùng template: copy nội dung templates/mascot-scene.html.txt thành index.html trong project HyperFrames; copy PNG được chọn và assets/gsap.min.js vào assets/. Cập nhật img.src bằng file được resolver trả về, data-mascot-id bằng ID Stage 6 và data-duration/preset theo shotlist. Caption/audio tiếp tục do assembler của repo mount riêng.

## Phạm vi bàn giao

Ảnh được tạo bằng imagegen tích hợp, các prompt được lưu nguyên văn trong prompts/. Kit này độc lập với repo production, chưa thay schema hoặc nối vào router production. Contract là đề xuất để PoC và tích hợp tiếp; cần map các field mới vào validator/prompt repo. Tái sử dụng asset làm giảm phần phải sinh mã cho hình nhân vật; shot timing và layout vẫn cần kiểm tra sau assembly/render.

## Kiểm tra đã hoàn tất

17/17 PNG decode được, đúng 1024×1536, có alpha thật và silhouette không chạm mép. Catalog tải đủ 17 ảnh, filter trang phục và tìm kiếm hoạt động. Template mascot qua HyperFrames 0.8.56 check với 0 lỗi/0 cảnh báo lint/runtime/layout. Đây là kiểm tra một template pose câu hỏi, chưa phải render lip-sync hoặc test toàn pipeline production.
