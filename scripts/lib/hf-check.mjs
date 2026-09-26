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
export function runHyperframesCheck(dir, { extraArgs = [], timeoutMs = 180000 } = {}) {
  let raw = "";
  let ok = false;
  let execError = null;
  try {
    raw = execSync(`npx --yes hyperframes@${HF_VERSION} check --json ${extraArgs.join(" ")}`, {
      cwd: dir,
      stdio: "pipe",
      timeout: timeoutMs,
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

/** Vị trí sample trong mỗi shot (tỉ lệ của [startMs,endMs]) cho check trên project ĐÃ RÁP. */
export const SHOT_SAMPLE_FRACTIONS = [0.2, 0.5, 0.8];
/** `--max-issues` cho check theo shot — mặc định CLI là 80, video dài có nhiều warning/info có thể
 * vượt; finding `error` luôn được CLI xếp trước khi cắt nên gate không đổi, chỉ để log đầy đủ. */
export const SHOT_SAMPLE_MAX_ISSUES = 500;

/** Sinh extraArgs `--at=<t1,t2,...> --max-issues=N` từ shotlist.json: N mốc/shot tại
 * SHOT_SAMPLE_FRACTIONS. Lý do (đo thật 2026-09-26, xem planning/incident-log.md): check hạ finding
 * xuống `info` khi chỉ thấy ở 1 sample (occurrences=1) — 9 sample mặc định cho cả video (~43s/sample
 * ở video 437s) khiến lỗi gọn trong 1 scene lọt qua; ≥2 mốc trong cửa sổ lỗi → `error` đúng. Trả
 * `null` nếu không có shotlist (caller tự fallback về sample mặc định). */
export function buildShotSampleArgs(shotlistJsonPath, { fractions = SHOT_SAMPLE_FRACTIONS } = {}) {
  if (!fs.existsSync(shotlistJsonPath)) return null;
  const shots = JSON.parse(fs.readFileSync(shotlistJsonPath, "utf8"));
  if (!Array.isArray(shots) || shots.length === 0) return null;
  const times = new Set();
  for (const shot of shots) {
    if (!Number.isFinite(shot.startMs) || !Number.isFinite(shot.endMs) || shot.endMs <= shot.startMs) continue;
    for (const f of fractions) times.add(((shot.startMs + (shot.endMs - shot.startMs) * f) / 1000).toFixed(3));
  }
  const sorted = [...times].sort((a, b) => Number(a) - Number(b));
  return {
    args: [`--at ${sorted.join(",")}`, `--max-issues ${SHOT_SAMPLE_MAX_ISSUES}`],
    sampleCount: sorted.length,
    shotCount: shots.length,
    // Đo thật 2026-09-26: 180 mốc (hinh-phat) mất 155s khi máy đang chạy song song 1 build khác —
    // sát timeout mặc định 180s. Cho timeout tăng theo số mốc (~2s/mốc, sàn 180s) để video dài không
    // bị báo nhầm là lỗi hạ tầng.
    timeoutMs: Math.max(180000, 60000 + sorted.length * 2000),
  };
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

// formatCheckFeedback() — feedback retry + log Stage 7 (thay summarizeCheckRaw đã xoá 2026-09-26).
// Bài học giữ lại từ bản cũ (ha-noi-cam-xe-may S08, 2026-09-24): cắt mù theo số ký tự từng để warning lint
// chiếm hết ngân sách, model sửa 3 lần KHÔNG THẤY lỗi thật → luôn in dòng tóm tắt 5 mục trước và chỉ liệt kê
// lỗi làm FAIL, để lỗi thật sống sót qua giới hạn cắt.
// Khác bản cũ: (1) chỉ liệt kê finding làm FAIL (error), warning/info chỉ đếm; (2) gộp cùng 1 phần tử
// xuất hiện ở nhiều mốc thời gian thành 1 dòng (bản cũ in lặp 5 lần/phần tử contrast); (3) giữ đủ
// field cần để sửa: text, fg/bg/ratio/suggestedColor (contrast), phần tử che + % bị che
// (text_occluded), khối đè (content_overlap), fixHint (lint).

export function formatCheckFeedback(raw, maxChars) {
  let p;
  try {
    p = JSON.parse(raw.slice(Math.max(0, raw.indexOf("{"))));
  } catch {
    return raw.slice(0, maxChars);
  }
  const present = CHECK_CATEGORIES.filter((c) => p[c] && typeof p[c] === "object");
  let out = `ok=${p.ok}\n` + present.map((c) => `${c}: ok=${p[c].ok} errors=${p[c].errorCount ?? "?"} warnings=${p[c].warningCount ?? "?"}`).join("\n") + "\n";
  if (present.includes("lint") && p.lint.ok === false) {
    out += "LƯU Ý: lint có lỗi nên check ĐÃ BỎ QUA toàn bộ kiểm tra trình duyệt (layout/contrast/runtime) ở lần này — sửa lint xong, các lỗi layout/contrast (nếu có) mới lộ ra. Tự rà luôn contrast/che chữ theo quy tắc trước khi in lại file.\n";
  }
  const groups = new Map();
  let skipped = 0;
  for (const c of present) {
    for (const f of p[c].findings ?? []) {
      if (f.severity !== "error") { skipped++; continue; }
      // Gộp theo NGUYÊN NHÂN để model sửa 1 chỗ thay vì N dòng: occlusion theo phần tử che, contrast theo
      // cặp màu chữ/nền (làm tròn nền vì grain/trong suốt làm nền lệch vài đơn vị), còn lại theo selector.
      const key = f.code === "text_occluded" ? [c, f.code, f.containerSelector].join("|")
        : f.code === "contrast_aa_failure" ? [c, f.code, f.fg, roundRgb(f.bg), f.requiredRatio].join("|")
        : [c, f.code, f.selector, f.text ?? "", f.containerSelector ?? ""].join("|");
      const g = groups.get(key) ?? { c, f, times: [], items: new Map() };
      g.items.set(f.selector, f.text);
      if (f.time !== undefined) g.times.push(f.time);
      if (c === "contrast" && (g.f.ratio ?? 99) > (f.ratio ?? 99)) g.f = f; // giữ mốc tệ nhất
      groups.set(key, g);
    }
  }
  const lines = [];
  for (const g of groups.values()) {
    const { c, f, times } = g;
    const t = times.length ? ` t=${[...new Set(times)].slice(0, 4).join(",")}${times.length > 4 ? "…" : ""}` : "";
    const many = g.items.size > 1 ? ` (${g.items.size} phần tử: ${[...g.items].slice(0, 6).map(([sel, tx]) => tx ? `"${String(tx).slice(0, 30)}"` : sel).join(", ")}${g.items.size > 6 ? "…" : ""})` : "";
    const txt = g.items.size > 1 ? many : f.text ? ` "${String(f.text).slice(0, 60)}"` : "";
    let d;
    if (f.code === "contrast_aa_failure") {
      d = `chữ${txt} màu ${f.fg} trên nền ${f.bg}: ${f.ratio}:1 < ${f.requiredRatio}:1${f.large ? " (chữ lớn)" : ""} → màu chữ gần nhất đạt chuẩn: ${f.suggestedColor}`;
    } else if (f.code === "text_occluded") {
      d = `chữ${txt} bị ${f.containerSelector ?? "phần tử khác"} che ${f.coveredFraction != null ? Math.round(f.coveredFraction * 100) + "%" : ""}`;
    } else if (f.code === "content_overlap") {
      d = `khối chữ${txt} đè lên ${f.containerSelector ?? "khối chữ khác"}`;
    } else {
      d = `${f.message ?? ""}${txt && !String(f.message).includes(String(f.text)) ? txt : ""}`;
    }
    const hint = f.fixHint && c === "lint" ? ` | cách sửa: ${f.fixHint}` : "";
    lines.push(`[${c}] ${f.code} @ ${g.items.size > 1 && f.code === "text_occluded" ? "(nhiều)" : f.selector || "?"}${t}: ${d}${hint}`);
  }
  out += `\n--- ${lines.length} lỗi cần sửa (đã gộp các mốc thời gian trùng; ${skipped} warning/info không làm FAIL, bỏ qua) ---\n` + lines.join("\n") + "\n";
  return out.length > maxChars ? out.slice(0, maxChars) + "\n...[cắt bớt]" : out;
}

function roundRgb(s) {
  const m = String(s).match(/\d+/g);
  return m ? m.slice(0, 3).map((v) => Math.round(v / 16)).join(",") : s;
}
