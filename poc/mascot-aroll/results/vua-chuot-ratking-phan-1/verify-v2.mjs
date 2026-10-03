import fs from "node:fs";
import { checkAssetScene, checkMascotScene, textBlocks, rotationProblems } from "../scripts/lib/v2-checks.mjs";
const dir = "hyperframes/videos/vua-chuot-ratking-phan-1/compositions";
const unwrap = (h) => h.replace(/<\/?template>/g, "");
for (const [id, fn] of [["s01", checkAssetScene], ["s02", checkMascotScene], ["s03", checkAssetScene], ["s04", checkAssetScene]]) {
  const html = unwrap(fs.readFileSync(`${dir}/scene-${id}.html`, "utf8"));
  const p = fn(html);
  console.log(`${id}: ${p.length ? "FAIL " + p.join(" | ") : "OK"} | khối chữ=${textBlocks(html).length} | xoay=${rotationProblems(html).length} | svg=${/<svg/i.test(html)} | bytes=${html.length}`);
}
// đối chứng: chèn chữ + xoay + svg vào s01 → phải bị bắt
const bad = unwrap(fs.readFileSync(`${dir}/scene-s01.html`, "utf8")).replace("</body>", `<div id="x">NHÃN THỬ</div><svg></svg><script>gsap.set("#x",{rotation:12});</script></body>`).replace("<body>", "<body>");
console.log("đối chứng (phải FAIL):", checkAssetScene(bad).length ? "FAIL đúng kỳ vọng — " + checkAssetScene(bad).map((s) => s.slice(0, 60)).join(" | ") : "BỘ KIỂM KHÔNG BẮT ĐƯỢC!");
