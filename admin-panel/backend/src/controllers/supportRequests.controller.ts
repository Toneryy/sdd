// backend/src/controllers/supportRequests.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { SupportStatus } from "@prisma/client";

const VALID_STATUS: SupportStatus[] = ["pending", "active", "closed"];

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

export const updateSupportRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, operator_id, operator_description } = req.body;

  // валидация статуса
  if (status !== undefined && !VALID_STATUS.includes(status as any)) {
    return res.status(400).json({ message: `Неверный статус: ${status}` });
  }

  try {
    const updated = await prisma.support_requests.update({
      where: { id },
      data: {
        // Вот здесь только те три поля, что реально меняем:
        status,
        operator_id,
        operator_description,
      },
    });
    res.json(updated);
  } catch (err) {
    console.error("Error in updateSupportRequest:", err);
    res.status(500).json({ message: "Ошибка при обновлении обращения" });
  }
};

export const deleteSupportRequest = async (req: Request, res: Response) => {
  try {
    await prisma.support_requests.delete({ where: { id: req.params.id } });
    res.json({ id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при удалении обращения" });
  }
};
