// backend/src/controllers/posts.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getPost = async (_req: Request, res: Response) => {
  try {
    // берем единственный пост (или null)
    const post = await prisma.post.findFirst();
    res.json(post || {});
  } catch (err) {
    console.error("Ошибка getPost:", err);
    res.status(500).json({ message: "Не удалось получить пост" });
  }
};

export const upsertPost = async (req: Request, res: Response) => {
  try {
    const { raw_html, description, image, button_text, button_href } = req.body;
    // проверяем, есть ли уже запись
    const existing = await prisma.post.findFirst();

    let post;
    if (existing) {
      post = await prisma.post.update({
        where: { id: existing.id },
        data: { raw_html, description, image, button_text, button_href },
      });
    } else {
      post = await prisma.post.create({
        data: { raw_html, description, image, button_text, button_href },
      });
    }

    res.json(post);
  } catch (err) {
    console.error("Ошибка upsertPost:", err);
    res.status(500).json({ message: "Не удалось сохранить пост" });
  }
};

export const deletePost = async (_req: Request, res: Response) => {
  try {
    // удаляем всё (т.к. должен быть максимум один)
    await prisma.post.deleteMany();
    res.status(204).end();
  } catch (err) {
    console.error("Ошибка deletePost:", err);
    res.status(500).json({ message: "Не удалось удалить пост" });
  }
};
