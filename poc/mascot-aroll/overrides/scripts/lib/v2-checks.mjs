// POC mascot-aroll: kiểm tra TẤT ĐỊNH theo ADN v2 (chạy sau `hyperframes check`, trước reviewer).
// - Cảnh asset: không chữ nào trên hình, không <svg>/<canvas>, không xoay/skew.
// - Cảnh đồ hoạ: không xoay/skew, ≤3 khối chữ (1 punch phrase + 2 nhãn).
// - Cảnh mascot: do builder tất định tạo (vẫn quét xoay để chắc chắn).
import { parseHTML } from "linkedom";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "TITLE", "HEAD"]);

// === Chữ bổ trợ cho cảnh mascot (ADN v2, vòng 3): luật TẤT ĐỊNH ===
export const TEXT_FORMATS = ["thought", "quote", "punch", "question", "sticky", "stamp"];
export const TEXT_PURPOSES = ["hỏi", "khẳng định", "cảm thán", "ví von", "chốt"];
const SERIOUS_POSES = /host-(serious|concerned|sad)$/;
const SERIOUS_ROLES = new Set(["sensitive_fact", "empathy", "consequence"]);
const normText = (t) => String(t ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
export const wordCount = (t) => String(t ?? "").trim().split(/\s+/).filter(Boolean).length;

/** Kiểm chữ mascot (textIntent): ≤9 từ, không emoji, không chép nguyên văn lời thoại, số/tên riêng phải có trong kịch bản, format/purpose hợp lệ. */
export function mascotTextProblems(ti, scriptAll, sid) {
  const p = [];
  const text = String(ti?.text ?? "").trim();
  if (!text) return [`${sid}: textIntent.text rỗng.`];
  if (!TEXT_FORMATS.includes(ti.format)) p.push(`${sid}: textIntent.format "${ti.format}" không thuộc ${TEXT_FORMATS.join("|")}.`);
  if (!TEXT_PURPOSES.includes(ti.purpose)) p.push(`${sid}: textIntent.purpose "${ti.purpose}" không thuộc ${TEXT_PURPOSES.join("|")}.`);
  const n = wordCount(text);
  if (n > 9) p.push(`${sid}: chữ mascot dài ${n} từ (tối đa 9): "${text}".`);
  if (/\p{Extended_Pictographic}/u.test(text)) p.push(`${sid}: chữ mascot có emoji.`);
  const ns = normText(scriptAll), nt = normText(text);
  if (nt.split(" ").length >= 2 && ns.includes(nt)) p.push(`${sid}: chữ mascot "${text}" chép NGUYÊN VĂN lời thoại — phải bổ sung ý mới, không đọc lại.`);
  for (const d of text.match(/\d[\d.,]*/g) ?? []) if (!ns.includes(normText(d))) p.push(`${sid}: chữ mascot có số "${d}" không có trong kịch bản (không được bịa).`);
  const toks = text.split(/\s+/).slice(1).map((t) => t.replace(/[^\p{L}\p{N}]/gu, "")).filter((t) => t.length >= 2 && /^\p{Lu}/u.test(t) && t !== t.toUpperCase());
  for (const t of toks) if (!ns.includes(normText(t))) p.push(`${sid}: chữ mascot có tên riêng "${t}" không có trong kịch bản (không được bịa).`);
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
 * `allowDiagram` (chỉ cảnh đồ hoạ — đúng đặc tả ADN v2: chữ/thẻ/media/mascot không xoay, còn BỘ PHẬN VẼ THUẦN không chứa chữ như
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

export function checkAssetScene(html) {
  const problems = [];
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

export function checkMascotScene(html, { maxBlocks = 99 } = {}) {
  const problems = rotationProblems(html).map((p) => `Cấm xoay/skew (ADN v2): ${p}`);
  const { document } = parseHTML(html);
  const blocks = [...document.querySelectorAll("[id^='tb-']")].filter((e) => /^tb-\d+$/.test(e.id));
  if (blocks.length > maxBlocks) problems.push(`Cảnh mascot có ${blocks.length} khối chữ, tối đa ${maxBlocks} (1/shot).`);
  for (const b of blocks) {
    const n = wordCount(b.textContent);
    if (n > 9) problems.push(`Khối chữ #${b.id} dài ${n} từ (tối đa 9).`);
  }
  const stray = textBlocks(html).filter((t) => {
    const el = t.id ? document.getElementById(t.id) : null;
    return !(el && el.closest("[id^='tb-']")) && !blocks.some((b) => b.textContent.includes(t.text.slice(0, 20)));
  });
  if (stray.length) problems.push(`Cảnh mascot có chữ NGOÀI khối chữ bổ trợ: ${stray.slice(0, 3).map((b) => `"${b.text}"`).join(", ")}`);
  return problems;
}

/** Bài học dua-inox-han-quoc S09: `container_overflow` của media chỉ là warning nên lọt tới render (video tràn khung →
 * mảng đen). Ở v2 coi overflow mức warning/error của phần tử media/mascot là lỗi cứng; mức `info` (nằm trong
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

/** Kiểm chéo shotlist/plan sau Stage 6 (tất định). Trả danh sách lỗi (rỗng = ổn). */
export function validatePlanAndShots(scenes, shots, kit, mediaById) {
  const problems = [];
  const byScene = Object.fromEntries(scenes.map((s) => [s.id, []]));
  for (const sh of shots) (byScene[sh.sceneId] ??= []).push(sh);
  let prevMascotPose = null;
  for (const sc of scenes) {
    const list = (byScene[sc.id] ?? []).sort((a, b) => a.startMs - b.startMs);
    if (!list.length) { problems.push(`Scene ${sc.id} không có shot nào.`); continue; }
    if (list[0].startMs !== sc.startMs || list[list.length - 1].endMs !== sc.endMs) problems.push(`Scene ${sc.id}: các shot không phủ đúng ${sc.startMs}–${sc.endMs}ms.`);
    for (let i = 1; i < list.length; i++) if (list[i].startMs !== list[i - 1].endMs) problems.push(`Scene ${sc.id}: khoảng hở/chồng giữa ${list[i - 1].id} và ${list[i].id}.`);
    if (sc.kind === "mascot") {
      for (const sh of list) {
        if (sh.presentationMode !== "mascot") problems.push(`Shot ${sh.id} của cảnh mascot phải presentationMode="mascot".`);
        if (!kit.byId[sh.mascotAssetId]) problems.push(`Shot ${sh.id}: mascotAssetId "${sh.mascotAssetId}" không có trong kit.`);
        if (sh.assetId) problems.push(`Shot ${sh.id}: shot mascot không được kèm assetId (không ghép media).`);
        if ((sh.overlays ?? []).length) problems.push(`Shot ${sh.id}: shot mascot không có overlay.`);
        if ((sh.textEvents ?? []).length > 1) problems.push(`Shot ${sh.id}: tối đa 1 khối chữ/shot (có ${sh.textEvents.length}).`);
        for (const ev of sh.textEvents ?? []) {
          if (!TEXT_FORMATS.includes(ev.format)) problems.push(`Shot ${sh.id}: textEvent.format "${ev.format}" không hợp lệ.`);
          if (!(ev.holdMs >= 1500)) problems.push(`Shot ${sh.id}: chữ giữ ${ev.holdMs}ms (<1500ms, không kịp đọc).`);
          if (ev.atMs < sh.startMs || ev.atMs + ev.holdMs > sh.endMs + 60) problems.push(`Shot ${sh.id}: chữ (${ev.atMs}+${ev.holdMs}ms) vượt ngoài shot ${sh.startMs}–${sh.endMs}.`);
          const want = sc.mascotIntent?.textIntent?.text;
          if (want && normText(ev.text) !== normText(want)) problems.push(`Shot ${sh.id}: textEvent.text khác textIntent của scene (không được sửa chữ).`);
        }
        if (sh.animationPreset !== "slide-bob") problems.push(`Shot ${sh.id}: animationPreset phải "slide-bob".`);
        if (sh.lipSync) problems.push(`Shot ${sh.id}: lipSync phải false.`);
        if (prevMascotPose && prevMascotPose === sh.mascotAssetId) problems.push(`Shot ${sh.id}: trùng pose với shot mascot liền trước (${sh.mascotAssetId}).`);
        prevMascotPose = sh.mascotAssetId;
      }
      const nEv = list.reduce((a, sh) => a + (sh.textEvents ?? []).length, 0);
      if (sc.mascotIntent?.textIntent?.text && nEv !== 1) problems.push(`Scene ${sc.id} (mascot) phải có đúng 1 khối chữ (có ${nEv}).`);
      const dur = (sc.endMs - sc.startMs) / 1000;
      if (dur < 2.9 || dur > 5.2) problems.push(`Scene ${sc.id} (mascot) dài ${dur.toFixed(2)}s, ngoài khoảng 3–5s.`);
      if (dur > 3.6 && list.length < 2) problems.push(`Scene ${sc.id} (mascot) dài ${dur.toFixed(2)}s >3,5s phải tách 2 shot đổi pose.`);
    } else {
      if (sc.kind === "graphics") {
        const nOv = list.reduce((a, sh) => a + (sh.overlays ?? []).length, 0);
        if (nOv > 3) problems.push(`Scene ${sc.id} (đồ hoạ) có ${nOv} overlay chữ, tối đa 3 cho cả cảnh (1 punch phrase + 2 nhãn) — gộp tên các bước vào nhãn dạng "A • B • C", nút/bước còn lại là hình không chữ.`);
      }
      prevMascotPose = null;
      for (const sh of list) {
        if (sc.kind === "asset") {
          if ((sh.overlays ?? []).length) problems.push(`Shot ${sh.id} của cảnh asset phải overlays=[] (ADN v2).`);
          if (sh.assetId && !mediaById[sh.assetId]) problems.push(`Shot ${sh.id}: assetId "${sh.assetId}" không có trong manifest.`);
          if (!sh.assetId) problems.push(`Shot ${sh.id} của cảnh asset phải có assetId.`);
        }
        if (sh.presentationMode === "mascot" || sh.mascotAssetId) problems.push(`Shot ${sh.id} không thuộc cảnh mascot nhưng có mascot.`);
      }
    }
  }
  return problems;
}

/** Cảnh báo MỀM của plan (không chặn, chỉ yêu cầu gọi lại 1 lần): luật chỉ có trong prompt nay đo tất định.
 * - Đa dạng kiểu trình bày cảnh asset: không kiểu nào >35% khi có ≥6 cảnh asset.
 * - Phân bố mascot: không dồn ≥3 cảnh mascot trong 3 cảnh liên tiếp; video ≥12 cảnh có mascot thì phải có ở 1/3 cuối; mascot >30% số cảnh. */
export function softPlanWarnings(scenes) {
  const warn = [];
  const assets = scenes.filter((s) => s.kind === "asset");
  if (assets.length >= 6) {
    const cnt = {};
    for (const s of assets) cnt[s.presentationStyle] = (cnt[s.presentationStyle] ?? 0) + 1;
    for (const [style, n] of Object.entries(cnt)) if (n / assets.length > 0.35) warn.push(`presentationStyle "${style}" chiếm ${n}/${assets.length} cảnh asset (>35%) — đa dạng hoá kiểu trình bày.`);
  }
  const m = scenes.map((s) => s.kind === "mascot");
  const nm = m.filter(Boolean).length;
  if (nm / scenes.length > 0.3) warn.push(`Mascot chiếm ${nm}/${scenes.length} cảnh (>30%) — chỉ dùng khi nhịp người kể thật sự cần.`);
  const mas = scenes.filter((s) => s.kind === "mascot");
  for (let i = 0; i + 2 < mas.length; i++) if ([0, 1, 2].every((k) => SERIOUS_ROLES.has(mas[i + k].mascotIntent?.narrativeRole))) { warn.push(`3 cảnh mascot liên tiếp thuộc nhóm nghiêm (${mas[i].id}-${mas[i + 2].id}) — đa dạng tông biểu cảm.`); break; }
  for (let i = 0; i + 2 < m.length; i++) if (m[i] && m[i + 1] && m[i + 2]) { warn.push(`3 cảnh mascot liên tiếp (${scenes[i].id}-${scenes[i + 2].id}) — dồn một đoạn.`); break; }
  if (scenes.length >= 12 && nm >= 1) {
    const total = scenes[scenes.length - 1].endMs;
    if (!scenes.some((s) => s.kind === "mascot" && s.startMs >= (total * 2) / 3)) warn.push("Không có cảnh mascot nào ở 1/3 cuối video — video không được nhạt dần về cuối.");
  }
  return warn;
}

/** Cảnh báo MỀM shot mascot (không chặn): mỗi pose ≤2 lần/video; không ≥3 shot mascot liên tiếp pose nghiêm (serious/concerned/sad). */
export function softShotWarnings(scenes, shots) {
  const w = [];
  const ms = shots.filter((s) => s.presentationMode === "mascot" && s.mascotAssetId).sort((a, b) => a.startMs - b.startMs);
  const cnt = {};
  for (const s of ms) cnt[s.mascotAssetId] = (cnt[s.mascotAssetId] ?? 0) + 1;
  for (const [id, n] of Object.entries(cnt)) if (n > 2) w.push(`Pose ${id} dùng ${n} lần (>2) — đa dạng biểu cảm hơn.`);
  for (let i = 0; i + 2 < ms.length; i++) if ([0, 1, 2].every((k) => SERIOUS_POSES.test(ms[i + k].mascotAssetId))) { w.push(`3 shot mascot liên tiếp pose nghiêm (${ms[i].id}…${ms[i + 2].id}).`); break; }
  return w;
}

/** Kiểm tra plan (Stage 5): kind hợp lệ, mascot không kèm asset, nền liền kề không trùng, không kiểu trình bày liền kề trùng. */
export function validatePlan(scenes, kit, scriptAll = "") {
  const problems = [];
  let prevBg = null;
  let prevStyle = null;
  let prevFormat = null;
  const roles = new Set(Object.values(kit.byId).map((a) => a.narrativeRole));
  for (const sc of scenes) {
    if (!["asset", "mascot", "graphics"].includes(sc.kind)) problems.push(`${sc.id}: kind="${sc.kind}" không hợp lệ (asset|mascot|graphics).`);
    if (sc.kind === "mascot") {
      if ((sc.assetIds ?? []).length) problems.push(`${sc.id}: cảnh mascot không được kèm assetIds.`);
      if (!sc.mascotIntent?.narrativeRole || !roles.has(sc.mascotIntent.narrativeRole)) problems.push(`${sc.id}: mascotIntent.narrativeRole "${sc.mascotIntent?.narrativeRole}" không có trong kit.`);
      const ti = sc.mascotIntent?.textIntent;
      if (!ti) problems.push(`${sc.id}: cảnh mascot thiếu mascotIntent.textIntent (chữ bổ trợ).`);
      else {
        problems.push(...mascotTextProblems(ti, scriptAll, sc.id));
        if (prevFormat && ti.format === prevFormat) problems.push(`${sc.id}: định dạng chữ "${ti.format}" trùng cảnh mascot liền trước.`);
        prevFormat = ti.format;
      }
      // Độ dài phải kiểm Ở STAGE 5 (ranh giới scene thuộc về plan): Stage 6 không đổi được ranh giới nên bắt ở đó chỉ lặp lỗi (flydubai S21 6,76s).
      const dur = (sc.endMs - sc.startMs) / 1000;
      if (dur < 2.9 || dur > 5.2) problems.push(`${sc.id}: cảnh mascot dài ${dur.toFixed(2)}s, ngoài 3–5s — thu ngắn cảnh mascot về 3–5s (phần lời thoại thừa thuộc cảnh asset/graphics liền kề) hoặc không dùng mascot cho đoạn này.`);
    }
    if (sc.kind === "asset") {
      if (!sc.backgroundVariant) prevBg = null; // cảnh asset che kín nền → hai cảnh có nền nhìn thấy cách nhau bởi cảnh asset không còn là "liền kề" (trừ cảnh asset có media contain: nền nhìn thấy)
      if (!(sc.assetIds ?? []).length) problems.push(`${sc.id}: cảnh asset phải có assetIds.`);
      if (prevStyle && sc.presentationStyle === prevStyle) problems.push(`${sc.id}: presentationStyle "${sc.presentationStyle}" trùng cảnh asset liền trước.`);
      prevStyle = sc.presentationStyle;
    }
    if (sc.kind !== "asset" || sc.backgroundVariant) {
      if (prevBg && sc.backgroundVariant === prevBg.variant && sc.driftDir === prevBg.dir) problems.push(`${sc.id}: nền "${sc.backgroundVariant}"/${sc.driftDir} trùng cảnh có nền liền trước.`);
      prevBg = { variant: sc.backgroundVariant, dir: sc.driftDir };
    }
  }
  return problems;
}
