// backend/src/controllers/drafts.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const listDrafts = async (_req: Request, res: Response) => {
  try {
    const drafts = await prisma.draft.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(drafts);
  } catch (err) {
    console.error("Ошибка listDrafts:", err);
    res.status(500).json({ message: "Не удалось получить черновики" });
  }
};

export const createDraft = async (req: Request, res: Response) => {
  try {
    const { raw_html, description, image, button_text, button_href } = req.body;
    const draft = await prisma.draft.create({
      data: { raw_html, description, image, button_text, button_href },
    });
    res.status(201).json(draft);
  } catch (err) {
    console.error("Ошибка createDraft:", err);
    res.status(500).json({ message: "Не удалось создать черновик" });
  }
};

export const updateDraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { raw_html, description, image, button_text, button_href } = req.body;
    const draft = await prisma.draft.update({
      where: { id },
      data: { raw_html, description, image, button_text, button_href },
    });
    res.json(draft);
  } catch (err) {
    console.error("Ошибка updateDraft:", err);
    res.status(500).json({ message: "Не удалось обновить черновик" });
  }
};

export const deleteDraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.draft.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    console.error("Ошибка deleteDraft:", err);
    res.status(500).json({ message: "Не удалось удалить черновик" });
  }
};
