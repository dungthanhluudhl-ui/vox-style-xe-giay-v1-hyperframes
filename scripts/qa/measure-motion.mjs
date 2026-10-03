// Đo ĐỘ MƯỢT chuyển động cảnh asset bằng số (vision không thấy được chuyển động từ khung tĩnh).
// (i) Phân tích timeline trong mã scene đã ráp: số tween camera/media mỗi cảnh, ease dùng, scale lớn nhất.
// (ii) Trên mp4: chuỗi sai khác khung-liên-khung (15fps, thang xám, CHỈ vùng y<1390 để loại nhiễu từ dải phụ đề đổi trang) theo từng cảnh asset:
//      - bước nhảy (spike): sai khác > 4× trung vị xảy ra KHÔNG ở ranh giới shot (cắt/crop/reset bất ngờ);
//      - khựng (stall): sai khác < 25% trung vị liên tiếp ≥3 khung (≥0,2s) giữa shot (camera đứng rồi chạy lại).
//      Shot dùng <video> bị bỏ qua (chuyển động của chính video làm nhiễu số đo).
// Chạy từ GỐC repo:  node scripts/qa/measure-motion.mjs --video=<slug> [--mp4=out/<slug>-full.mp4] [--label=TRƯỚC]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const slug = arg("video");
const mp4 = arg("mp4", `out/${slug}-full.mp4`);
const label = arg("label", "");
if (!slug) { console.error("Thiếu --video="); process.exit(1); }
const plan = JSON.parse(fs.readFileSync(`planning/videos/${slug}/scene-plan.json`, "utf8"));
const shots = JSON.parse(fs.readFileSync(`planning/videos/${slug}/shotlist.json`, "utf8"));
const manifest = JSON.parse(fs.readFileSync(`pipeline/videos/${slug}/media-analysis/manifest.json`, "utf8"));
const isVideoAsset = Object.fromEntries(manifest.map((m) => [m.id, m.type === "video"]));
const compDir = `hyperframes/videos/${slug}/compositions`;
const FPS = 15;

// ---------- (i) timeline ----------
function timelineStats(html) {
  const tweens = [...html.matchAll(/tl\.(?:fromTo|to|from)\(\s*(["'`])([^"'`]+)\1/g)].map((m) => m[2]);
  const camera = tweens.filter((t) => /cam|content|wobble|shake|photo|media|wrap|shot-\d+-(?:camera|zoom)|img|video/i.test(t) && !/fade|bg-grid/i.test(t));
  const scales = [...html.matchAll(/scale\s*:\s*([0-9.]+)/g)].map((m) => parseFloat(m[1]));
  const eases = [...html.matchAll(/ease\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]);
  return { camera: camera.length, maxScale: scales.length ? Math.max(...scales) : 0, nonLinear: eases.filter((e) => e !== "none").length, eases: eases.length };
}

// ---------- (ii) mp4 ----------
function diffSeries(startSec, durSec) {
  const out = execFileSync("ffmpeg", ["-v", "error", "-ss", String(startSec), "-t", String(durSec), "-i", mp4, "-vf",
    `fps=${FPS},crop=1080:1390:0:0,scale=108:139,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-`, "-f", "null", "-"],
    { encoding: "utf8", maxBuffer: 1 << 26 });
  const series = [];
  let t = null;
  for (const line of out.split(/\r?\n/)) {
    const m1 = line.match(/pts_time:([0-9.]+)/);
    if (m1) t = parseFloat(m1[1]);
    const m2 = line.match(/YAVG=([0-9.]+)/);
    if (m2 && t !== null) series.push({ t: startSec + t, d: parseFloat(m2[1]) });
  }
  return series.slice(1); // khung đầu không có khung trước
}
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };

const rows = [];
for (const sc of plan.filter((s) => s.kind === "asset")) {
  const file = path.join(compDir, `scene-${sc.id.toLowerCase()}.html`);
  const tl = fs.existsSync(file) ? timelineStats(fs.readFileSync(file, "utf8")) : { camera: NaN, maxScale: NaN, nonLinear: NaN, eases: NaN };
  const sShots = shots.filter((s) => s.sceneId === sc.id).sort((a, b) => a.startMs - b.startMs);
  const hasVideo = sShots.some((s) => isVideoAsset[s.assetId]);
  const boundaries = sShots.slice(1).map((s) => s.startMs / 1000);
  const series = diffSeries(sc.startMs / 1000, (sc.endMs - sc.startMs) / 1000);
  const med = median(series.map((x) => x.d));
  const near = (t) => boundaries.some((b) => Math.abs(t - b) <= 0.34); // ±5 khung quanh ranh giới shot
  const spikes = hasVideo ? null : series.filter((x) => x.d > Math.max(4 * med, 1.5) && !near(x.t)).length;
  let stalls = null;
  if (!hasVideo) {
    stalls = 0; let run = 0;
    for (const x of series) { if (x.d < 0.25 * med && !near(x.t)) { run++; if (run === 3) stalls++; } else run = 0; }
  }
  rows.push({ id: sc.id, dur: (sc.endMs - sc.startMs) / 1000, shots: sShots.length, ...tl, med, spikes, stalls, hasVideo });
}
console.log(`${label ? `[${label}] ` : ""}Chuyển động cảnh asset — ${mp4}`);
console.log("cảnh  | dài  | shot | tween cam | ease≠none | scale max | sai khác TB | bước nhảy | khựng");
for (const r of rows) console.log(`${r.id}  | ${r.dur.toFixed(1).padStart(4)} | ${String(r.shots).padStart(4)} | ${String(r.camera).padStart(9)} | ${String(r.nonLinear).padStart(9)} | ${r.maxScale.toFixed ? r.maxScale.toFixed(2) : r.maxScale} | ${r.med.toFixed(2).padStart(11)} | ${r.spikes === null ? "  (video)" : String(r.spikes).padStart(9)} | ${r.stalls === null ? "(video)" : r.stalls}`);
const sum = (f) => rows.reduce((a, r) => a + (f(r) || 0), 0);
const n = rows.length;
console.log(`TỔNG ${n} cảnh: shot ${sum((r) => r.shots)} (TB ${(sum((r) => r.dur) / sum((r) => r.shots)).toFixed(1)}s/shot) | tween cam TB ${(sum((r) => r.camera) / n).toFixed(1)}/cảnh | ease≠none ${sum((r) => r.nonLinear)} | scale max ${Math.max(...rows.map((r) => r.maxScale)).toFixed(2)} | bước nhảy ${sum((r) => r.spikes)} | khựng ${sum((r) => r.stalls)}`);
fs.mkdirSync("out", { recursive: true });
fs.writeFileSync(`out/motion-${label || "run"}.json`, JSON.stringify(rows, null, 2));
