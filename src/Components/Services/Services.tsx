// src/components/Services/Services.tsx
import React, { useEffect, useState } from 'react'
import { fetchSubscriptions, Subscription } from 'api/subscriptions'
import styles from './Services.module.scss'
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
        return <p className={styles.loading}>Загрузка услуг…</p>
    }

    return (
        <section className={styles.services}>
            <h2 className={styles.title}>Наши услуги</h2>

            <div className={styles.grid}>
                {services.map(svc => (
                    <Link to={`/subscriptions/${svc.id}`} key={svc.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={svc.image || `https://via.placeholder.com/300x180?text=${encodeURIComponent(svc.title)}`}
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
