// Đo trên video render thật (không xem ảnh): mỗi cảnh mascot, tại giữa mỗi shot — (1) vùng trong suốt của PNG lộ ĐÚNG màu nền xung quanh
// (alpha thật, bất kể biến thể nền), (2) thân nhân vật hiện (khác nền), (3) đổi pose giữa 2 shot có sai khác pixel.
// Chạy từ thư mục run:  node ../measure-mascot-scenes.mjs --video=<slug>
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const slug = process.argv.find((a) => a.startsWith("--video="))?.slice(8);
const plan = JSON.parse(fs.readFileSync(`planning/videos/${slug}/scene-plan.json`, "utf8"));
const shots = JSON.parse(fs.readFileSync(`planning/videos/${slug}/shotlist.json`, "utf8"));
const video = `out/${slug}-full.mp4`;
fs.mkdirSync("out/mframes", { recursive: true });
const frame = (t, name) => { const f = `out/mframes/${name}.png`; execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", String(t), "-i", video, "-frames:v", "1", f]); return f; };
const px = (f, x, y) => { const b = execFileSync("ffmpeg", ["-v", "error", "-i", f, "-vf", `crop=1:1:${x}:${y},format=rgb24`, "-f", "rawvideo", "-"]); return [b[0], b[1], b[2]]; };
const med = (f, pts) => [0, 1, 2].map((c) => pts.map((p) => px(f, p[0], p[1])[c]).sort((a, b) => a - b)[Math.floor(pts.length / 2)]);
const dist = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
// hộp PNG contain: rộng 820, x=130..950, y=160..1390. Lấy các điểm sát góc trong hộp (trong suốt) và ngoài hộp ở cùng độ cao.
const INSIDE = [[136, 166], [150, 170], [140, 180], [160, 175], [145, 190]];
const OUTSIDE = [[56, 166], [60, 170], [50, 180], [70, 175], [45, 190]];
let bad = 0;
for (const sc of plan.filter((s) => s.kind === "mascot")) {
  const ss = shots.filter((s) => s.sceneId === sc.id).sort((a, b) => a.startMs - b.startMs);
  const frames = [];
  for (const sh of ss) {
    const t = ((sh.startMs + sh.endMs) / 2000).toFixed(2);
    const f = frame(t, `${sc.id}_${sh.id}`);
    frames.push(f);
    const a = med(f, INSIDE), b = med(f, OUTSIDE), c = px(f, 540, 800);
    const alphaOk = dist(a, b) <= 14;
    const charOk = dist(c, b) > 25;
    if (!alphaOk || !charOk) bad++;
    console.log(`${alphaOk && charOk ? "OK  " : "FAIL"} ${sc.id}/${sh.id} t=${t}s ${sh.mascotAssetId} [${sh.animationPreset}] nền=${sc.backgroundVariant}/${sc.driftDir} | trong hộp rgb(${a}) ≈ ngoài hộp rgb(${b}) ${alphaOk ? "" : "← LỆCH"} | thân rgb(${c}) ${charOk ? "" : "← KHÔNG THẤY NHÂN VẬT"}`);
  }
  if (frames.length >= 2) {
    const d = execFileSync("ffmpeg", ["-v", "error", "-i", frames[0], "-i", frames[1], "-filter_complex", "[0][1]blend=all_mode=difference,crop=800:1200:140:180,format=gray,signalstats,metadata=print:file=-", "-f", "null", "-"], { encoding: "utf8" });
    const yavg = Number(d.match(/YAVG=([\d.]+)/)?.[1] ?? 0);
    const ok = yavg > 3;
    if (!ok) bad++;
    console.log(`${ok ? "OK  " : "FAIL"} ${sc.id} đổi pose giữa 2 shot: sai khác pixel TB=${yavg.toFixed(1)} (cần >3; nền đổi cũng góp phần)`);
  }
}
console.log(bad ? `\n${bad} phép đo lỗi` : "\nTất cả phép đo cảnh mascot đạt");
process.exit(bad ? 1 : 0);
