import crypto from "crypto";

const ALGO = "aes-256-cbc";
const KEY = (process.env.ENCRYPTION_KEY ?? "defaultkey12345678901234567890")
  .padEnd(32, "0") // ровно 32 байта
  .slice(0, 32);

const ivFrom = (plain: string) =>
  crypto
    .createHash("sha256")
    .update(plain + KEY)
    .digest()
    .subarray(0, 16); // 16-байтовый IV

export const encrypt = (plain: string): string => {
  const iv = ivFrom(plain); // фиксированный IV → детерминированно
  const cipher = crypto.createCipheriv(ALGO, Buffer.from(KEY), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return iv.toString("hex") + ":" + enc.toString("hex"); // iv:cipherHex
};

export const decrypt = (data: string): string => {
  const [ivHex, encHex] = data.split(":");
  const decipher = crypto.createDecipheriv(
    ALGO,
    Buffer.from(KEY),
    Buffer.from(ivHex, "hex")
  );
  const dec = Buffer.concat([
    decipher.update(Buffer.from(encHex, "hex")),
    decipher.final(),
  ]);
  return dec.toString("utf8");
};
