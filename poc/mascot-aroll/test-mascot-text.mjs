// Test cô lập builder mascot v2 + 6 định dạng chữ: dựng HTML từng ca, chạy `hyperframes check`, chụp snapshot giữa thời gian hiển thị.
// Chạy: node poc/mascot-aroll/test-mascot-text.mjs   (cần mini-root có kit: run-flydubai-2)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const here = import.meta.dirname;
const runRoot = path.join(here, "run-flydubai-2");
const lib = (f) => import(pathToFileURL(path.join(here, "overrides", "scripts", "lib", f)).href);
const { loadKit, buildMascotSceneHtml, mascotGeometry } = await lib("mascot-scene.mjs");
const { TEXT_FORMATS, countWords } = await lib("mascot-text.mjs");
const kit = loadKit(runRoot);
const testDir = path.join(here, "c-text-test");
fs.mkdirSync(path.join(testDir, "assets"), { recursive: true });
for (const f of ["hyperframes.json", "package.json", "meta.json"]) fs.copyFileSync(path.join(here, "c-alpha-test", f), path.join(testDir, f));
for (const a of kit.manifest.assets) fs.copyFileSync(path.join(kit.dir, a.file), path.join(testDir, "assets", path.basename(a.file)));

const SHORT = ["Ủa, vậy ai lái?", "Khoan đã", "Thật luôn hả", "Chốt lại nhé", "Nghe quen không", "Đáng sợ thật"];
const LONG = ["Nếu ai cũng muốn cứu thì ai giữ máy bay", "Hoá ra cái cửa chắc nhất lại là cái bẫy", "Hmm, vấn đề không nằm ở cánh cửa đâu nhé", "Một quyết định nhỏ mà đổi cả chuyến bay", "Câu hỏi thật sự là ai chịu trách nhiệm", "Bài học: đừng chỉ nhìn phần nổi"];
const poses = ["capy-v1-host-question", "capy-v1-host-think", "capy-v1-host-amused", "capy-v1-host-confident", "capy-v1-host-explain", "capy-v1-host-shrug"];
let bad = 0;
const cases = [];
TEXT_FORMATS.forEach((fmt, i) => { cases.push({ fmt, text: SHORT[i], side: i % 2 ? "right" : "left", pose: poses[i] }); cases.push({ fmt, text: LONG[i], side: i % 2 ? "left" : "right", pose: poses[(i + 3) % 6] }); });
fs.mkdirSync(path.join(testDir, "snaps"), { recursive: true });
const only = process.argv[2]; // vd: node test-mascot-text.mjs quote
for (const c of cases.filter((x) => !only || x.fmt === only)) {
  const dur = 4.2;
  const html = buildMascotSceneHtml({
    durationSec: dur, bgVariant: "grid-moving", driftDir: "left", kit, side: c.side,
    shots: [{ id: "T-1", startSec: 0, endSec: dur, mascotAssetId: c.pose, textEvents: [{ text: c.text, format: c.fmt, atSec: 0.9, holdSec: 2.8 }] }],
  });
  fs.writeFileSync(path.join(testDir, "index.html"), html, "utf8");
  let raw;
  try { raw = execFileSync("npx", ["--yes", "hyperframes@0.8.56", "check", "--json"], { cwd: testDir, encoding: "utf8", shell: true, maxBuffer: 1 << 26 }).toString(); }
  catch (e) { raw = e.stdout?.toString() ?? ""; } // check thoát mã ≠0 khi FAIL nhưng vẫn in JSON đầy đủ
  const d = JSON.parse(raw.slice(raw.indexOf("{")));
  const allFind = [...(d.lint?.findings ?? []), ...(d.runtime?.findings ?? []), ...(d.layout?.findings ?? []), ...(d.contrast?.findings ?? [])].filter((f) => f.severity === "error");
  const lay = (d.layout?.findings ?? []).filter((f) => f.severity !== "info");
  const ok = d.ok === true && lay.length === 0;
  if (!ok) bad++;
  const name = `${c.fmt}-${c.side}-${countWords(c.text)}w`;
  execFileSync("npx", ["--yes", "hyperframes@0.8.56", "snapshot", ".", "--at", "2.4", "--no-end", "--describe", "false", "-o", `snaps/${name}`], { cwd: testDir, stdio: "ignore", shell: true });
  console.log(`${ok ? "OK  " : "FAIL"} ${name.padEnd(22)} check.ok=${d.ok} layout(không-info)=${lay.length}${lay.length ? " " + JSON.stringify(lay.slice(0, 2).map((f) => ({ code: f.code, sel: f.selector, sev: f.severity }))) : ""}${allFind.length ? " ERR: " + JSON.stringify(allFind.slice(0, 3).map((f) => ({ code: f.code, sel: f.selector, msg: String(f.message).slice(0, 110) }))) : ""}`);
}
const g = mascotGeometry("left");
console.log(`\nMascot ${g.w}×${g.h} tại y=${g.y}..${g.y + g.h}; vùng chữ y≤650.`);
console.log(bad ? `${bad}/${cases.length} ca lỗi` : `Tất cả ${cases.length} ca đạt hyperframes check`);
process.exit(bad ? 1 : 0);
