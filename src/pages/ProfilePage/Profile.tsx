// src/pages/ProfilePage/Profile.tsx
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from 'context/AuthContext'
import { fetchProfile } from 'api/profile'
import styles from './Profile.module.scss'
import { FiMail, FiPhone, FiCalendar, FiArchive, FiShoppingCart } from 'react-icons/fi'

interface ProfileData {
    user: { username: string; email: string; phone: string }
    activeSubscription:
    | { subscriptions: { title: string }; end_date: string }
    | null
    supportHistory: { title: string; status: string; created_at: string }[]
    purchasedProducts: {
        products: { title: string }
        purchased_at: string
    }[]
}

const MONTHS_RU = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
]

const formatDateRu = (iso: string) => {
    const d = new Date(iso)
    return `${d.getDate()} ${MONTHS_RU[d.getMonth()]} ${d.getFullYear()}`
}

const Profile: React.FC = () => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [data, setData] = useState<ProfileData | null>(null)
    const token = localStorage.getItem('token')!

    useEffect(() => {
        fetchProfile(token)
            .then(res => setData(res.data))
            .catch(err => {
                toast.error('Не удалось загрузить профиль')
                if (err.response?.status === 401) {
                    logout()
                    navigate('/login')
                }
            })
    }, [token])

    const handleLogout = () => {
        logout()
        toast.success('Выход из аккаунта успешен!')
        navigate('/login')
    }

    if (!data) return <p>Загрузка...</p>

    return (
        <div className={styles.profile}>
            <h1 className={styles.title}>Личный кабинет</h1>

            {/* Мои данные */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Мои данные</h2>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <FiMail className={styles.icon} />
                        <span className={styles.infoLabel}>Email:</span>
                        <span className={styles.infoValue}>{data.user.email}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FiPhone className={styles.icon} />
                        <span className={styles.infoLabel}>Телефон:</span>
                        <span className={styles.infoValue}>{data.user.phone}</span>
                    </div>
                </div>
            </section>

            {/* Активная подписка */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Активная подписка</h2>
                {data.activeSubscription ? (
                    <div className={styles.card}>
                        <FiCalendar className={styles.cardIcon} />
                        <div>
                            <p className={styles.cardTitle}>
                                {data.activeSubscription.subscriptions.title}
                            </p>
                            <p className={styles.cardText}>
                                Окончание: <strong>{formatDateRu(data.activeSubscription.end_date)}</strong>
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <p>Нет активных подписок</p>
                        <br />
                        <NavLink to="/subscriptions" className={styles.linkToSubscribe}>
                            Оформить подписку
                        </NavLink>
                    </>
                )}
            </section>

            {/* История обращений */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>История обращений</h2>
                {data.supportHistory.length ? (
                    <div className={styles.historyList}>
                        {data.supportHistory.map((h, i) => (
                            <div key={i} className={styles.historyItem}>
                                <FiArchive className={styles.historyIcon} />
                                <div>
                                    <p className={styles.historyTitle}>{h.title}</p>
                                    <p className={styles.historyText}>
                                        Статус: <strong>{h.status}</strong>
                                    </p>
                                    <p className={styles.historyDate}>
                                        {formatDateRu(h.created_at)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>История обращений пуста</p>
                )}
            </section>

            {/* Купленные товары */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Купленные товары</h2>
                {data.purchasedProducts.length ? (
                    <div className={styles.historyList}>
                        {data.purchasedProducts.map((p, i) => (
                            <div key={i} className={styles.historyItem}>
                                <FiShoppingCart className={styles.historyIcon} />
                                <div>
                                    <p className={styles.historyTitle}>{p.products.title}</p>
                                    <p className={styles.historyDate}>
                                        Куплено: {formatDateRu(p.purchased_at)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Вы ещё ничего не покупали</p>
                )}
            </section>

            <button onClick={handleLogout} className={styles.logoutBtn}>
                Выйти
            </button>
        </div>
    )
}

export default Profile
