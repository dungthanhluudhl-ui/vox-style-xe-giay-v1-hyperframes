// POC mascot-aroll: kiểm tra TẤT ĐỊNH theo ADN v2 (chạy sau `hyperframes check`, trước reviewer).
// - Cảnh asset: không chữ nào trên hình, không <svg>/<canvas>, không xoay/skew.
// - Cảnh đồ hoạ: không xoay/skew, ≤3 khối chữ (1 punch phrase + 2 nhãn).
// - Cảnh mascot: do builder tất định tạo (vẫn quét xoay để chắc chắn).
import { parseHTML } from "linkedom";
import { enterSec, minReadSec, fullyVisibleSec, EXIT_SEC, MAX_TEXT_CHARS } from "./mascot-text.mjs";
import { BEAT_MIN_LEAD_SEC, BEAT_MIN_LAST_SHOT_SEC, BEAT_MAX_SEC, beatNeedSec } from "./beat-plan.mjs";
import { BEAT_LAYOUTS } from "./mascot-scene.mjs";
import { tilingProblems } from "./scene-tiling.mjs";

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
  if (text.length > MAX_TEXT_CHARS) p.push(`${sid}: chữ mascot dài ${text.length} ký tự (tối đa ${MAX_TEXT_CHARS}) — chữ dài không đủ thời gian đọc trong beat ≤7s: "${text}".`);
  if (/\p{Extended_Pictographic}/u.test(text)) p.push(`${sid}: chữ mascot có emoji.`);
  const ns = normText(scriptAll), nt = normText(text);
  if (nt.split(" ").length >= 2 && ns.includes(nt)) p.push(`${sid}: chữ mascot "${text}" chép NGUYÊN VĂN lời thoại — phải bổ sung ý mới, không đọc lại.`);
  for (const d of text.match(/\d[\d.,]*/g) ?? []) if (!ns.includes(normText(d))) p.push(`${sid}: chữ mascot có số "${d}" không có trong kịch bản (không được bịa).`);
  const toks = text.split(/\s+/).slice(1).map((t) => t.replace(/[^\p{L}\p{N}]/gu, "")).filter((t) => t.length >= 2 && /^\p{Lu}/u.test(t) && t !== t.toUpperCase());
  for (const t of toks) if (!ns.includes(normText(t))) p.push(`${sid}: chữ mascot có tên riêng "${t}" không có trong kịch bản (không được bịa).`);
  return p;
}

/** Thời gian chữ mascot (lỗi cứng): hiện ĐẦY ĐỦ ≥ chuẩn đọc ADN `max(1,5s; 0,5s+70ms×ký tự)`; chữ không bắt đầu muộn hơn `maxLateSec`
 * sau `refStartMs` (lúc mascot bắt đầu xuất hiện); chữ kết thúc trước `limitEndMs` (hết shot/beat). */
export function textTimingProblems(ev, { refStartMs, limitEndMs, maxLateSec = 0.6, label = "chữ mascot" }) {
  const p = [];
  const holdSec = ev.holdMs / 1000;
  const vis = fullyVisibleSec(ev.text, ev.format, holdSec);
  const need = minReadSec(ev.text);
  if (vis + 0.001 < need) p.push(`${label} "${ev.text}": hiện đầy đủ chỉ ${vis.toFixed(2)}s, chuẩn đọc cần ≥${need.toFixed(2)}s (giữ ${holdSec.toFixed(2)}s gồm vào ${enterSec(ev.format, ev.text).toFixed(2)}s + ra ${EXIT_SEC}s) — không kịp đọc.`);
  if (Number.isFinite(refStartMs) && (ev.atMs - refStartMs) / 1000 > maxLateSec + 0.001) p.push(`${label} "${ev.text}": hiện muộn ${((ev.atMs - refStartMs) / 1000).toFixed(2)}s sau khi mascot xuất hiện (tối đa ${maxLateSec}s).`);
  if (Number.isFinite(limitEndMs) && ev.atMs + ev.holdMs > limitEndMs + 60) p.push(`${label} "${ev.text}": kết thúc ${ev.atMs + ev.holdMs}ms sau hết khung ${limitEndMs}ms.`);
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

export function checkAssetScene(html, { beat = false } = {}) {
  const problems = [];
  if (beat) {
    // Cảnh asset CÓ beat mascot: được phép đúng 1 khối chữ #tb-1 (do builder tất định tạo) + mascot; mọi chữ khác vẫn bị cấm.
    const { document } = parseHTML(html);
    const blocks = [...document.querySelectorAll("[id^='tb-']")].filter((e) => /^tb-\d+$/.test(e.id));
    if (blocks.length > 1) problems.push(`Cảnh asset có beat nhưng ${blocks.length} khối chữ mascot, tối đa 1.`);
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

/** Luật thời lượng/hợp lệ của BEAT mascot trong cảnh asset (tất định; dùng ở Stage 6/7). scene.mascotBeat = {startMs, side, layout, poseId, textEvent?}. */
export function beatSceneProblems(scene, sceneShots, kit) {
  const b = scene.mascotBeat;
  const p = [];
  if (!b) return p;
  const id = scene.id;
  if (scene.kind !== "asset") return [`${id}: mascotBeat chỉ được nằm trong cảnh asset (kind="${scene.kind}").`];
  if (!sceneShots?.length) return [`${id}: beat nhưng cảnh không có shot.`];
  const last = [...sceneShots].sort((a, c) => a.startMs - c.startMs).at(-1);
  if (!["left", "right"].includes(b.side)) p.push(`${id}: beat.side phải left|right.`);
  if (!BEAT_LAYOUTS.includes(b.layout)) p.push(`${id}: beat.layout "${b.layout}" không thuộc ${BEAT_LAYOUTS.join("|")}.`);
  if (kit && !kit.byId[b.poseId]) p.push(`${id}: beat.poseId "${b.poseId}" không có trong kit.`);
  const lead = (b.startMs - scene.startMs) / 1000, durSec = (scene.endMs - b.startMs) / 1000;
  if (lead < BEAT_MIN_LEAD_SEC - 0.001) p.push(`${id}: asset toàn khung chỉ ${lead.toFixed(2)}s trước beat (cần ≥${BEAT_MIN_LEAD_SEC}s) — beat không được che mất asset.`);
  if (b.startMs < last.startMs) p.push(`${id}: beat bắt đầu trước shot cuối (${b.startMs} < ${last.startMs}).`);
  else if ((b.startMs - last.startMs) / 1000 < BEAT_MIN_LAST_SHOT_SEC - 0.001) p.push(`${id}: shot cuối chỉ chạy toàn khung ${((b.startMs - last.startMs) / 1000).toFixed(2)}s trước beat (cần ≥${BEAT_MIN_LAST_SHOT_SEC}s).`);
  const te = b.textEvent;
  const need = beatNeedSec(te);
  if (durSec < need - 0.001) p.push(`${id}: beat dài ${durSec.toFixed(2)}s, cần ≥${need.toFixed(2)}s${te ? " (đủ chỗ cho chữ + mascot vào/ra)" : ""}.`);
  if (durSec > BEAT_MAX_SEC + 0.001) p.push(`${id}: beat dài ${durSec.toFixed(2)}s, tối đa ${BEAT_MAX_SEC}s — bắt đầu beat muộn hơn.`);
  if (te) {
    if (!TEXT_FORMATS.includes(te.format)) p.push(`${id}: beat.textEvent.format "${te.format}" không hợp lệ.`);
    p.push(...textTimingProblems(te, { refStartMs: b.startMs, limitEndMs: scene.endMs, label: `${id} chữ beat` }));
  }
  return p;
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

/** Kiểm chéo shotlist/plan sau Stage 6 (tất định). Trả danh sách lỗi (rỗng = ổn).
 * Mascot KHÔNG còn là cảnh/shot riêng: cảnh asset có `mascotIntent` phải có `mascotBeat` ở SHOT CUỐI (do Stage 6 tính tất định). */
export function validatePlanAndShots(scenes, shots, kit, mediaById) {
  const problems = [];
  const byScene = Object.fromEntries(scenes.map((s) => [s.id, []]));
  for (const sh of shots) (byScene[sh.sceneId] ??= []).push(sh);
  let prevBeat = null;
  for (const sc of scenes) {
    const list = (byScene[sc.id] ?? []).sort((a, b) => a.startMs - b.startMs);
    if (!list.length) { problems.push(`Scene ${sc.id} không có shot nào.`); continue; }
    if (list[0].startMs !== sc.startMs || list[list.length - 1].endMs !== sc.endMs) problems.push(`Scene ${sc.id}: các shot không phủ đúng ${sc.startMs}–${sc.endMs}ms.`);
    for (let i = 1; i < list.length; i++) if (list[i].startMs !== list[i - 1].endMs) problems.push(`Scene ${sc.id}: khoảng hở/chồng giữa ${list[i - 1].id} và ${list[i].id}.`);
    if (sc.kind === "graphics") {
      const nOv = list.reduce((a, sh) => a + (sh.overlays ?? []).length, 0);
      if (nOv > 3) problems.push(`Scene ${sc.id} (đồ hoạ) có ${nOv} overlay chữ, tối đa 3 cho cả cảnh (1 punch phrase + 2 nhãn) — gộp tên các bước vào nhãn dạng "A • B • C", nút/bước còn lại là hình không chữ.`);
    }
    const last = list[list.length - 1];
    for (const sh of list) {
      if (sc.kind === "asset") {
        if ((sh.overlays ?? []).length) problems.push(`Shot ${sh.id} của cảnh asset phải overlays=[] (ADN v2).`);
        if (sh.assetId && !mediaById[sh.assetId]) problems.push(`Shot ${sh.id}: assetId "${sh.assetId}" không có trong manifest.`);
        if (!sh.assetId) problems.push(`Shot ${sh.id} của cảnh asset phải có assetId.`);
      }
      if (sh.presentationMode === "mascot") problems.push(`Shot ${sh.id}: presentationMode "mascot" đã bỏ — mascot là beat ở đuôi cảnh asset.`);
      if (sh !== last && sh.mascotBeat) problems.push(`Shot ${sh.id}: mascotBeat chỉ được nằm ở shot cuối của cảnh.`);
    }
    const wantsBeat = sc.kind === "asset" && !!sc.mascotIntent;
    if (!wantsBeat) {
      if (last.mascotBeat) problems.push(`Scene ${sc.id}: có mascotBeat nhưng plan không có mascotIntent ở cảnh asset này.`);
      continue;
    }
    const b = last.mascotBeat;
    if (!b) { problems.push(`Scene ${sc.id}: có mascotIntent nhưng shot cuối ${last.id} thiếu mascotBeat (kiểm mascotAssetId của shot cuối).`); continue; }
    problems.push(...beatSceneProblems({ ...sc, mascotBeat: b }, list, kit));
    const want = sc.mascotIntent.textIntent?.text;
    if (want && normText(b.textEvent?.text) !== normText(want)) problems.push(`Scene ${sc.id}: chữ beat khác textIntent của plan (không được sửa chữ).`);
    if (prevBeat && prevBeat.pose === b.poseId) problems.push(`Scene ${sc.id}: trùng pose mascot với beat liền trước (${b.poseId}).`);
    if (prevBeat && prevBeat.layout === b.layout) problems.push(`Scene ${sc.id}: trùng bố cục beat "${b.layout}" với beat liền trước.`);
    prevBeat = { pose: b.poseId, layout: b.layout };
  }
  return problems;
}

/** Cảnh báo MỀM của plan (không chặn, chỉ yêu cầu gọi lại 1 lần): luật chỉ có trong prompt nay đo tất định.
 * - Đa dạng kiểu trình bày cảnh asset: không kiểu nào >35% khi có ≥6 cảnh asset.
 * - Phân bố beat mascot: >35% số cảnh có mascot; 3 beat liên tiếp cùng nhóm nghiêm; video ≥12 cảnh có mascot thì phải có ở 1/3 cuối. */
export function softPlanWarnings(scenes) {
  const warn = [];
  const assets = scenes.filter((s) => s.kind === "asset");
  if (assets.length >= 6) {
    const cnt = {};
    for (const s of assets) cnt[s.presentationStyle] = (cnt[s.presentationStyle] ?? 0) + 1;
    for (const [style, n] of Object.entries(cnt)) if (n / assets.length > 0.35) warn.push(`presentationStyle "${style}" chiếm ${n}/${assets.length} cảnh asset (>35%) — đa dạng hoá kiểu trình bày.`);
  }
  const beats = scenes.filter((s) => s.kind === "asset" && s.mascotIntent);
  if (beats.length / scenes.length > 0.35) warn.push(`Mascot xuất hiện ở ${beats.length}/${scenes.length} cảnh (>35%) — chỉ dùng khi nhịp người kể thật sự cần.`);
  for (let i = 0; i + 2 < beats.length; i++) if ([0, 1, 2].every((k) => SERIOUS_ROLES.has(beats[i + k].mascotIntent?.narrativeRole))) { warn.push(`3 beat mascot liên tiếp thuộc nhóm nghiêm (${beats[i].id}-${beats[i + 2].id}) — đa dạng tông biểu cảm.`); break; }
  if (scenes.length >= 12 && beats.length >= 1) {
    const total = scenes[scenes.length - 1].endMs;
    if (!beats.some((s) => s.startMs >= (total * 2) / 3)) warn.push("Không có beat mascot nào ở 1/3 cuối video — video không được nhạt dần về cuối.");
  }
  return warn;
}

/** Cảnh báo MỀM beat (không chặn): mỗi pose ≤2 lần/video; không ≥3 beat liên tiếp pose nghiêm; không bố cục nào >50% khi có ≥4 beat. */
export function softShotWarnings(scenes, shots) {
  const w = [];
  const bs = shots.filter((s) => s.mascotBeat).sort((a, b) => a.startMs - b.startMs);
  const cnt = {};
  for (const s of bs) cnt[s.mascotBeat.poseId] = (cnt[s.mascotBeat.poseId] ?? 0) + 1;
  for (const [id, n] of Object.entries(cnt)) if (n > 2) w.push(`Pose ${id} dùng ${n} lần (>2) — đa dạng biểu cảm hơn.`);
  for (let i = 0; i + 2 < bs.length; i++) if ([0, 1, 2].every((k) => SERIOUS_POSES.test(bs[i + k].mascotBeat.poseId))) { w.push(`3 beat liên tiếp pose nghiêm (${bs[i].sceneId}…${bs[i + 2].sceneId}).`); break; }
  const lay = {};
  for (const s of bs) lay[s.mascotBeat.layout] = (lay[s.mascotBeat.layout] ?? 0) + 1;
  if (bs.length >= 4) for (const [l, n] of Object.entries(lay)) if (n / bs.length > 0.5) w.push(`Bố cục beat "${l}" chiếm ${n}/${bs.length} (>50%) — đa dạng bố cục.`);
  return w;
}

/** Kiểm tra plan (Stage 5): kind hợp lệ (asset|graphics), mascotIntent chỉ ở cảnh asset + đủ dài cho beat, nền/kiểu trình bày/định dạng chữ liền kề không trùng. */
export function validatePlan(scenes, kit, scriptAll = "", totalMs = 0) {
  const problems = [...tilingProblems(scenes, totalMs)]; // scene phải nối LIỀN MẠCH toàn audio (khe hở = khung đen giữa 2 scene)
  let prevBg = null;
  let prevStyle = null;
  let prevFormat = null;
  let prevBeatScene = false;
  const roles = new Set(Object.values(kit.byId).map((a) => a.narrativeRole));
  for (const sc of scenes) {
    if (!["asset", "graphics"].includes(sc.kind)) problems.push(`${sc.id}: kind="${sc.kind}" không hợp lệ (asset|graphics) — mascot KHÔNG còn là cảnh riêng: gắn mascotIntent vào CẢNH ASSET (mascot hiện ở đuôi cảnh đó).`);
    const mi = sc.mascotIntent;
    if (mi) {
      if (sc.kind !== "asset") problems.push(`${sc.id}: mascotIntent chỉ được nằm ở cảnh asset (cảnh đồ hoạ không có asset để thu nhỏ).`);
      else {
        if (!mi.narrativeRole || !roles.has(mi.narrativeRole)) problems.push(`${sc.id}: mascotIntent.narrativeRole "${mi.narrativeRole}" không có trong kit.`);
        const ti = mi.textIntent;
        if (!ti) problems.push(`${sc.id}: mascotIntent thiếu textIntent (chữ bổ trợ).`);
        else {
          problems.push(...mascotTextProblems(ti, scriptAll, sc.id));
          if (prevFormat && ti.format === prevFormat) problems.push(`${sc.id}: định dạng chữ "${ti.format}" trùng beat mascot liền trước.`);
          prevFormat = ti.format;
        }
        const dur = (sc.endMs - sc.startMs) / 1000, need = BEAT_MIN_LEAD_SEC + beatNeedSec(ti);
        if (dur < need - 0.001) problems.push(`${sc.id}: cảnh asset dài ${dur.toFixed(2)}s, cần ≥${need.toFixed(2)}s để asset chạy toàn khung ${BEAT_MIN_LEAD_SEC}s rồi mới tới beat mascot — dùng cảnh dài hơn hoặc bỏ mascotIntent ở cảnh này.`);
        if (prevBeatScene) problems.push(`${sc.id}: hai cảnh asset liền nhau đều có mascot — chỉ một trong hai.`);
      }
    }
    prevBeatScene = sc.kind === "asset" && !!mi;
    if (sc.kind === "asset") {
      if (!sc.backgroundVariant) prevBg = null; // cảnh asset che kín nền → hai cảnh có nền nhìn thấy cách nhau bởi cảnh asset không còn là "liền kề" (trừ cảnh asset có media contain/có beat: nền nhìn thấy)
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
