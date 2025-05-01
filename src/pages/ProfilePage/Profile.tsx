// src/pages/ProfilePage/Profile.tsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Profile.module.scss';
import { FiMail, FiPhone, FiCalendar, FiArchive } from 'react-icons/fi';
import { AuthContext } from 'context/AuthContext';

const Profile: React.FC = () => {
    const { isAuth, logout } = useContext(AuthContext)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        toast.success('Выход из аккаунта успешен!');
        navigate('/login');
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
                        <span className={styles.infoValue}>user@example.com</span>
                    </div>
                    <div className={styles.infoItem}>
                        <FiPhone className={styles.icon} />
                        <span className={styles.infoLabel}>Телефон:</span>
                        <span className={styles.infoValue}>+7 (999) 123-45-67</span>
                    </div>
                </div>
            </section>

            {/* Активная подписка */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Активная подписка</h2>
                <div className={styles.card}>
                    <FiCalendar className={styles.cardIcon} />
                    <div>
                        <p className={styles.cardTitle}>Месячная подписка</p>
                        <p className={styles.cardText}>Окончание: <strong>2025-06-02</strong></p>
                    </div>
                </div>
            </section>

            {/* История обращений */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>История обращений</h2>
                <div className={styles.historyList}>
                    {/* Пример записи */}
                    <div className={styles.historyItem}>
                        <FiArchive className={styles.historyIcon} />
                        <div>
                            <p className={styles.historyTitle}>Поддержка по оплате</p>
                            <p className={styles.historyText}>Статус: <strong>Активно</strong></p>
                            <p className={styles.historyDate}>2025-05-01</p>
                        </div>
                    </div>
                    {/* Можно добавить ещё элементов в будущем */}
                </div>
            </section>

            <button onClick={handleLogout} className={styles.logoutBtn}>
                Выйти
            </button>
        </div>
    );
};

export default Profile;
