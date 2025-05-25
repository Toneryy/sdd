// src/pages/Favorites/Favorites.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Favorites.module.scss";
import { Product, fetchProductById } from "../../api/shop";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import {
    loadFavorites,
    saveFavorites,
    clearFavorites,
} from "../../utils/favoritesStorage";
import { addToCart } from "../../utils/cartStorage";

interface FavItem {
    product: Product;
    quantity: number;
    available: number;
    selected: boolean;
}

const Favorites: React.FC = () => {
    const [items, setItems] = useState<FavItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // 1) При монтировании — группируем по id, подтягиваем available
    useEffect(() => {
        (async () => {
            const raw: Product[] = loadFavorites();
            const map = new Map<string, FavItem>();
            raw.forEach((p) => {
                const ex = map.get(p.id);
                if (ex) ex.quantity += 1;
                else map.set(p.id, { product: p, quantity: 1, available: 0, selected: true });
            });
            const arr = Array.from(map.values());

            await Promise.all(
                arr.map(async (it) => {
                    try {
                        const res = await fetchProductById(it.product.id);
                        it.available = res.data.available;
                        if (it.quantity > it.available) {
                            toast.info(
                                `Количество "${it.product.name}" скорректировано до ${it.available}`
                            );
                            it.quantity = it.available;
                        }
                    } catch {
                        it.available = 0;
                    }
                })
            );

            setItems(arr);
            setLoading(false);
        })();
    }, []);

    // 2) Сохраняем при любых изменениях в избранном
    useEffect(() => {
        if (!loading) {
            const flat: Product[] = [];
            items.forEach(({ product, quantity }) => {
                for (let i = 0; i < quantity; i++) flat.push(product);
            });
            saveFavorites(flat);
        }
    }, [items, loading]);

    const toggleSelect = (i: number) => {
        const a = [...items];
        a[i].selected = !a[i].selected;
        setItems(a);
    };

    const changeQty = (i: number, delta: number) => {
        const a = [...items];
        const it = a[i];
        const nq = it.quantity + delta;
        if (nq < 1 || nq > it.available) return;
        it.quantity = nq;
        setItems(a);
    };

    const removeItem = (i: number) => {
        setItems(items.filter((_, idx) => idx !== i));
    };

    const total = items
        .filter((it) => it.selected && it.available > 0)
        .reduce((sum, it) => sum + it.product.price * it.quantity, 0);

    const handleBuySelected = () => {
        const selected = items.filter((it) => it.selected && it.available > 0);
        if (selected.length === 0) {
            toast.error("Нет выбранных товаров для добавления в корзину");
            return;
        }
        // Добавляем в корзину и удаляем из избранного
        selected.forEach((it) => {
            addToCart({
                id: it.product.id,
                name: it.product.name,
                price: it.product.price,
                img: it.product.img,
                quantity: it.quantity,
                available: it.available,
            });
        });
        // Оставляем в избранном только невыбранные
        const remaining = items.filter((it) => !(it.selected && it.available > 0));
        setItems(remaining);
        saveFavorites(
            remaining.flatMap((it) =>
                Array.from({ length: it.quantity }, () => it.product)
            )
        );

        toast.success("Товары добавлены в корзину");
        navigate("/cart");
    };

    if (loading) return <p className={styles.loading}>Загрузка…</p>;

    return (
        <div className={styles.cart}>
            <h2 className={styles.title}>Избранное</h2>

            {items.length === 0 ? (
                <p className={styles.empty}>Нет избранных товаров.</p>
            ) : (
                <>
                    <ul className={styles.list}>
                        {items.map((it, idx) => (
                            <li key={it.product.id} className={styles.item}>
                                <input
                                    type="checkbox"
                                    checked={it.selected && it.available > 0}
                                    onChange={() => toggleSelect(idx)}
                                    disabled={it.available === 0}
                                    className={styles.checkbox}
                                />

                                <div className={styles.details}>
                                    <span className={styles.name}>{it.product.name}</span>
                                    <span className={styles.singlePrice}>
                                        {it.product.price.toLocaleString()} ₽
                                    </span>
                                    {it.available > 0 ? (
                                        <span className={styles.avail}>
                                            В наличии: {it.available}
                                        </span>
                                    ) : (
                                        <span className={styles.outOfStock}>Нет в наличии</span>
                                    )}
                                </div>

                                {it.available > 0 && (
                                    <div className={styles.qtyControls}>
                                        <button
                                            onClick={() => changeQty(idx, -1)}
                                            className={styles.qtyBtn}
                                        >
                                            −
                                        </button>
                                        <span className={styles.quantity}>{it.quantity}</span>
                                        <button
                                            onClick={() => changeQty(idx, +1)}
                                            className={styles.qtyBtn}
                                            disabled={it.quantity >= it.available}
                                            title={it.quantity >= it.available ? "Больше нет" : ""}
                                        >
                                            +
                                        </button>
                                    </div>
                                )}

                                <span className={styles.lineTotal}>
                                    {it.available > 0
                                        ? (it.product.price * it.quantity).toLocaleString() + " ₽"
                                        : "-"}
                                </span>

                                <button
                                    onClick={() => removeItem(idx)}
                                    className={styles.removeBtn}
                                    title="Удалить"
                                >
                                    <FiTrash2 />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.summary}>
                        <span className={styles.summaryText}>
                            Итого: {total.toLocaleString()} ₽
                        </span>
                        <button
                            className={styles.checkoutBtn}
                            onClick={handleBuySelected}
                        >
                            Купить выбранные
                        </button>
                        <button
                            className={styles.clearAllBtn}
                            onClick={() => {
                                clearFavorites();
                                setItems([]);
                            }}
                        >
                            Очистить всё
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;
