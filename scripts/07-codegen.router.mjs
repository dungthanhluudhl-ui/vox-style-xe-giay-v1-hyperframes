// Sinh code Remotion theo shotlist đã chốt. Mô hình generator -> verify (local) -> reviewer
// -> auto-retry. Claude không viết code, chỉ điều phối + đọc báo cáo cuối cùng.
// Generator CHỈ BAO GIỜ output file scene (src/videos/<slug>/scenes/SceneNN.tsx) — không bao giờ
// viết Root.tsx (việc đó do scripts/lib/sync-root-lib.mjs làm tất định, không AI, gọi tự động
// bên dưới sau mỗi scene trừ khi --no-root-sync).
// Usage: node scripts/07-codegen.router.mjs --video=<slug> --scenes=S01[,S02,...]  (hoặc --scenes=all)
//        node scripts/07-codegen.router.mjs --video=<slug> --scenes=S01 --issue-file=path/to/bug.txt  (sửa lỗi cụ thể trên code hiện có, không sinh lại từ đầu)
//        node scripts/07-codegen.router.mjs --video=<slug> --scenes=S06 --no-root-sync  (CHẠY SONG SONG NHIỀU
//          SCENE CỦA CÙNG 1 VIDEO: mỗi tiến trình chỉ sinh + verify(tsc/eslint, KHÔNG render) đúng 1 file scene
//          của mình, KHÔNG tự ráp Root.tsx — tránh race condition khi nhiều tiến trình ghi cùng lúc. Sau khi
//          TẤT CẢ tiến trình song song xong, chạy `node scripts/08-sync-root.mjs --video=<slug>` một lần
//          (tuần tự, không AI) để ráp Root.tsx, rồi tự render-smoke-test tổng cho các scene mới nếu cần.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { callModel, extractText, loadModelRouting, appendRunLog } from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { syncRoot } from "./lib/sync-root-lib.mjs";

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
function tryRead(p) {
  const full = path.join(root, p);
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
}
function tryReadAbs(full) {
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null;
}
function listDir(p) {
  const full = path.join(root, p);
  return fs.existsSync(full) ? fs.readdirSync(full).filter((f) => /\.(tsx?|css)$/.test(f)) : [];
}
function listDirAbs(full) {
  return fs.existsSync(full) ? fs.readdirSync(full).filter((f) => /\.(tsx?|css)$/.test(f)) : [];
}

const argScenes = (process.argv.find((a) => a.startsWith("--scenes=")) || "--scenes=S01").split("=")[1];
const allScenes = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
const allShots = JSON.parse(fs.readFileSync(vp.shotlistJson, "utf8"));
const sceneIds = argScenes === "all" ? allScenes.map((s) => s.id) : argScenes.split(",");

const scenes = allScenes.filter((s) => sceneIds.includes(s.id));
const shots = allShots.filter((s) => sceneIds.includes(s.sceneId));
const frameRange = {
  start: Math.min(...shots.map((s) => s.startFrame)),
  end: Math.max(...shots.map((s) => s.endFrame)) - 1,
};
const mediaManifest = JSON.parse(fs.readFileSync(vp.manifestJson, "utf8"));
const mediaById = Object.fromEntries(mediaManifest.map((m) => [m.id, m]));
const usedMedia = [...new Set(shots.map((s) => s.assetId).filter(Boolean))].map((id) => mediaById[id]);
const noRootSync = process.argv.includes("--no-root-sync");

const skillFiles = [
  ".agents/skills/remotion-best-practices/SKILL.md",
  ".agents/skills/remotion-markup/SKILL.md",
  ".agents/skills/remotion-markup/multi-scene-video.md",
  ".agents/skills/remotion-markup/sequencing.md",
  ".agents/skills/remotion-markup/embedding-videos.md",
  ".agents/skills/remotion-markup/cropping.md",
  ".agents/skills/remotion-markup/images.md",
  ".agents/skills/remotion-markup/transitions.md",
  ".agents/skills/remotion-markup/text-highlights.md",
  ".agents/skills/remotion-markup/timing.md",
  ".agents/skills/remotion-markup/google-fonts.md",
  ".agents/skills/remotion-captions/SKILL.md",
  ".agents/skills/remotion-captions/display-captions.md",
  ".agents/skills/remotion-create/video-layout.md",
];
const skillDocs = skillFiles.map((f) => `### ${f}\n\n${read(f)}`).join("\n\n---\n\n");
const styleTokens = read("planning/style-dna/style-tokens.json");
const styleDnaCore = read("planning/style-dna/STYLE_DNA.md");

const KNOWN_GOTCHAS = `LỖI THƯỜNG GẶP — TRÁNH NGAY TỪ ĐẦU (đã rút ra từ các lần chạy trước, đây là eslint config @remotion/eslint-config-flat thực tế của dự án, không có trong skill docs chung):
- Sequence: KHÔNG truyền prop from={0} (0 đã là mặc định, eslint báo lỗi @remotion/from-0 nếu truyền tường minh) — chỉ truyền from khi khác 0.
- <Video>/<Audio> từ "@remotion/media": prop volume PHẢI là callback dạng (f) => interpolate(...), không được là số tĩnh (eslint @remotion/volume-callback).
- <Video> từ "@remotion/media": objectFit PHẢI truyền trực tiếp như prop objectFit="cover", KHÔNG đặt trong style={{objectFit: ...}} (eslint @remotion/no-object-fit-on-media-video).
- Sequence không có prop premountFor trong bản này — không dùng prop này trừ khi thấy nó xuất hiện rõ trong skill docs bên trên.
- interpolate() với outputRange là CHUỖI (string) chỉ hỗ trợ chuỗi có 1-3 thành phần cách nhau bởi khoảng trắng (dùng cho transform/translate như "10px 20px"). TUYỆT ĐỐI KHÔNG dùng interpolate() outputRange chuỗi cho boxShadow hoặc bất kỳ CSS value nào có ≥4 phần cách nhau bởi space (vd "10px 10px 0 rgba(...)" có 4 phần → lỗi "String outputRange values must contain 1 to 3 components"). Với boxShadow/filter/các giá trị nhiều thành phần: tách riêng từng phần số cần animate thành các interpolate() SỐ HỌC riêng biệt (outputRange là number), rồi tự ghép chuỗi CSS bằng template string, vd: const s = interpolate(frame,[0,12],[0,18]); const o = interpolate(frame,[0,12],[0,1]); style={{boxShadow: \`\${s}px \${s}px 0 rgba(255,106,26,\${o})\`}}.
- Định nghĩa type/union trong theme.ts (vd kiểu camera motion, kiểu transition) phải dùng ĐÚNG NHẤT QUÁN ở mọi file khác — không định nghĩa union hẹp rồi so sánh với giá trị ngoài union đó ở file khác.
- <Composition>/<Sequence> không có prop "id" tuỳ tiện trên component tự viết trừ khi bạn tự định nghĩa prop đó trong interface của chính component đó.
- FONT "Be Vietnam Pro" BẮT BUỘC load qua @remotion/google-fonts (import {loadFont} from "@remotion/google-fonts/BeVietnamPro"; const {fontFamily} = loadFont(...)) rồi dùng fontFamily đó ở mọi nơi cần font này. TUYỆT ĐỐI KHÔNG chỉ khai báo fontFamily: '"Be Vietnam Pro", sans-serif' dạng chuỗi CSS suông — môi trường render (headless Chrome) không có sẵn font này cài hệ thống, dẫn tới vỡ dấu tiếng Việt và chữ dính nhau do fallback sai font. theme.ts nên export ra fontFamily đã load được từ loadFont(), không chỉ export tên chuỗi font.
- Caption/token text ghép nhiều span liền nhau (mỗi từ 1 span) PHẢI có khoảng trắng giữa các từ — nếu dữ liệu caption không có sẵn dấu cách ở đầu mỗi từ, phải tự thêm khoảng cách khi render (vd thêm {" "} giữa các span, hoặc dùng CSS gap trên flex container chứa các span) để không bị dính chữ.
- BẮT BUỘC: AbsoluteFill NGOÀI CÙNG của MỖI scene phải có isolation: "isolate" trong style. Lý do: các phần tử con nằm sâu bên trong scene thường dùng zIndex (để xếp lớp overlay/media/hiệu ứng trong scene đó). Nếu scene không tự cô lập stacking context bằng isolation: "isolate", các zIndex nội bộ đó sẽ so sánh trực tiếp với component Captions ở cấp Root (Captions không có zIndex riêng, coi như 0) THAY VÌ chỉ so sánh trong nội bộ scene — hậu quả là phụ đề bị các lớp overlay trong scene đè lên, mờ hoặc mất hẳn dù Captions đã mount sau cùng ở Root.tsx. Đây là lỗi thật đã xảy ra ở nhiều scene, luôn phải thêm isolation: "isolate" ngay từ đầu, không phải thứ có thể bỏ qua.
- Một số TÊN FILE ảnh có chữ "cutout" (vd img-08-extortion-money-demand-cutout.jpeg) — đó chỉ là mô tả phong cách minh hoạ đã có sẵn trong chính ảnh AI tạo ra, KHÔNG phải chỉ định phải code thêm xử lý cutout. Dùng ảnh này y như file ảnh thường (nền toàn khung, giữ nguyên màu), không cần và không được thêm filter grayscale/tách nền/đổ bóng trong code.`;

function buildPrompt(feedback, previousFiles) {
  // Archive Remotion (Giai đoạn F, 2026-09-21): src/ di dời sang archive/remotion-legacy/src/.
  const existingTheme = tryRead("archive/remotion-legacy/src/styles/theme.ts");
  const componentFiles = listDir("archive/remotion-legacy/src/components");
  const sceneFiles = listDirAbs(vp.scenesDir);
  const isFoundation = !existingTheme;

  const existingFilesBlock = [
    existingTheme ? `### src/styles/theme.ts\n\`\`\`ts\n${existingTheme}\n\`\`\`` : null,
    ...componentFiles.map((f) => `### src/components/${f}\n\`\`\`tsx\n${tryRead(`archive/remotion-legacy/src/components/${f}`)}\n\`\`\``),
    ...sceneFiles.map(
      (f) => `### src/videos/${slug}/scenes/${f}\n\`\`\`tsx\n${tryReadAbs(path.join(vp.scenesDir, f))}\n\`\`\``,
    ),
  ]
    .filter(Boolean)
    .join("\n\n");

  const retryFilesBlock = previousFiles
    ? Object.entries(previousFiles)
        .map(([p, c]) => `### ${p}\n\`\`\`\n${c}\n\`\`\``)
        .join("\n\n")
    : null;

  const systemPrompt = `Bạn là kỹ sư Remotion (TypeScript + React). Dự án dùng Remotion 4.0.526 — API đã đổi khác nhiều so với bản cũ, PHẢI theo đúng skill docs bên dưới, không dùng kiến thức Remotion cũ/mặc định (vd Video/Audio giờ import từ "@remotion/media", không phải "remotion").

SKILL DOCS (bắt buộc tuân theo):
${skillDocs}

STYLE DNA (STYLE_DNA.md — quy tắc hình ảnh/màu/font/caption/pacing bắt buộc):
${styleDnaCore}

STYLE TOKENS (số liệu chính xác):
${styleTokens}

${KNOWN_GOTCHAS}

DỰ ÁN HIỆN TẠI:
- Remotion project blank scaffold, TypeScript, đã cài @remotion/captions, @remotion/media, @remotion/install-whisper-cpp.
- ${isFoundation ? "CHƯA có theme.ts hay component dùng chung nào — đây là lần generate ĐẦU TIÊN cho toàn repo (không riêng video này), bạn phải thiết lập nền tảng dùng chung (theme, component dùng chung) TRƯỚC KHI viết scene đầu tiên." : "ĐÃ có nền tảng dùng chung (theme.ts + component) — dưới đây là TOÀN BỘ file hiện có. BÁM SÁT đúng convention/tên/kiểu dữ liệu đã có, tái sử dụng component đã có, KHÔNG đổi tên file/interface đã tồn tại trừ khi thực sự cần bổ sung."}
${existingFilesBlock ? `\nFILE HIỆN CÓ TRONG DỰ ÁN:\n\n${existingFilesBlock}\n` : ""}

YÊU CẦU CẤU TRÚC FILE:
- ${isFoundation ? "Tạo 'src/styles/theme.ts' xuất ra các hằng số/type từ style tokens (màu, font, canvas, safeZone, caption, pacing) để mọi scene dùng chung." : "KHÔNG tạo lại theme.ts trừ khi thiếu field cần dùng — khi đó CHỈ bổ sung field mới vào file đã có, giữ nguyên toàn bộ field cũ, in lại đầy đủ nội dung file."}
- ${isFoundation ? "Tạo các component dùng chung trong 'src/components/': ít nhất một component ráp media (ảnh/video nền toàn khung, hỗ trợ crop/Ken-Burns pan-zoom, hỗ trợ trim cho video), một component hiển thị overlay nhẹ (label tối đa 4 từ/punch-phrase/icon đơn giản), và helper cho các kiểu chuyển cảnh (animation-variants) thực sự dùng trong shot list bên dưới." : "Tái sử dụng NGUYÊN VẸN component đã có trong 'src/components/' (xem file hiện có ở trên) nếu phù hợp; chỉ tạo file component mới khi thực sự cần biến thể chưa có, và không sửa lại các component đã có trừ khi chúng đang lỗi."}
- Mỗi scene trong danh sách yêu cầu → 1 file 'src/videos/${slug}/scenes/SceneNN.tsx' (NN = số thứ tự, 2 chữ số), export 1 component tên "SceneNN" (đúng khớp tên file) tự dùng useCurrentFrame() nội bộ theo frame TUYỆT ĐỐI của Sequence cha (không cần nhận prop startFrame).
- Asset ảnh/video dùng đường dẫn staticFile("videos/${slug}/media/images/<file>") hoặc staticFile("videos/${slug}/media/videos/<file>") đúng theo đường dẫn trong media manifest bên dưới (bỏ tiền tố "public/" khỏi trường "file" của manifest, giữ nguyên phần còn lại).
- TUYỆT ĐỐI KHÔNG được xuất file 'src/Root.tsx' và KHÔNG đụng vào caption/audio/Composition — một bước riêng (tất định, không AI) tự ráp Root.tsx từ scene-plan + các file scene đã sinh, luôn luôn, không phải việc của bạn ở đây, kể cả khi đây là scene đầu tiên của video.
- TUYỆT ĐỐI KHÔNG sửa 'src/styles/theme.ts' hay bất kỳ component nào trong 'src/components/' TRỪ KHI thực sự thiếu 1 field/type cần dùng (khi đó CHỈ bổ sung, không xoá/đổi field cũ, in lại đầy đủ nội dung file) — vì đây là 2 nơi DÙNG CHUNG cho MỌI video trong repo, không riêng video này. Nếu chỉ cần 1 type/biến thể hẹp riêng cho scene này, ưu tiên khai báo type nội bộ ngay trong file scene thay vì mở rộng file dùng chung.
- Output CHỈ gồm đúng (các) file 'src/videos/${slug}/scenes/SceneNN.tsx' của scene đang yêu cầu, cộng theme.ts/component dùng chung NẾU thực sự cần tạo/mở rộng theo quy tắc trên.

${
  feedback
    ? `\nLẦN THỬ TRƯỚC BỊ LỖI. Đây là TOÀN BỘ code lần thử trước:\n\n${retryFilesBlock}\n\nLỖI CẦN SỬA (sửa đúng các lỗi này trong chính các file trên, GIỮ NGUYÊN kiến trúc/tên file/tên component đã dùng, chỉ sửa phần bị lỗi, in lại đầy đủ nội dung từng file đã sửa):\n${feedback}\n`
    : ""
}

ĐỊNH DẠNG OUTPUT — KHÔNG dùng JSON, dùng định dạng sau cho MỖI file cần tạo/cập nhật (in lại TOÀN BỘ nội dung file, không phải diff, không markdown fence bên trong):

### FILE: đường/dẫn/tương/đối.tsx
<toàn bộ nội dung file>
### FILE: đường/dẫn/khác.ts
<nội dung>
### END

Không viết gì khác ngoài các khối ### FILE ... ### END này.`;

  const userPrompt = `SCENE PLAN (các scene cần code lần này):
${JSON.stringify(scenes, null, 2)}

SHOTLIST (chi tiết từng shot, đã có startFrame/endFrame/durationInFrames tính sẵn theo fps=30):
${JSON.stringify(shots, null, 2)}

MEDIA MANIFEST (asset dùng trong các shot trên):
${JSON.stringify(usedMedia, null, 2)}

Hãy sinh code theo đúng yêu cầu ở trên cho các scene: ${sceneIds.join(", ")}.`;

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
  console.log(`Gọi ${GEN_MODEL} để sinh code cho scene: ${sceneIds.join(", ")}${feedback ? " (retry)" : ""}...`);
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

// Ghi lại MỌI lần thử fail (verify hoặc review), kể cả các lần thử tự PASS ở lượt sau — trước
// đây các lỗi này chỉ console.log, không lưu lại đâu, nên không có dữ liệu để phát hiện lỗi lặp
// lại qua nhiều scene/video. File dùng CHUNG cho mọi video (không phải per-video như run-log.md)
// để audit định kỳ có thể tìm pattern lặp lại xuyên video, rồi mới đưa tay vào KNOWN_GOTCHAS.
function categorizeVerifyError(err) {
  if (err.startsWith("### tsc")) return "verify-tsc";
  if (err.startsWith("### eslint")) return "verify-eslint";
  if (err.startsWith("### render smoke-test")) return "verify-render";
  if (err.startsWith("### sync-root")) return "verify-syncroot";
  return "verify-other";
}
function appendCodegenIssue(entries) {
  const logPath = path.join(root, "pipeline", "codegen-issues.jsonl");
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const ts = new Date().toISOString();
  const lines = entries.map((e) =>
    JSON.stringify({ ts, video: slug, scene: sceneIds.join(","), attempt, ...e }),
  );
  fs.appendFileSync(logPath, lines.join("\n") + "\n", "utf8");
}

function writeFiles(files) {
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, content, "utf8");
    console.log(`  wrote ${rel} (${content.length} chars)`);
  }
}

function verify(fileRelPaths) {
  const errors = [];
  // Bug thật phát hiện khi chạy song song concurrency=3 lần đầu ở quy mô 16 scene (video
  // "tham-hoa-itaewon-phan-2"): `eslint src --fix`/`tsc --noEmit` không scope trước đây quét
  // TOÀN BỘ src/ — khi nhiều tiến trình `--no-root-sync` chạy đồng thời, verify() của scene A
  // có thể bắt (và `--fix` còn có thể GHI ĐÈ) file của scene B đang giữa chừng sinh dở, gây lỗi
  // verify sai chủ (vd S01 bị báo lỗi thật ra nằm trong Scene03.tsx của tiến trình khác — xác
  // nhận bằng cách chạy lại tsc sau khi mọi tiến trình đã ổn định, không còn lỗi nào). Fix:
  // scope eslint thẳng vào đúng (các) file mà LẦN GỌI NÀY vừa ghi (loại bỏ hoàn toàn race ghi);
  // tsc vẫn phải chạy toàn `src/` (để giữ đúng tsconfig/path alias) nhưng LỌC output, chỉ giữ
  // dòng lỗi thuộc chính (các) file này — lỗi ở file khác là trách nhiệm của verify() thuộc
  // đúng tiến trình sinh ra file đó.
  const targets = fileRelPaths.map((p) => `"${p}"`).join(" ");
  try {
    execSync(`npx eslint ${targets} --fix`, { cwd: root, stdio: "pipe" });
  } catch {
    // ignore — sẽ bắt lỗi còn lại ở lượt check bên dưới
  }
  try {
    execSync("npx tsc --noEmit", { cwd: root, stdio: "pipe" });
  } catch (e) {
    const fullOutput = e.stdout?.toString() || "";
    const relevantLines = fullOutput
      .split("\n")
      .filter((line) => fileRelPaths.some((p) => line.includes(p)));
    if (relevantLines.length > 0) {
      errors.push("### tsc --noEmit\n" + relevantLines.join("\n").slice(0, 4000));
    }
  }
  try {
    execSync(`npx eslint ${targets}`, { cwd: root, stdio: "pipe" });
  } catch (e) {
    errors.push("### eslint\n" + (e.stdout?.toString().slice(0, 4000) || e.message));
  }

  // Ráp lại Root.tsx (tất định, không AI) rồi render smoke-test đúng dải frame của scene đang xử
  // lý, để bắt lỗi RUNTIME (vd interpolate() dùng sai outputRange) mà tsc/eslint không phát hiện
  // được. Bỏ qua cả hai ở chế độ song song vì nhiều tiến trình ghi Root.tsx cùng lúc sẽ race
  // (ráp tổng 1 lần ở scripts/08 sau khi tất cả tiến trình xong).
  if (errors.length === 0 && !noRootSync) {
    try {
      syncRoot(slug, root);
    } catch (e) {
      errors.push("### sync-root\n" + (e.message || String(e)));
      return errors;
    }
    const tmpOut = path.join(root, "pipeline", ".cache", "smoke-test.mp4");
    try {
      execSync(
        `npx remotion render ${vp.compositionId} "${tmpOut}" --frames=${frameRange.start}-${frameRange.end} --log=error`,
        { cwd: root, stdio: "pipe", timeout: 180000 },
      );
    } catch (e) {
      errors.push(
        `### render smoke-test (frame ${frameRange.start}-${frameRange.end})\n` +
          (e.stdout?.toString().slice(0, 3000) || e.stderr?.toString().slice(0, 3000) || e.message),
      );
    }
  }

  return errors;
}

async function review(files) {
  const systemPrompt = `Bạn review code Remotion vừa sinh ra, đối chiếu với shotlist và style DNA. Trả lời NGẮN GỌN theo format:
VERDICT: PASS hoặc FAIL
ISSUES:
- (liệt kê vấn đề cụ thể nếu FAIL, để trống nếu PASS)

QUAN TRỌNG: đây là Remotion 4.0.526, API khác bản cũ — CHỈ được chấm một cách dùng API là sai nếu nó mâu thuẫn với SKILL DOCS bên dưới (là tài liệu chính thức của đúng version này). KHÔNG dựa vào kiến thức Remotion cũ/mặc định của bạn để bác một pattern nếu skill docs bên dưới có ví dụ dùng chính pattern đó (vd interpolate() với output "perceptual-scale", hoặc translate nhận chuỗi "0px -92px" đều là ví dụ CÓ THẬT trong skill docs, không phải lỗi).

SKILL DOCS (nguồn xác thực duy nhất cho việc đúng/sai API):
${skillDocs}

${KNOWN_GOTCHAS}

LƯU Ý VỀ TÊN FILE ASSET: một số file ảnh có chữ "cutout" trong TÊN FILE (vd img-08-extortion-money-demand-cutout.jpeg) — đó chỉ là mô tả phong cách minh hoạ do ảnh AI tạo sẵn đã có (ảnh trông giống cắt dán giấy), KHÔNG phải chỉ định phải áp dụng xử lý cutout (grayscale+bóng cam) trong code. Theo quyết định dự án, ảnh luôn dùng làm nền toàn khung, giữ nguyên màu — chỉ bị coi là lỗi nếu CODE chủ động áp filter grayscale/tách nền/thêm bóng, không phải vì tên file chứa chữ "cutout".

Kiểm tra: đúng API theo skill docs trên, đúng đường dẫn asset theo media manifest, đúng frame timing theo shotlist, đúng style DNA (màu/font/caption), không có code rõ ràng sai cú pháp. Ưu tiên PASS nếu ý chính của shotlist đã được thể hiện đúng tinh thần — đừng FAIL vì tiểu tiết chuyển động không khớp 100% mô tả câu chữ trong shotlist, miễn không sai API/sai style DNA cốt lõi (màu, không cutout-processing, caption).`;
  const filesText = Object.entries(files)
    .map(([p, c]) => `### ${p}\n\`\`\`tsx\n${c}\n\`\`\``)
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
let previousFiles = null;
let finalFiles = null;
let finalVerdict = null;

while (attempt < MAX_ATTEMPTS) {
  attempt++;
  console.log(`\n=== Attempt ${attempt}/${MAX_ATTEMPTS} ===`);
  try {
    const files = await generate(feedback, previousFiles);
    writeFiles(files);
    previousFiles = files;

    const verifyErrors = verify(Object.keys(files));
    if (verifyErrors.length > 0) {
      console.log("Verify FAILED:\n" + verifyErrors.join("\n\n"));
      appendCodegenIssue(
        verifyErrors.map((err) => ({ stage: categorizeVerifyError(err), detail: err.slice(0, 2000) })),
      );
      feedback = verifyErrors.join("\n\n");
      continue;
    }
    console.log("Verify (tsc + eslint) PASS.");

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
    // Lỗi mạng/timeout gọi 9router không nên làm crash cả vòng lặp — coi như 1 lần thử
    // thất bại, giữ nguyên feedback hiện tại (nếu có) và thử lại.
    console.log(`Lỗi khi gọi 9router (sẽ thử lại): ${e.message || e}`);
  }
}

const summary =
  finalVerdict && /VERDICT:\s*PASS/i.test(finalVerdict)
    ? `Codegen scenes [${sceneIds.join(",")}] PASS sau ${attempt} lần thử bằng ${GEN_MODEL} (review: ${REVIEW_MODEL}). Files: ${finalFiles ? Object.keys(finalFiles).join(", ") : "?"}`
    : `Codegen scenes [${sceneIds.join(",")}] KHÔNG đạt sau ${attempt} lần thử — cần Claude can thiệp. Verdict cuối:\n${finalVerdict ?? "(chưa qua được verify)"}`;

console.log("\n" + summary);
appendRunLog(`\`scripts/07-codegen.router.mjs --video=${slug} --scenes=${sceneIds.join(",")}\` — ${summary}`, vp.runLog);

if (!(finalVerdict && /VERDICT:\s*PASS/i.test(finalVerdict))) {
  process.exit(1);
}
