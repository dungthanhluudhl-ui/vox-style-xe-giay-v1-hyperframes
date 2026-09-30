// POC: nhờ vision model (9router) đọc lại chữ trong thẻ bản án ở khung đã render — Claude không tự xem ảnh.
import { callModel, extractText, imageContentFromFile, loadModelRouting } from "../../scripts/lib/router-client.mjs";
const model = loadModelRouting().vision_qa;
for (const f of process.argv.slice(2)) {
  const r = await callModel({
    model,
    messages: [{ role: "user", content: [
      { type: "text", text: "Đây là 1 khung hình video dọc 9:16. Trả lời ngắn gọn, KHÔNG chép lại chữ trong ảnh: (1) Có 1 thẻ tài liệu chứa ảnh chụp văn bản (bản án) không, nó nằm ở phần nào của khung (trên/giữa/dưới) và chiếm khoảng bao nhiêu % chiều rộng? (2) Chữ trong ảnh văn bản có ĐỌC ĐƯỢC rõ không (rõ/hơi mờ/không đọc được)? (3) Ảnh văn bản có bị cắt mép, bị làm mờ/tối, hoặc bị phần tử khác che không? (4) Có vùng chữ nào tô nền cam không? (5) Phụ đề (nếu có) nằm ở đâu và có đè lên ảnh văn bản không?" },
      imageContentFromFile(f, "image/png"),
    ] }],
    temperature: 0, maxTokens: 8000,
  });
  console.log("=== " + f + "\n" + extractText(r));
}
