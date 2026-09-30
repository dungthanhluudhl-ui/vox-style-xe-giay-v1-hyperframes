# POC: nguồn PDF bản án (Stage 2c → Stage 3)

Sandbox riêng, KHÔNG đụng pipeline thật: dùng `--root=poc/pdf-source` nên mọi đường dẫn
(content/, pipeline/, public/) nằm trong thư mục này.

- Input: `content/videos/poc/source/ban an 23 2023 ben tre.pdf` (thực chất là Bản án 935/2024/HS-PT,
  23 trang, có text-layer) + `content/videos/poc/script.txt` (script 935).
- Chạy lại (từ gốc repo): `node scripts/02c-pdf-source.local.mjs --video=poc --root=poc/pdf-source`
- Kết quả: `pipeline/videos/poc/case-source/{case-facts.json,crosscheck.md,pages/}` và
  `public/videos/poc/media/documents/doc-NN-*.png`.
- Idempotent: chạy lại sẽ ghi đè doc-*.png và case-facts.json.
- Mở rộng POC theo từng giai đoạn: sau khi sửa Stage 3 / Stage 5-6 sẽ chạy thử tại đây.

## Giai đoạn B (đã xong; 03a đã đổi tên thành Stage 2c): Stage 3 nối doc-NN vào manifest
- Ảnh test: 2 ảnh từ video 935 (bản sao, không đụng bản gốc) trong `public/videos/poc/media/images/`.
- Chạy: `node scripts/02c-pdf-source.local.mjs --video=poc --root=poc/pdf-source` rồi
  `node scripts/03-media-analyze.router.mjs --video=poc --root=poc/pdf-source`
- Kết quả: `pipeline/videos/poc/media-analysis/manifest.json` = img-01, img-02 (vision) + doc-01..04
  (`source:"pdf"`, `provenance` có trang/bbox/quote). Bỏ `case-facts.json` đi thì manifest chỉ còn img-*
  và cùng bộ field như cũ (đã kiểm).

## Giai đoạn C (đã xong): Stage 5 → 6 → 7 với ảnh trích dẫn PDF
POC này chạy như một "mini-root": `cd poc/pdf-source` rồi gọi script ở `../../scripts/…` (mọi script dùng
`process.cwd()` làm gốc). Cần nạp env 9router từ `.env` gốc repo (không sao chép `.env` vào đây):
`set -a; . ../../.env; set +a`. `planning/style-dna/` (chỉ md/json) và `.agents/skills/` (core+animation)
là bản sao tối thiểu để Stage 5/7 đọc được.
- Input rút gọn: script + captions cắt còn 12 đoạn kể phần xét xử (đoạn 46–57, 87s); bản đầy đủ ở `full/`.
- Chạy: `node ../../scripts/02c-pdf-source.local.mjs --video=poc` → `03-media-analyze` → `05-scene-plan` →
  `06-shotlist --scenes=S08,S11` → `07-codegen.hf.router --scenes=S08`.
- Kết quả: `planning/videos/poc/{scene-plan,shotlist}.json`, `hyperframes/videos/poc/compositions/scene-s08.html`,
  `hyperframes/videos/poc/snapshots*/` (khung render). `vision-check.mjs` nhờ vision 9router đánh giá
  bố cục/độ đọc được của thẻ bản án (KHÔNG yêu cầu chép chữ — Gemini chặn `recitation`).
