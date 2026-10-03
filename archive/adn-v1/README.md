# archive/adn-v1 — ADN v1 + script codegen v1 (DỰ PHÒNG, chỉ đọc khi người dùng yêu cầu)

Bản v1 của pipeline dựng video trước khi ADN v2 thành mặc định (03/10/2026): mọi cảnh đều do generator + reviewer viết code (kể cả cảnh asset có thẻ/chữ/overlay),
thanh cam đáy, lưới nền tĩnh, 11 kiểu vào cảnh (có kiểu xoay). Lưu lại để quay về khi cần; **không đọc** nếu không được yêu cầu (gây nhiễu, tốn context).

## Nội dung
- `scripts/05-scene-plan.router.mjs`, `06-shotlist.router.mjs`, `07-codegen.hf.router.mjs`, `lib/review-gate.mjs`, `lib/sync-root-hf-lib.mjs` — bản v1.
- `style-dna/` — ADN v1 đầy đủ (STYLE_DNA, references, tokens, **`examples/`** = ảnh/contact sheet 24 cảnh video v1 từ vox-style-3 V10–V13).
- `style-dna-integration.md` — cách ADN v1 áp dụng cho repo.

## Khôi phục v1 (nếu cần dựng/sửa một video v1 cũ)
1. Checkpoint git: tag `checkpoint-truoc-tich-hop-adn-v2-20261003` là trạng thái repo ngay trước khi tích hợp v2 (`git checkout <tag> -- scripts planning/style-dna planning/style-dna-integration.md`).
2. Hoặc copy ngược từ thư mục này: 5 file script về `scripts/` (ghi đè), `style-dna/` về `planning/style-dna/`, `style-dna-integration.md` về `planning/`.
3. Các thư viện v2 mới (`scripts/lib/{asset-scene,key-text,key-text-plan,media-layout,scene-tiling,blank-start,v2-checks,render-qa}.mjs`) có thể để nguyên — v1 không import chúng.
Lưu ý: dữ liệu video v1 đã dựng (`planning/videos/*`, `hyperframes/videos/*`, `out/*`) KHÔNG bị đụng; chỉ script/DNA mặc định đổi sang v2.
