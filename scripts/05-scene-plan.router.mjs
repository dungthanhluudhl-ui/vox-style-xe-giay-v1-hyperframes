// Lập Scene Plan: chia audio/script thành các scene theo đúng Style DNA (Vox-style).
// Script tự đọc toàn bộ ngữ cảnh cần thiết từ đĩa (script, transcript+timestamp, style DNA,
// manifest media) và gửi cho 9router — Claude không cần đọc lại các file nặng này để tạo
// scene plan, chỉ đọc kết quả markdown ngắn gọn sau khi xong.
// Usage: node scripts/05-scene-plan.router.mjs
//        node scripts/05-scene-plan.router.mjs --from=S05   (giữ nguyên scene trước S05, chỉ tạo lại từ S05 trở đi)
import fs from "node:fs";
import path from "node:path";
import { callModel, extractText, extractJson, loadModelRouting, appendRunLog } from "./lib/router-client.mjs";

const root = process.cwd();
const routing = loadModelRouting();
const model = routing.reasoning_generator;

function read(p) {
  return fs.readFileSync(path.join(root, p), "utf8");
}

const scriptText = read("script/an-le-64-script.txt").trim();
const captions = JSON.parse(read("public/captions/an-le-64-captions.json"));
const mediaManifest = JSON.parse(read("pipeline/media-analysis/manifest.json"));

const styleDnaFiles = [
  "planning/style-dna/STYLE_DNA.md",
  "planning/style-dna/references/editorial-framework.md",
  "planning/style-dna/references/worked-examples.md",
  "planning/style-dna/references/visual-languages.md",
  "planning/style-dna/references/animation-variants.md",
  "planning/style-dna/references/quality-bars.md",
  "planning/style-dna/references/lessons.md",
];
const styleDna = styleDnaFiles.map((f) => `### ${f}\n\n${read(f)}`).join("\n\n---\n\n");
const styleTokens = read("planning/style-dna/style-tokens.json");

// Rút gọn manifest cho gọn prompt: bỏ originalFilename (không cần cho việc lập kế hoạch)
const mediaForPrompt = mediaManifest.map(({ originalFilename, ...rest }) => rest);

const totalDurationMs = captions[captions.length - 1]?.endMs ?? 0;

const fromArg = process.argv.find((a) => a.startsWith("--from="));
const fromSceneId = fromArg ? fromArg.split("=")[1] : null;
let keptScenes = [];
let regenFromMs = 0;
if (fromSceneId) {
  const existing = JSON.parse(read("planning/scene-plan.json"));
  const fromIndex = existing.findIndex((s) => s.id === fromSceneId);
  if (fromIndex === -1) {
    console.error(`Không tìm thấy scene ${fromSceneId} trong scene-plan.json hiện có.`);
    process.exit(1);
  }
  keptScenes = existing.slice(0, fromIndex);
  regenFromMs = keptScenes.length > 0 ? keptScenes[keptScenes.length - 1].endMs : 0;
  console.log(`Giữ nguyên ${keptScenes.length} scene (${keptScenes.map((s) => s.id).join(",")}), tạo lại từ ${fromSceneId} (${regenFromMs}ms trở đi).`);
}

const systemPrompt = `Bạn là Đạo diễn biên tập (Editorial Director) cho video giải thích pháp luật ngắn kiểu "Vox-style" (xem đầy đủ style DNA bên dưới — đây là quy tắc BẮT BUỘC tuân theo, không phải gợi ý).

STYLE DNA ĐẦY ĐỦ:
${styleDna}

STYLE TOKENS (số liệu chính xác):
${styleTokens}

NHIỆM VỤ: chia audio/script thành các SCENE theo đúng khung tư duy editorial-framework.md ("ý nghĩa trước, component sau"). Với mỗi scene, PHẢI trả lời được quan hệ hình ảnh cụ thể người xem cần THẤY HÌNH THÀNH — không phải chỉ minh hoạ chủ đề chung chung.

QUY TẮC ƯU TIÊN MEDIA — QUAN TRỌNG NHẤT, GHI ĐÈ LÊN XU HƯỚNG MẶC ĐỊNH CHỌN DIAGRAM CỦA STYLE DNA:
Toàn bộ 14 media trong manifest bên dưới được TẠO RIÊNG bằng AI dựa trên đúng kịch bản này (không phải stock chung chung, không phải ảnh minh hoạ đại diện). Vì vậy với MỖI scene, việc đầu tiên phải làm là kiểm tra manifest xem có asset nào (chưa dùng cho scene khác) khớp nội dung/cảm xúc của scene đó không.
- Nếu CÓ asset khớp: BẮT BUỘC dùng nó làm lớp hình ảnh chính (assetIds khai báo asset đó, visualLanguage tương ứng thường là "cutout" hoặc "background-photo"), kể cả khi một diagram/data/flow tự dựng có vẻ thể hiện "quan hệ ý nghĩa" thuần khái niệm rõ hơn — quan hệ đó vẫn truyền tải được qua caption/punch-phrase/overlay nhẹ đặt TRÊN nền media thật, không cần thay hẳn bằng cảnh dựng code.
- CHỈ được chuyển sang dựng thuần bằng code (diagram/map/timeline/flow/data không có asset nền) khi: (a) không còn asset nào (trong 14 asset) khớp nội dung cảnh đó, HOẶC (b) cảnh bắt buộc phải thể hiện số liệu/cấu trúc/vị trí chính xác mà không ảnh/video nào truyền tải được (vd đúng con số tiền, đúng vị trí địa lý) — khi đó ưu tiên overlay diagram NHẸ trên nền media thật nếu có, chỉ dựng toàn bộ bằng code khi thực sự không còn asset nào để làm nền.
- Lý do bắt buộc theo quy tắc này: code Remotion tự sinh cho diagram/icon-tự-vẽ phức tạp (mục 6 STYLE_DNA.md) rất dễ lỗi và xấu trong thực tế sản xuất. Code Remotion nên tập trung vào phụ đề/caption, text/title, ráp A-roll/B-roll (media thật), motion graphics/transition — không phải vẽ minh hoạ từ đầu khi đã có media phù hợp.
- Cố gắng dùng hết/gần hết 14 asset đã phân tích nếu nội dung cho phép, tránh để phần lớn media không được dùng trong khi vẫn tạo thêm scene fallback bằng code.

QUY TẮC NGƯỠNG NHỊP ĐỘ — ÁP DỤNG ĐỒNG THỜI VỚI QUY TẮC ƯU TIÊN MEDIA Ở TRÊN, KHÔNG ĐƯỢC HY SINH CÁI NÀY ĐỂ LẤY CÁI KIA:
- TUYỆT ĐỐI KHÔNG được tách một scene thành nhiều scene con chỉ để mỗi asset có một scene riêng nếu việc tách khiến scene ngắn hơn ~5 giây. Ngắn hơn 5 giây khiến người xem không kịp đọc/hiểu, dù đúng asset vẫn là một lỗi.
- Nếu một beat lời thoại quá ngắn để tách thành scene ≥5s riêng: (a) GỘP nhiều asset liên quan vào chung 1 scene (asset này có thể xuất hiện nối tiếp nhau bên trong cùng 1 scene, không cần tách scene mới cho từng cái), hoặc (b) giữ hình ảnh hiển thị LÂU HƠN đúng khoảng lời thoại đã giới thiệu nó — thời lượng trên màn hình không bắt buộc bằng đúng thời lượng câu nói (nguyên tắc comprehensionLoad ở editorial-framework.md).
- Trước khi chốt danh sách scene cuối cùng, tự kiểm tra: có scene nào < 5 giây không? Nếu có, quay lại gộp/kéo dài thay vì giữ nguyên.

LƯU Ý: theo quyết định dự án hiện tại, ảnh (type="image") chỉ dùng làm ẢNH NỀN (background-photo), KHÔNG áp dụng xử lý cutout (grayscale+bóng cam) — dù mô tả có ghi "cutout style" (đó là style của chính ảnh AI tạo sẵn, không phải chỉ định phải xử lý cutout thêm).
${
  fromSceneId
    ? `\nCHẾ ĐỘ SINH LẠI MỘT PHẦN: các scene sau ĐÃ CHỐT, KHÔNG được sửa/viết lại, KHÔNG đưa vào output — chỉ dùng để biết asset nào đã dùng rồi (không gán lại cho scene mới) và để nối tiếp đúng văn phong/id:\n${JSON.stringify(keptScenes, null, 2)}\nNhiệm vụ của bạn CHỈ là tạo các scene MỚI bắt đầu từ mốc ${regenFromMs}ms cho đến hết audio (${totalDurationMs}ms), đánh số id tiếp theo (nếu scene cuối giữ nguyên là S0${keptScenes.length}, scene mới bắt đầu từ S0${keptScenes.length + 1}). Output CHỈ gồm các scene MỚI này, không lặp lại scene đã chốt ở trên.\n`
    : ""
}
Trả về DUY NHẤT một JSON object đúng schema:
{
  "scenes": [
    {
      "id": "S01",
      "startMs": 0,
      "endMs": 3920,
      "scriptText": "câu/đoạn lời thoại của scene này, trích nguyên văn từ script gốc",
      "narrativeFunction": "một trong: hook/question/paradox/cause/causal-chain/list/definition/mechanism/evidence/reversal/conclusion",
      "visualRelationship": "câu trả lời cụ thể cho 'quan hệ nào người xem phải THẤY HÌNH THÀNH' — không phải mô tả chủ đề chung chung",
      "visualLanguages": ["1-2 giá trị từ 13 ngôn ngữ thị giác, ưu tiên xếp chồng ≥2 cho scene mạnh"],
      "backgroundVariant": "một trong: grid/chart/card/spotlight",
      "assetIds": ["id từ media manifest nếu phù hợp, có thể rỗng"],
      "entranceAnimation": "một trong 11 kiểu vào cảnh trong animation-variants.md, KHÔNG trùng với scene liền trước",
      "notes": "lý do chọn, cảnh báo nếu cần fallback text/card/diagram"
    }
  ]
}
Không viết giải thích/suy luận nào ngoài JSON object này.`;

const captionsForPrompt = fromSceneId ? captions.filter((c) => c.endMs > regenFromMs) : captions;
const usedAssetIds = new Set(keptScenes.flatMap((s) => s.assetIds || []));
const mediaAvailable = mediaForPrompt.filter((m) => !usedAssetIds.has(m.id));

const userPrompt = `SCRIPT GỐC (10 câu, khớp 100% với audio):
${scriptText}

TỔNG THỜI LƯỢNG AUDIO: ${totalDurationMs}ms (${(totalDurationMs / 1000).toFixed(2)}s)

TRANSCRIPT VỚI TIMESTAMP CẤP TỪ${fromSceneId ? ` (CHỈ phần còn lại, từ ${regenFromMs}ms trở đi)` : ""}:
${JSON.stringify(captionsForPrompt)}

MEDIA MANIFEST (asset ${fromSceneId ? "CHƯA dùng, còn lại để chọn" : "nguồn có sẵn"}):
${JSON.stringify(mediaAvailable, null, 2)}

Hãy lập Scene Plan ${fromSceneId ? `phần còn lại (từ ${fromSceneId} trở đi)` : "đầy đủ"} theo đúng schema đã yêu cầu.`;

console.log(`Gọi ${model} để lập scene plan (script ${scriptText.length} ký tự, ${captions.length} từ có timestamp, ${mediaForPrompt.length} media asset)...`);

const response = await callModel({
  model,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ],
  temperature: 0.4,
  maxTokens: 8000,
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

const newScenes = result.scenes;
if (!Array.isArray(newScenes) || newScenes.length === 0) {
  console.error("Cảnh báo: 'scenes' không phải array hợp lệ hoặc rỗng.");
  process.exit(1);
}
const scenes = [...keptScenes, ...newScenes];

// Ghi JSON (nguồn dữ liệu chính cho bước Shotlist/code-gen sau)
const jsonOutPath = path.join(root, "planning", "scene-plan.json");
fs.writeFileSync(jsonOutPath, JSON.stringify(scenes, null, 2), "utf8");

// Render markdown dễ đọc (deterministic, không gọi model lần 2)
const fmtMs = (ms) => `${Math.floor(ms / 1000)}.${String(ms % 1000).padStart(3, "0")}s`;
const md = [
  "# Scene Plan — Án lệ 64",
  "",
  `> Sinh bởi \`scripts/05-scene-plan.router.mjs\` qua ${model}. Nguồn dữ liệu: \`planning/scene-plan.json\`. Sửa tay thì sửa cả 2 file cho khớp.`,
  "",
  `Tổng thời lượng: ${fmtMs(totalDurationMs)} · ${scenes.length} scene`,
  "",
  "| # | Thời gian | Lời thoại | Chức năng | Quan hệ hình ảnh | Ngôn ngữ thị giác | Nền | Asset | Vào cảnh |",
  "|---|---|---|---|---|---|---|---|---|",
  ...scenes.map(
    (s) =>
      `| ${s.id} | ${fmtMs(s.startMs)}–${fmtMs(s.endMs)} | ${s.scriptText} | ${s.narrativeFunction} | ${s.visualRelationship} | ${(s.visualLanguages || []).join(" + ")} | ${s.backgroundVariant} | ${(s.assetIds || []).join(", ") || "—"} | ${s.entranceAnimation} |`,
  ),
  "",
  "## Ghi chú từng scene",
  "",
  ...scenes.map((s) => `- **${s.id}**: ${s.notes || "—"}`),
].join("\n");

fs.writeFileSync(path.join(root, "planning", "scene-plan.md"), md, "utf8");

const summary = `Scene Plan: ${scenes.length} scene bằng ${model}, ghi planning/scene-plan.json + planning/scene-plan.md`;
console.log(summary);
appendRunLog(`\`scripts/05-scene-plan.router.mjs\` — ${summary}`);
