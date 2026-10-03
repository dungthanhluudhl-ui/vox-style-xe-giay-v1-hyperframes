// ADN v2 (, vòng 4): ép các SCENE nối LIỀN MẠCH (tile) toàn bộ audio — sửa lỗi "khung đen giữa 2 scene".
// Nguyên nhân gốc (đo 03/10): Stage 5 do model sinh, mỗi scene bắt đầu ở lúc từ đầu tiên được nói → thời gian NGHỈ giữa các câu (40–730ms) không
// thuộc scene nào → bước ráp index.html không có slot ở đó → lộ nền gốc đen `#0a0a0a`. Đối chiếu flydubai-fz1073: 6/6 khoảng đen trong mp4
// trùng đúng 6 khe hở của scene-plan; ban-an-23: 1 khe hở 730ms = 1 khoảng đen 733ms. Repo gốc cũng có (ban-an-935: 25 khe hở/3,5s).
// Cách sửa: scene sau giữ NGUYÊN startMs (bám lúc từ đầu tiên được nói); phần nghỉ trước đó thuộc về scene TRƯỚC (hình trước giữ tới khi câu sau bắt đầu).

/** Sửa tại chỗ mảng scene MỚI (theo thứ tự): scene đầu bắt đầu ở `startMs`, mỗi scene kết thúc đúng lúc scene sau bắt đầu, scene cuối kết thúc ở `totalMs`.
 * Trả { changed: [{id, deltaMs}], errors: [...] }. Không đổi gì nếu đã liền mạch. */
export function tileScenes(scenes, { startMs = 0, totalMs = 0 } = {}) {
  const changed = [], errors = [];
  if (!scenes.length) return { changed, errors };
  if (scenes[0].startMs !== startMs) { changed.push({ id: `${scenes[0].id}.start`, deltaMs: startMs - scenes[0].startMs }); scenes[0].startMs = startMs; }
  for (let i = 0; i < scenes.length; i++) {
    const want = i + 1 < scenes.length ? scenes[i + 1].startMs : totalMs > 0 ? totalMs : scenes[i].endMs;
    if (scenes[i].endMs !== want) { changed.push({ id: scenes[i].id, deltaMs: want - scenes[i].endMs }); scenes[i].endMs = want; }
    if (scenes[i].endMs - scenes[i].startMs <= 0) errors.push(`${scenes[i].id}: thời lượng ${scenes[i].endMs - scenes[i].startMs}ms ≤ 0 sau khi nối liền mạch (startMs ${scenes[i].startMs}).`);
  }
  return { changed, errors };
}

/** Kiểm tra (lỗi cứng): scene đầu bắt đầu 0, các scene liền mạch không chồng/hở, scene cuối kết thúc ở totalMs (nếu biết). */
export function tilingProblems(scenes, totalMs = 0) {
  const p = [];
  if (!scenes.length) return p;
  if (scenes[0].startMs !== 0) p.push(`${scenes[0].id}: scene đầu bắt đầu ${scenes[0].startMs}ms (phải 0) — ${scenes[0].startMs}ms đầu video sẽ là khung đen.`);
  for (let i = 1; i < scenes.length; i++) {
    const d = scenes[i].startMs - scenes[i - 1].endMs;
    if (d > 0) p.push(`${scenes[i - 1].id}→${scenes[i].id}: khe hở ${d}ms giữa 2 scene (khung đen/trống khi chuyển cảnh).`);
    if (d < 0) p.push(`${scenes[i - 1].id}→${scenes[i].id}: chồng ${-d}ms giữa 2 scene.`);
  }
  const last = scenes[scenes.length - 1];
  if (totalMs > 0 && last.endMs !== totalMs) p.push(`${last.id}: scene cuối kết thúc ${last.endMs}ms, audio dài ${totalMs}ms.`);
  return p;
}
