import { rotationProblems } from "file:///C:/vox-style-xe-giay-v1-hyperframes/poc/mascot-aroll/overrides/scripts/lib/v2-checks.mjs";

const wrap = (body, js, css = "") => `<html><head><style>${css}</style></head><body><div id="root">${body}</div><script>const tl=gsap.timeline({paused:true});${js}</script></body></html>`;
const cases = [
  ["1. kim SVG (không chữ) xoay → CHO PHÉP (đồ hoạ)", wrap(`<svg><g id="needle"><line x1="0" y1="0" x2="0" y2="-80"/></g></svg>`, `tl.fromTo("#needle",{rotation:90},{rotation:140,duration:2},0);`), true, 0],
  ["2. thẻ chữ xoay → CHẶN", wrap(`<div id="card">NHÃN</div>`, `tl.to("#card",{rotation:-8,duration:1},0);`), true, 1],
  ["3. ảnh xoay → CHẶN", wrap(`<img id="pic" src="a.png">`, `tl.to("#pic",{rotation:5},0);`), true, 1],
  ["4. nhóm xoay có chứa chữ → CHẶN", wrap(`<svg><g id="g"><text>0°</text></g></svg>`, `tl.to("#g",{rotation:30},0);`), true, 1],
  ["5. kim SVG xoay nhưng cảnh ASSET (allowDiagram=false) → CHẶN", wrap(`<svg><g id="needle"></g></svg>`, `tl.to("#needle",{rotation:90},0);`), false, 1],
  ["6. CSS rotate trên thẻ chữ → CHẶN", wrap(`<div class="tag">X</div>`, "", `.tag{transform:rotate(-6deg)}`), true, 1],
  ["7. rotation:0 → CHO PHÉP", wrap(`<div id="c">X</div>`, `tl.set("#c",{rotation:0},0);`), true, 0],
  ["8. SVG transform=rotate(-40 300 260) trên <line> thuần → CHO PHÉP", wrap(`<svg><line transform="rotate(-40 300 260)" x1="0" y1="0" x2="50" y2="0"/></svg>`, ""), true, 0],
  ["9. SVG transform rotate trên <g> chứa <text> → CHẶN", wrap(`<svg><g transform="rotate(25)"><text>NHÃN</text></g></svg>`, ""), true, 1],
  ["10. SVG transform rotate nhưng cảnh ASSET → CHẶN", wrap(`<svg><line transform="rotate(10 0 0)"/></svg>`, ""), false, 1],
];
let bad = 0;
for (const [name, html, allow, expect] of cases) {
  const got = rotationProblems(html, { allowDiagram: allow }).length;
  const ok = (expect === 0 ? got === 0 : got > 0);
  if (!ok) bad++;
  console.log(`${ok ? "OK  " : "FAIL"} ${name} (lỗi=${got})`);
}
console.log(bad ? `${bad} ca sai` : "Tất cả ca đúng");
process.exit(bad ? 1 : 0);
