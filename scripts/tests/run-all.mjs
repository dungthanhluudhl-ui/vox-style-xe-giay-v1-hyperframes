// Chạy mọi test tất định của pipeline (không model, không mạng). Chạy từ GỐC repo: node scripts/tests/run-all.mjs
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const dir = import.meta.dirname;
const tests = fs.readdirSync(dir).filter((f) => /^test-.*\.mjs$/.test(f)).sort();
let fail = 0;
for (const t of tests) {
  const r = spawnSync(process.execPath, [path.join(dir, t)], { encoding: "utf8", cwd: path.resolve(dir, "..", "..") });
  const last = ((r.stdout || "") + (r.stderr || "")).trim().split("\n").pop();
  console.log(`${r.status === 0 ? "OK  " : "FAIL"} ${t}: ${last}`);
  if (r.status !== 0) fail++;
}
console.log(fail ? `\n${fail}/${tests.length} test lỗi` : `\n${tests.length}/${tests.length} test đạt`);
process.exit(fail ? 1 : 0);
