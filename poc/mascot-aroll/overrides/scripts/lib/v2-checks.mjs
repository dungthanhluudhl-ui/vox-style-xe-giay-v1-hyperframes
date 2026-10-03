// POC mascot-aroll: kiểm tra TẤT ĐỊNH theo ADN v2 (chạy sau `hyperframes check`, trước reviewer).
// - Cảnh asset: không chữ nào trên hình, không <svg>/<canvas>, không xoay/skew.
// - Cảnh đồ hoạ: không xoay/skew, ≤3 khối chữ (1 punch phrase + 2 nhãn).
// - Chữ A-roll (vòng 5, thay mascot): đúng lúc từ neo narration, đủ thời gian đọc, trong shot, không lặp liền kề, ≤quota (lib/key-text*.mjs).
import { parseHTML } from "linkedom";
import { enterSec, minReadSec, fullyVisibleSec, EXIT_SEC, TEXT_FORMATS, treatmentLayout } from "./key-text.mjs";
import { keyTextProblems, keyTextQuotaProblems, matchAnchor } from "./key-text-plan.mjs";
import { tilingProblems } from "./scene-tiling.mjs";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "TITLE", "HEAD"]);

// === Chữ A-roll (ADN v2, vòng 5): luật TẤT ĐỊNH — nội dung/neo/quota ở lib/key-text-plan.mjs, thời gian/hình học ở đây và lib/key-text.mjs ===
export { TEXT_FORMATS };
const normText = (t) => String(t ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
export const wordCount = (t) => String(t ?? "").trim().split(/\s+/).filter(Boolean).length;

/** Thời gian chữ A-roll (lỗi cứng): chữ hiện ĐÚNG lúc từ neo được nói (≤1 khung 34ms, không sớm/muộn); hiện ĐẦY ĐỦ ≥ chuẩn đọc; kết thúc ≥150ms trước hết shot. */
export function keyTextTimingProblems(k, { shotEndMs, label = "chữ A-roll" } = {}) {
  const p = [];
  const holdSec = k.holdMs / 1000;
  const vis = fullyVisibleSec(k.text, k.format, holdSec, k.wordOffsets ?? null);
  const need = minReadSec(k.text);
  if (Number.isFinite(k.anchorStartMs) && Math.abs(k.atMs - k.anchorStartMs) > 34) p.push(`${label} "${k.text}": hiện lúc ${k.atMs}ms ≠ lúc narration nói từ neo ${k.anchorStartMs}ms (lệch ${k.atMs - k.anchorStartMs}ms; phải cùng lúc, không trước/sau).`);
  if (vis + 0.001 < need) p.push(`${label} "${k.text}": hiện đầy đủ chỉ ${vis.toFixed(2)}s, chuẩn đọc cần ≥${need.toFixed(2)}s — không kịp đọc.`);
  if (Number.isFinite(shotEndMs) && k.atMs + k.holdMs > shotEndMs - 150) p.push(`${label} "${k.text}": kết thúc ${k.atMs + k.holdMs}ms, sát/vượt hết shot (${shotEndMs}ms).`);
  return p;
}

/** Các khối chữ nhìn thấy: phần tử có text node trực tiếp không rỗng (bỏ script/style). */
export function textBlocks(html) {
  const { document } = parseHTML(html);
  const out = [];
  const walk = (el) => {
    if (SKIP_TAGS.has(el.tagName)) return;
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).filter(Boolean).join(" ");
    if (own) out.push({ tag: el.tagName.toLowerCase(), id: el.id || null, text: own.slice(0, 60) });
    for (const c of el.children) walk(c);
  };
  if (document.body) walk(document.body);
  return out;
}

/** Xoay/skew: CSS transform/rotate(), GSAP rotation/rotateX/Y/Z/skewX/Y khác 0.
 * `allowDiagram` (chỉ cảnh đồ hoạ — đúng đặc tả ADN v2: chữ/thẻ/media không xoay, còn BỘ PHẬN VẼ THUẦN không chứa chữ như
 * kim đồng hồ/mũi tên/máy bay trong sơ đồ được xoay khi đó là ý nghĩa của shot): chỉ coi là lỗi khi phần tử bị xoay
 * (tìm theo selector của lệnh GSAP/quy tắc CSS) chứa chữ, <img>/<video>, hoặc không xác định được selector. */
export function rotationProblems(html, { allowDiagram = false } = {}) {
  const problems = [];
  const zero = (v) => /^[-+]?0+(\.0+)?(deg|rad|turn)?$/.test(v.trim().replace(/['"]/g, ""));
  let doc = null;
  const targetOk = (sel) => {
    if (!allowDiagram || !sel) return false;
    try {
      doc ??= parseHTML(html).document;
      const els = [...doc.querySelectorAll(sel)];
      if (!els.length) return false;
      return els.every((el) => !/^(IMG|VIDEO)$/.test(el.tagName) && !el.querySelector("img,video") && !(el.textContent ?? "").trim());
    } catch { return false; }
  };
  const gsapSelectorBefore = (idx) => {
    const re = /\b(?:tl|gsap)\.(?:to|from|fromTo|set)\(\s*(["'`])([^"'`]+)\1/g;
    let m, last = null;
    while ((m = re.exec(html)) && m.index < idx) last = m[2];
    return last;
  };
  const cssSelectorBefore = (idx) => {
    const open = html.lastIndexOf("{", idx);
    if (open < 0) return null;
    const close = html.lastIndexOf("}", open);
    const sel = html.slice(close + 1, open).trim();
    return sel && !/[<>@]/.test(sel) ? sel : null;
  };
  for (const m of html.matchAll(/\b(rotate|rotateX|rotateY|rotateZ|rotate3d|skew|skewX|skewY)\s*\(\s*([^)]*)\)/g)) {
    // Thuộc tính transform="rotate(a cx cy)" trên phần tử SVG: xử lý ở vòng dưới (theo từng phần tử), bỏ qua ở đây.
    if (/\btransform\s*=\s*["'][^"']*$/.test(html.slice(Math.max(0, m.index - 80), m.index))) continue;
    if (!zero(m[2].split(/[,\s]+/)[0]) && !targetOk(cssSelectorBefore(m.index))) problems.push(`CSS ${m[1]}(${m[2].trim().slice(0, 20)})`);
  }
  // Phần tử có thuộc tính transform (SVG): chỉ cho phép nếu nằm trong <svg> VÀ là bộ phận vẽ thuần (không chữ/ảnh/video) VÀ allowDiagram.
  try {
    doc ??= parseHTML(html).document;
    for (const el of doc.querySelectorAll("[transform]")) {
      const tf = el.getAttribute("transform") ?? "";
      for (const m of tf.matchAll(/\b(rotate|skewX|skewY|skew)\s*\(\s*([^)]*)\)/g)) {
        if (zero(m[2].split(/[,\s]+/)[0])) continue;
        const pure = allowDiagram && el.closest("svg") && !el.querySelector("text,tspan,img,video") && !/^(TEXT|TSPAN|IMG|VIDEO)$/.test(el.tagName) && !(el.textContent ?? "").trim();
        if (!pure) problems.push(`SVG transform ${m[1]}(${m[2].trim().slice(0, 20)}) trên <${el.tagName.toLowerCase()}>`);
      }
    }
  } catch { /* html không parse được: bỏ qua vòng này */ }
  for (const m of html.matchAll(/\b(rotation|rotate|rotateX|rotateY|rotateZ|skewX|skewY)\s*:\s*([^,}\s]+)/g)) {
    if (!zero(m[2]) && !targetOk(gsapSelectorBefore(m.index))) problems.push(`GSAP ${m[1]}: ${m[2]}`);
  }
  return [...new Set(problems)];
}

export function checkAssetScene(html, { keyText = false } = {}) {
  const problems = [];
  if (keyText) {
    // Cảnh asset CÓ chữ A-roll: được phép đúng 1 khối #kt-1 (do builder tất định tạo); mọi chữ khác vẫn bị cấm.
    const { document } = parseHTML(html);
    const blocks = [...document.querySelectorAll("#kt-1")];
    if (blocks.length > 1) problems.push(`Cảnh asset có ${blocks.length} khối chữ A-roll, tối đa 1.`);
    blocks.forEach((e) => e.remove());
    html = document.toString();
  }
  const t = textBlocks(html);
  if (t.length) problems.push(`Cảnh asset KHÔNG được có chữ trên hình (ADN v2) nhưng có ${t.length} khối chữ: ${t.slice(0, 3).map((b) => `<${b.tag}>"${b.text}"`).join(", ")}`);
  if (/<svg[\s>]/i.test(html)) problems.push("Cảnh asset KHÔNG được có <svg> (icon/diagram/nét vẽ) trên media (ADN v2).");
  if (/<canvas[\s>]/i.test(html)) problems.push("Cảnh asset không được dùng <canvas>.");
  problems.push(...rotationProblems(html).map((p) => `Cấm xoay/skew (ADN v2): ${p}`));
  return problems;
}

export function checkGraphicsScene(html) {
  const problems = [];
  const t = textBlocks(html);
  if (t.length > 3) problems.push(`Cảnh đồ hoạ có ${t.length} khối chữ, tối đa 3 (1 punch phrase + 2 nhãn): ${t.map((b) => `"${b.text}"`).join(", ")}`);
  problems.push(...rotationProblems(html, { allowDiagram: true }).map((p) => `Cấm xoay/skew chữ/thẻ/media (ADN v2; chỉ bộ phận vẽ thuần không chứa chữ như kim/mũi tên mới được xoay): ${p}`));
  return problems;
}

/** Bài học dua-inox-han-quoc S09: `container_overflow` của media chỉ là warning nên lọt tới render (video tràn khung →
 * mảng đen). Ở v2 coi overflow mức warning/error của phần tử media là lỗi cứng; mức `info` (nằm trong
 * wrapper overflow:hidden, vd lưới nền trôi) vẫn được phép. `raw` = JSON của `hyperframes check --json`. */
export function overflowProblems(raw) {
  let d;
  try { d = JSON.parse(raw.slice(raw.indexOf("{"))); } catch { return []; }
  const out = [];
  for (const f of d?.layout?.findings ?? []) {
    if (f.code !== "container_overflow" || f.severity === "info") continue;
    if (/video|img|photo|media|capy|asset|stage|actor/i.test(f.selector ?? "")) out.push(`container_overflow (${f.severity}) trên ${f.selector}: tràn ${JSON.stringify(f.overflow)} — media/mascot phải nằm gọn trong khung (đặt trong wrapper có width/height px cố định + overflow:hidden).`);
  }
  return [...new Set(out)];
}

/** Kiểm chéo shotlist/plan sau Stage 6 (tất định). Trả danh sách lỗi (rỗng = ổn).
 * [vòng 5] Mascot đã bỏ. Chữ A-roll: cảnh asset có `keyText` ở plan có thể (hoặc không, nếu Stage 6 BỎ vì không đủ chỗ đọc — lý do ghi ở shot.keyTextDropped)
 * có `keyText` ở ĐÚNG MỘT shot: đúng lúc từ neo, đủ thời gian đọc, trong shot, treatment hợp lệ, không lặp treatment liền trước. */
export function validatePlanAndShots(scenes, shots, mediaById) {
  const problems = [];
  const byScene = Object.fromEntries(scenes.map((s) => [s.id, []]));
  for (const sh of shots) (byScene[sh.sceneId] ??= []).push(sh);
  let prevTreatment = null;
  for (const sc of scenes) {
    const list = (byScene[sc.id] ?? []).sort((a, b) => a.startMs - b.startMs);
    if (!list.length) { problems.push(`Scene ${sc.id} không có shot nào.`); continue; }
    if (list[0].startMs !== sc.startMs || list[list.length - 1].endMs !== sc.endMs) problems.push(`Scene ${sc.id}: các shot không phủ đúng ${sc.startMs}–${sc.endMs}ms.`);
    for (let i = 1; i < list.length; i++) if (list[i].startMs !== list[i - 1].endMs) problems.push(`Scene ${sc.id}: khoảng hở/chồng giữa ${list[i - 1].id} và ${list[i].id}.`);
    if (sc.kind === "graphics") {
      const nOv = list.reduce((a, sh) => a + (sh.overlays ?? []).length, 0);
      if (nOv > 3) problems.push(`Scene ${sc.id} (đồ hoạ) có ${nOv} overlay chữ, tối đa 3 cho cả cảnh (1 punch phrase + 2 nhãn) — gộp tên các bước vào nhãn dạng "A • B • C", nút/bước còn lại là hình không chữ.`);
    }
    for (const sh of list) {
      if (sc.kind === "asset") {
        if ((sh.overlays ?? []).length) problems.push(`Shot ${sh.id} của cảnh asset phải overlays=[] (ADN v2).`);
        if (sh.assetId && !mediaById[sh.assetId]) problems.push(`Shot ${sh.id}: assetId "${sh.assetId}" không có trong manifest.`);
        if (!sh.assetId) problems.push(`Shot ${sh.id} của cảnh asset phải có assetId.`);
      }
      if (sh.presentationMode === "mascot" || sh.mascotBeat || sh.mascotAssetId) problems.push(`Shot ${sh.id}: mascot đã bỏ ở vòng 5 — dùng chữ A-roll (keyText).`);
    }
    const withKt = list.filter((x) => x.keyText);
    if (withKt.length > 1) problems.push(`Scene ${sc.id}: ${withKt.length} shot có chữ A-roll, tối đa 1 cho cả cảnh.`);
    if (withKt.length && !(sc.kind === "asset" && sc.keyText)) problems.push(`Scene ${sc.id}: có chữ A-roll ở shot nhưng plan không có keyText ở cảnh asset này.`);
    for (const sh of withKt) {
      const kt = sh.keyText;
      const box = sh.mediaFit === "contain" ? sh.containBox : { x: 0, y: 0, w: 1080, h: 1920 };
      const layout = treatmentLayout(kt.treatment, box, sh.mediaFit);
      if (!layout.valid) problems.push(`Shot ${sh.id}: treatment "${kt.treatment}" không hợp lệ cho asset này: ${layout.why}.`);
      if (!TEXT_FORMATS.includes(kt.format)) problems.push(`Shot ${sh.id}: hình thức chữ "${kt.format}" không hợp lệ.`);
      problems.push(...keyTextTimingProblems(kt, { shotEndMs: sh.endMs, label: `Shot ${sh.id} chữ` }));
      if (kt.atMs < sh.startMs) problems.push(`Shot ${sh.id}: chữ bắt đầu ${kt.atMs}ms trước shot (${sh.startMs}ms).`);
      if (normText(kt.text) !== normText(sc.keyText?.text)) problems.push(`Shot ${sh.id}: chữ khác keyText của plan (không được sửa chữ).`);
      if (prevTreatment && prevTreatment === kt.treatment) problems.push(`Shot ${sh.id}: treatment "${kt.treatment}" trùng lần chữ liền trước.`);
      prevTreatment = kt.treatment;
    }
  }
  return problems;
}

/** Cảnh báo MỀM của plan (không chặn, chỉ yêu cầu gọi lại 1 lần): cảnh asset dài >12s chỉ 1 asset; đa dạng kiểu trình bày cảnh asset (không kiểu nào >35% khi có ≥6 cảnh asset). */
export function softPlanWarnings(scenes, mediaById = {}) {
  const warn = [];
  // Cảnh asset dài >12s mà chỉ có MỘT asset (ảnh tĩnh trôi chậm, hoặc video 8s rồi giữ khung) → người xem thấy "đơ": chia thêm asset/cảnh đồ hoạ (đo 03/10: thiên-an-môn S09 27s một ảnh).
  for (const s of scenes) {
    if (s.kind !== "asset" || (s.assetIds ?? []).length !== 1) continue;
    const d = (s.endMs - s.startMs) / 1000;
    if (d > 12) warn.push(`${s.id}: cảnh asset dài ${d.toFixed(1)}s chỉ với MỘT asset (${s.assetIds[0]}${mediaById[s.assetIds[0]]?.type === "video" ? ", video chỉ 8s rồi giữ khung" : ", ảnh tĩnh"}) — dễ "đơ": tách cảnh (thêm cảnh đồ hoạ cho phần còn lại) hoặc dùng thêm asset, mỗi cảnh một asset ≲12s.`);
  }
  const assets = scenes.filter((s) => s.kind === "asset");
  if (assets.length >= 6) {
    const cnt = {};
    for (const s of assets) cnt[s.presentationStyle] = (cnt[s.presentationStyle] ?? 0) + 1;
    for (const [style, n] of Object.entries(cnt)) if (n / assets.length > 0.35) warn.push(`presentationStyle "${style}" chiếm ${n}/${assets.length} cảnh asset (>35%) — đa dạng hoá kiểu trình bày.`);
  }
  return warn;
}

/** Cảnh báo MỀM chữ A-roll (không chặn): ≥3 lần chữ mà một treatment chiếm >60% → đa dạng hơn. */
export function softShotWarnings(scenes, shots) {
  const w = [];
  const ks = shots.filter((s) => s.keyText);
  if (ks.length >= 3) {
    const cnt = {};
    for (const s of ks) cnt[s.keyText.treatment] = (cnt[s.keyText.treatment] ?? 0) + 1;
    for (const [t, n] of Object.entries(cnt)) if (n / ks.length > 0.6) w.push(`Treatment "${t}" chiếm ${n}/${ks.length} lần chữ (>60%) — đa dạng hơn.`);
  }
  return w;
}

/** Kiểm tra plan (Stage 5): scene nối liền mạch, kind asset|graphics, chữ A-roll (nội dung, neo khớp lời thoại, hạn mức), nền/kiểu trình bày liền kề không trùng.
 * captions = mốc từng từ (để kiểm điểm neo); không truyền thì bỏ qua kiểm neo. */
export function validatePlan(scenes, scriptAll = "", totalMs = 0, captions = null) {
  const problems = [...tilingProblems(scenes, totalMs)]; // scene phải nối LIỀN MẠCH toàn audio (khe hở = khung đen giữa 2 scene)
  let prevBg = null;
  let prevStyle = null;
  for (const sc of scenes) {
    if (!["asset", "graphics"].includes(sc.kind)) problems.push(`${sc.id}: kind="${sc.kind}" không hợp lệ (asset|graphics) — mascot đã bỏ ở vòng 5.`);
    if (sc.mascotIntent) problems.push(`${sc.id}: mascotIntent đã bỏ ở vòng 5 — muốn nhấn mạnh narration dùng keyText (chữ A-roll) ở cảnh asset.`);
    if (sc.keyText) {
      if (sc.kind !== "asset") problems.push(`${sc.id}: keyText chỉ được ở cảnh asset.`);
      else {
        problems.push(...keyTextProblems(sc.keyText, sc, scriptAll));
        if (captions) { const a = matchAnchor(captions, sc, sc.keyText.anchorPhrase); if (a.error) problems.push(`${sc.id}: ${a.error}.`); }
      }
    }
    if (sc.kind === "asset") {
      if (!sc.backgroundVariant) prevBg = null; // cảnh asset che kín nền → hai cảnh có nền nhìn thấy cách nhau bởi cảnh asset không còn là "liền kề" (trừ cảnh asset có media contain hoặc chữ dùng nền giấy: nền nhìn thấy)
      if (!(sc.assetIds ?? []).length) problems.push(`${sc.id}: cảnh asset phải có assetIds.`);
      if (prevStyle && sc.presentationStyle === prevStyle) problems.push(`${sc.id}: presentationStyle "${sc.presentationStyle}" trùng cảnh asset liền trước.`);
      prevStyle = sc.presentationStyle;
    }
    if (sc.kind !== "asset" || sc.backgroundVariant) {
      if (prevBg && sc.backgroundVariant === prevBg.variant && sc.driftDir === prevBg.dir) problems.push(`${sc.id}: nền "${sc.backgroundVariant}"/${sc.driftDir} trùng cảnh có nền liền trước.`);
      prevBg = { variant: sc.backgroundVariant, dir: sc.driftDir };
    }
  }
  problems.push(...keyTextQuotaProblems(scenes));
  return problems;
}
