// Test nối liền mạch scene (sửa lỗi khung đen giữa 2 scene): ca tổng hợp + plan THẬT trong fixtures/plans (có khe hở thật).
import fs from "node:fs";
import path from "node:path";
import { tileScenes, tilingProblems } from "../lib/scene-tiling.mjs";

const here = import.meta.dirname;
let fail = 0;
const ok = (c, m) => { if (!c) { fail++; console.log("FAIL:", m); } };
const mk = (...pairs) => pairs.map(([s, e], i) => ({ id: `S${String(i + 1).padStart(2, "0")}`, startMs: s, endMs: e }));

// Tổng hợp
{
  const sc = mk([60, 3000], [3200, 6000], [6000, 9000]);
  ok(tilingProblems(sc, 9100).length === 3, `phải bắt đầu≠0, khe hở 200ms, cuối≠total (có ${tilingProblems(sc, 9100).length})`);
  const r = tileScenes(sc, { startMs: 0, totalMs: 9100 });
  ok(tilingProblems(sc, 9100).length === 0, "sau tileScenes vẫn còn lỗi: " + tilingProblems(sc, 9100).join("|"));
  ok(sc[0].startMs === 0 && sc[0].endMs === 3200 && sc[1].endMs === 6000 && sc[2].endMs === 9100, JSON.stringify(sc));
  ok(r.changed.length === 3 && !r.errors.length, JSON.stringify(r));
  ok(tileScenes(sc, { startMs: 0, totalMs: 9100 }).changed.length === 0, "chạy lần 2 phải không đổi (idempotent)");
}
// Chồng lấn: scene trước kéo sang scene sau → cắt về startMs scene sau
{
  const sc = mk([0, 5000], [4000, 9000]);
  tileScenes(sc, { startMs: 0, totalMs: 9000 });
  ok(sc[0].endMs === 4000 && !tilingProblems(sc, 9000).length, "chồng lấn không được vá đúng");
}
// Lỗi thật: scene bị nén về ≤0
{
  const sc = mk([0, 1000], [0, 5000]);
  ok(tileScenes(sc, { startMs: 0, totalMs: 5000 }).errors.length === 1, "scene thời lượng 0 phải báo lỗi");
}
// --from: scene mới bắt đầu ở mốc scene đã giữ
{
  const sc = mk([7000, 9000], [9100, 12000]);
  tileScenes(sc, { startMs: 6900, totalMs: 12000 });
  ok(sc[0].startMs === 6900 && sc[0].endMs === 9100, "regen từ mốc kept sai");
}
// Dữ liệu THẬT: mọi plan đã lưu có khe hở phải được vá về 0 lỗi
let realGaps = 0, realFiles = 0;
for (const d of fs.readdirSync(path.join(here, "fixtures", "plans"))) {
  const f = path.join(here, "fixtures", "plans", d);
  const sc = JSON.parse(fs.readFileSync(f, "utf8"));
  const total = sc[sc.length - 1].endMs;
  const before = tilingProblems(sc, total).filter((m) => m.includes("khe hở")).length;
  realGaps += before; realFiles++;
  tileScenes(sc, { startMs: 0, totalMs: total });
  ok(!tilingProblems(sc, total).length, `${d}: sau vá còn lỗi ${tilingProblems(sc, total).join("|")}`);
  console.log(`  ${d}: ${before} khe hở → 0`);
}
ok(realFiles >= 3, `chỉ có ${realFiles} plan thật`);
ok(realGaps >= 1, "kỳ vọng ít nhất 1 khe hở thật trong fixtures/plans (ban-an-23 S27→S28 730ms)");
console.log(`${realFiles} plan thật, ${realGaps} khe hở thật đã vá — ${fail ? fail + " LỖI" : "ĐẠT"}`);
process.exit(fail ? 1 : 0);
