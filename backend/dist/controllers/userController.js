"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = void 0;
const db_1 = __importDefault(require("../config/db"));
// Получить пользователя по id
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM users WHERE id = $1", [
            id,
        ]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Ошибка при получении пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};
exports.getUserById = getUserById;
// Обновить пользователя
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, phone, subscription_id } = req.body;
    try {
        const result = await db_1.default.query(`UPDATE users
       SET email = $1, phone = $2, subscription_id = $3
       WHERE id = $4
       RETURNING *`, [email, phone, subscription_id, id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        console.error("Ошибка при обновлении пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};
exports.updateUser = updateUser;
// Удалить пользователя
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db_1.default.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        res.json({ message: "Пользователь удалён" });
    }
    catch (error) {
        console.error("Ошибка при удалении пользователя:", error);
        res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};
exports.deleteUser = deleteUser;
exports.default = {
    getUserById: exports.getUserById,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
};
