# Shotlist — poc

> Sinh bởi `scripts/06-shotlist.router.mjs` qua cx/gpt-6-sol. Nguồn dữ liệu: `planning/videos/poc/shotlist.json`. FPS=30.

Tổng: 3 shot trên 2 scene

## S08 — nên không chấp nhận kháng cáo kêu oan và giữ nguyên mức án 7...

| Shot | Frame (start–end) | Thời gian | Asset | Trim | Xử lý | Camera | Overlay | Transition |
|---|---|---|---|---|---|---|---|---|
| S08-1 | 1894–2040 (146f) | 63.120s–67.990s | doc-02 (doc-02-verdict.png) | — | Hiện dạng thẻ tài liệu canh giữa khung trên nền card, giữ nguyên tỉ lệ; KHÔNG crop hoặc cover toàn khung. Giữ chữ rõ suốt shot, không làm mờ, giảm độ sáng, che chữ hay vẽ thêm highlight hoặc khung lên ảnh. | static | icon:"ban"@63500ms; diagram:"undefined"@65480ms | rise |

## S11 — Kết quả, ngày 26 tháng 9 năm 2024, Tòa án nhân dân cấp cao t...

| Shot | Frame (start–end) | Thời gian | Asset | Trim | Xử lý | Camera | Overlay | Transition |
|---|---|---|---|---|---|---|---|---|
| S11-1 | 2360–2481 (121f) | 78.680s–82.710s | doc-01 (doc-01-header.png) | — | Hiện dạng thẻ tài liệu canh giữa khung trên nền card, giữ nguyên tỉ lệ; KHÔNG crop hoặc cover toàn khung. Giữ chữ rõ suốt shot, không làm mờ, giảm độ sáng, che chữ hay vẽ thêm highlight hoặc khung lên ảnh. | static | label:"HỒ SƠ PHÚC THẨM"@80830ms | flip |
| S11-2 | 2481–2610 (129f) | 82.710s–87.000s | doc-03 (doc-03-verdict.png) | — | Thay hẳn thẻ trước bằng doc-03, hiện dạng thẻ tài liệu canh giữa khung trên nền card, giữ nguyên tỉ lệ; KHÔNG crop hoặc cover toàn khung. Giữ chữ rõ suốt shot, không làm mờ, giảm độ sáng, che chữ hay vẽ thêm highlight hoặc khung lên ảnh. | static | diagram:"undefined"@84550ms | cut |

## Ghi chú từng shot

- **S08-1**: Biểu tượng chặn minh họa quyết định không chấp nhận kháng cáo; hai dải bằng nhau minh họa mức án được giữ nguyên. Không đánh dấu thêm lên dòng chữ đã tô cam trong doc-02. Con số 7 năm đến từ lời thoại, không được trình bày như chữ nằm trong ảnh trích dẫn.
- **S11-1**: Thẻ đầu bản án cung cấp ngày và cơ quan xét xử. Giữ đủ thời gian đọc; không đặt overlay đè lên nội dung tài liệu.
- **S11-2**: Doc-03 là thẻ quyết định thay cho doc-01, không chồng hai ảnh. Dải so sánh nằm hoàn toàn ngoài ảnh chứng cứ: mức 3 năm lấy từ lời thoại, không được trình bày như nội dung có trong doc-03.