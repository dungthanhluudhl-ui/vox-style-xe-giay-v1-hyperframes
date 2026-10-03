// Test đơn vị thời gian chữ mascot: (1) 10 khối chữ THẬT đã dựng (flydubai-B, ban-an-23) phải bị bắt (hiện đầy đủ < chuẩn đọc ADN);
// (2) với hold tính bằng holdFor() cùng chữ đó phải qua hết; (3) biên: chữ dài nhất 9 từ không vượt trần 6s.
import fs from "node:fs";
import path from "node:path";
import { holdFor, minReadSec, fullyVisibleSec, TEXT_LEAD_SEC, MAX_HOLD_SEC } from "./overrides/scripts/lib/mascot-text.mjs";
import { textTimingProblems } from "./overrides/scripts/lib/v2-checks.mjs";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const dirs = ["flydubai-fz1073-B", "ban-an-23-2023-ben-tre"];
let fail = 0;
const ok = (cond, msg) => { if (!cond) { fail++; console.log("FAIL:", msg); } };

let n = 0, caughtOld = 0;
for (const d of dirs) {
  const base = path.join(here, "results", d);
  const plan = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(base, "scene-plan.json"), "utf8")).map((s) => [s.id, s]));
  for (const sh of JSON.parse(fs.readFileSync(path.join(base, "shotlist.json"), "utf8"))) {
    for (const ev of sh.textEvents ?? []) {
      n++;
      const old = textTimingProblems(ev, { refStartMs: plan[sh.sceneId].startMs, limitEndMs: sh.endMs });
      if (old.some((m) => m.includes("không kịp đọc"))) caughtOld++;
      const holdMs = Math.round(holdFor(ev.text, ev.format) * 1000);
      const fixed = textTimingProblems({ ...ev, atMs: plan[sh.sceneId].startMs + Math.round(TEXT_LEAD_SEC * 1000), holdMs }, { refStartMs: plan[sh.sceneId].startMs, limitEndMs: Infinity });
      ok(!fixed.length, `${sh.sceneId} hold mới vẫn vi phạm: ${fixed.join(" | ")}`);
      ok(fullyVisibleSec(ev.text, ev.format, holdMs / 1000) >= minReadSec(ev.text) + 0.29 || holdMs / 1000 >= MAX_HOLD_SEC, `${sh.sceneId} thiếu dư 0,3s`);
    }
  }
}
ok(n === 10, `kỳ vọng 10 khối chữ thật, có ${n}`);
ok(caughtOld === n, `bắt vi phạm cũ ${caughtOld}/${n} (phải bắt đủ)`);

// Ca cố ý: chữ muộn / vượt khung / dài nhất
const t9 = "Chín từ này dài hết cỡ để thử trần thời gian giữ";
ok(holdFor(t9, "quote") <= MAX_HOLD_SEC, "9 từ quote vượt trần");
const late = textTimingProblems({ text: "Thử", format: "punch", atMs: 3000, holdMs: 3000 }, { refStartMs: 0, limitEndMs: 9000 });
ok(late.some((m) => m.includes("hiện muộn")), "không bắt chữ hiện muộn");
const over = textTimingProblems({ text: "Thử", format: "punch", atMs: 500, holdMs: 3000 }, { refStartMs: 0, limitEndMs: 2000 });
ok(over.some((m) => m.includes("sau hết khung")), "không bắt chữ vượt khung");
const okCase = textTimingProblems({ text: "Thử", format: "punch", atMs: 350, holdMs: Math.round(holdFor("Thử", "punch") * 1000) }, { refStartMs: 0, limitEndMs: 9000 });
ok(!okCase.length, `ca hợp lệ bị báo: ${okCase.join(" | ")}`);

console.log(`${n} khối chữ thật: bắt vi phạm cũ ${caughtOld}/${n}; ca biên/cố ý — ${fail ? fail + " LỖI" : "ĐẠT"}`);
process.exit(fail ? 1 : 0);
