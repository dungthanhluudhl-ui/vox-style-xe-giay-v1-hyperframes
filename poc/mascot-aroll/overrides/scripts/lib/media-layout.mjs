// POC mascot-aroll (ADN v2): bố cục MEDIA tất định cho cảnh asset — cover/contain theo kích thước thật, nền lưới trôi, hướng trôi.
// (Tách từ lib/mascot-scene.mjs khi bỏ mascot ở vòng 5: chỉ giữ phần còn dùng cho cảnh asset/đồ hoạ.)
export const BG_VARIANTS = ["grid-moving", "chart", "card", "spotlight"];
export const DRIFT_DIRS = ["left", "down", "right", "up", "diag-dr", "diag-ul"];
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
