// Sinh composition HyperFrames (HTML + GSAP) theo shotlist đã chốt — bản HyperFrames của
// archive/remotion-legacy/scripts/07-codegen.router.mjs.
//
// KIẾN TRÚC (đã sửa sau khi Checkpoint D phát hiện điểm khớp Style DNA thấp — xem
// pipeline/codegen-issues.jsonl và lịch sử trao đổi ngày video an-le-64): LLM CHỈ sinh 1
// composition STANDALONE (index.html, composition-id "main") — mirror ĐÚNG NGUYÊN VẸN
// poc/hyperframes/codegen-poc.mjs đã kiểm chứng cho điểm khớp style DNA tốt (~5.6-6.5/10) —
// KHÔNG bắt LLM biết gì về sub-composition/<template>/tránh trùng id="root". Sau khi
// verify+review PASS, một bước TẤT ĐỊNH riêng (standaloneToSubComposition trong
// scripts/lib/sync-root-hf-lib.mjs, tổng quát hoá đúng logic đã chứng minh đúng của
// poc/hyperframes/assemble-poc.mjs) chuyển đổi cơ học file standalone đó thành
// compositions/scene-sNN.html thật trong project chung của video. LLM không bao giờ phải tự
// viết đúng khuôn dạng sub-composition — loại bỏ hẳn khả năng ràng buộc kỹ thuật đó làm phân
// tán sự tập trung của model khỏi chất lượng thị giác — ĐÃ XÁC NHẬN bằng thực nghiệm đối chứng
// (không phải suy đoán): Checkpoint D từ 4.3/10 (sub-composition trực tiếp) lên 6.2/10 (cách
// này), vượt cả baseline POC ~6/10. Xem kế hoạch "Chẩn đoán và khắc phục chất lượng thấp
// Checkpoint D" để biết đầy đủ quá trình loại trừ các giả thuyết khác.
//
// QUY TẮC (giống hệt bản Remotion, xem planning/responsibility-matrix.md mục 6): KHÔNG BAO GIỜ
// batch nhiều scene trong 1 lần gọi — luôn 1 scene/lần (script này giả định sceneIds có đúng 1
// phần tử ở bước chuyển đổi cuối). Chạy song song nhiều scene của CÙNG 1 video: mỗi tiến trình
// có project test standalone TẠM RIÊNG (đặt tên theo scene) nên generate+verify+review hoàn
// toàn cách ly nhau, không còn race — --no-root-sync giờ chỉ còn ý nghĩa "đừng ráp index.html
// chung ngay, để làm sau khi mọi tiến trình xong" (mirror scripts/08-sync-root.hf.mjs).
//
// Usage: node scripts/07-codegen.hf.router.mjs --video=<slug> --scenes=S01
//        node scripts/07-codegen.hf.router.mjs --video=<slug> --scenes=S01 --issue-file=path/to/bug.txt
//        node scripts/07-codegen.hf.router.mjs --video=<slug> --scenes=S06 --no-root-sync
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { callModel, extractText, loadModelRouting, appendRunLog } from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { syncRootHf, standaloneToSubComposition } from "./lib/sync-root-hf-lib.mjs";

const HF_VERSION = "0.8.56"; // pin — khớp version đã kiểm chứng ở poc/hyperframes/ (xem CLAUDE.md scaffold: "Pinned CLI version")

const root = process.cwd();
const routing = loadModelRouting();
const GEN_MODEL = routing.reasoning_generator;
const REVIEW_MODEL = routing.reasoning_reviewer;
const MAX_ATTEMPTS = 3;

const slug = getVideoSlug();
const vp = videoPaths(slug);

function read(p) {
  return fs.readFileSync(path.join(root, p), "utf8");
}

const argScenes = (process.argv.find((a) => a.startsWith("--scenes=")) || "--scenes=S01").split("=")[1];
const allScenes = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
const allShots = JSON.parse(fs.readFileSync(vp.shotlistJson, "utf8"));
const sceneIds = argScenes === "all" ? allScenes.map((s) => s.id) : argScenes.split(",");
const sceneId = sceneIds[0]; // bước chuyển đổi cuối chỉ hỗ trợ đúng 1 scene/lần (đúng quy tắc)

const scenes = allScenes.filter((s) => sceneIds.includes(s.id));
const shots = allShots.filter((s) => sceneIds.includes(s.sceneId));
const mediaManifest = JSON.parse(fs.readFileSync(vp.manifestJson, "utf8"));
const mediaById = Object.fromEntries(mediaManifest.map((m) => [m.id, m]));
const usedMedia = [...new Set(shots.map((s) => s.assetId).filter(Boolean))].map((id) => mediaById[id]);
const noRootSync = process.argv.includes("--no-root-sync");

// --- Scaffold project HyperFrames MỘT LẦN cho cả video (project chung, đích cuối của scene) ---
// `hyperframes init` từ chối scaffold vào thư mục đã tồn tại VÀ không rỗng — thư mục
// hyperframes/videos/<slug>/ có thể đã có sẵn nội dung từ Giai đoạn A (caption-track.html) hoặc
// từ lần chạy trước, nên init vào 1 thư mục tạm rồi copy đúng các file scaffold còn thiếu
// (hyperframes.json/meta.json/package.json/index.html) sang, KHÔNG ghi đè gì đã có sẵn.
if (!fs.existsSync(path.join(vp.hfProjectDir, "hyperframes.json"))) {
  fs.mkdirSync(path.dirname(vp.hfProjectDir), { recursive: true });
  // Tên thư mục tạm PHẢI unique per-process (sceneId + pid) — nếu nhiều scene chạy song song
  // đều thấy "chưa tồn tại" cùng lúc (chưa có scene nào bootstrap trước), dùng chung 1 tên tmp
  // cố định gây race condition thật (1 process rmSync trong khi process khác đang init cùng
  // path) — lỗi thật đã gặp khi chạy 18 scene song song ngay từ đầu (video ban-an-473-phan-2,
  // không bootstrap 1 scene riêng trước). Copy sang đích cuối vẫn dùng guard !exists(dest) nên
  // nhiều process cùng scaffold xong rồi copy đè không gây hỏng dữ liệu (cùng version/flags CLI).
  const tmpDir = path.join(path.dirname(vp.hfProjectDir), `.scaffold-tmp-${slug}-${sceneId.toLowerCase()}-${process.pid}`);
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log(`Scaffold project HyperFrames mới cho video "${slug}": ${vp.hfProjectDir}`);
  execSync(
    `npx --yes hyperframes@${HF_VERSION} init "${path.basename(tmpDir)}" --resolution portrait --non-interactive`,
    {
      cwd: path.dirname(vp.hfProjectDir),
      stdio: "inherit",
      env: { ...process.env, HYPERFRAMES_SKIP_SKILLS: "1" },
    },
  );
  fs.mkdirSync(vp.hfProjectDir, { recursive: true });
  for (const f of fs.readdirSync(tmpDir)) {
    const dest = path.join(vp.hfProjectDir, f);
    if (!fs.existsSync(dest)) fs.cpSync(path.join(tmpDir, f), dest, { recursive: true });
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
  const metaPath = path.join(vp.hfProjectDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    meta.name = slug;
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf8");
  }

  // Lỗi thật đã xảy ra (video "ban-an-35-phan-1", 2026-09-23): CLAUDE.md/AGENTS.md do `hyperframes
  // init` scaffold sẵn chỉ có hướng dẫn chung của CLI, không nhắc quy ước render RIÊNG của repo
  // này — agent chỉ có context của project này (không đọc planning/README.md ở repo root) đã tự
  // render sai cả đường dẫn (rơi về mặc định CLI `renders/<name>.mp4`) lẫn quality (chọn nhầm
  // `delivery`/`high`). Ghi tất định đoạn quy ước này vào chính CLAUDE.md/AGENTS.md của project
  // ngay khi scaffold — không phụ thuộc agent nhớ kiểm tra tài liệu ở repo root. Điểm chặn CHÍNH là
  // `scripts/09-render.hf.mjs` (preflight assertion từ chối lệch convention) — đoạn này chỉ là
  // lớp nhắc bổ sung phòng khi ai đó gõ tay lệnh CLI thô thay vì dùng script.
  const renderConventionNote = `

## Quy ước render riêng của repo này (ĐỌC TRƯỚC KHI RENDER — ghi đè mặc định CLI)

Repo \`vox-style-xe-giay-v1-hyperframes\` có quy ước RIÊNG cho việc render, khác mặc định của CLI —
LUÔN dùng wrapper tất định sau (chạy từ REPO ROOT, không phải từ thư mục project này):

\`\`\`bash
node scripts/09-render.hf.mjs --video=${slug}
\`\`\`

Wrapper này tự cố định \`--quality looks\` + output \`out/${slug}-full.mp4\` (KHÔNG PHẢI
\`renders/<name>.mp4\` mặc định của CLI), tự chạy ffprobe đối chiếu duration với audio thật, và tự
ghi vào run-log — KHÔNG cần tự gõ lệnh \`npx hyperframes render\` thô. Nếu thật sự cần 1 bản xuất
đặc biệt khác convention (quality/đường dẫn khác), wrapper sẽ TỪ CHỐI chạy trừ khi thêm cờ
\`--force-non-default\` — đọc thông báo lỗi của wrapper để biết cú pháp chính xác. Xem
\`planning/README.md\` bước 10 và \`planning/responsibility-matrix.md\` mục 8 để biết đầy đủ.
`;
  for (const docFile of ["CLAUDE.md", "AGENTS.md"]) {
    const docPath = path.join(vp.hfProjectDir, docFile);
    if (fs.existsSync(docPath)) {
      fs.appendFileSync(docPath, renderConventionNote, "utf8");
    }
  }
}
fs.mkdirSync(vp.hfCompositionsDir, { recursive: true });
fs.mkdirSync(vp.hfAssetsDir, { recursive: true });

// Copy đúng file asset (ảnh/video) của scene đang xử lý vào assets/ dùng chung của video — tất
// định, không AI, giống vai trò staticFile() phía Remotion.
for (const m of usedMedia) {
  if (!m?.file) continue;
  const src = path.join(root, m.file);
  const dest = path.join(vp.hfAssetsDir, path.basename(m.file));
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`  copied asset ${path.basename(m.file)}`);
  }
}

// --- Project test STANDALONE tạm riêng cho scene này (mirror đúng codegen-poc.mjs: mỗi scene
// 1 project riêng, độc lập hoàn toàn — không race khi chạy song song nhiều scene khác nhau). ---
const tempProjectDir = path.join(root, "hyperframes", ".gen-tmp", `${slug}-${sceneId.toLowerCase()}`);
if (!fs.existsSync(path.join(tempProjectDir, "hyperframes.json"))) {
  fs.mkdirSync(path.dirname(tempProjectDir), { recursive: true });
  console.log(`Scaffold project test standalone cho scene ${sceneId}: ${tempProjectDir}`);
  execSync(
    `npx --yes hyperframes@${HF_VERSION} init "${path.basename(tempProjectDir)}" --resolution portrait --non-interactive`,
    {
      cwd: path.dirname(tempProjectDir),
      stdio: "inherit",
      env: { ...process.env, HYPERFRAMES_SKIP_SKILLS: "1" },
    },
  );
}
fs.mkdirSync(path.join(tempProjectDir, "assets"), { recursive: true });
for (const m of usedMedia) {
  if (!m?.file) continue;
  const src = path.join(root, m.file);
  const dest = path.join(tempProjectDir, "assets", path.basename(m.file));
  if (fs.existsSync(src) && !fs.existsSync(dest)) fs.copyFileSync(src, dest);
}

// --- Tài liệu tham chiếu HyperFrames (đã kiểm chứng ở poc/hyperframes/codegen-poc.mjs) ---
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

// KNOWN_GOTCHAS_HF — NGUYÊN VĂN nội dung đã kiểm chứng ở poc/hyperframes/codegen-poc.mjs
// (composition ĐỘC LẬP, không nhắc gì tới sub-composition/<template> — đó là chuyện của bước
// chuyển đổi tất định sau này, không phải việc của model). Dùng chung
// pipeline/codegen-issues.jsonl với bản Remotion (field `framework` phân biệt).
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
- Kiểm tra kỹ mọi text/chữ KHÔNG bị phần tử khác đè lên (che khuất) tại bất kỳ mốc thời gian nào trong lúc nó đang hiển thị — "hyperframes check" bắt lỗi \`text_occluded\` (chữ bị ẩn dưới 1 phần tử opaque). Nếu che khuất là CÓ CHỦ ĐÍCH (transition, reveal), dùng data-layout-allow-occlusion trên đúng phần tử; nếu không, đổi z-index/vị trí để chữ luôn đọc được khi đang trong khung thời gian hiển thị của nó.
- TUYỆT ĐỐI không tạo NHIỀU phần tử timed (data-start khác nhau) cùng chứa/render TRÙNG LẶP cùng 1 nội dung text (vd hiệu ứng "label/punch-phrase xuất hiện" bị vô tình lặp lại thành 2-3 bản sao với data-start lệch nhau vài trăm ms đến ~1.3s thay vì đúng 1 bản duy nhất) — "hyperframes check" bắt lỗi \`content_overlap\` (2 khối text đè lên nhau tại cùng vị trí, chữ bị lem không đọc được). Mỗi label/punch-phrase/overlay chỉ được có ĐÚNG 1 phần tử/1 timeline hiển thị nó; nếu cần hiệu ứng xuất hiện theo từng từ, dùng 1 cấu trúc timeline duy nhất kiểm soát opacity/transform của từng span con, không tạo nhiều bản sao độc lập của cùng khối text.`;

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
- Đây là 1 composition ĐỘC LẬP (không phải sub-composition, không có <template>) — chỉ cần đúng 1 composition-id "main", duration = tổng thời lượng scene (tính bằng giây từ startMs/endMs của SHOTLIST bên dưới, chia 1000).
- Ảnh/video nguồn đã có sẵn trong thư mục "assets/" của project (xem MEDIA bên dưới để biết đúng tên file) — dùng thẳng đường dẫn tương đối "assets/<file>".
- Dịch lại đúng tinh thần SHOTLIST bên dưới (từng shot có assetTreatment/cameraMotion/overlays/transitionIn/notes chi tiết) bằng ngôn ngữ GSAP/HTML tự nhiên của HyperFrames — KHÔNG cần dịch máy móc từng animation của bản Remotion đối chứng (bạn không thấy code Remotion đó), chỉ cần đúng Ý ĐỒ biên tập mô tả trong shotlist.
- Video (assetTreatment có trimStartSec/trimEndSec) dùng thẻ <video muted> với thuộc tính tương ứng.

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

  const userPrompt = `SCENE PLAN (scene cần code lần này):
${JSON.stringify(scenes, null, 2)}

SHOTLIST (chi tiết từng shot):
${JSON.stringify(shots, null, 2)}

MEDIA MANIFEST (asset dùng trong các shot trên):
${JSON.stringify(usedMedia, null, 2)}

Hãy sinh composition HyperFrames cho scene: ${sceneId}.`;

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
  console.log(`Gọi ${GEN_MODEL} để sinh composition HyperFrames cho scene: ${sceneId}${feedback ? " (retry)" : ""}...`);
  const response = await callModel({
    model: GEN_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    maxTokens: 16000,
  });
  const text = extractText(response);
  const files = parseFiles(text);
  if (Object.keys(files).length === 0) {
    throw new Error("Không parse được file nào từ output generator:\n" + text.slice(0, 1000));
  }
  return files;
}

function categorizeVerifyError(err) {
  if (err.startsWith("### hyperframes check")) return "verify-hf-check";
  return "verify-hf-other";
}

// Dùng CHUNG pipeline/codegen-issues.jsonl với bản Remotion (field `framework` phân biệt) — mục
// đích audit định kỳ tìm lỗi lặp lại xuyên cả 2 framework, không phân mảnh log.
function appendCodegenIssue(entries) {
  const logPath = path.join(root, "pipeline", "codegen-issues.jsonl");
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const ts = new Date().toISOString();
  const lines = entries.map((e) =>
    JSON.stringify({ ts, video: slug, scene: sceneId, attempt, framework: "hyperframes", ...e }),
  );
  fs.appendFileSync(logPath, lines.join("\n") + "\n", "utf8");
}

function writeFiles(files) {
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(tempProjectDir, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content, "utf8");
    console.log(`  wrote ${rel} (${content.length} chars)`);
  }
}

// verify() — mirror ĐÚNG codegen-poc.mjs: check project STANDALONE tạm, luôn full
// `hyperframes check` (lint+runtime+layout+motion+contrast) — an toàn chạy song song vì mỗi
// scene có project riêng, không còn file nào bị race.
function verify() {
  let raw = "";
  let ok = false;
  try {
    raw = execSync(`npx --yes hyperframes@${HF_VERSION} check --json`, {
      cwd: tempProjectDir,
      stdio: "pipe",
      timeout: 180000,
    }).toString();
    ok = true;
  } catch (e) {
    raw = e.stdout?.toString() || e.stderr?.toString() || e.message;
    ok = false;
  }
  let parsed = null;
  try {
    const jsonStart = raw.indexOf("{");
    parsed = JSON.parse(jsonStart >= 0 ? raw.slice(jsonStart) : raw);
  } catch {
    // giữ raw text để review bằng mắt nếu không parse được
  }
  const passed = parsed ? parsed.ok === true : ok;
  return { passed, raw: raw.slice(0, 6000) };
}

async function review(files) {
  const systemPrompt = `Bạn review code HyperFrames (HTML + GSAP) vừa sinh ra, đối chiếu với shotlist và style DNA. Trả lời NGẮN GỌN theo format:
VERDICT: PASS hoặc FAIL
ISSUES:
- (liệt kê vấn đề cụ thể nếu FAIL, để trống nếu PASS)

QUAN TRỌNG: đây là HyperFrames (HTML/GSAP), KHÔNG PHẢI Remotion/React — không chấm điểm dựa trên quy ước Remotion. Chỉ chấm sai nếu vi phạm rõ ràng composition contract (thiếu window.__timelines, thiếu data-start/data-duration, dùng Date.now()/Math.random()) hoặc sai lệch rõ so với style DNA (màu/font/caption) hoặc shotlist.

SKILL DOCS:
${skillDocs}

${KNOWN_GOTCHAS_HF}

LƯU Ý VỀ TÊN FILE ASSET: một số file ảnh có chữ "cutout" trong TÊN FILE — đó chỉ là mô tả phong cách minh hoạ do ảnh AI tạo sẵn đã có, KHÔNG phải chỉ định phải áp dụng xử lý cutout trong code. Theo quyết định dự án, ảnh luôn dùng làm nền toàn khung, giữ nguyên màu.

Ưu tiên PASS nếu ý chính của shotlist đã được thể hiện đúng tinh thần — đừng FAIL vì tiểu tiết chuyển động không khớp 100% mô tả, miễn không sai composition contract hoặc sai lệch RÕ RÀNG so với style DNA cốt lõi (màu, không cutout-processing, caption).`;
  const filesText = Object.entries(files)
    .map(([p, c]) => `### ${p}\n\`\`\`html\n${c}\n\`\`\``)
    .join("\n\n");
  const userPrompt = `SHOTLIST liên quan:\n${JSON.stringify(shots, null, 2)}\n\nCODE VỪA SINH:\n${filesText}`;
  const response = await callModel({
    model: REVIEW_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.2,
    maxTokens: 2000,
  });
  return extractText(response);
}

const issueFileArg = process.argv.find((a) => a.startsWith("--issue-file="));
const seededIssue = issueFileArg
  ? fs.readFileSync(issueFileArg.split("=").slice(1).join("="), "utf8")
  : null;

let attempt = 0;
let feedback = seededIssue ? `Người dùng báo lỗi trên bản đã PASS trước đó, sửa đúng các lỗi sau (giữ nguyên phần còn lại):\n${seededIssue}` : null;
// --issue-file sửa lỗi TRÊN code hiện có (không sinh lại từ đầu) — nạp file standalone tạm nếu
// còn (attempt trước fail chưa dọn), best-effort: nếu không còn (vd lần trước đã PASS+dọn), model
// sẽ sinh lại từ đầu chỉ dựa vào mô tả lỗi.
let previousFiles = seededIssue && fs.existsSync(path.join(tempProjectDir, "index.html"))
  ? { "index.html": fs.readFileSync(path.join(tempProjectDir, "index.html"), "utf8") }
  : null;
let finalFiles = null;
let finalVerdict = null;

while (attempt < MAX_ATTEMPTS) {
  attempt++;
  console.log(`\n=== Attempt ${attempt}/${MAX_ATTEMPTS} ===`);
  try {
    const files = await generate(feedback, previousFiles);
    writeFiles(files);
    previousFiles = files;

    const v = verify();
    if (!v.passed) {
      console.log("Verify (hyperframes check) FAILED:\n" + v.raw.slice(0, 2000));
      appendCodegenIssue([{ stage: categorizeVerifyError("### hyperframes check"), detail: v.raw.slice(0, 2000) }]);
      feedback = "hyperframes check FAILED:\n" + v.raw.slice(0, 4000);
      continue;
    }
    console.log("Verify (hyperframes check) PASS.");

    const reviewText = await review(files);
    console.log("Review result:\n" + reviewText);
    finalFiles = files;
    finalVerdict = reviewText;

    if (/VERDICT:\s*PASS/i.test(reviewText)) {
      break;
    }
    appendCodegenIssue([{ stage: "review", detail: reviewText.slice(0, 2000) }]);
    feedback = "Reviewer FAIL:\n" + reviewText;
  } catch (e) {
    console.log(`Lỗi khi gọi 9router (sẽ thử lại): ${e.message || e}`);
  }
}

const passed = !!(finalVerdict && /VERDICT:\s*PASS/i.test(finalVerdict));

if (passed) {
  // --- Chuyển đổi TẤT ĐỊNH standalone -> sub-composition (KHÔNG AI) — tổng quát hoá đúng logic
  // đã chứng minh đúng của poc/hyperframes/assemble-poc.mjs. ---
  const compId = `scene-${sceneId.toLowerCase()}`;
  const standaloneHtml = fs.readFileSync(path.join(tempProjectDir, "index.html"), "utf8");
  const subCompHtml = standaloneToSubComposition(standaloneHtml, compId);
  fs.writeFileSync(path.join(vp.hfCompositionsDir, `${compId}.html`), subCompHtml, "utf8");
  console.log(`  chuyển đổi tất định: standalone -> compositions/${compId}.html`);
  fs.rmSync(tempProjectDir, { recursive: true, force: true });

  if (!noRootSync) {
    syncRootHf(slug, root);
  }
}

const summary = passed
  ? `Codegen HyperFrames scene [${sceneId}] PASS sau ${attempt} lần thử bằng ${GEN_MODEL} (review: ${REVIEW_MODEL}) — đã chuyển đổi thành compositions/scene-${sceneId.toLowerCase()}.html.`
  : `Codegen HyperFrames scene [${sceneId}] KHÔNG đạt sau ${attempt} lần thử — cần Claude can thiệp. Verdict cuối:\n${finalVerdict ?? "(chưa qua được verify)"}\nProject standalone tạm còn giữ tại: ${tempProjectDir}`;

console.log("\n" + summary);
appendRunLog(`\`scripts/07-codegen.hf.router.mjs --video=${slug} --scenes=${sceneId}\` — ${summary}`, vp.runLog);

if (!passed) {
  process.exit(1);
}
