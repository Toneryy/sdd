// landing/src/controllers/posts.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getPost = async (_req: Request, res: Response) => {
  try {
    const post = await prisma.posts.findFirst();
    res.json(post || {});
  } catch (err) {
    console.error("Ошибка getPost:", err);
    res.status(500).json({ message: "Не удалось получить пост" });
  }
};
