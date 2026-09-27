// Tính TẤT ĐỊNH chuỗi --caption-zone cho `hyperframes check` từ planning/style-dna/style-tokens.json
// — không hardcode số trùng lặp lần 2 ở nơi khác, tránh lệch nếu style-tokens.json đổi sau này.
//
// Dùng 2 field KHÁC NHAU có chủ đích (không phải nhầm lẫn/copy sai):
// - x0/x1: caption.position.left/right (60/60px) — toạ độ THẬT của .caption-page trong
//   scripts/lib/generate-caption-track-hf.mjs, khung chứa caption thật sự render.
// - y0: safeZone.bottom (530px), KHÔNG
//   dùng caption.position.bottom (374px) dù tên field nghe hợp lý hơn. Lý do: caption.position.bottom
//   chỉ là offset của MÉP DƯỚI khung caption (khung cao theo nội dung, CSS `top: auto`, không có
//   chiều cao cố định) — không tự nó cho biết vùng cấm cần cao bao nhiêu để chứa caption 2-3 dòng.
//   `safeZone.bottom` là chiều cao vùng đáy phải chừa trống: y0 = 1920 - 530 = 1390.
//   `caption.position.bottom` vẫn là 374px; thay vùng cấm không làm phụ đề dịch vị trí.
//   Prompt và checker phải đọc cùng style-tokens.json, không hardcode lại ngưỡng y.
import fs from "node:fs";
import path from "node:path";

/** Lưới `seek` dày cho check 1 scene standalone (Stage 7). Lý do (đo thật 2026-09-26, ban-an-425 S13): CLI
 * chỉ lấy mẫu caption-zone tại các phân số `seek`, MẶC ĐỊNH là [1] = đúng khung CUỐI của composition →
 * chữ hiện giữa scene rồi biến mất trước khi hết scene không bao giờ được kiểm tra (check ok=true), để
 * Stage 7b bắt sau khi ráp (content_overlap với phụ đề thật). Có seek 10 mốc → bắt đúng lỗi, +1.6s/check. */
export const SCENE_CAPTION_SEEK = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

/** `seek`: mảng phân số thời lượng composition để lấy mẫu caption-zone; bỏ trống = mặc định CLI (chỉ khung
 * cuối) — giữ nguyên cho Stage 7b (đã có check theo shot bắt va chạm với phụ đề thật). */
export function getCaptionZoneArg(root = process.cwd(), { seek } = {}) {
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
  const seekPart = seek?.length ? `;seek=${seek.join(",")}` : "";
  return `--caption-zone "x0=${x0.toFixed(4)};y0=${y0.toFixed(4)};x1=${x1.toFixed(4)};y1=${y1};severity=error${seekPart}"`;
}
