// src/controllers/userController.ts
import { Request, Response } from "express";
import db from "../config/db";
import User from "../models/User";
import { withEncryptedUser } from "../utils/withEncryptedUser";
import { withDecryptedUser } from "../utils/withDecryptedUser";

/* ---------- GET /api/users/:id ---------- */
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await db.query<User>("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Пользователь не найден" });

    return res.json(withDecryptedUser(result.rows[0] as any));
  } catch (err) {
    console.error("Ошибка при получении пользователя:", err);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

/* ---------- PUT /api/users/:id ---------- */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, phone, subscription_id } = req.body;

  // шифруем только пришедшие поля
  const enc = withEncryptedUser({ username, email, phone });

  try {
    const result = await db.query<User>(
      `UPDATE users
         SET username        = COALESCE($1, username),
             email           = COALESCE($2, email),
             phone           = COALESCE($3, phone),
             subscription_id = COALESCE($4, subscription_id)
       WHERE id = $5
       RETURNING *`,
      [
        enc.username ?? null,
        enc.email ?? null,
        enc.phone ?? null,
        subscription_id ?? null,
        id,
      ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Пользователь не найден" });

    return res.json(withDecryptedUser(result.rows[0]));
  } catch (err) {
    console.error("Ошибка при обновлении пользователя:", err);
    return res
      .status(500)
      .json({ message: "Ошибка при обновлении пользователя" });
  }
};

/* ---------- DELETE /api/users/:id ---------- */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await db.query<User>(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Пользователь не найден" });

    return res.json({ message: "Пользователь удалён" });
  } catch (err) {
    console.error("Ошибка при удалении пользователя:", err);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export default { getUserById, updateUser, deleteUser };
