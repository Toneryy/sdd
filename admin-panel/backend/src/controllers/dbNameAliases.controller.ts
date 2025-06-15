// backend/src/controllers/dbNameAliases.controller.ts
import { Request, Response } from "express";
import { prisma } from "../config/prisma";

/** вернуть все алиасы */
export const listDbNameAliases = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const dbAliases = await prisma.db_name_aliases.findMany();
    res.json(dbAliases); // Отправляем все алиасы
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении алиасов" });
  }
};

/** обновить алиас */
export const updateDbNameAlias = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { alias_name, description } = req.body;
  try {
    const updated = await prisma.db_name_aliases.update({
      where: { id },
      data: { alias_name, description },
    });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при обновлении алиаса" });
  }
};
