// src/controllers/purchase.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// POST /api/shop/purchase
export const purchaseProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId, productId } = req.body;
  if (!userId || !productId) {
    res.status(400).json({ error: "userId и productId обязательны" });
    return;
  }

  try {
    // 1) Ищем первый свободный ключ
    const key = await prisma.product_keys.findFirst({
      where: { product_id: productId, used: false },
      orderBy: { created_at: "asc" },
    });
    if (!key) {
      res.status(400).json({ error: "Нет доступных ключей" });
      return;
    }

    // 2) Создаём запись покупки с unchecked-input через 'as any'
    const purchase = await prisma.user_products.create({
      data: {
        user_id: userId,
        product_id: productId,
        product_key_id: key.id,
      } as any, // <-- без этого TS не пропустит
    });

    // 3) Помечаем ключ как использованный
    await prisma.product_keys.update({
      where: { id: key.id },
      data: { used: true },
    });

    res.json({
      success: true,
      purchaseId: purchase.id,
      key: key.key_encrypted,
    });
  } catch (error) {
    console.error("Ошибка при покупке товара:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
