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

## Kết quả Bước D+E — E2E `vua-chuot-ratking-phan-1` (32s, 10 asset), chạy 03/10 (mini-root `run-v2/`)
Tái tạo: `node poc/mascot-aroll/setup-run.mjs --video=vua-chuot-ratking-phan-1 --clean`, rồi từ `run-v2/` nạp `.env` gốc (`set -a; . ../../../.env; set +a`) và chạy `scripts/05-…`, `06-…`, `07-codegen-hf-parallel.mjs --scenes=S01,S02,S03,S04`, `09-render.hf.mjs`. Ghi đè nằm ở `overrides/scripts/` (05, 06, 07, `lib/review-gate.mjs`, mới: `lib/mascot-scene.mjs`, `lib/v2-checks.mjs`); ADN = `style-dna-v2-draft/`. Kết quả nhẹ lưu ở `results/vua-chuot-ratking-phan-1/`; **mp4: `run-v2/out/vua-chuot-ratking-phan-1-full.mp4`** (63,9MB, gitignored).
- **Stage 5** (`ag/gemini-3.8-flash-high`, 77s): 4 scene = S01 asset (hook, `pan`) · S02 **mascot** (paradox, `shrug`, 5,2s) · S03 asset (`multi-shot-cut`) · S04 asset (`reveal`). Vượt kiểm tra v2 ngay lần đầu.
- **Stage 6** (44s): 12 shot; S02 tách 2 shot đổi pose (`shrug` grow-600 → `welcome` hold); mọi shot asset `overlays=[]`.
- **Stage 7:** 4/4 PASS lượt đầu (S02 ráp TẤT ĐỊNH từ kit, không gọi AI; S01/S03/S04 do generator, 0 lần v2-check/overflow bị chặn, 3 góp ý reviewer). **Stage 7b** PASS, render `looks` 1080×1920 32,067s (audio 32,039s), `completion-manifest` mọi `*Ok=true`.
- **Kiểm tra độc lập (không tin điểm PASS):** `results/vua-chuot-ratking-phan-1/verify-v2.mjs` (chạy từ `run-v2/out/`) trên 4 file scene đã ráp: 0 khối chữ, 0 xoay, 0 `<svg>`; **ca đối chứng** (chèn chữ+svg+rotation) bị bắt cả 3 lỗi. Trên mp4 thật: alpha mascot đúng (nền lộ qua vùng trong suốt), lưới trôi 54px vs 53,9px kỳ vọng, đổi pose ở 9,64s có sai khác pixel rõ.
- **Vision QA bố cục** (9router `vision_qa`, 15 khung, chỉ hỏi bố cục): S02 mascot sạch 4/4 khung, điểm 5/5. Cảnh asset: không có mảng đen/tràn khung và không cắt chủ thể; vision báo "chồng" ở 3 khung S04 và 1 khung S03 nhưng đó là phụ đề đè lên nhãn nằm trong ảnh gốc (không phải phần tử do code thêm); điểm 3–5 (thấp nhất 3/5 ở S04 @31,5s).

### Phát hiện cần người dùng cân nhắc (chưa quyết, chưa sửa)
1. **Chữ/nhãn nghiêng nằm SẴN TRONG ẢNH AI gốc** (Stage 2b): vision thấy nhãn như `OUTWARD STRUGGLE`, `RAT KING`, `SPECIMEN NO. 412` trên nhiều khung S03/S04, và cờ "nghiêng/có overlay" của vision ở cảnh asset trùng với các khung này; code do pipeline thêm đã được xác nhận bằng HTML là KHÔNG có chữ/xoay. Nếu các lỗi "thẻ chữ nghiêng/đè" ở video trước một phần đến từ chính ảnh AI (chữ dán xiên trong ảnh), ADN v2 một mình không chữa được — cần xử lý ở prompt tạo ảnh Stage 2b (cấm chữ/nhãn trong ảnh) hoặc chấp nhận. Đây là giả thuyết từ vision + đọc code, chưa kiểm chứng trên video cũ.
2. **Phụ đề đè lên phần dưới ảnh toàn khung** (vision báo ở S03 @20,5s và cả S04): media là toàn khung 1080×1920 `object-fit:cover`, phụ đề (bottom 374px) nằm đè lên nửa dưới hình theo thiết kế hiện hành; nếu ảnh có thông tin quan trọng ở dưới (nhãn trong ảnh) thì bị che. Lựa chọn: giữ toàn khung (hiện tại) hoặc đặt media gọn trong dải y160–1390 (cần nền hiển thị phía sau — thêm lớp nền).
3. Mẫu thử nhỏ (1 cảnh mascot / 4 cảnh): chưa đo đa dạng cảnh asset, ngưỡng "mascot ≥1/3 cuối" hay A/B với `base`.

## Kết quả POC 2 — `flydubai-fz1073` (183s, 24 scene, 17 ảnh + 1 video tư liệu), chạy 03/10 (mini-root `run-flydubai/`)
Người dùng chọn video này (dài hơn, phức tạp, nội dung nhạy cảm). **Không có `doc-NN`** (đừng nhầm với bảng số scene-không-asset của kế hoạch cũ). mp4: `run-flydubai/out/flydubai-fz1073-full.mp4` (142MB, 182,600s vs audio 182,736s, gitignored). Kết quả nhẹ: `results/flydubai-fz1073/`.
**Kết quả:** 24 scene = 13 asset + 6 mascot (25%) + 5 đồ hoạ; 57 shot. Stage 7: asset 13/13 PASS lượt đầu; mascot 6/6 (tất định); đồ hoạ 1/5 lượt đầu (S09 2 lượt, S18/S24 3 lượt, S20 phải sửa bộ kiểm). 7b + render đạt, `completion-manifest` mọi `*Ok=true`.
**Kiểm độc lập trên video thật:** `verify-v2.mjs` 24/24 scene đạt theo kind (asset/mascot 0 chữ, đồ hoạ đúng ≤3 khối chữ); `measure-mascot-scenes.mjs` 6 cảnh mascot đạt ở 4 biến thể nền (alpha lộ đúng màu nền, nhân vật hiện, đổi pose); **vision QA 57 khung: mascot 10/10 khung sạch (5,00), đồ hoạ 13/13 khung sạch (5,00), asset TB 4,06**.

### Lỗi debug được nhờ video dài (đã sửa trong overrides)
1. **Độ dài mascot kiểm sai tầng:** Stage 5 tạo mascot S21 6,76s; chỉ Stage 6 kiểm 3–5s nhưng Stage 6 không đổi được ranh giới scene nên lặp lại lỗi 2 lần rồi dừng. Đã chuyển luật độ dài lên Stage 5 (`validatePlan`, lỗi chặn + gọi lại); chạy lại bằng `05 --from=S21` (chế độ này hoạt động với v2).
2. **Bộ kiểm xoay chặt hơn đặc tả đã duyệt:** đặc tả chỉ cấm xoay chữ/thẻ/media/mascot nhưng code cấm xoay mọi phần tử → S20 ("kim chỉ số xoay 90°→140°") FAIL vì reviewer đòi chuyển động mà bộ kiểm cấm. Đã sửa `rotationProblems(html,{allowDiagram})`: cảnh đồ hoạ cho phép xoay bộ phận vẽ thuần KHÔNG chứa chữ/ảnh/video (kể cả thuộc tính SVG `transform="rotate(a cx cy)"`, lượt đầu S20 bị chặn oan vì cái này); cảnh asset/mascot vẫn cấm tuyệt đối. 10 ca test: `test-rotation-check.mjs`.
3. **Thêm kiểm mềm tất định** (`softPlanWarnings`): kiểu trình bày >35% cảnh asset, mascot >30% hoặc 3 cảnh liền, không có mascot ở 1/3 cuối (chạy: 0 cảnh báo trên plan thật).
4. Bài học thao tác: `ln -s` trên Git Bash ở Windows tạo BẢN SAO thật (400MB) thay vì link — đã xác nhận không phải junction trước khi xoá; dựng junction chỉ qua `fs.symlinkSync(...,"junction")` trong `setup-run.mjs`.

### Đã quyết + triển khai: media nằm ngang / độ phân giải thấp → `contain` trên nền nhìn thấy
**Phát hiện (đo bằng `results/flydubai-fz1073/scale_audit.py`, không đoán):** ảnh/video thật nằm ngang hoặc phân giải thấp bị `object-fit:cover` ép phủ khung dọc → `img-17` 250×167 (phóng ×11,5, cắt 62%), `img-14` 720×390 (×4,9, cắt 70%), `img-16` 720×480 (×4,0, cắt 62%), `img-15`, `vid-01` → khung điểm thấp nhất (vision 1–3/5, "đầu bị cắt", vỡ nét). Ảnh AI 9:16 phóng ×1,41 cắt 1% → 4–5/5.
**Quyết định người dùng:** đặt gọn trong dải y160–1390 trên nền nhìn thấy (cùng cách cho `doc-NN`). **Triển khai (tất định):** `fitForAsset()` trong `lib/mascot-scene.mjs` (cover ⇄ contain theo kích thước manifest: cắt >25% hoặc phóng >×2,0 hoặc `doc-NN` → contain; hộp ≤1000×1230 căn giữa dải, phóng tối đa ×2,5); Stage 5 cho cảnh asset có media contain một nền+hướng trôi (`--renormalize` chuẩn hoá lại plan KHÔNG gọi model, giữ nguyên nền cảnh đã dựng); Stage 6 gắn `mediaFit`/`containBox` cho shot (`--annotate-only`); Stage 7 prompt có hộp px cố định + nền; DNA nháp §4 có mục "Cách đặt media". Chỉ dựng lại 5 cảnh bị ảnh hưởng (S06, S10, S17, S19, S22): cả 5 PASS lượt đầu.
**Kết quả (cùng 57 khung vision, sau/trước):** cảnh asset 4,06 → **4,24**; chủ thể bị cắt 4 → 2 khung; đen/tràn 5 → 3; S19@140s 1→4, S10 cả 3 khung 5, S22 hết cắt đầu, S17 2→3. Đo hình học trên mp4: cả 10 shot contain có nền giấy phía trên hộp, ảnh giữa hộp. Điểm còn thấp chủ yếu là "khoảng trống quanh ảnh nhỏ / ảnh chữ nhật phẳng" (cái giá của contain, đã nêu trong DNA nháp) và chữ cắt mép NẰM SẴN trong ảnh AI gốc (người dùng: không cần quan tâm). Điểm đồ hoạ 5,00→4,77 do độ dao động của chính vision model (các cảnh đó không được dựng lại).
**Chưa kiểm chứng:** nhánh `doc-NN` → contain (cùng cơ chế, chưa có video `doc-NN` nào chạy qua v2; chạy thử `ban-an-23-2023-ben-tre` sẽ kiểm).

## Vòng 3 (03/10) — chuyển động asset mượt + mascot nhỏ có chữ (mini-root `run-flydubai-2/`)
Người dùng xem video vòng 2 báo: (1) chuyển động asset giật cục/ngắt quãng/lặp một kiểu; (2) mascot nhàm, cần nhỏ lại + chữ bổ trợ.
**Audit (đo, không đoán):** lỗi 1 do LUẬT tôi đặt ở v2 — "Ken Burns không tính là nhịp + không quá 3s không có sự kiện": v1 đếm chữ/overlay là sự kiện, v2 bỏ chữ nên bắt camera làm sự kiện → Stage 6 cắt 1 ảnh thành 3–4 shot re-crop (shot TB 3,2s vs 5,7s ở v1; 4,3 tween/cảnh vs 1,9; scale tới ×2,30; ease đa pha). Skill HyperFrames xác nhận khuôn đúng (Ken Burns = `scale 1→1.04`, `ease:"none"`; một writer camera).
**Sửa (quyết định người dùng):** cảnh asset dựng TẤT ĐỊNH (`lib/asset-scene.mjs`): 1 tween camera/shot, ease none, ngân sách zoom theo độ phân giải thật (cover Δ≤0,10; video ≤0,05; contain ≤0,03 + pan ≤30px), gộp shot liền kề cùng asset, chuyển shot = cắt/crossfade 0,25s, từ vựng v1 (`drift-in/out`, `pan-*`, `diag`); luật "≤3s có sự kiện" chỉ còn cho mascot/đồ hoạ; DNA nháp §5 viết lại. Mascot (`lib/mascot-scene.mjs` + `lib/mascot-text.mjs`): nhỏ ×0,58 (476×713), đáy y=1390, lệch trái/phải xen kẽ, trượt vào + nhấp nhô y±6px tất định, 1 khối chữ ≤9 từ (6 định dạng: thought/quote/punch/question/sticky/stamp, đáy khối neo cách đầu mascot 40px); Stage 5 sinh `textIntent`, Stage 6 chuyển thành `textEvents`; kiểm tất định: không chép nguyên văn lời thoại, không bịa số/tên, format không lặp liền kề, hold ≥1,5s.
**Kết quả đo (13 cảnh asset, cùng thước đo, che dải phụ đề):** bước nhảy bất ngờ 79 → 2–3; khựng giữa shot 18 → 0; tween camera/cảnh 4,4 → 1,2–1,4; ease≠none 66 → 0; scale max 2,30 → 1,10; shot TB 3,2s → 6,0–6,7s (`measure-motion.mjs`, `results/flydubai-fz1073-A/`, `-B/`).
**Chạy thật Stage 5→8** (video `flydubai-fz1073`, 25 scene = 15 asset + 4 mascot + 6 đồ hoạ): Stage 5/6 qua kiểm tra tất định lần đầu; Stage 7 25/25 PASS; render 182,600s, 7b đạt. `verify-v2` 25/25; vision QA: mascot 4,60, đồ hoạ 4,83, asset 4,11 (không cắt chủ thể, không đen/tràn). Chữ mascot do AI viết: "Làm sao mở cửa buồng lái?" (question), "Khóa đâu biết đọc ý nghĩ!" (thought, amused), "Chưa phải kết luận cuối!" (sticky), "Bình tĩnh giữa hiểm nguy!" (punch) — pose question/amused/think/confident (không còn toàn serious). mp4: `run-flydubai-2/out/flydubai-fz1073-full.mp4` (168MB, gitignored).
**Bài học quy trình:** vision chấm ảnh test đơn lẻ luôn chê "khoảng trống cạnh mascot nhỏ" (~3,0/5) — đó là hệ quả của lựa chọn mascot nhỏ, KHÔNG phải lỗi; đừng chạy theo điểm đó, người dùng xem mp4 mới là phép thử thật. Lỗi thật bắt được ở bước test cô lập: dấu “ chữ cam trên nền be (tương phản 2,24:1) và chữ tràn khung. Chưa kiểm chứng: nhánh `doc-NN`→contain; `split`/`reveal`/`crop-reframe` bị hoãn có chủ đích.

## POC 3 — `ban-an-23-2023-ben-tre` (294s, 37 scene, 3 thẻ `doc-NN`, 16 ảnh tĩnh; thể loại chính của kênh), chạy 03/10 (`run-ban-an-23/`)
**Kết quả:** 37 scene = 19 asset + 12 đồ hoạ + 6 mascot; 3 thẻ `doc-NN` (S03, S27, S34) tự nhận là cảnh asset `doc-card` + `contain` + nền nhìn thấy; render 293,700s (audio 293,680s), 7b đạt, `verify-v2` 37/37; chuyển động asset: **bước nhảy 2, khựng 0, 1 tween/shot, scale max 1,10** (`results/ban-an-23-2023-ben-tre/`); vision QA: đồ hoạ 4,92, asset 4,32, mascot 4,18; 3 cảnh `doc-NN` 4/5 không cờ nào; không khung nào ≤2. mp4: `run-ban-an-23/out/ban-an-23-2023-ben-tre-full.mp4` (272MB, gitignored).
**Bộ kiểm tất định đã bảo vệ đúng chỗ:** Stage 5 lượt 1 bị chặn 3 lỗi (mascot S30 6,46s, S37 5,70s, chữ mascot "Cuộc đời không cho trả góp" CHÉP NGUYÊN VĂN lời thoại) → AI tự sửa lượt 2.
**Lỗi mới tìm được & cách xử lý:** S31 (đồ hoạ) FAIL 3 lượt. Chẩn đoán đầu của tôi (shotlist vượt 3 overlay) SAI — đã đo: mọi cảnh đồ hoạ đều ≤3 overlay. Nguyên nhân thật: shotlist tự mâu thuẫn — `assetTreatment`/`notes` đòi "5 hành vi nghĩ-thử-sửa-chờ-làm" nhưng 2 nhãn chỉ gọi tên 4 động từ, nên generator hoặc vượt 3 khối chữ (9–15 khối) hoặc reviewer chặn vì thiếu "làm"/đổi chữ nhãn. Sửa ở nguồn (nhãn → "Chờ • Làm", treatment ghi rõ nút không chữ) → S31 PASS lượt đầu. Vá pipeline: prompt Stage 6 (đồ hoạ phải tự nhất quán, tên các bước nằm trong nhãn "A • B • C") + kiểm tất định cảnh đồ hoạ ≤3 overlay tổng ở Stage 6. **Bản vá này CHƯA được chạy lại với AI thật** (mới qua `node --check`).
**Điểm yếu còn lại:** (1) cảnh đồ hoạ vẫn là đường tốn lượt nhất: 8/12 cần ≥2 lượt (S02, S09, S17, S23, S24, S25, S29, S32 PASS sau 2–3 lượt, S31 fail) — generator mở đầu hay vẽ 9–18 khối chữ rồi bị chặn ≤3; (2) video chỉ có 16 ảnh cho 294s nên shot asset TB 10,0s (tối đa 17s, 7 shot >10s) với camera trôi rất chậm (sai khác TB 0,3–0,6 ở một số cảnh) — chưa biết người xem có thấy "đơ" không, cần người dùng xem mp4; hướng xử lý nếu đơ: thêm asset ở Stage 2b hoặc chia cảnh dài có thêm asset, không tách 1 ảnh.

## Các bước
- [x] A. Checkpoint git (tag + push)
- [x] B. README + `style-dna-v2-draft/` (đã duyệt)
- [x] C. Kiểm kit tất định + test render PNG alpha + lưới chuyển động (đạt)
- [x] D. Stage 5/6/7 trong mini-root (4/4 PASS lượt đầu)
- [x] E. POC 1 (ratking) được người dùng duyệt "ổn, tốt"; POC 2 (flydubai) dựng + render + đo + vision QA xong, đã xử lý lỗi cover/contain; **chờ người dùng xem lại mp4 mới** (`run-flydubai/out/flydubai-fz1073-full.mp4`; bản trước fix giữ ở `...full.before-fit.mp4`)

## Lưu ý vận hành
- Claude không đọc ảnh/video của kit hay repo; kiểm bằng số liệu (ffprobe/ffmpeg) hoặc vision 9router hỏi về bố cục (`vision-qa.mjs`).
- Model Stage 5/6/7: ĐỌC `scripts/model-routing.json` (03/10: `ag/gemini-3.8-flash-high` cho Stage 5/6/generator; reviewer `cx/gpt-6-sol[1m]`).
- `validate-shotlist.py` của kit trên Windows cần `PYTHONUTF8=1`.
- Chạy lệnh nền dài thẳng, không ghép `| head`/`| tee`.
