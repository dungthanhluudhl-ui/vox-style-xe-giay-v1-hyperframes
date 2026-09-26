// Tự sửa TẤT ĐỊNH 2 nhóm lỗi Stage 7 lặp lại nhiều nhất — thay 1 vòng generate LLM + check bằng thao
// tác cơ học (đo 2026-09-26 trên 317 lần verify fail: 32% CHỈ do lỗi <video>, 23% CHỈ do contrast).
// Nguyên tắc: chỉ sửa khi chắc chắn đúng phần tử; không chắc → bỏ qua, để vòng feedback bình thường xử lý.
// Sửa bằng cách chèn/xoá chuỗi tại đúng vị trí trong source (không serialize lại DOM) — code model sinh
// giữ nguyên từng ký tự ngoài chỗ sửa.
import { parseHTML } from "linkedom";
import { contrastRatio } from "./palette-contrast.mjs";

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const RAW = new Set(["script", "style", "textarea", "title"]);

/** Tách thẻ → cây phần tử có vị trí trong source: { tag, attrs, openStart, openEnd, parent, children }. */
export function parseElements(html) {
  const root = { tag: "#document", attrs: {}, children: [], parent: null };
  let cur = root;
  const re = /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[1]) {
      const tag = m[1].toLowerCase();
      let n = cur;
      while (n && n.tag !== tag) n = n.parent;
      if (n && n.parent) cur = n.parent; // đóng tới thẻ khớp gần nhất (bỏ qua thẻ quên đóng)
      continue;
    }
    if (!m[2]) continue;
    const tag = m[2].toLowerCase();
    const attrText = m[3] || "";
    const el = { tag, attrText, attrs: parseAttrs(attrText), openStart: m.index, openEnd: m.index + m[0].length, parent: cur, children: [] };
    cur.children.push(el);
    if (RAW.has(tag)) {
      const close = html.toLowerCase().indexOf(`</${tag}`, el.openEnd);
      if (close >= 0) re.lastIndex = close; // bỏ qua nội dung script/style
      continue;
    }
    if (!VOID.has(tag) && !/\/\s*$/.test(attrText)) cur = el;
  }
  return root;
}

function parseAttrs(text) {
  const attrs = {};
  for (const m of text.matchAll(/([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? "";
  }
  return attrs;
}

function* walk(el) {
  for (const c of el.children) {
    yield c;
    yield* walk(c);
  }
}

/** Đường dẫn ĐÚNG cách `hyperframes check` sinh (đã đọc source CLI 0.8.56, prepareContrast.selectorFor):
 * có id → `#id`; không → từ con của <body> xuống, mỗi cấp `tag` hoặc `tag:nth-of-type(k)` khi có >1
 * anh em cùng tag. */
function checkSelectorFor(el) {
  if (el.attrs.id) return `#${el.attrs.id}`;
  const parts = [];
  for (let c = el; c && c.tag !== "body" && c.tag !== "#document"; c = c.parent) {
    const same = c.parent ? c.parent.children.filter((x) => x.tag === c.tag) : [c];
    parts.push(same.length > 1 ? `${c.tag}:nth-of-type(${same.indexOf(c) + 1})` : c.tag);
  }
  return parts.reverse().join(" > ");
}

/** Áp danh sách chỉnh sửa {at, del, ins} theo thứ tự vị trí giảm dần (không lệch offset). */
function applyEdits(html, edits) {
  let out = html;
  for (const e of [...edits].sort((a, b) => b.at - a.at)) out = out.slice(0, e.at) + (e.ins ?? "") + out.slice(e.at + (e.del ?? 0));
  return out;
}

/** Xoá 1 thuộc tính khỏi thẻ mở: trả edit {at, del} theo vị trí tuyệt đối. */
function removeAttrEdit(html, el, name) {
  const open = html.slice(el.openStart, el.openEnd);
  const m = open.match(new RegExp(`\\s${name}\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s>]+)`, "i"));
  return m ? { at: el.openStart + m.index, del: m[0].length } : null;
}

/** Chèn thuộc tính ngay sau tên thẻ. */
function addAttrsEdit(el, text) {
  return { at: el.openStart + 1 + el.tag.length, ins: ` ${text}` };
}

const num = (v) => (v === undefined || v === "" ? NaN : Number(v));
const basename = (p) => String(p).split(/[\\/]/).pop();

/** Sửa cấu trúc <video>: lỗi lint `media_missing_data_start` / `video_nested_in_timed_element`.
 * - Video không nằm trong phần tử có data-start (ngoài root) mà thiếu data-start → gán timing shot.
 * - Video nằm trong đúng 1 phần tử timed BAO TRỌN scene (start≈0, duration≈scene) → timing của phần tử
 *   đó thừa (root đã giới hạn scene) → bỏ data-start/data-duration của nó, gán timing shot cho video.
 * - Trường hợp khác (vd lồng trong cửa sổ 1 shot) → không sửa, báo lại.
 * Timing shot: khớp `src` video ↔ file trong manifest → assetId → đúng 1 shot của scene dùng asset đó. */
export function autofixVideoTiming(html, { scene, shots, mediaById }) {
  const tree = parseElements(html);
  const els = [...walk(tree)];
  const root = els.find((e) => "data-composition-id" in e.attrs);
  const sceneDur = (scene.endMs - scene.startMs) / 1000;
  const edits = [];
  const changes = [];
  const skipped = [];
  const removedTiming = new Set();
  for (const v of els.filter((e) => e.tag === "video")) {
    const timedAnc = [];
    for (let a = v.parent; a && a !== root && a.tag !== "#document"; a = a.parent) if ("data-start" in a.attrs) timedAnc.push(a);
    const hasStart = "data-start" in v.attrs;
    if (hasStart && timedAnc.length === 0) continue; // đúng chuẩn
    const label = v.attrs.id ? `#${v.attrs.id}` : `video[src=${basename(v.attrs.src)}]`;
    if (timedAnc.length > 1) { skipped.push(`${label}: lồng ${timedAnc.length} tầng timed`); continue; }
    if (timedAnc.length === 1) {
      const a = timedAnc[0];
      const coversScene = Math.abs(num(a.attrs["data-start"])) < 0.02 && Math.abs(num(a.attrs["data-duration"]) - sceneDur) < 0.05;
      if (!coversScene) { skipped.push(`${label}: nằm trong cửa sổ timed không bao trọn scene (${a.attrs.id ? "#" + a.attrs.id : a.tag})`); continue; }
      if (!removedTiming.has(a)) {
        for (const n of ["data-start", "data-duration"]) { const e = removeAttrEdit(html, a, n); if (e) edits.push(e); }
        removedTiming.add(a);
        changes.push(`bỏ data-start/data-duration thừa trên ${a.attrs.id ? "#" + a.attrs.id : a.tag} (bao trọn scene ${sceneDur}s)`);
      }
    }
    if (!hasStart) {
      const ids = Object.values(mediaById).filter((m) => m?.file && basename(m.file) === basename(v.attrs.src)).map((m) => m.id);
      const matching = shots.filter((s) => ids.includes(s.assetId));
      if (matching.length !== 1) { skipped.push(`${label}: không xác định được đúng 1 shot dùng asset này (${matching.length})`); continue; }
      const s = matching[0];
      const attrs = [`data-start="${((s.startMs - scene.startMs) / 1000).toFixed(3)}"`, `data-duration="${((s.endMs - s.startMs) / 1000).toFixed(3)}"`];
      if (!("data-media-start" in v.attrs) && Number.isFinite(s.trimStartSec)) attrs.push(`data-media-start="${s.trimStartSec}"`);
      edits.push(addAttrsEdit(v, attrs.join(" ")));
      changes.push(`gán ${attrs.join(" ")} cho ${label} (shot ${s.id})`);
    }
  }
  return { html: edits.length ? applyEdits(html, edits) : html, changes, skipped };
}

function rgbToHex(rgb) {
  const m = String(rgb).match(/\d+(\.\d+)?/g);
  if (!m) return null;
  return "#" + m.slice(0, 3).map((v) => Math.round(Number(v)).toString(16).padStart(2, "0")).join("");
}

/** Chèn CSS vào ĐẦU khối <style> ĐẦU TIÊN — standaloneToSubComposition() chỉ giữ khối đầu tiên, khối
 * <style> khác sẽ MẤT khi ráp vào video. */
export function injectIntoFirstStyle(html, css) {
  const i = html.indexOf("<style>");
  if (i < 0) return null;
  return html.slice(0, i + 7) + `\n${css}\n` + html.slice(i + 7);
}

/** Sửa contrast sau check: CHỈ khi mọi finding `error` đều là contrast_aa_failure và MỌI finding đều
 * xác định chắc chắn đúng 1 phần tử (2 bộ parse độc lập — bộ tách thẻ có vị trí + linkedom — cùng khớp
 * đúng 1 phần tử, cùng tag/id/class, text khớp). Đổi màu chữ sang màu palette đạt chuẩn theo nền đo được
 * (ưu tiên ink/onDarkText) qua class RIÊNG theo scene (tránh rò CSS giữa các scene — bài học bug .clip). */
export function autofixContrast(html, checkRaw, { sceneId, tokens }) {
  let p;
  try {
    p = JSON.parse(checkRaw.slice(Math.max(0, checkRaw.indexOf("{"))));
  } catch {
    return { applied: false, reason: "không parse được JSON check" };
  }
  const errors = [];
  for (const c of ["lint", "runtime", "layout", "motion", "contrast"]) for (const f of p[c]?.findings ?? []) if (f.severity === "error") errors.push(f);
  if (!errors.length) return { applied: false, reason: "không có lỗi" };
  if (errors.some((f) => f.code !== "contrast_aa_failure")) return { applied: false, reason: "còn lỗi khác contrast" };

  const palette = [tokens.colors.ink, tokens.colors.onDarkText].filter(Boolean);
  const tree = parseElements(html);
  const els = [...walk(tree)];
  const { document } = parseHTML(html);
  const norm = (s) => String(s ?? "").replace(/\s+/g, " ").trim().replace(/…$/, "");
  const fixes = new Map(); // element -> color
  for (const f of errors) {
    const sel = String(f.selector || "").trim();
    const mine = sel.startsWith("#") ? els.filter((e) => `#${e.attrs.id}` === sel) : els.filter((e) => !e.attrs.id && checkSelectorFor(e) === sel);
    let theirs = [];
    try {
      theirs = [...document.querySelectorAll(sel.startsWith("#") ? sel : `body > ${sel}`)];
    } catch {
      return { applied: false, reason: `selector không hợp lệ: ${sel}` };
    }
    if (mine.length !== 1 || theirs.length !== 1) return { applied: false, reason: `selector không xác định đúng 1 phần tử (${mine.length}/${theirs.length}): ${sel}` };
    const [a, b] = [mine[0], theirs[0]];
    if (a.tag !== b.tagName.toLowerCase() || (a.attrs.class ?? "") !== (b.getAttribute("class") ?? "") || (a.attrs.id ?? "") !== (b.getAttribute("id") ?? "")) {
      return { applied: false, reason: `2 bộ parse lệch nhau tại ${sel}` };
    }
    if (f.text && !norm(b.textContent).includes(norm(f.text))) return { applied: false, reason: `text không khớp tại ${sel} (có thể do script sinh DOM động)` };
    const bg = rgbToHex(f.bg);
    const need = f.requiredRatio ?? 4.5;
    const color = bg && palette.map((c) => [c, contrastRatio(c, bg)]).filter(([, r]) => r >= need + 0.2).sort((x, y) => y[1] - x[1])[0]?.[0];
    if (!color) return { applied: false, reason: `không có màu palette đạt ${need}:1 trên nền ${f.bg}` };
    const prev = fixes.get(a);
    if (prev && prev !== color) return { applied: false, reason: `phần tử ${sel} cần 2 màu khác nhau ở các mốc (nền đổi theo thời gian)` };
    fixes.set(a, color);
  }

  const edits = [];
  const rules = [];
  const changes = [];
  let i = 0;
  for (const [el, color] of fixes) {
    const cls = `hf-cfix-${sceneId.toLowerCase()}-${++i}`;
    const clsAttr = el.attrText.match(/\sclass\s*=\s*(["'])([^"']*)\1/i);
    if (clsAttr) {
      const at = el.openStart + 1 + el.tag.length + clsAttr.index + clsAttr[0].length - 1;
      edits.push({ at, ins: ` ${cls}` });
    } else {
      edits.push(addAttrsEdit(el, `class="${cls}"`));
    }
    // Chữ SVG (<text>/<tspan>/<textPath>) lấy màu từ `fill`, không phải `color` — gặp thật ở hinh-phat S26.
    const svgText = ["text", "tspan", "textpath"].includes(el.tag);
    rules.push(`.${cls} { color: ${color} !important;${svgText ? ` fill: ${color} !important;` : ""} }`);
    changes.push(`${el.attrs.id ? "#" + el.attrs.id : checkSelectorFor(el)} → ${color}`);
  }
  const withClasses = applyEdits(html, edits);
  const out = injectIntoFirstStyle(withClasses, `/* hf-autofix contrast (tất định, màu palette) */\n${rules.join("\n")}`);
  if (!out) return { applied: false, reason: "không có khối <style> để chèn CSS" };
  return { applied: true, html: out, changes };
}
