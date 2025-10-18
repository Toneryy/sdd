// src/pages/ForgotPassword/ForgotPasswordPage.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import styles from './ForgotPasswordPage.module.scss'

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <form className={styles.form}>
                <h2 className={styles.title}>Восстановление пароля</h2>

                <p className={styles.subtitle}>
                    Введите ваш email, и мы отправим вам ссылку для сброса пароля.
                </p>

                <div className={styles.inputGroup}>
                    <FiMail className={styles.icon} />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                    />
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Отправить ссылку
                </button>

                <div className={styles.links}>
                    <Link to="/login" className={styles.link}>Вернуться ко входу</Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordPage
