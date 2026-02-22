import crypto from "crypto";

const ALGO_SAFE = "aes-256-cbc"; // то, чем будем ШИФРОВАТЬ дальше
const ALGO_OLD_CBC = "aes-256-cbc"; // лендинг, фикс-IV
const ALGO_OLD_CTR = "aes-256-ctr"; // старая админка

const KEY = (process.env.CRYPTO_SECRET ?? "").padEnd(32, "0").slice(0, 32);
if (KEY.length !== 32) throw new Error("CRYPTO_SECRET must be 32 bytes!");

// ---------- helpers ----------
const ivSha256 = (plain: string) =>
  crypto
    .createHash("sha256")
    .update(plain + KEY)
    .digest()
    .subarray(0, 16);

const NULL_IV = Buffer.alloc(16, 0);

// ---------- encrypt (новый, random IV + CBC) ----------
export function encrypt(plain: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO_SAFE, Buffer.from(KEY), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return iv.toString("hex") + ":" + enc.toString("hex");
}

// ---------- decrypt c авто-определением формата ----------
export function decrypt(data: string): string {
  // 1) формат iv:cipherHex  →  CBC (новый или «старый лендинг»)
  if (data.includes(":")) {
    const [ivHex, encHex] = data.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const enc = Buffer.from(encHex, "hex");

    // пробуем «новый» CBC c random IV
    try {
      const dec1 = crypto
        .createDecipheriv(ALGO_SAFE, Buffer.from(KEY), iv)
        .update(enc) as Buffer;
      const tail1 = crypto
        .createDecipheriv(ALGO_SAFE, Buffer.from(KEY), iv)
        .final() as Buffer;
      return Buffer.concat([dec1, tail1]).toString("utf8");
    } catch (_) {
      // если не вышло — это «старый детерминированный CBC (лендинг)»
      const decipher = crypto.createDecipheriv(
        ALGO_OLD_CBC,
        Buffer.from(KEY),
        iv
      );
      const dec = Buffer.concat([decipher.update(enc), decipher.final()]);
      return dec.toString("utf8");
    }
  }

  // 2) иначе — CTR с нулевым IV (старая админка)
  const decipher = crypto.createDecipheriv(
    ALGO_OLD_CTR,
    Buffer.from(KEY),
    NULL_IV
  );
  const dec = Buffer.concat([
    decipher.update(Buffer.from(data, "hex")),
    decipher.final(),
  ]);
  return dec.toString("utf8");
}
