// Kiểm độc lập (không tin điểm PASS): chạy bộ kiểm v2 trên file scene ĐÃ RÁP theo đúng kind trong scene-plan, in thống kê.
// Chạy từ GỐC repo :  node scripts/qa/verify-v2.mjs --video=<slug>
import fs from "node:fs";
import { checkAssetScene, checkGraphicsScene, textBlocks, rotationProblems } from "../lib/v2-checks.mjs";

const slug = process.argv.find((a) => a.startsWith("--video="))?.slice(8);
if (!slug) { console.error("Thiếu --video="); process.exit(1); }
const plan = JSON.parse(fs.readFileSync(`planning/videos/${slug}/scene-plan.json`, "utf8"));
const dir = `hyperframes/videos/${slug}/compositions`;
let bad = 0;
const rows = [];
for (const sc of plan) {
  const file = `${dir}/scene-${sc.id.toLowerCase()}.html`;
  if (!fs.existsSync(file)) { bad++; console.log(`FAIL ${sc.id}: thiếu ${file}`); continue; }
  const html = fs.readFileSync(file, "utf8").replace(/<\/?template>/g, "");
  const p = sc.kind === "graphics" ? checkGraphicsScene(html) : checkAssetScene(html, { keyText: html.includes('id="kt-1"') }); // cảnh asset có chữ A-roll: cho phép đúng 1 khối #kt-1
  if (p.length) bad++;
  rows.push({ id: sc.id, kind: sc.kind, dur: ((sc.endMs - sc.startMs) / 1000).toFixed(1), text: textBlocks(html).length, rot: rotationProblems(html, { allowDiagram: sc.kind === "graphics" }).length, svg: /<svg/i.test(html), problems: p });
}
for (const r of rows) console.log(`${r.problems.length ? "FAIL" : "OK  "} ${r.id} ${r.kind.padEnd(8)} ${r.dur.padStart(5)}s chữ=${r.text} xoay-vi-phạm=${r.rot} svg=${r.svg}${r.problems.length ? " | " + r.problems.join(" | ").slice(0, 200) : ""}`);
const byKind = {};
for (const r of rows) (byKind[r.kind] ??= []).push(r);
console.log("\nTổng hợp:", Object.entries(byKind).map(([k, v]) => `${k}=${v.length}`).join(", "), `| cảnh asset có chữ (chữ A-roll): ${(byKind.asset ?? []).filter((r) => r.text).length}, đồ hoạ >3 khối chữ: ${(byKind.graphics ?? []).filter((r) => r.text > 3).length}`);
console.log(bad ? `\n${bad} scene vi phạm` : "\nTất cả scene đạt kiểm tra v2");
process.exit(bad ? 1 : 0);
