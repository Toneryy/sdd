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

    const products = await prisma.products.findMany({
      where,
      include: { category: { select: { name: true } } },
    });

    const result = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      category: p.category?.name,
      img: p.img || null,
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
      include: { category: { select: { name: true } } },
    });

    if (!p) {
      res.status(404).json({ message: "Товар не найден" });
      return;
    }

    res.json({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      category: p.category?.name,
      img: p.img || null,
      description: p.description || "",
    });
  } catch (error) {
    console.error("Ошибка получения товара:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
