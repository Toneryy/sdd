// frontend/src/pages/CheckoutDev/CheckoutDev.tsx
import React, { useEffect, useMemo, useState } from "react";
import styles from "./CheckoutDev.module.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { loadCart, CartItem as LocalCartItem, clearCart } from "../../utils/cartStorage";
import { createOrder, getOrderStatus, CartItemPayload } from "../../api/purchase";
import { devCreatePayment, devPay } from "../../api/payments.dev";
import { fetchProfile } from "../../api/profile";

const formatMoney = (n: number, currency = "₽") =>
    `${Math.round(n).toLocaleString()} ${currency}`;

const cardMask = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

const expMask = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/");

const CheckoutDev: React.FC = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState<LocalCartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const [userId, setUserId] = useState<string>("");
    const [orderId, setOrderId] = useState<string>("");
    const [orderNumber, setOrderNumber] = useState<string>("");
    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState<string>("RUB");

    // Форма карты (mock)
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCvv, setCardCvv] = useState("");

    // 1) грузим корзину
    useEffect(() => {
        const c = loadCart();
        if (!c.length) {
            toast.info("Корзина пуста");
            navigate("/cart");
            return;
        }
        setCart(c);
    }, [navigate]);

    // 2) подтягиваем userId с бэка (по токену)
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("Не найден токен авторизации");
                    navigate("/login");
                    return;
                }
                const { data } = await fetchProfile(token);
                const uid = data?.id || data?.user?.id || data?.userId;
                if (!uid) {
                    toast.error("Бэкенд не вернул userId");
                    navigate("/login");
                    return;
                }
                setUserId(uid);
            } catch (e: any) {
                toast.error(e?.response?.data?.message || "Не удалось получить профиль");
                navigate("/login");
            }
        })();
    }, [navigate]);

    const payloadItems: CartItemPayload[] = useMemo(
        () =>
            cart.map((i) => ({
                type: "product",
                productId: i.id,
                qty: i.quantity,
            })),
        [cart]
    );

    const total = useMemo(
        () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [cart]
    );

    // 3) создаём заказ, когда есть userId и корзина
    useEffect(() => {
        if (!userId || !cart.length) return;

        (async () => {
            try {
                setIsLoading(true);
                const res = await createOrder(userId, payloadItems);
                setOrderId(res.orderId);
                setOrderNumber(res.orderNumber);
                toast.success(`Заказ №${res.orderNumber} создан`);
            } catch (e: any) {
                toast.error(e?.response?.data?.message || "Не удалось создать заказ");
                navigate("/cart");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId, cart, payloadItems, navigate]);

    const validateCard = () => {
        const num = cardNumber.replace(/\s/g, "");
        const exp = cardExp.replace(/\D/g, "");
        const cvv = cardCvv.replace(/\D/g, "");
        if (num.length < 16) return "Введите номер карты полностью";
        if (exp.length !== 4) return "Введите срок MM/YY";
        const mm = Number(exp.slice(0, 2));
        if (mm < 1 || mm > 12) return "Месяц истечения некорректен";
        if (cvv.length < 3) return "CVV должен быть 3+";
        if (!cardName.trim()) return "Введите имя на карте";
        return null;
    };

    const [showSuccess, setShowSuccess] = useState<{
        orderNumber: string;
        aliases: string[];
        status: string;
    } | null>(null);

    const handlePay = async () => {
        if (!orderId) return;
        const err = validateCard();
        if (err) {
            toast.error(err);
            return;
        }

        setIsLoading(true);
        try {
            // 1) создаём dev-сессию (awaiting_payment), получаем сумму
            const created = await devCreatePayment(orderId);
            setAmount(created.amount ?? total);
            setCurrency(created.currency ?? "RUB");

            // 2) имитируем оплату
            const paid = await devPay(orderId);
            if (paid.status === "paid") {
                toast.success(`Оплата прошла. Заказ №${paid.orderNumber} оплачен`);

                // 3) чистим корзину и редиректим на страницу успеха
                clearCart();
                navigate(`/checkout/success/${paid.orderNumber}`);
            }
        } catch (e: any) {
            toast.error(e?.response?.data?.message || "Ошибка оплаты");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Оплата заказа (dev)</h1>

            <div className={styles.grid}>
                <section className={styles.box}>
                    <h2 className={styles.subtitle}>Состав заказа</h2>
                    {!cart.length ? (
                        <p>Корзина пуста</p>
                    ) : (
                        <ul className={styles.items}>
                            {cart.map((i) => (
                                <li key={i.id} className={styles.item}>
                                    <div className={styles.itemLine}>
                                        <span className={styles.itemName}>{i.name || i.id}</span>
                                        <span className={styles.itemQty}>×{i.quantity}</span>
                                        <span className={styles.itemPrice}>
                                            {formatMoney(i.price * i.quantity)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                            <li className={styles.totalLine}>
                                <span>Итого</span>
                                <strong>{formatMoney(total)}</strong>
                            </li>
                        </ul>
                    )}

                    {orderNumber && (
                        <p className={styles.orderMeta}>
                            Номер заказа: <strong>{orderNumber}</strong>
                        </p>
                    )}
                </section>

                <section className={styles.box}>
                    <h2 className={styles.subtitle}>Данные карты (симуляция)</h2>

                    <div className={styles.formRow}>
                        <label>Номер карты</label>
                        <input
                            inputMode="numeric"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(cardMask(e.target.value))}
                        />
                    </div>

                    <div className={styles.formGrid}>
                        <div className={styles.formRow}>
                            <label>Срок</label>
                            <input
                                inputMode="numeric"
                                placeholder="MM/YY"
                                value={cardExp}
                                onChange={(e) => setCardExp(expMask(e.target.value))}
                            />
                        </div>
                        <div className={styles.formRow}>
                            <label>CVV</label>
                            <input
                                inputMode="numeric"
                                placeholder="123"
                                value={cardCvv}
                                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <label>Имя на карте</label>
                        <input
                            placeholder="IVAN IVANOV"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        />
                    </div>

                    <button
                        className={styles.payBtn}
                        disabled={isLoading || !cart.length || !orderId}
                        onClick={handlePay}
                    >
                        {isLoading ? "Оплата..." : "Оплатить (dev)"}
                    </button>

                    {amount !== null && (
                        <p className={styles.amountNote}>
                            К списанию:{" "}
                            <strong>
                                {formatMoney(amount, currency === "RUB" ? "₽" : currency)}
                            </strong>
                        </p>
                    )}
                </section>
            </div>

            {showSuccess && (
                <section className={styles.success}>
                    <h3>Оплата успешна ✅</h3>
                    <p>
                        Заказ <strong>№{showSuccess.orderNumber}</strong> — статус:{" "}
                        <strong>{showSuccess.status}</strong>
                    </p>

                    {showSuccess.aliases.length > 0 && (
                        <>
                            <h4>Коды активации:</h4>
                            <ul className={styles.aliasList}>
                                {showSuccess.aliases.map((code) => (
                                    <li key={code}>
                                        <code>{code}</code>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard?.writeText(code);
                                                toast.info("Скопировано");
                                            }}
                                        >
                                            Копировать
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <div className={styles.successBtns}>
                        <button onClick={() => navigate("/shop")}>В магазин</button>
                        <button onClick={() => navigate(`/profile`)}>В профиль</button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default CheckoutDev;
