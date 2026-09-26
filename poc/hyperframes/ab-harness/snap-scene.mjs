// Trích khung hình của 1 scene đã PASS (compositions/scene-sNN.html dạng sub-composition) để chấm mù:
// đổi NGƯỢC tất định sang standalone (composition-id "main"), chạy `hyperframes snapshot --at` 3 mốc/shot
// (20/50/80%, tính theo giây trong scene). Claude KHÔNG xem ảnh — ảnh chỉ đưa cho vision model.
// Usage: node snap-scene.mjs <projectDir chứa compositions/ + assets/> <sceneId> <shotlist.json> <scene-plan.json> <outDir>
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process"; import { fileURLToPath, pathToFileURL } from "node:url";
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const { HF_VERSION } = await import(pathToFileURL(path.join(REPO, "scripts/lib/hf-check.mjs")).href);
const [projectDir, sceneId, shotlistPath, scenePlanPath, outDir] = process.argv.slice(2);
const compId = `scene-${sceneId.toLowerCase()}`;
const sub = fs.readFileSync(path.join(projectDir, "compositions", `${compId}.html`), "utf8");
const inner = sub.slice(sub.indexOf("<template>") + 10, sub.lastIndexOf("</template>"));
const links = [...inner.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/g)].map((m) => m[0]);
const style = inner.slice(inner.indexOf("<style>") + 7, inner.indexOf("</style>"));
const body = inner.slice(inner.indexOf("</style>") + 8).replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/g, "").split(`"${compId}"`).join('"main"');
// Sub-composition KHÔNG tự nạp GSAP (syncRootHf nạp 1 lần ở index.html gốc) — thiếu thẻ này thì timeline
// không chạy, khung chụp là trạng thái CHƯA animate (lỗi thật đã làm hỏng đợt chấm mù A/B đầu tiên).
const GSAP = fs.readFileSync(path.join(REPO, "scripts/lib/sync-root-hf-lib.mjs"), "utf8").match(/<script src="[^"]*gsap[^"]*"><\/script>/)[0]; // đúng thẻ root production dùng
const html = `<!doctype html>\n<html>\n<head>\n<meta charset="UTF-8" />\n${GSAP}\n${links.join("\n")}\n<style>${style}</style>\n</head>\n<body>\n${body}\n</body>\n</html>\n`;
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
for (const f of ["hyperframes.json", "meta.json", "package.json"]) if (fs.existsSync(path.join(projectDir, f))) fs.copyFileSync(path.join(projectDir, f), path.join(outDir, f));
fs.cpSync(path.join(projectDir, "assets"), path.join(outDir, "assets"), { recursive: true });
fs.writeFileSync(path.join(outDir, "index.html"), html);
const plan = JSON.parse(fs.readFileSync(scenePlanPath, "utf8"));
const scene = (plan.scenes ?? plan).find((s) => s.id === sceneId);
const shots = JSON.parse(fs.readFileSync(shotlistPath, "utf8")).filter((s) => s.sceneId === sceneId);
const at = shots.flatMap((s) => [0.2, 0.5, 0.8].map((f) => ((s.startMs + (s.endMs - s.startMs) * f - scene.startMs) / 1000).toFixed(2)));
execSync(`npx --yes hyperframes@${HF_VERSION} snapshot --at ${at.join(",")}`, { cwd: outDir, stdio: "pipe", timeout: 180000 });
const snapDir = path.join(outDir, "snapshots");
const pngs = fs.existsSync(snapDir) ? fs.readdirSync(snapDir).filter((f) => f.endsWith(".png")).sort().map((f) => path.join(snapDir, f)) : [];
console.log(JSON.stringify({ sceneId, at, pngs }));
