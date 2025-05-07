import crypto from "crypto";

const algorithm = "aes-256-cbc";
const secretKey =
  process.env.ENCRYPTION_KEY || "defaultkey12345678901234567890"; // 32 байта!
const ivLength = 16; // для AES

if (secretKey.length !== 32) {
  throw new Error("ENCRYPTION_KEY должен быть длиной 32 байта");
}

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

export const decrypt = (data: string): string => {
  const [ivHex, encryptedHex] = data.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secretKey),
    iv
  );
  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
};
