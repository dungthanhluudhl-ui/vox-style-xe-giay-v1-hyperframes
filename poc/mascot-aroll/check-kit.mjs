// Kiểm kit mascot tất định: đủ file, có kênh alpha, kích thước, % điểm ảnh trong suốt.
// Chạy: node poc/mascot-aroll/check-kit.mjs [thư-mục-kit]
import { readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const kitDir = resolve(process.argv[2] ?? join(import.meta.dirname, "mascot-kit"));
const kitFile = join(kitDir, "kit.json");
if (!existsSync(kitFile)) { console.error(`Thiếu ${kitFile}`); process.exit(2); }
const kit = JSON.parse(readFileSync(kitFile, "utf8"));
let bad = 0;

for (const p of kit.poses) {
  const f = join(kitDir, p.file);
  if (!existsSync(f)) { console.log(`FAIL ${p.id}: thiếu file ${p.file}`); bad++; continue; }
  const probe = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height,pix_fmt,codec_name", "-of", "json", f], { encoding: "utf8" })).streams[0];
  const hasAlpha = /(rgba|bgra|argb|abgr|ya8|ya16|yuva|gbra|pal8)/.test(probe.pix_fmt);
  let transparentPct = null;
  if (hasAlpha) {
    const out = execFileSync("ffmpeg", ["-v", "error", "-i", f, "-vf", "alphaextract,format=gray,signalstats,metadata=print:file=-",
      "-f", "null", "-"], { encoding: "utf8" });
    const m = out.match(/lavfi\.signalstats\.YAVG=([\d.]+)/);
    if (m) transparentPct = +(100 - (parseFloat(m[1]) / 255) * 100).toFixed(1);
  }
  const ok = probe.codec_name === "png" && hasAlpha && transparentPct !== null && transparentPct > 5 && transparentPct < 99;
  if (!ok) bad++;
  console.log(`${ok ? "OK  " : "FAIL"} ${p.id}: ${probe.width}x${probe.height} ${probe.codec_name}/${probe.pix_fmt} alpha=${hasAlpha} trongSuot=${transparentPct}%`);
}
console.log(bad ? `\n${bad}/${kit.poses.length} pose lỗi` : `\nKit đạt (${kit.poses.length} pose)`);
process.exit(bad ? 1 : 0);
