// admin-panel/frontend/src/components/Dashboard/Dashboard.tsx
import React from 'react';
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
    return (
        <div className={styles.dashboard}>
            <h2 className={styles.title}>Панель управления</h2>
            <p className={styles.subtitle}>Этот текст должен отображаться в админке</p>

            {/* пример статистики */}
            <div className={styles.statsFlex}>
                <div className={styles.card}>
                    <span className={styles.cardLabel}>Товары</span>
                    <span className={styles.cardValue}>120</span>
                </div>

                <div className={styles.card}>
                    <span className={styles.cardLabel}>Пользователи</span>
                    <span className={styles.cardValue}>342</span>
                </div>

                <div className={styles.card}>
                    <span className={styles.cardLabel}>Продажи</span>
                    <span className={styles.cardValue}>57&nbsp;000&nbsp;₽</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
