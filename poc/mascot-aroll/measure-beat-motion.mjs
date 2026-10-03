// Đo chuyển động CẢNH CÓ BEAT bằng số (vision không thấy chuyển động). Chạy từ thư mục run:
//   node ../measure-beat-motion.mjs --video=<slug> [--mp4=out/<slug>-full.mp4]
// Với mỗi cảnh có mascotBeat: sai khác khung-liên-khung (15fps, thang xám, chỉ y<1390):
//  - TRƯỚC beat (toàn khung): phải mượt như cảnh asset thường → bước nhảy (>4× trung vị) / khựng (<25% trung vị ≥3 khung) = lỗi;
//  - TRONG beat: liệt kê thời điểm bước nhảy và đối chiếu với sự kiện CÓ CHỦ Ý (thu nhỏ 0–0,5s, mascot trượt 0–0,6s, chữ vào, chữ ra);
//    bước nhảy ngoài các cửa sổ đó = "không giải thích được". (Khựng trong beat không đo: thẻ nhỏ nên sai khác toàn khung thấp là bình thường.)
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { enterSec, EXIT_SEC } from "./overrides/scripts/lib/mascot-text.mjs";

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const slug = arg("video");
const mp4 = arg("mp4", `out/${slug}-full.mp4`);
// beat nằm ở SHOT CUỐI (Stage 6 tính tất định) hoặc, với fixture cũ, ở chính scene
const planScenes = JSON.parse(fs.readFileSync(`planning/videos/${slug}/scene-plan.json`, "utf8"));
const shotsAll = JSON.parse(fs.readFileSync(`planning/videos/${slug}/shotlist.json`, "utf8"));
const scenes = planScenes.map((sc) => ({ ...sc, mascotBeat: shotsAll.filter((x) => x.sceneId === sc.id).find((x) => x.mascotBeat)?.mascotBeat ?? sc.mascotBeat })).filter((s) => s.mascotBeat);
if (!scenes.length) { console.error("Không tìm thấy beat nào trong plan/shotlist — công cụ không đo được gì."); process.exit(2); }
const W = 216, H = 278, FPS = 15, FR = W * H;
const median = (a) => { const b = [...a].sort((x, y) => x - y); return b[Math.floor(b.length / 2)]; };

function diffs(t0, dur) {
  const r = spawnSync("ffmpeg", ["-v", "error", "-ss", String(t0), "-t", String(dur), "-i", mp4, "-vf", `crop=1080:1390:0:0,scale=${W}:${H},fps=${FPS},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
  const buf = r.stdout, n = Math.floor(buf.length / FR), d = [];
  for (let i = 1; i < n; i++) { let s = 0; for (let k = 0; k < FR; k++) s += Math.abs(buf[i * FR + k] - buf[(i - 1) * FR + k]); d.push(s / FR); }
  return d;
}

let bad = 0;
for (const sc of scenes) {
  const b = sc.mascotBeat, t0 = sc.startMs / 1000, bs = b.startMs / 1000 - t0, dur = (sc.endMs - sc.startMs) / 1000;
  const d = diffs(t0, dur).filter((_, i) => (i + 1) / FPS <= dur - 0.1); // bỏ khung sát cuối cảnh: là cú cắt sang cảnh sau lọt vào đoạn trích
  if (d.length > 1) d[0] = d[1]; // khung đầu = cú cắt từ cảnh trước (đã xác nhận: cùng giá trị ở video cũ), không thuộc chuyển động của cảnh
  const idx = (t) => Math.round(t * FPS) - 1; // d[i] = khung i+1 so với i
  // TRƯỚC beat: phân tích RIÊNG từng đoạn shot (ranh giới shot = cắt/crossfade hợp lệ, bỏ 0,3s quanh ranh giới; trung vị riêng mỗi shot vì
  // ảnh contain chỉ pan ≤30px chậm hơn nhiều so với ảnh cover). Đoạn ngắn <1s bị bỏ qua.
  const starts = shotsAll.filter((x) => x.sceneId === sc.id).map((x) => (x.startMs - sc.startMs) / 1000).sort((a, c) => a - c);
  const preEnd = Math.max(0, idx(bs) - 1);
  const spikes = [], pre = [];
  let stalls = 0, med = 0, lastMed = 0;
  starts.forEach((t0s, si) => {
    const a = Math.round(t0s * FPS) + (si === 0 ? 0 : 4), c = Math.min(preEnd, si + 1 < starts.length ? Math.round(starts[si + 1] * FPS) - 4 : preEnd);
    const seg = d.slice(a, c);
    if (seg.length < FPS) return;
    const m = median(seg);
    lastMed = m;
    pre.push(...seg);
    seg.forEach((v, i) => { if (v > 4 * m) spikes.push(a + i); });
    let run = 0;
    for (const v of seg) { if (v < 0.25 * m) { run++; if (run === 3) stalls++; } else run = 0; }
  });
  med = lastMed || median(pre);
  // trong beat: cửa sổ có chủ ý
  const te = b.textEvent, ta = te ? (te.atMs - sc.startMs) / 1000 : null, th = te ? te.holdMs / 1000 : 0;
  const windows = [[bs - 0.15, bs + 0.85]];
  if (te) windows.push([ta - 0.1, ta + enterSec(te.format, te.text) + 0.15], [ta + th - EXIT_SEC - 0.15, ta + th + 0.15]);
  const inWin = (t) => windows.some(([a, c]) => t >= a && t <= c);
  const inb = [];
  for (let i = Math.max(0, idx(bs) - 1); i < d.length; i++) if (d[i] > 4 * med) inb.push(+((i + 1) / FPS).toFixed(2));
  const unexplained = inb.filter((t) => !inWin(t));
  const lastD = d.slice(-3).map((v) => v.toFixed(2));
  bad += spikes.length + stalls + unexplained.length;
  if (spikes.length) console.log(`  ⚠ ${sc.id} bước nhảy TRƯỚC beat tại ${spikes.map((i) => ((i + 1) / FPS).toFixed(2)).join(",")}s (so trung vị shot ${med.toFixed(2)}: ${spikes.map((i) => d[i].toFixed(1)).join(",")})`);
  console.log(`${sc.id} beat@${bs.toFixed(1)}s/${dur.toFixed(1)}s: TRƯỚC beat TB ${med.toFixed(2)} | bước nhảy ${spikes.length} khựng ${stalls} || TRONG beat: ${inb.length} khung mạnh tại ${inb.join(",") || "—"}s → không giải thích được: ${unexplained.length ? unexplained.join(",") : "0"}`);
}
console.log(`\n${scenes.length} cảnh beat — ${bad ? bad + " bất thường" : "KHÔNG bất thường (trước beat mượt; mọi khung mạnh trong beat nằm ở sự kiện có chủ ý)"}`);
process.exit(bad ? 1 : 0);
