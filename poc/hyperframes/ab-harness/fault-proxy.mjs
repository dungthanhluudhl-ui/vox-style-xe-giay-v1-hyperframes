// Proxy tiêm lỗi trước 9router: chuyển tiếp thật mọi lời gọi, trừ reviewer (model khớp REVIEW_MATCH) —
// trả 503 "[403] ... (reset after 3s)" cho FAIL_REVIEW_TIMES lần đầu. Đếm lời gọi theo model.
import http from "node:http"; import fs from "node:fs"; import path from "node:path"; import { fileURLToPath } from "node:url";
const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const env = {}; for (const l of fs.readFileSync(path.join(REPO, ".env"), "utf8").split(/\r?\n/)) { const i = l.indexOf("="); if (i > 0 && !l.trim().startsWith("#")) env[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
const UP = env.NINEROUTER_BASE_URL.replace(/\/$/, "");
let failLeft = Number(process.env.FAIL_REVIEW_TIMES || 0); const match = new RegExp(process.env.REVIEW_MATCH || "gpt-5.6-sol");
const counts = {};
http.createServer((req, res) => {
  let body = ""; req.on("data", (d) => (body += d)); req.on("end", async () => {
    const model = (() => { try { return JSON.parse(body).model; } catch { return "?"; } })();
    counts[model] = (counts[model] || 0) + 1; fs.writeFileSync(process.env.COUNTS_FILE, JSON.stringify({ counts, failLeft }));
    if (match.test(model) && failLeft > 0) { failLeft--; res.writeHead(503, { "content-type": "application/json" }); return res.end(JSON.stringify({ error: { message: `[fake/${model}] [403]: HTTP 403 (reset after 3s)` } })); }
    const up = await fetch(UP + req.url.replace(/^\/v1/, ""), { method: "POST", headers: { "content-type": "application/json", authorization: req.headers.authorization }, body });
    res.writeHead(up.status, { "content-type": "application/json" }); res.end(await up.text());
  });
}).listen(Number(process.env.PORT || 20199), () => console.log("proxy up", UP));
