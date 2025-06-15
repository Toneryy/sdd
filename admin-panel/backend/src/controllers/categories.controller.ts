// backend/src/controllers/categories.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Получение всех категорий
export const listCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await prisma.categories.findMany();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении категорий" });
  }
};

// Добавление новой категории
export const addCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body; // Убираем description
  try {
    const newCategory = await prisma.categories.create({
      data: { name }, // Только name
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении категории" });
  }
};
