import { RequestHandler } from "express";
import { prisma } from "../config/prisma";

// Все опубликованные новости
export const getPublishedNews: RequestHandler = async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      where: { published: true },
      orderBy: { created_at: "desc" },
    });
    res.json(news); // без return
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "FAILED_TO_FETCH_NEWS" });
  }
};

// Одна опубликованная новость
export const getPublishedNewsById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await prisma.news.findFirst({
      where: { id, published: true },
    });
    if (!news) {
      res.status(404).json({ message: "NEWS_NOT_FOUND" });
      return;
    }
    res.json(news);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "FAILED_TO_FETCH_NEWS" });
  }
};
