// Dựng mini-root `poc/mascot-aroll/run-v2/` để chạy Stage 5→8 với ADN v2 + mascot mà KHÔNG đụng pipeline thật:
//   scripts/ (bản repo) + overrides/scripts/ (ghi đè) ; planning/style-dna ← style-dna-v2-draft ; dữ liệu 1 video có sẵn ;
//   kit mascot ; node_modules (junction). `.env` KHÔNG được copy — lệnh chạy nạp biến môi trường từ .env gốc repo.
// Usage: node poc/mascot-aroll/setup-run.mjs --video=<slug> [--run=run-v2] [--clean]   (mỗi video nên 1 --run riêng, vd run-flydubai)
import fs from "node:fs";
import path from "node:path";

const repo = path.resolve(import.meta.dirname, "..", "..");
const here = import.meta.dirname;
const slug = (process.argv.find((a) => a.startsWith("--video=")) ?? "").slice("--video=".length);
if (!slug) { console.error("Thiếu --video=<slug>"); process.exit(1); }
const runName = (process.argv.find((a) => a.startsWith("--run=")) ?? "--run=run-v2").slice(6);
const run = path.join(here, runName);

if (process.argv.includes("--clean") && fs.existsSync(run)) {
  // rmSync KHÔNG đi theo junction node_modules khi xoá junction trước
  const nm = path.join(run, "node_modules");
  if (fs.existsSync(nm)) fs.rmdirSync(nm);
  fs.rmSync(run, { recursive: true, force: true });
}
fs.mkdirSync(run, { recursive: true });

const cp = (from, to, filter) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.cpSync(from, to, { recursive: true, filter }); };
const mustExist = (p) => { if (!fs.existsSync(p)) { console.error(`Thiếu ${p}`); process.exit(1); } return p; };

cp(mustExist(path.join(repo, "scripts")), path.join(run, "scripts"), (s) => !/flow-profile|\.bat$|\.ps1$/.test(s));
cp(path.join(here, "overrides", "scripts"), path.join(run, "scripts")); // ghi đè
for (const sk of ["hyperframes-core", "hyperframes-animation"]) cp(mustExist(path.join(repo, ".agents", "skills", sk)), path.join(run, ".agents", "skills", sk));

const dnaSrc = mustExist(path.join(here, "style-dna-v2-draft"));
cp(dnaSrc, path.join(run, "planning", "style-dna"));

cp(mustExist(path.join(repo, "content", "videos", slug, "script.txt")), path.join(run, "content", "videos", slug, "script.txt"));
for (const sub of ["audio", "captions", "media"]) cp(mustExist(path.join(repo, "public", "videos", slug, sub)), path.join(run, "public", "videos", slug, sub));
cp(mustExist(path.join(repo, "pipeline", "videos", slug, "media-analysis", "manifest.json")), path.join(run, "pipeline", "videos", slug, "media-analysis", "manifest.json"));

const kit = mustExist(path.join(here, "mascot-kit", "capybara-library-v1"));
cp(path.join(kit, "manifest.json"), path.join(run, "public", "mascot", "capybara-library-v1", "manifest.json"));
cp(path.join(kit, "assets"), path.join(run, "public", "mascot", "capybara-library-v1", "assets"), (s) => !/gsap\.min\.js$/.test(s));

const nmLink = path.join(run, "node_modules");
if (!fs.existsSync(nmLink)) fs.symlinkSync(path.join(repo, "node_modules"), nmLink, "junction");
fs.copyFileSync(path.join(repo, "package.json"), path.join(run, "package.json"));
fs.mkdirSync(path.join(run, "out"), { recursive: true });
console.log(`Mini-root sẵn sàng: ${run}\nVideo: ${slug}\nChạy (từ ${run}), nạp .env gốc không in ra:\n  set -a; . ${repo.replace(/\\/g, "/")}/.env; set +a; node scripts/05-scene-plan.router.mjs --video=${slug}`);
