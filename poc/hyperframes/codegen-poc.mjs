// POC: sinh code HyperFrames (HTML + GSAP) qua 9router, mirror đúng cơ chế
// generator -> verify (local, `hyperframes check`) -> reviewer -> auto-retry của
// scripts/07-codegen.router.mjs (Remotion) để so sánh táo-với-táo.
//
// KHÔNG đụng gì vào pipeline sản xuất (scripts/, src/, remotion.config.ts) — chỉ đọc
// scripts/lib/router-client.mjs (đã framework-agnostic) và scripts/model-routing.json
// (dùng đúng model hiện tại) để so sánh công bằng.
//
// Usage: node poc/hyperframes/codegen-poc.mjs --scene=S01
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { callModel, extractText, loadModelRouting } from "../../scripts/lib/router-client.mjs";

const root = process.cwd(); // chạy từ gốc repo
const routing = loadModelRouting(root);
const GEN_MODEL = routing.reasoning_generator;
const REVIEW_MODEL = routing.reasoning_reviewer;
const MAX_ATTEMPTS = 3;

const sceneArg = (process.argv.find((a) => a.startsWith("--scene=")) || "--scene=S01").split("=")[1];
const PROJECT_DIR = path.join(root, "poc", "hyperframes", `an-le-64-${sceneArg.toLowerCase()}`);
const RESULTS_DIR = path.join(root, "poc", "hyperframes", "poc-results");
fs.mkdirSync(RESULTS_DIR, { recursive: true });

if (!fs.existsSync(path.join(PROJECT_DIR, "hyperframes.json"))) {
  console.log(`Scaffold project mới: ${PROJECT_DIR}`);
  execSync(
    `npx hyperframes init "an-le-64-${sceneArg.toLowerCase()}" --resolution portrait --non-interactive`,
    {
      cwd: path.join(root, "poc", "hyperframes"),
      stdio: "inherit",
      env: { ...process.env, HYPERFRAMES_SKIP_SKILLS: "1" },
    },
  );
}
fs.mkdirSync(path.join(PROJECT_DIR, "assets"), { recursive: true });

function read(p) {
  return fs.readFileSync(path.join(root, p), "utf8");
}
function bytes(s) {
  return Buffer.byteLength(s, "utf8");
}

// --- Dữ liệu nguồn của scene (dùng lại nguyên vẹn dữ liệu pipeline hiện có) ---
const scenePlan = JSON.parse(read("planning/videos/an-le-64/scene-plan.json"));
const shotlist = JSON.parse(read("planning/videos/an-le-64/shotlist.json"));
const manifest = JSON.parse(read("pipeline/videos/an-le-64/media-analysis/manifest.json"));

const sceneEntry = (Array.isArray(scenePlan) ? scenePlan : scenePlan.scenes).find((s) => s.id === sceneArg);
const shots = (Array.isArray(shotlist) ? shotlist : shotlist.shots).filter((s) => s.sceneId === sceneArg);
const mediaById = Object.fromEntries((Array.isArray(manifest) ? manifest : manifest.assets || manifest).map((m) => [m.id, m]));
const usedMedia = [...new Set(shots.map((s) => s.assetId).filter(Boolean))].map((id) => mediaById[id]);

// Copy đúng file asset (ảnh hoặc video) của scene này vào assets/ của project — tất định,
// không AI, giống vai trò staticFile() phía Remotion.
for (const m of usedMedia) {
  if (!m?.file) continue;
  const src = path.join(root, m.file);
  const dest = path.join(PROJECT_DIR, "assets", path.basename(m.file));
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`  copied asset ${path.basename(m.file)}`);
  }
}

// --- Tài liệu tham chiếu HyperFrames (curated, tương đương 14 skill file Remotion hiện tại —
// không bundle toàn bộ ~1.5MB skill pack, chỉ phần thật sự cần cho 1 scene ảnh tĩnh + pan/zoom +
// overlay text + 1 SVG path animation, để so sánh công bằng về kích thước prompt). ---
const skillFiles = [
  ".agents/skills/hyperframes-core/SKILL.md",
  ".agents/skills/hyperframes-core/references/minimal-composition.md",
  ".agents/skills/hyperframes-core/references/data-attributes.md",
  ".agents/skills/hyperframes-core/references/determinism-rules.md",
  ".agents/skills/hyperframes-core/references/tracks-and-clips.md",
  ".agents/skills/hyperframes-animation/SKILL.md",
  ".agents/skills/hyperframes-animation/adapters/gsap.md",
  ".agents/skills/hyperframes-animation/adapters/gsap-timeline-and-labels.md",
  ".agents/skills/hyperframes-animation/adapters/gsap-easing-and-stagger.md",
  ".agents/skills/hyperframes-animation/rules/svg-path-draw.md",
  ".agents/skills/hyperframes-animation/rules/spring-pop-entrance.md",
];
const skillDocs = skillFiles.map((f) => `### ${f}\n\n${read(f)}`).join("\n\n---\n\n");
const styleTokens = read("planning/style-dna/style-tokens.json");
const styleDnaCore = read("planning/style-dna/STYLE_DNA.md");

// Rút ra trực tiếp từ CLAUDE.md do `npx hyperframes init` scaffold sẵn (Key Rules) — tương
// đương vai trò KNOWN_GOTCHAS của 07-codegen.router.mjs, nhưng ở đây là kiến thức MỚI rút ra
// lần đầu (chưa có tích luỹ lỗi thật qua nhiều lần chạy như bản Remotion).
const KNOWN_GOTCHAS_HF = `QUY TẮC BẮT BUỘC CỦA COMPOSITION CONTRACT (rút từ scaffold CLAUDE.md + skill docs, vi phạm gây lỗi ÂM THẦM không báo lỗi rõ ràng):
- Mọi phần tử có thời gian (timed element) PHẢI có data-start + 1 nguồn duration (data-duration, hoặc suy ra từ media). class="clip" không bắt buộc về mặt runtime nhưng lint sẽ cảnh báo nếu thiếu, và CSS .clip có sẵn cho layout full-frame — luôn thêm.
- BẮT BUỘC đăng ký đúng 1 timeline gốc PAUSED cho composition trên window.__timelines["<composition-id>"]: const tl = gsap.timeline({paused: true}); window.__timelines["main"] = tl;. Thiếu bước này → composition không lỗi console nhưng KHÔNG render đúng (silent failure).
- Timeline con (nested/scene) được thêm thủ công vào timeline gốc KHÔNG được tự pause riêng — nếu pause, nó sẽ không tiến khi timeline gốc seek.
- Video dùng thuộc tính muted trên thẻ <video>, âm thanh tách riêng bằng <audio> riêng.
- CHỈ dùng logic tất định — TUYỆT ĐỐI không Date.now(), không Math.random(), không network fetch trong runtime composition (phá vỡ tính deterministic của render theo frame).
- data-composition-id, data-width, data-height bắt buộc trên root div.
- Nếu có chồng lấn/overflow/occlusion CÓ CHỦ ĐÍCH (vd hiệu ứng zoom tràn khung, overlay che chữ có tính toán trước), đánh dấu rõ bằng data-layout-allow-overflow / data-layout-allow-overlap / data-layout-allow-occlusion trên đúng phần tử đó — nếu không, "npx hyperframes check" sẽ coi là lỗi layout thật.
- Ảnh/asset dùng đường dẫn tương đối "assets/<file>" (đã copy sẵn vào thư mục assets/ của project).
- FONT "Be Vietnam Pro" (weight 700/900): KHÔNG dùng @font-face với local(...) hay trỏ tới file .ttf không có sẵn trong assets/ (sẽ gây lỗi 404 runtime — không tất định, "hyperframes check" sẽ bắt lỗi này). BẮT BUỘC nạp qua Google Fonts CDN bằng đúng 1 thẻ trong <head>: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap">, rồi dùng font-family: "Be Vietnam Pro", sans-serif trực tiếp trong CSS — không cần @font-face thủ công.`;

function buildPrompt(feedback, previousFiles) {
  const retryFilesBlock = previousFiles
    ? Object.entries(previousFiles)
        .map(([p, c]) => `### ${p}\n\`\`\`\n${c}\n\`\`\``)
        .join("\n\n")
    : null;

  const systemPrompt = `Bạn là kỹ sư HyperFrames (framework dựng video từ HTML + CSS + GSAP của HeyGen, render qua headless Chrome + FFmpeg). Đây là composition HTML thuần, KHÔNG phải React/Remotion — không dùng bất kỳ API Remotion nào (useCurrentFrame, interpolate, Sequence...).

SKILL DOCS (bắt buộc tuân theo — nguồn xác thực duy nhất cho cú pháp HyperFrames/GSAP đúng):
${skillDocs}

STYLE DNA (STYLE_DNA.md — quy tắc hình ảnh/màu/font/caption/pacing bắt buộc, độc lập framework):
${styleDnaCore}

STYLE TOKENS (số liệu chính xác, độc lập framework):
${styleTokens}

${KNOWN_GOTCHAS_HF}

DỰ ÁN HIỆN TẠI:
- Project HyperFrames đã scaffold sẵn (portrait 1080x1920), file "index.html" hiện là blank template mặc định — bạn sẽ THAY THẾ TOÀN BỘ nội dung index.html bằng composition thật cho scene này.
- Đây là bài test 1 scene ĐƠN LẺ (không phải nhiều scene ráp lại) — chỉ cần đúng 1 composition-id "main", duration = tổng thời lượng scene (tính bằng giây từ startMs/endMs của SHOTLIST bên dưới, chia 1000).
- Ảnh/video nguồn đã có sẵn trong thư mục "assets/" của project (xem MEDIA bên dưới để biết đúng tên file) — dùng thẳng đường dẫn tương đối "assets/<file>".
- Dịch lại đúng tinh thần SHOTLIST bên dưới (từng shot có assetTreatment/cameraMotion/overlays/transitionIn/notes rất chi tiết) bằng ngôn ngữ GSAP/HTML tự nhiên của HyperFrames — KHÔNG cần dịch máy móc từng animation của bản Remotion đối chứng (bạn không thấy code Remotion đó), chỉ cần đúng Ý ĐỒ biên tập mô tả trong shotlist.
- Video (assetTreatment có trimStartSec/trimEndSec) dùng thẻ <video muted> với thuộc tính tương ứng, KHÔNG cần <audio> riêng cho scene test này (audio tổng của video đến từ track khác, ngoài phạm vi test 1 scene).

${
  feedback
    ? `\nLẦN THỬ TRƯỚC BỊ LỖI. Đây là TOÀN BỘ code lần thử trước:\n\n${retryFilesBlock}\n\nLỖI CẦN SỬA (sửa đúng các lỗi này, giữ nguyên kiến trúc/ý tưởng đã dùng nếu không liên quan tới lỗi, in lại đầy đủ nội dung file đã sửa):\n${feedback}\n`
    : ""
}

ĐỊNH DẠNG OUTPUT — KHÔNG dùng JSON, dùng định dạng sau cho MỖI file cần tạo/cập nhật (in lại TOÀN BỘ nội dung file, không phải diff, không markdown fence bên trong):

### FILE: index.html
<toàn bộ nội dung file>
### END

Không viết gì khác ngoài khối ### FILE ... ### END này. Chỉ output đúng 1 file "index.html".`;

  const userPrompt = `SCENE PLAN:
${JSON.stringify(sceneEntry, null, 2)}

SHOTLIST (chi tiết từng shot):
${JSON.stringify(shots, null, 2)}

MEDIA:
${JSON.stringify(usedMedia, null, 2)}

Hãy sinh composition HyperFrames cho scene: ${sceneArg}.`;

  return { systemPrompt, userPrompt };
}

function parseFiles(text) {
  const files = {};
  const re = /### FILE: (.+?)\r?\n([\s\S]*?)(?=\r?\n### FILE: |\r?\n### END|$)/g;
  let m;
  while ((m = re.exec(text))) {
    files[m[1].trim()] = m[2].replace(/\r?\n$/, "");
  }
  return files;
}

async function generate(feedback, previousFiles) {
  const { systemPrompt, userPrompt } = buildPrompt(feedback, previousFiles);
  const promptBytes = bytes(systemPrompt) + bytes(userPrompt);
  console.log(`Gọi ${GEN_MODEL} để sinh composition cho scene ${sceneArg}${feedback ? " (retry)" : ""}... (prompt ~${(promptBytes / 1024).toFixed(1)}KB)`);
  const startedAt = Date.now();
  const response = await callModel({
    model: GEN_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    maxTokens: 16000,
  });
  const elapsedSec = (Date.now() - startedAt) / 1000;
  const text = extractText(response);
  const files = parseFiles(text);
  if (Object.keys(files).length === 0) {
    throw new Error("Không parse được file nào từ output generator:\n" + text.slice(0, 1000));
  }
  return { files, promptBytes, elapsedSec, usage: response.usage || null };
}

function writeFiles(files) {
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(PROJECT_DIR, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content, "utf8");
    console.log(`  wrote ${rel} (${content.length} chars)`);
  }
}

// Verify = "npx hyperframes check --json" — tương đương gộp cả tsc+eslint+render-smoke-test
// của Remotion trong 1 lệnh (lint + runtime error + layout + motion + contrast, 1 lần boot
// Chrome). Không cần tsc/eslint riêng vì HyperFrames không dùng TypeScript/React.
function verify() {
  const startedAt = Date.now();
  let raw = "";
  let ok = false;
  try {
    raw = execSync("npx hyperframes check --json", {
      cwd: PROJECT_DIR,
      stdio: "pipe",
      timeout: 180000,
    }).toString();
    ok = true;
  } catch (e) {
    raw = e.stdout?.toString() || e.stderr?.toString() || e.message;
    ok = false;
  }
  const elapsedSec = (Date.now() - startedAt) / 1000;
  let parsed = null;
  try {
    // `hyperframes check` có thể in 1 dòng log chẩn đoán (vd browserGpuMode probe) TRƯỚC khối
    // JSON dù đã truyền --json — cắt tới ký tự "{" đầu tiên trước khi parse.
    const jsonStart = raw.indexOf("{");
    parsed = JSON.parse(jsonStart >= 0 ? raw.slice(jsonStart) : raw);
  } catch {
    // vẫn không parse được thì giữ raw text để review bằng mắt
  }
  const passed = parsed ? parsed.ok === true : ok;
  return { passed, raw: raw.slice(0, 6000), parsed, elapsedSec };
}

async function review(files) {
  const systemPrompt = `Bạn review code HyperFrames (HTML + GSAP) vừa sinh ra, đối chiếu với shotlist và style DNA. Trả lời NGẮN GỌN theo format:
VERDICT: PASS hoặc FAIL
ISSUES:
- (liệt kê vấn đề cụ thể nếu FAIL, để trống nếu PASS)

QUAN TRỌNG: đây là HyperFrames (HTML/GSAP), KHÔNG PHẢI Remotion/React — không chấm điểm dựa trên quy ước Remotion (không cần useCurrentFrame, không cần Sequence). Chỉ chấm sai nếu vi phạm rõ ràng composition contract (thiếu window.__timelines, thiếu data-start/data-duration, dùng Date.now()/Math.random()) hoặc sai lệch rõ so với style DNA (màu/font/caption) hoặc shotlist.

SKILL DOCS:
${skillDocs}

${KNOWN_GOTCHAS_HF}

Ưu tiên PASS nếu ý chính của shotlist đã được thể hiện đúng tinh thần — đừng FAIL vì tiểu tiết chuyển động không khớp 100% mô tả, miễn không vi phạm composition contract hoặc style DNA cốt lõi.`;
  const filesText = Object.entries(files)
    .map(([p, c]) => `### ${p}\n\`\`\`html\n${c}\n\`\`\``)
    .join("\n\n");
  const userPrompt = `SHOTLIST liên quan:\n${JSON.stringify(shots, null, 2)}\n\nCODE VỪA SINH:\n${filesText}`;
  const startedAt = Date.now();
  const response = await callModel({
    model: REVIEW_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.2,
    maxTokens: 2000,
  });
  const elapsedSec = (Date.now() - startedAt) / 1000;
  return { text: extractText(response), elapsedSec };
}

// --- Vòng lặp chính: generate -> verify -> review -> retry (MAX_ATTEMPTS=3), mirror 07-codegen ---
const log = { scene: sceneArg, model: { generator: GEN_MODEL, reviewer: REVIEW_MODEL }, attempts: [] };

let attempt = 0;
let feedback = null;
let previousFiles = null;
let finalFiles = null;
let finalVerdict = null;

while (attempt < MAX_ATTEMPTS) {
  attempt++;
  console.log(`\n=== Attempt ${attempt}/${MAX_ATTEMPTS} ===`);
  const attemptLog = { attempt };
  try {
    const gen = await generate(feedback, previousFiles);
    attemptLog.generate = { elapsedSec: gen.elapsedSec, promptBytes: gen.promptBytes, usage: gen.usage };
    writeFiles(gen.files);
    previousFiles = gen.files;

    const v = verify();
    attemptLog.verify = { passed: v.passed, elapsedSec: v.elapsedSec, raw: v.raw };
    if (!v.passed) {
      console.log("Verify (hyperframes check) FAILED:\n" + v.raw.slice(0, 2000));
      feedback = "hyperframes check FAILED:\n" + v.raw.slice(0, 4000);
      log.attempts.push(attemptLog);
      continue;
    }
    console.log("Verify (hyperframes check) PASS.");

    const rev = await review(gen.files);
    attemptLog.review = { elapsedSec: rev.elapsedSec, text: rev.text };
    console.log("Review result:\n" + rev.text);
    finalFiles = gen.files;
    finalVerdict = rev.text;
    log.attempts.push(attemptLog);

    if (/VERDICT:\s*PASS/i.test(rev.text)) break;
    feedback = "Reviewer FAIL:\n" + rev.text;
  } catch (e) {
    console.log(`Lỗi khi gọi 9router (sẽ thử lại): ${e.message || e}`);
    attemptLog.error = e.message || String(e);
    log.attempts.push(attemptLog);
  }
}

const passed = !!(finalVerdict && /VERDICT:\s*PASS/i.test(finalVerdict));
log.result = passed ? `PASS sau ${attempt} lần thử` : `KHÔNG đạt sau ${attempt} lần thử`;
log.finishedAt = new Date().toISOString();

fs.writeFileSync(path.join(RESULTS_DIR, `${sceneArg}.json`), JSON.stringify(log, null, 2), "utf8");
console.log(`\n${log.result}. Log: poc/hyperframes/poc-results/${sceneArg}.json`);

if (!passed) process.exit(1);
