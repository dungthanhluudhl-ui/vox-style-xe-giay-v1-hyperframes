// Transcribe audio -> Caption[] JSON (raw, chưa sửa chính tả) bằng whisper.cpp local.
// Usage: node scripts/01-audio-transcribe.local.mjs <input-audio> <output-captions.json> [--model=medium] [--language=vi] [--video=<slug>]
// --video: chỉ dùng để ghi run-log vào đúng pipeline/videos/<slug>/run-log.md, không bắt buộc.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { installWhisperCpp, downloadWhisperModel, transcribe, toCaptions } from "@remotion/install-whisper-cpp";
import { appendRunLog } from "./lib/router-client.mjs";
import { videoPaths } from "./lib/video-paths.mjs";

const [, , inputPath, outputPath, ...rest] = process.argv;
if (!inputPath || !outputPath) {
  console.error(
    "Usage: node scripts/01-audio-transcribe.local.mjs <input-audio> <output-captions.json> [--model=medium] [--language=vi]",
  );
  process.exit(1);
}

const flags = Object.fromEntries(
  rest.map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v];
  }),
);
const model = flags.model || "medium";
const language = flags.language || "vi";
const runLogPath = flags.video ? videoPaths(flags.video).runLog : undefined;

// CUDA là mặc định từ 2026-09-24 (đã benchmark: ~5.6x nhanh hơn CPU trên audio 460s thật, VRAM peak
// 3.3/6GB an toàn, chất lượng bằng hoặc TỐT HƠN CPU — bản CPU 1.5.5 hallucinate lặp câu CTA trong
// khoảng lặng cuối audio, bản CUDA 1.9.0 không bị). WHISPER_CUDA=0 để quay lại nhánh CPU cũ khi cần.
const useCuda = process.env.WHISPER_CUDA !== "0";
const whisperCppVersion = useCuda ? "1.9.0" : "1.5.5"; // duy nhất version có prebuilt binary Windows ổn định qua package này
const whisperRoot = useCuda
  ? path.join(process.cwd(), "pipeline", ".cache", "whisper-cpp-cuda")
  : path.join(process.cwd(), "pipeline", ".cache", "whisper-cpp");
// Nhánh CUDA dùng chung model đã tải sẵn ở whisper-cpp/ thay vì tải lại vào whisper-cpp-cuda/.
const modelFolder = useCuda ? path.join(process.cwd(), "pipeline", ".cache", "whisper-cpp") : undefined;
// Không tự tạo whisperRoot trước — installWhisperCpp() coi thư mục đã tồn tại (dù rỗng)
// là "đã cài" và sẽ throw thay vì cài mới.

if (useCuda) {
  // whisper.cpp CUDA KHÔNG cài qua installWhisperCpp()/npm — đây là bản cài thủ công (xem memory
  // "whisper_cuda_manual_setup" để biết cách dựng lại): tải whisper-cublas-11.8.0-bin-x64.zip từ
  // GitHub release v1.9.0 của ggml-org/whisper.cpp vào build/bin/, rồi bổ sung cublas64_11.dll +
  // cublasLt64_11.dll (thiếu trong zip đó — lỗi đóng gói thật) lấy từ wheel PyPI nvidia-cublas-cu11.
  const cudaExe = path.join(whisperRoot, "build", "bin", "whisper-cli.exe");
  if (!fs.existsSync(cudaExe)) {
    throw new Error(
      `WHISPER_CUDA mặc định bật nhưng không thấy ${cudaExe}. whisper.cpp CUDA phải cài thủ công, ` +
        `không tự động qua npm — xem memory "whisper_cuda_manual_setup" để cài lại, hoặc chạy với ` +
        `WHISPER_CUDA=0 để dùng nhánh CPU cũ.`,
    );
  }
  console.log(`Dùng whisper.cpp CUDA tại ${whisperRoot}, bỏ qua installWhisperCpp().`);
} else {
  console.log(`WHISPER_CUDA=0 → dùng whisper.cpp CPU (v${whisperCppVersion}). Cài (nếu chưa có)...`);
  await installWhisperCpp({ to: whisperRoot, version: whisperCppVersion });
}

console.log(`Tải model "${model}" (nếu chưa có)...`);
await downloadWhisperModel({ model, folder: modelFolder || whisperRoot });

// whisper.cpp yêu cầu wav 16kHz mono
const wavDir = path.join(process.cwd(), "pipeline", ".cache", "wav");
fs.mkdirSync(wavDir, { recursive: true });
const wavPath = path.join(wavDir, path.basename(inputPath, path.extname(inputPath)) + ".16k.wav");
console.log("Chuyển sang wav 16kHz mono...");
execSync(`ffmpeg -y -v error -i "${inputPath}" -ar 16000 -ac 1 "${wavPath}"`, { stdio: "inherit" });

console.log(`Transcribing (model=${model}, language=${language}${useCuda ? ", CUDA" : ""})...`);
// printOutput mặc định true ở @remotion/install-whisper-cpp — khi true, thư viện tự
// process.stdout.write() MỌI chunk thô từ whisper.cpp con, gồm toàn bộ dump per-token DTW timestamp
// (beam search 5-best) — đo thật: 17.456/17.768 dòng (98,2%) tổng log 1 lần chạy orchestrator cho
// audio chỉ 85s (xem responsibility-matrix.md mục 8b). Tắt hẳn (printOutput: false) — đã xác nhận
// qua đọc code thư viện: phát hiện progress/tự-kill-khi-treo chạy độc lập trong onData(), không phụ
// thuộc printOutput, nên tắt chỉ mất phần ECHO console, không đổi hành vi transcribe. Thay bằng
// onProgress in tiến độ mỗi mốc 10% để không hoàn toàn im lặng khi audio dài.
let lastLoggedPct = -1;
const whisperCppOutput = await transcribe({
  model,
  whisperPath: whisperRoot,
  whisperCppVersion,
  inputPath: wavPath,
  tokenLevelTimestamps: true,
  language,
  printOutput: false,
  onProgress: (fraction) => {
    const pct = Math.floor(fraction * 100 / 10) * 10;
    if (pct !== lastLoggedPct) {
      lastLoggedPct = pct;
      console.log(`  whisper progress: ${pct}%`);
    }
  },
  ...(modelFolder ? { modelFolder } : {}),
  // flash-attn mặc định bật ở whisper.cpp 1.9.0 làm whisper.cpp âm thầm tắt dtw_token_timestamps
  // (cần cho tokens[0].t_dtw mà toCaptions() đọc) — tắt flash-attn ở nhánh CUDA để giữ dtw hoạt động.
  ...(useCuda ? { additionalArgs: ["--no-flash-attn"] } : {}),
});

const { captions } = toCaptions({ whisperCppOutput });
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(captions, null, 2), "utf8");

const summary = `Transcribed ${path.basename(inputPath)} bằng whisper.cpp${useCuda ? " CUDA" : ""} (model=${model}, lang=${language}) -> ${captions.length} captions, ghi ra ${outputPath}`;
console.log(summary);
appendRunLog(`\`scripts/01-audio-transcribe.local.mjs\` — ${summary}`, runLogPath);
