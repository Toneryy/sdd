import { Request, Response } from "express";
import db from "../config/db";
import User from "../models/User";

// Получить пользователя по id
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await db.query<User>("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при получении пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

// Обновить пользователя
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { email, phone, subscription_id } = req.body;
  try {
    const result = await db.query<User>(
      `UPDATE users
       SET email = $1, phone = $2, subscription_id = $3
       WHERE id = $4
       RETURNING *`,
      [email, phone, subscription_id, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Ошибка при обновлении пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

// Удалить пользователя
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await db.query<User>(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }
    res.json({ message: "Пользователь удалён" });
  } catch (error) {
    console.error("Ошибка при удалении пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export default {
  getUserById,
  updateUser,
  deleteUser,
};
