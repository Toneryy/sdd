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

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await prisma.categories.update({
      where: { id },
      data: { name },
    });
    res.json(updatedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении категории" });
  }
};

// Удаление категории
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.categories.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении категории" });
  }
};
