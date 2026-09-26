// Cổng review Stage 7 + chuẩn hoá shotlist gửi cho model — TẤT ĐỊNH, quyết định người dùng 2026-09-26.
// Bối cảnh (đo thật khi dựng lại ban-an-425-phan-1 bằng reviewer cx/gpt-5.6-luna-review): 27/38 lần review
// FAIL (71%); 7/18 scene không đạt, 4 scene fail CẢ 3 lần chỉ vì reviewer dù verify PASS. Hai nguyên nhân:
// 1. MÂU THUẪN chỉ dẫn: Stage 6 chép quy tắc Style DNA "người: grayscale + bóng cam" thành lệnh xử lý ảnh
//    trong `assetTreatment`, trong khi quyết định dự án là ảnh giữ nguyên màu (không filter/tách nền/đổ
//    bóng bằng code) → reviewer lật qua lật lại (lần 1 FAIL vì thiếu grayscale, lần 2 FAIL vì có filter...)
//    — 12/27 lần FAIL. Ảnh thật KHÔNG có sẵn grayscale/bóng cam (mô tả vision Stage 3 xác nhận).
// 2. Reviewer coi mọi lệch shotlist là FAIL (holdMs lệch, transition khác, vẽ thêm chi tiết sáng tạo…).
//    Giải: reviewer phân loại lỗi CHẶN / GÓP Ý, SCRIPT quyết định PASS/FAIL theo danh sách lỗi chặn — không
//    phụ thuộc dòng VERDICT tự do của model.

const COLOR_PROCESSING_RE = /grayscale|đen trắng|bóng cam|ff7a1a|cutout|tách nền|filter|đổ bóng|drop.?shadow|sepia|desaturat/i;

export const TREATMENT_NOTE =
  "Phần mô tả màu/grayscale/bóng cam/cutout/filter/đổ bóng trong assetTreatment KHÔNG thực hiện bằng code — quyết định dự án: ảnh giữ nguyên màu như file gốc (không CSS filter, không tách nền, không đổ bóng giả). Chỉ thực hiện phần chuyển động/crop/khung hình/vị trí.";

/** Độ dài đoạn video có sẵn cho shot (giây): trim nếu có, không thì durationSec của file. */
function availableVideoSec(shot, media) {
  if (Number.isFinite(shot.trimStartSec) && Number.isFinite(shot.trimEndSec)) return shot.trimEndSec - shot.trimStartSec;
  return Number.isFinite(media?.durationSec) ? media.durationSec - (Number.isFinite(shot.trimStartSec) ? shot.trimStartSec : 0) : null;
}

/** Bản sao shotlist để đưa vào prompt generator + reviewer (không sửa shotlist.json gốc):
 * - Shot dùng ẢNH mà assetTreatment có lệnh xử lý màu → `assetTreatmentNote` (gỡ mâu thuẫn Stage 6 ↔ quy
 *   tắc dự án). Video không gắn (không có quy tắc cấm xử lý màu video nên không gây vòng lật).
 * - Shot dùng VIDEO dài hơn đoạn video có sẵn (28% shot video mọi video, vd Flow 8s cho shot 9s) →
 *   `videoHoldNote`. Đo thật 2026-09-26: render HyperFrames 0.8.56 TỰ GIỮ frame cuối khi data-duration dài
 *   hơn media (SSIM 0.985 với frame cuối file gốc, khác hẳn khung trống 0.37) — generator từng tự chế freeze
 *   bằng canvas/drawImage/event video (không tất định) và bị reviewer chặn đúng (ban-an-425 S10). */
export function annotateShotsForCodegen(shots, mediaById) {
  return shots.map((s) => {
    const media = mediaById[s.assetId];
    const out = { ...s };
    if (media?.type === "image" && COLOR_PROCESSING_RE.test(s.assetTreatment ?? "")) out.assetTreatmentNote = TREATMENT_NOTE;
    if (media?.type === "video") {
      const avail = availableVideoSec(s, media);
      const dur = (s.endMs - s.startMs) / 1000;
      if (avail !== null && dur > avail + 0.05) {
        out.videoHoldNote = `Shot dài ${dur.toFixed(2)}s nhưng đoạn video có sẵn chỉ ${avail.toFixed(2)}s. Đặt data-duration của <video> = ${dur.toFixed(2)} (trọn shot): HyperFrames TỰ GIỮ frame cuối trong ${(dur - avail).toFixed(2)}s còn lại khi render (đã kiểm chứng). TUYỆT ĐỐI KHÔNG tự viết cơ chế freeze/giữ frame bằng canvas, drawImage, poster hay event video (loadeddata/seeked/timeupdate) — không tất định khi render. Muốn nhấn phần giữ frame thì chỉ zoom/pan wrapper KHÔNG có data-start.`;
      }
    }
    return out;
  });
}

const basename = (p) => String(p ?? "").split(/[\\/]/).pop();

/** Kiểm tra TẤT ĐỊNH mỗi shot có dùng đúng file asset được giao không (thay cho việc reviewer đoán "sai
 * asset" từ TÊN FILE — reviewer không nhìn thấy ảnh; báo nhầm thật ở ban-an-425 S08 khiến generator đổi
 * tên file → lỗi missing_local_asset). Trả danh sách lỗi CHẶN (rỗng = ổn). */
export function checkAssetUsage(html, shots, mediaById) {
  const problems = [];
  for (const s of shots) {
    const file = basename(mediaById[s.assetId]?.file);
    if (s.assetId && file && !String(html).includes(file)) problems.push(`Shot ${s.id} không dùng asset được giao ${s.assetId} (file "assets/${file}") — phải dùng đúng file này.`);
  }
  return problems;
}

export const REVIEW_FORMAT = `Trả lời ĐÚNG format sau (không thêm gì khác):
VERDICT: PASS hoặc FAIL
BLOCKING:
- (mỗi lỗi CHẶN 1 dòng; ghi "- không có" nếu không có)
ADVISORY:
- (mỗi góp ý 1 dòng; ghi "- không có" nếu không có)`;

export const REVIEW_POLICY = `PHÂN LOẠI LỖI (bắt buộc) — chỉ lỗi CHẶN mới làm scene bị sinh lại, nên CHỈ xếp vào BLOCKING khi thật sự nghiêm trọng:
BLOCKING (lỗi chặn):
- Vi phạm composition contract: thiếu window.__timelines["main"]/timeline không paused, phần tử timed thiếu data-start/duration, Date.now()/Math.random()/fetch, cờ data-layout-allow-* đặt trên #root.
- Sai/thiếu NỘI DUNG CHÍNH của shotlist: chữ overlay/punch-phrase/label sai chữ, sai số liệu, sai ý; thiếu hẳn overlay quan trọng; dùng sai asset hoặc không dùng asset được giao.
- Lệch Style DNA RÕ RÀNG: màu nhấn ngoài palette, sai font, xử lý màu ảnh bằng code (filter/grayscale/tách nền/đổ bóng giả trên ẢNH — trái quyết định dự án).
- Lỗi hiển thị nhận ra chắc chắn từ code: phần tử nội dung chính không bao giờ hiện, chữ nằm ngoài khung hình.
ADVISORY (góp ý, KHÔNG chặn):
- Thời điểm/holdMs overlay lệch so với shotlist, overlay giữ lâu hơn hoặc ngắn hơn.
- Transition/easing/camera motion khác mô tả nhưng vẫn hợp tinh thần.
- Chi tiết sáng tạo THÊM ngoài shotlist (diagram, icon, trang trí) miễn không che/lấn nội dung chính và đúng Style DNA.
- Đề xuất thêm cờ data-layout-allow-* hay nghi ngờ tràn/che/tương phản — "hyperframes check" (lint + layout + contrast + caption-zone) ĐÃ PASS trước khi tới bước review, KHÔNG bàn lại các mục đó.
- Thẩm mỹ chủ quan.
KHÔNG yêu cầu xử lý màu/grayscale/bóng cam cho ẢNH dù assetTreatment có mô tả (xem assetTreatmentNote trong shotlist nếu có).
Bạn KHÔNG nhìn thấy ảnh/video, chỉ thấy tên file — KHÔNG kết luận "dùng sai asset"/"ảnh không đúng nội dung" dựa vào TÊN FILE hay đoán nội dung ảnh. Việc dùng đúng file của assetId được SCRIPT kiểm tra tất định riêng.
Shot có videoHoldNote: video chỉ cần data-duration trọn shot (HyperFrames tự giữ frame cuối) — KHÔNG đòi cơ chế freeze riêng; nếu code tự viết freeze bằng canvas/drawImage/event video thì đó là lỗi CHẶN (không tất định).
VERDICT = FAIL khi và chỉ khi BLOCKING có ít nhất 1 mục.`;

function section(text, name) {
  const m = String(text).match(new RegExp(`${name}\\s*:\\s*([\\s\\S]*?)(?=\\n\\s*[*_#]*\\s*(?:VERDICT|BLOCKING|ADVISORY|ISSUES)\\s*:|$)`, "i"));
  if (!m) return null;
  return m[1]
    .split(/\r?\n/)
    .map((l) => l.replace(/^\s*[-*•]\s*/, "").trim())
    .filter((l) => l && !/^\(?\s*(không có|không|none|n\/a)\s*\)?\.?$/i.test(l));
}

/** Parse verdict có cấu trúc. SCRIPT quyết định: pass ⇔ BLOCKING rỗng. Nếu model không trả đúng format
 * (không có mục BLOCKING) → rơi về hành vi cũ (pass ⇔ dòng VERDICT là PASS) cho an toàn. */
export function parseReviewVerdict(rawText) {
  // Model hay bọc tiêu đề bằng markdown đậm ("**BLOCKING:**") — bỏ trước khi parse, nếu không dấu "*"
  // còn sót bị đọc thành 1 lỗi chặn giả.
  const text = String(rawText).replace(/\*\*|__/g, "");
  const verdictPass = /VERDICT:\s*[*_#\s]*PASS/i.test(text);
  const blocking = section(text, "BLOCKING");
  const advisory = section(text, "ADVISORY") ?? [];
  if (blocking === null) {
    const legacy = section(text, "ISSUES") ?? [];
    return { structured: false, pass: verdictPass, blocking: verdictPass ? [] : legacy, advisory: [], verdictPass };
  }
  return { structured: true, pass: blocking.length === 0, blocking, advisory, verdictPass };
}
