// Harness A/B cho Stage 7 — chạy ĐÚNG script 07 production (không phải bản sao prompt như codegen-poc.mjs,
// vốn đã lệch production) trong các "mini-root" cách ly ngoài repo, rồi tổng hợp số liệu. Đã dùng thật để
// quyết định các thay đổi Stage 7 ngày 2026-09-26 (xem planning/incident-log.md).
//
//   node poc/hyperframes/ab-harness/ab.mjs setup  --work=<dir ngoài repo> --arms=base:HEAD,v2:WORKTREE
//        --videos=slug1,slug2 [--reps=2] [--routing=v2alt:reasoning_generator=cx/gpt-5.6-sol]
//   node poc/hyperframes/ab-harness/ab.mjs run     --work=<dir> --scenes=slug1:S01,slug2:S03 [--concurrency=4]
//   node poc/hyperframes/ab-harness/ab.mjs analyze --work=<dir>
//
// arm = <tên>:<nguồn scripts>. Nguồn: 1 git ref (HEAD, ece1003…) → lấy scripts/ đúng commit đó; WORKTREE →
// scripts/ hiện tại; hoặc đường dẫn 1 thư mục scripts/ bất kỳ. `--routing=<arm>:<key>=<model>` (lặp được) đổi
// model riêng cho 1 arm. `.env` KHÔNG copy ra ngoài — key 9router truyền qua biến môi trường cho tiến trình con.
import fs from "node:fs";
import path from "node:path";
import { execSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const [cmd, ...rest] = process.argv.slice(2);
const arg = (k, d) => rest.filter((a) => a.startsWith(`--${k}=`)).map((a) => a.slice(k.length + 3)).at(-1) ?? d;
const argAll = (k) => rest.filter((a) => a.startsWith(`--${k}=`)).map((a) => a.slice(k.length + 3));
const work = arg("work") && path.resolve(arg("work"));
if (!work) throw new Error("Thiếu --work=<thư mục làm việc NGOÀI repo>");
if (!path.relative(REPO, work).startsWith("..")) throw new Error("--work phải nằm NGOÀI repo (mini-root chứa bản sao media lớn)");
const cfgPath = path.join(work, "ab-config.json");

function copyScripts(source, dest) {
  if (source === "WORKTREE") return fs.cpSync(path.join(REPO, "scripts"), dest, { recursive: true });
  if (fs.existsSync(source)) return fs.cpSync(source, dest, { recursive: true });
  const files = execSync(`git ls-tree -r --name-only ${source} scripts`, { cwd: REPO }).toString().trim().split("\n");
  for (const f of files) {
    const out = path.join(dest, path.relative("scripts", f));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, execSync(`git show ${source}:${f}`, { cwd: REPO, maxBuffer: 64 << 20 }));
  }
}

function setup() {
  const arms = arg("arms", "").split(",").filter(Boolean).map((a) => ({ name: a.split(":")[0], source: a.split(":").slice(1).join(":") }));
  const videos = arg("videos", "").split(",").filter(Boolean);
  const reps = Number(arg("reps", 2));
  if (!arms.length || !videos.length) throw new Error("Cần --arms và --videos");
  const routing = {};
  for (const r of argAll("routing")) {
    const [armName, kv] = [r.slice(0, r.indexOf(":")), r.slice(r.indexOf(":") + 1)];
    (routing[armName] ??= {})[kv.split("=")[0]] = kv.split("=").slice(1).join("=");
  }
  for (const a of arms) for (let k = 1; k <= reps; k++) {
    const mr = path.join(work, `${a.name}-r${k}`);
    fs.rmSync(mr, { recursive: true, force: true });
    fs.mkdirSync(mr, { recursive: true });
    for (const d of [".agents/skills/hyperframes-core", ".agents/skills/hyperframes-animation", "planning/style-dna"]) fs.cpSync(path.join(REPO, d), path.join(mr, d), { recursive: true });
    copyScripts(a.source, path.join(mr, "scripts"));
    const rp = path.join(mr, "scripts/model-routing.json");
    fs.writeFileSync(rp, JSON.stringify({ ...JSON.parse(fs.readFileSync(rp, "utf8")), ...(routing[a.name] ?? {}) }, null, 2));
    for (const v of videos) {
      for (const f of ["scene-plan.json", "shotlist.json"]) fs.cpSync(path.join(REPO, "planning/videos", v, f), path.join(mr, "planning/videos", v, f));
      fs.cpSync(path.join(REPO, "pipeline/videos", v, "media-analysis/manifest.json"), path.join(mr, "pipeline/videos", v, "media-analysis/manifest.json"));
      fs.cpSync(path.join(REPO, "public/videos", v, "media"), path.join(mr, "public/videos", v, "media"), { recursive: true });
    }
    fs.symlinkSync(path.join(REPO, "node_modules"), path.join(mr, "node_modules"), "junction"); // không copy node_modules
  }
  fs.writeFileSync(cfgPath, JSON.stringify({ arms, videos, reps, routing, createdAt: new Date().toISOString() }, null, 2));
  console.log(`Đã dựng ${arms.length * reps} mini-root tại ${work}`);
}

function repoEnv() {
  const env = {};
  for (const line of fs.readFileSync(path.join(REPO, ".env"), "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=");
    if (i > 0 && line.trim().startsWith("NINEROUTER_")) env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return env;
}

async function run() {
  const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  const scenes = arg("scenes", "").split(",").filter(Boolean).map((s) => s.split(":"));
  const conc = Number(arg("concurrency", 4));
  const env = { ...process.env, ...repoEnv() };
  // Xen kẽ arm trong cùng hàng đợi để các arm chịu cùng điều kiện tải/hạn mức 9router.
  const jobs = [];
  for (let k = 1; k <= cfg.reps; k++) for (const [v, s] of scenes) for (const a of cfg.arms) jobs.push({ arm: a.name, rep: k, v, s });
  const logDir = path.join(work, "logs");
  fs.mkdirSync(logDir, { recursive: true });
  let i = 0;
  const worker = async () => {
    while (i < jobs.length) {
      const j = jobs[i++];
      const log = fs.createWriteStream(path.join(logDir, `${j.arm}-r${j.rep}-${j.v}-${j.s}.log`));
      const t0 = Date.now();
      const code = await new Promise((res) => {
        const p = spawn(process.execPath, ["scripts/07-codegen.hf.router.mjs", `--video=${j.v}`, `--scenes=${j.s}`, "--no-root-sync"], { cwd: path.join(work, `${j.arm}-r${j.rep}`), env });
        p.stdout.pipe(log);
        p.stderr.pipe(log);
        p.on("close", res);
      });
      const rec = { ...j, code, sec: (Date.now() - t0) / 1000, end: new Date().toISOString() };
      fs.appendFileSync(path.join(work, "results.jsonl"), JSON.stringify(rec) + "\n");
      console.log(JSON.stringify(rec));
    }
  };
  await Promise.all(Array.from({ length: conc }, worker));
}

function analyze() {
  const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8"));
  const resPath = path.join(work, "results.jsonl");
  const res = fs.existsSync(resPath) ? fs.readFileSync(resPath, "utf8").trim().split("\n").filter(Boolean).map(JSON.parse) : [];
  const out = {};
  for (const a of cfg.arms) {
    const o = { runs: 0, pass: { 1: 0, 2: 0, 3: 0 }, fail: 0, attempts: 0, stages: {}, verifyCodes: {}, genCalls: 0, fallbackUsed: 0 };
    for (let k = 1; k <= cfg.reps; k++) {
      const mr = path.join(work, `${a.name}-r${k}`);
      for (const v of cfg.videos) {
        const rl = path.join(mr, "pipeline/videos", v, "run-log.md");
        if (!fs.existsSync(rl)) continue;
        for (const m of fs.readFileSync(rl, "utf8").matchAll(/Codegen HyperFrames scene \[[^\]]+\] (?:PASS sau (\d) lần thử|KHÔNG đạt sau (\d) lần thử)/g)) {
          o.runs++;
          o.attempts += Number(m[1] || m[2]);
          if (m[1]) o.pass[m[1]]++; else o.fail++;
        }
      }
      const ci = path.join(mr, "pipeline/codegen-issues.jsonl");
      if (fs.existsSync(ci)) for (const l of fs.readFileSync(ci, "utf8").trim().split("\n").filter(Boolean)) {
        const r = JSON.parse(l);
        o.stages[r.stage] = (o.stages[r.stage] || 0) + 1;
        if (r.stage === "verify-hf-check") for (const c of new Set([...String(r.detail).matchAll(/\[(?:error|lint|layout|contrast|runtime|motion)\] (\w+)/g)].map((m) => m[1]))) o.verifyCodes[c] = (o.verifyCodes[c] || 0) + 1;
      }
    }
    for (const f of fs.existsSync(path.join(work, "logs")) ? fs.readdirSync(path.join(work, "logs")).filter((x) => x.startsWith(`${a.name}-r`)) : []) {
      const t = fs.readFileSync(path.join(work, "logs", f), "utf8");
      o.genCalls += (t.match(/Gọi \S+ để sinh composition/g) || []).length;
      o.fallbackUsed += (t.match(/model DỰ PHÒNG/g) || []).length;
    }
    const secs = res.filter((r) => r.arm === a.name).map((r) => r.sec).sort((x, y) => x - y);
    o.medianSec = secs[Math.floor(secs.length / 2)];
    o.totalMin = +(secs.reduce((x, y) => x + y, 0) / 60).toFixed(1);
    o.pass1Pct = o.runs ? +((100 * o.pass[1]) / o.runs).toFixed(0) : null;
    o.failPct = o.runs ? +((100 * o.fail) / o.runs).toFixed(0) : null;
    out[a.name] = o;
  }
  console.log(JSON.stringify(out, null, 1));
}

const commands = { setup, run, analyze };
if (commands[cmd]) await commands[cmd]();
else console.error("Lệnh: setup | run | analyze (xem đầu file)");
