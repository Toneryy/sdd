"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../config/prisma");
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = require("jsonwebtoken");
const jwt_1 = require("../config/jwt");
const register = async (req, res) => {
    const { username, email, phone, password } = req.body;
    const existingUser = await prisma_1.prisma.users.findUnique({ where: { email } });
    if (existingUser) {
        res.status(400).json({ message: "Пользователь уже существует" });
        return;
    }
    const hashed = await (0, hash_1.hashPassword)(password);
    await prisma_1.prisma.users.create({
        data: { username, email, phone, password: hashed },
    });
    res.status(201).json({ message: "Регистрация прошла успешно" });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma_1.prisma.users.findUnique({ where: { email } });
    if (!user) {
        res.status(404).json({ message: "Неверный логин или пароль" });
        return;
    }
    const isMatch = await (0, hash_1.comparePassword)(password, user.password);
    if (!isMatch) {
        res.status(401).json({ message: "Неверный логин или пароль" });
        return;
    }
    // Приводим опции к any, чтобы TS не ругался на expiresIn
    const options = { expiresIn: jwt_1.JWT_EXPIRES_IN };
    const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, jwt_1.JWT_SECRET, options);
    res.json({
        token,
        user: { id: user.id, email: user.email, username: user.username },
    });
};
exports.login = login;
