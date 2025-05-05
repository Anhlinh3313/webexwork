import CryptoJS from "crypto-js";
import path from "path";
import fs from "fs";
import ReadlineSync from "readline-sync";

const key = "";
const srcDir = "./src";

function decryptFile(filePath) {
  try {
    const encrypted = fs.readFileSync(filePath, "utf8");
    const decrypted = CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error("Nội dung giải mã bị rỗng");
    }

    fs.writeFileSync(filePath, decrypted, "utf8");
    console.log(`🔓 Decrypted: ${filePath}`);
  } catch (err) {
    console.error(`❌ Lỗi khi giải mã ${filePath}:`, err.message);
  }
}

function traverseAndDecrypt(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      traverseAndDecrypt(fullPath);
    } else if (/\.(js|jsx|ts|tsx|json)$/.test(file)) {
      decryptFile(fullPath);
    }
  });
}

if (!fs.existsSync(srcDir)) {
  console.error("⚠️ Không tìm thấy thư mục src/");
  process.exit(1);
}

const input = ReadlineSync.question("Nhập mật khẩu để giải mã: ");
if (input === "123456") {
  traverseAndDecrypt(srcDir);
  console.log("✅ Đã giải mã src/, bạn có thể build lại app.");
} else {
  console.log("🚫 Sai mật khẩu. Không thể giải mã.");
}