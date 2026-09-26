# Vox-style DNA — grayscale + orange collage, 9:16

Đây là **bản đặc tả phong cách** (không phải hướng dẫn vận hành một pipeline cụ thể). Nó
chắt lọc lại toàn bộ quyết định thiết kế đã được kiểm chứng qua nhiều video thật (V10-V13)
trong repo nguồn `vox-style-3`, để bất kỳ agent nào đọc file này cũng dựng đúng phong cách
mà không cần hỏi lại. Số liệu chính xác (mã màu, kích thước, ngưỡng) nằm ở
[`style-tokens.json`](style-tokens.json) — file này diễn giải Ý NGHĨA và LÝ DO đằng sau
từng con số.

Xem ảnh thật ở [`examples/`](examples/) song song khi đọc — đặc biệt
`examples/contact-sheet-full-video.png`, một video 24 cảnh hoàn chỉnh thể hiện toàn bộ
phong cách trong một lưới ảnh.

## 1. Nhận diện thị giác cốt lõi

- **Khung hình**: 1080×1920 @30fps, dọc 9:16 (short-form: TikTok/Reels/Shorts). Chỉ đổi
  sang 16:9 khi được yêu cầu rõ.
- **Bảng màu**: nền giấy ngà `#E7E3D9`, mực đen `#141414`, cam nhấn `#FF6A1A`, lưới kẻ
  `rgba(20,20,20,0.32)`, kem cho biến thể "card" `#F5F0E4`, chữ trên nền tối `#F7F4EC`.
  Cam là màu DUY NHẤT được dùng làm điểm nhấn — không thêm màu nhấn thứ hai.
- **Font**: Be Vietnam Pro, weight 700/900 (chỉ dùng nét đậm/rất đậm, không dùng regular
  cho tiêu đề), hỗ trợ dấu tiếng Việt đầy đủ.
- **Nền cảnh mặc định**: lưới ô vuông 84px, nét `rgba(20,20,20,0.32)`. Ba biến thể khác:
  `chart` (đường kẻ ngang đậm cho cảnh số liệu), `card` (nền
  phẳng không lưới cho cảnh tiêu đề/trích dẫn), `spotlight` (vignette tối cho cảnh
  cảnh báo/hệ quả). **Chọn biến thể có chủ đích theo từng cảnh**, đừng để mọi cảnh dùng
  mặc định `grid`.
- **Thanh cam đáy khung hình**: một dải cam mỏng luôn cố định ở mép dưới cùng, không bị
  ảnh hưởng bởi zoom/pan của camera cảnh — chữ ký thị giác nhận diện thương hiệu xuyên suốt.

## 2. Xử lý ảnh cắt (cutout) — quy tắc quan trọng nhất về mặt hình ảnh

| Loại chủ thể | Màu | Đổ bóng |
|---|---|---|
| **Người** | Grayscale (đen trắng tương phản cao, KHÔNG phải halftone chấm bi — đã thử và bị loại) | CÓ — bóng cam đặc `#ff7a1a`, lệch 3% kích thước ảnh (tối thiểu 6px), là silhouette nhị phân sắc nét (không mờ, không gradient) |
| **Vật thể** | Giữ nguyên màu gốc | KHÔNG đổ bóng |

Việc này được xử lý ở bước xử lý ảnh (cắt nền), KHÔNG phải filter CSS lúc dựng — nghĩa là
file ảnh cuối cùng đã "chín" sẵn màu + bóng trước khi đưa vào cảnh.

**Ngoại lệ chính thức cho dự án này — ảnh AI tạo qua Google Flow (Stage 2b):** các ảnh đó là tranh
minh hoạ paper-collage CÓ MÀU (phong cách riêng của Stage 2b, quyết định tách khỏi bảng trên từ
2026-09-20), KHÔNG phải ảnh cutout thật đã xử lý grayscale + bóng cam. Khi dựng, dùng chúng NGUYÊN MÀU
như file gốc: không CSS filter/grayscale, không tách nền, không đổ bóng giả. Bảng trên chỉ áp cho ảnh cutout
thật đã được xử lý sẵn. Mọi stage (5 scene plan, 6 shotlist, 7 codegen + reviewer) theo ĐÚNG ngoại lệ này —
đây là nguồn duy nhất; ghi chú trong từng script chỉ nhắc lại và trỏ về đây. (Thiếu ngoại lệ này ở Stage 6
từng làm reviewer Stage 7 lật qua lật lại giữa "đòi grayscale" và "cấm filter" — xem
`planning/incident-log.md` mục 2026-09-26.)

Luôn crop sát nội dung trước khi đặt vào khung — một cutout còn nhiều viền trong suốt sẽ
luôn trông nhỏ hơn thực tế dù khung chứa nó có to bao nhiêu.

## 3. Chữ & caption

- **Punch phrase** (tiêu đề/điểm nhấn của cảnh): weight 900, cỡ mặc định 70px, lineHeight
  1.34, luôn đo bằng bề rộng ký tự thật (không đếm số ký tự để đoán) để không bao giờ vỡ
  dòng giữa câu hay tràn khung. Trên nền tối dùng màu kem `#F7F4EC` thay vì mực đen.
- **Nhãn vẽ tay** (label trong diagram/annotation): tối đa **4 từ**, và **không được lặp
  lại nguyên văn lời thoại** — nó phải bổ sung thông tin, không phải phụ đề thứ hai.
- **Caption đồng bộ giọng đọc**: 4 từ/dòng, reset ở ranh giới câu, đồng bộ theo timestamp
  cấp từ (word-level, ví dụ từ Whisper) — không tự ước lượng bằng cảm giác. Neo cố định
  `bottom: 374px`, nền `rgba(10,10,10,0.8)`, bo góc 14px, đệm `12px 24px`. Mount MỘT LẦN ở
  cấp timeline tổng (không phải theo từng cảnh) bằng frame tuyệt đối, để đọc liền mạch
  xuyên qua các lần chuyển cảnh.

## 4. 13 ngôn ngữ thị giác — chọn HÌNH THỨC trước khi chọn công cụ dựng

Xem chi tiết ở [`references/visual-languages.md`](references/visual-languages.md). Tóm
tắt: nội dung nói về một vật thể/người cụ thể mới dùng `cutout`; nói về một địa điểm dùng
`map` thật (không phải một cái ghim trên giấy trắng); nói về kích thước/khoảng cách dùng
`diagram` có đường đo; nói về chuỗi sự kiện theo thời gian dùng `timeline`; nói về
nguyên nhân→kết quả dùng `flow`; nói về một con số dùng `data` (đếm thật trên khung hình,
không chỉ in số ra); còn lại còn có `background-photo`, `split`, `quote`, `document`,
`annotated`, `mockup`, và `text-only` (giới hạn ≤15% số cảnh, chỉ dùng khi thực sự không
có gì để minh hoạ).

**Quy tắc chọn ưu tiên hàng đầu — dùng media nguồn có sẵn**: nếu có ảnh/video nguồn được
chuẩn bị sẵn cho đúng kịch bản/cảnh này (không phải stock chung chung), PHẢI ưu tiên dùng
nó (khai báo `cutout`/`background-photo`) làm lớp hình ảnh chính, thay vì dựng mới
`diagram`/`data`/`flow`/`timeline` bằng code chỉ vì một quan hệ khái niệm "tinh khiết" hơn.
Chỉ dựng thuần bằng code khi: (a) không còn asset nào khớp nội dung cảnh đó, hoặc (b) cảnh
cần thể hiện số liệu/cấu trúc/vị trí chính xác mà ảnh/video không truyền tải được — khi đó
ưu tiên làm một OVERLAY diagram/số liệu NHẸ đặt trên nền media thật, thay vì thay hẳn bằng
cảnh dựng code từ đầu. Xem chi tiết ở `references/editorial-framework.md` và
`references/visual-languages.md`.

**Các quy tắc khác**: không ngôn ngữ nào chiếm quá 50% số cảnh trong một video; không lặp
cùng một ngôn ngữ ở hai cảnh liên tiếp; và **hầu hết cảnh mạnh đều xếp chồng ≥2 ngôn ngữ**
(vd `background-photo` + một overlay `diagram` nhẹ) chứ không dùng một ngôn ngữ đơn lẻ.

## 5. Chuyển động & nhịp độ

Xem chi tiết ở [`references/animation-variants.md`](references/animation-variants.md).
Tóm tắt: 11 kiểu vào cảnh (rise/grow/punch/flip/shatter/peel/unfold/spiral/wobble-drop/
zoom-through/strike), **không bao giờ để hai cảnh liên tiếp dùng chung một kiểu vào cảnh**;
sau khi vào cảnh xong, luôn có một chuyển động nền nhẹ liên tục (sway/tremble/bob) để chủ
thể không trông như ảnh tĩnh đông cứng — và các chủ thể trong cùng khung phải lệch pha
nhau (không rung/lắc đồng bộ).

**Nhịp dựng**: một cảnh trung bình 6-9 giây (cảnh dài quá 13 giây là dấu hiệu "chết khí");
15 giây mở đầu cần nhiều nhịp riêng biệt thay vì một cảnh giới thiệu dài; punch phrase phải
giữ tối thiểu 48 khung hình (1.6 giây) để đọc kịp; không được để quá 3 giây trôi qua mà
không có sự kiện thị giác mới nào xuất hiện (dead-air).

**Ngưỡng dưới — không hy sinh nhịp độ để chiều theo media**: quy tắc "ưu tiên dùng media
nguồn có sẵn" ở mục 4 KHÔNG được phép biến một scene thành ngắn hơn ~5 giây chỉ để mỗi
asset có một scene riêng. Nếu nội dung lời thoại cho một beat quá ngắn để tách thành scene
độc lập đạt chuẩn 5s+, chọn MỘT trong hai hướng thay vì tách nhỏ: (a) gộp nhiều asset liên
quan vào chung một scene (cắt cảnh giữa các asset bằng shot ngắn bên trong cùng một scene),
hoặc (b) giữ hình ảnh hiển thị LÂU HƠN lời thoại đã giới thiệu nó — thời gian trên màn hình
không bắt buộc bằng thời gian nói (xem `references/editorial-framework.md`, nguyên tắc
`comprehensionLoad`). Ưu tiên dùng media thật và giữ đủ nhịp độ để xem kịp là YÊU CẦU ĐỒNG
THỜI, không phải hai lựa chọn đánh đổi lẫn nhau.

## 6. Icon vocabulary chuẩn hoá

15 biểu tượng vẽ tay bằng đường path tự-vẽ-dần (không phải icon tĩnh): ban, check, clock,
crowd, density, doc, fall, money, person, phone, pin, question, rise, scale, warning. Nếu
một khái niệm đã có icon chuẩn VÀ không có media nguồn nào khớp khái niệm đó, dùng icon
thay vì viết chữ diễn giải ra. Icon dùng để bổ sung một điểm nhấn nhỏ trên nền media thật là
tốt; dựng cả một cảnh chỉ bằng icon/diagram tự vẽ trong khi có sẵn asset phù hợp thì không —
diagram/icon tự-vẽ-dần phức tạp rất dễ lỗi hoặc trông xấu khi để code tự sinh hàng loạt, nên
ưu tiên dùng làm chi tiết nhỏ, không phải cấu trúc chính của cảnh.

## 7. Khung tư duy biên tập — "Ý NGHĨA trước, COMPONENT sau"

Đây là nguyên tắc quan trọng nhất trong toàn bộ DNA này, và là nguyên nhân gốc rễ khiến
một AI dựng video thường ra kết quả "công thức hoá, lặp lại" nếu bỏ qua nó. Xem đầy đủ ở
[`references/editorial-framework.md`](references/editorial-framework.md).

Trước khi viết bất kỳ đoạn hình ảnh nào cho một cảnh, phải trả lời được câu hỏi:

> **Quan hệ nào người xem phải THẤY HÌNH THÀNH trên màn hình?**

Không phải "cảnh này đang nói về cái gì" (câu hỏi đó chỉ ra minh hoạ cho ĐỀ TÀI, tức là
filler) — mà là quan hệ cụ thể một tấm ảnh tĩnh không thể truyền tải được: một kích thước
so với cơ thể người, một lực tác động rồi bị chặn lại, một số đếm tăng dần đến một con số,
một chuỗi đang hoạt động rồi đứt gãy.

Chỉ sau khi xác định được quan hệ đó, mới lần lượt quyết định: chức năng kể chuyện của
đoạn thoại này là gì (hook/câu hỏi/nghịch lý/nguyên nhân/chuỗi nhân quả/liệt kê/định
nghĩa/cơ chế/bằng chứng/đảo chiều/kết luận) → **có media nguồn nào đã chuẩn bị sẵn khớp
quan hệ đó không** (kiểm tra manifest media trước tiên — media chuẩn bị riêng cho kịch bản
này luôn được ưu tiên hơn dựng mới) → ngôn ngữ thị giác nào phù hợp (mục 4) → và CUỐI CÙNG
mới là animation/component cụ thể để dựng nó. Đảo ngược thứ tự này — chọn animation/template
trước rồi mới biện minh ngược lại — là nguyên nhân gốc của mọi video bị người xem đánh giá
"rập khuôn, lặp lại".

**Phạm vi code scene (HyperFrames, trước đây Remotion)**: diagram/icon tự-vẽ-dần phức tạp
(mục 6) rất dễ lỗi hoặc trông xấu khi để code tự sinh hàng loạt. Code scene nên tập trung vào
phụ đề/caption, text/tiêu đề/punch-phrase, ráp nối & hiệu ứng cho A-roll/B-roll (media thật:
crop/pan/zoom/Ken-Burns, chuyển cảnh), và motion graphics/transition effect (GSAP timeline bên
HyperFrames) — không phải vẽ minh hoạ từ đầu khi đã có media phù hợp. Diagram/icon tự vẽ toàn
cảnh chỉ dùng khi thực sự không có media phù hợp (mục 4), ưu tiên phiên bản đơn giản thay vì bộ
"self-drawing SVG path" phức tạp ở mục 6 nếu không thật sự cần thiết cho cảnh đó.

## 8. Ngưỡng chất lượng — "tốt" trông như thế nào bằng số

Xem đầy đủ ở [`references/quality-bars.md`](references/quality-bars.md), gồm cả hồ sơ số
liệu tham chiếu của video được đánh giá đạt cả 4 tiêu chí nghiệm thu. Vài ngưỡng cốt lõi:
độ phủ vùng minh hoạ ≥12% khung hình (mục tiêu 25%), hero chiếm 45-55% dải nội dung hữu
dụng, không quá 3 giây không có sự kiện thị giác mới, và video không được "nhạt dần" ở
1/3 cuối.

## 9. Bài học đã trả giá

[`references/lessons.md`](references/lessons.md) tổng hợp các quyết định thiết kế đã sai
một lần và không nên lặp lại (vd: một ghim trên bản đồ trắng không phải là bản đồ; vẽ
khung chứa — TV, điện thoại — thay vì cố cắt nền một vật thể có hình dạng đơn giản; một
claim về mật độ phải được vẽ như mật độ, không phải một ví dụ đại diện).

## 10. Cách dùng bộ DNA này cho một dự án mới

1. Đọc toàn bộ file này trước.
2. Đọc [`references/worked-examples.md`](references/worked-examples.md) — 12 ví dụ thật
   "lời thoại → quyết định hình ảnh" kèm phương án bị loại và lý do. Đây là phần huấn
   luyện trực giác quan trọng nhất, đọc trước khi quyết định hình ảnh cho BẤT KỲ cảnh nào.
3. Khi lên kế hoạch cảnh, dùng đúng schema ở `references/editorial-framework.md` (đừng bỏ
   qua tầng Editorial Director để nhảy thẳng vào chọn animation).
4. Khi cần biết một quyết định có "đủ tốt" chưa, đối chiếu với `references/quality-bars.md`.
5. Style đã được quyết định sẵn — không cần hỏi lại user về màu sắc/font/tỉ lệ khung hình,
   trừ khi họ chủ động muốn đổi.
