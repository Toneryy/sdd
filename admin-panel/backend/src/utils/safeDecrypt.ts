// src/utils/safeDecrypt.ts
import { decrypt } from "./crypto";

export function safeDecrypt(src: string): string {
  // if it looks like iv:cipherHex → try decrypt
  const looksLikeIvcipher = /^[0-9a-f]+:[0-9a-f]+$/i.test(src);
  // if it’s a pure hex string of even length → try decrypt (old CTR)
  const looksLikeHex = /^[0-9a-f]+$/i.test(src) && src.length % 2 === 0;

  if (!looksLikeIvcipher && !looksLikeHex) {
    // nothing to do
    return src;
  }

  try {
    return decrypt(src);
  } catch (e) {
    console.warn("[safeDecrypt] failed to decrypt, returning raw:", e);
    return src;
  }
}
