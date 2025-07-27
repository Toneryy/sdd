import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Получить все обращения
export const listSupportRequests = async (_: Request, res: Response) => {
  try {
    const requests = await prisma.support_requests.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении обращений" });
  }
};

// Обновить обращение
export const updateSupportRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, operator_id, operator_description } =
    req.body;

  try {
    const updated = await prisma.support_requests.update({
      where: { id },
      data: { title, description, status, operator_id, operator_description },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении обращения" });
  }
};

// Удалить обращение
export const deleteSupportRequest = async (req: Request, res: Response) => {
  try {
    await prisma.support_requests.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении обращения" });
  }
};
