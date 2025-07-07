import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { safeDecrypt } from "../utils/safeDecrypt";

// GET /api/admin/keys-aliases?page=1&limit=30
export const listAliasKeys = async (req: Request, res: Response) => {
  try {
    const page = +req.query.page! || 1;
    const limit = +req.query.limit! || 20;
    const skip = (page - 1) * limit;

    const [total, aliases] = await Promise.all([
      prisma.keys_aliases.count(),
      prisma.keys_aliases.findMany({
        include: { product_keys: { include: { products: true } } },
        orderBy: { created_at: "desc" },
        skip,
        take: limit,
      }),
    ]);

    const data = aliases.map((a) => ({
      ...a,
      code: safeDecrypt(a.code),
      product_keys: a.product_keys
        ? {
            ...a.product_keys,
            key_encrypted: safeDecrypt(a.product_keys.key_encrypted),
          }
        : null,
    }));

    res.json({ data, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении кодов" });
  }
};

export const deleteAliasKey = async (req: Request, res: Response) => {
  try {
    await prisma.keys_aliases.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении" });
  }
};
