import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import { FaTelegramPlane, FaYoutube, FaInstagram } from 'react-icons/fa'

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Колонка 1: Логотип и описание */}
                <div className={styles.column}>
                    <h2 className={styles.logo}>bd-project</h2>
                    <p className={styles.description}>
                        Профессиональная IT-поддержка и онлайн-консультации. Решим любую проблему!
                    </p>
                </div>

                {/* Колонка 2: Быстрые ссылки */}
                <div className={styles.column}>
                    <h3>Навигация</h3>
                    <ul>
                        <li><Link to="/profile">Личный кабинет</Link></li>
                        <li><Link to="/shop">Магазин</Link></li>
                        <li><Link to="/subscriptions">Услуги</Link></li>
                        <li><Link to="/news">Статьи</Link></li>
                    </ul>
                </div>

                {/* Колонка 3: Контакты */}
                <div className={styles.column}>
                    <h3>Контакты</h3>
                    <ul>
                        <li>Email: <a href="mailto:support@bd-project.com">support@bd-project.com</a></li>
                        <li>Телефон: <a href="tel:+79991234567">+7 (999) 123-45-67</a></li>
                        <li className={styles.socials}>
                            <a href="https://t.me/yourchannel" target="_blank" rel="noreferrer"><FaTelegramPlane /></a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
                        </li>
                    </ul>
                </div>

                {/* Колонка 4: Политика и соглашения */}
                <div className={styles.column}>
                    <h3>Документы</h3>
                    <ul>
                        <li><Link to="/privacy-policy">Политика конфиденциальности</Link></li>
                        <li><Link to="/terms">Пользовательское соглашение</Link></li>
                    </ul>
                </div>
            </div>

            <div className={styles.bottomBar}>
                © {new Date().getFullYear()} bd-project. Все права защищены.
            </div>
        </footer>
    )
}

export default Footer
