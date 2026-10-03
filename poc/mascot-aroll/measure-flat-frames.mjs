// Quét KHUNG PHẲNG/TRỐNG trong mp4 (bổ sung cho `ffmpeg blackdetect`: khung trống màu giấy SÁNG không phải "đen" nên blackdetect bỏ lọt —
// chính là lỗi "màn hình trắng/đen ngắn giữa 2 scene" và "video hết thì trống"). Chạy từ thư mục run:
//   node ../measure-flat-frames.mjs --video=<slug> [--mp4=out/<slug>-full.mp4] [--min=0.2]
// Phương pháp: 10 khung/giây, thang xám, vùng y<1390 (bỏ dải phụ đề); độ lệch chuẩn pixel σ<3 = phẳng. Báo mọi đoạn phẳng ≥ --min giây và gán vào cảnh.
// Đoạn phẳng ≤0,5s ngay đầu cảnh đồ hoạ (nền giấy trước khi phần tử vào) được ghi riêng là "đầu cảnh" (không tính lỗi cứng, chỉ báo).
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const slug = arg("video"), mp4 = arg("mp4", `out/${slug}-full.mp4`), minSec = +arg("min", "0.2");
const plan = JSON.parse(fs.readFileSync(`planning/videos/${slug}/scene-plan.json`, "utf8"));
const W = 108, H = 139, FR = W * H, FPS = 10, SIGMA = 3;
const r = spawnSync("ffmpeg", ["-v", "error", "-i", mp4, "-vf", `fps=${FPS},crop=1080:1390:0:0,scale=${W}:${H},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 30 });
const b = r.stdout, n = Math.floor(b.length / FR);
const sig = [];
for (let i = 0; i < n; i++) { let m = 0; for (let k = 0; k < FR; k++) m += b[i * FR + k]; m /= FR; let s = 0; for (let k = 0; k < FR; k++) s += (b[i * FR + k] - m) ** 2; sig.push(Math.sqrt(s / FR)); }
const runs = [];
for (let i = 0; i < n;) { if (sig[i] >= SIGMA) { i++; continue; } let j = i; while (j < n && sig[j] < SIGMA) j++; runs.push([i / FPS, j / FPS]); i = j; }
const sceneAt = (t) => plan.find((s) => t >= s.startMs / 1000 - 1e-6 && t < s.endMs / 1000 - 1e-6);
let hard = 0, info = 0;
for (const [a, c] of runs) {
  const dur = c - a;
  if (dur < minSec - 1e-9) continue;
  const s = sceneAt(a);
  const rel = s ? a - s.startMs / 1000 : null;
  const atStart = s && s.kind === "graphics" && rel <= 0.1 && dur <= 0.5;
  if (atStart) { info++; console.log(`  ℹ ${s.id} (đồ hoạ) đầu cảnh: nền trống ${dur.toFixed(1)}s trước khi phần tử vào (t=${a.toFixed(1)}s)`); }
  else { hard++; console.log(`  ⚠ KHUNG PHẲNG ${dur.toFixed(1)}s tại t=${a.toFixed(1)}–${c.toFixed(1)}s${s ? ` — ${s.id} (${s.kind}) +${rel.toFixed(1)}s/${((s.endMs - s.startMs) / 1000).toFixed(1)}s` : ""}`); }
}
console.log(`${n} mẫu (${FPS}/s): ${hard ? hard + " đoạn phẳng bất thường" : "KHÔNG có đoạn phẳng bất thường"}${info ? `, ${info} đoạn "nền trống đầu cảnh đồ hoạ" (thông tin)` : ""}`);
process.exit(hard ? 1 : 0);
