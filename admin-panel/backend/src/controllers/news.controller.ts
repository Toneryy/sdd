// src/controllers/news.controller.ts
import type { RequestHandler } from "express";
import { prisma } from "../config/prisma";

// Получить все новости
export const getNews: RequestHandler = async (req, res) => {
  try {
    const { published } = req.query;
    const news = await prisma.news.findMany({
      where: published !== undefined ? { published: published === "true" } : {},
      orderBy: { created_at: "desc" },
    });
    res.json(news);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "FAILED_TO_FETCH_NEWS" });
  }
};

// Получить одну новость
export const getNewsById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) return res.status(404).json({ message: "NEWS_NOT_FOUND" });
    res.json(news);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "FAILED_TO_FETCH_NEWS" });
  }
};

// Создать новость
export const createNews: RequestHandler = async (req, res) => {
  try {
    const { title, description, image, content, styles, published } = req.body;

    const news = await prisma.news.create({
      data: {
        title,
        description,
        image,
        content, // сохраняем как строку (raw HTML)
        styles, // сохраняем CSS
        published: published ?? false,
      },
    });

    res.json(news);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "FAILED_TO_CREATE_NEWS" });
  }
};

// Обновить новость
export const updateNews: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, content, styles, published } = req.body;

    const news = await prisma.news.update({
      where: { id },
      data: {
        title,
        description,
        image,
        content, // raw HTML
        styles,
        published,
      },
    });

    res.json(news);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "FAILED_TO_UPDATE_NEWS" });
  }
};

// Удалить новость
export const deleteNews: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.news.delete({ where: { id } });
    res.json({ message: "NEWS_DELETED" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "FAILED_TO_DELETE_NEWS" });
  }
};
