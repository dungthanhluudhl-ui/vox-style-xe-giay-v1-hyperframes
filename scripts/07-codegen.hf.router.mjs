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
//        node scripts/07-codegen.hf.router.mjs --video=<slug> --scenes=S06 --review-only   (dùng lại .gen-tmp đã PASS verify, chỉ review — sau mã thoát 2)
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { callModel, extractText, loadModelRouting, appendRunLog, callWithModelFallback } from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { syncRootHf, standaloneToSubComposition } from "./lib/sync-root-hf-lib.mjs";
import { getCaptionZoneArg, SCENE_CAPTION_SEEK } from "./lib/caption-zone.mjs";
import { HF_VERSION, runHyperframesCheck, findRootLayoutFlags, formatCheckFeedback } from "./lib/hf-check.mjs";
import { buildTextColorRules, buildSafeColorClasses } from "./lib/palette-contrast.mjs";
import { autofixVideoTiming, autofixContrast, injectIntoFirstStyle } from "./lib/hf-autofix.mjs";
import { annotateShotsForCodegen, REVIEW_FORMAT, REVIEW_POLICY, parseReviewVerdict, checkAssetUsage } from "./lib/review-gate.mjs";

const root = process.cwd();
const routing = loadModelRouting();
const GEN_MODEL = routing.reasoning_generator;
// Generator dự phòng (quyết định người dùng 2026-09-26, cùng cơ chế đã áp cho reviewer): hết hạn
// mức/lỗi mạng → chuyển NGAY sang model này, không tự thử lại model đang bị khoá. Đặt trong script
// (không phải hướng dẫn cho Claude điều phối) để mọi session/agent áp dụng đồng nhất.
const GEN_MODEL_FALLBACK = routing.reasoning_generator_fallback;
let genModelUsed = null; // model THỰC SỰ đã sinh code (chính hoặc dự phòng) — ghi vào run-log
const REVIEW_MODEL = routing.reasoning_reviewer;
// Reviewer dự phòng (quyết định người dùng 2026-09-26): model chính lỗi hạ tầng (hết hạn mức/mạng) →
// chuyển NGAY sang model này thay vì thử đi thử lại model đang bị khoá (callWithModelFallback).
const REVIEW_MODEL_FALLBACK = routing.reasoning_reviewer_fallback;
let reviewModelUsed = null; // model THỰC SỰ đã trả verdict (chính hoặc dự phòng) — ghi vào run-log
const MAX_ATTEMPTS = 3;
// Lỗi HẠ TẦNG khi gọi generator/reviewer (403 hết hạn mức, 429, 5xx, timeout) KHÔNG tiêu MAX_ATTEMPTS:
// callWithModelFallback() (router-client.mjs) chuyển ngay sang model dự phòng, cả 2 cùng lỗi mới chờ
// đúng "reset after Ns" rồi thử lại cả chuỗi. Bài học thật 2026-09-26: bản cũ retry review NGAY (vẫn
// dính 403) rồi coi cả lần thử là hỏng → vứt code đã PASS verify, sinh lại từ đầu; ban-an-425-phan-1
// mất 97/186 lần thử vì vậy. Hết ngân sách hạ tầng mà verify đã PASS →
// thoát mã 2, giữ .gen-tmp, chạy lại bằng --review-only (không gọi generator).
const EXIT_REVIEW_UNAVAILABLE = 2;
const reviewOnly = process.argv.includes("--review-only");

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
// Shotlist đưa vào prompt generator + reviewer: gắn ghi chú ưu tiên cho shot ẢNH có lệnh xử lý màu (mâu
// thuẫn Stage 6 vs quy tắc dự án — xem review-gate.mjs). `shots` gốc giữ nguyên cho logic tất định khác.
const shotsForPrompt = annotateShotsForCodegen(shots, mediaById);
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
    if (fs.existsSync(dest)) continue;
    try {
      fs.cpSync(path.join(tmpDir, f), dest, { recursive: true });
    } catch (e) {
      // Race condition khi N scene cùng bootstrap project chung lần đầu (mọi tiến trình tự init
      // ra bộ file GIỐNG HỆT trong tmp dir riêng rồi cùng copy vào 1 đích chung) — 2 tiến trình có
      // thể cùng cpSync trúng đúng 1 file cùng lúc, Windows khoá file gây EPIPE/EBUSY dù nội dung
      // cả 2 bên đang ghi là như nhau. An toàn bỏ qua: tiến trình đang tranh chấp file này chắc
      // chắn sẽ hoàn tất nó. Tổng quát hoá từ bản vá riêng cho meta.json (sự cố
      // lay-bac-tu-phim-x-quang, 2026-09-28) sang TOÀN BỘ vòng lặp copy sau khi gặp lại đúng họ
      // lỗi này trên package.json (video vua-bao-chua-han-quoc, 2026-09-29, xem
      // planning/responsibility-matrix.md mục 6).
      console.warn(`  ⚠ Bỏ qua copy "${f}" (đọc/ghi trúng lúc process khác đang bootstrap song song, không ảnh hưởng render/check): ${e.message}`);
    }
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
  const metaPath = path.join(vp.hfProjectDir, "meta.json");
  if (fs.existsSync(metaPath)) {
    // Race condition thật (video "lay-bac-tu-phim-x-quang", 2026-09-28): nhiều scene cùng bootstrap
    // project chung lần đầu (guard !exists(hyperframes.json) đúng cho cả N process cùng lúc) — 1
    // process có thể đọc trúng meta.json khi process khác đang ghi dở (cpSync/writeFileSync không
    // atomic giữa các process), JSON.parse trúng nội dung rỗng/dở dang -> crash cả scene dù bootstrap
    // thực chất đã thành công. meta.name chỉ là field cosmetic (không dùng ở đâu khác trong pipeline,
    // xem planning/responsibility-matrix.md mục 6) — bỏ qua an toàn thay vì làm fail cả scene.
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      meta.name = slug;
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2), "utf8");
    } catch (e) {
      console.warn(`  ⚠ Bỏ qua cập nhật meta.json (đọc trúng lúc process khác đang bootstrap song song, không ảnh hưởng render/check): ${e.message}`);
    }
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
  // Quy tắc đặt <video> (video_nested_in_timed_element / data-start) — thiếu file này, model hay lồng
  // video trong section shot có data-start rồi kẹt giữa 2 lỗi lint (xem VIDEO_RULE_HF bên dưới).
  ".agents/skills/hyperframes-core/references/variables-and-media.md",
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
const styleTokensObj = JSON.parse(styleTokens);
// Bảng cặp màu chữ/nền + bộ class màu an toàn — TÍNH TẤT ĐỊNH từ style-tokens.json (palette đổi thì tự
// đổi theo). Lý do (đo 2026-09-26): contrast là lỗi verify #1, đúng các cặp palette không bao giờ đạt AA
// (cam/giấy 2.24, cam/card 2.52, kem/cam 2.61) — câu cấm chung chung có từ 21/09 không đủ.
const TEXT_COLOR_RULES_HF = buildTextColorRules(styleTokensObj);
const SAFE_COLORS = buildSafeColorClasses(styleTokensObj);
// Màu đặc trong palette — dùng để hạ cấp tất định lỗi "đổi qua lại 2 màu đều trong palette" (review-gate.mjs).
const PALETTE_HEXES = new Set(Object.values(styleTokensObj.colors ?? {}).filter((v) => /^#[0-9a-f]{6}$/i.test(v)).map((v) => v.toLowerCase()));

// Lỗi lint phổ biến nhất ở lần thử đầu (~45% lần thử 1 fail do lint, chủ yếu media_missing_data_start)
// — khi lint lỗi, check BỎ QUA toàn bộ kiểm tra trình duyệt nên lỗi contrast/che chữ chỉ lộ ở lần sau.
// Chỉ mô tả THUỘC TÍNH bắt buộc của thẻ <video>, không phải bố cục mẫu (người dùng không muốn scene mẫu).
const VIDEO_RULE_HF = `- VIDEO (<video>) — CẤU TRÚC BẮT BUỘC: thẻ <video> KHÔNG được nằm trong bất kỳ phần tử nào có data-start (kể cả <section>/<div class="clip"> của shot) — lồng vào → lint lỗi video_nested_in_timed_element; ngược lại thiếu data-start trên chính <video> → lint lỗi media_missing_data_start. Đặt <video> là con trực tiếp của #root (hoặc trong wrapper KHÔNG có data-start — dùng wrapper này nếu cần zoom/pan, không animate kích thước chính thẻ video), với đủ thuộc tính: id, src="assets/<file>", muted, playsinline, data-start (giây tính từ đầu scene = (shot.startMs - scene.startMs)/1000), data-duration (độ dài shot, giây), data-media-start (= trimStartSec nếu có). Khi shot có videoRetimeNote yêu cầu retime, dùng data-playback-rate (0.1..10) theo đúng ghi chú; đây là thuộc tính HyperFrames chính thức (hyperframes-core/references/creator-editing-recipes.md mục Constant speed), không phải thuộc tính tự chế. KHÔNG class="clip" trên <video>. Chữ/thẻ overlay của shot đặt trong phần tử RIÊNG có data-start/data-duration của shot, z-index cao hơn video.`;

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
- TUYỆT ĐỐI không đặt data-layout-allow-overflow / data-layout-allow-overlap / data-layout-allow-occlusion trên #root (phần tử data-composition-id="main") — 3 cờ này áp dụng cho MỌI phần tử con qua closest(), tắt HOÀN TOÀN layout audit của cả scene (kể cả lỗi không liên quan tới lý do đặt cờ), che khuất mọi lỗi thật khác thay vì chỉ cho phép đúng 1 trường hợp cố ý. Luôn đặt cờ trên ĐÚNG phần tử con cụ thể cần opt-out, không bao giờ trên root — "hyperframes check" sẽ FAIL cứng nếu phát hiện cờ này trên root (xem phần verify()).
- Tự định nghĩa .clip với width/height cố định bằng px (vd width:1080px; height:1920px) thay vì đúng quy ước inset:0 (xem hyperframes-core/references/tracks-and-clips.md) có thể gây lỗi tràn khung ẩn: nếu 1 class con chỉ override top mà không override height/bottom, trình duyệt giữ nguyên height kế thừa, khiến khối kéo dài quá xa khung hình (VD lỗi thật đã xảy ra: top:1300px + height:1920px kế thừa = khối cao tới y=3220px, tràn quá đáy khung 1920px tới 1300px). Luôn định nghĩa .clip { position:absolute; inset:0; } (KHÔNG set width/height cứng); nếu 1 overlay/badge muốn cao theo nội dung, phải tự đặt height:auto tường minh để ghi đè.
- Ảnh/asset dùng đường dẫn tương đối "assets/<file>" (đã copy sẵn vào thư mục assets/ của project).
- FONT "Be Vietnam Pro" (weight 700/900): KHÔNG dùng @font-face với local(...) hay trỏ tới file .ttf không có sẵn trong assets/ (sẽ gây lỗi 404 runtime — không tất định, "hyperframes check" sẽ bắt lỗi này). BẮT BUỘC nạp qua Google Fonts CDN bằng đúng 1 thẻ trong <head>: <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap">, rồi dùng font-family: "Be Vietnam Pro", sans-serif trực tiếp trong CSS — không cần @font-face thủ công.
- Một số TÊN FILE ảnh có chữ "cutout" (vd img-08-extortion-money-demand-cutout.jpeg) — đó chỉ là mô tả phong cách minh hoạ đã có sẵn TRONG chính ảnh AI tạo ra, KHÔNG phải chỉ định phải code thêm xử lý cutout. Dùng ảnh này y như file ảnh thường (nền toàn khung, giữ nguyên màu), không thêm filter grayscale/tách nền/đổ bóng trong code (nguồn: STYLE_DNA.md §2 "Ngoại lệ chính thức" — ảnh AI Flow là tranh màu).
- Khi shotlist dùng ngôn ngữ thị giác "background-photo" (hoặc bất kỳ shot nào asset ảnh là hình ảnh CHÍNH của scene, không phải ảnh minh hoạ phụ), ảnh đó PHẢI phủ TOÀN BỘ khung 1080×1920 — cùng cách làm với .clip: position:absolute; inset:0; object-fit:cover, KHÔNG bọc ảnh trong 1 khung/thẻ kích thước cố định nhỏ hơn khung hình (vd width:960px;height:570px kiểu "card ảnh"/"khung hồ sơ"). TUYỆT ĐỐI không thêm box-shadow/viền giả lên khung chứa ảnh nền chính — Style DNA coi ảnh nền là chính khung hình, không phải 1 tấm ảnh dán trang trí bên trong layout khác. (Thẻ/khung nhỏ chỉ hợp lệ cho ảnh evidence PHỤ chèn thêm bên trong 1 scene đã có ảnh nền riêng khác — vd 1 icon ảnh nhỏ minh hoạ vật chứng cạnh ảnh nền chính — không áp dụng cho chính ảnh nền được giao cho shot.) Lỗi này đã tái diễn nhiều lần ở nhiều video khác nhau (ảnh bị "nhốt" trong card/khung nhỏ thay vì làm nền) — verify không tự bắt được vì đây là lỗi ý đồ bố cục, reviewer sẽ FAIL nếu thấy vi phạm.
- TUYỆT ĐỐI không dùng biến template literal (vd \`\${compId}\`, \`\${sceneId}\`) bên trong querySelector/CSS selector ở thẻ <script> — trình bundler HTML của HyperFrames parse CSS/selector bằng static analysis và CRASH khi gặp biến nội suy. Luôn hardcode chuỗi cố định (vd document.querySelector('[data-composition-id="main"]'), không phải \`[data-composition-id="\${id}"]\`).
- ${TEXT_COLOR_RULES_HF}
- CLASS MÀU AN TOÀN ĐÃ CÓ SẴN (script tự chèn vào <style>, KHÔNG cần tự định nghĩa, dùng tuỳ ý cho phần tử chữ — vẫn tự do bố cục/kích thước/animation): ${SAFE_COLORS.doc}.
${VIDEO_RULE_HF}
- TUYỆT ĐỐI không dùng giá trị GSAP tương đối (vd y: "+=6") trên 1 thuộc tính nếu có tween khác cũng ghi cùng thuộc tính đó trên cùng phần tử ở khoảng thời gian gần nhau — "hyperframes check" bắt lỗi \`gsap_relative_value_second_writer\` (giá trị tương đối chốt mốc gốc lúc tween khởi tạo, seek tuần tự vs. worker render lẻ frame sẽ ra 2 kết quả khác nhau). Luôn dùng giá trị tuyệt đối cho y/x/scale/rotation, hoặc fromTo() với endpoint tường minh.
- Kiểm tra kỹ mọi text/chữ KHÔNG bị phần tử khác đè lên (che khuất) tại bất kỳ mốc thời gian nào trong lúc nó đang hiển thị — "hyperframes check" bắt lỗi \`text_occluded\` (chữ bị ẩn dưới 1 phần tử opaque). Nếu che khuất là CÓ CHỦ ĐÍCH (transition, reveal), dùng data-layout-allow-occlusion trên đúng phần tử; nếu không, đổi z-index/vị trí để chữ luôn đọc được khi đang trong khung thời gian hiển thị của nó.
- TUYỆT ĐỐI không tạo NHIỀU phần tử timed (data-start khác nhau) cùng chứa/render TRÙNG LẶP cùng 1 nội dung text (vd hiệu ứng "label/punch-phrase xuất hiện" bị vô tình lặp lại thành 2-3 bản sao với data-start lệch nhau vài trăm ms đến ~1.3s thay vì đúng 1 bản duy nhất) — "hyperframes check" bắt lỗi \`content_overlap\` (2 khối text đè lên nhau tại cùng vị trí, chữ bị lem không đọc được). Mỗi label/punch-phrase/overlay chỉ được có ĐÚNG 1 phần tử/1 timeline hiển thị nó; nếu cần hiệu ứng xuất hiện theo từng từ, dùng 1 cấu trúc timeline duy nhất kiểm soát opacity/transform của từng span con, không tạo nhiều bản sao độc lập của cùng khối text.
- TUYỆT ĐỐI không tự bịa thêm số liệu/trích dẫn cụ thể KHÔNG có trong SCENE PLAN/SHOTLIST được giao (vd % con số, tỷ lệ, tên điều/khoản luật, ngày tháng, số tiền) dù nghe có vẻ hợp lý hoặc đúng kiến thức nền — chỉ dùng ĐÚNG số liệu/chữ đã có trong "overlays"/"notes" của shot. Lỗi này đã lặp lại ở nhiều video khác nhau (số liệu tài chính bịa, % bịa, trích dẫn điều luật cụ thể không có nguồn) — kể cả khi số liệu tự thêm đúng thực tế khách quan, đây vẫn là rủi ro sai lệch nội dung bản án/kịch bản thật không được xác minh, reviewer sẽ FAIL. Nếu 1 label/overlay trong shotlist chỉ mô tả Ý ĐỒ chung (không kèm con số cụ thể), hãy diễn đạt lại bằng chữ, không tự chế thêm con số để "cho cụ thể hơn".`;

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

DỰ ÁN HIỆN TẠI:
- Project HyperFrames đã scaffold sẵn (portrait 1080x1920), file "index.html" hiện là blank template mặc định — bạn sẽ THAY THẾ TOÀN BỘ nội dung index.html bằng composition thật cho scene này.
- Đây là 1 composition ĐỘC LẬP (không phải sub-composition, không có <template>) — chỉ cần đúng 1 composition-id "main", duration = tổng thời lượng scene (tính bằng giây từ startMs/endMs của SHOTLIST bên dưới, chia 1000).
- Ảnh/video nguồn đã có sẵn trong thư mục "assets/" của project (xem MEDIA bên dưới để biết đúng tên file) — dùng thẳng đường dẫn tương đối "assets/<file>".
- Dịch lại đúng tinh thần SHOTLIST bên dưới (từng shot có assetTreatment/cameraMotion/overlays/transitionIn/notes chi tiết) bằng ngôn ngữ GSAP/HTML tự nhiên của HyperFrames — KHÔNG cần dịch máy móc từng animation của bản Remotion đối chứng (bạn không thấy code Remotion đó), chỉ cần đúng Ý ĐỒ biên tập mô tả trong shotlist.
- Video (assetTreatment có trimStartSec/trimEndSec) dùng thẻ <video> theo đúng CẤU TRÚC BẮT BUỘC ở mục VIDEO bên dưới.

HỢP ĐỒNG RIÊNG CỦA REPO (đặt CUỐI để không bị chìm giữa ~30k token tài liệu chung — vi phạm các quy tắc này là nguyên nhân verify FAIL phổ biến nhất đã đo được; chúng KHÔNG giới hạn sáng tạo bố cục/animation, chỉ là ràng buộc kỹ thuật):
${KNOWN_GOTCHAS_HF}

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
${JSON.stringify(shotsForPrompt, null, 2)}

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
  const { response, model } = await callWithModelFallback(
    [GEN_MODEL, GEN_MODEL_FALLBACK],
    (m) =>
      callModel({
        model: m,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
        maxTokens: 16000,
      }),
    {
      label: "generator",
      onInfraError: (e, m, round) =>
        appendCodegenIssue([{ stage: "generate-infra-error", detail: `${m} vòng ${round}: ${String(e.message ?? e).slice(0, 500)}` }]),
    },
  );
  if (model !== GEN_MODEL) console.log(`  (sinh bằng model DỰ PHÒNG ${model})`);
  genModelUsed = model;
  const text = extractText(response);
  const files = parseFiles(text);
  if (Object.keys(files).length === 0) {
    throw new Error("Không parse được file nào từ output generator:\n" + text.slice(0, 1000));
  }
  return files;
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

// Ghi MỌI lỗi hạ tầng vào codegen-issues.jsonl — trước đây chỉ in console nên audit không thấy (lỗ
// đen: hàng trăm lần thử mất mà không có dòng verify/review nào được ghi).
function logInfraError(stage, model) {
  return (e, tryNo) => appendCodegenIssue([{ stage, detail: `${model} lần ${tryNo}: ${String(e.message ?? e).slice(0, 500)}` }]);
}

/** Bước tất định TRƯỚC check: (1) chèn bộ class màu an toàn vào khối <style> đầu tiên (idempotent);
 * (2) sửa cấu trúc <video> khi chắc chắn (hf-autofix.mjs). Trả files mới (đã ghi đĩa nếu có đổi). */
function applyPreCheckAutofix(files) {
  let html = files["index.html"];
  if (!html) return files;
  if (!html.includes("hf-safe-colors")) html = injectIntoFirstStyle(html, SAFE_COLORS.css) ?? html;
  const vf = autofixVideoTiming(html, { scene: scenes[0], shots, mediaById });
  if (vf.changes.length) {
    console.log(`Autofix <video> (tất định): ${vf.changes.join("; ")}`);
    appendCodegenIssue([{ stage: "autofix-video", detail: vf.changes.join("\n").slice(0, 2000) }]);
    html = vf.html;
  }
  if (vf.skipped.length) console.log(`(autofix <video> bỏ qua: ${vf.skipped.join("; ")})`);
  if (html === files["index.html"]) return files;
  const out = { ...files, "index.html": html };
  writeFiles(out);
  return out;
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
// --caption-zone: check TOẠ ĐỘ HÌNH HỌC thuần tuý (bắt scene tự đặt card/text đè vùng caption dành
// riêng — bài học thật S02/S16: standalone PASS riêng lẻ vẫn lọt lỗi khi ráp chung với
// caption-track). Scene standalone ở đây KHÔNG mount caption-track.html nên không dính false
// positive đã gặp khi test caption-track tự báo lỗi trên chính nó (đã sửa riêng ở
// generate-caption-track-hf.mjs bằng data-layout-allow-caption-zone).
function verify(files) {
  const rootFlags = findRootLayoutFlags(files["index.html"]);
  if (rootFlags.length > 0) {
    return {
      passed: false,
      infraError: false,
      raw: `Phát hiện cờ layout đặt SAI CHỖ trên #root: ${rootFlags.join(", ")}. Các cờ này dùng closest() nên tắt TOÀN BỘ layout audit của cả scene khi đặt ở root — di chuyển xuống ĐÚNG phần tử con cụ thể cần opt-out (không phải root).`,
    };
  }
  // seek dày: caption-zone mặc định CLI chỉ xét khung cuối scene — xem SCENE_CAPTION_SEEK.
  return runHyperframesCheck(tempProjectDir, { extraArgs: [getCaptionZoneArg(root, { seek: SCENE_CAPTION_SEEK })] });
}

async function review(files) {
  // Cổng review có cấu trúc (quyết định người dùng 2026-09-26): reviewer phân loại BLOCKING/ADVISORY,
  // SCRIPT quyết định PASS/FAIL theo danh sách BLOCKING (parseReviewVerdict) — xem review-gate.mjs.
  const systemPrompt = `Bạn review code HyperFrames (HTML + GSAP) vừa sinh ra, đối chiếu với shotlist và style DNA. Code này ĐÃ PASS "hyperframes check" (lint + runtime + layout + contrast + caption-zone).
${REVIEW_FORMAT}

QUAN TRỌNG: đây là HyperFrames (HTML/GSAP), KHÔNG PHẢI Remotion/React — không chấm điểm dựa trên quy ước Remotion.

${REVIEW_POLICY}

SKILL DOCS:
${skillDocs}

${KNOWN_GOTCHAS_HF}

LƯU Ý VỀ TÊN FILE ASSET: một số file ảnh có chữ "cutout" trong TÊN FILE — đó chỉ là mô tả phong cách minh hoạ do ảnh AI tạo sẵn đã có, KHÔNG phải chỉ định phải áp dụng xử lý cutout trong code. Theo quyết định dự án, ảnh luôn dùng làm nền toàn khung, giữ nguyên màu (nguồn: STYLE_DNA.md §2 "Ngoại lệ chính thức").`;
  const filesText = Object.entries(files)
    .map(([p, c]) => `### ${p}\n\`\`\`html\n${c}\n\`\`\``)
    .join("\n\n");
  const userPrompt = `SHOTLIST liên quan:\n${JSON.stringify(shotsForPrompt, null, 2)}\n\nCODE VỪA SINH:\n${filesText}`;
  const { response, model } = await callWithModelFallback(
    [REVIEW_MODEL, REVIEW_MODEL_FALLBACK],
    (m) =>
      callModel({
        model: m,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.2,
        maxTokens: 2000,
      }),
    {
      label: "reviewer",
      onInfraError: (e, m, round) =>
        appendCodegenIssue([{ stage: "review-infra-error", detail: `${m} vòng ${round}: ${String(e.message ?? e).slice(0, 500)}` }]),
    },
  );
  if (model !== REVIEW_MODEL) console.log(`  (review bằng model DỰ PHÒNG ${model})`);
  reviewModelUsed = model;
  return extractText(response);
}

const issueFileArg = process.argv.find((a) => a.startsWith("--issue-file="));
const issueFilePath = issueFileArg?.slice("--issue-file=".length);
const seededIssue = issueFileArg
  ? fs.readFileSync(issueFilePath, "utf8")
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
let finalReviewPass = false; // quyết định theo parseReviewVerdict (lỗi CHẶN), không theo dòng VERDICT
// Code đã PASS verify gần nhất — giữ lại khi reviewer/generator lỗi hạ tầng hết ngân sách (không vứt).
let verifyPassedFiles = null;
let infraFailure = null; // { stage: "generate" | "review", message }

// --review-only: dùng lại index.html đang có trong .gen-tmp (thường là bản đã PASS verify nhưng
// reviewer lỗi hạ tầng ở lần chạy trước, mã thoát 2) — verify lại + review, không gọi generator. Nếu
// verify lại FAIL thì tiếp tục vòng sửa bình thường với feedback.
const tmpIndexPath = path.join(tempProjectDir, "index.html");
if (reviewOnly && !fs.existsSync(tmpIndexPath)) {
  console.error(`--review-only nhưng không có ${tmpIndexPath} — chạy lại không có cờ này.`);
  process.exit(1);
}
let reuseFiles = reviewOnly ? { "index.html": fs.readFileSync(tmpIndexPath, "utf8") } : null;

while (attempt < MAX_ATTEMPTS) {
  attempt++;
  console.log(`\n=== Attempt ${attempt}/${MAX_ATTEMPTS} ===`);
  try {
    let files;
    if (reuseFiles) {
      files = reuseFiles;
      reuseFiles = null;
      console.log("(--review-only) dùng lại index.html trong .gen-tmp, không gọi generator.");
    } else {
      try {
        files = await generate(feedback, previousFiles);
      } catch (e) {
        if (e.infraExhausted) {
          infraFailure = { stage: "generate", message: String(e.message ?? e) };
          console.log(`Lỗi khi gọi 9router — generator không khả dụng sau khi đã chờ/thử lại: ${e.message || e}`);
          break;
        }
        throw e;
      }
      writeFiles(files);
    }
    files = applyPreCheckAutofix(files);
    previousFiles = files;

    let v = verify(files);
    if (!v.passed && !v.infraError) {
      // Tự sửa contrast tất định (1 lượt) — chỉ khi MỌI lỗi còn lại là contrast xác định chắc chắn phần
      // tử; thay 1 vòng generate LLM bằng 1 lần check lại. Xem hf-autofix.mjs.
      const cf = autofixContrast(files["index.html"], v.raw, { sceneId, tokens: styleTokensObj });
      if (cf.applied) {
        console.log(`Autofix contrast (tất định): ${cf.changes.join("; ")} — check lại...`);
        appendCodegenIssue([{ stage: "autofix-contrast", detail: cf.changes.join("\n").slice(0, 2000) }]);
        files = { ...files, "index.html": cf.html };
        writeFiles(files);
        previousFiles = files;
        v = verify(files);
      } else {
        console.log(`(autofix contrast không áp dụng: ${cf.reason})`);
      }
    }
    if (!v.passed) {
      // formatCheckFeedback: chỉ lỗi làm FAIL, gộp theo nguyên nhân (phần tử che / cặp màu), giữ
      // text/fg/bg/suggestedColor/phần tử che — bản cũ (summarizeCheckRaw) bỏ mất các field này và in
      // lặp mỗi mốc thời gian, model phải đoán cách sửa (đo 2026-09-26: 34% dòng lỗi là lặp).
      console.log("Verify (hyperframes check) FAILED:\n" + formatCheckFeedback(v.raw, 3000));
      appendCodegenIssue([{ stage: v.infraError ? "verify-infra-error" : "verify-hf-check", detail: formatCheckFeedback(v.raw, 3000) }]);
      feedback = "hyperframes check FAILED:\n" + formatCheckFeedback(v.raw, 5000);
      continue;
    }
    console.log("Verify (hyperframes check) PASS.");
    verifyPassedFiles = files;

    // Kiểm tra TẤT ĐỊNH dùng đúng file asset được giao — trước reviewer (không tốn 1 lần gọi reviewer, và
    // reviewer không thấy ảnh nên không được tự đoán "sai asset" từ tên file). Xem review-gate.mjs.
    const assetProblems = checkAssetUsage(files["index.html"], shots, mediaById);
    if (assetProblems.length) {
      console.log("Asset check FAILED:\n" + assetProblems.join("\n"));
      appendCodegenIssue([{ stage: "asset-check", detail: assetProblems.join("\n") }]);
      feedback = "LỖI CHẶN (script kiểm tra tất định):\n" + assetProblems.map((p) => "- " + p).join("\n");
      continue;
    }

    let reviewText;
    try {
      reviewText = await review(files);
    } catch (e) {
      if (e.infraExhausted) {
        // KHÔNG sinh lại: code đã PASS verify vẫn nằm nguyên trong .gen-tmp để --review-only dùng lại.
        infraFailure = { stage: "review", message: String(e.message ?? e) };
        console.log(`Lỗi khi gọi 9router — reviewer không khả dụng sau khi đã chờ/thử lại: ${e.message || e}`);
        break;
      }
      throw e;
    }
    console.log("Review result:\n" + reviewText);
    finalFiles = files;
    finalVerdict = reviewText;
    // SCRIPT quyết định theo danh sách lỗi CHẶN (review-gate.mjs), không theo dòng VERDICT tự do.
    const rv = parseReviewVerdict(reviewText, { paletteHexes: PALETTE_HEXES });
    if (rv.demoted?.length) {
      console.log(`(hạ cấp tự động ${rv.demoted.length} mục BLOCKING thuộc loại GÓP Ý theo chính sách)`);
      appendCodegenIssue([{ stage: "review-demoted", detail: rv.demoted.join("\n").slice(0, 2000) }]);
    }
    finalReviewPass = rv.pass;
    if (rv.advisory.length) appendCodegenIssue([{ stage: "review-advisory", detail: rv.advisory.join("\n").slice(0, 2000) }]);
    if (rv.pass) {
      if (!rv.verdictPass) console.log(`(reviewer ghi VERDICT FAIL nhưng không có lỗi CHẶN → PASS; ${rv.advisory.length} góp ý đã ghi log)`);
      break;
    }
    appendCodegenIssue([{ stage: "review", detail: (rv.structured ? rv.blocking.map((b) => "- " + b).join("\n") : reviewText).slice(0, 2000) }]);
    feedback = rv.structured
      ? "Reviewer FAIL — LỖI CHẶN cần sửa (chỉ sửa đúng các lỗi này, giữ nguyên phần còn lại):\n" + rv.blocking.map((b) => "- " + b).join("\n")
      : "Reviewer FAIL:\n" + reviewText;
  } catch (e) {
    // Lỗi KHÔNG phải hạ tầng (vd không parse được output generator) — giữ hành vi cũ: tính 1 lần thử.
    console.log(`Lỗi khi gọi 9router (sẽ thử lại): ${e.message || e}`);
    appendCodegenIssue([{ stage: "attempt-error", detail: String(e.message ?? e).slice(0, 1000) }]);
  }
}

const passed = finalReviewPass === true; // theo lỗi CHẶN (parseReviewVerdict), không theo dòng VERDICT

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

const failReason = infraFailure
  ? infraFailure.stage === "review" && verifyPassedFiles
    ? `verify PASS nhưng reviewer ${REVIEW_MODEL} + dự phòng ${REVIEW_MODEL_FALLBACK} đều KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: ${infraFailure.message.slice(0, 300)}) — chạy lại bằng --review-only, không cần sinh lại code.`
    : `${infraFailure.stage === "generate" ? `generator ${GEN_MODEL} + dự phòng ${GEN_MODEL_FALLBACK}` : `reviewer ${REVIEW_MODEL} + dự phòng ${REVIEW_MODEL_FALLBACK}`} KHÔNG KHẢ DỤNG (lỗi hạ tầng sau khi đã chờ/thử lại: ${infraFailure.message.slice(0, 300)}).`
  : finalVerdict
    ? `Verdict cuối:\n${finalVerdict}`
    : verifyPassedFiles
      ? "verify đã PASS nhưng chưa có verdict review hợp lệ."
      : "(chưa qua được verify)";
const summary = passed
  ? `Codegen HyperFrames scene [${sceneId}] PASS sau ${attempt} lần thử bằng ${genModelUsed ?? GEN_MODEL}${genModelUsed && genModelUsed !== GEN_MODEL ? " — DỰ PHÒNG" : ""} (review: ${reviewModelUsed ?? REVIEW_MODEL}${reviewModelUsed && reviewModelUsed !== REVIEW_MODEL ? " — DỰ PHÒNG" : ""})${reviewOnly ? " [--review-only]" : ""} — đã chuyển đổi thành compositions/scene-${sceneId.toLowerCase()}.html.`
  : `Codegen HyperFrames scene [${sceneId}] KHÔNG đạt sau ${attempt} lần thử — cần Claude can thiệp. ${failReason}\nProject standalone tạm còn giữ tại: ${tempProjectDir}`;

console.log("\n" + summary);
appendRunLog(`\`scripts/07-codegen.hf.router.mjs --video=${slug} --scenes=${sceneId}${issueFilePath ? ` --issue-file=${issueFilePath}` : ""}${reviewOnly ? " --review-only" : ""}\` — ${summary}`, vp.runLog);

if (!passed) {
  // Mã 2 = verify PASS nhưng reviewer không khả dụng → 07-codegen-hf-parallel.mjs tự chạy --review-only.
  process.exit(infraFailure?.stage === "review" && verifyPassedFiles ? EXIT_REVIEW_UNAVAILABLE : 1);
}
