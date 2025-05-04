// src/pages/ServiceDetails/ServiceDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSubscriptionById } from '../../api/subscriptions';
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
    const [sub, setSub] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getSubscriptionById(id)
            .then(res => setSub(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className={styles.loading}>Загрузка...</p>;
    if (!sub) return <p className={styles.notFound}>Подписка не найдена</p>;

    return (
        <div className={styles.details}>
            <Link to="/subscriptions" className={styles.backLink}>
                ← Назад к услугам
            </Link>
            <div className={styles.card}>
                {sub.image && (
                    <div className={styles.topImageWrapper}>
                        <img src={sub.image} alt={sub.title} className={styles.topImage} />
                    </div>
                )}
                <h1 className={styles.title}>{sub.title}</h1>
                <p className={styles.price}>
                    {sub.price === 0 ? 'Бесплатно' : `${sub.price.toLocaleString()} ₽`}
                </p>

                {/* Длительность выводим только если она > 0 */}
                {sub.duration_days > 0 && (
                    <p className={styles.duration}>
                        Длительность: {sub.duration_days} {declensionDay(sub.duration_days)}
                    </p>
                )}

                {sub.description && (
                    <p className={styles.description}>{sub.description}</p>
                )}

                <button className={styles.buyBtn}>Купить</button>
            </div>
        </div>
    );
};

export default ServiceDetails;
