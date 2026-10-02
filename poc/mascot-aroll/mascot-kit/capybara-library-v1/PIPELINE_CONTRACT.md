# Contract chọn mascot cho Stage 5–6–7

Đây là contract PoC v1, chưa áp dụng vào schema/validator production. Catalog chỉ chứa 17 asset đã hoàn thành. Không suy ra tổ hợp trang phục×biểu cảm từ tên: phải có đúng ID trong manifest.

| Stage | Quyết định | Giao cho stage sau |
|---|---|---|
| 5 — scene plan | Có cần người kể xuất hiện? Vai trò kể chuyện và sắc thái gì? | mode=mascot và mascotIntent; textIntent do plan quyết định |
| 6 — shotlist | Chọn chính xác ID thật, thời gian, safe rect và preset | mascotAssetId, startMs/endMs, layoutSpec, animationPreset, textEvents |
| 7 — codegen | Bind asset đã resolve vào renderer chung | PNG nguyên trạng, timeline đúng shotlist, không thêm pose/trang phục/chữ |

Stage 5 không đặt quota mascot và không dùng mascot chỉ để lấp mọi đoạn thiếu asset. Nếu thiếu media nhưng cần thể hiện cơ chế, chọn shot graphics riêng. Mascot là người kể; không thay cho hình chứng minh sự kiện.

Ví dụ intent của một scene:

```json
{"id":"S01","startMs":0,"endMs":3600,"mode":["mascot"],"mascotIntent":{"narrativeRole":"question","outfit":"host","tone":"curious"},"textIntent":null}
```

Stage 6 chọn `capy-v1-host-question`. Field mode=mascot/mascotIntent và animationPreset cần được bổ sung/mapping có chủ đích khi tích hợp repo. Các field mascotAssetId/presentationMode trong PoC trước được giữ cùng ý nghĩa.

Stage 6 đọc catalog metadata và chỉ chọn tổ hợp có sẵn. Chưa có scientist/analyst/history outfit trong kit đã chốt. Khi không có outfit cụ thể, Stage 6 có thể chọn host phù hợp và ghi lý do. Stage 7 không được tự đổi ID nếu file thiếu; phải trả lỗi về bước resolve/shotlist.

Mỗi shot mascot dùng một pose. Nếu cần chuyển pose, Stage 6 tách thành shot mới với timing rõ. V1 không có chuyển động miệng tự động, blink loop hoặc lip-sync. Có thể dùng cut/grow-600 theo plan; không thêm idle motion ngẫu nhiên.

## Context tối thiểu gửi Stage 7

Chỉ gửi shot được chọn, resolved asset metadata (ID, file, width, height, sha256), template chung và contract. Không đưa cả 17 ảnh vào context model. Không cần gửi đoạn trao đổi đã thiết kế nhân vật.

## Điều kiện chặn

- ID không tồn tại hoặc status khác ready; path không khớp ID hoặc file/hash sai.
- mascotAssetId cùng xuất hiện với illustrative assetId hay graphicsSpec trong một shot mascot.
- codegen tạo lại mặt/quần áo bằng CSS, SVG, canvas hoặc yêu cầu sinh ảnh tại render time.
- crop, stretch, mirror, filter/shadow mới hoặc đặt nhân vật vào vùng caption.
- text không nằm trong textEvents của shotlist.
- lipSync=true hoặc tự luân phiên hai pose miệng ở v1.

Caption có thể chạy như track riêng theo policy toàn video; caption không phải text nhấn mạnh do codegen tự thêm. Review vẫn cần kiểm tra project đã ráp, không dừng ở standalone.
