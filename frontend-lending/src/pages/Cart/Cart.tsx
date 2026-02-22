import React, { useEffect, useState, useCallback } from 'react'
import styles from './Cart.module.scss'
import { useCartStore } from '../../store/cart'
import { Link, useNavigate } from 'react-router-dom'
import { applyPromo, fetchUsedPromos, removePromo, UsedPromo } from '../../api/promocodes'
import { toast } from 'react-toastify'
import type { AxiosErrorLike } from '../../types'
import { fetchProductById } from '../../api/shop'
import type { CartItem } from '../../types'
import Skeleton from '../../Components/Skeleton/Skeleton'

const Cart: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [appliedPromos, setAppliedPromos] = useState<UsedPromo[]>([])
  const navigate = useNavigate()

  // Селекторы стора
  const cartStoreItems = useCartStore(s => s.items)
  const removeItem = useCartStore(s => s.remove)
  const updateQty = useCartStore(s => s.update)

  // Обновляет корзину актуальными данными с сервера
  const refreshCart = useCallback(async () => {
    if (cartStoreItems.length === 0) {
      setLoading(false)
      return
    }

    try {
      // Загружаем последовательно с небольшой задержкой, чтобы не триггерить rate limit
      const updatedCart: CartItem[] = []
      
      for (let i = 0; i < cartStoreItems.length; i++) {
        const item = cartStoreItems[i]
        
        // Добавляем задержку после каждых 5 запросов
        if (i > 0 && i % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
        
        try {
          const { data } = await fetchProductById(item.id)
          updatedCart.push({
            ...item,
            available: data.available,
            price: data.price,
            name: data.name,
            img: data.img,
            quantity: Math.min(item.quantity, data.available),
            type: item.type || 'product', // сохраняем тип или используем 'product' по умолчанию
          })
        } catch {
          updatedCart.push(item)
        }
      }
      
      updatedCart.forEach((it) => updateQty(it.id, it.quantity))
    } catch (err) {
      console.error('Ошибка обновления корзины:', err)
    }
  }, [cartStoreItems, updateQty])

  // Загружает список уже применённых промокодов
  const refreshPromos = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    let mounted = true
    const loadData = async () => {
      setLoading(true)
      // Загружаем последовательно чтобы не перегружать rate limiter
      await refreshCart()
      if (mounted) {
        // Небольшая задержка перед загрузкой промокодов
        await new Promise(resolve => setTimeout(resolve, 100))
        await refreshPromos()
      }
      if (mounted) {
        setLoading(false)
      }
    }
    loadData()
    
    return () => {
      mounted = false
    }
  }, []) // Пустой массив - загружаем только при монтировании

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
    } catch (e: unknown) {
      const error = e as AxiosErrorLike;
      toast.error(error?.response?.data?.message || 'Ошибка при применении промокода')
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
  const total = cartStoreItems.reduce((sum, it) => sum + it.price * it.quantity, 0)
  const discounted = total - (total * discount) / 100

  const bestDiscountCode =
    appliedPromos
      .filter(p => p.type === 'discount')
      .sort((a, b) => b.denomination - a.denomination)[0]?.code;

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Корзина</h1>
          </div>
          <div className={styles.itemsSection}>
            <div className={styles.items}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonItem}>
                  <div className={styles.skeletonImage} />
                  <div className={styles.skeletonInfo}>
                    <Skeleton width="70%" height={24} />
                    <Skeleton width="50%" height={20} />
                    <Skeleton width="40%" height={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Корзина</h1>
          <p className={styles.subtitle}>Оформите заказ в несколько кликов</p>
        </div>
        {cartStoreItems.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <p className={styles.emptyText}>Ваша корзина пуста</p>
            <Link to="/shop" className={styles.emptyButton}>
              Перейти в магазин
            </Link>
          </div>
        ) : (
        <>
          <div className={styles.itemsSection}>
            <div className={styles.items}>
            {cartStoreItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.img}>
                  {item.img ? (
                    <img src={item.img} alt={item.name} loading="lazy" />
                  ) : (
                    <div className={styles.placeholder}>🎁</div>
                  )}
                </div>
                <div className={styles.info}>
                  <Link 
                    to={item.type === 'subscription' ? `/subscriptions/${item.id}` : `/shop/${item.id}`} 
                    className={styles.title}
                  >
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
          </div>

          <div className={styles.promo}>
            <h3 className={styles.promoTitle}>Промокод</h3>
            <div className={styles.promoInput}>
              <input
                type="text"
                placeholder="Введите промокод"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
              />
              <button onClick={handleApplyPromo} disabled={!promo.trim()} aria-label="Применить промокод">✓</button>
            </div>
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
            <h3 className={styles.summaryTitle}>Итого</h3>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Товаров:</span>
              <span className={styles.summaryValue}>{cartStoreItems.reduce((sum, it) => sum + it.quantity, 0)} шт.</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Сумма:</span>
              <span className={styles.summaryValue}>{total.toLocaleString()} ₽</span>
            </div>
            {discount > 0 && (
              <div className={`${styles.summaryRow} ${styles.discount}`}>
                <span className={styles.summaryLabel}>Скидка:</span>
                <span className={styles.summaryValue}>
                  -{discount}% → <strong>{discounted.toLocaleString()} ₽</strong>
                </span>
              </div>
            )}
            <div className={styles.summaryTotal}>
              <span className={styles.totalLabel}>К оплате:</span>
              <span className={styles.totalValue}>
                {discount > 0 ? discounted.toLocaleString() : total.toLocaleString()} ₽
              </span>
            </div>
            <button className={styles.checkout} onClick={() => navigate('/checkout', { state: { promoCode: bestDiscountCode || null } })}>
              <span>Оформить заказ</span>
            </button>
          </div>
        </>
      )}
      </div>
    </div>
  )
}

export default Cart
