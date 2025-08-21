// frontend/src/pages/Profile/Profile.tsx
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProfile, fetchPurchases, PurchaseCard } from 'api/profile';
import { AuthContext } from 'context/AuthContext';
import styles from './Profile.module.scss';
import {
    FiMail,
    FiPhone,
    FiCalendar,
    FiArchive,
    FiShoppingCart,
    FiHash,
    FiLogOut,
    FiUser,
} from 'react-icons/fi';

type TabKey = 'profile' | 'purchases' | 'tickets';

const Profile: React.FC = () => {
    const { logout } = useContext(AuthContext);
    const [profileData, setProfileData] = useState<any>(null);

    // Покупки (постранично)
    const [purchases, setPurchases] = useState<PurchaseCard[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isPurchasesLoading, setIsPurchasesLoading] = useState(false);

    const [activeTab, setActiveTab] = useState<TabKey>('profile');
    const navigate = useNavigate();

    const STATUS_LABELS: Record<string, string> = {
        pending: 'Ожидает ответа оператора',
        active: 'Активно',
        closed: 'Завершено',
    };

    // Профиль
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchProfile(token)
            .then((response) => setProfileData(response.data))
            .catch((error) => {
                console.error('Ошибка загрузки профиля', error);
                toast.error('Сессия истекла. Пожалуйста, войдите заново.');
                logout();
                navigate('/login');
            });
    }, []);

    // Подгрузка покупок
    const loadPurchases = async (nextPage: number) => {
        const token = localStorage.getItem('token');
        if (!token) return;
        setIsPurchasesLoading(true);
        try {
            const { data } = await fetchPurchases(token, nextPage, pageSize);
            if (nextPage === 1) {
                setPurchases(data.items);
            } else {
                setPurchases((prev) => [...prev, ...data.items]);
            }
            setTotalOrders(data.totalOrders);
            setPage(nextPage);
        } catch (e: any) {
            toast.error(e?.response?.data?.message || 'Не удалось загрузить покупки');
        } finally {
            setIsPurchasesLoading(false);
        }
    };

    useEffect(() => {
        // первая страница покупок — сразу
        loadPurchases(1);
    }, []);

    const hasMore = useMemo(() => page * pageSize < totalOrders, [page, pageSize, totalOrders]);

    const handleLogout = () => {
        logout();
        toast.success('Выход из аккаунта успешен!');
        navigate('/login');
    };

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });

    const initials = (email?: string) => {
        if (!email) return 'U';
        const name = email.split('@')[0] || 'U';
        return name.slice(0, 2).toUpperCase();
    };

    const ActiveSub = () => (
        <div className={styles.metricCard}>
            <div className={styles.metricIconWrap}>
                <FiCalendar />
            </div>
            <div className={styles.metricBody}>
                <div className={styles.metricLabel}>Активная подписка</div>
                <div className={styles.metricValue}>
                    {profileData?.activeSubscription?.subscriptions?.title || 'Нет'}
                </div>
                <div className={styles.metricHint}>
                    Окончание:{' '}
                    <strong>
                        {profileData?.activeSubscription?.end_date
                            ? formatDate(profileData?.activeSubscription?.end_date)
                            : 'Нет данных'}
                    </strong>
                </div>
            </div>
        </div>
    );

    const OrdersMetric = () => (
        <div className={styles.metricCard}>
            <div className={styles.metricIconWrap}>
                <FiShoppingCart />
            </div>
            <div className={styles.metricBody}>
                <div className={styles.metricLabel}>Оплаченных заказов</div>
                <div className={styles.metricValue}>{totalOrders}</div>
                <div className={styles.metricHint}>За весь период</div>
            </div>
        </div>
    );

    const InfoBlock = () => (
        <div className={styles.infoGrid}>
            <div className={styles.infoItem} aria-label="Email">
                <FiMail className={styles.icon} />
                <span className={styles.infoLabel}>Email:</span>
                <span className={styles.infoValue}>{profileData?.user?.email || '—'}</span>
            </div>
            <div className={styles.infoItem} aria-label="Телефон">
                <FiPhone className={styles.icon} />
                <span className={styles.infoLabel}>Телефон:</span>
                <span className={styles.infoValue}>{profileData?.user?.phone || '—'}</span>
            </div>
        </div>
    );

    const TicketsList = () => (
        <div className={styles.historyList}>
            {profileData?.supportHistory?.length ? (
                profileData.supportHistory.map((item: any) => (
                    <div className={styles.historyItem} key={item.id}>
                        <FiArchive className={styles.historyIcon} />
                        <div className={styles.historyBody}>
                            <div className={styles.historyTop}>
                                <p className={styles.historyTitle} title={item.title}>
                                    {item.title}
                                </p>
                                <span
                                    className={`${styles.statusPill} ${styles[`status_${item.status as 'pending' | 'active' | 'closed'}`]
                                        }`}
                                >
                                    {STATUS_LABELS[item.status] ?? item.status}
                                </span>
                            </div>
                            <p className={styles.historyDate}>Создано: {formatDate(item.created_at)}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className={styles.emptyBox}>
                    <p>Обращений пока нет.</p>
                </div>
            )}
        </div>
    );

    const PurchaseSkeleton = () => (
        <div className={`${styles.purchaseCard} ${styles.skeleton}`}>
            <div className={styles.purchaseThumb} />
            <div className={styles.purchaseBody}>
                <div className={styles.skelLine} />
                <div className={styles.skelLineShort} />
                <div className={styles.skelLine} />
            </div>
        </div>
    );

    const PurchasesGrid = () => (
        <>
            {!purchases.length && isPurchasesLoading && (
                <div className={styles.purchasesGrid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <PurchaseSkeleton key={`sk-${i}`} />
                    ))}
                </div>
            )}

            {!purchases.length && !isPurchasesLoading && (
                <div className={styles.emptyBox}>
                    <p>Покупок пока нет.</p>
                </div>
            )}

            {!!purchases.length && (
                <div className={styles.purchasesGrid}>
                    {purchases.map((p, idx) => (
                        <div key={`${p.orderId}-${p.productId}-${idx}`} className={styles.purchaseCard}>
                            <div className={styles.purchaseThumb}>
                                {p.img ? (
                                    <img src={p.img} alt={p.name || 'Товар'} />
                                ) : (
                                    <div className={styles.thumbPlaceholder}>🎁</div>
                                )}
                                {p.qty > 0 && p.activatedCount >= p.qty && (
                                    <span className={styles.ribbon}>Активировано</span>
                                )}
                            </div>

                            <div className={styles.purchaseBody}>
                                <div className={styles.purchaseTitle} title={p.name || ''}>
                                    {p.name || 'Товар'}
                                </div>

                                <div className={styles.purchaseMeta}>
                                    <span className={styles.badgeQty}>×{p.qty}</span>
                                    {typeof p.price !== 'undefined' && p.price !== null && (
                                        <span className={styles.price}>
                                            {Number(p.price).toLocaleString('ru-RU')} ₽
                                        </span>
                                    )}
                                </div>

                                <div className={styles.purchaseFoot}>
                                    <div className={styles.orderRow}>
                                        <FiHash />
                                        <span>№ {p.orderNumber}</span>
                                    </div>
                                    <div className={styles.orderRow}>
                                        <FiCalendar />
                                        <span>{formatDate(p.purchasedAt)}</span>
                                    </div>
                                </div>

                                {p.qty > 0 && (
                                    <div className={styles.activationBar} title="Активировано / куплено">
                                        <div className={styles.activationTrack}>
                                            <div
                                                className={styles.activationFill}
                                                style={{
                                                    width: `${Math.min(100, Math.round((p.activatedCount / p.qty) * 100))}%`,
                                                }}
                                            />
                                        </div>
                                        <span className={styles.activationLabel}>
                                            {p.activatedCount}/{p.qty}
                                        </span>
                                    </div>
                                )}

                                <div className={styles.actions}>
                                    <Link
                                        to={`/shop/${p.productId ?? ''}`}
                                        className={styles.actionBtn}
                                        onClick={(e) => {
                                            if (!p.productId) e.preventDefault();
                                        }}
                                    >
                                        Подробнее
                                    </Link>
                                    <Link to={`/profile`} className={styles.actionBtnSecondary}>
                                        Управлять
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {hasMore && (
                <div className={styles.moreRow}>
                    <button
                        className={styles.loadMore}
                        disabled={isPurchasesLoading}
                        onClick={() => loadPurchases(page + 1)}
                    >
                        {isPurchasesLoading ? 'Загрузка...' : 'Показать ещё'}
                    </button>
                </div>
            )}
        </>
    );

    return (
        <div className={styles.profile}>
            {/* Hero */}
            <div className={styles.hero}>
                <div className={styles.heroInner}>
                    <div className={styles.avatar} aria-hidden>
                        {initials(profileData?.user?.email)}
                    </div>
                    <div className={styles.heroText}>
                        <h1 className={styles.title}>Личный кабинет</h1>
                        <p className={styles.subtitle}>
                            <FiUser /> {profileData?.user?.email || 'Пользователь'}
                        </p>
                    </div>

                    <button
                        className={styles.logoutBtn}
                        onClick={handleLogout}
                        aria-label="Выйти из аккаунта"
                        title="Выйти"
                    >
                        <FiLogOut />
                        <span>Выйти</span>
                    </button>
                </div>

                {/* Короткие метрики */}
                <div className={styles.metrics}>
                    <ActiveSub />
                    <OrdersMetric />
                </div>
            </div>

            {/* Табы */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.active : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Профиль
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'purchases' ? styles.active : ''}`}
                    onClick={() => setActiveTab('purchases')}
                >
                    Покупки
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'tickets' ? styles.active : ''}`}
                    onClick={() => setActiveTab('tickets')}
                >
                    Обращения
                </button>
            </div>

            {/* Контент табов */}
            {activeTab === 'profile' && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Мои данные</h2>
                    <InfoBlock />
                </section>
            )}

            {activeTab === 'purchases' && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Купленные товары</h2>
                    <PurchasesGrid />
                </section>
            )}

            {activeTab === 'tickets' && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>История обращений</h2>
                    <TicketsList />
                </section>
            )}
        </div>
    );
};

export default Profile;
