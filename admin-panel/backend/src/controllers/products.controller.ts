// backend/src/controllers/products.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Получение всех товаров с алиасами
export const listProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await prisma.products.findMany({
      include: {
        categories: true, // Подключаем категории
      },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении товаров" });
  }
};

// Добавление товара
export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, price, description, category_id, img } = req.body;
  try {
    const newProduct = await prisma.products.create({
      data: { name, price, description, category_id, img },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении товара" });
  }
};

// Обновление товара
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, price, description, category_id, img } = req.body;

  try {
    const updatedProduct = await prisma.products.update({
      where: { id },
      data: { name, price, description, category_id, img },
    });
    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении товара" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.products.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении товара" });
  }
};
