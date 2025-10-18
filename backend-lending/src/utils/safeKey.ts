// src/utils/safeKey.ts
import { decrypt } from "../crypto/crypto";

/**
 * Пытаемся расшифровать ключ (формат ivHex:cipherHex).
 * Если формат неизвестен/сломанный — безопасно возвращаем исходник.
 */
export function safeDecryptKey(src: string): string {
  // ivHex:cipherHex (iv = 16 байт → 32 hex)
  const looksLikeIvCipher = /^[0-9a-f]{32}:[0-9a-f]+$/i.test(src);

  // на всякий случай поддержим "старые" форматы/эксперименты:
  const looksLikeHex = /^[0-9a-f]+$/i.test(src) && src.length % 2 === 0;

  if (!looksLikeIvCipher && !looksLikeHex) {
    return src;
  }

  try {
    return decrypt(src);
  } catch {
    // не падаем — возвращаем как есть (лучше отдать raw, чем 500)
    return src;
  }
}

/** Маскировка для админки/логов */
export function maskKey(k: string): string {
  if (!k) return "";
  if (k.length <= 8) return "*".repeat(k.length);
  return `${k.slice(0, 4)}-****-****-${k.slice(-4)}`;
}
