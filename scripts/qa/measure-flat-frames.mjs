// Quét KHUNG PHẲNG/TRỐNG trong mp4 (bổ sung cho `ffmpeg blackdetect`: khung trống màu giấy SÁNG không phải "đen" nên blackdetect bỏ lọt —
// chính là lỗi "màn hình trắng/đen ngắn giữa 2 scene" và "video hết thì trống"). Chạy từ GỐC repo:
//   node scripts/qa/measure-flat-frames.mjs --video=<slug> [--mp4=out/<slug>-full.mp4] [--min=0.2]
// Lõi dùng chung với 09-render (lib/render-qa.mjs). Đoạn phẳng ≤0,5s ngay đầu cảnh đồ hoạ chỉ ghi nhận (Stage 7 đã chặn bằng lib/blank-start.mjs).
import fs from "node:fs";
import { findBlackIntervals, findFlatRuns } from "../lib/render-qa.mjs";

const arg = (k, d) => process.argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
const slug = arg("video"), mp4 = arg("mp4", `out/${slug}-full.mp4`), minSec = +arg("min", "0.2");
const planRaw = JSON.parse(fs.readFileSync(`planning/videos/${slug}/scene-plan.json`, "utf8"));
const plan = Array.isArray(planRaw) ? planRaw : planRaw.scenes;
const black = findBlackIntervals(mp4);
for (const b of black) console.log(`  ⚠ KHUNG ĐEN ${b.dur.toFixed(2)}s tại t=${b.start.toFixed(2)}–${b.end.toFixed(2)}s`);
const { hard, info, samples } = findFlatRuns(mp4, plan, { minSec });
for (const i of info) console.log(`  ℹ ${i.scene} (đồ hoạ) đầu cảnh: nền trống ${i.dur.toFixed(1)}s trước khi phần tử vào (t=${i.start.toFixed(1)}s)`);
for (const f of hard) console.log(`  ⚠ KHUNG PHẲNG ${f.dur.toFixed(1)}s tại t=${f.start.toFixed(1)}–${f.end.toFixed(1)}s${f.scene ? ` — ${f.scene} (${f.kind}) +${f.rel.toFixed(1)}s/${f.sceneDur.toFixed(1)}s` : ""}`);
const bad = black.length + hard.length;
console.log(`${samples} mẫu: khung đen ${black.length}, khung phẳng bất thường ${hard.length}${info.length ? `, ${info.length} nền trống đầu cảnh đồ hoạ (thông tin)` : ""} — ${bad ? "CÓ LỖI" : "SẠCH"}`);
process.exit(bad ? 1 : 0);
