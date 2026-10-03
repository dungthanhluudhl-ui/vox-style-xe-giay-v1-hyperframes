# Bài học đã trả giá — chỉ phần THIẾT KẾ/PHÁN ĐOÁN, không phải lỗi code

Đây là kho lưu các quyết định thiết kế đã sai một lần trong quá trình dựng nhiều video thật,
được lọc lại từ nhật ký lỗi gốc (bỏ các lỗi thuần code cụ thể của một framework — toán học
căn giữa CSS, bug double-offset của một prop `delay`, cách đo bề rộng chữ có letter-spacing
— vì chúng không thuộc về "phong cách", chỉ thuộc về cách một codebase cụ thể hiện thực hoá
phong cách đó). Đọc phần này trước khi tự nghĩ ra một cách tiếp cận mới cho một việc trông
có vẻ dễ.

## A. Nguồn ảnh & xử lý cutout

- **Nền trắng làm màu nền mặc định khi tạo ảnh chính là lỗi, không phải từng ca "chủ thể
  nhạt màu" riêng lẻ.** Công cụ tách nền là mô hình nhận diện vật thể theo ĐỘ TƯƠNG PHẢN với
  nền, không phải theo màu cụ thể — một nền trắng cho độ tương phản gần bằng 0 với BẤT KỲ
  chủ thể nhạt/trắng/kem nào (tài liệu, phong bì, thẻ sáng màu, áo trắng), nên mô hình xoá
  luôn cả chủ thể lẫn nền. Sửa tại gốc: luôn tạo ảnh nguồn trên một phông màu chroma-key
  (xanh lá hoặc magenta khi chủ thể có màu xanh), rồi dùng thuật toán chroma-key thật (có
  khử viền loang màu) làm phương pháp CHÍNH, chỉ rơi về mô hình AI khi phông không phải màu
  chroma sạch (ảnh chụp thật).
- Ảnh nguồn có bối cảnh phức tạp/kiến trúc lớn/tài liệu phẳng khiến việc tách nền bằng AI ra
  kết quả mờ/lởm chởm — nên né từ bước CHỌN ảnh nguồn, đừng cố sửa mặt nạ sau khi đã tách.
  Với các trường hợp này, cân nhắc dùng `background-photo` (không cắt nền) thay vì cố tách.
- Đổ bóng cam CHỈ áp dụng cho chủ thể người/grayscale — vật thể/màu gốc KHÔNG có bóng. Áp
  dụng nhầm bóng cho mọi cutout là lỗi đã từng xảy ra.
- **Công cụ tạo ảnh AI có thể bỏ qua tỉ lệ khung được yêu cầu bằng lời** — cài đặt tỉ lệ
  khung hình của chính công cụ (nếu có) luôn thắng chữ mô tả trong prompt. Luôn kiểm tra
  kích thước thật của ảnh nhận được trước khi dùng, đừng giả định prompt đã được tuân theo.
  Với `background-photo` full-khung, một ảnh sai tỉ lệ bị phóng to/cắt cụt bố cục một cách
  âm thầm, không báo lỗi gì.
- Ảnh do AI sinh ra có thể mang một watermark nhỏ của công cụ (một hoạ tiết ở góc ảnh) — cần
  kiểm tra và xoá watermark TRƯỚC khi tách nền, vì watermark nằm ngay trong vùng mẫu màu góc
  ảnh mà bước tách nền tự động dùng để quyết định phương pháp, nên có thể âm thầm làm sai cả
  bước tách nền.
- Luôn crop sát nội dung trước khi đưa vào khung — một cutout còn viền trong suốt lớn sẽ
  luôn trông nhỏ hơn thực tế dù khung chứa nó to bao nhiêu.
- Mở TỪNG file ảnh đã cắt/crop ở kích thước thật để kiểm tra, không kiểm bằng lưới thumbnail
  thu nhỏ — một số lượng khớp không chứng minh việc gán tên↔ảnh là đúng.

## B. Bố cục & layout

- **Khung hình có thể "đầy" mà vẫn sai.** Độ phủ đo LƯỢNG đã lấp đầy; vị trí LỆCH (dạt lên
  trên, dạt sang một bên) là một lỗi độc lập hoàn toàn — một khung nặng phía trên và một
  khung căn giữa có thể đạt cùng độ phủ, nhưng khung đầu vẫn đọc như lỗi bố cục.
- Chọn vị trí headline/tiêu đề độc lập với vị trí cụm ảnh chính (hero+support) — không nhìn
  vào nơi cụm ảnh THỰC SỰ nằm sau khi render — sinh ra những cảnh mà tiêu đề cô lập ở phía
  trên và cụm ảnh cô lập ở giữa, với một khoảng chết lớn ở giữa và bên cạnh, thay vì đọc như
  một khung hình có bố cục thống nhất. Luôn đặt tiêu đề sát cụm ảnh THỰC TẾ (bbox đã render),
  không phải một vị trí `top` cố định bỏ qua cụm ảnh.
- **Một cảnh chỉ có MỘT ngôn ngữ thị giác/MỘT phần tử không có lớp dự phòng thứ hai.** Khi
  phần tử đó được chỉnh đúng kích thước, phần còn lại của khung hình vẫn trống vì chưa từng
  có gì khác được lên kế hoạch cho không gian đó. Đây chính là lý do quy tắc "hầu hết cảnh
  mạnh xếp chồng ≥2 ngôn ngữ" không phải là một sở thích phong cách — nó là thứ khiến bạn
  còn có gì đó để lấp khung hình khi ý tưởng đầu tiên hoá ra nhỏ hơn dự tính.
- Một hàng các hình chữ nhật cao thấp khác nhau xếp trên một đường nền LUÔN đọc như biểu đồ
  cột, bất kể tên gọi của component là gì. Điều khiến một hình chữ nhật đọc như một toà nhà
  là CÁC CHI TIẾT của nó (biển hiệu, cửa sổ, mái hiên, cửa ra vào), không bao giờ là chiều
  cao của nó.
- **Luôn đánh giá bố cục trên một khung hình TỔNG (đã ghép caption + mọi lớp), không phải
  một khung hình dựng riêng lẻ của từng cảnh.** Caption được gắn ở cấp timeline tổng, nên nó
  vắng mặt trên một bản render riêng của từng cảnh — khiến dải dưới khung trông trống một
  cách giả tạo và làm phóng đại cảm giác "trống ở dưới". Dải một cảnh thực sự phải lấp đầy
  chỉ tính đến y≈1250, không phải toàn bộ khung — phần dưới đó luôn thuộc về caption.
- Kiểm tra riêng các cảnh dạng khung/mockup (điện thoại, tài liệu, màn hình) trên khung hình
  TỔNG — một chip caption có thể vô tình rơi vào GIỮA màn hình điện thoại được vẽ, khiến nó
  đọc như một phần giao diện app thay vì một dòng phụ đề.

## C. Chuyển động & nhịp độ

- Dùng lại một kiểu chuyển động vào cảnh cho mọi cảnh, hoặc cùng 1-2 hiệu ứng âm thanh cho
  cả video, đọc như phẳng lì — cố ý thay đổi cả hai theo từng cảnh.
- Một cutout đứng yên sau khi chuyển động vào cảnh kết thúc trông như ảnh tĩnh chết cứng —
  luôn phủ thêm một chuyển động nền nhẹ liên tục, và đổi CHẾ ĐỘ chuyển động (không chỉ lệch
  pha) giữa các phần tử khác nhau trên cùng khung hình.
- Dồn hết mọi phần tử của một cảnh vào ~2 giây đầu rồi không có gì mới suốt 5-10 giây còn
  lại của lời thoại — đọc như video "im lặng/chết" giữa chừng dù lời thoại vẫn đang mô tả
  điều gì đó. Dàn đều thời điểm xuất hiện theo đúng cụm từ mà mỗi phần tử minh hoạ.
- Ngay cả khi thời điểm xuất hiện đã dàn đều, nếu mọi phần tử đều "ở lại đến hết cảnh" theo
  mặc định, một cảnh nhiều nhịp sẽ chất chồng mọi thứ cùng lúc trên màn hình thay vì phần tử
  sau thay thế phần tử trước. Đặt thời điểm phần tử BIẾN MẤT (không chỉ thời điểm xuất hiện)
  một cách chủ động cho các cảnh nhiều nhịp.
- **Lấp đầy một khung hình trống không được phép thêm nhịp mới.** Một phần tử thêm vào để
  lấp khoảng trống phải gắn vào một nhịp ĐÃ CÓ SẴN (cùng khung hình với hero nó đứng sau,
  hoặc cùng khung hình với điểm nhấn nó chú thích) — cho thêm nó một nhịp riêng sẽ làm hỏng
  nhịp độ dù bố cục có đẹp lên: nhìn thêm không có nghĩa là đọc thêm được.
- Một bộ khung/template có sẵn, dù chưa từng bị viết thành luật "chỉ được chọn trong số
  này", vẫn có thể VẬN HÀNH như một luật ngầm nếu quy trình không bao giờ chủ động hỏi "cảnh
  này có cần một bố cục nào ngoài danh sách có sẵn không". Sự đơn điệu khi đó đến từ một
  THIẾU SÓT trong quy trình (không mời gọi phương án mới), không phải từ một lệnh cấm — hai
  nguyên nhân khác nhau nhưng cho cùng một hậu quả.

## D. Chữ & wash màu nền

- `onDark`/màu chữ sáng mô tả VÙNG PIXEL ngay dưới chữ, không mô tả cả cảnh. Một cảnh dạng
  `background-photo` không đồng nghĩa toàn bộ ảnh đều tối — đặt tiêu đề sáng lên đúng vùng
  sáng của ảnh vẫn vô hình. Luôn kiểm tra bằng cách lấy mẫu màu trên khung hình đã render tại
  đúng vị trí đặt chữ, không đoán từ ảnh thu nhỏ gốc; hoặc cho chữ một lớp nền mờ tối riêng
  (scrim) để vị trí đặt không còn phụ thuộc vào nội dung ảnh bên dưới.
- Khi một lớp phủ màu (wash) đặt lên ảnh nền, chọn hướng phủ theo thứ sẽ được vẽ ĐÈ LÊN
  TRÊN: chữ/tiêu đề sáng cần phủ tối (để nổi lên); một hình vẽ/diagram màu mực cần phủ sáng
  kiểu giấy (để hình vẽ mực tối còn đọc được). Tăng độ phủ của một lớp phủ tối để LÀM SÁNG
  một ảnh gốc tối là ngược hướng — kết quả là ảnh càng tối hơn, không sáng hơn.
- Một nhãn bị "gạch chéo" (thể hiện ý phủ định) chỉ nên dùng ĐÚNG MỘT đường gạch. Hai đường
  gạch chéo tạo hình chữ X đọc là rối mắt, không đọc được chữ.
- Chữ tiếng Việt có dấu chồng (ví dụ dấu mũ + dấu thanh như "Ế Ể Ễ") cần thêm khoảng hở phía
  TRÊN của bất kỳ khung/nền chữ nào — khoảng hở tính theo chiều cao chữ hoa thông thường
  (cap-height) sẽ cắt mất dấu thanh nằm cao hơn cả dấu mũ.
- Chữ chú thích/annotation đặt trên một ảnh có nhiều chi tiết (biển hiệu, hoa văn) cần tăng
  cỡ chữ hoặc thêm nền chữ (chip) — cỡ chữ đọc được ở khoảng cách bàn làm việc chưa chắc đọc
  được trên màn hình điện thoại.

## E. Thói quen tự kiểm tra (áp dụng cho bất kỳ agent nào vận hành DNA này)

- **Một trường dữ liệu do chính agent tự khai không phải là bằng chứng.** Nếu một quy trình
  yêu cầu tự đánh dấu "đã làm/đã xem/đạt", giá trị đó chỉ đáng tin khi được đối chiếu với một
  phép đo độc lập (khung hình đã render, số liệu đo được) — nếu không, nó chỉ đo mức độ sẵn
  lòng gõ chữ của agent, không đo video.
- Một trạng thái HTTP thành công (hoặc một script "chạy xong không lỗi") không phải bằng
  chứng đã nhận đúng thứ cần nhận — luôn xác minh KẾT QUẢ thực tế (mở file ảnh ra xem, đo
  kích thước thật), không chỉ xác minh rằng lệnh đã thực thi mà không crash.
- Sao chép nguyên xi một hiệu ứng đặc thù-nội-dung từ một video tham chiếu (một bộ đếm số
  liệu, một biểu đồ kinh tế, một bản đồ địa lý) sang một kịch bản không có số liệu/địa lý
  tương ứng — hãy dịch KỸ THUẬT nền tảng (nhấn nhá chuyển động, một hình vẽ tự-vẽ-dần) sang
  đúng nội dung kịch bản mới đang có, đừng ép nội dung không khớp vào một hiệu ứng có sẵn.
- Đừng bỏ qua bước duyệt shot-list/kế hoạch trước khi bắt đầu dựng hình cho một kịch bản
  mới — phần sourcing ảnh và dựng cảnh là phần tốn kém nhất trong toàn bộ quy trình; bắt một
  hướng sáng tạo sai ngay ở bản kế hoạch dạng chữ rẻ hơn rất nhiều so với phát hiện sau khi
  đã dựng xong cảnh.
