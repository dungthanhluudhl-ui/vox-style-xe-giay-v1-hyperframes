# Khung tư duy biên tập 2 tầng — Editorial Director → Motion Implementer

## Vì sao cần 2 tầng, không phải 1

Một AI dựng video kém thường làm theo mô hình: **câu thoại mới → đổi ảnh → chữ bay vào →
lặp lại.** Kết quả kỹ thuật đẹp nhưng lặp lại và không có tiến triển, vì animation được
chọn TRƯỚC khi biết cảnh đó đang làm nhiệm vụ gì.

Cách đúng là: **ý nghĩa mới → chọn quan hệ thị giác phù hợp → quyết định người xem cần thấy
điều gì thay đổi → RỒI mới chọn component/animation.** Đảo thứ tự này là nguyên nhân gốc rễ
của mọi video từng bị đánh giá "rập khuôn, lặp lại" trong lịch sử dự án nguồn — xảy ra hai
lần độc lập, đủ để thành quy tắc cứng.

## Tầng 1 — Editorial Director

Trước khi viết bất kỳ đoạn hình ảnh nào, phải lập "bản đồ ý nghĩa" cho cảnh:

| Trường | Ý nghĩa |
|---|---|
| `narrativeFunction` | Chức năng kể chuyện của đoạn này (xem danh sách bên dưới) |
| `viewerQuestion` | Câu hỏi thị giác cảnh này đang trả lời cho người xem |
| `visualTransformation` | **Quan trọng nhất** — quan hệ nào người xem phải THẤY HÌNH THÀNH trên màn hình. Để trống trường này gần như chắc chắn cho ra một cảnh chỉ có ảnh nền + chữ |
| `contrastWithPrevious` | Cảnh này khác cảnh liền trước ở điểm nào (tránh đơn điệu) |
| `density` | Mật độ thông tin — phác thảo đường cong low/med/high cho CẢ video như một cột trước khi vào từng cảnh |
| `comprehensionLoad` | Người xem cần ĐỌC (cần thời gian) hay chỉ cần NHÌN (không cần thời gian đọc) — quyết định số giây phân bổ cho cảnh, không phải số giây lời thoại chiếm |

**Không để thời lượng lời thoại quyết định điểm cắt cảnh.** Thời gian trên màn hình không
nhất thiết bằng thời gian nói: một hình vẽ có thể giữ lâu hơn câu đã giới thiệu nó, một
cảnh không khí dễ có thể bị cắt ngắn để trả thời gian cho việc đó. Phân bổ giây theo
`comprehensionLoad` — một cảnh người xem phải ĐỌC cần ≥4 giây và ≥1.6 giây mỗi nhịp; một
cảnh chỉ cần NHÌN thì không cần vậy.

### Danh sách `narrativeFunction`

`hook` (mở đầu gây chú ý) · `question` (đặt câu hỏi) · `paradox` (nghịch lý) · `cause`
(nguyên nhân) · `causal-chain` (chuỗi nhân quả) · `list` (liệt kê) · `definition` (định
nghĩa) · `mechanism` (cơ chế) · `evidence` (bằng chứng) · `reversal` (đảo chiều) ·
`conclusion` (kết luận)

## Tầng 2 — Motion Implementer

CHỈ SAU KHI Tầng 1 xong, mới quyết định, theo đúng thứ tự:

- **Media manifest trước tiên.** Đối chiếu `visualTransformation` vừa xác định ở Tầng 1 với
  danh sách media nguồn có sẵn (mô tả, tags, `suitability_notes` trong
  `pipeline/media-analysis/manifest.json`) — media này được chuẩn bị riêng cho đúng kịch
  bản, không phải stock chung chung. Nếu có asset khớp tốt nội dung/cảm xúc cảnh: **bắt
  buộc dùng nó** (`visualLanguage` = `cutout` hoặc `background-photo`), và chỉ cân nhắc
  thêm một lớp `diagram`/`data`/`annotated` NHẸ làm overlay nếu cảnh cần nhấn số liệu/cấu
  trúc cụ thể. Chỉ khi KHÔNG asset nào khớp mới chuyển hẳn sang `diagram`/`map`/`timeline`/
  `flow` dựng thuần bằng code — code tự sinh cho các ngôn ngữ này dễ lỗi/xấu hơn nhiều so
  với dùng media thật đã có, nên luôn là lựa chọn thứ hai.
- `visualLanguage` — một trong 13 ngôn ngữ ở [`visual-languages.md`](visual-languages.md);
  ưu tiên xếp chồng ≥2 ngôn ngữ
- `template`/`backdrop`/`variant` — nền cảnh nào, biến thể animation nào
  ([`animation-variants.md`](animation-variants.md))
- Danh sách tài nguyên hình ảnh cần có, và với MỖI tài nguyên: một trường `describes` nêu
  đúng cụm từ (nguyên văn trong lời thoại) mà nó đang minh hoạ — một tài nguyên không nêu
  được nó minh hoạ cụm từ nào là filler, nên loại bỏ
- Câu chữ điểm nhấn (punch phrase)

## Schema mẫu cho một cảnh

```json
{
  "narrativeFunction": "causal-chain",
  "viewerQuestion": "Vì sao biến động giá đầu vào lại đẩy giá thành phẩm lên?",
  "visualTransformation": "hai yếu tố chi phí bên ngoài hội tụ vào một sản phẩm cuối",
  "contrastWithPrevious": "từ ảnh đời sống sang sơ đồ giải thích cơ chế",
  "density": "medium",
  "comprehensionLoad": "read",
  "visualLanguage": ["diagram", "background-photo"],
  "primaryMotion": "convergence",
  "supportingMotion": "causal-line-trace",
  "assets": [
    { "describes": "biến động giá xăng dầu", "role": "support" },
    { "describes": "chi phí vận chuyển tăng", "role": "support" }
  ]
}
```

Trường quan trọng nhất luôn là `visualTransformation`. Nếu trường này để trống, cảnh gần
như chắc chắn chỉ còn lại ảnh nền + chữ — xem 12 ví dụ cụ thể ở
[`worked-examples.md`](worked-examples.md) để thấy hệ quả thật.

## Nguyên tắc chống công thức hoá

- Mỗi cảnh chỉ giải quyết MỘT ý chính.
- Một chuyển động chính (`primaryMotion`) và tối đa một chuyển động phụ (`supportingMotion`)
  — không chồng nhiều hiệu ứng không phục vụ cùng một ý.
- Không dùng cùng một cấu hình (preset) cho mọi cảnh — xem quy tắc "không lặp liên tiếp" ở
  cả `visual-languages.md` và `animation-variants.md`.
- Hình ảnh, chữ và chú thích phải luôn có MỤC ĐÍCH cụ thể — không thêm "cho có".
- Điểm chuyển cảnh nên bám vào khoảng nghỉ hơi hoặc ranh giới câu của lời thoại thật, không
  cắt tuỳ tiện.
- Tài nguyên minh hoạ phải bám vào đúng cụm từ (cue) trong lời thoại, không phải cảm tính.
- Cần chủ động đánh giá 3 điều theo toàn bộ video: sự đa dạng giữa các cảnh (scene
  diversity), tiến triển cảm xúc (emotional progression), và mức độ lặp lại (repetition) —
  xem ngưỡng số cụ thể ở [`quality-bars.md`](quality-bars.md).

## Về giới hạn của một bộ khung tư duy

Bộ khung này KHÔNG tự nghĩ ra ý tưởng hay — nó chỉ ép việc SUY NGHĨ về ý nghĩa xảy ra trước
khi được phép chọn component/animation. Phần biến quan hệ nhân quả thành một hình ảnh cụ
thể, phát hiện phép ẩn dụ thị giác phù hợp, đánh giá bố cục, nhận ra sự lặp lại, và biết
khi nào nên phá vỡ một khuôn mẫu — vẫn phụ thuộc vào năng lực suy luận của agent đang thực
thi. Nếu đưa đúng bộ DNA này cho một model yếu hơn hoặc thiên về làm-theo-mẫu, nó có thể chỉ
tuân thủ phần bề mặt (đúng field, đúng cấu trúc JSON) mà vẫn cho ra kết quả lặp lại — vì
phần khó nhất (tự đặt câu hỏi "quan hệ nào phải hình thành") không thể ép buộc hoàn toàn
bằng schema.
