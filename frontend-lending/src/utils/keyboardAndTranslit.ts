// src/utils/keyboardAndTranslit.ts
// 📦 Утилита для раскладки + транслитерации
const enToRuMap: Record<string, string> = {
  q: "й",
  w: "ц",
  e: "у",
  r: "к",
  t: "е",
  y: "н",
  u: "г",
  i: "ш",
  o: "щ",
  p: "з",
  "[": "х",
  "]": "ъ",
  a: "ф",
  s: "ы",
  d: "в",
  f: "а",
  g: "п",
  h: "р",
  j: "о",
  k: "л",
  l: "д",
  ";": "ж",
  "'": "э",
  z: "я",
  x: "ч",
  c: "с",
  v: "м",
  b: "и",
  n: "т",
  m: "ь",
  ",": "б",
  ".": "ю",
  "/": ".",
};
const ruToEnMap = Object.fromEntries(
  Object.entries(enToRuMap).map(([en, ru]) => [ru, en])
);
const translitMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function convertLayout(text: string, map: Record<string, string>): string {
  return text
    .split("")
    .map((ch) => map[ch] || map[ch.toLowerCase()] || ch)
    .join("");
}

function transliterate(text: string): string {
  return text
    .split("")
    .map((ch) => translitMap[ch] || translitMap[ch.toLowerCase()] || ch)
    .join("");
}

/**
 * Возвращает варианты:
 * - исходный
 * - с переключённой раскладкой en→ru и ru→en
 * - транслитерацию из кириллицы в латиницу
 */
export function getSearchVariants(text: string): string[] {
  const lower = text.toLowerCase();
  const ru2en = convertLayout(lower, ruToEnMap);
  const en2ru = convertLayout(lower, enToRuMap);
  const tr = transliterate(lower);
  return Array.from(new Set([lower, ru2en, en2ru, tr]));
}
