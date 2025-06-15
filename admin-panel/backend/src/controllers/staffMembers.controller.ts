// backend/src/controllers/staffMembers.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Получить всех сотрудников
export const listStaffMembers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const staffMembers = await prisma.staff_members.findMany();
    res.json(staffMembers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении сотрудников" });
  }
};

// Получить сотрудника по ID
export const getStaffMemberById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const staffMember = await prisma.staff_members.findUnique({
      where: { id },
    });
    if (!staffMember) {
      res.status(404).json({ message: "Сотрудник не найден" });
      return;
    }
    res.json(staffMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении сотрудника" });
  }
};

// Создать нового сотрудника
export const createStaffMember = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password, role } = req.body;
    const newStaffMember = await prisma.staff_members.create({
      data: { username, email, password, role },
    });
    res.status(201).json(newStaffMember);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при создании сотрудника" });
  }
};
