# 13 ngôn ngữ thị giác — quyết định HÌNH THỨC trước khi chọn cách dựng

> **[v2 NHÁP]** 13 ngôn ngữ dưới đây chỉ dùng cho CẢNH ĐỒ HOẠ (thiếu asset). Cảnh asset chỉ dùng `background-photo`/`cutout`/`split`/`document` thuần media; chữ A-roll nhấn mạnh narration xem STYLE_DNA.md mục 4b.


## Vì sao tài liệu này tồn tại

Nguồn: mỗi cảnh của một video từng dựng đều theo đúng một công thức — cắt nền một chủ thể,
thả nổi trên nền giấy nhạt. Đó không phải là một quyết định phong cách, mà vì pipeline chỉ
mô tả cụ thể MỘT kỹ thuật, nên mọi nội dung đều bị ép qua kỹ thuật đó. Nội dung không phải
một vật thể cụ thể (một địa điểm, một khoảng thời gian, một bố cục không gian, một tâm
trạng) bị biến thành một vật thể nhỏ lạc lõng giữa khoảng trắng. Đo được: những cảnh tệ
nhất chỉ lấp đầy **3.8%-11.2%** khung hình hữu dụng, và gần một nửa số cảnh không có hình
ảnh minh hoạ nào cả. Người xem đánh giá thẳng: nhàm chán, hình minh hoạ không giải thích
được gì.

Vì vậy có một bước BẮT BUỘC trước khi chọn cách dựng: quyết định nội dung thật sự đòi hỏi
ngôn ngữ thị giác nào.

## Bảng 13 ngôn ngữ

| Nếu lời thoại đang nói về… | Ngôn ngữ | Gợi ý cách dựng |
|---|---|---|
| Một vật thể/người cụ thể | `cutout` | Ảnh cắt nền (grayscale+bóng cam cho người, màu gốc không bóng cho vật) |
| Một địa điểm, khu vực | `map` | Bản đồ THẬT (không phải một ghim trên giấy trắng) |
| Bố cục, kích thước, khoảng cách, mật độ | `diagram` | Hình vẽ tự-vẽ-dần: đường đo, lưới mật độ, chỉ báo độ dốc |
| Chuỗi sự kiện theo thời gian | `timeline` | Các mốc thời gian xuất hiện tuần tự |
| Nguyên nhân → kết quả, một cơ chế | `flow` | Mũi tên tự vẽ thể hiện lực/luồng tác động |
| Một con số, một xu hướng | `data` | Đếm thật trên khung hình (không chỉ in số tĩnh), biểu đồ đường |
| Không khí, bối cảnh, một khoảnh khắc | `background-photo` | Ảnh full-khung, không cắt nền |
| Hai thứ đối lập nhau | `split` | Bố cục chia đôi, một bên LẤN SANG bên kia nếu là "đảo chiều" |
| Lời nói của ai đó | `quote` | Bong bóng thoại / trích dẫn kéo ra |
| Một tài liệu, hồ sơ, lưu trữ | `document` | Ảnh tài liệu + nét đánh dấu highlighter |
| Một chi tiết bên trong một ảnh rộng hơn | `annotated` | Đường dẫn + nhãn chỉ vào chi tiết |
| Một màn hình, một thiết bị, một cuộc gọi | `mockup` | Vẽ khung thiết bị, không cắt ảnh thiết bị thật |
| Không có gì để minh hoạ (hiếm, bị giới hạn) | `text-only` | Chỉ có punch phrase, không hình |

## Quy tắc bắt buộc

- **Ưu tiên media nguồn có sẵn.** Nếu có media (ảnh/video) được chuẩn bị riêng cho đúng
  kịch bản/cảnh này (xem `pipeline/media-analysis/manifest.json`), nó mặc nhiên thoả yêu
  cầu "cụ thể, không rập khuôn" ở mục "Chọn một cách trung thực" bên dưới — ưu tiên dùng nó
  (`cutout` hoặc `background-photo`) TRƯỚC khi nghĩ tới việc dựng `diagram`/`data`/`flow`/
  `timeline` mới bằng code. Không bỏ qua một asset khớp tốt chỉ vì một ngôn ngữ khác "thể
  hiện quan hệ ý nghĩa" thuần khái niệm hơn — quan hệ đó vẫn có thể truyền tải qua
  caption. **[v2] Không overlay/chữ/thẻ trên nền media thật ở cảnh asset.**
- **Không ngôn ngữ nào chiếm quá 50% số cảnh của một video.** Lặp một kỹ thuật cho cả video
  luôn đọc như một công thức, bất kể kỹ thuật đó tốt đến đâu.
- **`text-only` giới hạn ở 15% số cảnh.** Một video từng chạy ở mức 29-47% tuỳ cách đếm —
  riêng điều đó đã khiến gần nửa video là trang trắng.
- **Một cảnh khai báo ngôn ngữ nào thì phải THẬT SỰ chứa ngôn ngữ đó.** Khai báo `map`
  nhưng chỉ vẽ một ghim trên giấy trắng là lỗi kinh điển nhất trong lịch sử dự án này.
- **Không lặp cùng một ngôn ngữ ở hai cảnh liên tiếp.**
- **Vùng minh hoạ phải lấp đầy ≥12% dải khung hình hữu dụng** (mục tiêu khuyến nghị 25%).
  Ngưỡng 12% được hiệu chỉnh dựa trên các cảnh người xem đã tự đánh giá bằng mắt — nó tách
  đúng ranh giới giữa "chấp nhận được" và "hỏng".
- **Khối lượng thị giác phải nằm gần TÂM của dải khung hình**, không dạt về một cạnh. Lấp
  đầy khung và căn giữa nó là hai vấn đề khác nhau — một cảnh nặng phía trên vẫn có thể đạt
  ngưỡng phủ nhưng vẫn đọc như bị lỗi bố cục.
- **Mỗi sự kiện thị giác phải gắn với một nhịp (beat) có thật trong kế hoạch** — một tài
  nguyên xuất hiện/biến mất, hoặc điểm nhấn xuất hiện. Nhịp độ không thể được "thoả mãn"
  chỉ bằng cách khai báo thêm sự kiện trên giấy.

## Xếp lớp — đừng chỉ chọn một

> **[v2 NHÁP]** Chỉ áp dụng cho CẢNH ĐỒ HOẠ; cảnh asset không xếp lớp thêm gì (ngoại lệ duy nhất: chữ A-roll, mục 4b).

Thói quen hữu ích nhất: hầu hết các cảnh MẠNH là **hai ngôn ngữ xếp chồng lên nhau**, không
phải một ngôn ngữ dùng đơn lẻ. Một `timeline` trên giấy trắng vẫn là một khung hình thưa;
cùng timeline đó đặt trên một `background-photo` là một cảnh hoàn chỉnh.

Các tổ hợp hiệu quả:

- `background-photo` + tiêu đề (chữ trên nền tối) — không khí kèm một tuyên bố
- `background-photo` + `diagram` — một hình vẽ neo vào bối cảnh thật
- `map` + `annotated` — ở đâu, rồi nhìn vào cái gì trong đó
- `cutout` + `background-photo` — chủ thể không còn lơ lửng
- `timeline` + `background-photo` — dòng thời gian có tâm trạng

## Chọn một cách trung thực

Sai lầm cần tránh không phải là "chọn nhầm mẫu dựng" — mà là chọn mẫu dựng TRƯỚC rồi mới
nguỵ biện ngược lại lý do. Viết ra "quan hệ người xem phải thấy hình thành" trước khi chọn
ngôn ngữ thị giác, và chọn ngôn ngữ thị giác trước khi chọn cách dựng cụ thể. Nếu quan hệ
đó để trống, cảnh chắc chắn sẽ chỉ là ảnh nền + chữ, bất kể công cụ dựng nào được dùng.

Một điều không thể kiểm tra tự động: hình ảnh có CỤ THỂ hay không. Một ly cocktail cho câu
thoại về "quán bar ở khu X" và một chồng hộ chiếu cho "người nước ngoài" đều qua được mọi
kiểm tra máy móc, nhưng đều đọc như hình ảnh stock rập khuôn — vì chúng minh hoạ CHỦNG LOẠI
chứ không phải ĐỊA ĐIỂM/ĐỐI TƯỢNG cụ thể. Khi chủ đề mang tính văn hoá/địa lý cụ thể, mô tả
hình ảnh cũng phải cụ thể tương ứng.
