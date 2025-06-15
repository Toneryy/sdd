// backend/src/controllers/staffRights.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Получить все права
export const listStaffRights = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const staffRights = await prisma.staff_rights.findMany();
    res.json(staffRights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении прав доступа" });
  }
};

// Создать права доступа для роли
export const createStaffRights = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role, component_name, can_access } = req.body;
    const newStaffRights = await prisma.staff_rights.create({
      data: { role, component_name, can_access },
    });
    res.status(201).json(newStaffRights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при создании прав доступа" });
  }
};
