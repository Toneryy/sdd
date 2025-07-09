// controllers/categories.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client"; // ← ДОБАВИЛИ

/* ---------- GET  /api/admin/categories ---------- */
export const listCategories = async (_: Request, res: Response) => {
  try {
    const categories = await prisma.categories.findMany();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении категорий" });
  }
};

/* ---------- POST /api/admin/categories ---------- */
export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const created = await prisma.categories.create({ data: { name } });
    res.status(201).json(created);
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res
        .status(409)
        .json({ message: "Категория с таким названием уже существует" });
    }
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении категории" });
  }
};

/* ---------- PUT /api/admin/categories/:id ---------- */
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updated = await prisma.categories.update({
      where: { id },
      data: { name },
    });
    res.json(updated);
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res
        .status(409)
        .json({ message: "Категория с таким названием уже существует" });
    }
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении категории" });
  }
};

/* ---------- DELETE /api/admin/categories/:id ---------- */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await prisma.categories.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении категории" });
  }
};
