// src/pages/Cart/Cart.tsx
import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import { Product, fetchProductById } from '../../api/shop';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface CartItem {
    product: Product;
    quantity: number;
    selected: boolean;
    available: number;
}

const Cart: React.FC = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    // При монтировании: загружаем "сырые" товары, группируем, подтягиваем available
    useEffect(() => {
        (async () => {
            const raw: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
            const map = new Map<string, CartItem>();
            raw.forEach(p => {
                const ex = map.get(p.id);
                if (ex) ex.quantity += 1;
                else map.set(p.id, { product: p, quantity: 1, selected: true, available: 0 });
            });
            const arr = Array.from(map.values());

            // Получаем актуальное available и корректируем quantity
            await Promise.all(arr.map(async it => {
                try {
                    const res = await fetchProductById(it.product.id);
                    it.available = res.data.available;
                    if (it.quantity > it.available) {
                        toast.info(`Количество "${it.product.name}" скорректировано до доступного (${it.available})`);
                        it.quantity = it.available;
                    }
                } catch {
                    it.available = 0;
                }
            }));

            setItems(arr);
            setLoading(false);
        })();
    }, []);

    // Сохраняет в localStorage (каждый раз, как меняется items)
    useEffect(() => {
        if (!loading) {
            const flat: Product[] = [];
            items.forEach(({ product, quantity }) => {
                for (let i = 0; i < quantity; i++) flat.push(product);
            });
            localStorage.setItem('cart', JSON.stringify(flat));
        }
    }, [items, loading]);

    const toggleSelect = (idx: number) => {
        const arr = [...items];
        arr[idx].selected = !arr[idx].selected;
        setItems(arr);
    };

    const changeQty = (idx: number, delta: number) => {
        const arr = [...items];
        const it = arr[idx];
        if (it.available === 0) return;
        const newQty = it.quantity + delta;
        if (newQty < 1 || newQty > it.available) return;
        it.quantity = newQty;
        setItems(arr);
    };

    const removeItem = (idx: number) => {
        const arr = items.filter((_, i) => i !== idx);
        setItems(arr);
    };

    const total = items
        .filter(i => i.selected && i.available > 0)
        .reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    if (loading) return <p className={styles.loading}>Загрузка корзины…</p>;

    return (
        <div className={styles.cart}>
            <h2 className={styles.title}>Корзина</h2>
            {items.length === 0 ? (
                <p className={styles.empty}>Ваша корзина пуста 😕</p>
            ) : (
                <>
                    <ul className={styles.list}>
                        {items.map((item, idx) => (
                            <li key={item.product.id} className={styles.item}>
                                <input
                                    type="checkbox"
                                    checked={item.selected && item.available > 0}
                                    onChange={() => toggleSelect(idx)}
                                    disabled={item.available === 0}
                                    className={styles.checkbox}
                                />

                                <div className={styles.details}>
                                    <span className={styles.name}>{item.product.name}</span>
                                    <span className={styles.singlePrice}>
                                        {item.product.price.toLocaleString()} ₽
                                    </span>
                                    {item.available > 0 ? (
                                        <span className={styles.avail}>
                                            В наличии: {item.available}
                                        </span>
                                    ) : (
                                        <span className={styles.outOfStock}>Нет в наличии</span>
                                    )}
                                </div>

                                {item.available > 0 && (
                                    <div className={styles.qtyControls}>
                                        <button
                                            onClick={() => changeQty(idx, -1)}
                                            className={styles.qtyBtn}
                                        >
                                            −
                                        </button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button
                                            onClick={() => changeQty(idx, +1)}
                                            className={styles.qtyBtn}
                                            disabled={item.quantity >= item.available}
                                            title={
                                                item.quantity >= item.available
                                                    ? 'Больше нет в наличии'
                                                    : ''
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                )}

                                <span className={styles.lineTotal}>
                                    {item.available > 0
                                        ? (item.product.price * item.quantity).toLocaleString() + ' ₽'
                                        : '-'}
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
                        <span className={styles.summaryText}>Итого:</span>
                        <span className={styles.summaryTotal}>
                            {total.toLocaleString()} ₽
                        </span>
                        <button className={styles.checkoutBtn}>Купить выбранные</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
