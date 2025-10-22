// src/components/Services/Services.tsx
import React, { useEffect, useState } from 'react'
import { fetchSubscriptions, Subscription } from 'api/subscriptions'
import styles from './Services.module.scss'
import Skeleton from '../Skeleton/Skeleton'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Services: React.FC = () => {
    const [services, setServices] = useState<Subscription[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSubscriptions()
            .then(res => setServices(res.data))
            .catch(err => {
                console.error(err)
                toast.error('Не удалось загрузить услуги')
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <section className={styles.services}>
                <h2 className={styles.title}>Наши услуги</h2>
                <div className={styles.grid}>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Skeleton width={300} height={180} />
                            </div>
                            <Skeleton width={180} height={20} />
                            <Skeleton width={80} height={16} />
                        </div>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className={styles.services}>
            <h2 className={styles.title}>Наши услуги</h2>

            <div className={styles.grid}>
                {services.map(svc => (
                    <Link to={`/subscriptions/${svc.id}`} key={svc.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={svc.image || `https://picsum.photos/seed/${encodeURIComponent(svc.title)}/300/180`}
                                alt={svc.title}
                                className={styles.image}
                            />
                        </div>
                        <h3 className={styles.cardTitle}>{svc.title}</h3>
                        <p className={styles.cardPrice}>
                            {Number(svc.price) === 0 ? 'Бесплатно' : `${svc.price}₽`}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Services
