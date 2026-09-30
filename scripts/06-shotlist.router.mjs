// Lập Shotlist: chia mỗi scene (planning/scene-plan.json) thành shot chi tiết (frame in/out,
// cách xử lý từng asset, overlay/label theo đúng cue lời thoại). Do 9router đảm nhiệm,
// Claude chỉ đọc kết quả markdown ngắn gọn sau khi xong.
// Usage: node scripts/06-shotlist.router.mjs --video=<slug>
//        node scripts/06-shotlist.router.mjs --video=<slug> --scenes=S05,S06,S07   (chỉ sinh lại shot cho các scene này, merge vào shotlist.json hiện có)
import fs from "node:fs";
import path from "node:path";
import { callModel, extractText, extractJson, loadModelRouting, appendRunLog } from "./lib/router-client.mjs";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";

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
- overlays: mảng các lớp phủ nhẹ trên nền media (label tối đa 4 từ không lặp lời thoại, icon từ 15-icon-vocabulary nếu cần, punch-phrase, đường/mũi tên overlay đơn giản nếu scene có ghi cần diagram overlay) — mỗi overlay có atMs (thời điểm xuất hiện, nên khớp đúng từ/cụm từ liên quan trong transcript đính kèm) và holdMs (thời gian giữ).
- cameraMotion: static/zoom-in/zoom-out/pan-left/pan-right/parallax.
- transitionIn: 1 trong 11 kiểu ở animation-variants.md, mặc định lấy theo entranceAnimation của scene cho shot đầu tiên của scene đó; các shot sau trong cùng scene dùng transition đơn giản hơn (cut/dissolve) trừ khi cần nhấn.

${PDF_SHOT_RULES}
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
      "assetTreatment": "mô tả ngắn",
      "cameraMotion": "zoom-in",
      "overlays": [{ "type": "label", "text": "KHOẢN NỢ TREO", "atMs": 800, "holdMs": 1600 }],
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

const response = await callModel({
  model,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
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

const newShots = result.shots;
if (!Array.isArray(newShots) || newShots.length === 0) {
  console.error("Cảnh báo: 'shots' không phải array hợp lệ hoặc rỗng.");
  process.exit(1);
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
        const asset = s.assetId ? `${s.assetId} (${mediaById[s.assetId]?.file?.split("/").pop() ?? ""})` : "—";
        const trim = s.trimStartSec != null ? `${s.trimStartSec}s–${s.trimEndSec}s` : "—";
        const overlays = (s.overlays || []).map((o) => `${o.type}:"${o.text ?? o.icon ?? o.name}"@${o.atMs}ms`).join("; ") || "—";
        return `| ${s.id} | ${s.startFrame}–${s.endFrame} (${s.durationInFrames}f) | ${fmtMs(s.startMs)}–${fmtMs(s.endMs)} | ${asset} | ${trim} | ${s.assetTreatment} | ${s.cameraMotion} | ${overlays} | ${s.transitionIn} |`;
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
