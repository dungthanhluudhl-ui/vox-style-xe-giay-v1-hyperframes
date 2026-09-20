import fs from "node:fs";
import path from "node:path";

function loadEnvFile(root) {
  const envPath = path.join(root, ".env");
  const env = {};
  if (!fs.existsSync(envPath)) return env;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
  }
  return env;
}

const fileEnv = loadEnvFile(process.cwd());
const BASE_URL = process.env.NINEROUTER_BASE_URL || fileEnv.NINEROUTER_BASE_URL;
const API_KEY = process.env.NINEROUTER_API_KEY || fileEnv.NINEROUTER_API_KEY;

if (!BASE_URL || !API_KEY) {
  throw new Error(
    "Thiếu NINEROUTER_BASE_URL hoặc NINEROUTER_API_KEY. Kiểm tra file .env ở gốc repo.",
  );
}

/**
 * Gọi 9router (OpenAI-compatible chat completions).
 * @param {object} opts
 * @param {string} opts.model - model id, vd. "ag/gemini-3.8-flash-high"
 * @param {Array<{role: string, content: any}>} opts.messages
 * @param {number} [opts.temperature]
 * @param {number} [opts.maxTokens]
 */
export async function callModel({ model, messages, temperature, maxTokens, responseFormat }) {
  const body = {
    model,
    messages,
    stream: false,
    ...(temperature != null ? { temperature } : {}),
    ...(maxTokens != null ? { max_tokens: maxTokens } : {}),
    ...(responseFormat != null ? { response_format: responseFormat } : {}),
  };

  const startedAt = Date.now();
  console.log(`  [9router] gọi ${model}... (bắt đầu ${new Date(startedAt).toLocaleTimeString()})`);
  let res;
  try {
    res = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
    console.log(`  [9router] LỖI sau ${elapsed}s: ${e.message || e}`);
    throw e;
  }
  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);

  if (!res.ok) {
    const text = await res.text();
    console.log(`  [9router] HTTP ${res.status} sau ${elapsed}s`);
    throw new Error(`9router trả lỗi ${res.status}: ${text.slice(0, 500)}`);
  }

  console.log(`  [9router] xong sau ${elapsed}s`);
  return res.json();
}

export function imageContentFromFile(filePath, mimeType = "image/jpeg") {
  const base64 = fs.readFileSync(filePath).toString("base64");
  return { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } };
}

export function extractText(response) {
  return response?.choices?.[0]?.message?.content ?? "";
}

/** Bóc JSON từ output model, phòng trường hợp model bọc trong ```json ... ``` */
export function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  return JSON.parse(raw.trim());
}

export function loadModelRouting(root = process.cwd()) {
  return JSON.parse(fs.readFileSync(path.join(root, "scripts", "model-routing.json"), "utf8"));
}

/**
 * @param {string} entry
 * @param {string} [logPath] - đường dẫn run-log.md để ghi vào (thường là `videoPaths(slug).runLog`
 *   từ `./video-paths.mjs`). Nếu bỏ trống, không ghi log (chỉ console.log ở nơi gọi).
 */
export function appendRunLog(entry, logPath) {
  if (!logPath) return;
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const time = new Date().toISOString();
  const line = `\n- **${time}** — ${entry}\n`;
  fs.appendFileSync(logPath, line, "utf8");
}
