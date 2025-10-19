/**
 * Форматирует строку цифр в вид +7 (999) 999-99-99
 */
export function formatRuPhone(input: string): string {
  const digits = input.replace(/\D/g, '');
  // приводим к 10 последним цифрам (без ведущей 7/8)
  let d = digits;
  if (d.length >= 11 && (d.startsWith('7') || d.startsWith('8'))) d = d.slice(1);
  if (d.length > 10) d = d.slice(-10);

  const a = d.slice(0, 3);
  const b = d.slice(3, 6);
  const c = d.slice(6, 8);
  const e = d.slice(8, 10);

  let out = '+7';
  if (a) out += ` (${a}`;
  if (a && a.length === 3) out += ')';
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (e) out += `-${e}`;
  return out;
}

/** Возвращает цифры телефона в формате +7XXXXXXXXXX */
export function normalizeRuPhoneToE164(input: string): string {
  const digits = input.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('7')) return `+${digits}`;
  return `+7${digits.slice(-10)}`;
}


