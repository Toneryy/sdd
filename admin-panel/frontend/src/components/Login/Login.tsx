import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.scss';

const TOAST_ID_SUCCESS = 'login-success';
const TOAST_ID_ERROR = 'login-error';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            await login(username, password);

            toast.success('Вход выполнен успешно!', { toastId: TOAST_ID_SUCCESS });

            const from = (location.state as any)?.from?.pathname || '/admin/dashboard';
            navigate(from, { replace: true });
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                'Неверный логин или пароль';
            toast.error(msg, { toastId: TOAST_ID_ERROR });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>Вход</h1>

                <label className={styles.label}>
                    Логин
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                        className={styles.input}
                        autoFocus
                        autoComplete="username"
                        disabled={loading}
                    />
                </label>

                <label className={styles.label}>
                    Пароль
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className={styles.input}
                        autoComplete="current-password"
                        disabled={loading}
                    />
                </label>

                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? 'Входим…' : 'Войти'}
                </button>
            </form>
        </div>
    );
}
