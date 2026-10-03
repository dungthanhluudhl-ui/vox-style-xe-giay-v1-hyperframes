// POC mascot-aroll: nạp kit capybara + ráp cảnh mascot TẤT ĐỊNH (không AI) từ contract của kit.
// Contract: PNG nguyên trạng, contain trong x40 y160 w1000 h1230, preset hold|grow-600, 1 pose/shot,
// không lip-sync, không idle motion. Nền = biến thể ADN v2 là lớp RIÊNG phía sau PNG.
import fs from "node:fs";
import path from "node:path";
import { renderTextBlock } from "./mascot-text.mjs";

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

export function bgBlock(variant, dir, durationSec) {
  if (variant === "grid-moving") {
    const dist = Math.min(150, Math.round(SPEED_PX_PER_SEC * durationSec));
    const [x, y] = driftVector(dir, dist);
    return {
      html: `<div class="bg-wrap"><div id="bg-grid" class="bg-grid"></div></div>`,
      css: `.bg-wrap{position:absolute;left:0;top:0;width:1080px;height:1920px;overflow:hidden}
.bg-grid{position:absolute;left:-${GRID_MARGIN}px;top:-${GRID_MARGIN}px;width:${1080 + 2 * GRID_MARGIN}px;height:${1920 + 2 * GRID_MARGIN}px;background-image:linear-gradient(to right,rgba(20,20,20,0.32) 1.5px,transparent 1.5px),linear-gradient(to bottom,rgba(20,20,20,0.32) 1.5px,transparent 1.5px);background-size:84px 84px}`,
      js: `tl.fromTo("#bg-grid",{x:0,y:0},{x:${x},y:${y},duration:${durationSec},ease:"none",immediateRender:false},0);`,
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

export function mascotGeometry(side) {
  const x = side === "right" ? 1020 - MASCOT_BOX.w : 60;
  return { x, y: MASCOT_BOTTOM - MASCOT_BOX.h, w: MASCOT_BOX.w, h: MASCOT_BOX.h };
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
