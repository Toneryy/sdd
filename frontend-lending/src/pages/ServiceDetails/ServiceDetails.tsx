// src/pages/ServiceDetails/ServiceDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { 
    FiArrowLeft, 
    FiShoppingCart, 
    FiHeart, 
    FiClock, 
    FiCheck,
    FiZap,
    FiShield,
    FiHeadphones
} from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { getSubscriptionById } from '../../api/subscriptions';
import { useCartStore } from '../../store/cart';
import { useFavoritesStore } from '../../store/favorites';
import styles from './ServiceDetails.module.scss';

interface Subscription {
    id: string;
    title: string;
    duration_days: number;
    price: number;
    image?: string;
    description?: string;
}

const declensionDay = (n: number): string => {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod100 >= 11 && mod100 <= 14) return 'дней';
    if (mod10 === 1) return 'день';
    if (mod10 >= 2 && mod10 <= 4) return 'дня';
    return 'дней';
};

const ServiceDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [sub, setSub] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const addToCart = useCartStore(s => s.add);
    const favIds = useFavoritesStore(s => s.ids);
    const toggleFavorite = useFavoritesStore(s => s.toggle);
    
    const isFavorite = sub ? favIds.includes(sub.id) : false;

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getSubscriptionById(id)
            .then(res => setSub(res.data))
            .catch(() => toast.error('Не удалось загрузить услугу'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleAddToCart = () => {
        if (!sub) return;
        
        addToCart({
            id: sub.id,
            name: sub.title,
            price: sub.price,
            img: sub.image,
            quantity: quantity,
            available: 999, // Для подписок всегда доступно
            type: 'subscription', // услуга из subscriptions
        });
        
        toast.success(`${sub.title} добавлен в корзину`, { toastId: `cart-${sub.id}` });
    };

    const handleBuyNow = () => {
        if (!sub) return;
        handleAddToCart();
        navigate('/cart');
    };

    const handleToggleFavorite = () => {
        if (!sub) return;
        toggleFavorite(sub.id);
        toast.info(
            isFavorite ? 'Удалено из избранного' : 'Добавлено в избранное',
            { toastId: `fav-${sub.id}` }
        );
    };

    if (loading) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.skeleton}>
                        <div className={styles.skeletonImage}></div>
                        <div className={styles.skeletonContent}>
                            <div className={styles.skeletonLine} style={{ width: '60%', height: '32px' }}></div>
                            <div className={styles.skeletonLine} style={{ width: '40%', height: '24px', marginTop: '1rem' }}></div>
                            <div className={styles.skeletonLine} style={{ width: '100%', height: '80px', marginTop: '1.5rem' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!sub) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.notFound}>
                        <div className={styles.notFoundIcon}>🔍</div>
                        <h2>Услуга не найдена</h2>
                        <p>К сожалению, запрашиваемая услуга не существует</p>
                        <Link to="/subscriptions" className={styles.backButton}>
                            <FiArrowLeft />
                            <span>Вернуться к услугам</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const features = [
        { icon: <FiZap />, title: 'Мгновенная активация', desc: 'Начните пользоваться сразу после оплаты' },
        { icon: <FiShield />, title: 'Гарантия качества', desc: 'Вернем деньги, если не понравится' },
        { icon: <FiHeadphones />, title: '24/7 поддержка', desc: 'Всегда на связи для решения ваших вопросов' },
    ];

    return (
        <>
            <Helmet>
                <title>{sub.title} - bd-project</title>
                <meta name="description" content={sub.description || sub.title} />
            </Helmet>

            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Breadcrumbs */}
                    <nav className={styles.breadcrumbs}>
                        <Link to="/">Главная</Link>
                        <span>/</span>
                        <Link to="/subscriptions">Услуги</Link>
                        <span>/</span>
                        <span>{sub.title}</span>
                    </nav>

                    {/* Main Content */}
                    <div className={styles.content}>
                        {/* Left Column - Image */}
                        <div className={styles.imageSection}>
                            <div className={styles.imageWrapper}>
                                {sub.image ? (
                                    <img src={sub.image} alt={sub.title} loading="lazy" />
                                ) : (
                                    <div className={styles.placeholderImage}>
                                        <FiZap />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Info */}
                        <div className={styles.infoSection}>
                            <div className={styles.header}>
                                <div>
                                    <h1 className={styles.title}>{sub.title}</h1>
                                    {sub.duration_days > 0 && (
                                        <div className={styles.duration}>
                                            <FiClock />
                                            <span>{sub.duration_days} {declensionDay(sub.duration_days)}</span>
                                        </div>
                                    )}
                                </div>
                                <button
                                    className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
                                    onClick={handleToggleFavorite}
                                    aria-label="Добавить в избранное"
                                >
                                    {isFavorite ? <FaHeart /> : <FiHeart />}
                                </button>
                            </div>

                            <div className={styles.priceBlock}>
                                <div className={styles.priceMain}>
                                    {sub.price === 0 ? (
                                        <span className={styles.priceFree}>Бесплатно</span>
                                    ) : (
                                        <>
                                            <span className={styles.priceValue}>{sub.price.toLocaleString()}</span>
                                            <span className={styles.priceCurrency}>₽</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {sub.description && (
                                <div className={styles.description}>
                                    <h3>Описание</h3>
                                    <p>{sub.description}</p>
                                </div>
                            )}

                            {/* Features */}
                            <div className={styles.features}>
                                <h3>Преимущества</h3>
                                <div className={styles.featuresList}>
                                    {features.map((feature, idx) => (
                                        <div key={idx} className={styles.featureItem}>
                                            <div className={styles.featureIcon}>{feature.icon}</div>
                                            <div className={styles.featureText}>
                                                <h4>{feature.title}</h4>
                                                <p>{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* What's included */}
                            <div className={styles.included}>
                                <h3>Что входит</h3>
                                <ul>
                                    <li><FiCheck /> Полный доступ ко всем функциям</li>
                                    <li><FiCheck /> Техническая поддержка</li>
                                    <li><FiCheck /> Регулярные обновления</li>
                                    <li><FiCheck /> Без скрытых платежей</li>
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className={styles.actions}>
                                <div className={styles.quantityControl}>
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                        aria-label="Уменьшить количество"
                                    >
                                        −
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        aria-label="Увеличить количество"
                                    >
                                        +
                                    </button>
                                </div>

                                <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                                    <FiShoppingCart />
                                    <span>Добавить в корзину</span>
                                </button>

                                <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                                    <span>Купить сейчас</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceDetails;
