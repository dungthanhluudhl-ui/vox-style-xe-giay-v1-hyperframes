// A1 (kế hoạch tích hợp ADN v2): MA TRẬN kiểm mọi tổ hợp chữ A-roll trên asset THẬT bằng builder tất định + `hyperframes check` thật (lint/layout/contrast/caption-zone).
// Chạy từ một thư mục run (cần scripts/ hợp nhất + planning/style-dna): node ../matrix-keytext.mjs --video=<slug> [--vision]
// Mỗi tổ hợp = asset (cover ảnh | cover video có ảnh giữ khung | contain doc ngang | contain ảnh ngang) × treatment HỢP LỆ cho asset × 5 hình thức.
// Chữ DÀI NHẤT (8 từ) để thử trường hợp xấu nhất; với video, cửa sổ chữ cắt ngang ranh giới video→ảnh giữ khung (6s→10s, video hết ở 8s).
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { pathToFileURL } from "node:url";

const cwd = process.cwd();
const imp = (p) => import(pathToFileURL(path.join(cwd, "scripts", "lib", p)).href);
const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const SRCS = {
  cover: { run: ".", slug: "su-kien-thien-an-mon", id: "img-01" },
  video: { run: ".", slug: "su-kien-thien-an-mon", id: "vid-03" },
  doc: { run: "../run-ban-an-23", slug: "ban-an-23-2023-ben-tre", id: "doc-01" },
  land: { run: "../run-flydubai-3", slug: "flydubai-fz1073", id: "img-17" },
};
const LONG = "Ai thật sự phải chịu trách nhiệm đây?";
const SCENE_MS = 14000;

const [{ TREATMENTS, TEXT_FORMATS, treatmentLayout, holdFor }, { buildAssetSceneHtml, finalizeAssetShots, ensureHoldFrames }] = await Promise.all([imp("key-text.mjs"), imp("asset-scene.mjs")]);

function loadAsset(k) {
  const s = SRCS[k], root = path.resolve(cwd, s.run);
  const man = JSON.parse(fs.readFileSync(path.join(root, "pipeline", "videos", s.slug, "media-analysis", "manifest.json"), "utf8"));
  const a = man.find((m) => m.id === s.id);
  if (!a) throw new Error(`không có ${s.id} trong manifest ${s.slug}`);
  return { root, a };
}
function build(kind, treatment, format) {
  const { root, a } = loadAsset(kind);
  const mediaById = { [a.id]: a };
  const shots = finalizeAssetShots([{ id: "S1-1", sceneId: "S1", assetId: a.id, startMs: 0, endMs: SCENE_MS }], mediaById, { k: 0, prev: null, lastTransition: "cut" });
  const sh = shots[0];
  const atMs = kind === "video" ? 6000 : 2000;
  const holdMs = Math.round(holdFor(LONG, format) * 1000);
  sh.keyText = { text: LONG, format, treatment, atMs, holdMs, anchorStartMs: atMs, bgVariant: "grid-moving", driftDir: "left" };
  const html = buildAssetSceneHtml({ scene: { id: "S1", startMs: 0, endMs: SCENE_MS }, shots, mediaById, bgVariant: "grid-moving", driftDir: "left" });
  return { html, shots, mediaById, root, atMs, holdMs, sh };
}

const combos = [];
for (const kind of Object.keys(SRCS)) {
  const { a } = loadAsset(kind);
  const { fitForAsset } = await imp("media-layout.mjs");
  const fit = fitForAsset(a);
  const box = fit.fit === "contain" ? fit.box : { x: 0, y: 0, w: 1080, h: 1920 };
  for (const t of TREATMENTS) if (treatmentLayout(t, box, fit.fit).valid && !(kind === "doc" && t.startsWith("dim"))) for (const f of TEXT_FORMATS) combos.push({ kind, treatment: t, format: f });
}
combos.forEach((c) => { c.id = `${c.kind}__${c.treatment}__${c.format}`; });
const FLT = arg("filter");
if (FLT) { const keep = combos.filter((c) => c.id.includes(FLT)); combos.length = 0; combos.push(...keep); }
combos.forEach((c, i) => { c.i = i; });

const one = arg("one");
if (one != null) {
  // ---- chế độ con: kiểm đúng 1 tổ hợp ----
  const c = combos[+one];
  const [{ runHyperframesCheck, formatCheckFeedback, HF_VERSION }, { getCaptionZoneArg, SCENE_CAPTION_SEEK }, { checkAssetScene, overflowProblems }] = await Promise.all([imp("hf-check.mjs"), imp("caption-zone.mjs"), imp("v2-checks.mjs")]);
  const res = { id: c.id, problems: [] };
  try {
    const b = build(c.kind, c.treatment, c.format);
    const dir = path.join(cwd, "hyperframes", ".matrix", c.id);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(path.join(dir, "assets"), { recursive: true });
    const base = path.join(cwd, "hyperframes", "videos", SRCS.cover.slug);
    for (const f of ["hyperframes.json", "meta.json", "package.json"]) fs.copyFileSync(path.join(base, f), path.join(dir, f));
    const a = b.mediaById[SRCS[c.kind].id];
    fs.copyFileSync(path.join(b.root, a.file), path.join(dir, "assets", path.basename(a.file)));
    ensureHoldFrames(b.shots, b.mediaById, b.root, [path.join(dir, "assets")]);
    fs.writeFileSync(path.join(dir, "index.html"), b.html, "utf8");
    res.v2 = checkAssetScene(b.html, { keyText: true });
    const v = runHyperframesCheck(dir, { extraArgs: [getCaptionZoneArg(cwd, { seek: SCENE_CAPTION_SEEK })] });
    res.passed = v.passed; res.infra = v.infraError;
    res.overflow = v.passed ? overflowProblems(v.raw) : [];
    if (!v.passed) res.feedback = formatCheckFeedback(v.raw, 900);
    const out = path.join(cwd, "out", "matrix");
    fs.mkdirSync(out, { recursive: true });
    const mid = ((b.atMs + Math.min(b.holdMs / 2, 1800)) / 1000).toFixed(2);
    const { execSync } = await import("node:child_process");
    execSync(`npx --yes hyperframes@${HF_VERSION} snapshot "${dir}" --at ${mid} --no-end --describe false -o "${path.join(out, c.id)}"`, { stdio: "pipe", timeout: 180000 });
    const png = fs.readdirSync(path.join(out, c.id)).find((f) => f.endsWith(".png"));
    res.png = png ? path.join("out", "matrix", c.id, png) : null;
    fs.rmSync(dir, { recursive: true, force: true });
  } catch (e) { res.error = String(e.message ?? e).slice(0, 400); }
  console.log("RESULT " + JSON.stringify(res));
  process.exit(0);
}

// ---- chế độ chính: chạy song song ----
const CONC = +arg("concurrency", "6");
const results = [];
let next = 0, running = 0;
await new Promise((resolve) => {
  const pump = () => {
    while (running < CONC && next < combos.length) {
      const c = combos[next++]; running++;
      const p = spawn(process.execPath, [process.argv[1], `--video=${arg("video")}`, `--one=${c.i}`, ...(FLT ? [`--filter=${FLT}`] : [])], { cwd, stdio: ["ignore", "pipe", "pipe"] });
      let out = "";
      p.stdout.on("data", (d) => (out += d)); p.stderr.on("data", (d) => (out += d));
      p.on("close", () => {
        running--;
        const line = out.split("\n").find((l) => l.startsWith("RESULT "));
        results.push(line ? JSON.parse(line.slice(7)) : { id: c.id, error: "con không in RESULT: " + out.slice(-300) });
        process.stdout.write(`\r${results.length}/${combos.length}`);
        if (results.length === combos.length) resolve(); else pump();
      });
    }
  };
  pump();
});
console.log("");
results.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(path.join(cwd, "out", "matrix-results.json"), JSON.stringify(results, null, 2));
let bad = 0;
for (const r of results) {
  const fail = r.error || r.infra || r.passed === false || (r.v2 && r.v2.length) || (r.overflow && r.overflow.length);
  if (fail) { bad++; console.log(`✗ ${r.id}: ${r.error ?? (r.v2?.length ? "v2: " + r.v2.join("|") : r.overflow?.length ? "overflow: " + r.overflow.join("|") : "hyperframes check FAIL: " + (r.feedback ?? "").replace(/\s+/g, " ").slice(0, 700))}`); }
}
console.log(`${results.length} tổ hợp: ${results.length - bad} đạt (check + v2 + overflow), ${bad} lỗi`);
process.exit(bad ? 1 : 0);
