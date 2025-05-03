"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const prisma_1 = require("../config/prisma");
const getProfile = async (req, res) => {
    const userId = req.userId; // уже string
    try {
        const user = await prisma_1.prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                created_at: true,
            },
        });
        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        const activeSubscription = await prisma_1.prisma.user_subscriptions.findFirst({
            where: { user_id: userId, active: true },
            orderBy: { end_date: "desc" },
            include: { subscriptions: true },
        });
        const supportHistory = await prisma_1.prisma.support_requests.findMany({
            where: { user_id: userId },
            orderBy: { created_at: "desc" },
            take: 10,
        });
        res.json({ user, activeSubscription, supportHistory });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });
    }
};
exports.getProfile = getProfile;
