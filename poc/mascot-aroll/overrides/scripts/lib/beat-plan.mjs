// POC mascot-aroll (ADN v2, vòng 4): LUẬT THỜI GIAN CỦA BEAT mascot trong cảnh asset — nguồn DUY NHẤT, tất định (không AI).
// Beat luôn nằm ở ĐUÔI cảnh asset: từ `startMs` tới hết cảnh. Độ dài beat do CHỮ quyết định (chữ hiện suốt beat → không còn "đuôi trống"
// hay chữ biến mất sớm), kẹp trong [3s, 7s]; asset toàn khung phải chạy đủ lâu TRƯỚC beat để người xem kịp nhìn.
import { holdFor, TEXT_LEAD_SEC, MAX_HOLD_SEC } from "./mascot-text.mjs";

export const BEAT_MIN_LEAD_SEC = 3.0; // asset toàn khung tối thiểu trước beat (tính từ đầu cảnh)
export const BEAT_MIN_LAST_SHOT_SEC = 2.0; // shot cuối chạy toàn khung ít nhất chừng này trước beat
export const BEAT_MIN_SEC = 3.0;
export const BEAT_MAX_SEC = 7.0;
export const BEAT_TAIL_SEC = 0.35; // chữ kết thúc trước hết beat chừng này (gồm fade-out)
export const BEAT_SLACK_SEC = 0.6; // chữ giữ lâu hơn mức tối thiểu chừng này (phản hồi người dùng: chữ vào/ra nhanh)

/** Độ dài beat tối thiểu (giây) để đủ chỗ cho chữ + mascot trượt vào/ra. */
export const beatNeedSec = (te) => Math.max(BEAT_MIN_SEC, te?.text ? TEXT_LEAD_SEC + holdFor(te.text, te.format) + BEAT_TAIL_SEC : 0);

/**
 * Tính beat cho 1 cảnh asset. textIntent = {text, format} | null. Trả { startMs, durSec, textEvent|null } hoặc { error }.
 * Lùi `startMs` từ cuối cảnh đúng độ dài mong muốn (need + slack, ≤7s); nếu rơi vào vùng cấm (asset chưa đủ lâu trên màn hình) thì dời MUỘN lại
 * — beat ngắn đi nhưng vẫn phải ≥ need, nếu không báo lỗi để Stage 5 sửa (không tự cắt chữ).
 */
export function planBeat({ sceneStartMs, sceneEndMs, lastShotStartMs, textIntent }) {
  const need = beatNeedSec(textIntent);
  const want = Math.min(BEAT_MAX_SEC, need + BEAT_SLACK_SEC);
  const earliest = Math.max(sceneStartMs + BEAT_MIN_LEAD_SEC * 1000, lastShotStartMs + BEAT_MIN_LAST_SHOT_SEC * 1000);
  const startMs = Math.round(Math.max(sceneEndMs - want * 1000, earliest));
  const durSec = (sceneEndMs - startMs) / 1000;
  if (durSec < need - 0.001) return { error: `chỉ còn ${durSec.toFixed(2)}s cho beat (cần ≥${need.toFixed(2)}s): cảnh quá ngắn hoặc shot cuối chưa chạy đủ ${BEAT_MIN_LAST_SHOT_SEC}s toàn khung.` };
  let textEvent = null;
  if (textIntent?.text) {
    const atMs = startMs + Math.round(TEXT_LEAD_SEC * 1000);
    const holdMs = Math.min(Math.round(MAX_HOLD_SEC * 1000), Math.round((durSec - TEXT_LEAD_SEC - BEAT_TAIL_SEC + 0.05) * 1000));
    textEvent = { text: textIntent.text, format: textIntent.format, atMs, holdMs };
  }
  return { startMs, durSec: +durSec.toFixed(3), textEvent };
}
