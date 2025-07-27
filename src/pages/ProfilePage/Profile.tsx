import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProfile } from 'api/profile';
import { AuthContext } from 'context/AuthContext';
import styles from './Profile.module.scss';
import { FiMail, FiPhone, FiCalendar, FiArchive, FiShoppingCart } from 'react-icons/fi';

const Profile: React.FC = () => {
    const { isAuth, logout } = useContext(AuthContext);
    const [profileData, setProfileData] = useState<any>(null);
    const navigate = useNavigate();

    const STATUS_LABELS: Record<string, string> = {
        pending: 'Ожидает ответа оператора',
        active: 'Активно',
        closed: 'Завершено',
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchProfile(token)
                .then(response => {
                    setProfileData(response.data);
                })
                .catch(error => {
                    console.error('Ошибка загрузки профиля', error);
                    toast.error('Сессия истекла. Пожалуйста, войдите заново.');
                    logout();            // очистка авторизации
                    navigate('/login');  // редирект на страницу входа
                });
        } else {
            navigate('/login'); // если токена вообще нет
        }
    }, []);

    const handleLogout = () => {
        logout();
        toast.success('Выход из аккаунта успешен!');
        navigate('/login');
    };

    // Функция для форматирования даты
    const formatDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(date).toLocaleDateString('ru-RU', options); // Используем 'ru-RU' для русского формата
    };

    return (
        <div className={styles.profile}>
            <h1 className={styles.title}>Личный кабинет</h1>

            {/* Информация пользователя */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Мои данные</h2>
                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <FiMail className={styles.icon} />
                        <span className={styles.infoLabel}>Email:</span>
                        <span className={styles.infoValue}>{profileData?.user?.email}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FiPhone className={styles.icon} />
                        <span className={styles.infoLabel}>Телефон:</span>
                        <span className={styles.infoValue}>{profileData?.user?.phone}</span>
                    </div>
                </div>
            </section>

            {/* Активная подписка */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Активная подписка</h2>
                <div className={styles.card}>
                    <FiCalendar className={styles.cardIcon} />
                    <div>
                        <p className={styles.cardTitle}>{profileData?.activeSubscription?.subscriptions?.title}</p>
                        <p className={styles.cardText}>Окончание: <strong>{profileData?.activeSubscription?.end_date ? formatDate(profileData?.activeSubscription?.end_date) : 'Нет данных'}</strong></p>
                    </div>
                </div>
            </section>

            {/* История обращений */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>История обращений</h2>
                <div className={styles.historyList}>
                    {profileData?.supportHistory?.map((item: any) => (
                        <div className={styles.historyItem} key={item.id}>
                            <FiArchive className={styles.historyIcon} />
                            <div>
                                <p className={styles.historyTitle}>{item.title}</p>
                                <p className={styles.historyText}>Статус: <strong>{STATUS_LABELS[item.status]}</strong></p>
                                <p className={styles.historyDate}>Дата: <strong>{formatDate(item.created_at)}</strong></p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Купленные товары */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Купленные товары</h2>
                <div className={styles.historyList}>
                    {profileData?.boughtProducts?.length ? (
                        profileData.boughtProducts.map((item: any) => (
                            <Link
                                to={`/profile/${item.id}`}
                                key={item.products.id}
                                className={styles.historyItemLink}
                                state={{ product: item }}
                            >
                                <div className={styles.historyItem}>
                                    <FiShoppingCart className={styles.historyIcon} />
                                    <div>
                                        <p className={styles.historyTitle}>{item.products.name}</p>
                                        <p className={styles.historyText}>Цена: <strong>{item.products.price}₽</strong></p>
                                        <p className={styles.historyText}>Описание: <strong>{item.products.description}</strong></p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Нет купленных товаров.</p>
                    )}
                </div>
            </section>

            <button onClick={handleLogout} className={styles.logoutBtn}>
                Выйти
            </button>
        </div>
    );
};

export default Profile;
