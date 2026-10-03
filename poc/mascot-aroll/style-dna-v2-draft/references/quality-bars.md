# Ngưỡng chất lượng — "tốt" trông như thế nào bằng số

> **[v2 NHÁP]** Các chỉ số '% cảnh xếp chồng ≥2 ngôn ngữ', '% cảnh có hình vẽ bằng code', 'tài nguyên trung bình mỗi cảnh' là hồ sơ video tham chiếu v1, KHÔNG phải đích cho cảnh asset v2 (cảnh asset: 0 chữ/thẻ/hình vẽ trên media). Ngưỡng độ phủ ≥12% và 'không quá 3 giây không có sự kiện thị giác' vẫn áp dụng.


Đây là các ngưỡng số hoá được rút ra từ việc đo NHIỀU video thật đã lên sóng và đối chiếu
với đánh giá thật của người xem — không phải số bịa ra trước. Coi đây là **hợp đồng thiết
kế** cần tuân theo khi lên kế hoạch/tự đánh giá một video mới, bất kể công cụ dựng là gì.
(Bản gốc thực thi các ngưỡng này bằng script Python chấm tự động — ở đây chỉ giữ lại phần
NGƯỠNG và LÝ DO, để áp dụng thủ công hoặc tự triển khai lại bằng công cụ khác.)

## 1. Kế hoạch cảnh phải cụ thể, không được là lời khen suông

- `visualTransformation` (quan hệ người xem phải thấy hình thành) phải dài tối thiểu ~25
  ký tự và mô tả MỘT SỰ BIẾN ĐỔI cụ thể (cái gì đổi thành cái gì, cạnh cái gì) — không phải
  một tính từ khen ("phù hợp", "sinh động", "trực quan"). Cảnh ngắn nhất từng lên sóng đạt
  chuẩn là 31 ký tự; dưới đó coi như chưa quyết định gì.
- Mỗi tài nguyên hình ảnh phải nêu được đúng cụm từ trong lời thoại mà nó minh hoạ. Không
  nêu được nghĩa là filler — nên bỏ.
- Mỗi "sự kiện thị giác" (visualEvent) phải gắn với một nhịp có thật (asset vào/ra, hoặc
  điểm nhấn xuất hiện) — không thể tự khai khống thêm sự kiện để "trông có nhịp độ".

## 2. Đa dạng ngôn ngữ thị giác & bố cục (đã nêu ở visual-languages.md, nhắc lại số)

- Không ngôn ngữ thị giác nào >50% số cảnh.
- `text-only` ≤15% số cảnh.
- Không lặp cùng ngôn ngữ ở hai cảnh liên tiếp.
- Vùng minh hoạ lấp đầy ≥12% dải khung hình hữu dụng (sàn — dưới ngưỡng này đọc như lỗi),
  mục tiêu khuyến nghị 25%.
- Khối lượng thị giác (centroid) không lệch quá 16% chiều rộng khung hoặc 18% chiều cao
  dải nội dung so với tâm — một cảnh "nặng" đúng diện tích nhưng lệch hẳn về một góc vẫn
  tính là lỗi bố cục dù đạt độ phủ.

## 3. Nhịp độ (pacing) theo độ khó hiểu, không theo thời lượng lời thoại

`comprehensionLoad` (simple/moderate/complex) không được tự khai tuỳ ý — nó có một SÀN bắt
buộc suy ra từ chính nội dung cảnh, người lên kế hoạch chỉ được NÂNG lên, không được hạ:

| Tín hiệu trong cảnh | Sàn tối thiểu |
|---|---|
| Có một con số cụ thể được nói ra (vd "158", "1,37 km²", "2014") | complex |
| Ngôn ngữ thị giác thuộc diagram/data/timeline/flow | complex |
| Ngôn ngữ thị giác thuộc map/annotated/split/mockup/document | moderate |
| Chức năng kể chuyện thuộc mechanism/causal-chain | complex |
| Chức năng kể chuyện thuộc cause/paradox/definition/list/evidence | moderate |

Lý do: con số được nói ra là mỏ neo không thể "gian lận" — không thể xoá "158" khỏi lời
thoại thật để né bậc độ khó.

Ngưỡng thời lượng đi kèm:
- Một cảnh phải giữ đủ giây/nhịp theo độ khó của nó — một cảnh `complex` **không được ngắn
  hơn** cảnh trung vị của cả video. Vi phạm kinh điển: ba cảnh khó hiểu nhất của một video
  từng bị cắt ngắn nhất để "trả thời gian" cho các cảnh không khí dễ nhìn — đúng ngược lại
  những gì người xem cần.
- Một phần tử trên màn hình phải hiện diện tối thiểu **1.5 giây (45 khung ở 30fps)** — hiện
  rồi biến mất nhanh hơn là "chớp qua", không đọc kịp.
- Punch phrase (điểm nhấn/tiêu đề cảnh) phải giữ tối thiểu **48 khung hình (1.6 giây)**. Đo
  thật: 6/14 cảnh dùng bố cục sẵn của một video từng vi phạm ngưỡng này, tệ nhất giữ 0.7
  giây cho bốn chữ — không đủ thời gian đọc.
- Không để >3 giây trôi qua mà không có sự kiện thị giác mới nào (dead air hình ảnh).
- Tránh nhiều cảnh liên tiếp có độ dài gần bằng nhau (trong khoảng ±15%) — "cắt theo nhịp
  metronome" là dấu hiệu nhịp điệu đến từ cơ chế dựng chứ không phải từ nội dung.
- Tránh nhiều cảnh mật độ cao liên tiếp mà không có một nhịp nhẹ ("chỗ thở") xen giữa.

## 4. Chữ trên màn hình

**[v2 NHÁP]** Mục này chỉ áp dụng cho CẢNH ĐỒ HOẠ. Cảnh asset không có chữ/icon nào trên hình, trừ chữ A-roll nhấn mạnh narration (STYLE_DNA.md mục 4b).

- Nhãn vẽ tay tối đa 4 từ; không được lặp lại nguyên văn lời thoại.
- Nhãn không được đè lên một hình ảnh khác trong lúc cả hai cùng hiện — "lấp khoảng trống
  bằng cách viết đè lên ảnh" không phải là lấp khoảng trống.
- Nhãn không được lấn vào dải caption (dải dưới cùng dành cho phụ đề đồng bộ giọng đọc).
- Nếu một khái niệm đã có icon chuẩn trong bộ vocabulary (mục 6, STYLE_DNA.md), phải dùng
  icon đó thay vì đánh vần khái niệm ra bằng chữ.
- **[v2: BỎ — buộc phải có icon, mâu thuẫn với cảnh asset không icon]** (v1) Cần một "sàn biểu tượng": một tỉ lệ tối thiểu số cảnh trong video phải mang một icon vẽ
  tay — vì quy tắc "không lặp lại lời thoại" một mình có thể bị lách bằng cách đơn giản là
  không bao giờ gõ từ khoá kích hoạt.
- Chữ phải đủ tương phản với nền phía sau nó (không để mực tối chìm vào một tấm ảnh tối) —
  thêm nền chữ (plate) hoặc đổi màu chữ khi chữ nằm trên ảnh/cutout tối.

## 5. Ảnh cắt nền (cutout)

- Ảnh không được phóng to quá **1.15 lần** kích thước gốc của chính nó khi render (hiệu
  chỉnh từ phán quyết thật của người xem trên 33 asset: phàn nàn bắt đầu ở tỉ lệ 1.22 và
  hết hẳn ở 1.09, nên mốc FAIL đặt ở giữa hai mức đó). Lỗi này KHÔNG sửa được bằng cách
  cắt lại — ảnh nhỏ là nhỏ, phải tạo lại từ nguồn lớn hơn.
- Khi một vị trí đặt ảnh (slot) khai tỉ lệ khung cụ thể, file ảnh phải đúng tỉ lệ đó.
- Viền cắt nền phải sạch: không còn ám màu phông nền cũ, không có dải mờ/bóng ma quanh
  viền, chủ thể không bị cắt cụt vì tràn ra ngoài khung nguồn.

## 6. Bố cục lặp lại/đơn điệu — đo trên bản dựng thật, không đo trên kế hoạch

**[v2 NHÁP]** Ngưỡng 23-38% (thích) vs 54-67% (bị chê) vẫn là thước đo chính, và v2 dễ vi phạm nó nhất vì cảnh asset đều là media toàn khung. Với v2, "nhóm cảnh giống nhau" được đo theo KIỂU TRÌNH BÀY (đẩy vào, lùi ra, lia, đổi crop, `split`, reveal, nhiều shot cắt, thẻ `doc-NN`, chữ A-roll, cảnh đồ hoạ), trên bản dựng thật.

Cách đo hiệu quả nhất không phải đặt hạn ngạch trước khi dựng (hạn ngạch đặt trước đã hai
lần không áp dụng được cho video khác), mà là **đo nhóm cảnh giống nhau nhiều nhất** trên
một lưới contact-sheet đã dựng xong. Tương quan đo được với đánh giá thật của người xem:

| Video | % cảnh thuộc nhóm "giống nhau nhất" | Người xem đánh giá |
|---|---|---|
| Video được thích | 23-38% | "thích" |
| Video bị chê | 54-67% | "mệt, đơn điệu" |

Nếu một bố cục dựng sẵn (block/template) được tái sử dụng, giữ nó dưới **25% tổng số
cảnh**, và nếu nó lặp lại từ 3 lần trở lên thì phải xuất hiện ở **tối thiểu 2 cách sắp xếp
khác nhau** — dùng cùng một bố cục ở cùng một cách sắp xếp nhiều lần là nguồn đơn điệu lớn
nhất, không phải việc tái sử dụng bố cục tự nó.

## 7. Bốn tiêu chí nghiệm thu cuối cùng — luôn cần một người/agent thật sự NHÌN

Không ngưỡng số nào ở trên thay thế được việc xem qua bản dựng thật. Mỗi cảnh cần một
phán quyết rõ ràng trên 4 tiêu chí, với bằng chứng là khung hình cụ thể:

1. **illustrated** — lời thoại có được minh hoạ hay để người xem tự tưởng tượng?
2. **composed** — bố cục cân đối, mọi thứ nằm gọn trong khung và đọc được?
3. **varied** — không lặp công thức với các cảnh lân cận?
4. **purposeful** — mọi phần tử có mặt vì một lý do, không phải "cho có"?

Một video từng qua mọi kiểm tra số ở trên và người xem đầu tiên vẫn tìm ra bốn lỗi trong
phút đầu tiên — lý do các ngưỡng số tồn tại là để loại bỏ SUY THOÁI ÂM THẦM, không phải để
thay thế việc đánh giá bằng mắt.

## 8. Hồ sơ tham chiếu — một video đã đạt cả 4 tiêu chí trông như thế nào bằng số

**[v2 NHÁP]** Bảng dưới là hồ sơ V10 của v1 — GIỮ NGUYÊN SỐ, không hạ (đúng nguyên tắc cuối mục này). Các dòng '% cảnh xếp chồng ≥2', '% cảnh có hình vẽ bằng code', '% cảnh chỉ-ảnh-nền ≤23%', 'tài nguyên TB mỗi cảnh' KHÔNG là đích của v2 vì cảnh asset là media thuần theo thiết kế. Các dòng 'không nhạt dần ở 1/3 cuối', 'khoảng cách sự kiện thị giác ≤3s', độ phủ và tâm khối lượng vẫn áp dụng. Hồ sơ v2 sẽ được lập từ video v2 đầu tiên được duyệt, không suy diễn trước.

Video tham chiếu ("V10"): 26 cảnh, tổng thời lượng 100.78 giây.

| Chỉ số | Giá trị | Ghi chú |
|---|---|---|
| Độ phủ nội dung (coverage) | 95.9% | % thời lượng có hình ảnh gắn đúng với lời thoại đang nói |
| Giây/nhịp — cảnh complex | 2.10s | |
| Giây/nhịp — cảnh moderate | 1.80s | |
| Giây/nhịp — cảnh simple | 1.68s | |
| Số ngôn ngữ thị giác khác nhau dùng trong video | 11 / 13 | |
| Tỉ lệ ngôn ngữ được dùng nhiều nhất | 26.9% | dưới trần 50% |
| % cảnh xếp chồng ≥2 ngôn ngữ/vai trò | 42.3% | |
| % cảnh có hình vẽ bằng code (diagram/icon/flow...) | 65.4% | |
| % cảnh chỉ có ảnh nền, không hình vẽ | 23.1% | dưới trần khuyến nghị ~23% |
| % cảnh chỉ-ảnh-nền ở 1/3 cuối video | 25.0% | phải ≤ (% toàn video) + 12 điểm — video không được nhạt dần về cuối |
| Tài nguyên trung bình mỗi cảnh | 1.62 | |
| Khoảng cách lớn nhất giữa 2 sự kiện thị giác | 3.55s | dưới trần 3s có cảnh báo nhẹ nhưng đây là hồ sơ đã duyệt |
| % hàng có nội dung ở dải khung trung vị | 80.7% | dải khả dụng y≈300-1250, không tính dải caption |
| % hàng có nội dung ở cảnh yếu nhất | 17.5% | |

**Cách dùng bảng này**: khi tự đánh giá một video mới, đừng chỉ hỏi "có đạt SÀN không" —
hỏi "có gần với hồ sơ đã được duyệt này không". Một video có thể đạt mọi sàn tối thiểu mà
vẫn tệ hơn rõ rệt so với hồ sơ tham chiếu ở TẤT CẢ các chỉ số cùng lúc — đó là kiểu suy
thoái "chất lượng chênh lệch dần" mà việc chỉ so với sàn tối thiểu không bắt được.

**Không bao giờ hạ hồ sơ tham chiếu xuống bằng một video kém hơn chỉ để việc so sánh "dễ
đạt" hơn** — chỉ cập nhật hồ sơ tham chiếu khi có một video mới thực sự tốt hơn ở MỌI chỉ
số cùng lúc.
