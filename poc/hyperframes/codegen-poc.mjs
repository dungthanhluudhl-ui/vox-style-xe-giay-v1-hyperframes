// POC: sinh code HyperFrames (HTML + GSAP) qua 9router, mirror đúng cơ chế
// generator -> verify (local, `hyperframes check`) -> reviewer -> auto-retry của
// scripts/07-codegen.hf.router.mjs, dùng để so sánh CẶP MODEL generator/reviewer khác nhau
// trên CÙNG 1 scene thật (xem C:\Users\DTL\.claude\plans\iterative-dazzling-harp.md).
//
// KHÔNG đụng gì vào pipeline sản xuất (scripts/, hyperframes/videos/<slug>/,
// scripts/model-routing.json) — chỉ đọc scripts/lib/router-client.mjs +
// scripts/lib/video-paths.mjs (đã framework-agnostic) để lấy đúng dữ liệu scene thật, model
// generator/reviewer luôn override qua CLI để không phụ thuộc/không sửa model-routing.json
// dùng chung của pipeline sản xuất trong lúc thử nghiệm.
//
// Usage: node poc/hyperframes/codegen-poc.mjs --video=ban-an-473-phan-1 --scene=S01
//          [--gen-model=ag/gemini-3.8-flash-high] [--review-model=ag/claude-sonnet-4-6]
//          [--gen-max-tokens=16000] [--review-max-tokens=2000]
// Không truyền --gen-model/--review-model thì mặc định dùng đúng
// scripts/model-routing.json (reasoning_generator/reasoning_reviewer) — dùng để chạy lại
// baseline hiện tại qua CHÍNH harness này (đo token/thời gian cùng phương pháp với các cặp mới).
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { callModel, extractText, loadModelRouting } from "../../scripts/lib/router-client.mjs";
import { videoPaths } from "../../scripts/lib/video-paths.mjs";

const root = process.cwd(); // chạy từ gốc repo
const routing = loadModelRouting(root);
const MAX_ATTEMPTS = 3;

const videoArg = (process.argv.find((a) => a.startsWith("--video=")) || "--video=ban-an-473-phan-1").split("=")[1];
const sceneArg = (process.argv.find((a) => a.startsWith("--scene=")) || "--scene=S01").split("=")[1];
const GEN_MODEL = (process.argv.find((a) => a.startsWith("--gen-model=")) || `--gen-model=${routing.reasoning_generator}`).split("=")[1];
const REVIEW_MODEL = (process.argv.find((a) => a.startsWith("--review-model=")) || `--review-model=${routing.reasoning_reviewer}`).split("=")[1];
const GEN_MAX_TOKENS = parseInt(
  (process.argv.find((a) => a.startsWith("--gen-max-tokens=")) || "--gen-max-tokens=16000").split("=")[1],
  10,
);
const REVIEW_MAX_TOKENS = parseInt(
  (process.argv.find((a) => a.startsWith("--review-max-tokens=")) || "--review-max-tokens=2000").split("=")[1],
  10,
);

const vp = videoPaths(videoArg, root);
// Tag an toàn cho tên file/thư mục từ 2 model id (vd "ag/gemini-3.8-flash-high" -> "ag-gemini-3-8-flash-high")
// để chạy song song nhiều cặp model trên CÙNG 1 scene mà không đè project/kết quả của nhau.
const modelTag = `${GEN_MODEL}_${REVIEW_MODEL}`.replace(/[^a-zA-Z0-9]+/g, "-");
const PROJECT_DIR = path.join(root, "poc", "hyperframes", "model-compare", `${videoArg}-${sceneArg.toLowerCase()}-${modelTag}`);
const RESULTS_DIR = path.join(root, "poc", "hyperframes", "poc-results", "model-compare");
fs.mkdirSync(RESULTS_DIR, { recursive: true });

if (!fs.existsSync(path.join(PROJECT_DIR, "hyperframes.json"))) {
  console.log(`Scaffold project mới: ${PROJECT_DIR}`);
  fs.mkdirSync(path.dirname(PROJECT_DIR), { recursive: true });
  execSync(
    `npx hyperframes init "${path.basename(PROJECT_DIR)}" --resolution portrait --non-interactive`,
    {
      cwd: path.dirname(PROJECT_DIR),
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

// --- Dữ liệu nguồn của scene (dùng lại nguyên vẹn dữ liệu pipeline hiện có, đúng video thật) ---
const scenePlan = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
const shotlist = JSON.parse(fs.readFileSync(vp.shotlistJson, "utf8"));
const manifest = JSON.parse(fs.readFileSync(vp.manifestJson, "utf8"));

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

// KNOWN_GOTCHAS_HF — đồng bộ NGUYÊN VĂN với scripts/07-codegen.hf.router.mjs (nguồn xác thực
// duy nhất — sửa ở đó rồi copy lại đây) để test model không bị lệch tín hiệu do prompt cũ hơn/
// yếu hơn bản sản xuất thật. Đồng bộ lần gần nhất: 2026-09-22 (video "ban-an-473-phan-1").
const KNOWN_GOTCHAS_HF = `QUY TẮC BẮT BUỘC CỦA COMPOSITION CONTRACT (rút từ scaffold CLAUDE.md + skill docs, vi phạm gây lỗi ÂM THẦM không báo lỗi rõ ràng):
- Mọi phần tử có thời gian (timed element) PHẢI có data-start + 1 nguồn duration (data-duration, hoặc suy ra từ media). class="clip" không bắt buộc về mặt runtime nhưng lint sẽ cảnh báo nếu thiếu, và CSS .clip có sẵn cho layout full-frame — luôn thêm.
- BẮT BUỘC đăng ký đúng 1 timeline gốc PAUSED cho composition trên window.__timelines["main"]: const tl = gsap.timeline({paused: true}); window.__timelines["main"] = tl;. Thiếu bước này → composition không lỗi console nhưng KHÔNG render đúng (silent failure).
- Timeline con (nested/scene) được thêm thủ công vào timeline gốc KHÔNG được tự pause riêng — nếu pause, nó sẽ không tiến khi timeline gốc seek.
- Video dùng thuộc tính muted trên thẻ <video>, âm thanh tách riêng bằng <audio> riêng (scene này KHÔNG cần audio riêng — audio tổng của video đến từ track khác, ngoài phạm vi 1 scene).
- CHỈ dùng logic tất định — TUYỆT ĐỐI không Date.now(), không Math.random(), không network fetch trong runtime composition (phá vỡ tính deterministic của render theo frame).
- data-composition-id="main", data-width, data-height bắt buộc trên root div.
- Nếu có chồng lấn/overflow/occlusion CÓ CHỦ ĐÍCH (vd hiệu ứng zoom tràn khung, overlay che chữ có tính toán trước), đánh dấu rõ bằng data-layout-allow-overflow / data-layout-allow-overlap / data-layout-allow-occlusion trên đúng phần tử đó — nếu không, "npx hyperframes check" sẽ coi là lỗi layout thật.
- Ảnh/asset dùng đường dẫn tương đối "assets/<file>" (đã copy sẵn vào thư mục assets/ của project).
- FONT "Be Vietnam Pro" (weight 700/900): KHÔNG dùng @font-face với local(...) hay trỏ tới file .ttf không có sẵn trong assets/ (sẽ gây lỗi 404 runtime — không tất định, "hyperframes check" sẽ bắt lỗi này). BẮT BUỘC nạp qua Google Fonts CDN bằng đúng 1 thẻ trong <head>: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap">, rồi dùng font-family: "Be Vietnam Pro", sans-serif trực tiếp trong CSS — không cần @font-face thủ công.
- Một số TÊN FILE ảnh có chữ "cutout" (vd img-08-extortion-money-demand-cutout.jpeg) — đó chỉ là mô tả phong cách minh hoạ đã có sẵn TRONG chính ảnh AI tạo ra, KHÔNG phải chỉ định phải code thêm xử lý cutout. Dùng ảnh này y như file ảnh thường (nền toàn khung, giữ nguyên màu), không thêm filter grayscale/tách nền/đổ bóng trong code.
- TUYỆT ĐỐI không dùng biến template literal (vd \`\${compId}\`, \`\${sceneId}\`) bên trong querySelector/CSS selector ở thẻ <script> — trình bundler HTML của HyperFrames parse CSS/selector bằng static analysis và CRASH khi gặp biến nội suy. Luôn hardcode chuỗi cố định (vd document.querySelector('[data-composition-id="main"]'), không phải \`[data-composition-id="\${id}"]\`).
- Mọi cặp màu chữ/nền PHẢI đạt tối thiểu WCAG AA (tỉ lệ tương phản ≥3:1, ưu tiên ≥4.5:1 cho chữ thường) — "hyperframes check" chấm điểm contrast thật và FAIL cứng nếu không đạt. Không dùng chữ màu cam/vàng nhạt trên nền be/kem sáng (cặp màu tương phản thấp thường gặp) — nếu STYLE_DNA/style-tokens có sẵn cặp màu đã kiểm chứng đạt tương phản, ưu tiên dùng nguyên cặp đó thay vì tự phối màu mới.
- TUYỆT ĐỐI không dùng giá trị GSAP tương đối (vd y: "+=6") trên 1 thuộc tính nếu có tween khác cũng ghi cùng thuộc tính đó trên cùng phần tử ở khoảng thời gian gần nhau — "hyperframes check" bắt lỗi \`gsap_relative_value_second_writer\` (giá trị tương đối chốt mốc gốc lúc tween khởi tạo, seek tuần tự vs. worker render lẻ frame sẽ ra 2 kết quả khác nhau). Luôn dùng giá trị tuyệt đối cho y/x/scale/rotation, hoặc fromTo() với endpoint tường minh.
- Kiểm tra kỹ mọi text/chữ KHÔNG bị phần tử khác đè lên (che khuất) tại bất kỳ mốc thời gian nào trong lúc nó đang hiển thị — "hyperframes check" bắt lỗi \`text_occluded\` (chữ bị ẩn dưới 1 phần tử opaque). Nếu che khuất là CÓ CHỦ ĐÍCH (transition, reveal), dùng data-layout-allow-occlusion trên đúng phần tử; nếu không, đổi z-index/vị trí để chữ luôn đọc được khi đang trong khung thời gian hiển thị của nó.`;

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
    maxTokens: GEN_MAX_TOKENS,
  });
  const elapsedSec = (Date.now() - startedAt) / 1000;
  const text = extractText(response);
  const finishReason = response?.choices?.[0]?.finish_reason || null;
  const files = parseFiles(text);
  if (Object.keys(files).length === 0) {
    // finish_reason=length/max_tokens ở đây là dấu hiệu rõ nhất của rủi ro "hidden thinking
    // tokens" đã ghi nhận với model Gemini (xem plan iterative-dazzling-harp.md) — output bị
    // cắt cụt giữa chừng nên không parse được block ### FILE nào, không phải model "quên" format.
    throw new Error(
      `Không parse được file nào từ output generator (finish_reason=${finishReason}):\n` + text.slice(0, 1000),
    );
  }
  return { files, promptBytes, elapsedSec, usage: response.usage || null, finishReason };
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
    maxTokens: REVIEW_MAX_TOKENS,
  });
  const elapsedSec = (Date.now() - startedAt) / 1000;
  const reviewFinishReason = response?.choices?.[0]?.finish_reason || null;
  if (reviewFinishReason && reviewFinishReason !== "stop") {
    console.log(`  ⚠ review finish_reason="${reviewFinishReason}" (khác "stop") — verdict có thể bị cắt cụt.`);
  }
  return { text: extractText(response), elapsedSec, finishReason: reviewFinishReason };
}

// --- Vòng lặp chính: generate -> verify -> review -> retry (MAX_ATTEMPTS=3), mirror 07-codegen ---
const log = {
  video: videoArg,
  scene: sceneArg,
  model: { generator: GEN_MODEL, reviewer: REVIEW_MODEL },
  genMaxTokens: GEN_MAX_TOKENS,
  reviewMaxTokens: REVIEW_MAX_TOKENS,
  attempts: [],
};

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
    attemptLog.generate = {
      elapsedSec: gen.elapsedSec,
      promptBytes: gen.promptBytes,
      usage: gen.usage,
      finishReason: gen.finishReason,
    };
    if (gen.finishReason && gen.finishReason !== "stop") {
      console.log(`  ⚠ finish_reason="${gen.finishReason}" (khác "stop") — dấu hiệu output có thể bị cắt cụt, kiểm tra kỹ nếu attempt này fail.`);
    }
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
    attemptLog.review = { elapsedSec: rev.elapsedSec, text: rev.text, finishReason: rev.finishReason };
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

const resultFileName = `${videoArg}-${sceneArg.toLowerCase()}-${modelTag}.json`;
fs.writeFileSync(path.join(RESULTS_DIR, resultFileName), JSON.stringify(log, null, 2), "utf8");
console.log(`\n${log.result}. Log: poc/hyperframes/poc-results/model-compare/${resultFileName}`);

if (!passed) process.exit(1);
