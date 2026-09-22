// Danh sách account Flow dự phòng cho auto-fallback ở 02b-media-generate.router.mjs — mirror
// loadModelRouting() trong router-client.mjs. Đọc scripts/flow-accounts.json; nếu file chưa
// tồn tại (chưa setup account dự phòng nào), trả về mặc định an toàn { priority: ["default"] }
// thay vì crash — mọi video vẫn chạy được với đúng 1 account như trước khi có tính năng này.
import fs from "node:fs";
import path from "node:path";

export function loadFlowAccounts(root = process.cwd()) {
  const filePath = path.join(root, "scripts", "flow-accounts.json");
  if (!fs.existsSync(filePath)) return { priority: ["default"] };
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}
