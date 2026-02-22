import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { encrypt } from "../utils/crypto";
import { safeDecrypt } from "../utils/safeDecrypt";

const toDashed = (d: string) =>
  d.replace(/^(\d{2})(\d{4})(\d{4})(\d{4})(\d{4})$/, "$1-$2-$3-$4-$5");

export const lookupKey = async (req: Request, res: Response) => {
  /* — 1. нормализуем ввод — */
  const raw18 = (req.params.raw || "").replace(/\D/g, "");
  if (raw18.length !== 18)
    return res.status(400).json({ message: "Нужно ввести ровно 18 цифр" });

  const raw22 = toDashed(raw18); // xx-xxxx-xxxx-xxxx-xxxx
  const enc18 = encrypt(raw18); // шифр «без дефисов»
  const enc22 = encrypt(raw22); // шифр «c дефисами»

  /* — 2. ищем псевдокод — */
  const aliasRow = await prisma.keys_aliases.findFirst({
    where: {
      OR: [
        { code: raw18 }, // вдруг лежит открытый текст без дефисов
        { code: raw22 }, // вдруг лежит открытый текст с дефисами
        { code: enc18 }, // hex-шифр без дефисов
        { code: enc22 }, // 🔑 hex-шифр с дефисами  ← этого раньше не было
      ],
    },
    include: {
      product_keys: { include: { products: true, keys_aliases: true } },
    },
  });

  /* — 3. если не нашли код, ищем сам ключ (на случай ввода ключа) — */
  const keyRow = await prisma.product_keys.findFirst({
    where: {
      OR: [
        { key_encrypted: encrypt(raw18) }, // hex-шифр ключа (23-симв.)
        { key_encrypted: raw18 }, // plaintext-ключ
      ],
    },
    include: { products: true, keys_aliases: true },
  });

  if (!aliasRow && !keyRow)
    return res.status(404).json({ message: "Код не найден" });

  const productKey = keyRow ?? aliasRow!.product_keys!;
  const alias = aliasRow ?? productKey.keys_aliases[0];

  res.json({
    key_encrypted: safeDecrypt(productKey.key_encrypted),
    code: safeDecrypt(alias.code),
    used: productKey.used,
    product: productKey.products?.name ?? null,
    created_at: productKey.created_at,
    updated_at: productKey.updated_at,
  });
};
