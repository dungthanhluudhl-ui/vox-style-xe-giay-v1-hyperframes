// Sửa transcript ASR thô (từ whisper.cpp) bằng 9router.
// Nếu có --script=<path>: dùng script gốc (ground truth) để CĂN CHỈNH lại text theo đúng
//   câu chữ đã viết sẵn, chỉ giữ lại timing từ ASR — độ chính xác cao hơn nhiều so với chỉ
//   sửa chính tả mù (vì whisper.cpp bị lỗi mất dấu/vỡ UTF-8 ở chế độ token-level timestamp
//   với tiếng Việt, không chỉ là lỗi nghe nhầm thông thường).
// Nếu không có --script: chỉ sửa chính tả/dấu câu dựa trên ngữ cảnh (chế độ cũ).
// Usage: node scripts/02-audio-clean-transcript.router.mjs <input.json> <output.json> [--script=<path>] [--audio=<path>] [--video=<slug>]
// --audio: đường dẫn file audio gốc — dùng ffprobe lấy thời lượng THẬT làm giới hạn cứng cho
//   timestamp, tránh lặp lại lỗi whisper.cpp gán sai timestamp đoạn cuối (đã xảy ra thực tế:
//   audio dài 49.343s nhưng whisper gán từ cuối endMs=53680, dư 4.34s không có thật).
// --video: chỉ dùng để ghi run-log vào đúng pipeline/videos/<slug>/run-log.md, không bắt buộc.
import fs from "node:fs";
import { execSync } from "node:child_process";
import { callModel, extractText, extractJson, loadModelRouting, appendRunLog } from "./lib/router-client.mjs";
import { videoPaths } from "./lib/video-paths.mjs";

const [, , inputPath, outputPath, ...rest] = process.argv;
if (!inputPath || !outputPath) {
  console.error(
    "Usage: node scripts/02-audio-clean-transcript.router.mjs <input.json> <output.json> [--script=<path>] [--audio=<path>] [--video=<slug>]",
  );
  process.exit(1);
}
const flags = Object.fromEntries(
  rest.map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v];
  }),
);

const captions = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const routing = loadModelRouting();
const model = routing.text_cleanup;

const referenceScript = flags.script ? fs.readFileSync(flags.script, "utf8").trim() : null;
const runLogPath = flags.video ? videoPaths(flags.video).runLog : undefined;

let realDurationMs = null;
if (flags.audio) {
  const durSec = parseFloat(
    execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${flags.audio}"`)
      .toString()
      .trim(),
  );
  realDurationMs = Math.round(durSec * 1000);
  console.log(`Thời lượng audio thật (ffprobe): ${realDurationMs}ms`);
}

const systemPrompt = referenceScript
  ? `Bạn nhận: (1) transcript ASR thô dạng JSON Caption[] có timestamp cho từng mảnh từ, (2) script gốc chính xác 100% (ground truth) đã dùng để thu âm.
ASR bị lỗi vỡ UTF-8 tiếng Việt ở chế độ token-level (mất dấu, ký tự lỗi "�") và một số chỗ nghe nhầm/rớt từ — KHÔNG chỉ là lỗi chính tả thường.

NHIỆM VỤ: căn chỉnh lại (re-align) transcript theo ĐÚNG câu chữ của script gốc, giữ timing từ ASR.
QUY TẮC:
- Trường "captions" trong output là mảng Caption, mỗi phần tử tương ứng 1 từ trong script gốc, theo ĐÚNG thứ tự script gốc, dùng chính xác từ ngữ của script gốc (không paraphrase, không thêm/bớt ý).
- QUAN TRỌNG — khoảng trắng: mỗi từ (trừ từ ĐẦU TIÊN của toàn bộ transcript) PHẢI có một dấu cách ở ĐẦU chuỗi "text" (vd "text": " người" chứ không phải "text": "người"). Đây là convention bắt buộc của @remotion/captions — thiếu dấu cách sẽ làm chữ dính liền nhau khi hiển thị caption trên video.
- Với mỗi từ, lấy startMs/endMs từ mảnh ASR tương ứng gần nhất theo thứ tự thời gian. Nếu ASR gộp/tách từ khác với script (vd 1 từ ASR ứng với 2 từ script, hoặc ngược lại), nội suy timestamp hợp lý để dãy thời gian vẫn tăng dần đơn điệu và khớp tỉ lệ với đoạn ASR gần nhất.
- Giữ nguyên trường confidence nếu có thể map được, nếu không chắc thì đặt 0.5.
- pageBreakAfter: đặt true ở cuối mỗi câu (sau dấu . ! ?) của script gốc, false cho các từ còn lại.
- timestampMs: bằng startMs của chính từ đó.
${realDurationMs != null ? `- GIỚI HẠN CỨNG: audio gốc dài đúng ${realDurationMs}ms. TUYỆT ĐỐI KHÔNG từ nào được có endMs vượt quá ${realDurationMs}ms — đây là thời lượng thật của file audio, không phải ước lượng. Nếu timestamp ASR ở đoạn cuối có vẻ vượt quá giới hạn này (lỗi thường gặp của whisper.cpp khi ước lượng sai đoạn cuối), PHẢI nén lại các từ cuối cho vừa trong giới hạn thật, không được ngoại suy vượt quá.` : ""}
- Không viết suy luận/giải thích/ghi chú gì thêm ngoài JSON object yêu cầu.`
  : `Bạn là biên tập viên transcript. Nhiệm vụ: sửa lỗi chính tả, dấu câu, viết hoa trong trường "text" của mỗi phần tử trong mảng "captions".
QUY TẮC BẮT BUỘC:
- Giữ nguyên chính xác các trường startMs, endMs, timestampMs, confidence, pageBreakAfter.
- KHÔNG thêm/xoá/gộp/tách phần tử nào trong mảng.
- Chỉ sửa nội dung trong "text" (chính tả, dấu câu, viết hoa đầu câu/tên riêng). Không diễn giải lại, không dịch, không thêm ý.
- Không viết suy luận/giải thích/ghi chú gì thêm ngoài JSON object yêu cầu.`;

const userPrompt = referenceScript
  ? `SCRIPT GỐC (ground truth):\n${referenceScript}\n\nTRANSCRIPT ASR THÔ:\n${JSON.stringify({ captions })}\n\nTrả về JSON object dạng {"captions": [...]} theo đúng quy tắc.`
  : `TRANSCRIPT THÔ:\n${JSON.stringify({ captions })}\n\nTrả về JSON object dạng {"captions": [...]} theo đúng quy tắc.`;

const response = await callModel({
  model,
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ],
  temperature: 0.1,
  maxTokens: 8000,
  responseFormat: { type: "json_object" },
});

const text = extractText(response);
let cleaned;
try {
  const parsed = extractJson(text);
  cleaned = parsed.captions;
} catch (e) {
  console.error("Không parse được JSON trả về từ model:\n", text.slice(0, 1500));
  process.exit(1);
}

if (!Array.isArray(cleaned) || cleaned.length === 0) {
  console.error(`Cảnh báo: "captions" không phải array hợp lệ hoặc rỗng.`);
  process.exit(1);
}
if (!referenceScript && cleaned.length !== captions.length) {
  console.error(
    `Cảnh báo: số phần tử output (${cleaned.length}) khác input (${captions.length}) ở chế độ không dùng script gốc.`,
  );
  process.exit(1);
}

// Lớp bảo vệ tất định: dù model có tuân thủ giới hạn hay không, KHÔNG BAO GIỜ để timestamp
// vượt quá thời lượng thật của audio, VÀ không để sót một cụm từ cuối bị dồn nén bất
// thường (model có thể "tuân thủ" giới hạn bằng cách nhồi cả cụm từ vào 1-2ms cuối cùng —
// vẫn nằm trong giới hạn nhưng vô nghĩa khi hiển thị caption). Phát hiện: từ có thời lượng
// (endMs-startMs) nhỏ hơn hẳn mức trung bình của cả transcript, hoặc vượt giới hạn thật.
if (realDurationMs != null) {
  const durations = cleaned.map((c) => c.endMs - c.startMs).filter((d) => d > 0);
  const avgWordMs = durations.reduce((a, b) => a + b, 0) / (durations.length || 1);
  const minSaneMs = Math.max(30, avgWordMs * 0.25); // dưới mức này coi là bất thường

  const isBad = (c) => c.endMs > realDurationMs || c.startMs > realDurationMs || c.endMs - c.startMs < minSaneMs;

  let lastGoodIndex = cleaned.length - 1;
  while (lastGoodIndex >= 0 && isBad(cleaned[lastGoodIndex])) lastGoodIndex--;

  if (lastGoodIndex < cleaned.length - 1) {
    const violating = cleaned.slice(lastGoodIndex + 1);
    const newStart = lastGoodIndex >= 0 ? cleaned[lastGoodIndex].endMs : 0;
    const newSpan = Math.max(realDurationMs - newStart, violating.length * minSaneMs);
    console.error(
      `Cảnh báo: ${violating.length} từ cuối có timestamp bất thường (vượt giới hạn hoặc dồn nén <${Math.round(minSaneMs)}ms/từ) — tự động phân bổ đều theo độ dài chữ trong khoảng [${newStart}, ${newStart + newSpan}]ms.`,
    );
    const weights = violating.map((c) => Math.max(c.text.trim().length, 1));
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let cursor = newStart;
    violating.forEach((c, i) => {
      const dur = (weights[i] / totalWeight) * newSpan;
      c.startMs = Math.round(cursor);
      c.endMs = Math.round(cursor + dur);
      c.timestampMs = c.startMs;
      cursor += dur;
    });
    cleaned[cleaned.length - 1].endMs = Math.min(cleaned[cleaned.length - 1].endMs, realDurationMs);
  }
}

// Kiểm tra tất định: audio thật có thể chứa nội dung THỪA ở đầu/cuối so với script gốc — ví dụ
// do cắt file audio dính sang đoạn TRƯỚC/SAU nó (đã xảy ra thực tế: audio "phần 2" dính thêm
// 3 từ "theo kế hoạch" thuộc về đoạn kế tiếp). ASR thô (`captions`, chưa align) là bằng chứng
// độc lập cho toàn bộ nội dung audio thực sự nói ra, không phụ thuộc script — nếu ASR thô nghe
// được nội dung có nghĩa nằm ngoài khoảng thời gian mà bản align (`cleaned`) bao phủ, rất có
// thể là lẫn nội dung từ đoạn khác, không phải lỗi align. Chỉ cảnh báo, không tự sửa, vì không
// đủ dữ kiện để biết audio bị lẫn thật hay script chỉ đơn giản thiếu câu — con người quyết định.
if (referenceScript) {
  const BOUNDARY_BUFFER_MS = 350;
  const isMeaningful = (text) => (text.match(/[a-zA-ZÀ-ỹ]/g) || []).length >= 2;

  const firstAlignedStartMs = cleaned[0]?.startMs ?? 0;
  const lastAlignedEndMs = cleaned[cleaned.length - 1]?.endMs ?? 0;

  // Ngưỡng để QUYẾT ĐỊNH có cảnh báo hay không (tránh báo động giả vì khoảng lặng tự nhiên);
  // khi ĐÃ quyết định cảnh báo, hiển thị TOÀN BỘ text ngay sát mép (không trừ buffer) để câu
  // chữ đọc được trọn vẹn thay vì bị cắt cụt ngay chỗ buffer bắt đầu.
  const extraBeforeCheck = captions.filter((c) => c.endMs < firstAlignedStartMs - BOUNDARY_BUFFER_MS);
  const extraAfterCheck = captions.filter((c) => c.startMs > lastAlignedEndMs + BOUNDARY_BUFFER_MS);
  const extraBeforeText = extraBeforeCheck.map((c) => c.text).join("").trim();
  const extraAfterText = extraAfterCheck.map((c) => c.text).join("").trim();

  if (isMeaningful(extraBeforeText)) {
    const full = captions.filter((c) => c.endMs <= firstAlignedStartMs);
    const fullText = full.map((c) => c.text).join("").trim();
    console.warn(
      `\n⚠ CẢNH BÁO: ASR thô nghe được nội dung THỪA TRƯỚC đoạn khớp với script gốc (${full[0]?.startMs ?? 0}ms–${firstAlignedStartMs}ms): "${fullText}"\n  → Có thể audio bị cắt dính sang đoạn TRƯỚC nó, hoặc script thiếu câu đầu. Kiểm tra lại nếu không chủ đích.\n`,
    );
  }
  if (isMeaningful(extraAfterText)) {
    const full = captions.filter((c) => c.startMs >= lastAlignedEndMs);
    const fullText = full.map((c) => c.text).join("").trim();
    console.warn(
      `\n⚠ CẢNH BÁO: ASR thô nghe được nội dung THỪA SAU đoạn khớp với script gốc (${lastAlignedEndMs}ms–${full[full.length - 1]?.endMs ?? lastAlignedEndMs}ms): "${fullText}"\n  → Có thể audio bị cắt dính sang đoạn KẾ TIẾP, hoặc script thiếu câu cuối. Kiểm tra lại nếu không chủ đích.\n`,
    );
  }
}

fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2), "utf8");

const mode = referenceScript ? "align-với-script-gốc" : "sửa-chính-tả-mù";
const summary = `Cleaned ${cleaned.length} captions (mode=${mode}) bằng ${model}, ghi ra ${outputPath}`;
console.log(summary);
appendRunLog(`\`scripts/02-audio-clean-transcript.router.mjs\` — ${summary}`, runLogPath);
