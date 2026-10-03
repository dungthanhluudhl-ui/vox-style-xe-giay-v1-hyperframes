# Biến thể chuyển động vào cảnh (entrance animations)

Mỗi cảnh, chủ thể chính (hero cutout) phải có một kiểu vào cảnh THẬT SỰ khác biệt. **Không
bao giờ để hai cảnh liên tiếp dùng chung một kiểu** — lặp lại cùng một chuyển động đọc như
phẳng lì, thiếu sức sống. Sau khi chuyển động vào cảnh kết thúc, luôn phủ thêm một chuyển
động nền nhẹ liên tục (bob/sway/breathe) lên trên, để không có gì trông như một tấm ảnh
tĩnh đông cứng suốt phần còn lại của cảnh.

Đoạn giả-code dưới đây dùng cú pháp kiểu Remotion (`spring`/`interpolate` theo biến `frame`
cục bộ của cảnh) chỉ để minh hoạ THAM SỐ CHUYỂN ĐỘNG — có thể chuyển đổi sang bất kỳ engine
animation nào khác (CSS keyframes, GSAP, After Effects expressions...) miễn giữ đúng cảm
giác chuyển động và thời lượng.

## rise
Trượt lên từ phía dưới vị trí cuối cùng trong khi mờ dần hiện ra, hơi vọt lố (overshoot).
```
y = spring(frame, from: 120, to: 0, damping: 14)
opacity = interpolate(frame, [0, 12], [0, 1])
```
SFX gợi ý: `whoosh`.

## grow
Phóng to từ ~0.6x lên 1x với hiệu ứng lò xo vọt lố qua 1.0.
```
scale = spring(frame, damping: 10, stiffness: 120)
```
SFX: `thud` (đáp có trọng lượng) hoặc `pop` cho chủ thể nhẹ hơn.

## punch
Bật vào gần như full size gần như tức thì (2-3 khung hình), rồi một cú co giãn (squash/
stretch) dứt khoát để ổn định lại. Đọc như dứt khoát/khẩn cấp.
```
t = spring(frame, damping: 7, stiffness: 300)
scaleX = 1 + (1 - t) * -0.15
scaleY = 1 + (1 - t) * 0.15
```
SFX: `pop` hoặc `coin` cho một số liệu/thống kê vừa đáp xuống.

## flip
Xoay quanh trục dọc (rotateY, có phối cảnh) từ 90 độ về 0. Hợp cho một "sự tiết lộ" hoặc
một nhịp trích dẫn/hội thoại.
```
rotateY = interpolate(frame, [0, 14], [90, 0])
```
SFX: `swipe`.

## shatter
Chủ thể vào cảnh dưới dạng 4-6 mảnh vỡ sẵn (cắt ảnh nguồn thành từng mảnh, hoặc giả lập
bằng clip-path) bay vào từ nhiều hướng rồi khớp lại đúng lúc va chạm. Kịch tính nhất — hợp
cho một đoạn kết hoặc một "điểm vỡ vụn".
SFX: `shatter`.

## peel
Vào cảnh như một miếng sticker đang được bóc và dán xuống: bắt đầu xoay/nhấc lên ở một góc
với khoảng hở bóng mờ bên dưới, rồi nằm phẳng với một cú nảy nhẹ.
```
rotate = interpolate(frame, [0, 16], [-8, 0])
liftY = interpolate(frame, [0, 16], [-30, 0])
```
SFX: `paper`.

## unfold
Bắt đầu co gần về 0 chỉ trên MỘT trục (scaleY từ 0.1 lên 1, như mở một nắp gấp giấy), rồi
trục còn lại bắt kịp sau nửa nhịp.
SFX: `boing`.

## spiral
Kết hợp một vòng xoay (720 độ → 0) với phóng to dần, giảm tốc mạnh để phần lớn vòng xoay
hoàn tất trong 1/3 đầu của chuyển động vào cảnh.
```
rotate = interpolate(frame, [0, 20], [720, 0], easeOutCubic)
scale = interpolate(frame, [0, 20], [0.3, 1])
```
SFX: `boing` hoặc `whoosh`.

## wobble-drop
Rơi từ trên xuống theo trọng lực (đường cong bậc hai, KHÔNG tuyến tính), đáp xuống, rồi lắc
qua lại vài lần trước khi ổn định.
SFX: `thud` lúc đáp.

## zoom-through
Bắt đầu rất to (2.5x+) và hơi mờ, thu nhỏ nhanh qua 1x với chút vọt lố, như camera đang
"xuyên qua" nó. Hợp làm cú cắt cứng sang một cảnh mới.
SFX: `whoosh`.

## strike
Dành cho một vật thể có trọng lượng va chạm thật (một cái búa gỗ toà án) — không phải một
cú bật vào chung chung. Vung vào từ một góc xoay được nâng lên rồi khựng lại nhanh ở vị trí
nghỉ, kèm một cú giật lùi nhẹ (recoil) ngay lúc đáp. Kết hợp cùng lúc trên cùng một khung
hình: chuyển động + một ánh chớp va chạm (impact flash) + một cú rung camera ngắn — chính
sự đồng thời này khiến nó đọc như một cú va chạm THẬT, chứ không phải ba hiệu ứng rời rạc
không liên quan.
```
rotate = interpolate(frame, [0, 9], [-42, 0])
scale = interpolate(frame, [8, 9, 13], [1, 1.06, 1])
```
SFX: một tiếng click/thud dứt khoát đúng vào khung hình đáp, không phải khung hình 0.

## Chuyển động nền (idle motion) — sau bất kỳ kiểu vào cảnh nào

Thay đổi CHẾ ĐỘ chuyển động giữa các phần tử trên màn hình, không chỉ lệch pha — dùng lặp
đi lặp lại một kiểu lắc hình sin cho mọi thứ cũng đọc phẳng như chỉ dùng một kiểu vào cảnh:

- `sway` (mặc định) — xoay nhẹ nhàng, `sin(frame/22) * 3 độ`.
- `tremble` — nhanh hơn, nhỏ hơn, rung không đều (năng lượng lo lắng):
  `sin(frame/4)*1.1 + sin(frame/2.3)*0.6`, đơn vị độ.
- `bob` — trôi dọc chậm thay vì xoay (hợp cho vật treo/lá cờ): `sin(frame/18) * 6`, đơn vị px.

Lệch pha giữa các phần tử để nhiều cutout trên cùng khung hình không bao giờ chuyển động
đồng bộ, bất kể cùng chế độ hay khác chế độ. Chỉ vài px / 1-2 độ là đủ — nhiều hơn đọc như
lộn xộn, không phải "sống động".
