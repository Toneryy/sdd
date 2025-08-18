// src/pages/CheckoutSuccessDev/CheckoutSuccessDev.tsx
import React, { useEffect, useMemo, useState } from "react";
import styles from "./CheckoutSuccessDev.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderStatus } from "../../api/purchase";

type OrderItem = {
    id: string;
    type: "product" | "subscription";
    productId?: string | null;
    subscriptionId?: string | null;
    qty: number;
    aliases: string[];
};

type OrderStatusResponse = {
    orderId: string;
    orderNumber: string;
    status: string;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
};

const CheckoutSuccessDev: React.FC = () => {
    const { orderNumber } = useParams<{ orderNumber: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<OrderStatusResponse | null>(null);

    useEffect(() => {
        (async () => {
            if (!orderNumber) return;
            try {
                setLoading(true);
                const data = await getOrderStatus(orderNumber);
                setOrder(data);
            } catch (e: any) {
                toast.error(e?.response?.data?.message || "Не удалось загрузить заказ");
                navigate("/profile");
            } finally {
                setLoading(false);
            }
        })();
    }, [orderNumber, navigate]);

    const codes = useMemo(() => {
        if (!order) return [];
        const all = order.items.flatMap((it) => it.aliases || []);
        // уникализируем на всякий случай
        return Array.from(new Set(all));
    }, [order]);

    if (loading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Оплата успешна</h1>
                <p className={styles.note}>Загружаем данные заказа…</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Оплата успешна</h1>
                <p className={styles.note}>Данные заказа не найдены</p>
                <div className={styles.btns}>
                    <button onClick={() => navigate("/shop")}>В магазин</button>
                    <button onClick={() => navigate("/profile")}>В профиль</button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Оплата успешна ✅</h1>
            <p className={styles.orderLine}>
                Заказ <strong>№{order.orderNumber}</strong> — статус:{" "}
                <strong>{order.status}</strong>
            </p>

            {codes.length > 0 ? (
                <>
                    <h2 className={styles.subtitle}>Коды активации</h2>
                    <ul className={styles.codeList}>
                        {codes.map((c) => (
                            <li key={c} className={styles.codeItem}>
                                <code>{c}</code>
                                <button
                                    onClick={() => {
                                        navigator.clipboard?.writeText(c);
                                        toast.info("Скопировано");
                                    }}
                                >
                                    Копировать
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className={styles.note}>
                    Код(ы) пока не найдены. Если это подписка, записи появятся в профиле.
                </p>
            )}

            <div className={styles.btns}>
                <button onClick={() => navigate("/shop")}>В магазин</button>
                <button onClick={() => navigate("/profile")}>В профиль</button>
            </div>
        </div>
    );
};

export default CheckoutSuccessDev;
