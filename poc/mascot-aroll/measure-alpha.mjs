// Đo pixel trên snapshot (không xem ảnh): (1) vùng trong suốt của PNG mascot có lộ nền không (alpha thật);
// (2) lưới chuyển động có trôi giữa 2 khung không. Chạy: node poc/mascot-aroll/measure-alpha.mjs <snap1.png> <snap2.png> <expectedShiftPx>
import { execFileSync } from "node:child_process";

const [f1, f2, expectedShift] = [process.argv[2], process.argv[3], Number(process.argv[4] ?? NaN)];
const PAPER = [231, 227, 217]; // #E7E3D9
const CELL = 84;

const raw = (file, w, h, x, y, fmt) => execFileSync("ffmpeg", ["-v", "error", "-i", file, "-vf",
  `crop=${w}:${h}:${x}:${y},format=${fmt}`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 26 });
const rgb = (file, x, y) => { const b = raw(file, 1, 1, x, y, "rgb24"); return [b[0], b[1], b[2]]; };
const dist = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));

let bad = 0;
const check = (name, ok, detail) => { if (!ok) bad++; console.log(`${ok ? "OK  " : "FAIL"} ${name}: ${detail}`); };

// Hộp ảnh PNG (contain 1024x1536 vào x40 y160 w1000 h1230): scale 0.8008 -> rộng 820, x=130..950, y=160..1390
// Góc PNG trong suốt: lấy trung vị 5 điểm quanh (136,166) và nền ngoài hộp (60,166) để không trúng đúng vạch lưới.
const med = (file, pts) => [0, 1, 2].map(c => pts.map(p => rgb(file, p[0], p[1])[c]).sort((a, b) => a - b)[Math.floor(pts.length / 2)]);
const inside = [[136, 166], [150, 170], [140, 180], [160, 175], [145, 190]];
const outside = [[56, 166], [60, 170], [50, 180], [70, 175], [45, 190]];
for (const f of [f1, f2]) {
  const a = med(f, inside), b = med(f, outside);
  check(`alpha trong suốt (${f.split(/[\\/]/).pop()})`, dist(a, PAPER) <= 12 && dist(b, PAPER) <= 12 && dist(a, b) <= 12,
    `trong hộp PNG rgb(${a}) / ngoài hộp rgb(${b}) / giấy rgb(${PAPER})`);
  const c = rgb(f, 540, 800); // giữa thân nhân vật: phải là màu nhân vật, không phải nền
  check(`nhân vật hiện (${f.split(/[\\/]/).pop()})`, dist(c, PAPER) > 25, `tâm thân rgb(${c})`);
}

// Vạch lưới: quét 1 hàng (y=170, x=0..119, ngoài hộp ảnh) tìm điểm tối nhất (vạch dọc)
const darkestX = (file) => {
  const row = raw(file, 120, 1, 0, 170, "gray");
  let min = 255, idx = 0; row.forEach((v, i) => { if (v < min) { min = v; idx = i; } });
  return { idx, min };
};
const g1 = darkestX(f1), g2 = darkestX(f2);
const shiftObserved = ((g1.idx - g2.idx) % CELL + CELL) % CELL; // lưới trôi sang trái: vạch dịch về trái
check("lưới có vạch nhìn thấy", g1.min < 215 && g2.min < 215, `độ sáng vạch ${g1.min}/${g2.min}`);
if (Number.isFinite(expectedShift)) {
  const diff = Math.abs(shiftObserved - (expectedShift % CELL));
  check("lưới trôi đúng quãng", diff <= 2 || diff >= CELL - 2, `vạch x=${g1.idx}→${g2.idx}, dịch quan sát ${shiftObserved}px (mod ${CELL}) vs kỳ vọng ${(expectedShift % CELL).toFixed(1)}px`);
} else check("lưới đã trôi", g1.idx !== g2.idx, `vạch x=${g1.idx}→${g2.idx}`);

console.log(bad ? `\n${bad} phép đo lỗi` : "\nTất cả phép đo đạt");
process.exit(bad ? 1 : 0);
