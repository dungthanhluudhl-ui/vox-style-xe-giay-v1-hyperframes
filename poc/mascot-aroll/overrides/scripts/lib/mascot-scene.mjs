// POC mascot-aroll: nạp kit capybara + ráp cảnh mascot TẤT ĐỊNH (không AI) từ contract của kit.
// Contract: PNG nguyên trạng, contain trong x40 y160 w1000 h1230, preset hold|grow-600, 1 pose/shot,
// không lip-sync, không idle motion. Nền = biến thể ADN v2 là lớp RIÊNG phía sau PNG.
import fs from "node:fs";
import path from "node:path";
import { renderTextBlock, renderTextBlockNarrow, TEXT_LEAD_SEC } from "./mascot-text.mjs";

export const KIT_REL = "public/mascot/capybara-library-v1";
export const BG_VARIANTS = ["grid-moving", "chart", "card", "spotlight"];
export const DRIFT_DIRS = ["left", "down", "right", "up", "diag-dr", "diag-ul"];
export const PRESETS = ["hold", "grow-600"];
const SPEED_PX_PER_SEC = 18; // đã kiểm chứng 84px/4s=21px/s ở Bước C
const GRID_MARGIN = 168; // 2 ô mỗi cạnh

// === Cách đặt media (ADN v2, quyết định người dùng 03/10) ===
// Ảnh/video 9:16 đủ phân giải → "cover" toàn khung. Media nằm ngang / độ phân giải thấp / thẻ doc-NN → "contain": giữ nguyên tỉ lệ,
// đặt GỌN trong dải an toàn y160–1390 trên NỀN nhìn thấy (không crop mất chủ thể, không phóng ×4–11 gây vỡ nét). Quyết định TẤT ĐỊNH
// theo số liệu manifest (đo flydubai-fz1073: ảnh AI 768×1376 phóng ×1,41 cắt 1% → ổn; 250×167 phóng ×11,5 cắt 62% → vỡ).
export const BAND = { x: 40, y: 160, w: 1000, h: 1230 };
export const MAX_UPSCALE = 2.5; // ảnh nhỏ thì hiển thị nhỏ hơn dải chứ không phóng quá mức
const CANVAS_W = 1080, CANVAS_H = 1920;

/** Trả { fit: "cover" | "contain", reason, box? } — box = {x,y,w,h} của media khi contain. */
export function fitForAsset(a) {
  if (!a?.width || !a?.height) return { fit: "cover", reason: "không có kích thước" };
  const { width: w, height: h } = a;
  const coverScale = Math.max(CANVAS_W / w, CANVAS_H / h);
  const visibleFrac = (CANVAS_W / (w * coverScale)) * (CANVAS_H / (h * coverScale));
  const cropped = 1 - visibleFrac;
  const reasons = [];
  if (a.source === "pdf") reasons.push("thẻ tài liệu doc-NN");
  if (cropped > 0.25) reasons.push(`cover sẽ cắt ${Math.round(cropped * 100)}% hình`);
  if (coverScale > 2.0) reasons.push(`cover phóng ×${coverScale.toFixed(1)} (độ phân giải thấp)`);
  if (!reasons.length) return { fit: "cover", reason: `cover ×${coverScale.toFixed(2)}, cắt ${Math.round(cropped * 100)}%` };
  const scale = Math.min(BAND.w / w, BAND.h / h, MAX_UPSCALE);
  const bw = Math.round(w * scale), bh = Math.round(h * scale);
  return { fit: "contain", reason: reasons.join("; "), box: { x: Math.round((CANVAS_W - bw) / 2), y: Math.round(BAND.y + (BAND.h - bh) / 2), w: bw, h: bh } };
}

export function loadKit(root = process.cwd()) {
  const dir = path.join(root, KIT_REL);
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
  const byId = Object.fromEntries(manifest.assets.filter((a) => a.status === "ready").map((a) => [a.id, a]));
  return { dir, manifest, byId };
}

/** Bản rút gọn đưa vào prompt Stage 5/6 (không đưa ảnh, không đưa prompt tạo ảnh). */
export function kitSummaryForPrompt(kit) {
  return Object.values(kit.byId).map((a) => ({ id: a.id, outfit: a.outfit, state: a.state, labelVi: a.labelVi, narrativeRole: a.narrativeRole }));
}

/** Chọn hướng trôi tất định theo vị trí trong dãy cảnh có nền nhìn thấy — hai cảnh liền nhau không cùng hướng. */
export function driftDirForIndex(i) {
  return DRIFT_DIRS[i % DRIFT_DIRS.length];
}

function driftVector(dir, dist) {
  const d = dist;
  const k = Math.round(dist * 0.7);
  return { left: [-d, 0], right: [d, 0], up: [0, -d], down: [0, d], "diag-dr": [k, k], "diag-ul": [-k, -k] }[dir] ?? [-d, 0];
}

export function bgBlock(variant, dir, durationSec, startSec = 0) {
  if (variant === "grid-moving") {
    const dist = Math.min(150, Math.round(SPEED_PX_PER_SEC * durationSec));
    const [x, y] = driftVector(dir, dist);
    return {
      html: `<div class="bg-wrap"><div id="bg-grid" class="bg-grid"></div></div>`,
      css: `.bg-wrap{position:absolute;left:0;top:0;width:1080px;height:1920px;overflow:hidden}
.bg-grid{position:absolute;left:-${GRID_MARGIN}px;top:-${GRID_MARGIN}px;width:${1080 + 2 * GRID_MARGIN}px;height:${1920 + 2 * GRID_MARGIN}px;background-image:linear-gradient(to right,rgba(20,20,20,0.32) 1.5px,transparent 1.5px),linear-gradient(to bottom,rgba(20,20,20,0.32) 1.5px,transparent 1.5px);background-size:84px 84px}`,
      js: `tl.fromTo("#bg-grid",{x:0,y:0},{x:${x},y:${y},duration:${durationSec},ease:"none",immediateRender:false},${startSec});`,
    };
  }
  if (variant === "card") return { html: "", css: `#root{background:#F5F0E4}`, js: "" };
  if (variant === "spotlight") {
    return { html: `<div class="bg-vignette"></div>`, css: `.bg-vignette{position:absolute;left:0;top:0;width:1080px;height:1920px;background:radial-gradient(ellipse at center,rgba(20,20,20,0) 55%,rgba(20,20,20,0.28) 100%)}`, js: "" };
  }
  // chart: đường kẻ ngang đậm tại 20/40/60/80% + vạch cam bên trái
  const lines = [20, 40, 60, 80].map((p) => `<div class="chart-line" style="top:${p}%"></div><div class="chart-tick" style="top:${p}%"></div>`).join("");
  return {
    html: `<div class="bg-chart">${lines}</div>`,
    css: `.bg-chart{position:absolute;left:0;top:0;width:1080px;height:1920px}
.chart-line{position:absolute;left:0;width:1080px;height:4px;background:rgba(20,20,20,0.32)}
.chart-tick{position:absolute;left:0;width:28px;height:4px;background:#FF6A1A}`,
    js: "",
  };
}

// === Bố cục mascot v2 (người dùng chọn 03/10): NHỎ ~0,58, đứng đáy dải an toàn (y=1390), lệch TRÁI/PHẢI xen kẽ, chữ bổ trợ phía trên. ===
export const MASCOT_SCALE = 0.58;
export const MASCOT_BOX = { w: Math.round(MASCOT_SCALE * 1230 * 1024 / 1536), h: Math.round(MASCOT_SCALE * 1230) }; // 476×713
const MASCOT_BOTTOM = 1390;

export function mascotGeometry(side, scale = MASCOT_SCALE) {
  if (scale === MASCOT_SCALE) {
    const x = side === "right" ? 1020 - MASCOT_BOX.w : 60;
    return { x, y: MASCOT_BOTTOM - MASCOT_BOX.h, w: MASCOT_BOX.w, h: MASCOT_BOX.h };
  }
  const h = Math.round(scale * 1230), w = Math.round((h * 1024) / 1536);
  return { x: side === "right" ? 1020 - w : 60, y: MASCOT_BOTTOM - h, w, h };
}

/** shots: [{ id, startSec, endSec, mascotAssetId, textEvents:[{text,format,atSec,holdSec}] }] — thời gian TƯƠNG ĐỐI đầu scene.
 * Chuyển động (tất định, không xoay, không ngẫu nhiên): trượt vào từ cạnh `side` rồi nhấp nhô y ±6px sine (finite) trên MỘT wrapper
 * xuyên suốt scene → đổi pose giữa 2 shot chỉ là cắt ảnh, nhịp nhô không bị đứt. Chữ: lib/mascot-text.mjs (6 định dạng). */
export function buildMascotSceneHtml({ durationSec, shots, bgVariant, driftDir, kit, side = "left" }) {
  const bg = bgBlock(BG_VARIANTS.includes(bgVariant) ? bgVariant : "grid-moving", driftDir, durationSec);
  const g = mascotGeometry(side);
  const poses = shots.map((s, i) => {
    const a = kit.byId[s.mascotAssetId];
    if (!a) throw new Error(`mascotAssetId không có trong kit hoặc không ready: ${s.mascotAssetId}`);
    const dur = +(s.endSec - s.startSec).toFixed(3);
    return `<img id="capy-actor-${i + 1}" class="capy-actor clip" data-start="${s.startSec}" data-duration="${dur}" data-track-index="0" data-mascot-id="${a.id}" src="assets/${path.basename(a.file)}" width="${g.w}" height="${g.h}" alt="Capybara narrator, ${a.state} pose">`;
  }).join("\n  ");
  const blocks = [];
  let n = 0;
  for (const s of shots) for (const ev of s.textEvents ?? []) {
    n++;
    blocks.push(renderTextBlock({ n, format: ev.format, text: ev.text, side, startSec: ev.atSec, holdSec: ev.holdSec, trackIndex: 1 + n }));
  }
  const slideFrom = side === "right" ? g.w + 80 + 60 : -(g.x + g.w + 20);
  const bobRepeat = Math.max(0, Math.floor(durationSec / 1.2) - 1);
  return `<!doctype html>
<html lang="vi" data-resolution="portrait"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=1080, height=1920">
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700;900&display=swap">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{margin:0;width:1080px;height:1920px;overflow:hidden}
#root{position:relative;width:1080px;height:1920px;background:#E7E3D9;overflow:hidden}
${bg.css}
#actor-wrap{position:absolute;left:${g.x}px;top:${g.y}px;width:${g.w}px;height:${g.h}px;will-change:transform}
.capy-actor{position:absolute;left:0;top:0;display:block;width:${g.w}px;height:${g.h}px;object-fit:contain}
${blocks.map((b) => b.css).join("\n")}
</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${durationSec}" data-width="1080" data-height="1920">
 ${bg.html}
 <div id="actor-wrap">
  ${poses}
 </div>
 ${blocks.map((b) => b.html).join("\n ")}
</div>
<script>
(() => {
 const tl = gsap.timeline({ paused: true });
 ${bg.js}
 tl.fromTo("#actor-wrap",{x:${Math.round(slideFrom)}},{x:0,duration:0.6,ease:"power3.out",immediateRender:false},0);
 tl.fromTo("#actor-wrap",{y:0},{y:-6,duration:1.2,ease:"sine.inOut",yoyo:true,repeat:${bobRepeat},immediateRender:false},0.6);
 ${blocks.map((b) => b.js).join("\n ")}
 window.__timelines = window.__timelines || {};
 window.__timelines["main"] = tl;
})();
</script></body></html>
`;
}

// === [ADN v2, vòng 4] BEAT: mascot nằm TRONG cảnh asset (không còn cảnh mascot riêng) ===
// Bố cục (người dùng chọn 03/10): thẻ asset thu nhỏ ở DẢI TRÊN, mascot ×0,58 ở dưới (đáy y=1390, trái/phải xen kẽ), chữ ở CỘT cạnh mascot
// (bên đối diện). Mọi toạ độ tất định; `beatLayoutProblems` kiểm 3 vùng không giao nhau và nằm trong y≤1390.
export const CARD_BAND = { x: 40, y: 160, w: 1000, h: 490 };
export const CARD_FRAME = { border: 5, shadow: 8 };
export const BEAT_TEXT_ZONE = { w: 460, cy: 960, maxH: 500 };
export const MORPH_SEC = 0.5;
export const MASCOT_SLIDE_SEC = 0.6;

// 4 BỐ CỤC beat (người dùng 03/10: một bố cục lặp lại sẽ nhàm khi video dài). Mọi toạ độ tất định; chọn bố cục: chooseBeatLayout().
//  top     : thẻ nhỏ ở dải trên (y160–650), mascot ×0,58 dưới, chữ ở cột cạnh mascot (đuôi ngang).      [người dùng đã chọn 03/10]
//  side    : thẻ ở cột đối diện mascot (đáy y1377), mascot ×0,58, chữ NẰM TRÊN cả hai (đuôi xuống).      [hợp ảnh dọc]
//  twocol  : thẻ CAO ở nguyên một cột (y160–1377), mascot ×0,58 ở cột kia, chữ trên đầu mascot (đuôi xuống). [ảnh dọc to nhất]
//  bigcard : thẻ LỚN ở dải trên (y160–850), mascot nhỏ ×0,40 dưới góc, chữ ở cột cạnh mascot.             [hợp ảnh ngang/doc]
export const BEAT_LAYOUTS = ["top", "side", "twocol", "bigcard"];
const MIN_CARD_AREA = 120000; // dưới ngưỡng này thẻ quá nhỏ để xem → layout bị loại cho asset đó
const MASCOT_SMALL = 0.4;

function fitCard(content, box, align = "center") {
  const s = Math.min(box.w / content.w, box.h / content.h);
  const w = Math.round(content.w * s), h = Math.round(content.h * s);
  return { x: Math.round(box.x + (box.w - w) / 2), y: align === "bottom" ? box.y + box.h - h : box.y + Math.round((box.h - h) / 2), w, h, scale: +s.toFixed(5) };
}

/** content = {w,h} kích thước nội dung shot trước khi thu nhỏ (cover: 1080×1920; contain: hộp containBox). */
export function beatGeometry(layout, side, content) {
  const left = side === "left";
  if (layout === "side") {
    const mascot = mascotGeometry(side);
    const card = fitCard(content, { x: left ? 568 : 60, y: 677, w: 452, h: 700 }, "bottom");
    return { layout, card, mascot, text: { x: 120, w: 840, bottom: 630, maxH: 430, tailX: mascot.x + mascot.w / 2 } };
  }
  if (layout === "twocol") {
    const mascot = mascotGeometry(side);
    const card = fitCard(content, { x: left ? 568 : 60, y: 160, w: 452, h: 1217 });
    return { layout, card, mascot, text: { x: mascot.x + 8, w: 460, bottom: 631, maxH: 440, tailX: mascot.x + mascot.w / 2 } };
  }
  if (layout === "bigcard") {
    const mascot = mascotGeometry(side, MASCOT_SMALL);
    const card = fitCard(content, { x: 60, y: 160, w: 960, h: 690 });
    return { layout, card, mascot, text: { x: left ? 450 : 50, w: 580, cy: 1144, maxH: 450 } };
  }
  const mascot = mascotGeometry(side); // "top"
  const card = fitCard(content, CARD_BAND);
  return { layout: "top", card, mascot, text: { x: left ? 580 : 40, w: BEAT_TEXT_ZONE.w, cy: BEAT_TEXT_ZONE.cy, maxH: BEAT_TEXT_ZONE.maxH } };
}

/** Chọn bố cục TẤT ĐỊNH: ưu tiên theo tỉ lệ asset, bỏ bố cục làm thẻ quá nhỏ, KHÔNG trùng bố cục beat liền trước, xoay vòng theo k (thứ tự beat). */
export function chooseBeatLayout({ content, prev = null, k = 0 }) {
  const portrait = content.h / content.w >= 1.2;
  const pref = portrait ? ["twocol", "side", "top", "bigcard"] : ["bigcard", "top", "side", "twocol"];
  for (let j = 0; j < pref.length; j++) {
    const l = pref[(k + j) % pref.length];
    if (l === prev) continue;
    const c = beatGeometry(l, "left", content).card;
    if (c.w * c.h < MIN_CARD_AREA || c.h < 240) continue;
    return l;
  }
  return prev === "top" ? "bigcard" : "top";
}

const rectOf = (r) => ({ l: r.x, t: r.y, r: r.x + r.w, b: r.y + r.h });
const overlap = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;

/** Kiểm hình học beat: thẻ(+viền+bóng) / mascot / chữ không giao nhau; tất cả trong khung và y ≤ 1390. Trả mảng lỗi. */
export function beatLayoutProblems(g, textBox) {
  const p = [];
  const f = CARD_FRAME;
  const cardOuter = { x: g.card.x - f.border, y: g.card.y - f.border, w: g.card.w + 2 * f.border + f.shadow, h: g.card.h + 2 * f.border + f.shadow };
  const regions = { "thẻ asset": cardOuter, mascot: g.mascot, ...(textBox ? { "chữ": textBox } : {}) };
  const names = Object.keys(regions);
  for (let i = 0; i < names.length; i++) {
    const r = rectOf(regions[names[i]]);
    if (r.l < 0 || r.r > 1080 || r.t < 0) p.push(`${names[i]} ra ngoài khung (${r.l},${r.t})–(${r.r},${r.b}).`);
    if (r.b > 1390) p.push(`${names[i]} chạm dưới y=1390 (${r.b}) — vào vùng phụ đề.`);
    for (let j = i + 1; j < names.length; j++) if (overlap(r, rectOf(regions[names[j]]))) p.push(`${names[i]} CHỒNG ${names[j]}.`);
  }
  return p;
}

/**
 * Lớp mascot + chữ của beat. Thời gian TƯƠNG ĐỐI đầu cảnh. `pose` = asset kit đã ready.
 * textEvent = { text, format, atSec, holdSec } | null. Trả { html, css, js, textBox, textOverflow }.
 * Chuyển động như cảnh mascot cũ (trượt vào từ cạnh `side` + nhấp nhô ±6px sine hữu hạn trên MỘT wrapper), bắt đầu cùng lúc thẻ thu nhỏ.
 */
export function mascotLayer({ side, beatStartSec, beatDurSec, pose, textEvent, geom }) {
  const g = geom.mascot;
  const slideFrom = side === "right" ? g.w + 80 + 60 : -(g.x + g.w + 20);
  const bobRepeat = Math.max(0, Math.floor(Math.max(beatDurSec - MASCOT_SLIDE_SEC, 0) / 1.2) - 1);
  const img = `<img id="beat-actor" class="capy-actor clip" data-start="${beatStartSec}" data-duration="${beatDurSec}" data-track-index="30" data-mascot-id="${pose.id}" src="assets/${path.basename(pose.file)}" width="${g.w}" height="${g.h}" alt="Capybara narrator, ${pose.state} pose">`;
  let tb = null;
  if (textEvent?.text) tb = renderTextBlockNarrow({ n: 1, format: textEvent.format, text: textEvent.text, side, startSec: textEvent.atSec, holdSec: textEvent.holdSec, trackIndex: 31, zone: geom.text });
  return {
    html: `<div id="beat-actor-wrap">${img}</div>${tb ? "\n " + tb.html : ""}`,
    css: `#beat-actor-wrap{position:absolute;left:${g.x}px;top:${g.y}px;width:${g.w}px;height:${g.h}px;will-change:transform}
.capy-actor{position:absolute;left:0;top:0;display:block;width:${g.w}px;height:${g.h}px;object-fit:contain}${tb ? "\n" + tb.css : ""}`,
    js: `tl.fromTo("#beat-actor-wrap",{x:${Math.round(slideFrom)}},{x:0,duration:${MASCOT_SLIDE_SEC},ease:"power3.out",immediateRender:false},${beatStartSec});
 tl.fromTo("#beat-actor-wrap",{y:0},{y:-6,duration:1.2,ease:"sine.inOut",yoyo:true,repeat:${bobRepeat},immediateRender:false},${+(beatStartSec + MASCOT_SLIDE_SEC).toFixed(3)});${tb ? "\n " + tb.js : ""}`,
    textBox: tb?.box ?? null,
    textOverflow: !!tb?.overflow,
  };
}
export { TEXT_LEAD_SEC };
