import fs from "node:fs";
import path from "node:path";
import { fetch as undiciFetch, Agent } from "undici";

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
 * @param {number} [opts.timeoutMs=120000] - hủy request nếu 9router không phản hồi trong khoảng
 *   thời gian này (mặc định 2 phút). Không retry tự động — call site tự xử lý lỗi ném ra.
 */
export async function callModel({
  model,
  messages,
  temperature,
  maxTokens,
  responseFormat,
  timeoutMs = 120000,
}) {
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
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  // fetch mặc định của Node huỷ sau 300s chờ header (UND_ERR_HEADERS_TIMEOUT) — request không streaming
  // của model suy luận chậm chỉ có header khi sinh xong, nên phải nới bằng đúng timeoutMs.
  const dispatcher = new Agent({ headersTimeout: timeoutMs, bodyTimeout: timeoutMs });
  let res;
  try {
    res = await undiciFetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      dispatcher,
    });
  } catch (e) {
    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
    if (e.name === "AbortError") {
      console.log(`  [9router] TIMEOUT sau ${elapsed}s`);
      throw new Error(`9router timeout sau ${timeoutMs}ms khi gọi ${model}`);
    }
    console.log(`  [9router] LỖI sau ${elapsed}s: ${e.message || e}`);
    throw e;
  } finally {
    clearTimeout(timeoutId);
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

/** Lỗi HẠ TẦNG khi gọi model (không phải lỗi nội dung): HTTP 403/408/429/5xx, timeout, mất kết nối.
 * Bài học thật (2026-09-26, audit Stage 7): reviewer hết hạn mức trả 503 bọc "[403] ... (reset after
 * 48s)"; trước đây lỗi này bị tính là 1 lần thử hỏng → vứt code đã PASS verify, sinh lại từ đầu —
 * ban-an-425-phan-1 mất 97/186 lần thử, hinh-phat 255/497 vì vậy.
 * Bài học thật #2 (2026-09-29, video ban-an-16-hoa-chuoi-kon-tum): 9router cũng có thể trả 400 "model
 * X không được hỗ trợ khi dùng Codex với tài khoản ChatGPT" — đây là lỗi CẤU HÌNH TÀI KHOẢN/ROUTING
 * phía backend (model đó vẫn PASS được ở lần gọi khác trong cùng lần chạy), không phải lỗi nội dung
 * request — cùng bản chất với 403/5xx nhưng mã 400 không khớp regex cũ, khiến cả 3 lần thử lãng phí
 * sinh lại code dù verify đã PASS thay vì chuyển ngay sang model dự phòng. */
export function isInfraError(e) {
  const msg = String(e?.message ?? e);
  return (
    /9router trả lỗi (403|408|429|5\d\d)\b/.test(msg) ||
    /9router trả lỗi 400\b.*not supported when using/i.test(msg) ||
    /9router timeout/.test(msg) ||
    /fetch failed|ECONNRESET|ECONNREFUSED|ETIMEDOUT|socket hang up|network/i.test(msg)
  );
}

/** Thời gian chờ trước lần gọi lại: đúng "reset after <thời lượng>" nếu nhà cung cấp báo (+2s), không
 * thì backoff 15/30/60s. Trần 180s/lần. Đã gặp thật cả 2 dạng: "reset after 48s" và "reset after 2m"
 * (có thể ghép "1m30s", "1h"). */
export function infraRetryDelayMs(e, retryIndex) {
  const m = String(e?.message ?? e).match(/reset after ((?:\d+\s*[hms]\s*)+)/i);
  let sec = null;
  if (m) {
    sec = 0;
    for (const [, n, u] of m[1].matchAll(/(\d+)\s*([hms])/gi)) sec += Number(n) * { h: 3600, m: 60, s: 1 }[u.toLowerCase()];
    sec += 2;
  }
  return Math.min(sec ?? [15, 30, 60][Math.min(retryIndex, 2)], 180) * 1000;
}

/** Gọi lần lượt theo chuỗi model (chính → dự phòng): model nào lỗi HẠ TẦNG (hết hạn mức 403/429,
 * 5xx, timeout, mạng) thì CHUYỂN NGAY sang model kế tiếp, không chờ. Chỉ khi MỌI model trong chuỗi
 * cùng lỗi mới chờ (thời gian ngắn nhất các model báo) rồi thử lại cả chuỗi, tối đa `maxRounds` vòng.
 * Lỗi không phải hạ tầng ném ra ngay. Trả `{ response, model }` để caller ghi đúng model đã dùng.
 * Lý do (quyết định người dùng 2026-09-26): reviewer hết hạn mức hàng loạt từng làm Stage 7 fail diện
 * rộng — tự chuyển model thay vì thử đi thử lại cùng 1 model đang bị khoá. */
export async function callWithModelFallback(models, fn, { label = "9router", maxRounds = 3, onInfraError } = {}) {
  const chain = [...new Set(models.filter(Boolean))];
  let lastErr;
  for (let round = 1; round <= maxRounds; round++) {
    let minWaitMs = Infinity;
    for (const [i, model] of chain.entries()) {
      try {
        return { response: await fn(model), model };
      } catch (e) {
        if (!isInfraError(e)) throw e;
        lastErr = e;
        onInfraError?.(e, model, round);
        minWaitMs = Math.min(minWaitMs, infraRetryDelayMs(e, round - 1));
        const next = chain[i + 1];
        console.log(`  [${label}] ${model} lỗi hạ tầng${next ? ` → chuyển ngay sang ${next}` : ""}: ${String(e.message).slice(0, 160)}`);
      }
    }
    if (round < maxRounds) {
      console.log(`  [${label}] mọi model đều lỗi (vòng ${round}/${maxRounds}), chờ ${minWaitMs / 1000}s rồi thử lại cả chuỗi.`);
      await new Promise((r) => setTimeout(r, minWaitMs));
    }
  }
  lastErr.infraExhausted = true;
  throw lastErr;
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
