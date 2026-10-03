// POC mascot-aroll (ADN v2, vòng 5): KHUNG ĐẦU CẢNH ĐỒ HOẠ KHÔNG ĐƯỢC TRỐNG — kiểm tra tất định bằng ảnh chụp thật.
// Đo 03/10 (thiên-an-môn): cảnh đồ hoạ để phần tử có nội dung đầu tiên vào ở 0,65–1,3s (canh nhãn theo từ narration) → 0,5–0,7s đầu cảnh chỉ còn nền giấy:
// trên nền sáng người xem thấy như "màn hình trắng chớp" sau khi cắt từ cảnh trước (repo gốc v1 cũng có 0,2–0,3s ở S07/S12).
// Cách kiểm: `hyperframes snapshot --at 0.25` (chụp bằng chính engine; --describe false = KHÔNG gửi ảnh ra ngoài), đo độ lệch chuẩn pixel vùng y<1390.
// Nền giấy + lưới/vạch mờ ≈ σ<3; cảnh có hình chính rõ ≈ σ≥25. Ngưỡng 12 = hình chính phải đã hiện đáng kể tại 0,25s.
import fs from "node:fs";
import path from "node:path";
import { execSync, spawnSync } from "node:child_process";
import { HF_VERSION } from "./hf-check.mjs";

export const BLANK_AT_SEC = 0.25;
export const MIN_SIGMA = 12;

/** σ (độ lệch chuẩn thang xám 0–255) của vùng nội dung y<1390 trong ảnh PNG 1080×1920. */
export function frameSigma(png) {
  const W = 108, H = 139;
  const r = spawnSync("ffmpeg", ["-v", "error", "-i", png, "-vf", `crop=iw:ih*1390/1920:0:0,scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 24 });
  const b = r.stdout;
  if (!b || b.length < W * H) throw new Error(`không đọc được ảnh ${png}`);
  let m = 0; for (const v of b) m += v; m /= b.length;
  let s = 0; for (const v of b) s += (v - m) ** 2;
  return Math.sqrt(s / b.length);
}

/** Chụp project (đã dựng) ở `at` giây và kiểm không trống. Trả mảng lỗi (rỗng = ổn); ném lỗi nếu KHÔNG chụp được (người gọi phải báo rõ, không bỏ qua im lặng). */
export function blankStartProblems(projectDir, { at = BLANK_AT_SEC, minSigma = MIN_SIGMA } = {}) {
  const out = path.join(path.dirname(projectDir), `.blank-${path.basename(projectDir)}`);
  fs.rmSync(out, { recursive: true, force: true });
  try {
    execSync(`npx --yes hyperframes@${HF_VERSION} snapshot "${projectDir}" --at ${at} --no-end --describe false -o "${out}"`, { stdio: "pipe", timeout: 180000 });
    const png = fs.readdirSync(out).find((f) => f.endsWith(".png"));
    if (!png) throw new Error("snapshot không tạo ảnh");
    const sigma = frameSigma(path.join(out, png));
    return sigma < minSigma
      ? [`KHUNG ĐẦU TRỐNG: tại t=${at}s cảnh chỉ còn nền giấy/lưới (σ=${sigma.toFixed(1)} < ${minSigma}) — người xem thấy "màn hình trắng chớp" ngay sau khi cắt cảnh. Hình chính của cảnh (diagram/khối/hình lớn, KHÔNG chỉ nền) phải bắt đầu hiện từ t=0 (không delay) và đã rõ (opacity ≥0,8) trước ${at}s; chỉ nhãn/chữ phụ mới được vào sau theo cue lời thoại.`]
      : [];
  } finally {
    fs.rmSync(out, { recursive: true, force: true });
  }
}
