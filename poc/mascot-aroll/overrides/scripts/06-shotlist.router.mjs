// Lập Shotlist: chia mỗi scene (planning/scene-plan.json) thành shot chi tiết (frame in/out,
// cách xử lý từng asset, overlay/label theo đúng cue lời thoại). Do 9router đảm nhiệm,
// Claude chỉ đọc kết quả markdown ngắn gọn sau khi xong.
// Usage: node scripts/06-shotlist.router.mjs --video=<slug>
//        node scripts/06-shotlist.router.mjs --video=<slug> --scenes=S05,S06,S07   (chỉ sinh lại shot cho các scene này, merge vào shotlist.json hiện có)
import fs from "node:fs";
import path from "node:path";
import { callModel, extractText, extractJson, loadModelRouting, appendRunLog } from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
// [POC mascot-aroll / ADN v2] chữ A-roll (thay mascot) + kiểm tra tất định v2
import { fitForAsset } from "./lib/media-layout.mjs";
import { chooseTreatment } from "./lib/key-text.mjs";
import { planKeyText } from "./lib/key-text-plan.mjs";
import { finalizeAssetShots } from "./lib/asset-scene.mjs";
import { validatePlanAndShots, softShotWarnings } from "./lib/v2-checks.mjs";

const root = process.cwd();
const routing = loadModelRouting();
const model = routing.reasoning_planning;
const FPS = 30;

const slug = getVideoSlug();
const vp = videoPaths(slug);

function read(p) {
  return fs.readFileSync(path.join(root, p), "utf8");
}
function tryReadAbs(fullPath) {
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : null;
}
const msToFrame = (ms) => Math.round((ms / 1000) * FPS);

const scenesArg = process.argv.find((a) => a.startsWith("--scenes="));
const filterSceneIds = scenesArg ? scenesArg.split("=")[1].split(",") : null;

const allScenesInPlan = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
const scenes = filterSceneIds ? allScenesInPlan.filter((s) => filterSceneIds.includes(s.id)) : allScenesInPlan;
const mediaManifest = JSON.parse(fs.readFileSync(vp.manifestJson, "utf8"));
const captions = JSON.parse(fs.readFileSync(vp.captionsFile, "utf8"));

const existingShotlistRaw = tryReadAbs(vp.shotlistJson);
const existingShotlist = existingShotlistRaw ? JSON.parse(existingShotlistRaw) : [];
const currentSceneIds = new Set(allScenesInPlan.map((s) => s.id));
const keptShots = filterSceneIds
  ? existingShotlist.filter((s) => !filterSceneIds.includes(s.sceneId) && currentSceneIds.has(s.sceneId))
  : [];

const styleDnaFiles = [
  "planning/style-dna/STYLE_DNA.md",
  "planning/style-dna/references/animation-variants.md",
  "planning/style-dna/references/quality-bars.md",
];
const styleDna = styleDnaFiles.map((f) => `### ${f}\n\n${read(f)}`).join("\n\n---\n\n");
const styleTokens = read("planning/style-dna/style-tokens.json");

const mediaById = Object.fromEntries(mediaManifest.map((m) => [m.id, m]));
// Chỉ có khi manifest có ảnh trích dẫn bản án PDF (source:"pdf") — video cũ không đổi prompt.
const PDF_SHOT_RULES = mediaManifest.some((m) => m.source === "pdf")
  ? `
ASSET TRÍCH DẪN BẢN ÁN (source="pdf", id doc-NN): là ảnh CHỤP NGUYÊN VĂN một đoạn bản án (dải chữ ngang, đã tô cam sẵn đoạn quan trọng ngay trong ảnh). assetTreatment cho shot dùng doc-NN CHỈ được là: "hiện dạng thẻ tài liệu canh giữa khung, giữ nguyên tỉ lệ, KHÔNG crop/cover toàn khung", chuyển động rất nhẹ (static hoặc zoom-in ≤5%), tuyệt đối KHÔNG làm mờ/giảm độ sáng/che chữ trong ảnh (chữ phải đọc được suốt shot) và KHÔNG vẽ thêm highlight/khung lên ảnh (đã có sẵn). Shot dùng doc-NN phải kéo dài đủ để đọc (≥3s nếu có thể). Overlay (label tối đa 4 từ, vd "BẢN ÁN PHÚC THẨM") chỉ đặt NGOÀI vùng ảnh; KHÔNG được chép/viết lại nội dung chữ trong bản án vào overlay trừ khi đúng nguyên văn description của doc-NN.
`
  : "";

const FIT_LINES = mediaManifest
  .map((m) => ({ m, f: fitForAsset(m) }))
  .filter((x) => x.f.fit === "contain")
  .map((x) => `- ${x.m.id} (${x.m.width}x${x.m.height}): CONTAIN — hộp ${x.f.box.w}x${x.f.box.h} tại (${x.f.box.x},${x.f.box.y}); ${x.f.reason}`);
const FIT_RULES = FIT_LINES.length
  ? `
[ADN v2] CÁCH ĐẶT MEDIA (tất định theo kích thước thật — KHÔNG phải lựa chọn của bạn): asset sau đây sẽ được đặt GỌN trong dải an toàn y160–1390 trên NỀN nhìn thấy, giữ nguyên tỉ lệ, KHÔNG crop phủ kín khung (nếu phủ kín sẽ phóng/cắt mất phần lớn hình):
${FIT_LINES.join("\n")}
Camera của MỌI shot asset do SCRIPT gán tất định theo độ phân giải thật (ngân sách zoom) — bạn chỉ gợi ý cameraMotion; không ghi lệnh xử lý nền/crop/zoom cắt vào hình. Mọi asset còn lại là cover toàn khung.
`
  : "";

const systemPrompt = `Bạn là Motion Implementer cho video "Vox-style" (xem style DNA bên dưới — quy tắc BẮT BUỘC).

STYLE DNA:
${styleDna}

STYLE TOKENS:
${styleTokens}

NHIỆM VỤ: nhận Scene Plan đã chốt (mỗi scene đã có assetIds gán sẵn — ĐÂY LÀ QUYẾT ĐỊNH ĐÃ CHỐT, không được đổi asset hay bỏ asset đã gán). Chia mỗi scene thành các SHOT chi tiết — 1 shot = 1 đơn vị dựng trong Remotion (thường là 1 <Sequence>).

VỚI MỖI SHOT PHẢI XÁC ĐỊNH:
- Thời gian chính xác (startMs/endMs, khớp trong khoảng thời gian của scene chứa nó, tổng các shot phải khớp đúng toàn bộ khoảng thời gian scene, không có khoảng trống/chồng lấn).
- assetId dùng cho shot này (nếu scene có nhiều asset, chia mỗi asset thành 1 shot riêng theo trình tự đã ghi trong "notes" của scene plan). Nếu asset là video (durationSec có trong manifest) và thời lượng shot NGẮN HƠN video gốc, chỉ định rõ đoạn trim (trimStartSec/trimEndSec trong video gốc) — ưu tiên đoạn có hành động rõ nhất (thường là giữa clip). Nếu shot DÀI HƠN video gốc 8s, chỉ định cách xử lý (giữ khung cuối/loop nhẹ/chuyển sang ảnh tĩnh từ frame cuối) — "giữ khung cuối" là mặc định rẻ nhất: HyperFrames tự giữ frame cuối khi video được đặt dài trọn shot (đã đo 2026-09-26), không cần kỹ thuật riêng.
- assetTreatment: cách xử lý hình ảnh cụ thể (Ken Burns zoom chậm hướng nào, giữ tĩnh, crop theo tỷ lệ dọc 9:16 nếu asset gốc không đúng tỷ lệ, v.v.) — ĐÂY LÀ NHIỆM VỤ CHO CODE REMOTION (A-roll/B-roll compositing), không phải dựng lại nội dung ảnh. Với asset là ẢNH: CHỈ mô tả chuyển động/crop/khung hình/vị trí — TUYỆT ĐỐI KHÔNG ghi lệnh xử lý màu (grayscale/đen trắng, bóng cam, cutout/tách nền, filter, đổ bóng): quyết định dự án là ảnh dùng NGUYÊN MÀU như file gốc; quy tắc "người grayscale + bóng cam" trong Style DNA mô tả phong cách lúc TẠO ảnh (Stage 2b), không phải việc của code dựng. Ghi lệnh xử lý màu ở đây từng làm Stage 7 lật qua lật lại (reviewer đòi grayscale rồi lại cấm filter). Nguồn: STYLE_DNA.md §2 "Ngoại lệ chính thức".
- [ADN v2] overlays: cảnh asset (kind="asset", kể cả khi cảnh có chữ A-roll do script thêm): LUÔN overlays = [] (không chữ/nhãn/icon/diagram/mũi tên trên hình — chỉ có media + phụ đề). Cảnh đồ hoạ (kind="graphics", không asset): tối đa 1 punch-phrase + 2 nhãn/thẻ (label ≤4 từ không lặp lời thoại), chữ/thẻ thẳng hàng KHÔNG xoay/nghiêng (riêng BỘ PHẬN VẼ THUẦN không chứa chữ như kim đồng hồ/mũi tên/máy bay trong sơ đồ được xoay nếu ý nghĩa shot cần), mỗi overlay có atMs (khớp cụm từ trong transcript) và holdMs (≥1.5s; punch-phrase ≥1.6s). CẢNH ĐỒ HOẠ PHẢI TỰ NHẤT QUÁN & THỰC HIỆN ĐƯỢC: tổng chữ của cả cảnh (mọi shot) ≤3 khối (đếm cả chữ số/tên từng bước) nên KHÔNG mô tả sơ đồ cần chữ/số riêng cho từng nút; bước/mục nào assetTreatment hoặc notes nhắc tới mà cần được gọi tên thì tên PHẢI nằm trong chữ của overlays (gộp dạng "A • B • C" vào 1 nhãn khi >3 mục), không để mục nào được yêu cầu mà không có chỗ nào trong overlays; các nút/bước không cần chữ thì mô tả là hình học/biểu tượng KHÔNG chữ.
- [ADN v2] cameraMotion (cảnh asset): MỘT chuyển động liền mạch suốt cả shot, từ vựng v1: drift-in (zoom-in chậm), drift-out, pan-left, pan-right, pan-up, pan-down, diag-dr, diag-ul — chọn kiểu KHÁC shot/cảnh liền trước. Sự kiện thị giác của cảnh asset = ĐỔI ASSET bám cue lời thoại; mỗi asset đúng 1 shot liền mạch trong scene, TUYỆT ĐỐI KHÔNG tách 1 asset thành nhiều shot re-crop/zoom (script sẽ gộp) và KHÔNG ghi crop-reframe/split/reveal/punch. shot ~4–8s. KHÔNG xoay (rotate/skew).
- transitionIn: cảnh asset chỉ "cut" hoặc "crossfade" (0,25s, script tự xen kẽ nếu bạn không chỉ định); cảnh đồ hoạ: 1 trong bộ KHÔNG XOAY (rise/grow/punch/shatter/unfold/zoom-through/strike) hoặc cut/dissolve, mặc định theo entranceAnimation của scene cho shot đầu tiên.

[ADN v2, vòng 5] CHỮ A-ROLL: cảnh asset có "keyText" trong plan sẽ có chữ nhấn mạnh hiện ĐÚNG LÚC narration nói cụm neo. Thời điểm, hình thức, cách asset phản ứng (mờ đi/thu nhỏ nhẹ) do SCRIPT tính TẤT ĐỊNH từ mốc từng từ — bạn KHÔNG ghi gì về chữ và KHÔNG thêm trường nào cho nó; mọi shot asset vẫn overlays=[]. Chỉ cần chia shot như bình thường (đừng để ranh giới shot cắt ngang ~4–6s ngay sau cụm neo của cảnh có keyText: cửa sổ chữ phải nằm trọn trong một shot).

${PDF_SHOT_RULES}${FIT_RULES}
TRANSCRIPT VỚI TIMESTAMP CẤP TỪ (dùng để canh overlay đúng cue lời thoại):
${JSON.stringify(captions)}

MEDIA MANIFEST ĐẦY ĐỦ (tra cứu durationSec/width/height khi cần quyết định trim/crop):
${JSON.stringify(mediaManifest, null, 2)}

Trả về DUY NHẤT JSON object:
{
  "shots": [
    {
      "id": "S01-1",
      "sceneId": "S01",
      "startMs": 0,
      "endMs": 3900,
      "assetId": "img-08",
      "trimStartSec": null,
      "trimEndSec": null,
      "assetTreatment": "mô tả ngắn (chuyển động/crop/khung, KHÔNG xử lý màu)",
      "cameraMotion": "push-in",
      "overlays": [],
      "transitionIn": "zoom-through",
      "notes": "..."
    }
  ]
}
Không viết giải thích/suy luận nào ngoài JSON object này.`;

const userPrompt = `SCENE PLAN ĐÃ CHỐT (không đổi asset đã gán):
${JSON.stringify(scenes, null, 2)}

Hãy lập Shotlist đầy đủ cho ${filterSceneIds ? `các scene: ${filterSceneIds.join(", ")}` : `tất cả ${scenes.length} scene`} theo đúng schema đã yêu cầu.`;

console.log(`Gọi ${model} để lập shotlist cho ${scenes.length} scene...`);

// [ADN v2] Chuẩn hoá TẤT ĐỊNH theo kind của scene (không tin model ở các field có thể làm sai contract), rồi
// kiểm tra v2; lỗi → gọi lại 1 lần kèm lỗi.
const sceneById = Object.fromEntries(allScenesInPlan.map((s) => [s.id, s]));
// [vòng 4] Khớp shot vào ranh giới scene TẤT ĐỊNH (scene đã nối liền mạch ở Stage 5; shot cũ/model có thể lệch vài trăm ms): shot đầu bắt đầu đúng đầu scene,
// mỗi shot kết thúc đúng lúc shot sau bắt đầu, shot cuối kết thúc đúng cuối scene. Chỉ vá lệch ≤1500ms (lệch lớn hơn là lỗi thật → để validate báo).
const fitLog = [];
function fitShotsToScenes(newShots) {
  const by = {};
  for (const s of newShots) (by[s.sceneId] ??= []).push(s);
  for (const [sid, list] of Object.entries(by)) {
    const sc = sceneById[sid];
    if (!sc) continue;
    list.sort((a, b) => a.startMs - b.startMs);
    const fix = (s, key, v) => { const d = v - s[key]; if (d !== 0 && Math.abs(d) <= 1500) { s[key] = v; fitLog.push(`${s.id}.${key} ${d > 0 ? "+" : ""}${d}ms`); } };
    fix(list[0], "startMs", sc.startMs);
    for (let i = 0; i + 1 < list.length; i++) fix(list[i], "endMs", list[i + 1].startMs);
    fix(list[list.length - 1], "endMs", sc.endMs);
  }
}
function normalizeShots(newShots) {
  fitLog.length = 0;
  fitShotsToScenes(newShots);
  if (fitLog.length) console.log(`[ADN v2] Khớp shot vào ranh giới scene: ${fitLog.length} chỗ (${fitLog.slice(0, 12).join(", ")}${fitLog.length > 12 ? ", …" : ""})`);
  for (const s of newShots) {
    const sc = sceneById[s.sceneId];
    if (!sc) continue;
    s.presentationMode = sc.kind === "graphics" ? "graphics" : "asset";
    delete s.keyText; delete s.keyTextDropped; // tính lại tất định ở finalizeKeyTexts
    delete s.mascotAssetId; delete s.mascotBeat; delete s.animationPreset; delete s.mascotSide; delete s.mascotScale; delete s.textEvents; // dấu vết mascot cũ (vòng 1–4)
    if (sc.kind === "asset") {
      s.overlays = [];
      // [ADN v2] cách đặt media TẤT ĐỊNH theo kích thước thật: cover (9:16 đủ nét) | contain (nằm ngang/phân giải thấp/doc-NN)
      const f = fitForAsset(mediaById[s.assetId]);
      s.mediaFit = f.fit; s.mediaFitReason = f.reason;
      if (f.fit === "contain") s.containBox = f.box; else delete s.containBox;
    }
  }
}

// [ADN v2, vòng 5] CHỮ A-ROLL — TẤT ĐỊNH: khớp cụm neo của plan với mốc từng từ narration → chữ hiện ĐÚNG lúc từ neo được nói; cửa sổ chữ (đọc kịp + vào/ra) phải
// nằm trọn trong MỘT shot, không thì BỎ chữ đó (kèm lý do, log + ghi shot.keyTextDropped; KHÔNG tự cắt chữ/đổi ranh giới shot). Chọn treatment (asset mờ đi /
// thu nhỏ nhẹ / dải trống) theo hình học asset, không lặp lần chữ liền trước. Neo SAI (không khớp lời thoại) = lỗi cứng → vòng thử lại.
const keyTextErrors = [];
const keyTextLog = [];
function finalizeKeyTexts(shots) {
  keyTextErrors.length = 0; keyTextLog.length = 0;
  const byScene = new Map();
  for (const sh of shots) { if (!byScene.has(sh.sceneId)) byScene.set(sh.sceneId, []); byScene.get(sh.sceneId).push(sh); }
  const kept = keptShots.filter((x) => x.keyText).sort((a, b) => a.startMs - b.startMs);
  let k = kept.length, prevTreatment = kept.at(-1)?.keyText.treatment ?? null;
  for (const [sid, list] of byScene) {
    const sc = sceneById[sid];
    if (sc?.kind !== "asset" || !sc.keyText) continue;
    list.sort((a, b) => a.startMs - b.startMs);
    const r = planKeyText({ scene: sc, shots: list, captions, kt: sc.keyText });
    if (r.error) { keyTextErrors.push(`Scene ${sid}: ${r.error}.`); continue; }
    if (r.drop) { list[0].keyTextDropped = r.reason; keyTextLog.push(`${sid}: BỎ chữ A-roll — ${r.reason}`); continue; }
    const shot = list.find((x) => x.id === r.shotId);
    const content = shot.mediaFit === "contain" ? shot.containBox : { x: 0, y: 0, w: 1080, h: 1920 };
    const treatment = chooseTreatment({ content, fit: shot.mediaFit, prev: prevTreatment, k, isDoc: mediaById[shot.assetId]?.source === "pdf" });
    if (!treatment) { const why = `không có cách trình bày hợp lệ cho ${shot.assetId} (${mediaById[shot.assetId]?.source === "pdf" ? "doc-NN: không được làm mờ và không còn dải trống quanh thẻ" : "không còn chỗ cho chữ"})`; list[0].keyTextDropped = why; keyTextLog.push(`${sid}: BỎ chữ A-roll — ${why}`); continue; }
    shot.keyText = {
      text: sc.keyText.text, format: sc.keyText.format, treatment, atMs: r.atMs, holdMs: r.holdMs, anchorStartMs: r.anchorStartMs, anchorEndMs: r.anchorEndMs,
      wordOffsets: r.wordOffsets, purpose: sc.keyText.purpose, why: sc.keyText.why, bgVariant: sc.backgroundVariant ?? null, driftDir: sc.driftDir ?? null,
    };
    prevTreatment = treatment;
    k++;
  }
  for (const m of keyTextLog) console.log(`[ADN v2] ${m}`);
  return shots;
}

// [ADN v2, vòng 3] Hoàn thiện TẤT ĐỊNH các cảnh asset: gộp shot liền kề cùng asset, đặt fit/ngân sách zoom, gán camera 1 tween
// + chuyển shot xen kẽ cut/crossfade; trạng thái `seq` xuyên cảnh để không trùng kiểu camera với cảnh liền trước.
function finalizeAssetScenes(shots) {
  const seq = { k: 0, prev: null, lastTransition: "cut" };
  const byScene = new Map();
  for (const sh of shots) { if (!byScene.has(sh.sceneId)) byScene.set(sh.sceneId, []); byScene.get(sh.sceneId).push(sh); }
  const out = [];
  for (const [sid, list] of byScene) out.push(...(sceneById[sid]?.kind === "asset" ? finalizeAssetShots(list, mediaById, seq) : list));
  return out;
}

let feedbackForRetry = "";
let newShots;
const annotateOnly = process.argv.includes("--annotate-only"); // gắn lại mediaFit/containBox cho shotlist ĐÃ CÓ, KHÔNG gọi model
if (annotateOnly) {
  newShots = existingShotlist;
  normalizeShots(newShots);
  newShots = finalizeAssetScenes(newShots);
  newShots = finalizeKeyTexts(newShots);
  const problems = [...keyTextErrors, ...validatePlanAndShots(scenes, newShots, mediaById)];
  console.log(`[ADN v2] --annotate-only: ${newShots.length} shot, ${newShots.filter((x) => x.mediaFit === "contain").length} shot contain, ${problems.length} lỗi chặn.`);
  if (problems.length) { console.error("- " + problems.join("\n- ")); process.exit(1); }
}
for (let attempt = 1; !annotateOnly && attempt <= 2; attempt++) {
  const response = await callModel({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt + feedbackForRetry },
    ],
    temperature: 0.4,
    maxTokens: 24000,
    timeoutMs: 900000,
    responseFormat: { type: "json_object" },
  });

  const text = extractText(response);
  let result;
  try {
    result = extractJson(text);
  } catch (e) {
    console.error("Không parse được JSON trả về từ model:\n", text.slice(0, 2000));
    process.exit(1);
  }

  newShots = result.shots;
  if (!Array.isArray(newShots) || newShots.length === 0) {
    console.error("Cảnh báo: 'shots' không phải array hợp lệ hoặc rỗng.");
    process.exit(1);
  }
  normalizeShots(newShots);
  newShots = finalizeAssetScenes(newShots);
  newShots = finalizeKeyTexts(newShots);
  const problems = [...keyTextErrors, ...validatePlanAndShots(scenes, newShots, mediaById)];
  if (!problems.length) break;
  console.log(`[ADN v2] Kiểm tra shotlist lần ${attempt}: ${problems.length} vấn đề:\n- ${problems.join("\n- ")}`);
  if (attempt === 2) { console.error("Shotlist vẫn vi phạm ADN v2 sau 2 lần — dừng để người xem xét."); process.exit(1); }
  feedbackForRetry = `\n\nLẦN TRƯỚC SAI QUY TẮC (sửa đúng các điểm sau, giữ nguyên phần còn lại, in lại TOÀN BỘ shots):\n- ${problems.join("\n- ")}`;
}

{
  const soft = softShotWarnings(scenes, newShots);
  if (soft.length) console.log(`[ADN v2] Cảnh báo mềm shot (không chặn):\n- ${soft.join("\n- ")}`);
}
// Gắn thêm frame number (deterministic, không để model tự tính để tránh sai số học)
for (const s of newShots) {
  s.startFrame = msToFrame(s.startMs);
  s.endFrame = msToFrame(s.endMs);
  s.durationInFrames = s.endFrame - s.startFrame;
}

const shots = [...keptShots, ...newShots];
fs.mkdirSync(path.dirname(vp.shotlistJson), { recursive: true });
fs.writeFileSync(vp.shotlistJson, JSON.stringify(shots, null, 2), "utf8");

const fmtMs = (ms) => `${Math.floor(ms / 1000)}.${String(ms % 1000).padStart(3, "0")}s`;
const bySceneId = {};
for (const s of shots) (bySceneId[s.sceneId] ??= []).push(s);

const md = [
  `# Shotlist — ${slug}`,
  "",
  `> Sinh bởi \`scripts/06-shotlist.router.mjs\` qua ${model}. Nguồn dữ liệu: \`planning/videos/${slug}/shotlist.json\`. FPS=${FPS}.`,
  "",
  `Tổng: ${shots.length} shot trên ${Object.keys(bySceneId).length} scene`,
  "",
  ...Object.entries(bySceneId).flatMap(([sceneId, sceneShots]) => {
    const scene = allScenesInPlan.find((sc) => sc.id === sceneId);
    return [
      `## ${sceneId} — ${scene?.scriptText?.slice(0, 60) ?? ""}...`,
      "",
      "| Shot | Frame (start–end) | Thời gian | Asset | Trim | Xử lý | Camera | Overlay | Transition |",
      "|---|---|---|---|---|---|---|---|---|",
      ...sceneShots.map((s) => {
        const asset = s.assetId ? `${s.assetId} (${mediaById[s.assetId]?.file?.split("/").pop() ?? ""})${s.mediaFit === "contain" ? " [CONTAIN]" : ""}${s.keyText ? ` + CHỮ ${s.keyText.format}/${s.keyText.treatment}` : s.keyTextDropped ? " (chữ A-roll bị bỏ)" : ""}` : "—";
        const trim = s.trimStartSec != null ? `${s.trimStartSec}s–${s.trimEndSec}s` : "—";
        const overlays = (s.overlays || []).map((o) => `${o.type}:"${o.text ?? o.icon ?? o.name}"@${o.atMs}ms`).concat(s.keyText ? [`${s.keyText.format}:"${s.keyText.text}"@${s.keyText.atMs}ms`] : []).join("; ") || "—";
        return `| ${s.id} | ${s.startFrame}–${s.endFrame} (${s.durationInFrames}f) | ${fmtMs(s.startMs)}–${fmtMs(s.endMs)} | ${asset} | ${trim} | ${s.assetTreatment ?? "—"} | ${s.cameraMotion} | ${overlays} | ${s.transitionIn} |`;
      }),
      "",
    ];
  }),
  "## Ghi chú từng shot",
  "",
  ...shots.map((s) => `- **${s.id}**: ${s.notes || "—"}`),
].join("\n");

fs.writeFileSync(vp.shotlistMd, md, "utf8");

const summary = `Shotlist: ${shots.length} shot trên ${Object.keys(bySceneId).length} scene bằng ${model}, ghi planning/videos/${slug}/shotlist.json + shotlist.md`;
console.log(summary);
appendRunLog(`\`scripts/06-shotlist.router.mjs\` — ${summary}`, vp.runLog);
