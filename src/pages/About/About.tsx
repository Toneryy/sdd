// pages/About/About.tsx
import React from 'react';
import styles from './About.module.scss';
import { FaUsers, FaLightbulb, FaChartLine } from 'react-icons/fa';

export const About = () => {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <h2 className={styles.title}>О нас</h2>

                <div className={styles.content}>
                    <p className={styles.text}>
                        Мы — команда профессионалов, работающих над созданием решений, которые делают ваш бизнес более эффективным.
                        Мы специализируемся на цифровых трансформациях, чтобы помочь вам достигать новых высот.
                    </p>

                    <div className={styles.features}>
                        <div className={styles.featureItem}>
                            <FaUsers className={styles.icon} />
                            <h3>Опытная команда</h3>
                            <p>10+ лет опыта в разработке решений</p>
                        </div>

                        <div className={styles.featureItem}>
                            <FaLightbulb className={styles.icon} />
                            <h3>Инновации</h3>
                            <p>Используем передовые технологии</p>
                        </div>

                        <div className={styles.featureItem}>
                            <FaChartLine className={styles.icon} />
                            <h3>Рост бизнеса</h3>
                            <p>Фокус на измеримые результаты</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
