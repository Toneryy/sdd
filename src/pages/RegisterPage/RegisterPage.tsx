import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register as registerUser } from '../../api/auth'
import { toast } from 'react-toastify'
import styles from './RegisterPage.module.scss'
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi'
import InputMask from 'react-input-mask'

const RegisterPage: React.FC = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate() // Для перенаправления после успешной регистрации

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (form.password !== form.confirmPassword) {
            toast.error('Пароли не совпадают')
            return
        }

        // Удаляем все нецифровые символы из телефона и форматируем
        const cleanedPhone = form.phone.replace(/\D/g, '')
        const formattedPhone = cleanedPhone.startsWith('7')
            ? `+${cleanedPhone}`
            : `+7${cleanedPhone.slice(-10)}`

        try {
            await registerUser({
                username: form.username,
                email: form.email,
                phone: formattedPhone,
                password: form.password
            })
            toast.success('Регистрация успешна!') // Уведомление об успешной регистрации
            navigate('/login') // Перенаправление на страницу входа
        } catch (error: any) {
            console.error("Ошибка при регистрации:", error.response?.data || error.message)
            toast.error(error.response?.data?.message || 'Ошибка регистрации')
        }
    }

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.title}>Создать аккаунт</h2>

                <div className={styles.inputGroup}>
                    <FiUser className={styles.icon} />
                    <input
                        name="username"
                        type="text"
                        placeholder="Имя"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <FiMail className={styles.icon} />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <FiPhone className={styles.icon} />
                    <InputMask
                        name="phone"
                        mask="+7 (999) 999-99-99"
                        value={form.phone}
                        onChange={handleChange}
                        required
                    >
                        {(inputProps: any) => (
                            <input {...inputProps} placeholder="Телефон" />
                        )}
                    </InputMask>
                </div>

                <div className={styles.inputGroup}>
                    <FiLock className={styles.icon} />
                    <input
                        name="password"
                        type="password"
                        placeholder="Пароль"
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <FiLock className={styles.icon} />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Повторите пароль"
                        required
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className={styles.submitBtn}>
                    Зарегистрироваться
                </button>

                <div className={styles.links}>
                    <span>Уже есть аккаунт?</span>
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
