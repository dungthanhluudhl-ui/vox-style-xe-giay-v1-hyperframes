// POC: smoke test 1 hoặc nhiều model id qua 9router — xác nhận model TỒN TẠI và trả response
// hợp lệ (không phải lỗi 404/400 do 9router không nhận diện được model), trước khi đưa vào
// POC so sánh chất lượng thật ở B1-B3 (xem kế hoạch model-routing).
// Tái dùng được cho các lần audit model khác sau này — không gắn cứng vào 2 model của lần này.
//
// Usage: node poc/model-swap/smoke-test.mjs [--model=ag/gemini-3.7-flash-medium,ag/gemini-3.8-flash-medium]
// Không truyền --model thì mặc định test đúng 2 ứng viên "-flash-medium" chưa từng được test
// trong repo (xem planning/responsibility-matrix.md mục 9).
import { callModel, extractText } from "../../scripts/lib/router-client.mjs";

const DEFAULT_MODELS = ["ag/gemini-3.7-flash-medium", "ag/gemini-3.8-flash-medium"];
const modelArg = process.argv.find((a) => a.startsWith("--model="));
const models = modelArg ? modelArg.split("=")[1].split(",") : DEFAULT_MODELS;

const PROMPT = 'Trả lời đúng 1 từ: "OK".';

async function smokeTestOne(model) {
  console.log(`\n=== ${model} ===`);
  try {
    const response = await callModel({
      model,
      messages: [{ role: "user", content: PROMPT }],
      maxTokens: 20,
      timeoutMs: 30000,
    });
    const text = extractText(response).trim();
    if (!text) {
      console.log(`  FAIL — response rỗng (có thể model tồn tại nhưng không trả nội dung)`);
      return { model, ok: false, reason: "empty-response" };
    }
    console.log(`  PASS — trả lời: "${text}"`);
    return { model, ok: true, text };
  } catch (e) {
    console.log(`  FAIL — ${e.message || e}`);
    return { model, ok: false, reason: e.message || String(e) };
  }
}

const results = [];
for (const model of models) {
  results.push(await smokeTestOne(model));
}

console.log("\n=== Tổng kết ===");
for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"} — ${r.model}${r.ok ? "" : ` (${r.reason})`}`);
}

if (results.some((r) => !r.ok)) {
  process.exitCode = 1;
}
