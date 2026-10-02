# POC: mascot capybara + cảnh asset thuần (ADN v2 nháp)

Trạng thái: **Bước B xong, bản nháp ADN v2 đã được người dùng duyệt (vòng 3). Bước C xong (kit + alpha + lưới chuyển động đạt). Chờ người dùng cho đi tiếp Bước D.** Chưa chạy AI, chưa sửa `scripts/` hay `planning/style-dna/` thật.
Điểm khôi phục trước nâng cấp: tag `checkpoint-truoc-nang-cap-mascot-20261003` (commit `b49ef44`).

## Mục tiêu
Kiểm chứng 2 thay đổi ADN trên vài scene thật, rồi mới quyết định đưa vào pipeline:
1. **Cảnh asset thuần**: cảnh có ảnh/video minh hoạ chỉ có media + phụ đề — không chữ, thẻ, icon, diagram, overlay.
2. **Mascot capybara**: shot riêng toàn khung do Stage 5/6 quyết định, ráp tất định từ template kit.
Cảnh thiếu asset phù hợp vẫn dùng đồ hoạ/component như pipeline hiện tại.

## Tiêu chí (người dùng chốt)
**Cấm tuyệt đối (lỗi = POC không đạt):** (a) chữ/thẻ/mascot giao nhau; (b) rotate/skew trên chữ/thẻ; (c) quá nhiều thẻ/chữ trong 1 cảnh; (d) video đơ/nhàm, mascot lặp (cùng pose liền nhau, >~3s không có sự kiện hình).
**Đạt khi:** alpha mascot đúng; 0 chữ trên cảnh asset/mascot; 0 giao nhau/xoay/tràn khung/đè phụ đề; PASS lượt đầu ≥ nhánh `base`; người dùng xem và duyệt "đẹp, không đơ, đúng tông xé-giấy".

## Cấu trúc
- `mascot-kit/capybara-library-v1/` — kit do người dùng dựng (17 PNG 1024×1536 alpha, `manifest.json`, `PIPELINE_CONTRACT.md`, template, `prompts/STAGE5-7_CONTEXT.md`). Đã được chốt, không sửa.
- `mascot-kit/kit.example.json`, `check-kit.mjs` — kiểm alpha/kích thước tất định (ffprobe/ffmpeg).
- `style-dna-v2-draft/` — bản nháp ADN v2 (bản sao md/json của `planning/style-dna/` + sửa). **Đây là thứ cần duyệt.** Xem diff: `git diff --no-index planning/style-dna poc/mascot-aroll/style-dna-v2-draft`.

## Bản nháp ADN v2 khác bản thật ở đâu
| Mục | Thay đổi |
|---|---|
| 3 Chữ | Cảnh asset + mascot: không chữ nào trên hình, chỉ phụ đề. Cảnh đồ hoạ giữ luật cũ + `[ĐỀ XUẤT]` ≤1 punch phrase + 2 nhãn/cảnh, mọi chữ/thẻ rotation=0 |
| 4 Loại cảnh | 3 loại: asset / mascot / đồ hoạ. Bỏ luật "xếp chồng ≥2 ngôn ngữ" cho cảnh asset. 4b: contract mascot (người kể, shot riêng toàn khung, ID thật, preset hold/grow-600, không quota) |
| 5 Chuyển động | Cảnh asset: sinh động bằng chuyển động của chính asset. Cảnh đồ hoạ: **bỏ `flip`, `peel`, `spiral`, `wobble-drop`, `sway`, `tremble`** (đều có xoay — gốc lỗi "thẻ nghiêng"); chỉ `bob`. Cấm rotation ≠ 0 / skew ở mọi phần tử. `[ĐỀ XUẤT]` cảnh mascot 3–5s |
| 6 Icon | Chỉ dùng ở cảnh đồ hoạ |
| 7 | Thêm đoạn "Phạm vi v2" (mascot ráp tất định) |
| `references/*` | Banner `[v2 NHÁP]` + sửa các dòng mâu thuẫn (overlay/xếp chồng/kiểu xoay) ở `editorial-framework`, `visual-languages`, `lessons`, `quality-bars`, `worked-examples`, `animation-variants`. Các ví dụ cũ trong `worked-examples` có overlay chỉ còn đúng cho cảnh đồ hoạ (đã ghi banner, chưa viết lại từng ví dụ) |
| Mục 1, 2, 8-10, `style-tokens.json` | Giữ nguyên |

## Quyết định đã chốt (vòng 2)
1. **Bỏ hoàn toàn thanh cam đáy** ở ADN v2.
2. **Nền mascot/đồ hoạ/thẻ tài liệu:** đổi biến thể nền giữa các cảnh liền kề như quy tắc cũ; **lưới tĩnh → lưới chuyển động** (trôi `x`/`y` bội nguyên ô 84px, `ease:none`, không `repeat:-1`, không xoay). Lệch contract kit ở chỗ nền không cố định `#E7E3D9`: nền là lớp riêng PHÍA SAU PNG, không đụng pixel nhân vật.
3. **Cảnh mascot 3–5s, do ý đồ nhấn mạnh + nhịp dựng + nhịp nghỉ quyết định** (không cố định).
4. **`doc-NN` = asset tương đương**, dùng như hiện nay.

## Audit bản nháp (đối chiếu toàn bộ tài liệu lõi — kết quả)
**Giữ nguyên/diễn đạt lại cho khớp v2 (không bỏ):** "ý nghĩa trước, component sau" + `visualTransformation` (thêm bảng quan hệ → cách trình bày asset); media-first (+ ngoại lệ (b) dưới dạng cảnh đồ hoạ riêng); `comprehensionLoad` và sàn nhịp (complex ≥ trung vị, phần tử ≥1,5s, tránh metronome ±15%, chỗ thở); không quá 3s không sự kiện; không lặp kiểu vào cảnh/ngôn ngữ ở 2 cảnh liền kề (mở rộng cho cả cảnh asset); chuyển động nền bắt buộc + đổi CHẾ ĐỘ giữa phần tử (thay xoay bằng `bob`/`drift-x`/`breathe`); dàn sự kiện theo cue, không dồn 2s đầu; đo đa dạng trên bản dựng thật (23–38% vs 54–67%); 4 tiêu chí nghiệm thu cần người NHÌN khung hình đã ghép caption; hồ sơ V10 giữ nguyên số (không hạ); độ phủ ≥12%, tâm khối lượng, vùng an toàn, hợp đồng phụ đề.
**Đã sửa vì mâu thuẫn trực tiếp:** "sàn biểu tượng" (bắt buộc icon) → bỏ cho v2; ngưỡng V10 "≤23% cảnh chỉ-ảnh-nền / 42% xếp chồng / 65% hình vẽ" → ghi rõ không là đích v2 (cảnh asset media thuần theo thiết kế); `sway`/`tremble`/`flip`/`peel`/`spiral`/`wobble-drop` (xoay) → bỏ; mục §7 "text/tiêu đề/punch-phrase" → chỉ cảnh đồ hoạ.
**Rủi ro chủ động ghi lại:** (i) cảnh asset dễ GIỐNG NHAU → thêm đo "kiểu trình bày"; (ii) mất công cụ nhấn mạnh bằng chữ → bù bằng camera + mascot (đánh đổi do người dùng chọn); (iii) cảnh định lượng không còn chữ/số — số chỉ nói bằng giọng + phụ đề.

## Đã duyệt thêm (vòng 3)
1. **Ngoại lệ (b):** asset không truyền tải được quan hệ chính xác (số liệu/cấu trúc/vị trí) → một CẢNH ĐỒ HOẠ riêng, không overlay lên asset.
2. **Cảnh mascot >~3,5s** → tách 2 shot đổi pose để luôn có sự kiện thị giác mỗi ≤3s (nền trôi không tính là sự kiện).
3. **Đa dạng cảnh asset:** không hai cảnh liền cùng kiểu trình bày; không kiểu nào >~35% cảnh asset; nhóm giống nhau nhất ≤38% tổng cảnh (đo trên bản dựng thật).
4. **Cảnh đồ hoạ:** ≤1 punch phrase + 2 nhãn/cảnh.

## Kết quả Bước C (đo thật, không xem ảnh)
- **Kit:** `node poc/mascot-aroll/check-kit.mjs` → 17/17 asset đạt (manifest, SHA256 khớp manifest + `FILE_SHA256.json`, PNG rgba 1024×1536, mép trong suốt). `validate-shotlist.py` của kit đạt — **trên Windows phải chạy `PYTHONUTF8=1`**, nếu không script của kit lỗi `cp1258`.
- **Bài học đo (ngưỡng ban đầu của tôi sai, đã sửa sau khi đọc số thật):** mép PNG có điểm alpha=1/255 (vô hình) và pose `shrug` có bbox kết thúc x=1016/1024 (lề 8px) → dải kiểm mép 4px, ngưỡng alpha ≤8.
- **Project thử `c-alpha-test/` (HyperFrames 0.8.56):** `hyperframes check` ok=true, 0 lỗi/cảnh báo lint-runtime-layout-contrast; lưới lớn hơn khung chỉ bị `container_overflow` mức `info` (wrapper `overflow:hidden`).
- **Alpha thật:** `measure-alpha.mjs` — vùng trong suốt của PNG lộ đúng màu giấy (snapshot rgb(231,227,217); mp4 rgb(228,224,214), lệch do nén h264, trong ngưỡng 12); thân nhân vật hiện.
- **Lưới chuyển động:** 84px/4s, `x` tween `ease:none` → dịch 72px so với kỳ vọng 71,4px, cả trên snapshot lẫn mp4 render (`--quality looks`, 4.0s, 14s render). Số liệu tốc độ/oversize đã `[ĐÃ KIỂM CHỨNG POC]` trong bản nháp.
- Vận hành: `hyperframes snapshot ... --describe false` (mặc định gửi ảnh cho Gemini nếu có `GEMINI_API_KEY`); `hyperframes@0.8.56` pin trong repo, `latest` 0.8.110 chưa dùng.

## Các bước
- [x] A. Checkpoint git (tag + push)
- [x] B. README + `style-dna-v2-draft/` (đã duyệt)
- [x] C. Kiểm kit tất định + test render PNG alpha + lưới chuyển động (đạt)
- [ ] D. Stage 5/6/7 trong mini-root (xem plan `C:\Users\DTL\.claude\plans\pure-tumbling-tome.md`)
- [ ] E. Dựng, đo, chấm A/B, người dùng xem mp4

## Lưu ý vận hành
- Claude không đọc ảnh/video của kit hay repo; kiểm bằng số liệu (ffprobe/ffmpeg) hoặc vision 9router hỏi về bố cục.
- Stage 5/6 dùng model họ `cx/*` (~20 tok/s): 500s+ là bình thường.
- Chạy lệnh nền dài thẳng, không ghép `| head`/`| tee`.
