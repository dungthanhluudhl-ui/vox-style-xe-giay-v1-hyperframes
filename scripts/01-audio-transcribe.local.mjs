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
const whisperCppVersion = "1.5.5"; // duy nhất version có prebuilt binary Windows ổn định qua package này

const whisperRoot = path.join(process.cwd(), "pipeline", ".cache", "whisper-cpp");
// Không tự tạo whisperRoot trước — installWhisperCpp() coi thư mục đã tồn tại (dù rỗng)
// là "đã cài" và sẽ throw thay vì cài mới.

console.log(`Cài whisper.cpp ${whisperCppVersion} (nếu chưa có)...`);
await installWhisperCpp({ to: whisperRoot, version: whisperCppVersion });

console.log(`Tải model "${model}" (nếu chưa có)...`);
await downloadWhisperModel({ model, folder: whisperRoot });

// whisper.cpp yêu cầu wav 16kHz mono
const wavDir = path.join(process.cwd(), "pipeline", ".cache", "wav");
fs.mkdirSync(wavDir, { recursive: true });
const wavPath = path.join(wavDir, path.basename(inputPath, path.extname(inputPath)) + ".16k.wav");
console.log("Chuyển sang wav 16kHz mono...");
execSync(`ffmpeg -y -v error -i "${inputPath}" -ar 16000 -ac 1 "${wavPath}"`, { stdio: "inherit" });

console.log(`Transcribing (model=${model}, language=${language})...`);
const whisperCppOutput = await transcribe({
  model,
  whisperPath: whisperRoot,
  whisperCppVersion,
  inputPath: wavPath,
  tokenLevelTimestamps: true,
  language,
});

const { captions } = toCaptions({ whisperCppOutput });
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(captions, null, 2), "utf8");

const summary = `Transcribed ${path.basename(inputPath)} bằng whisper.cpp (model=${model}, lang=${language}) -> ${captions.length} captions, ghi ra ${outputPath}`;
console.log(summary);
appendRunLog(`\`scripts/01-audio-transcribe.local.mjs\` — ${summary}`, runLogPath);
