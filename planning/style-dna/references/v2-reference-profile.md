# Hồ sơ tham chiếu v2 — video `su-kien-thien-an-mon` (đã được người dùng duyệt 03/10/2026)

> Bằng chữ + số đo, KHÔNG ảnh (agent không xem ảnh; mọi số đo lấy bằng công cụ trong `scripts/qa/`). Đây là **một** video v2 được duyệt → dùng để
> hiểu "v2 trông như thế nào bằng số", **chưa đủ để hiệu chỉnh lại ngưỡng** của `quality-bars.md` (ngưỡng đó vẫn là hồ sơ V10 của v1).

## Cấu trúc
| Chỉ số | Giá trị |
|---|---|
| Thời lượng / số cảnh | 130,5 s / 14 cảnh (khớp audio thật 130,52 s) |
| Cảnh asset / cảnh đồ hoạ | 11 (79% thời lượng) / 3 (21%) |
| Độ dài cảnh | nhỏ nhất 7 s, trung vị 9 s, lớn nhất 12 s |
| Asset | 6 ảnh + 5 video (video chỉ 8 s → ảnh khung cuối giữ hình tới hết shot) |
| Shot asset | 11 shot, trung bình 9,4 s, mỗi cảnh một asset (không tách một ảnh thành nhiều shot) |
| Camera | 7 kiểu trên 11 shot: drift-in 3, drift-out 3, pan-right/pan-left/pan-up/diag-dr/diag-ul mỗi kiểu 1; không kiểu nào liền kề cảnh trước |
| Chuyển cảnh | cắt thẳng; scene nối liền mạch (0 ms khe hở) |
| Nền nhìn thấy | 4 biến thể khác nhau ở 4 cảnh có nền nhìn thấy (chart / spotlight / card / grid-moving) |
| Cảnh đồ hoạ | mỗi cảnh đúng 3 khối chữ (1 punch + 2 nhãn), không xoay |
| Chữ A-roll | 1 chữ (`stamp` + `dim-lower`) ở cảnh narration nêu khẳng định quyết định; hiện lệch 0 ms so với từ neo, giữ 3,62 s |

## Chất lượng đo được (công cụ → kết quả)
- `ffmpeg blackdetect` (ngưỡng 0,01 s): **0** khoảng đen. `scripts/qa/measure-flat-frames.mjs`: **0** đoạn phẳng bất thường (kể cả đầu cảnh đồ hoạ).
- `hyperframes check` mọi cảnh PASS; Stage 7b PASS; chuyển động trước/trong cửa sổ chữ: 0 bước nhảy, 0 khựng ngoài sự kiện có chủ ý.
- Vision (chỉ bố cục): 0 chồng đè / nghiêng / tràn / cắt chủ thể / đè phụ đề; chữ A-roll đọc rõ 4/5, không che mặt.
- 33 cảnh báo `drawElement blank-frame suspect` còn lại đã kiểm: dương tính giả của engine (khung đồ hoạ ít chi tiết), không có khung hỏng thật.

## Điều video này KHÔNG chứng minh
Chưa có video v2 nào nhiều ảnh ngang/`doc-NN` hay nhiều chữ A-roll được duyệt; ma trận 35 tổ hợp chữ × asset đã kiểm bằng `hyperframes check` + vision
nhưng chưa nằm trong video thật nào ngoài tổ hợp `stamp + dim-lower`. Khi có video v2 thứ hai được duyệt: đối chiếu và hiệu chỉnh ngưỡng ở `quality-bars.md`.
