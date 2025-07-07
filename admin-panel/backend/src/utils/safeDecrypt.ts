import { decrypt } from "./crypto";

export function safeDecrypt(src: string): string {
  const hexLike = /^[0-9a-f]+$/i.test(src) && src.length % 2 === 0;

  if (!hexLike) {
    console.log("[safeDecrypt] skip – not hex:", src.slice(0, 16), "..."); // 👀
    return src;
  }

  try {
    const plain = decrypt(src);
    return plain;
  } catch (e) {
    return src;
  }
}
