# Kế hoạch tối ưu pipeline — lập 2026-09-26, thực hiện ở session MỚI

Kế hoạch này được lập cuối phiên audit bug "trống hình" (xem `planning/incident-log.md` mục
2026-09-26) theo yêu cầu người dùng: làm pipeline gọn, khoa học, hiệu suất cao, ít lỗi, dựng hàng
loạt được mà **giữ nguyên chất lượng video hiện tại**. Người dùng đã DUYỆT làm 4 phase dưới đây.
Làm TỪNG PHASE, kiểm chứng xong + báo cáo ngắn rồi mới sang phase sau (CLAUDE.md quy tắc 1). Không
commit/push khi chưa được yêu cầu.

**Đọc trước khi bắt đầu:** `CLAUDE.md`; mục 2026-09-26 trong `planning/incident-log.md` (grep "ĐÃ SỬA
TẬN GỐC"); memory `feedback_incremental_buildout` bài #5, #13. Nhắc lại: Claude KHÔNG tự xem ảnh/video
— mọi phán đoán hình ảnh qua 9router[vision_qa]; phép đo tất định (SSIM ffmpeg, `hyperframes check`)
ưu tiên trước, vision chỉ để phân loại vùng đã khoanh.

**Không chạy render/check nặng khi có video khác đang dựng** (vd `ban-an-425-phan-1` đang dựng lúc lập
kế hoạch) — tranh tài nguyên làm sai số đo thời gian và làm chậm build của người dùng. Kiểm tra
`git status` + mtime `pipeline/videos/*/run-log.md` trước.

## TIẾN ĐỘ (cập nhật 2026-09-26)

- **Phase 1 — XONG bước 1–2, còn bước 3.** 7b sample 3 mốc/shot (`buildShotSampleArgs()`), timeout tăng
  theo số mốc. Bắt lại đúng lỗi cũ hinh-phat (27 error S01/S03/S16/S18), 0 báo nhầm trên 4 video tốt.
  CÒN: đo thời gian 7b cũ vs mới trên hinh-phat khi máy rảnh (đo có tải: 180 mốc = 155s).
- **Phase 2 — XONG, mở rộng theo yêu cầu người dùng** (audit toàn bộ lỗi lặp lại Stage 7, không chỉ
  contrast): nguyên nhân #1 là lỗi hạ tầng (vứt code đã PASS khi reviewer 403), rồi lint `<video>` và
  contrast palette. Đã áp: dự phòng model TỰ ĐỘNG cho generator (`cx/gpt-5.6-terra`) + reviewer
  (`cx/gpt-5.6-luna-review` → `ag/claude-sonnet-4-6`), `--review-only`, autofix `<video>`/contrast,
  bảng màu + class an toàn từ style-tokens, feedback đầy đủ. A/B 48 lượt: PASS lần 1 7% → 25%, lỗi
  `<video>` 6 → 0, creativity chấm mù không đổi. Chi tiết: `planning/incident-log.md` mục "Audit + POC
  giảm lỗi lặp lại Stage 7". Người dùng TỪ CHỐI khung scene sẵn + scene mẫu trong prompt (giữ sáng tạo).
- **Phase 3 — CHƯA LÀM.** Reviewer nay là `cx/gpt-5.6-luna-review` (đổi vì Sonnet hết hạn mức, chưa POC).
  A/B cho thấy reviewer FAIL giờ là nút thắt chính sau khi verify bớt lỗi (v2: 20 review FAIL/31 lần
  review) — phần lớn lý do hợp lý (hold duration sai, lệch shotlist) nhưng có chi tiết vụn.
- **Phase 4 — CHƯA LÀM.**

## Số liệu nền (đo thật 2026-09-26 — dùng làm baseline so sánh)

| Hạng mục | Số liệu |
|---|---|
| Stage 7 codegen | 547 lượt scene: PASS lần 1 **21%**, cần 2–3 lần 41%, "KHÔNG đạt" 38%. Verify fail theo mã: `contrast_aa_failure` 517, `text_occluded` 195, `media_missing_data_start` 73, `content_overlap` 57, `caption_zone_collision` 41, `text_box_overflow` 20. Review FAIL: 166. |
| Thời gian 1 build nhỏ | Stage 1–6 ~7 phút; Stage 7 8–47 phút (chủ yếu vòng retry); 7b ~1 phút/lần; render 2–9 phút (video ≤2.7 phút) |
| Stage 7b | 51 lần chạy, 23 FAIL; chặn lỗi thật trước render ở 7/11 video (chủ yếu `content_overlap`, 1 lần bug caption duration=0). Chi phí đo trên nvidia: check mặc định 42s, 57 mốc 51s. |
| Render | 12/12 video render ở chế độ `screenshot` (chậm): 11 do CSS 3D (thường chỉ 1–5 scene dùng), 1 do `mix-blend-mode`. Tốc độ 2.7–4.3× thời lượng video. |

Cách tính lại các số này (không cần script riêng): Stage 7 — đếm regex
`Codegen HyperFrames scene \[[^\]]+\] (PASS sau (\d) lần thử|KHÔNG đạt)` trong mọi
`pipeline/videos/*/run-log.md`; mã fail — parse `pipeline/codegen-issues.jsonl` (lọc
`framework==="hyperframes"`, đếm `[error] <code>` trong `detail` của `stage==="verify-hf-check"`; file
LỚN, luôn đọc có lọc, không `Read` trọn file); 7b — entry run-log chứa `07b-integration-check` + `FAIL`
có nguyên khối JSON check, lấy finding `severity==="error"`; render — regex `Capture mode: ...` và
`[\d.]+s render time` trong run-log.

## Phase 1 — Tối ưu Stage 7b: sample theo shot

**Vì sao:** `hyperframes check` hạ finding xuống `info` khi chỉ thấy ở 1 sample (`occurrences=1`),
`error` khi ≥2. 7b hiện dùng mặc định ~9 sample cho cả video → lỗi gọn trong 1 scene lọt. Check 3
mốc/shot trên nvidia bản lỗi cũ → `ok=false`, 17 error ở S03 (đã chứng minh sẽ chặn được).

**Làm:** `scripts/07b-integration-check.hf.mjs` tính `--at=` từ `planning/videos/<slug>/shotlist.json`
(3 mốc/shot tại 20/50/80% `[startMs,endMs]`) và truyền cùng `getCaptionZoneArg()` vào
`runHyperframesCheck()` (`scripts/lib/hf-check.mjs`). Cân nhắc `--max-issues` đủ lớn để không bị cắt.

**Kiểm chứng (bắt buộc cả 3):**
1. Bắt được lỗi cũ: dựng lại trạng thái lỗi trên BẢN SAO trong scratchpad — copy
   `hyperframes/videos/hinh-phat-treo-co-o-nhat-ban/` (index.html đã commit vẫn là bản ráp CŨ, chưa
   `syncRootHf` lại) rồi chạy check với cùng tham số 7b mới TRỰC TIẾP (không qua script 7b vì 7b tự
   gọi `syncRootHf()` sẽ ráp lại bằng fix). Kỳ vọng: `ok=false`, error `text_occluded` ở S01/S03/S16/S18.
2. Không chặn nhầm video tốt: chạy 7b mới trên ≥4 video đã render tốt (nvidia, manh-thu,
   giai-phap, ajinomoto…). FAIL mới nào xuất hiện phải phân loại: lỗi thật đã có sẵn (ghi lại, không
   phải hồi quy của 7b) hay báo nhầm do mốc 20%/80% rơi vào animation vào/ra — nếu báo nhầm nhiều,
   thử 30/50/70% hoặc chỉ mốc giữa + 1 mốc, đo lại.
3. Đo thời gian 7b cũ vs mới trên video dài nhất (hinh-phat 54 scene).

## Phase 2 — POC giảm fail do contrast ở Stage 7

**Vì sao:** contrast là nguyên nhân verify fail số 1 (517 lần) → mỗi lần là 1 vòng generate+verify
tốn thời gian/token.

**Làm theo thứ tự:**
1. Phân tích tất định trước: từ `detail` các finding contrast trong `codegen-issues.jsonl` rút cặp
   `fg`/`bg`/`ratio`/`suggestedColor` (check có trả `suggestedColor`) → cặp màu nào fail nhiều nhất, có
   phải cặp đến từ `planning/style-dna/style-tokens.json` không.
2. Chọn 1 can thiệp NHỎ, tất định nhất có thể (vd bảng cặp màu chữ/nền đã kiểm định đạt AA từ
   style-tokens đưa vào prompt generator như ràng buộc cứng; hoặc đưa `suggestedColor` vào feedback
   retry nếu chưa có). Không đổi kiến trúc generate→verify→review (bài học #1).
3. POC theo bài học #3/#6/#8: chạy `poc/hyperframes/codegen-poc.mjs` (đã tham số hoá `--video=`,
   `--gen-model=`, `--review-model=`) trên cùng ≥6 scene thật trước/sau, đo lại baseline trong CÙNG lần
   thử; chỉ số: tỉ lệ PASS lần đầu, số vòng retry, thời gian; chất lượng chấm ĐỘC LẬP bằng
   `poc/hyperframes/score-render.mjs` (lưu ý: 2 script POC này đang tham chiếu key
   `routing.vision_standard` không còn trong `scripts/model-routing.json` — dùng `vision_qa`; người dùng
   quyết GIỮ NGUYÊN `poc/hyperframes/assemble-poc.mjs` — nó vẫn dùng rule `.clip` cũ).
4. Báo số liệu, người dùng quyết có áp vào `07-codegen.hf.router.mjs` không.

## Phase 3 — Audit reviewer AI (Stage 7 review)

**Vì sao:** ~500 lần gọi `ag/claude-sonnet-4-6`, 166 lần FAIL; đã biết có báo động giả (3/8 ở
kinh-te-meo, bài học #10). Chưa từng đo độ chính xác thật.

**Làm:** lấy mẫu có hệ thống các entry `stage==="review"` trong `codegen-issues.jsonl` (rải nhiều
video); với từng mục phân loại: vi phạm contract thật (đối chiếu skill `hyperframes-core` và/hoặc chạy
lại `hyperframes check` trên code tương ứng nếu còn), lệch style DNA/shotlist thật, hay báo nhầm/chi
tiết vụn. Ước lượng precision + tỉ lệ review FAIL dẫn tới thay đổi có ý nghĩa + thời gian/lần gọi. Đề
xuất: giữ / thu hẹp phạm vi (vd chỉ chấm khớp shotlist + style DNA, bỏ phần kỹ thuật check đã lo) /
bỏ — thay đổi nào cũng phải qua POC chấm điểm độc lập như Phase 2 trước khi áp.

## Phase 4 — POC render nhanh (fast capture)

**Vì sao:** mọi video bị ép chế độ `screenshot` chỉ vì vài scene dùng CSS 3D
(`perspective`/`preserve-3d`/`backface-visibility`, có thể cả `transformPerspective` trong GSAP) hoặc
`mix-blend-mode`.

**Làm:** (1) đọc tài liệu CLI HyperFrames về capture mode/điều kiện fast capture
(`.agents/skills/hyperframes-cli/`), xác định chính xác thuộc tính nào tắt fast capture; (2) trên BẢN
SAO 1 video ngắn (vd nvidia: 1/10 scene dùng 3D), vô hiệu hoá thuộc tính 3D ở scene đó, render bằng
`hyperframes@<HF_VERSION>` và so thời gian render + capture mode với bản gốc; (3) đánh giá mất gì về
hình ảnh (SSIM các shot khác phải ~không đổi; shot có hiệu ứng 3D thì vision so sánh mù). Báo tỉ lệ
tăng tốc thật; người dùng quyết có cấm CSS 3D/`mix-blend-mode` trong prompt codegen hay không (đánh
đổi hiệu ứng lật 3D lấy tốc độ).

## Việc còn mở KHÔNG nằm trong 4 phase (chỉ ghi nhận)
- Đợt ~18 scene fail đồng loạt với verdict rỗng ở hinh-phat (Stage 7 kéo dài ~12 giờ) — nguyên nhân
  chưa xác định.
- `hyperframes check` chỉ bắt CHỮ bị che; hình minh hoạ bị che chỉ bắt được bằng
  `node scripts/qa-blank-frame-audit.mjs --video=<slug>` (thủ công, 3 frame/shot).
- Mọi composition dùng chung `id="root"` (va chạm selector `#root` giữa các composition) — chưa thấy
  gây lỗi.
