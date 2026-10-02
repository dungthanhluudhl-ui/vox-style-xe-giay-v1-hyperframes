// Kiểm kit mascot tất định (không xem ảnh): manifest, SHA256, PNG alpha, kích thước, mép trong suốt, bbox.
// Chạy: node poc/mascot-aroll/check-kit.mjs [thư-mục-kit]   (mặc định capybara-library-v1)
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { join, resolve } from "node:path";

const kitDir = resolve(process.argv[2] ?? join(import.meta.dirname, "mascot-kit", "capybara-library-v1"));
const manifestFile = join(kitDir, "manifest.json");
if (!existsSync(manifestFile)) { console.error(`Thiếu ${manifestFile}`); process.exit(2); }
const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
const shaFile = join(kitDir, "FILE_SHA256.json");
const shaTable = existsSync(shaFile) ? JSON.parse(readFileSync(shaFile, "utf8")) : {};
const EDGE = 4; // dải mép (px) phải trong suốt (shrug rộng nhất: bbox kết thúc x=1016/1024, lề 8px)
const EDGE_ALPHA_TOL = 8; // alpha ≤8/255 coi là nhiễu vô hình (đã đo: kit có điểm alpha=1 ở mép; nhân vật chạm mép sẽ ra 255)
let bad = 0;
const fail = (id, msg) => { bad++; console.log(`FAIL ${id}: ${msg}`); };

const sh = (cmd, args) => execFileSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
const alphaMax = (file, w, h, x, y) => {
  const out = sh("ffmpeg", ["-v", "error", "-i", file, "-vf",
    `crop=${w}:${h}:${x}:${y},alphaextract,format=gray,signalstats,metadata=print:file=-`, "-f", "null", "-"]);
  const m = out.match(/lavfi\.signalstats\.YMAX=([\d.]+)/);
  return m ? +m[1] : NaN;
};

if (manifest.assetCount !== manifest.assets.length) fail("manifest", `assetCount=${manifest.assetCount} ≠ ${manifest.assets.length}`);
const ids = new Set();
for (const a of manifest.assets) {
  if (ids.has(a.id)) fail(a.id, "ID trùng"); ids.add(a.id);
  const f = join(kitDir, a.file);
  if (!existsSync(f)) { fail(a.id, `thiếu file ${a.file}`); continue; }
  if (a.status !== "ready") fail(a.id, `status=${a.status}`);
  if (!a.file.endsWith(`${a.id}.png`)) fail(a.id, "tên file không khớp ID");

  const sha = createHash("sha256").update(readFileSync(f)).digest("hex");
  if (sha !== a.sha256) fail(a.id, "sha256 lệch manifest");
  if (shaTable[a.file] && shaTable[a.file] !== sha) fail(a.id, "sha256 lệch FILE_SHA256.json");

  const p = JSON.parse(sh("ffprobe", ["-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height,pix_fmt,codec_name", "-of", "json", f])).streams[0];
  const hasAlpha = /(rgba|bgra|argb|abgr|ya8|ya16|yuva|gbra|pal8)/.test(p.pix_fmt);
  if (p.codec_name !== "png" || !hasAlpha) fail(a.id, `không phải PNG alpha (${p.codec_name}/${p.pix_fmt})`);
  if (p.width !== a.width || p.height !== a.height || p.width !== 1024 || p.height !== 1536)
    fail(a.id, `kích thước ${p.width}x${p.height} ≠ 1024x1536 hoặc lệch manifest`);

  const W = p.width, H = p.height;
  const edges = {
    top: alphaMax(f, W, EDGE, 0, 0), bottom: alphaMax(f, W, EDGE, 0, H - EDGE),
    left: alphaMax(f, EDGE, H, 0, 0), right: alphaMax(f, EDGE, H, W - EDGE, 0),
  };
  const touching = Object.entries(edges).filter(([, v]) => !(v <= EDGE_ALPHA_TOL)).map(([k]) => k);
  if (touching.length) fail(a.id, `nhân vật chạm mép: ${touching.join(",")}`);

  const b = a.opaqueBoundsPx; // bbox khai báo phải nằm trong canvas
  if (!b || b.x < 0 || b.y < 0 || b.x + b.width > W || b.y + b.height > H) fail(a.id, "opaqueBoundsPx ngoài canvas");
  const center = Math.abs((b.x + b.width / 2) / W - 0.5);
  console.log(`OK   ${a.id}: ${W}x${H} png/${p.pix_fmt} sha ok, mép trong suốt, lệch tâm ngang ${(center * 100).toFixed(1)}%`);
}
console.log(bad ? `\n${bad} lỗi / ${manifest.assets.length} asset` : `\nKit đạt: ${manifest.assets.length}/${manifest.assets.length} asset`);
process.exit(bad ? 1 : 0);
