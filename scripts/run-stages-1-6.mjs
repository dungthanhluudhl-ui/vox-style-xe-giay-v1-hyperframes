// Điều phối Stage 1-6 (+ tự động Stage 7) cho MỘT video: chạy 2 nhánh độc lập song song
// (transcript: Stage 1→2; media: Stage 2b→3), rồi Stage 5→6 tuần tự sau khi cả 2 nhánh xong
// (Stage 5 là JOIN POINT thật — đọc cả captions.json lẫn manifest.json, xem
// planning/responsibility-matrix.md mục "4. Dependency graph..."). Sau Stage 6, tự suy ra danh
// sách scene ID từ scene-plan.json và (trừ khi --skip-stage7) chạy tiếp
// scripts/07-codegen-hf-parallel.mjs — script đó đã tự có worker-pool + tự gọi appendRunLog riêng
// cho từng scene, KHÔNG đụng vào logic của nó ở đây, chỉ stream output live + truyền qua exit code.
//
// DAG:
//   script + audio ─┬─> Stage 1 ─> Stage 2 ─┐
//                   └─> Stage 2b ─> Stage 3 ─┴─> Stage 5 ─> Stage 6 ─> (Stage 7)
//
// Usage: node scripts/run-stages-1-6.mjs --video=<slug>
//   [--audio=<path>] [--script=<path>]        mặc định vp.audioFile / vp.scriptFile.
//                                              LƯU Ý: --script= chỉ ảnh hưởng Stage 2 (truyền cho
//                                              chế độ align). Stage 2b LUÔN đọc thẳng vp.scriptFile,
//                                              không có cờ override — --script= không tác động gì
//                                              tới Stage 2b.
//   [--model=] [--language=]                  pass-through Stage 1.
//   [--flow-account=] [--style-notes=] [--resume-project=] [--retry-animate] [--images-only]  pass-through Stage 2b.
//   [--transcript-from=1|2|skip]              mặc định 1 — resume điểm bắt đầu nhánh transcript.
//   [--media-from=2b|3|skip]                  mặc định 2b — resume điểm bắt đầu nhánh media.
//   [--skip-stage7]                           mặc định KHÔNG set = tự chạy Stage 7 sau Stage 6.
//   [--concurrency=]                          pass-through Stage 7 (07-codegen-hf-parallel.mjs).
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { getVideoSlug, videoPaths } from "./lib/video-paths.mjs";
import { appendRunLog } from "./lib/router-client.mjs";

const root = process.cwd();
const slug = getVideoSlug(); // tự process.exit(1) nếu thiếu --video=
const vp = videoPaths(slug, root);

const argv = process.argv.slice(2);
// split(/=(.*)/s) chứ không split("=") thô — giá trị như --style-notes=/--resume-project= có thể
// chứa dấu "=" (URL query string, dấu câu).
const flags = Object.fromEntries(
  argv.filter((a) => a.startsWith("--") && a.includes("=")).map((a) => a.replace(/^--/, "").split(/=(.*)/s)),
);
const has = (name) => argv.includes(`--${name}`);

const audioPath = flags.audio ? path.resolve(root, flags.audio) : vp.audioFile;
const scriptPath = flags.script ? path.resolve(root, flags.script) : vp.scriptFile;
const transcriptFrom = flags["transcript-from"] || "1";
const mediaFrom = flags["media-from"] || "2b";
const skipStage7 = has("skip-stage7");

const VALID_TRANSCRIPT_FROM = new Set(["1", "2", "skip"]);
const VALID_MEDIA_FROM = new Set(["2b", "3", "skip"]);

function usageError(msg) {
  console.error(
    `⚠ ${msg}\nUsage: node scripts/run-stages-1-6.mjs --video=<slug> [--transcript-from=1|2|skip] [--media-from=2b|3|skip] [--skip-stage7] [--concurrency=N] ...`,
  );
  process.exit(1);
}

if (!VALID_TRANSCRIPT_FROM.has(transcriptFrom)) usageError(`--transcript-from="${transcriptFrom}" không hợp lệ (chỉ 1|2|skip).`);
if (!VALID_MEDIA_FROM.has(mediaFrom)) usageError(`--media-from="${mediaFrom}" không hợp lệ (chỉ 2b|3|skip).`);

// Chặn sớm bug hạ nguồn thật: 07-codegen-hf-parallel.mjs dùng parseInt(...,10) cho --concurrency=
// rồi so sánh `active < CONCURRENCY` — nếu giá trị không phải số, CONCURRENCY=NaN khiến điều kiện
// đó LUÔN false và Stage 7 TREO VĨNH VIỄN (không lỗi rõ ràng, không exit). Không sửa file đó (ngoài
// phạm vi), nhưng validate ở lớp gọi để không bao giờ truyền NaN xuống.
let concurrency;
if (flags.concurrency != null) {
  concurrency = parseInt(flags.concurrency, 10);
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    usageError(
      `--concurrency="${flags.concurrency}" không hợp lệ (phải là số nguyên dương) — 07-codegen-hf-parallel.mjs sẽ TREO nếu nhận giá trị không phải số.`,
    );
  }
}

/** Spawn `node <scriptRelPath> ...args`, stream live ra stdout với prefix [label], tách dòng theo
 * byte 0x0A THÔ (không decode-rồi-split) để an toàn với ký tự tiếng Việt multi-byte bị cắt giữa
 * chunk. Trả về {code, output} — không throw khi spawn lỗi, coi như 1 lần chạy fail bình thường để
 * logic nhánh xử lý thống nhất qua Promise.all. */
function runNode(scriptRelPath, args, label) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      resolve(result);
    };

    const child = spawn("node", [scriptRelPath, ...args], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });

    const rawChunks = [];
    let pending = Buffer.alloc(0);
    const emitLine = (buf) => process.stdout.write(`[${label}] ${buf.toString("utf8")}\n`);

    const onData = (chunk) => {
      rawChunks.push(chunk);
      pending = Buffer.concat([pending, chunk]);
      let idx;
      while ((idx = pending.indexOf(0x0a)) !== -1) {
        emitLine(pending.subarray(0, idx));
        pending = pending.subarray(idx + 1);
      }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);

    child.on("close", (code) => {
      if (pending.length > 0) emitLine(pending); // flush dòng dở cuối, không có \n cuối
      finish({ code: code ?? 1, output: Buffer.concat(rawChunks).toString("utf8") });
    });
    child.on("error", (err) => {
      process.stdout.write(`[${label}] spawn error: ${err.message}\n`);
      finish({ code: 1, output: Buffer.concat(rawChunks).toString("utf8") + `\n[spawn error] ${err.message}\n` });
    });
  });
}

function excerpt(output, maxLines = 30) {
  return output.trim().split("\n").slice(-maxLines).join("\n");
}

async function runTranscriptBranch() {
  if (transcriptFrom === "skip") {
    if (!fs.existsSync(vp.captionsFile)) {
      return {
        ok: false,
        stage: "precheck",
        message: `--transcript-from=skip nhưng không thấy ${path.relative(root, vp.captionsFile)}.`,
      };
    }
    return { ok: true };
  }

  // Precheck TRƯỚC khi spawn — Stage 1 tải model/setup CUDA rồi mới chạy ffmpeg, tốn thời gian
  // thật trước khi báo lỗi thiếu file nếu không precheck ở đây.
  if (!fs.existsSync(audioPath)) {
    return { ok: false, stage: "precheck", message: `Không thấy audio: ${path.relative(root, audioPath)}` };
  }
  if (!fs.existsSync(scriptPath)) {
    return {
      ok: false,
      stage: "precheck",
      message: `Không thấy script: ${path.relative(root, scriptPath)} (cần cho --script= của Stage 2)`,
    };
  }

  if (transcriptFrom === "1") {
    const args1 = [audioPath, vp.rawCaptionsFile];
    if (flags.model) args1.push(`--model=${flags.model}`);
    if (flags.language) args1.push(`--language=${flags.language}`);
    args1.push(`--video=${slug}`);
    const r1 = await runNode("scripts/01-audio-transcribe.local.mjs", args1, "01-transcribe");
    if (r1.code !== 0) return { ok: false, stage: "01", message: excerpt(r1.output) };
  } else if (transcriptFrom === "2") {
    if (!fs.existsSync(vp.rawCaptionsFile)) {
      return {
        ok: false,
        stage: "precheck",
        message: `--transcript-from=2 nhưng không thấy ${path.relative(root, vp.rawCaptionsFile)} (output Stage 1).`,
      };
    }
  }

  const args2 = [vp.rawCaptionsFile, vp.captionsFile, `--script=${scriptPath}`, `--audio=${audioPath}`, `--video=${slug}`];
  const r2 = await runNode("scripts/02-audio-clean-transcript.router.mjs", args2, "02-clean");
  if (r2.code !== 0) return { ok: false, stage: "02", message: excerpt(r2.output) };

  return { ok: true };
}

async function runMediaBranch() {
  if (mediaFrom === "skip") {
    if (!fs.existsSync(vp.manifestJson)) {
      return { ok: false, stage: "precheck", message: `--media-from=skip nhưng không thấy ${path.relative(root, vp.manifestJson)}.` };
    }
    return { ok: true };
  }

  if (mediaFrom === "2b") {
    // Stage 2b LUÔN đọc vp.scriptFile thẳng, không nhận override --script= của orchestrator này.
    if (!fs.existsSync(vp.scriptFile)) {
      return {
        ok: false,
        stage: "precheck",
        message: `Không thấy ${path.relative(root, vp.scriptFile)} (Stage 2b đọc trực tiếp, không dùng --script= của orchestrator).`,
      };
    }
    const args2b = [`--video=${slug}`];
    if (flags["flow-account"]) args2b.push(`--flow-account=${flags["flow-account"]}`);
    if (flags["style-notes"] != null) args2b.push(`--style-notes=${flags["style-notes"]}`);
    if (flags["resume-project"]) args2b.push(`--resume-project=${flags["resume-project"]}`);
    if (has("retry-animate")) args2b.push("--retry-animate");
    if (has("images-only")) args2b.push("--images-only");
    const r2b = await runNode("scripts/02b-media-generate.router.mjs", args2b, "02b-media");
    if (r2b.code !== 0) return { ok: false, stage: "02b", message: excerpt(r2b.output) };
  } else if (mediaFrom === "3") {
    if (!fs.existsSync(vp.imagesDir) && !fs.existsSync(vp.videosDir)) {
      return {
        ok: false,
        stage: "precheck",
        message: `--media-from=3 nhưng không thấy media nguồn (${path.relative(root, vp.imagesDir)} / ${path.relative(root, vp.videosDir)}).`,
      };
    }
  }

  // LƯU Ý: Stage 3 rename file tại chỗ (fs.renameSync) khi chuẩn hoá tên — không tự động retry
  // Stage 3 ở đây nếu fail, để tránh chạy lại trên file đã đổi tên một phần dở dang.
  const r3 = await runNode("scripts/03-media-analyze.router.mjs", [`--video=${slug}`], "03-analyze");
  if (r3.code !== 0) return { ok: false, stage: "03", message: excerpt(r3.output) };

  return { ok: true };
}

function fail(summary) {
  console.error(`\n⚠ ${summary}\n`);
  appendRunLog(`\`scripts/run-stages-1-6.mjs --video=${slug}\` — ${summary}`, vp.runLog);
  process.exit(1);
}
function succeed(summary, code) {
  console.log(`\n${summary}`);
  appendRunLog(`\`scripts/run-stages-1-6.mjs --video=${slug}\` — ${summary}`, vp.runLog);
  process.exit(code);
}

async function main() {
  console.log(
    `=== run-stages-1-6.mjs --video=${slug} === transcript-from=${transcriptFrom}, media-from=${mediaFrom}, skip-stage7=${skipStage7}`,
  );

  // Chạy THẬT song song — nhánh nào lỗi KHÔNG huỷ nhánh còn lại (Stage 2b có thể đang giữa 1 phiên
  // trình duyệt Google Flow thật, tốn credit/thời gian nếu huỷ ngang khi đang chạy).
  const [tr, mr] = await Promise.all([runTranscriptBranch(), runMediaBranch()]);

  if (!tr.ok || !mr.ok) {
    const parts = [];
    if (!tr.ok) parts.push(`Nhánh transcript (Stage ${tr.stage}): ${tr.message}`);
    if (!mr.ok) parts.push(`Nhánh media (Stage ${mr.stage}): ${mr.message}`);
    return fail(`THẤT BẠI trước Stage 5 — ${parts.join(" | ")}`);
  }

  console.log("\nCả 2 nhánh xong — Stage 5 (scene plan)...");
  const r5 = await runNode("scripts/05-scene-plan.router.mjs", [`--video=${slug}`], "05-scene-plan");
  if (r5.code !== 0) return fail(`THẤT BẠI ở Stage 5: ${excerpt(r5.output)}`);

  console.log("\nStage 5 xong — Stage 6 (shotlist)...");
  const r6 = await runNode("scripts/06-shotlist.router.mjs", [`--video=${slug}`], "06-shotlist");
  if (r6.code !== 0) return fail(`THẤT BẠI ở Stage 6: ${excerpt(r6.output)}`);

  let sceneIds;
  try {
    const scenePlan = JSON.parse(fs.readFileSync(vp.scenePlanJson, "utf8"));
    if (!Array.isArray(scenePlan) || scenePlan.length === 0) throw new Error("scene-plan.json rỗng hoặc không phải mảng");
    sceneIds = scenePlan.map((s, i) => {
      if (!s || typeof s.id !== "string" || !s.id) throw new Error(`scene thứ ${i} thiếu field "id" hợp lệ`);
      return s.id;
    });
  } catch (e) {
    return fail(`THẤT BẠI: không đọc được scene ID từ ${path.relative(root, vp.scenePlanJson)} sau Stage 6 — ${e.message}`);
  }
  const sceneIdsCsv = sceneIds.join(",");
  console.log(`\nStage 6 xong — ${sceneIds.length} scene: ${sceneIdsCsv}`);

  if (skipStage7) {
    return succeed(`Stage 1-6 xong (${sceneIds.length} scene: ${sceneIdsCsv}) — bỏ qua Stage 7 (--skip-stage7).`, 0);
  }

  console.log(`\nStage 7 (codegen song song, ${sceneIds.length} scene)...`);
  const args7 = [`--video=${slug}`, `--scenes=${sceneIdsCsv}`];
  if (concurrency != null) args7.push(`--concurrency=${concurrency}`);
  const r7 = await runNode("scripts/07-codegen-hf-parallel.mjs", args7, "07-codegen");

  if (r7.code === 0) {
    return succeed(`Stage 1-7 xong — ${sceneIds.length} scene (${sceneIdsCsv}), Stage 7 PASS, index.html đã ráp.`, 0);
  }
  return succeed(
    `Stage 1-6 xong, Stage 7 THẤT BẠI (mã ${r7.code}) — ${sceneIds.length} scene (${sceneIdsCsv}). Xem log ở trên hoặc sửa bằng --issue-file rồi chạy lại đúng scene.`,
    1,
  );
}

main().catch((err) => {
  // Lớp bảo vệ cuối cùng cho lỗi KHÔNG lường trước (bug thật trong orchestrator, không phải lỗi 1
  // stage con) — mọi lỗi "đã lường trước" ở trên đều đã tự có message sạch riêng, không rơi xuống đây.
  const summary = `LỖI KHÔNG MONG ĐỢI trong run-stages-1-6.mjs: ${err?.stack || err?.message || err}`;
  console.error(`\n⚠ ${summary}\n`);
  try {
    appendRunLog(`\`scripts/run-stages-1-6.mjs --video=${slug}\` — ${summary}`, vp.runLog);
  } catch {
    /* best-effort */
  }
  process.exit(1);
});
