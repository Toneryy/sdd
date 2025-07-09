import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { encrypt, decrypt } from "../utils/crypto"; // <= верный импорт
import { safeDecrypt } from "../utils/safeDecrypt";

/* --------- GET /product-keys --------- */
export const listProductKeys = async (_: Request, res: Response) => {
  try {
    const keys = await prisma.product_keys.findMany({
      include: { products: true, keys_aliases: true },
      orderBy: { created_at: "desc" },
    });

    const data = keys.map((k) => ({
      ...k,
      key_encrypted: safeDecrypt(k.key_encrypted),
      keys_aliases: k.keys_aliases.map((a) => ({
        ...a,
        code: safeDecrypt(a.code),
      })),
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении ключей" });
  }
};
/* --------- POST /product-keys --------- */
export const addProductKey = async (req: Request, res: Response) => {
  const { key_encrypted, product_id, code } = req.body;

  if (!key_encrypted || !product_id || !code) {
    return res.status(400).json({ message: "Отсутствует одно из полей" });
  }

  try {
    const encryptedKey = encrypt(key_encrypted);
    const encryptedCode = encrypt(code);

    const created = await prisma.product_keys.create({
      data: {
        key_encrypted: encryptedKey,
        product_id,
        keys_aliases: {
          create: {
            code: encryptedCode,
          },
        },
      },
      include: {
        keys_aliases: true,
      },
    });

    res.status(201).json(created);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Ошибка при создании ключа" });
  }
};

/* --------- PUT /product-keys/:id --------- */
// controllers/product_keys.controller.ts
export const updateProductKey = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { key_encrypted, product_id, used } = req.body;

  try {
    const encrypted = encrypt(key_encrypted);

    const updated = await prisma.product_keys.update({
      where: { id },
      data: {
        key_encrypted: encrypted,
        product_id,
        used,
        updated_at: new Date(),
      },
      include: {
        // ⚠️ добавили
        products: true,
        keys_aliases: true,
      },
    });

    /* расшифровываем перед отправкой */
    res.json({
      ...updated,
      key_encrypted: safeDecrypt(updated.key_encrypted),
      keys_aliases: updated.keys_aliases.map((a) => ({
        ...a,
        code: safeDecrypt(a.code),
      })),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Ошибка при обновлении ключа" });
  }
};

export const deleteProductKey = async (req: Request, res: Response) => {
  try {
    await prisma.product_keys.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Ошибка при удалении ключа" });
  }
};
