import React, { useEffect, useState } from 'react'
import styles from './Cart.module.scss'
import { useCartStore } from '../../store/cart'
import { Link, useNavigate } from 'react-router-dom'
import { applyPromo, fetchUsedPromos, removePromo, UsedPromo } from '../../api/promocodes'
import { toast } from 'react-toastify'
import { fetchProductById } from '../../api/shop'
import type { CartItem } from '../../utils/cartStorage'

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [appliedPromos, setAppliedPromos] = useState<UsedPromo[]>([])
  const navigate = useNavigate()

  // Селекторы стора (хуки вызываются на верхнем уровне компонента)
  const cartStoreItems = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.remove)
  const updateQty = useCartStore(s => s.update)

  // Загружает корзину и подтягивает актуальные данные
  const refreshCart = async () => {
    const updatedCart: CartItem[] = await Promise.all(
      cartStoreItems.map(async (item) => {
        try {
          const { data } = await fetchProductById(item.id)
          return {
            ...item,
            available: data.available,
            price: data.price,
            name: data.name,
            img: data.img,
            quantity: Math.min(item.quantity, data.available),
          }
        } catch {
          return item
        }
      })
    )
    updatedCart.forEach((it) => updateQty(it.id, it.quantity))
    setItems(updatedCart)
  }

  // Загружает список уже применённых промокодов
  const refreshPromos = async () => {
    try {
      const { data } = await fetchUsedPromos()
      setAppliedPromos(data)
      const disc = data
        .filter((p) => p.type === 'discount')
        .reduce((max, p) => Math.max(max, p.denomination), 0);
      setDiscount(disc);
    } catch {
      toast.error('Не удалось загрузить применённые промокоды')
    }
  }

  useEffect(() => {
    refreshCart()
    refreshPromos()
  }, [])

  // Обновление количества товара в корзине
  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQty(id, newQuantity)
  }

  // Удаление товара из корзины
  const handleRemove = (id: string) => {
    removeItem(id)
  }

  // Применение промокода
  const handleApplyPromo = async () => {
    try {
      const { data } = await applyPromo(promo)
      toast.success(`Промокод "${promo}" применён: ${data.denomination}%`)
      setPromo('')
      await refreshPromos()
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Ошибка при применении промокода')
    }
  }

  // Удаление промокода
  const handleRemovePromo = async (code: string) => {
    try {
      await removePromo(code)
      toast.info(`Промокод ${code} удалён`)
      await refreshPromos()
    } catch {
      toast.error('Не удалось удалить промокод')
    }
  }

  // Общая сумма
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const discounted = total - (total * discount) / 100

  const bestDiscountCode =
    appliedPromos
      .filter(p => p.type === 'discount')
      .sort((a, b) => b.denomination - a.denomination)[0]?.code;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Корзина</h1>
      {items.length === 0 ? (
        <p className={styles.empty}>Ваша корзина пуста</p>
      ) : (
        <>
          <div className={styles.items}>
            {items.map((item) => (
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
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        className={styles.quantityInput}
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className={styles.quantityBtn}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.available}
                      >
                        +
                      </button>
                      {item.available === 0 && (
                        <div className={styles.outOfStock}>Нет в наличии</div>
                      )}
                    </div>
                    <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>
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

          {/* Список применённых промокодов */}
          {appliedPromos.length > 0 && (
            <div className={styles.appliedPromos}>
              <h3>Применённые промокоды</h3>
              <ul>
                {appliedPromos.map((p) => (
                  <li key={p.code} className={styles.promoItem}>
                    <span className={styles.promoCode}>{p.code}</span>
                    <span className={styles.promoType}>
                      {p.type === 'discount'
                        ? `- ${p.denomination}%`
                        : `+ ${p.denomination}`}
                    </span>
                    <button
                      className={styles.removePromoBtn}
                      onClick={() => handleRemovePromo(p.code)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.summary}>
            <p>Сумма: {total.toLocaleString()} ₽</p>
            {discount > 0 && (
              <p>
                Скидка: -{discount}% →{' '}
                <strong>{discounted.toLocaleString()} ₽</strong>
              </p>
            )}
            <button className={styles.checkout} onClick={() => navigate('/checkout', { state: { promoCode: bestDiscountCode || null } })}>
              Оформить заказ
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
