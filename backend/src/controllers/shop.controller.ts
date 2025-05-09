// src/controllers/shop.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// GET /api/shop/categories
export const getCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await prisma.categories.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (error) {
    console.error("Ошибка получения категорий:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

// GET /api/shop/products
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : Number.MAX_SAFE_INTEGER;
    const categoryId = req.query.categoryId as string | undefined;

    const where: any = { price: { gte: minPrice, lte: maxPrice } };
    if (categoryId) where.category_id = categoryId;

    // 1) Берём продукты с привязкой к categories
    const products = await prisma.products.findMany({
      where,
      include: {
        categories: { select: { name: true } }, // <-- здесь
      },
    });

    // 2) Считаем доступные ключи
    const counts = await prisma.product_keys.groupBy({
      by: ["product_id"],
      where: { used: false },
      _count: { _all: true },
    });
    const countMap: Record<string, number> = {};
    counts.forEach((c) => {
      if (c.product_id) countMap[c.product_id] = c._count._all;
    });

    // 3) Собираем ответ
    const result = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      category: p.categories?.name ?? null,
      img: p.img ?? null,
      description: p.description ?? null,
      available: countMap[p.id] ?? 0,
    }));

    res.json(result);
  } catch (error) {
    console.error("Ошибка получения товаров:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

// GET /api/shop/products/:id
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const p = await prisma.products.findUnique({
      where: { id },
      include: {
        categories: { select: { name: true } },
      },
    });
    if (!p) {
      res.status(404).json({ message: "Товар не найден" });
      return;
    }

    const available = await prisma.product_keys.count({
      where: { product_id: id, used: false },
    });

    res.json({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      category: p.categories?.name ?? null,
      img: p.img ?? null,
      description: p.description ?? null,
      available,
    });
  } catch (error) {
    console.error("Ошибка получения товара:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
