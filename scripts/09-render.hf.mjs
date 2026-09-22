// Render tất định video HyperFrames cuối cùng — wrapper cố định convention RIÊNG của repo này
// (quality="looks", output="out/<slug>-full.mp4"), thay cho việc gõ tay lệnh `npx hyperframes
// render` mỗi lần. Sự cố thật đã xảy ra (video "ban-an-35-phan-1", 2026-09-23): gõ tay lệnh raw đã
// lệch cả preset (--quality delivery thay vì looks) lẫn đường dẫn (renders/<slug>.mp4 thay vì
// out/<slug>-full.mp4) — xem planning/responsibility-matrix.md mục 8. Script này KHÔNG cho phép
// lệch convention một cách âm thầm: mọi override phải đi kèm --force-non-default tường minh.
// Usage: node scripts/09-render.hf.mjs --video=<slug> [--quality=<q>] [--output=<path>] [--fps=<n>] [--force-non-default]
//   --quality=<q>        Mặc định "looks" (chuẩn repo). Giá trị khác BẮT BUỘC đi kèm --force-non-default.
//   --output=<path>      Mặc định out/<slug>-full.mp4 (vp.finalOutput). Giá trị khác BẮT BUỘC đi
//                        kèm --force-non-default.
//   --fps=<n>            Truyền thẳng qua CLI hyperframes render (không có preflight riêng).
//   --force-non-default  Xác nhận CHỦ ĐÍCH override quality/output khác convention repo — thiếu cờ
//                        này, script TỪ CHỐI chạy nếu --quality/--output khác mặc định.
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { appendRunLog } from "./lib/router-client.mjs";

const root = process.cwd();
const slug = getVideoSlug();
const vp = videoPaths(slug, root);

const flags = Object.fromEntries(
  process.argv
    .slice(2)
    .filter((a) => a.startsWith("--") && a.includes("="))
    .map((a) => {
      const [k, v] = a.replace(/^--/, "").split(/=(.*)/s);
      return [k, v];
    }),
);
const forceNonDefault = process.argv.includes("--force-non-default");

const DEFAULT_QUALITY = "looks";
const quality = flags.quality || DEFAULT_QUALITY;
const outputPath = flags.output ? path.resolve(root, flags.output) : vp.finalOutput;

// Preflight assertion — KHÔNG cho phép lệch convention repo âm thầm (nguyên nhân sự cố thật: nghĩ
// "final delivery" nên tự đổi sang quality="delivery"/"high", ghi nhầm vào renders/<slug>.mp4).
const deviations = [];
if (quality !== DEFAULT_QUALITY) deviations.push(`quality="${quality}" (chuẩn repo: "${DEFAULT_QUALITY}")`);
if (outputPath !== vp.finalOutput) deviations.push(`output="${outputPath}" (chuẩn repo: "${vp.finalOutput}")`);
if (deviations.length && !forceNonDefault) {
  console.error(
    `\n⚠ TỪ CHỐI render: lệch convention repo mà không có --force-non-default xác nhận chủ đích:\n` +
      deviations.map((d) => `  - ${d}`).join("\n") +
      `\n\nNếu đây THẬT SỰ là ý muốn (vd 1 bản xuất đặc biệt theo yêu cầu người dùng), thêm cờ ` +
      `--force-non-default để xác nhận. Mặc định LUÔN dùng quality="${DEFAULT_QUALITY}" và ` +
      `output="${vp.finalOutput}".`,
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const extraArgs = [];
if (flags.fps) extraArgs.push(`--fps=${flags.fps}`);

const cmd = `npx hyperframes render --quality ${quality} -o "${outputPath}" ${extraArgs.join(" ")} "${vp.hfProjectDir}"`;
console.log(`Đang render: ${cmd}`);
const startedAt = Date.now();
execSync(cmd, { cwd: root, stdio: "inherit" });
const renderSeconds = (Date.now() - startedAt) / 1000;

if (!fs.existsSync(outputPath)) {
  console.error(`\n⚠ Render báo xong nhưng KHÔNG thấy file output tại ${outputPath} — kiểm tra tay.`);
  process.exit(1);
}

// Xác minh TẤT ĐỊNH bằng ffprobe — không chỉ tin log CLI "render thành công".
function ffprobeField(file, entries, selectStreams) {
  const sel = selectStreams ? `-select_streams ${selectStreams} ` : "";
  // Windows ffprobe trả \r\n — bắt buộc bỏ \r trước khi ghép nhiều dòng (vd width+height), nếu
  // không "\r" ẩn giữa 2 giá trị sẽ làm hỏng chuỗi hiển thị (con trỏ terminal nhảy về đầu dòng).
  return execSync(`ffprobe -v error ${sel}-show_entries ${entries} -of default=noprint_wrappers=1:nokey=1 "${file}"`)
    .toString()
    .replace(/\r/g, "")
    .trim();
}

const videoDurationSec = parseFloat(ffprobeField(outputPath, "format=duration"));
const sizeBytes = fs.statSync(outputPath).size;
const resolution = ffprobeField(outputPath, "stream=width,height", "v:0").replace(/\n/g, "x");
const codec = ffprobeField(outputPath, "stream=codec_name", "v:0");

let audioCompareNote = "không có narration.mp3 để đối chiếu";
if (fs.existsSync(vp.audioFile)) {
  const audioDurationSec = parseFloat(ffprobeField(vp.audioFile, "format=duration"));
  const diff = Math.abs(videoDurationSec - audioDurationSec);
  audioCompareNote =
    diff > 1
      ? `⚠ LỆCH ${diff.toFixed(3)}s so với audio thật ${audioDurationSec.toFixed(3)}s — KIỂM TRA LẠI`
      : `khớp audio thật ${audioDurationSec.toFixed(3)}s`;
}

const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1);
const summary =
  `Render bản đầy đủ: ${path.relative(root, outputPath)}, ${sizeBytes} bytes (${sizeMB}MB), ` +
  `${renderSeconds.toFixed(1)}s render time, quality=${quality}. Xác minh ffprobe: ` +
  `duration=${videoDurationSec.toFixed(3)}s (${audioCompareNote}), ${resolution} ${codec}.`;

console.log(`\n${summary}`);
appendRunLog(`\`scripts/09-render.hf.mjs\` — ${summary}`, vp.runLog);
