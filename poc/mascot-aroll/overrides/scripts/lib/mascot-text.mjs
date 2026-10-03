// POC mascot-aroll (ADN v2, vòng 3): chữ bổ trợ cho cảnh mascot — 6 định dạng TẤT ĐỊNH, KHÔNG xoay/nghiêng.
// Chữ do Stage 5 (AI) đề xuất nhưng HÌNH THỨC do builder quyết định: cỡ chữ ước lượng theo độ dài để không tràn; ĐÁY khối chữ luôn neo cách đầu mascot
// đúng GAP px (mọi độ dài chữ → luôn "gắn kết" với nhân vật, không lơ lửng), khối chữ dịch về phía ĐỐI DIỆN mascot để cân bố cục.
// Màu theo palette (ink/card/cam; không chữ cam trên nền be — lỗi tương phản #1 của repo), font Be Vietnam Pro 900.
export const TEXT_FORMATS = ["thought", "quote", "punch", "question", "sticky", "stamp"];
export const MASCOT_TOP = 677; // đỉnh mascot (đáy dải 1390 − cao 713)
export const GAP = 40;
export const ANCHOR_BOTTOM = MASCOT_TOP - GAP; // 637: đáy khối chữ
const INK = "#141414", CARD = "#F5F0E4", ORANGE = "#FF6A1A", CREAM = "#F7F4EC";
const SIZES = [76, 68, 60, 54, 48];
const MARGIN = 40;

export const countWords = (t) => String(t ?? "").trim().split(/\s+/).filter(Boolean).length;

// === Thời gian đọc (nguồn DUY NHẤT; chuẩn ADN quality-bars: max(1,5s; 0,5s + 70ms×ký tự)) ===
// Đo 03/10 trên 10 khối chữ thật: hold cũ kẹp cứng [1500,3500]ms không theo độ dài chữ và còn bị trừ thời gian vào/ra → 10/10 hiện đầy đủ
// ngắn hơn chuẩn (TB 1,39s so với cần 2,23s). Nay hold = thời gian đọc + vào + ra + dư, tính tất định từ chính chữ.
export const EXIT_SEC = 0.25; // khớp tween fade-out cuối khối (xem `exit` trong renderTextBlock)
export const READ_MARGIN_SEC = 0.3;
export const MAX_HOLD_SEC = 6;
export const TEXT_LEAD_SEC = 0.35; // chữ hiện sau lúc mascot bắt đầu trượt vào chừng này (bám mascot, không lệch theo gợi ý model)
const ENTER_FIXED = { thought: 0.38, punch: 0.3, question: 0.4, sticky: 0.45, stamp: 0.22 };

/** Thời gian từ lúc khối bắt đầu hiện đến lúc MỌI phần của nó hiện đủ (quote hiện từng từ nên phụ thuộc số từ). */
export function enterSec(format, text) {
  if (format === "quote") {
    const n = Math.max(countWords(text), 1);
    return +(0.1 + (n - 1) * Math.min(0.08, 0.5 / n) + 0.25).toFixed(3);
  }
  return ENTER_FIXED[format] ?? 0.45;
}
/** Thời gian chữ phải hiện ĐẦY ĐỦ (không tính lúc đang vào/ra) để người xem đọc kịp. */
// 03/10 (vòng 4): chuẩn ADN `max(1,5s; 0,5s + 70ms×ký tự)` vẫn bị người dùng thấy "xuất hiện/biến mất nhanh" khi xem mp4 thật → nới cho chữ mascot:
// `max(2,0s; 0,7s + 80ms×ký tự)` (23 ký tự: 2,1s → 2,5s; 48 ký tự: 3,9s → 4,5s). Hằng số nằm MỘT chỗ này để chỉnh tiếp theo phản hồi xem video.
export const minReadSec = (text) => +Math.max(2.0, 0.7 + 0.08 * String(text ?? "").length).toFixed(3);
export const MAX_TEXT_CHARS = 48; // ≤9 từ VÀ ≤48 ký tự: đảm bảo beat ≤7s vẫn đủ chỗ cho chuẩn đọc
/** Tổng thời gian giữ khối (từ lúc bắt đầu hiện đến hết fade-out) — luôn ≥ chuẩn đọc + READ_MARGIN_SEC. */
export function holdFor(text, format) {
  return +Math.min(MAX_HOLD_SEC, Math.max(2.4, minReadSec(text) + enterSec(format, text) + EXIT_SEC + READ_MARGIN_SEC)).toFixed(3);
}
/** Thời gian chữ hiện đầy đủ thực tế khi giữ `holdSec`. */
export const fullyVisibleSec = (text, format, holdSec) => +(holdSec - enterSec(format, text) - EXIT_SEC).toFixed(3);
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Ước lượng (bảo thủ) số dòng & chiều cao khối chữ; chọn cỡ chữ lớn nhất mà khối ≤ maxH. */
export function fitText(text, widthPx, maxH, lineHeight = 1.34, upper = false) {
  const chars = String(text).length;
  for (const fs of SIZES) {
    const cpl = Math.max(4, Math.floor(widthPx / (fs * (upper ? 0.72 : 0.62))));
    const words = String(text).split(/\s+/);
    let lines = 1, cur = 0;
    for (const w of words) { const L = w.length + (cur ? 1 : 0); if (cur + L > cpl) { lines++; cur = w.length; } else cur += L; }
    const h = Math.ceil(lines * fs * lineHeight);
    if (h <= maxH) return { fontSize: fs, lines, height: h };
  }
  const fs = SIZES[SIZES.length - 1];
  return { fontSize: fs, lines: Math.ceil(chars / 16), height: maxH, overflow: true };
}

/** Căn ngang khối rộng `width`: tâm màn hình dịch 60px về phía đối diện mascot, kẹp lề 40px. */
function placeX(width, side) {
  const cx = 540 + (side === "left" ? 60 : -60);
  return Math.round(Math.max(MARGIN, Math.min(cx - width / 2, 1080 - MARGIN - width)));
}

/**
 * Trả { html, css, js, box } cho 1 khối chữ. startSec/holdSec tương đối đầu scene.
 * side = bên mascot đứng ("left"|"right") — đuôi bong bóng hướng về phía mascot.
 */
export function renderTextBlock({ n, format, text, side, startSec, holdSec, trackIndex }) {
  const id = `tb-${n}`;
  const T = startSec, H = holdSec;
  const mascotCx = side === "left" ? 60 + 238 : 1020 - 238; // tâm ngang mascot
  const common = `class="clip" data-start="${T}" data-duration="${H}" data-track-index="${trackIndex}"`;
  const exit = `tl.fromTo("#${id}",{opacity:1},{opacity:0,duration:0.25,ease:"power1.in",immediateRender:false},${+(T + H - 0.25).toFixed(3)});`;
  const baseCss = `#${id}{position:absolute;font-family:"Be Vietnam Pro",sans-serif;font-weight:900;color:${INK};line-height:1.34}`;

  if (format === "thought") {
    const w = 820, pad = 34;
    const f = fitText(text, w - 2 * pad - 10, 330);
    const h = f.height + 2 * pad + 10; // + viền 5px × 2
    const left = placeX(w, side), top = ANCHOR_BOTTOM - 40 - h; // chừa 40px cho đuôi bong bóng
    const tailX = Math.round(Math.min(Math.max(mascotCx - left - 22, 50), w - 90));
    return {
      html: `<div id="${id}" ${common} style="left:${left}px;top:${top}px;width:${w}px;transform-origin:${tailX + 22}px 100%"><div class="tb-card">${esc(text)}<i class="tb-tail"></i></div></div>`,
      css: `${baseCss}\n#${id} .tb-card{position:relative;background:${CARD};border:5px solid ${INK};border-radius:38px;padding:${pad}px;font-size:${f.fontSize}px;text-align:center}\n#${id} .tb-tail{position:absolute;left:${tailX}px;bottom:-40px;width:0;height:0;border-left:22px solid transparent;border-right:22px solid transparent;border-top:36px solid ${INK}}`,
      js: `tl.fromTo("#${id}",{opacity:0,scale:0.85},{opacity:1,scale:1,duration:0.38,ease:"back.out(1.5)",immediateRender:false},${T});\n ${exit}`,
      box: { x: left, y: top, w, h: h + 40 },
    };
  }
  if (format === "quote") {
    const w = 800, padTop = 120;
    const f = fitText(text, w, 280);
    const h = f.height + padTop;
    const left = placeX(w, side), top = ANCHOR_BOTTOM - h;
    const words = String(text).split(/\s+/).filter(Boolean);
    const stagger = +Math.min(0.08, 0.5 / Math.max(words.length, 1)).toFixed(3);
    const spans = words.map((wd, i) => `<span id="${id}-w${i}" style="display:inline-block;margin-right:0.28em">${esc(wd)}</span>`).join("");
    return {
      html: `<div id="${id}" ${common} style="left:${left}px;top:${top}px;width:${w}px"><b id="${id}-q" class="tb-mark">“</b><div class="tb-text">${spans}</div></div>`,
      css: `${baseCss}\n#${id}{padding-top:${padTop}px}\n#${id} .tb-mark{position:absolute;left:0;top:0;width:100px;height:100px;border-radius:50%;background:${ORANGE};color:${INK};font-size:86px;line-height:100px;text-align:center}\n#${id} .tb-text{font-size:${f.fontSize}px}`,
      js: `tl.fromTo("#${id}-q",{opacity:0,scale:0.6},{opacity:1,scale:1,duration:0.3,ease:"power3.out",immediateRender:false},${T});\n ` +
        words.map((_, i) => `tl.fromTo("#${id}-w${i}",{opacity:0,y:18},{opacity:1,y:0,duration:0.25,ease:"power2.out",immediateRender:false},${+(T + 0.1 + i * stagger).toFixed(3)});`).join("\n ") + `\n ${exit}`,
      box: { x: left, y: top, w, h },
    };
  }
  if (format === "punch") {
    const w = 840, pad = 26;
    const f = fitText(text, w - 2 * pad, 320, 1.25, true);
    const h = f.height + 2 * pad;
    const left = placeX(w, side), top = ANCHOR_BOTTOM - h;
    return {
      html: `<div id="${id}" ${common} style="left:${left}px;top:${top}px;width:${w}px"><div class="tb-plate">${esc(String(text).toUpperCase())}</div></div>`,
      css: `${baseCss}\n#${id} .tb-plate{background:${ORANGE};color:${INK};padding:${pad}px;font-size:${f.fontSize}px;line-height:1.25;letter-spacing:1px;text-align:center}`,
      js: `tl.fromTo("#${id}",{opacity:0,scale:1.3},{opacity:1,scale:1,duration:0.3,ease:"expo.out",immediateRender:false},${T});\n ${exit}`,
      box: { x: left, y: top, w, h },
    };
  }
  if (format === "question") {
    const bw = 130, cw = 700, pad = 28, gapx = 24;
    const total = bw + gapx + cw;
    const f = fitText(text, cw - 2 * pad - 10, 300);
    const h = Math.max(f.height + 2 * pad + 10, bw);
    const left = placeX(total, side), top = ANCHOR_BOTTOM - h;
    return {
      html: `<div id="${id}" ${common} style="left:${left}px;top:${top}px;width:${total}px;height:${h}px"><div id="${id}-b" class="tb-badge">?</div><div id="${id}-c" class="tb-card">${esc(text)}</div></div>`,
      css: `${baseCss}\n#${id} .tb-badge{position:absolute;left:0;top:0;width:${bw}px;height:${bw}px;border-radius:50%;background:${INK};color:${CREAM};font-size:84px;line-height:${bw}px;text-align:center}\n#${id} .tb-card{position:absolute;left:${bw + gapx}px;top:0;width:${cw}px;min-height:${h}px;background:${CARD};border:5px solid ${INK};border-radius:30px;padding:${pad}px;font-size:${f.fontSize}px;display:flex;align-items:center}`,
      js: `tl.fromTo("#${id}-b",{opacity:0,scale:0},{opacity:1,scale:1,duration:0.3,ease:"back.out(2)",immediateRender:false},${T});\n tl.fromTo("#${id}-c",{opacity:0,x:-40},{opacity:1,x:0,duration:0.3,ease:"power3.out",immediateRender:false},${+(T + 0.1).toFixed(3)});\n ${exit}`,
      box: { x: left, y: top, w: total, h },
    };
  }
  if (format === "sticky") {
    const w = 760, pad = 40;
    const f = fitText(text, w - 2 * pad - 6, 300);
    const h = f.height + 2 * pad + 6 + 10; // + viền 3px×2 + bóng 10px
    const left = placeX(w, side), top = ANCHOR_BOTTOM - h;
    return {
      html: `<div id="${id}" ${common} style="left:${left}px;top:${top}px;width:${w}px"><div class="tb-note"><i class="tb-tape"></i>${esc(text)}</div></div>`,
      css: `${baseCss}\n#${id} .tb-note{position:relative;background:${CARD};padding:${pad}px;font-size:${f.fontSize}px;text-align:center;border:3px solid ${INK};box-shadow:10px 10px 0 ${INK}}\n#${id} .tb-tape{position:absolute;left:${w / 2 - 90}px;top:-22px;width:180px;height:40px;background:${ORANGE}}`,
      js: `tl.fromTo("#${id}",{opacity:0,y:-70},{opacity:1,y:0,duration:0.45,ease:"back.out(1.4)",immediateRender:false},${T});\n ${exit}`,
      box: { x: left, y: top - 22, w: w + 10, h: h + 22 },
    };
  }
  // stamp
  const w = 780, pad = 30;
  const f = fitText(text, w - 2 * pad - 20, 290, 1.3, true);
  const h = f.height + 2 * pad + 16; // + viền 8px×2
  const left = placeX(w, side), top = ANCHOR_BOTTOM - h;
  return {
    html: `<div id="${id}" ${common} style="left:${left}px;top:${top}px;width:${w}px"><div class="tb-stamp">${esc(String(text).toUpperCase())}</div></div>`,
    css: `${baseCss}\n#${id} .tb-stamp{border:8px solid ${INK};padding:${pad}px;font-size:${f.fontSize}px;line-height:1.3;letter-spacing:2px;text-align:center;background:${CREAM}}`,
    js: `tl.fromTo("#${id}",{opacity:0,scale:1.5},{opacity:1,scale:1,duration:0.22,ease:"power4.out",immediateRender:false},${T});\n ${exit}`,
    box: { x: left, y: top, w, h },
  };
}

/**
 * [ADN v2, vòng 4] Biến thể CỘT HẸP cho beat mascot-trong-cảnh-asset: khối chữ nằm trong cột `zone` = {x, w, cy, maxH} cạnh mascot
 * (bên đối diện), căn giữa dọc quanh `cy` HOẶC neo đáy khối tại `bottom` (chữ nằm TRÊN mascot), KHÔNG đè thẻ asset. Không xoay.
 * zone.tailX (toạ độ x tuyệt đối tâm mascot) → bong bóng `thought` có đuôi hướng XUỐNG mascot; không có → đuôi ngang hướng về mascot.
 * `side` = bên mascot đứng; đuôi bong bóng (thought) chìa về phía mascot. Trả { html, css, js, box, overflow }.
 */
export function renderTextBlockNarrow({ n, format, text, side, startSec, holdSec, trackIndex, zone }) {
  const id = `tb-${n}`;
  const T = startSec, H = holdSec, w = zone.w;
  const common = `class="clip" data-start="${T}" data-duration="${H}" data-track-index="${trackIndex}"`;
  const exit = `tl.fromTo("#${id}",{opacity:1},{opacity:0,duration:${EXIT_SEC},ease:"power1.in",immediateRender:false},${+(T + H - EXIT_SEC).toFixed(3)});`;
  const baseCss = `#${id}{position:absolute;font-family:"Be Vietnam Pro",sans-serif;font-weight:900;color:${INK};line-height:1.34}`;
  const topOf = (h) => (zone.bottom != null ? Math.round(zone.bottom - h) : Math.round(zone.cy - h / 2));
  const done = (o, h, boxX = zone.x, boxW = w, extraTop = 0, extraBottom = 0) => ({ ...o, box: { x: boxX, y: topOf(h) - extraTop, w: boxW, h: h + extraTop + extraBottom }, overflow: h + extraTop + extraBottom > zone.maxH });

  if (format === "thought") {
    const pad = 28, TAIL = 38;
    const f = fitText(text, w - 2 * pad - 10, zone.maxH - 2 * pad - 10 - (Number.isFinite(zone.tailX) ? TAIL : 0)); // đuôi hướng xuống chiếm thêm TAIL px dưới khối
    const h = f.height + 2 * pad + 10, top = topOf(h);
    const tailY = Math.max(20, Math.min(h - 70, 60));
    const down = Number.isFinite(zone.tailX);
    const tx = down ? Math.round(Math.min(Math.max(zone.tailX - zone.x - 22, 50), w - 90)) : 0;
    const tailCss = down
      ? `left:${tx}px;bottom:-${TAIL - 2}px;border-left:22px solid transparent;border-right:22px solid transparent;border-top:36px solid ${INK}`
      : side === "left"
        ? `left:-${TAIL - 2}px;top:${tailY}px;border-top:22px solid transparent;border-bottom:22px solid transparent;border-right:36px solid ${INK}`
        : `right:-${TAIL - 2}px;top:${tailY}px;border-top:22px solid transparent;border-bottom:22px solid transparent;border-left:36px solid ${INK}`;
    return done({
      html: `<div id="${id}" ${common} style="left:${zone.x}px;top:${top}px;width:${w}px"><div class="tb-card">${esc(text)}<i class="tb-tail"></i></div></div>`,
      css: `${baseCss}\n#${id} .tb-card{position:relative;background:${CARD};border:5px solid ${INK};border-radius:38px;padding:${pad}px;font-size:${f.fontSize}px;text-align:center}\n#${id} .tb-tail{position:absolute;width:0;height:0;${tailCss}}`,
      js: `tl.fromTo("#${id}",{opacity:0,scale:0.85},{opacity:1,scale:1,duration:0.38,ease:"back.out(1.5)",immediateRender:false},${T});\n ${exit}`,
    }, h, down ? zone.x : side === "left" ? zone.x - TAIL : zone.x, down ? w : w + TAIL, 0, down ? TAIL : 0);
  }
  if (format === "quote") {
    const padTop = 120;
    const f = fitText(text, w, zone.maxH - padTop);
    const h = f.height + padTop, top = topOf(h);
    const words = String(text).split(/\s+/).filter(Boolean);
    const stagger = +Math.min(0.08, 0.5 / Math.max(words.length, 1)).toFixed(3);
    const spans = words.map((wd, i) => `<span id="${id}-w${i}" style="display:inline-block;margin-right:0.28em">${esc(wd)}</span>`).join("");
    return done({
      html: `<div id="${id}" ${common} style="left:${zone.x}px;top:${top}px;width:${w}px"><b id="${id}-q" class="tb-mark">“</b><div class="tb-text">${spans}</div></div>`,
      css: `${baseCss}\n#${id}{padding-top:${padTop}px}\n#${id} .tb-mark{position:absolute;left:0;top:0;width:100px;height:100px;border-radius:50%;background:${ORANGE};color:${INK};font-size:86px;line-height:100px;text-align:center}\n#${id} .tb-text{font-size:${f.fontSize}px}`,
      js: `tl.fromTo("#${id}-q",{opacity:0,scale:0.6},{opacity:1,scale:1,duration:0.3,ease:"power3.out",immediateRender:false},${T});\n ` +
        words.map((_, i) => `tl.fromTo("#${id}-w${i}",{opacity:0,y:18},{opacity:1,y:0,duration:0.25,ease:"power2.out",immediateRender:false},${+(T + 0.1 + i * stagger).toFixed(3)});`).join("\n ") + `\n ${exit}`,
    }, h);
  }
  if (format === "punch") {
    const pad = 26;
    const f = fitText(text, w - 2 * pad, zone.maxH - 2 * pad, 1.25, true);
    const h = f.height + 2 * pad, top = topOf(h);
    return done({
      html: `<div id="${id}" ${common} style="left:${zone.x}px;top:${top}px;width:${w}px"><div class="tb-plate">${esc(String(text).toUpperCase())}</div></div>`,
      css: `${baseCss}\n#${id} .tb-plate{background:${ORANGE};color:${INK};padding:${pad}px;font-size:${f.fontSize}px;line-height:1.25;letter-spacing:1px;text-align:center}`,
      js: `tl.fromTo("#${id}",{opacity:0,scale:1.3},{opacity:1,scale:1,duration:0.3,ease:"expo.out",immediateRender:false},${T});\n ${exit}`,
    }, h);
  }
  if (format === "question") {
    const bw = 96, gapy = 14, pad = 28;
    const f = fitText(text, w - 2 * pad - 10, zone.maxH - bw - gapy - 2 * pad - 10);
    const cardH = f.height + 2 * pad + 10, h = bw + gapy + cardH, top = topOf(h);
    return done({
      html: `<div id="${id}" ${common} style="left:${zone.x}px;top:${top}px;width:${w}px;height:${h}px"><div id="${id}-b" class="tb-badge">?</div><div id="${id}-c" class="tb-card">${esc(text)}</div></div>`,
      css: `${baseCss}\n#${id} .tb-badge{position:absolute;left:0;top:0;width:${bw}px;height:${bw}px;border-radius:50%;background:${INK};color:${CREAM};font-size:64px;line-height:${bw}px;text-align:center}\n#${id} .tb-card{position:absolute;left:0;top:${bw + gapy}px;width:${w}px;min-height:${cardH}px;background:${CARD};border:5px solid ${INK};border-radius:30px;padding:${pad}px;font-size:${f.fontSize}px;display:flex;align-items:center}`,
      js: `tl.fromTo("#${id}-b",{opacity:0,scale:0},{opacity:1,scale:1,duration:0.3,ease:"back.out(2)",immediateRender:false},${T});\n tl.fromTo("#${id}-c",{opacity:0,y:30},{opacity:1,y:0,duration:0.3,ease:"power3.out",immediateRender:false},${+(T + 0.1).toFixed(3)});\n ${exit}`,
    }, h);
  }
  if (format === "sticky") {
    const pad = 36, sw = w - 10; // chừa 10px bóng cứng bên phải để không tràn cột
    const f = fitText(text, sw - 2 * pad - 6, zone.maxH - 22 - 2 * pad - 16);
    const h = f.height + 2 * pad + 6 + 10, top = topOf(h);
    return done({
      html: `<div id="${id}" ${common} style="left:${zone.x}px;top:${top}px;width:${sw}px"><div class="tb-note"><i class="tb-tape"></i>${esc(text)}</div></div>`,
      css: `${baseCss}\n#${id} .tb-note{position:relative;background:${CARD};padding:${pad}px;font-size:${f.fontSize}px;text-align:center;border:3px solid ${INK};box-shadow:10px 10px 0 ${INK}}\n#${id} .tb-tape{position:absolute;left:${sw / 2 - 80}px;top:-22px;width:160px;height:40px;background:${ORANGE}}`,
      js: `tl.fromTo("#${id}",{opacity:0,y:-70},{opacity:1,y:0,duration:0.45,ease:"back.out(1.4)",immediateRender:false},${T});\n ${exit}`,
    }, h, zone.x, w, 22);
  }
  // stamp
  const pad = 26;
  const f = fitText(text, w - 2 * pad - 20, zone.maxH - 2 * pad - 16, 1.3, true);
  const h = f.height + 2 * pad + 16, top = topOf(h);
  return done({
    html: `<div id="${id}" ${common} style="left:${zone.x}px;top:${top}px;width:${w}px"><div class="tb-stamp">${esc(String(text).toUpperCase())}</div></div>`,
    css: `${baseCss}\n#${id} .tb-stamp{border:8px solid ${INK};padding:${pad}px;font-size:${f.fontSize}px;line-height:1.3;letter-spacing:2px;text-align:center;background:${CREAM}}`,
    js: `tl.fromTo("#${id}",{opacity:0,scale:1.5},{opacity:1,scale:1,duration:0.22,ease:"power4.out",immediateRender:false},${T});\n ${exit}`,
  }, h);
}
