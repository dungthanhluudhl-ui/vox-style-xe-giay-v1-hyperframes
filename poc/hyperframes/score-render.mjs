// Chấm điểm số (1-10) 1 bản render candidate so với baseline đã xác nhận đạt, qua vision model
// của 9router — KHÔNG để Claude tự xem ảnh trực tiếp (đúng nguyên tắc kiến trúc repo này, giống
// scripts/03-media-analyze.router.mjs / poc/hyperframes/vision-compare.mjs). Claude chỉ đọc
// JSON kết quả mà script này in ra.
//
// Khác với vision-compare.mjs (câu hỏi định tính, tự do): script này dùng 1 RUBRIC CỐ ĐỊNH trả
// về điểm số + lý do, LƯU LẠI được trong repo để tái sử dụng cho mọi lần audit model/pipeline
// sau này — khắc phục lỗ hổng đã phát hiện: điểm "6.2/10" ở Checkpoint D (di trú Remotion ->
// HyperFrames) có thật nhưng rubric/prompt chính xác chưa từng được lưu thành file.
//
// Usage:
//   node poc/hyperframes/score-render.mjs \
//     --baseline=frame1.png,frame2.png,frame3.png \
//     --candidate=frame1.png,frame2.png,frame3.png \
//     [--context="Scene S01: intro 4 lối mòn bán hàng online"] \
//     [--out=poc/hyperframes/poc-results/model-compare/S01-score.json]
//
// Mỗi bên (baseline/candidate) có thể truyền nhiều ảnh (nhiều mốc thời gian của CÙNG 1 scene) —
// gửi cùng lúc để model chấm dựa trên toàn bộ diễn biến, không chỉ 1 khung hình tĩnh.
import fs from "node:fs";
import path from "node:path";
import {
  callModel,
  extractText,
  extractJson,
  imageContentFromFile,
  loadModelRouting,
} from "../../scripts/lib/router-client.mjs";

const root = process.cwd();
const routing = loadModelRouting(root);
const VISION_MODEL = routing.vision_standard;

function argValue(flag) {
  const a = process.argv.find((x) => x.startsWith(`--${flag}=`));
  return a ? a.slice(flag.length + 3) : null;
}

const baselinePaths = (argValue("baseline") || "").split(",").filter(Boolean);
const candidatePaths = (argValue("candidate") || "").split(",").filter(Boolean);
const context = argValue("context") || "";
const outPath = argValue("out");

if (baselinePaths.length === 0 || candidatePaths.length === 0) {
  console.error(
    'Usage: node score-render.mjs --baseline=f1.png,f2.png --candidate=f1.png,f2.png [--context="..."] [--out=result.json]',
  );
  process.exit(1);
}

function imageBlock(label, filePaths) {
  return filePaths.map((p) => {
    const ext = path.extname(p).toLowerCase();
    const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png";
    return imageContentFromFile(path.join(root, p), mime);
  });
}

// Rubric CỐ ĐỊNH — cùng tinh thần đã dùng ngầm ở Checkpoint D (đối chiếu Style DNA + ý đồ
// shotlist + không lỗi khung hình), nay tường minh hoá thành 1 rubric có thể tái dùng.
const RUBRIC_PROMPT = `Bạn là giám khảo chấm chất lượng 1 scene video phong cách "xé giấy" (Vox-style, xem STYLE DNA: nền giấy #E7E3D9, mực #141414, cam nhấn DUY NHẤT #FF6A1A, font Be Vietnam Pro đậm 700/900, caption 4 từ/dòng neo đáy).

Bạn nhận 2 nhóm ảnh (mỗi nhóm vài khung hình trích tại các mốc thời gian của CÙNG 1 scene):
- Nhóm "BASELINE": bản đã được người dùng xem và xác nhận đạt chất lượng.
- Nhóm "CANDIDATE": bản mới cần chấm, so với baseline.

${context ? `BỐI CẢNH SCENE: ${context}\n` : ""}
CHẤM ĐIỂM CANDIDATE theo thang 1-10 (10 = khớp hoàn hảo tinh thần + chất lượng baseline, 1 = hỏng hoàn toàn), dựa trên:
1. Khớp Style DNA (màu sắc đúng bảng màu, font đúng, không màu nhấn ngoài cam, caption đúng vị trí/định dạng nếu xuất hiện).
2. Khớp bố cục/ý đồ biên tập tổng thể so với baseline (không cần giống pixel-by-pixel, chỉ cần cùng tinh thần/ý nghĩa hình ảnh).
3. Không có lỗi hiển thị rõ ràng (vỡ layout, chữ đè lên nhau không chủ đích, ảnh/video bị méo, phần tử biến mất bất thường).

QUAN TRỌNG: chấm theo tinh thần tổng thể, đừng trừ điểm nặng vì khác biệt tiểu tiết (góc camera hơi khác, easing chuyển động khác) nếu không ảnh hưởng rõ rệt tới cảm nhận chung — giống tinh thần review đã áp dụng cho bước reviewer trong pipeline này.

Trả lời DUY NHẤT 1 JSON object (không markdown, không giải thích ngoài JSON) đúng schema:
{
  "score": <số nguyên 1-10>,
  "reasoning": "1-2 câu giải thích điểm số",
  "issues": ["vấn đề cụ thể nếu có, mảng rỗng nếu không có vấn đề đáng kể"]
}`;

const content = [
  { type: "text", text: RUBRIC_PROMPT + "\n\nThứ tự ảnh: BASELINE x" + baselinePaths.length + ", sau đó CANDIDATE x" + candidatePaths.length },
  ...imageBlock("baseline", baselinePaths),
  ...imageBlock("candidate", candidatePaths),
];

console.log(`Chấm điểm qua ${VISION_MODEL}: ${baselinePaths.length} ảnh baseline vs ${candidatePaths.length} ảnh candidate...`);
const response = await callModel({
  model: VISION_MODEL,
  messages: [{ role: "user", content }],
  temperature: 0.1,
  maxTokens: 800,
  responseFormat: { type: "json_object" },
});

const text = extractText(response);
let result;
try {
  result = extractJson(text);
} catch {
  console.error("Không parse được JSON từ vision model, in nguyên văn:\n" + text);
  process.exit(1);
}

result.baselinePaths = baselinePaths;
result.candidatePaths = candidatePaths;
result.scoredAt = new Date().toISOString();
result.visionModel = VISION_MODEL;

console.log(JSON.stringify(result, null, 2));

if (outPath) {
  fs.mkdirSync(path.dirname(path.join(root, outPath)), { recursive: true });
  fs.writeFileSync(path.join(root, outPath), JSON.stringify(result, null, 2), "utf8");
  console.log(`\nĐã ghi: ${outPath}`);
}
