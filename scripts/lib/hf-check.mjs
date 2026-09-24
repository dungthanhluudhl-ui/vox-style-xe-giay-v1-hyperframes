// Nguồn xác thực DUY NHẤT cho version CLI `hyperframes` được pin + logic gọi `hyperframes check`
// dùng chung — trước đây HF_VERSION khai báo cục bộ trong 07-codegen.hf.router.mjs và verify() chỉ
// dùng được cho project standalone tạm; tách ra đây để scripts/07b-integration-check.hf.mjs (check
// trên project ĐÃ RÁP, không phải scene riêng lẻ) dùng lại đúng 1 logic, không hardcode version lần
// 2 (rủi ro thật: 2 nơi lệch version nếu chỉ sửa 1 chỗ khi nâng cấp CLI sau này).
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const HF_VERSION = "0.8.56"; // pin — khớp version đã kiểm chứng ở poc/hyperframes/ (xem CLAUDE.md scaffold: "Pinned CLI version")

/** Chạy `hyperframes check --json` trên `dir` (project standalone tạm HOẶC project đã ráp), trả
 * `{ passed, raw, infraError }`. `passed`/`raw` giữ nguyên hành vi gốc. `infraError=true` khi tiến
 * trình TREO/CRASH trước khi in được báo cáo JSON hợp lệ (khác với "chạy xong, tự báo ok:false" —
 * đó là lỗi nội dung thật, không phải hạ tầng). Phân biệt: có parse được JSON với field `ok` kiểu
 * boolean hay không (check chạy xong luôn in JSON hợp lệ dù ok true/false), hoặc Node có tự kill tiến
 * trình do vượt `timeout` hay không. LƯU Ý đã kiểm chứng thật (không đoán): `error.killed` KHÔNG được
 * Node set thành `true` khi `execSync` bị kill do vượt `timeout` (đã test trên Node v24.20.0) — dấu
 * hiệu tin cậy thật là `error.code === "ETIMEDOUT"` (và `error.signal` luôn có giá trị, mặc định
 * "SIGTERM"). Dùng đúng 2 field đã kiểm chứng này, không dùng `.killed`. */
export function runHyperframesCheck(dir, { extraArgs = [] } = {}) {
  let raw = "";
  let ok = false;
  let execError = null;
  try {
    raw = execSync(`npx --yes hyperframes@${HF_VERSION} check --json ${extraArgs.join(" ")}`, {
      cwd: dir,
      stdio: "pipe",
      timeout: 180000,
    }).toString();
    ok = true;
  } catch (e) {
    raw = e.stdout?.toString() || e.stderr?.toString() || e.message;
    ok = false;
    execError = e;
  }
  let parsed = null;
  try {
    const jsonStart = raw.indexOf("{");
    parsed = JSON.parse(jsonStart >= 0 ? raw.slice(jsonStart) : raw);
  } catch {
    // giữ raw text để review bằng mắt nếu không parse được
  }
  const passed = parsed ? parsed.ok === true : ok;
  const hasValidReport = !!parsed && typeof parsed.ok === "boolean";
  const killedByTimeout = execError?.code === "ETIMEDOUT" || !!execError?.signal;
  const infraError = !hasValidReport || killedByTimeout;
  // KHÔNG cắt raw ở đây: 07b-integration-check.hf.mjs ghi raw thẳng vào file log riêng để đọc
  // sau (không phải console), cắt ở đây làm mất phần lỗi thật khi lint warning dài đứng trước.
  // Các nơi gọi khác (verify() trong 07-codegen.hf.router.mjs) đã tự cắt riêng cho console/feedback.
  return { passed, raw, infraError };
}

const ROOT_OVERFLOW_FLAGS = ["data-layout-allow-overflow", "data-layout-allow-overlap", "data-layout-allow-occlusion"];

/** Quét phần tử root (thẻ mở đầu tiên có data-composition-id) trong HTML, trả về danh sách cờ
 * opt-out layout đang bị đặt SAI chỗ (trên root thay vì đúng phần tử con cần opt-out) — cờ này
 * dùng closest() nên đặt ở root sẽ tắt audit cho MỌI phần tử con, che khuất lỗi thật khác. */
export function findRootLayoutFlags(html) {
  const rootMatch = html.match(/<[a-z]+\b[^>]*\bdata-composition-id="[^"]*"[^>]*>/i);
  if (!rootMatch) return [];
  return ROOT_OVERFLOW_FLAGS.filter((f) => rootMatch[0].includes(f));
}

/** Quét toàn bộ project ĐÃ RÁP (index.html + mọi file compositions/*.html) tìm cờ layout đặt sai
 * chỗ trên root — dùng ở Stage 7b vì project ráp có nhiều file, không chỉ 1 composition standalone
 * như Stage 7. */
export function findRootLayoutFlagsInProject(projectDir) {
  const violations = [];
  const indexPath = path.join(projectDir, "index.html");
  if (fs.existsSync(indexPath)) {
    const flags = findRootLayoutFlags(fs.readFileSync(indexPath, "utf8"));
    if (flags.length) violations.push({ file: "index.html", flags });
  }
  const compDir = path.join(projectDir, "compositions");
  if (fs.existsSync(compDir)) {
    for (const f of fs.readdirSync(compDir)) {
      if (!f.endsWith(".html")) continue;
      const flags = findRootLayoutFlags(fs.readFileSync(path.join(compDir, f), "utf8"));
      if (flags.length) violations.push({ file: `compositions/${f}`, flags });
    }
  }
  return violations;
}

const CHECK_CATEGORIES = ["lint", "runtime", "layout", "motion", "contrast"];

/** Tóm tắt `raw` (output thô "hyperframes check --json") thành dạng ngắn, ưu tiên KHÔNG mất lỗi
 * thật khi bị cắt xuống `maxChars` sau đó — bug thật đã xảy ra (video ha-noi-cam-xe-may, scene S08,
 * 2026-09-24): cắt mù theo số ký tự khiến mục `lint` (đứng đầu JSON, dù chỉ có warning) chiếm hết
 * ngân sách trước khi tới mục thật sự ok:false (layout.text_occluded) — model sửa lỗi 3 lần đều
 * KHÔNG THẤY lỗi thật. Ở đây: in 1 dòng tóm tắt ok/errorCount/warningCount cho ĐỦ 5 mục trước (dòng
 * này luôn sống sót dù bị cắt), rồi liệt kê chi tiết finding dạng 1 dòng/finding (bỏ
 * bbox/sourceFile/dataAttributes/fixHint — nặng, không cần cho model sửa lỗi), ĐẶT mục ok:false lên
 * TRƯỚC mục ok:true để lỗi thật luôn nằm ở đầu, sống sót qua giới hạn cắt cuối cùng. Nếu `raw` không
 * parse được JSON (vd infraError là text crash thô), fallback về cắt thô như hành vi cũ. */
export function summarizeCheckRaw(raw, maxChars) {
  let parsed;
  try {
    const start = raw.indexOf("{");
    parsed = JSON.parse(start >= 0 ? raw.slice(start) : raw);
  } catch {
    return raw.slice(0, maxChars);
  }
  const present = CHECK_CATEGORIES.filter((c) => parsed[c] && typeof parsed[c] === "object");
  const summaryLine = (c) => `${c}: ok=${parsed[c].ok} errors=${parsed[c].errorCount ?? "?"} warnings=${parsed[c].warningCount ?? "?"}`;
  const header = `ok=${parsed.ok}\n` + present.map(summaryLine).join("\n") + "\n";

  const ordered = [...present.filter((c) => parsed[c].ok === false), ...present.filter((c) => parsed[c].ok !== false)];
  let body = "";
  for (const c of ordered) {
    const findings = parsed[c].findings;
    if (!findings?.length) continue;
    body += `\n--- ${c} findings ---\n`;
    for (const f of findings) {
      body += `[${f.severity}] ${f.code} @ ${f.selector || "?"} (t=${f.time ?? "?"}): ${f.message}\n`;
    }
  }

  const combined = header + body;
  return combined.length > maxChars ? combined.slice(0, maxChars) + "\n...[cắt bớt]" : combined;
}
