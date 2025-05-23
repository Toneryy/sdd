// src/pages/Cart/Cart.tsx
import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import {
  loadCart,
  removeFromCart,
  updateQuantity,
  CartItem
} from '../../utils/cartStorage';
import { Link } from 'react-router-dom';
import { fetchProductById } from '../../api/shop';

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promo, setPromo] = useState('');
  const [discount, setDiscount] = useState(0);

  // Функция, которая всегда грузит из localStorage
  // и сразу подтягивает актуальное available для каждого товара
  const refreshCart = async () => {
    const rawCart = loadCart();
    const updatedCart: CartItem[] = await Promise.all(
      rawCart.map(async (item) => {
        try {
          const { data } = await fetchProductById(item.id);
          // обновляем available и массу других полей, если нужно
          return {
            ...item,
            available: data.available,
            price: data.price,
            name: data.name,
            img: data.img,
            // на случай, если в localStorage quantity > серверного available
            quantity: Math.min(item.quantity, data.available)
          };
        } catch {
          return item;
        }
      })
    );
    // сохраняем и в стейт, и в localStorage
    updatedCart.forEach(it => updateQuantity(it.id, it.quantity));
    setItems(updatedCart);
  };

  // При монтировании — один раз загрузить
  useEffect(() => {
    refreshCart();
  }, []);

  const handleQuantityChange = async (id: string, quantity: number) => {
    // Задаём желаемое
    updateQuantity(id, quantity);
    // и сразу рефрешим, чтобы получить clamp по available
    await refreshCart();
  };

  const handleRemove = async (id: string) => {
    removeFromCart(id);
    await refreshCart();
  };

  const handleApplyPromo = () => {
    if (promo.toLowerCase() === 'sale10') {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert('Промокод не найден');
    }
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discounted = total - (total * discount) / 100;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>
      {items.length === 0 ? (
        <p className={styles.empty}>Ваша корзина пуста</p>
      ) : (
        <>
          <div className={styles.items}>
            {items.map(item => (
              <div key={item.id} className={styles.item}>
                <div className={styles.img}>
                  {item.img ? (
                    <img src={item.img} alt={item.name} />
                  ) : (
                    <div className={styles.placeholder}>🎁</div>
                  )}
                </div>
                <div className={styles.info}>
                  <Link to={`/shop/${item.id}`} className={styles.title}>
                    {item.name}
                  </Link>
                  <p>{item.price.toLocaleString()} ₽</p>
                  <div className={styles.controls}>
                    <div className={styles.quantityControl}>
                      <button
                        className={styles.quantityBtn}
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={item.available}
                        className={styles.quantityInput}
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = Math.max(
                            1,
                            Math.min(
                              parseInt(e.target.value) || 1,
                              item.available
                            )
                          );
                          handleQuantityChange(item.id, qty);
                        }}
                      />
                      <button
                        className={styles.quantityBtn}
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.available}
                      >
                        +
                      </button>
                      {item.available === 0 && (
                        <div className={styles.outOfStock}>Нет в наличии</div>
                      )}
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.promo}>
            <input
              type="text"
              placeholder="Промокод"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Применить</button>
          </div>

          <div className={styles.summary}>
            <p>Сумма: {total.toLocaleString()} ₽</p>
            {discount > 0 && (
              <p>
                Скидка: -{discount}% →{' '}
                <strong>{discounted.toLocaleString()} ₽</strong>
              </p>
            )}
            <button className={styles.checkout}>Оформить заказ</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
