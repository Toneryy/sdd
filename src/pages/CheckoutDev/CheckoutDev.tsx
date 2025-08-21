// frontend/src/pages/CheckoutDev/CheckoutDev.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./CheckoutDev.module.scss";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

import {
    loadCart,
    CartItem as LocalCartItem,
    clearCart,
} from "../../utils/cartStorage";
import { createOrder, CartItemPayload } from "../../api/purchase";
import { devCreatePayment, devPay } from "../../api/payments.dev";
import { fetchProfile } from "../../api/profile";

const formatMoney = (n: number, currency = "₽") =>
    `${Math.round(n).toLocaleString()} ${currency}`;

const cardMask = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

const expMask = (v: string) =>
    v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/");

type LocationState = { promoCode?: string | null } | undefined;

const CheckoutDev: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const promoCode = (location.state as LocationState)?.promoCode ?? null;

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

    // ===== анти-спам тостов: максимум 1 активный =====
    const toastIdRef = useRef<React.ReactText | null>(null);
    const showToast = (
        type: "success" | "error" | "info" | "warning",
        message: string
    ) => {
        const opts = { autoClose: 3000, closeOnClick: true } as const;

        if (toastIdRef.current && toast.isActive(toastIdRef.current)) {
            toast.update(toastIdRef.current, {
                render: message,
                type,
                ...opts,
            });
        } else {
            toastIdRef.current = toast(message, {
                type,
                ...opts,
                onClose: () => {
                    toastIdRef.current = null;
                },
            });
        }
    };
    const tSuccess = (m: string) => showToast("success", m);
    const tError = (m: string) => showToast("error", m);
    const tInfo = (m: string) => showToast("info", m);
    const tWarn = (m: string) => showToast("warning", m);

    useEffect(() => {
        return () => {
            if (toastIdRef.current) {
                toast.dismiss(toastIdRef.current);
                toastIdRef.current = null;
            }
        };
    }, []);
    // ================================================

    // 1) корзина
    useEffect(() => {
        const c = loadCart();
        if (!c.length) {
            tInfo("Корзина пуста");
            navigate("/cart");
            return;
        }
        setCart(c);
    }, [navigate]);

    // 2) userId из профиля
    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    tError("Не найден токен авторизации");
                    navigate("/login");
                    return;
                }
                const { data } = await fetchProfile(token);
                const uid = data?.id || data?.user?.id || data?.userId;
                if (!uid) {
                    tError("Бэкенд не вернул userId");
                    navigate("/login");
                    return;
                }
                setUserId(uid);
            } catch (e: any) {
                tError(e?.response?.data?.message || "Не удалось получить профиль");
                navigate("/login");
            }
        })();
    }, [navigate]);

    // полезные мемо
    const payloadItems: CartItemPayload[] = useMemo(
        () =>
            cart.map((i) => ({
                type: "product",
                productId: i.id,
                qty: i.quantity,
            })),
        [cart]
    );

    const totalLocal = useMemo(
        () => cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [cart]
    );

    // стабильная подпись корзины
    const cartSig = useMemo(
        () =>
            cart
                .map((i) => `${i.id}:${i.quantity}`)
                .sort()
                .join("|"),
        [cart]
    );

    // 3) создаём/находим активный заказ и сразу фиксируем сумму (devCreatePayment)
    useEffect(() => {
        if (!userId || !cart.length) return;

        (async () => {
            try {
                setIsLoading(true);

                const res = await createOrder(userId, payloadItems, promoCode || undefined);
                setOrderId(res.orderId);
                setOrderNumber(res.orderNumber);
                tSuccess(`Заказ №${res.orderNumber} создан`);

                try {
                    const created = await devCreatePayment(res.orderId);
                    setAmount(created.amount ?? totalLocal);
                    setCurrency(created.currency ?? "RUB");
                } catch (e: any) {
                    setAmount(totalLocal);
                    setCurrency("RUB");
                    tWarn(
                        e?.response?.data?.message ||
                        "Не удалось зафиксировать сумму оплаты. Попробуйте ещё раз на шаге оплаты."
                    );
                }
            } catch (e: any) {
                tError(e?.response?.data?.message || "Не удалось создать заказ");
                navigate("/cart");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [userId, cartSig, promoCode, navigate, cart.length, payloadItems, totalLocal]);

    // ===== валидация формы карты =====
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

    // ===== обработчик оплаты =====
    const handlePay = async () => {
        if (!orderId) return;
        const err = validateCard();
        if (err) {
            tError(err);
            return;
        }

        setIsLoading(true);
        try {
            // на всякий случай ещё раз фиксируем сумму
            try {
                const created = await devCreatePayment(orderId);
                setAmount(created.amount ?? totalLocal);
                setCurrency(created.currency ?? "RUB");
            } catch {
                /* сумма могла быть зафиксирована раньше */
            }

            const paid = await devPay(orderId);
            if (paid.status === "paid") {
                tSuccess(`Оплата прошла. Заказ №${paid.orderNumber} оплачен`);
                clearCart();
                navigate(`/checkout/success/${paid.orderNumber}`);
            }
        } catch (e: any) {
            tError(e?.response?.data?.message || "Ошибка оплаты");
        } finally {
            setIsLoading(false);
        }
    };

    // ===== отображаемые суммы =====
    const subtotal = totalLocal;
    const finalAmount = amount ?? subtotal;
    const discountValue = Math.max(0, subtotal - finalAmount);
    const discountPercent =
        subtotal > 0 ? Math.round((discountValue / subtotal) * 100) : 0;

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

                            {discountValue > 0 ? (
                                <>
                                    <li className={styles.totalLine}>
                                        <span>Итого к оплате</span>
                                        <span>
                                            <span
                                                style={{
                                                    textDecoration: "line-through",
                                                    opacity: 0.6,
                                                    marginRight: 8,
                                                }}
                                            >
                                                {formatMoney(subtotal)}
                                            </span>
                                            <strong>{formatMoney(finalAmount)}</strong>
                                        </span>
                                    </li>
                                    <li className={styles.totalLine}>
                                        <span>Скидка (по промокоду)</span>
                                        <strong>−{discountPercent}%</strong>
                                    </li>
                                </>
                            ) : (
                                <li className={styles.totalLine}>
                                    <span>Итого</span>
                                    <strong>{formatMoney(finalAmount)}</strong>
                                </li>
                            )}
                        </ul>
                    )}

                    {orderNumber && (
                        <p className={styles.orderMeta}>
                            Номер заказа: <strong>{orderNumber}</strong>
                        </p>
                    )}
                    {promoCode && (
                        <p className={styles.orderMeta}>
                            Промокод: <strong>{promoCode}</strong>
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
                                onChange={(e) =>
                                    setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                                }
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

                    <p className={styles.amountNote}>
                        К списанию:{" "}
                        <strong>
                            {formatMoney(finalAmount, currency === "RUB" ? "₽" : currency)}
                        </strong>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default CheckoutDev;
