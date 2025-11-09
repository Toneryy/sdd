import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import { FaTelegramPlane, FaYoutube, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { getNews } from '../../api/publicNews'
import type { News } from '../../types'

const Footer: React.FC = () => {
    const [news, setNews] = useState<News[]>([])

    useEffect(() => {
        getNews()
            .then(data => {
                // Берем последние 3 новости
                const latestNews = data
                    .filter(n => n.published)
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .slice(0, 3)
                setNews(latestNews)
            })
            .catch(() => {
                // Игнорируем ошибки загрузки новостей в футере
            })
    }, [])

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    {/* Колонка 1: О компании */}
                    <div className={styles.column}>
                        <h2 className={styles.logo}>bd-project</h2>
                        <p className={styles.description}>
                            Профессиональная IT-поддержка и онлайн-консультации. 
                            Решаем любые технические задачи быстро и качественно.
                        </p>
                        <div className={styles.socials}>
                            <a 
                                href="https://t.me/yourchannel" 
                                target="_blank" 
                                rel="noreferrer"
                                className={styles.socialLink}
                                aria-label="Telegram"
                            >
                                <FaTelegramPlane />
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noreferrer"
                                className={styles.socialLink}
                                aria-label="YouTube"
                            >
                                <FaYoutube />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noreferrer"
                                className={styles.socialLink}
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Колонка 2: Быстрые ссылки */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Навигация</h3>
                        <ul className={styles.linkList}>
                            <li>
                                <Link to="/subscriptions">
                                    <FiArrowRight />
                                    <span>Услуги</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/shop">
                                    <FiArrowRight />
                                    <span>Магазин</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile">
                                    <FiArrowRight />
                                    <span>Личный кабинет</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart">
                                    <FiArrowRight />
                                    <span>Корзина</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Колонка 3: Последние новости */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Последние новости</h3>
                        {news.length > 0 ? (
                            <ul className={styles.newsList}>
                                {news.map((item) => (
                                    <li key={item.id}>
                                        <Link to={`/news/${item.id}`} className={styles.newsItem}>
                                            <span className={styles.newsTitle}>{item.title}</span>
                                            <span className={styles.newsDate}>
                                                {new Date(item.created_at).toLocaleDateString('ru-RU', {
                                                    day: 'numeric',
                                                    month: 'short'
                                                })}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={styles.noNews}>Новостей пока нет</p>
                        )}
                        <Link to="/news" className={styles.allNewsLink}>
                            Все новости <FiArrowRight />
                        </Link>
                    </div>

                    {/* Колонка 4: Контакты */}
                    <div className={styles.column}>
                        <h3 className={styles.columnTitle}>Контакты</h3>
                        <ul className={styles.contactList}>
                            <li>
                                <FaEnvelope />
                                <a href="mailto:support@bd-project.com">support@bd-project.com</a>
                            </li>
                            <li>
                                <FaPhone />
                                <a href="tel:+79991234567">+7 (999) 123-45-67</a>
                            </li>
                            <li>
                                <FaMapMarkerAlt />
                                <span>Москва, Россия</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.bottomBar}>
                <div className={styles.bottomContainer}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} bd-project. Все права защищены.
                    </p>
                    <p className={styles.madeWith}>
                        Сделано с <span className={styles.heart}>❤️</span> в России
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
