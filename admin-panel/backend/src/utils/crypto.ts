import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secret = process.env.CRYPTO_SECRET || "";

if (secret.length !== 32) {
  throw new Error("CRYPTO_SECRET must be 32 characters long for aes-256-ctr");
}

const iv = Buffer.alloc(16, 0); // 16 байт нулей

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return encrypted.toString("hex");
}

export function decrypt(encrypted: string): string {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secret), iv);
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, "hex")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
