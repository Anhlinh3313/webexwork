import CryptoJS from 'crypto-js'
import path from 'path'
import fs from 'fs'

const key = "";
const srcDir = "./src";

function encryptFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const encrypted = CryptoJS.AES.encrypt(content, key).toString();
  fs.writeFileSync(filePath, encrypted, "utf8");
  console.log(`🔒 Encrypted: ${filePath}`);
}

function traverseAndEncrypt(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      traverseAndEncrypt(fullPath);
    } else if (/\.(js|jsx|ts|tsx|json)$/.test(file)) {
      encryptFile(fullPath);
    }
  });
}

traverseAndEncrypt(srcDir);
console.log("✅ Đã mã hóa toàn bộ src/");