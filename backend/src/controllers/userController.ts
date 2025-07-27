import { Request, Response } from "express";
import db from "../config/db";
import User from "../models/User";

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await db.query<User>("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error("Ошибка при получении пользователя:", err);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, phone, subscription_id } = req.body;
  try {
    const result = await db.query<User>(
      `UPDATE users
       SET username = $1, email = $2, phone = $3, subscription_id = $4
       WHERE id = $5
       RETURNING *`,
      [username, email, phone, subscription_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    return res.json(result.rows[0]);
  } catch (err: any) {
    console.error("Ошибка при обновлении пользователя:", err);
    // PostgreSQL duplicate key error
    if (err.code === "23505") {
      return res
        .status(400)
        .json({ message: "Имя, email или телефон уже используются" });
    }
    return res
      .status(500)
      .json({ message: "Ошибка при обновлении пользователя" });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await db.query<User>(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    return res.json({ message: "Пользователь удалён" });
  } catch (err) {
    console.error("Ошибка при удалении пользователя:", err);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export default {
  getUserById,
  updateUser,
  deleteUser,
};
