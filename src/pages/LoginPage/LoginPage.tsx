import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as loginUser } from '../../api/auth'
import { toast } from 'react-toastify'
import styles from './LoginPage.module.scss'
import { FiMail, FiLock } from 'react-icons/fi'
import { AuthContext } from 'context/AuthContext'

const LoginPage: React.FC = () => {
    const { login } = useContext(AuthContext);
    const [form, setForm] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await loginUser(form)
            login(res.data.token);
            toast.success('Успешный вход!')
            navigate('/profile')            // сразу на профиль
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Ошибка входа')
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Войти в аккаунт</h2>

                <div className={styles.inputGroup}>
                    <FiMail className={styles.icon} />
                    <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
                </div>

                <div className={styles.inputGroup}>
                    <FiLock className={styles.icon} />
                    <input name="password" type="password" placeholder="Пароль" required onChange={handleChange} />
                </div>

                <button type="submit" className={styles.submitBtn}>Войти</button>

                <div className={styles.links}>
                    <Link to="/forgot-password" className={styles.link}>Забыли пароль?</Link>
                    <span>·</span>
                    <Link to="/register" className={styles.link}>Регистрация</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
