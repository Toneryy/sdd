// src/pages/Favorites/Favorites.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { FiTrash2 } from "react-icons/fi";
import { Product, fetchProductById } from "../../api/shop";
import { getSubscriptionById } from "../../api/subscriptions";
import { useFavoritesStore } from "../../store/favorites";
import { useCartStore } from "../../store/cart";
import Skeleton from "../../Components/Skeleton/Skeleton";
import styles from "./Favorites.module.scss";

interface FavItem {
    id: string;
    name: string;
    price: number;
    img?: string;
    type: 'product' | 'subscription';
    available?: number;
    duration_days?: number;
    quantity: number;
    selected: boolean;
}

const Favorites: React.FC = () => {
    const [items, setItems] = useState<FavItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const favIds = useFavoritesStore(s => s.ids);
    const toggleFavorite = useFavoritesStore(s => s.toggle);
    const addToCart = useCartStore(s => s.add);

    useEffect(() => {
        const loadItems = async () => {
            if (favIds.length === 0) {
                setLoading(false);
                return;
            }

            setLoading(true);
            const loadedItems: FavItem[] = [];
            const failedIds: string[] = [];

            // Загружаем с задержкой между запросами чтобы не триггерить rate limit
            for (let i = 0; i < favIds.length; i++) {
                const id = favIds[i];
                
                // Добавляем небольшую задержку между запросами
                if (i > 0 && i % 5 === 0) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                
                try {
                    // Пробуем загрузить как товар
                    try {
                        const res = await fetchProductById(id);
                        loadedItems.push({
                            id: res.data.id,
                            name: res.data.name,
                            price: res.data.price,
                            img: res.data.img,
                            type: 'product',
                            available: res.data.available,
                            quantity: 1,
                            selected: true,
                        });
                        continue;
                    } catch (productErr) {
                        // Если не товар, пробуем загрузить как подписку
                        try {
                            const res = await getSubscriptionById(id);
                            loadedItems.push({
                                id: res.data.id,
                                name: res.data.title,
                                price: res.data.price,
                                img: res.data.image,
                                type: 'subscription',
                                available: 999, // Подписки всегда доступны
                                duration_days: res.data.duration_days,
                                quantity: 1,
                                selected: true,
                            });
                            continue;
                        } catch (subErr) {
                            // Если не удалось загрузить ни как товар, ни как подписку
                            console.error(`Failed to load favorite ${id}`, productErr, subErr);
                            failedIds.push(id);
                        }
                    }
                } catch (err) {
                    console.error(`Error loading favorite ${id}:`, err);
                    failedIds.push(id);
                }
            }

            // Удаляем неудачные ID из избранного
            failedIds.forEach(id => toggleFavorite(id));

            setItems(loadedItems);
            setLoading(false);
        };

        loadItems();
    }, [favIds, toggleFavorite]);

    const handleRemove = (id: string) => {
        toggleFavorite(id);
        setItems(items.filter(item => item.id !== id));
        toast.info('Удалено из избранного');
    };

    const toggleSelect = (id: string) => {
        setItems(items.map(item => 
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const changeQty = (id: string, delta: number) => {
        setItems(items.map(item => {
            if (item.id !== id) return item;
            const newQty = item.quantity + delta;
            if (newQty < 1 || (item.available && newQty > item.available)) return item;
            return { ...item, quantity: newQty };
        }));
    };

    const handleBuySelected = () => {
        const selected = items.filter(it => it.selected && (it.available ?? 0) > 0);
        if (selected.length === 0) {
            toast.error("Нет выбранных товаров для добавления в корзину");
            return;
        }

        selected.forEach(it => {
            addToCart({
                id: it.id,
                name: it.name,
                price: it.price,
                img: it.img,
                quantity: it.quantity,
                available: it.available ?? 999,
                type: it.type, // передаем тип из избранного
            });
            // Удаляем из избранного после добавления в корзину
            toggleFavorite(it.id);
        });

        toast.success("Товары добавлены в корзину");
        navigate("/cart");
    };

    const handleClearAll = () => {
        items.forEach(item => toggleFavorite(item.id));
        setItems([]);
        toast.info('Избранное очищено');
    };

    const total = items
        .filter(it => it.selected && (it.available ?? 0) > 0)
        .reduce((sum, it) => sum + it.price * it.quantity, 0);

    if (loading) {
        return (
            <>
                <Helmet>
                    <title>Избранное - bd-project</title>
                </Helmet>
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>Избранное</h2>
                        </div>
                        <ul className={styles.list}>
                            {[1, 2, 3].map((i) => (
                                <li key={i} className={styles.skeletonCard}>
                                    <div className={styles.skeletonTop}>
                                        <div className={styles.skeletonImage} />
                                        <div className={styles.skeletonInfo}>
                                            <Skeleton width="70%" height={24} />
                                            <Skeleton width="50%" height={20} />
                                            <Skeleton width="40%" height={16} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>Избранное - bd-project</title>
            </Helmet>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Избранное</h2>
                        <p className={styles.subtitle}>Ваши любимые товары в одном месте</p>
                    </div>

                    {items.length === 0 ? (
                        <div className={styles.empty}>
                            <div className={styles.emptyIcon}>❤️</div>
                            <p className={styles.emptyText}>Пока нет избранного</p>
                            <Link to="/subscriptions" className={styles.emptyButton}>
                                Посмотреть услуги
                            </Link>
                        </div>
                    ) : (
                    <>
                        <ul className={styles.list}>
                            {items.map((it) => (
                                <li key={it.id} className={`${styles.card} ${it.selected && (it.available ?? 0) > 0 ? styles.selected : ''} ${(it.available ?? 0) === 0 ? styles.outOfStock : ''}`}>
                                    <div className={styles.topRow}>
                                        <input
                                            type="checkbox"
                                            checked={it.selected && (it.available ?? 0) > 0}
                                            onChange={() => toggleSelect(it.id)}
                                            disabled={(it.available ?? 0) === 0}
                                            className={styles.checkbox}
                                        />

                                        <div className={styles.imageWrapper}>
                                            {it.img ? (
                                                <img
                                                    src={it.img}
                                                    alt={it.name}
                                                    className={styles.image}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className={styles.placeholder}>
                                                    {it.type === 'subscription' ? '⚡' : '🎁'}
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.info}>
                                            <Link 
                                                to={it.type === 'subscription' ? `/subscriptions/${it.id}` : `/shop/${it.id}`}
                                                className={styles.name}
                                            >
                                                {it.name}
                                            </Link>
                                            <p className={styles.price}>
                                                {it.price.toLocaleString()} ₽
                                            </p>
                                            {it.type === 'product' && it.available !== undefined && (
                                                <span className={it.available > 0 ? styles.avail : styles.outOfStockText}>
                                                    {it.available > 0 ? `В наличии: ${it.available}` : 'Нет в наличии'}
                                                </span>
                                            )}
                                            {it.type === 'subscription' && it.duration_days && (
                                                <span className={styles.duration}>
                                                    🕐 {it.duration_days} дней
                                                </span>
                                            )}
                                            <span className={styles.badge}>
                                                {it.type === 'subscription' ? 'Подписка' : 'Товар'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.bottomRow}>
                                        {(it.available ?? 0) > 0 && (
                                            <div className={styles.qtyControls}>
                                                <button
                                                    onClick={() => changeQty(it.id, -1)}
                                                    disabled={it.quantity <= 1}
                                                >
                                                    −
                                                </button>
                                                <span className={styles.quantity}>{it.quantity}</span>
                                                <button
                                                    onClick={() => changeQty(it.id, +1)}
                                                    disabled={it.available !== undefined && it.quantity >= it.available}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                        <p className={styles.lineTotal}>
                                            {(it.available ?? 0) > 0
                                                ? (it.price * it.quantity).toLocaleString() + " ₽"
                                                : "-"}
                                        </p>
                                        <button
                                            onClick={() => handleRemove(it.id)}
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
                                <span className={styles.label}>Итого:</span>
                                <span className={styles.totalValue}>
                                    {total.toLocaleString()} ₽
                                </span>
                            </div>
                            <div className={styles.actions}>
                                <button
                                    className={styles.buyBtn}
                                    onClick={handleBuySelected}
                                    disabled={total === 0}
                                >
                                    <span>Купить выбранные</span>
                                </button>
                                <button
                                    className={styles.clearBtn}
                                    onClick={handleClearAll}
                                >
                                    Очистить всё
                                </button>
                            </div>
                        </div>
                    </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Favorites;
