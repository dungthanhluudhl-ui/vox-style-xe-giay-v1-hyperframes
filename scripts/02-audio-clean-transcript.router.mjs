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

function buildAlignSystemPrompt() {
  return `Bạn nhận: (1) transcript ASR thô dạng JSON Caption[] có timestamp cho từng mảnh từ (có thể dư một ít ở đầu/cuối so với đoạn script cần xử lý), (2) MỘT ĐOẠN của script gốc chính xác 100% (ground truth) đã dùng để thu âm — không phải toàn bộ script, chỉ đoạn được giao.
ASR bị lỗi vỡ UTF-8 tiếng Việt ở chế độ token-level (mất dấu, ký tự lỗi "�") và một số chỗ nghe nhầm/rớt từ — KHÔNG chỉ là lỗi chính tả thường.

NHIỆM VỤ: căn chỉnh lại (re-align) CHỈ đoạn script được giao theo ĐÚNG câu chữ của nó, giữ timing từ ASR.
QUY TẮC:
- Trường "captions" trong output là mảng Caption, mỗi phần tử tương ứng ĐÚNG 1 từ trong đoạn script được giao, theo ĐÚNG thứ tự, dùng chính xác từ ngữ của đoạn script (không paraphrase, không thêm/bớt ý, không thêm từ ngoài đoạn được giao dù ASR có nghe thấy thêm).
- QUAN TRỌNG — khoảng trắng: mỗi từ (trừ từ ĐẦU TIÊN của toàn bộ transcript gốc) PHẢI có một dấu cách ở ĐẦU chuỗi "text" (vd "text": " người" chứ không phải "text": "người"). Đây là convention bắt buộc của @remotion/captions — thiếu dấu cách sẽ làm chữ dính liền nhau khi hiển thị caption trên video. Nếu đoạn này không phải từ đầu tiên của toàn bộ transcript, TẤT CẢ các từ trong đoạn đều phải có dấu cách ở đầu.
- Với mỗi từ, lấy startMs/endMs từ mảnh ASR tương ứng gần nhất theo thứ tự thời gian. Nếu ASR gộp/tách từ khác với script (vd 1 từ ASR ứng với 2 từ script, hoặc ngược lại), nội suy timestamp hợp lý để dãy thời gian vẫn tăng dần đơn điệu và khớp tỉ lệ với đoạn ASR gần nhất.
- Giữ nguyên trường confidence nếu có thể map được, nếu không chắc thì đặt 0.5.
- pageBreakAfter: đặt true ở cuối mỗi câu (sau dấu . ! ?) trong đoạn này, false cho các từ còn lại.
- timestampMs: bằng startMs của chính từ đó.
${realDurationMs != null ? `- GIỚI HẠN CỨNG: audio gốc dài đúng ${realDurationMs}ms. TUYỆT ĐỐI KHÔNG từ nào được có endMs vượt quá ${realDurationMs}ms.` : ""}
- Không viết suy luận/giải thích/ghi chú gì thêm ngoài JSON object yêu cầu.`;
}

const SPELL_ONLY_SYSTEM_PROMPT = `Bạn là biên tập viên transcript. Nhiệm vụ: sửa lỗi chính tả, dấu câu, viết hoa trong trường "text" của mỗi phần tử trong mảng "captions".
QUY TẮC BẮT BUỘC:
- Giữ nguyên chính xác các trường startMs, endMs, timestampMs, confidence, pageBreakAfter.
- KHÔNG thêm/xoá/gộp/tách phần tử nào trong mảng.
- Chỉ sửa nội dung trong "text" (chính tả, dấu câu, viết hoa đầu câu/tên riêng). Không diễn giải lại, không dịch, không thêm ý.
- Không viết suy luận/giải thích/ghi chú gì thêm ngoài JSON object yêu cầu.`;

let cleaned;

if (referenceScript) {
  // --- Chế độ align-với-script, có chia nhỏ (bisect) tự phục hồi khi tràn token ---
  // Phát hiện thật (video "tham-hoa-itaewon-phan-1", 441 từ, audio 101s): gửi TOÀN BỘ script +
  // toàn bộ 757 caption ASR thô trong 1 lần gọi khiến model (có "thinking" ẩn) tiêu tốn tới
  // ~64000 token tổng (reasoning+completion) và bị cắt cụt JSON giữa chừng (finish_reason=
  // "max_tokens") dù đã tăng maxTokens yêu cầu lên 24000 — ngân sách reasoning ẩn không nằm
  // trong tầm kiểm soát của tham số maxTokens phía client. Video 1/2 (227 từ) không gặp vì đủ
  // nhỏ để lọt trong 1 lần gọi. Fix tổng quát, không phụ thuộc đoán trước 1 con số "an toàn":
  // thử gọi cả đoạn được giao; nếu JSON bị cắt cụt (parse lỗi) hoặc finish_reason="max_tokens",
  // TỰ ĐỘNG chia đôi đoạn từ đó theo số từ và gọi lại đệ quy cho từng nửa — tự thu nhỏ dần đến
  // khi vừa ngân sách thực tế của model, không cần biết trước ngưỡng đó là bao nhiêu.
  const words = referenceScript.split(/\s+/).filter(Boolean);
  const normalizedScript = words.join(" ");
  const wordCharStart = [];
  {
    let cursor = 0;
    for (const w of words) {
      wordCharStart.push(cursor);
      cursor += w.length + 1;
    }
  }
  const totalChars = normalizedScript.length;
  const totalRaw = captions.length;
  const MIN_CHUNK_WORDS = 8;

  async function alignWordRange(lo, hi, depth) {
    const chunkWords = words.slice(lo, hi);
    const chunkText = chunkWords.join(" ");

    const startFrac = wordCharStart[lo] / totalChars;
    const endCharExclusive = hi < words.length ? wordCharStart[hi] : totalChars;
    const endFrac = endCharExclusive / totalChars;

    const rawLo = Math.floor(startFrac * totalRaw);
    const rawHi = Math.ceil(endFrac * totalRaw);
    const span = Math.max(1, rawHi - rawLo);
    const pad = Math.max(12, Math.round(span * 0.25));
    const asrLo = Math.max(0, rawLo - pad);
    const asrHi = Math.min(totalRaw, rawHi + pad);
    const asrSlice = captions.slice(asrLo, asrHi);

    console.log(
      `  [align] đoạn từ ${lo}-${hi} (${chunkWords.length} từ, depth=${depth}), ASR thô [${asrLo}-${asrHi}] (${asrSlice.length} mục)`,
    );

    const maxTokens = Math.min(16000, Math.max(3000, chunkWords.length * 55));
    const response = await callModel({
      model,
      messages: [
        { role: "system", content: buildAlignSystemPrompt() },
        {
          role: "user",
          content: `ĐOẠN SCRIPT GỐC CẦN XỬ LÝ:\n${chunkText}\n\nTRANSCRIPT ASR THÔ (một phần liên quan, có thể dư ở đầu/cuối):\n${JSON.stringify({ captions: asrSlice })}\n\nTrả về JSON object dạng {"captions": [...]} cho ĐÚNG ${chunkWords.length} từ của đoạn script này, theo đúng quy tắc.`,
        },
      ],
      temperature: 0.1,
      maxTokens,
      responseFormat: { type: "json_object" },
    });

    const finishReason = response?.choices?.[0]?.finish_reason;
    const text = extractText(response);
    let parsed = null;
    try {
      parsed = extractJson(text).captions;
    } catch {
      parsed = null;
    }

    const truncated = finishReason === "max_tokens" || !Array.isArray(parsed) || parsed.length === 0;

    if (truncated) {
      if (chunkWords.length <= MIN_CHUNK_WORDS) {
        console.error(
          `Lỗi: đoạn ${lo}-${hi} (${chunkWords.length} từ, đã nhỏ nhất có thể) vẫn bị tràn/lỗi JSON. Nội dung trả về:\n${text.slice(0, 1000)}`,
        );
        process.exit(1);
      }
      console.log(`  [align] đoạn ${lo}-${hi} bị tràn token (finish_reason=${finishReason}) — chia đôi và thử lại.`);
      const mid = lo + Math.floor((hi - lo) / 2);
      const left = await alignWordRange(lo, mid, depth + 1);
      const right = await alignWordRange(mid, hi, depth + 1);
      return [...left, ...right];
    }

    if (parsed.length !== chunkWords.length) {
      console.warn(
        `  [align] Cảnh báo: đoạn ${lo}-${hi} có ${chunkWords.length} từ script nhưng model trả về ${parsed.length} caption — kiểm tra lại nội dung nếu thấy sai lệch.`,
      );
    }
    return parsed;
  }

  cleaned = await alignWordRange(0, words.length, 0);
} else {
  // --- Chế độ sửa-chính-tả-mù (không có script gốc), giữ nguyên số lượng phần tử ---
  const dynamicMaxTokens = Math.min(32000, Math.max(8000, captions.length * 40));
  const response = await callModel({
    model,
    messages: [
      { role: "system", content: SPELL_ONLY_SYSTEM_PROMPT },
      {
        role: "user",
        content: `TRANSCRIPT THÔ:\n${JSON.stringify({ captions })}\n\nTrả về JSON object dạng {"captions": [...]} theo đúng quy tắc.`,
      },
    ],
    temperature: 0.1,
    maxTokens: dynamicMaxTokens,
    responseFormat: { type: "json_object" },
  });

  const text = extractText(response);
  try {
    cleaned = extractJson(text).captions;
  } catch (e) {
    console.error("Không parse được JSON trả về từ model:\n", text.slice(0, 1500));
    process.exit(1);
  }

  if (!Array.isArray(cleaned) || cleaned.length === 0) {
    console.error(`Cảnh báo: "captions" không phải array hợp lệ hoặc rỗng.`);
    process.exit(1);
  }
  if (cleaned.length !== captions.length) {
    console.error(
      `Cảnh báo: số phần tử output (${cleaned.length}) khác input (${captions.length}) ở chế độ không dùng script gốc.`,
    );
    process.exit(1);
  }
}

// Lớp bảo vệ tất định: chế độ chia nhỏ ở trên gọi model nhiều lần độc lập, mỗi lần chỉ thấy
// một lát cắt ASR thô — timestamp ở đúng ranh giới 2 đoạn kề nhau lý thuyết có thể không tăng
// dần tuyệt đối (vd đoạn sau bắt đầu sớm hơn đoạn trước kết thúc do cả 2 cùng "nhìn thấy" một
// vài caption ASR trùng trong vùng đệm). Chỉ kẹp tối thiểu tại chỗ, không dồn lệch xa.
for (let i = 1; i < cleaned.length; i++) {
  if (cleaned[i].startMs < cleaned[i - 1].endMs) {
    cleaned[i].startMs = cleaned[i - 1].endMs;
    if (cleaned[i].endMs <= cleaned[i].startMs) cleaned[i].endMs = cleaned[i].startMs + 30;
    cleaned[i].timestampMs = cleaned[i].startMs;
  }
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
