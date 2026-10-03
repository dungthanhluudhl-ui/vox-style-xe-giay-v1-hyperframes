// Đo ĐỒNG BỘ chữ A-roll TRONG MP4 (không tin timeline): thời điểm chữ bắt đầu hiện so với lúc narration nói từ neo (shotlist.keyText.anchorStartMs).
// Chạy từ GỐC repo:  node scripts/qa/measure-keytext-sync.mjs --video=<slug> [--mp4=out/<slug>-full.mp4] [--tol=0.15]
// Phương pháp: cắt đúng vùng chữ (hộp do renderKeyText tính), 30 khung/giây, thang xám; sai khác trung bình so với khung THAM CHIẾU ngay trước neo;
// onset = khung đầu tiên sai khác ≥ ngưỡng và giữ ≥3 khung. Lệch = onset − anchor (≥0 vì chữ/lớp tối cần vài khung mới đủ thấy). Cũng kiểm chữ HIỆN DIỆN giữa cửa sổ.
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { treatmentLayout, renderKeyText } from "../lib/key-text.mjs";

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const slug = arg("video"), mp4 = arg("mp4", `out/${slug}-full.mp4`), tol = +arg("tol", "0.15");
const shots = JSON.parse(fs.readFileSync(`planning/videos/${slug}/shotlist.json`, "utf8")).filter((s) => s.keyText);
if (!shots.length) { console.log("Không có chữ A-roll nào trong shotlist — không có gì để đo."); process.exit(0); }
const FPS = 30, THRESH = 5;
let bad = 0;
for (const s of shots) {
  const k = s.keyText;
  const content = s.mediaFit === "contain" ? s.containBox : { x: 0, y: 0, w: 1080, h: 1920 };
  const layout = treatmentLayout(k.treatment, content, s.mediaFit);
  const box = renderKeyText({ kt: { text: k.text, format: k.format, atSec: 0, holdSec: k.holdMs / 1000 }, layout }).box;
  const pad = 20, x = Math.max(0, box.x - pad), y = Math.max(0, box.y - pad), w = Math.min(1080 - x, box.w + 2 * pad), h = Math.min(1390 - y, box.h + 2 * pad);
  const t0 = k.anchorStartMs / 1000 - 0.6, dur = k.holdMs / 1000 + 1.2;
  const W = 108, H = Math.max(8, Math.round((108 * h) / w)), FR = W * H;
  const r = spawnSync("ffmpeg", ["-v", "error", "-ss", String(t0), "-t", String(dur), "-i", mp4, "-vf", `fps=${FPS},crop=${w}:${h}:${x}:${y},scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
  const b = r.stdout, n = Math.floor(b.length / FR);
  const frame = (i) => b.subarray(i * FR, (i + 1) * FR);
  const mad = (a, c) => { let t = 0; for (let j = 0; j < FR; j++) t += Math.abs(a[j] - c[j]); return t / FR; };
  const refIdx = Math.max(0, Math.round((k.anchorStartMs / 1000 - 0.1 - t0) * FPS));
  const ref = frame(refIdx);
  const d = Array.from({ length: n }, (_, i) => mad(frame(i), ref));
  let onset = -1;
  for (let i = refIdx + 1; i + 3 < n; i++) if (d[i] >= THRESH && d[i + 1] >= THRESH && d[i + 2] >= THRESH) { onset = i; break; }
  const onsetT = onset >= 0 ? t0 + onset / FPS : null;
  const lag = onsetT == null ? null : onsetT - k.anchorStartMs / 1000;
  const midIdx = Math.min(n - 1, Math.round((k.anchorStartMs / 1000 + Math.min(k.holdMs / 1000 / 2, 1.8) - t0) * FPS));
  const present = d[midIdx] >= 2 * THRESH;
  const ok = lag != null && lag >= -0.04 && lag <= tol && present;
  if (!ok) bad++;
  console.log(`${s.id} "${k.text}" [${k.format}/${k.treatment}]: neo ${(k.anchorStartMs / 1000).toFixed(2)}s | onset trong mp4 ${onsetT == null ? "KHÔNG THẤY" : onsetT.toFixed(2) + "s"} | lệch ${lag == null ? "—" : (lag * 1000).toFixed(0) + "ms"} (cho phép −40…${(tol * 1000).toFixed(0)}ms) | hiện diện giữa cửa sổ: sai khác ${d[midIdx].toFixed(1)} ${present ? "✓" : "✗"} ${ok ? "ĐẠT" : "LỖI"}`);
}
console.log(`${shots.length} chữ A-roll — ${bad ? bad + " lỗi đồng bộ" : "ĐỒNG BỘ đúng lúc narration"}`);
process.exit(bad ? 1 : 0);
