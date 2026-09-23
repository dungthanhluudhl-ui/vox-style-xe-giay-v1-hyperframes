// Tính TẤT ĐỊNH chuỗi --caption-zone cho `hyperframes check` từ planning/style-dna/style-tokens.json
// — không hardcode số trùng lặp lần 2 ở nơi khác, tránh lệch nếu style-tokens.json đổi sau này.
//
// Dùng 2 field KHÁC NHAU có chủ đích (không phải nhầm lẫn/copy sai):
// - x0/x1: caption.position.left/right (60/60px) — toạ độ THẬT của .caption-page trong
//   scripts/lib/generate-caption-track-hf.mjs, khung chứa caption thật sự render.
// - y0: safeZone.bottom (391px, sau khi hạ vị trí caption 15% — xem planning/videos... run-log), KHÔNG
//   dùng caption.position.bottom (374px) dù tên field nghe hợp lý hơn. Lý do: caption.position.bottom
//   chỉ là offset của MÉP DƯỚI khung caption (khung cao theo nội dung, CSS `top: auto`, không có
//   chiều cao cố định) — không tự nó cho biết vùng cấm cần cao bao nhiêu để chứa caption 2-3 dòng.
//   `safeZone.bottom` (391) mới là "chiều cao vùng đáy phải chừa trống" đã dùng THẬT ở chỗ khác trong
//   cùng file: `heroSizing.usableBandY = [160, 1529]`, và 1920 - 1529 = 391 khớp CHÍNH XÁC
//   `safeZone.bottom` (không khớp caption.position.bottom=374) — xác nhận đây là hợp đồng "content
//   không đặt dưới y=1529" đã có sẵn trong pipeline, dùng lại đúng số này cho --caption-zone thay vì
//   bịa số riêng hoặc đoán chiều cao text từ font-size. Cả 2 số cùng tính tự động từ style-tokens.json
//   — đổi vị trí caption lần sau chỉ cần sửa đúng 1 file đó, không cần sửa file này.
import fs from "node:fs";
import path from "node:path";

export function getCaptionZoneArg(root = process.cwd()) {
  const tokensPath = path.join(root, "planning", "style-dna", "style-tokens.json");
  const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));
  const { width, height } = tokens.canvas.default;

  const x0 = tokens.caption.position.left / width;
  const x1 = 1 - tokens.caption.position.right / width;
  const y0 = 1 - tokens.safeZone.bottom / height;
  const y1 = 1;

  // severity=error tường minh — mặc định CLI là "warning" (không làm `ok` false, xem
  // `--strict` trong hyperframes check --help), nhưng đây phải là gate PASS/FAIL thật (bài học
  // S02/S16: standalone PASS riêng lẻ vẫn lọt lỗi caption-track collision khi ráp chung).
  return `--caption-zone "x0=${x0.toFixed(4)};y0=${y0.toFixed(4)};x1=${x1.toFixed(4)};y1=${y1};severity=error"`;
}
