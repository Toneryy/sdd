// src/pages/Favorites/Favorites.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Favorites.module.scss";
import { Product, fetchProductById } from "../../api/shop";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { notifyOnce } from "../../utils/notifyOnce";
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

    useEffect(() => {
        (async () => {
            const raw = loadFavorites();
            const map = new Map<string, FavItem>();

            raw.forEach((p) => {
                const ex = map.get(p.id);
                if (ex) ex.quantity += 1;
                else
                    map.set(p.id, {
                        product: p,
                        quantity: 1,
                        available: 0,
                        selected: true,
                    });
            });

            const arr = Array.from(map.values());
            await Promise.all(
                arr.map(async (it) => {
                    try {
                        const res = await fetchProductById(it.product.id);
                        it.available = res.data.available ?? 0;
                        if (it.quantity > it.available) {
                            notifyOnce(
                                toast.info,
                                `Количество «${it.product.name}» скорректировано до ${it.available}`,
                                `fav-adjust-${it.product.id}`
                            );
                            it.quantity = it.available === 0 ? 1 : it.available;
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

    useEffect(() => {
        if (loading) return;
        const flat: Product[] = [];
        items.forEach(({ product, quantity }) => {
            for (let i = 0; i < quantity; i++) flat.push(product);
        });
        saveFavorites(flat);
    }, [items, loading]);

    const toggleSelect = (i: number) => {
        const copy = [...items];
        copy[i].selected = !copy[i].selected;
        setItems(copy);
    };

    const changeQty = (i: number, delta: number) => {
        const copy = [...items];
        const item = copy[i];
        const next = item.quantity + delta;
        if (next < 1 || next > item.available) return;
        item.quantity = next;
        setItems(copy);
    };

    const removeItem = (i: number) =>
        setItems(items.filter((_, idx) => idx !== i));

    const total = items
        .filter((it) => it.selected && it.available > 0)
        .reduce((s, it) => s + it.product.price * it.quantity, 0);

    const handleBuySelected = () => {
        const selected = items.filter((it) => it.selected && it.available > 0);
        if (!selected.length) {
            notifyOnce(
                toast.error,
                "Нет выбранных товаров для добавления в корзину",
                "fav-empty-selection"
            );
            return;
        }
        selected.forEach((it) =>
            addToCart({
                id: it.product.id,
                name: it.product.name,
                price: it.product.price,
                img: it.product.img,
                quantity: it.quantity,
                available: it.available,
            })
        );
        const remaining = items.filter((it) => !selected.includes(it));
        setItems(remaining);
        saveFavorites(
            remaining.flatMap((it) =>
                Array.from({ length: it.quantity }, () => it.product)
            )
        );
        toast.success("Товары добавлены в корзину");
        navigate("/cart");
    };

    if (loading)
        return <p className={styles.loading}>Загрузка избранного…</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Избранное</h2>

            {items.length === 0 ? (
                <p className={styles.empty}>Пока нет избранного.</p>
            ) : (
                <>
                    <ul className={styles.list}>
                        {items.map((it, idx) => (
                            <li key={it.product.id} className={styles.card}>
                                <div className={styles.topRow}>
                                    <input
                                        type="checkbox"
                                        checked={it.selected && it.available > 0}
                                        onChange={() => toggleSelect(idx)}
                                        disabled={it.available === 0}
                                        className={styles.checkbox}
                                    />

                                    {it.product.img ? (
                                        <img
                                            src={it.product.img}
                                            alt={it.product.name}
                                            className={styles.image}
                                        />
                                    ) : (
                                        <div className={styles.placeholder}>🎁</div>
                                    )}

                                    <div className={styles.info}>
                                        <p className={styles.name}>{it.product.name}</p>
                                        <p className={styles.price}>
                                            {it.product.price.toLocaleString()} ₽
                                        </p>
                                        {it.available > 0 ? (
                                            <p className={styles.avail}>
                                                В наличии: {it.available}
                                            </p>
                                        ) : (
                                            <p className={styles.outOfStock}>
                                                Нет в наличии
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.bottomRow}>
                                    {it.available > 0 && (
                                        <div className={styles.qtyControls}>
                                            <button
                                                onClick={() => changeQty(idx, -1)}
                                                disabled={it.quantity <= 1}
                                            >
                                                −
                                            </button>
                                            <span>{it.quantity}</span>
                                            <button
                                                onClick={() => changeQty(idx, +1)}
                                                disabled={it.quantity >= it.available}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                    <p className={styles.lineTotal}>
                                        {it.available > 0
                                            ? (it.product.price * it.quantity).toLocaleString() + " ₽"
                                            : "-"}
                                    </p>
                                    <button
                                        onClick={() => removeItem(idx)}
                                        className={styles.removeBtn}
                                        title="Удалить из избранного"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.footer}>
                        <div className={styles.summary}>
                            <span>Итого:</span>
                            <span className={styles.totalValue}>
                                {total.toLocaleString()} ₽
                            </span>
                        </div>
                        <div className={styles.actions}>
                            <button
                                className={styles.buyBtn}
                                onClick={handleBuySelected}
                            >
                                Купить выбранные
                            </button>
                            <button
                                className={styles.clearBtn}
                                onClick={() => {
                                    clearFavorites();
                                    setItems([]);
                                }}
                            >
                                Очистить всё
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;
