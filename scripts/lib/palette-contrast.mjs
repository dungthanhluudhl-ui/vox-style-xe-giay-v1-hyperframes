// Bảng cặp màu CHỮ/NỀN tính TẤT ĐỊNH từ planning/style-dna/style-tokens.json (công thức WCAG 2.x
// giống `hyperframes check`) để đưa vào prompt Stage 7 như ràng buộc cứng. Lý do (đo thật
// 2026-09-26, xem planning/incident-log.md): contrast_aa_failure là nguyên nhân verify fail số 1, và
// phần lớn là chữ cam #FF6A1A trên nền giấy/card (2.2–2.5:1) hoặc chữ sáng trên nền cam (2.6:1) — cặp
// màu có sẵn trong palette nhưng về bản chất KHÔNG BAO GIỜ đạt AA. Prompt cũ chỉ nói chung chung
// "đạt AA", model phải đoán rồi bị check đánh trượt. Tính từ token (không hardcode) để palette đổi thì
// bảng tự đổi theo.

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function luminance([r, g, b]) {
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(hexA, hexB) {
  const [hi, lo] = [luminance(hexToRgb(hexA)), luminance(hexToRgb(hexB))].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

/** Trả về khối text quy tắc màu chữ/nền cho prompt. Chỉ xét màu đặc dạng #RRGGBB trong
 * `tokens.colors` (bỏ rgba như gridLine — không dùng làm màu chữ/nền đặc). */
export function buildTextColorRules(tokens) {
  const colors = Object.entries(tokens.colors ?? {}).filter(([k, v]) => !k.startsWith("$") && !/shadow/i.test(k) && /^#[0-9a-f]{6}$/i.test(v)); // shadow*: chỉ dùng cho bóng đổ đã nướng sẵn trong ảnh cutout, không phải màu chữ/nền
  const lines = [];
  const banned = [];
  for (const [bgName, bg] of colors) {
    const ok = [];
    for (const [fgName, fg] of colors) {
      if (fgName === bgName) continue;
      const r = contrastRatio(fg, bg);
      if (r >= 4.5) ok.push(`${fgName} ${fg} (${r.toFixed(1)}:1, mọi cỡ chữ)`);
      else if (r >= 3) ok.push(`${fgName} ${fg} (${r.toFixed(1)}:1, CHỈ chữ lớn ≥24px hoặc ≥19px đậm)`);
      else if (r >= 1.5) banned.push(`${fgName} ${fg} trên ${bgName} ${bg} = ${r.toFixed(2)}:1`);
    }
    lines.push(`  • nền ${bgName} ${bg}: chữ được phép → ${ok.length ? ok.join("; ") : "KHÔNG màu palette nào đạt — không đặt chữ trực tiếp trên nền này"}`);
  }
  return `MÀU CHỮ/NỀN — BẢNG ĐÃ TÍNH SẴN THEO WCAG TỪ style-tokens.json (ràng buộc CỨNG, "hyperframes check" FAIL mọi cặp dưới 4.5:1 cho chữ thường / 3:1 cho chữ lớn):
${lines.join("\n")}
  • CẤM (không bao giờ đạt, kể cả chữ lớn): ${banned.join("; ")}.
  • Màu nhấn (cam) trên nền sáng: dùng làm KHỐI/NỀN (thanh highlight, thẻ, stamp, gạch chân, viền, icon) với chữ màu mực đặt LÊN khối cam — KHÔNG dùng cam làm màu chữ trên nền giấy/card/chữ sáng. Chữ cam chỉ đặt trên nền mực đặc.
  • Chữ đè lên ẢNH/VIDEO (nền không đồng nhất, grayscale): luôn đặt trên 1 tấm nền ĐẶC (opacity 1) màu mực hoặc giấy phía sau chữ, chọn màu chữ theo bảng trên — không đặt chữ trực tiếp lên ảnh/video, không dùng nền bán trong suốt (check đo màu nền thật phía sau chữ).
  • Không giảm opacity của chữ hay nền phía sau chữ xuống dưới 1 khi chữ đang hiển thị giữ nguyên (fade vào/ra ngắn thì được).`;
}

/** Bộ class màu AN TOÀN (cặp chữ/nền đã đạt AA) sinh tất định từ token — 07 chèn vào khối <style> đầu
 * tiên của mọi scene, prompt khuyến nghị dùng cho chữ. Chỉ là công cụ tiện dụng, KHÔNG ép bố cục: model
 * vẫn tự do thiết kế. Định nghĩa giống hệt ở mọi scene nên CSS chung trang khi ráp không xung đột.
 * Trả `{ css, doc }` (doc = mô tả ngắn cho prompt). Cặp nào không đạt 4.5:1 thì không sinh class đó. */
export function buildSafeColorClasses(tokens) {
  const c = tokens.colors ?? {};
  const defs = [
    ["hf-text-ink", "chữ mực trên nền giấy/card/cam", c.ink, null, [c.background, c.backgroundCard, c.orange]],
    ["hf-text-light", "chữ sáng trên nền mực", c.onDarkText, null, [c.ink]],
    ["hf-hl-orange", "khối/thanh highlight cam, chữ mực", c.ink, c.orange, [c.orange]],
    ["hf-plate-ink", "tấm nền mực đặc, chữ sáng (đặt chữ lên ảnh/video)", c.onDarkText, c.ink, [c.ink]],
    ["hf-plate-ink-orange", "tấm nền mực đặc, chữ cam nhấn", c.orange, c.ink, [c.ink]],
    ["hf-plate-paper", "tấm nền giấy đặc, chữ mực (đặt chữ lên ảnh/video)", c.ink, c.backgroundCard, [c.backgroundCard]],
  ];
  const css = [];
  const doc = [];
  for (const [name, desc, fg, bg, onBgs] of defs) {
    if (!fg || onBgs.some((b) => !b || contrastRatio(fg, b) < 4.5)) continue;
    css.push(`.${name} { color: ${fg};${bg ? ` background-color: ${bg};` : ""} }`);
    doc.push(`.${name} — ${desc}`);
  }
  return { css: `/* hf-safe-colors (tất định từ style-tokens.json) */\n${css.join("\n")}`, doc: doc.join("; ") };
}
