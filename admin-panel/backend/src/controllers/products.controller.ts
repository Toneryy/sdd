// controllers/products.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client"; // ← ДОБАВИЛИ

/* ---------- GET  /api/admin/products ---------- */
export const listProducts = async (_: Request, res: Response) => {
  try {
    const products = await prisma.products.findMany({
      include: { categories: true },
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении товаров" });
  }
};

/* ---------- POST /api/admin/products ---------- */
export const addProduct = async (req: Request, res: Response) => {
  const { name, price, description, category_id, img } = req.body;
  try {
    const created = await prisma.products.create({
      data: { name, price, description, category_id, img },
    });
    res.status(201).json(created);
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res
        .status(409)
        .json({ message: "Товар с таким названием уже существует" });
    }
    console.error(err);
    res.status(500).json({ message: "Ошибка при добавлении товара" });
  }
};

/* ---------- PUT /api/admin/products/:id ---------- */
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, category_id, img } = req.body;

  try {
    const updated = await prisma.products.update({
      where: { id },
      data: { name, price, description, category_id, img },
    });
    res.json(updated);
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res
        .status(409)
        .json({ message: "Товар с таким названием уже существует" });
    }
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении товара" });
  }
};

/* ---------- DELETE /api/admin/products/:id ---------- */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.products.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении товара" });
  }
};
