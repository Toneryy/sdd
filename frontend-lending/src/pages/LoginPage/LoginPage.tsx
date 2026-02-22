import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginUser } from '../../api/auth';
import { toast } from 'react-toastify';
import styles from './LoginPage.module.scss';
import { FiMail, FiLock } from 'react-icons/fi';
import { AuthContext } from 'context/AuthContext';
import { setTokens } from '../../services/token';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Очистка ошибки при вводе
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!form.email) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!form.password) {
      newErrors.password = 'Пароль обязателен';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await loginUser(form);
      const authData = res.data.data;
      // Сохраняем токены
      setTokens({
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        user: authData.user
      });
      // Обновляем состояние авторизации
      login(authData.accessToken);
      toast.success('Успешный вход!', { toastId: 'login-success' });
      navigate('/profile');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      toast.error(
        err.response?.data?.message || err.message || 'Ошибка входа',
        { toastId: 'login-error' }
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title} data-testid={'login-page-login-form-title-text'}>Войти в аккаунт</h2>

        <div className={styles.inputGroup}>
          <FiMail className={styles.icon} data-testid={'login-page-email-input-icon'} />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            data-testid={'login-page-email-input'}
          />
          {errors.email && <span id="email-error" style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <FiLock className={styles.icon} data-testid={'login-page-password-input-icon'} />
          <input 
            name="password" 
            type="password" 
            placeholder="Пароль" 
            value={form.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            data-testid={'login-page-password-input'}
          />
          {errors.password && <span id="password-error" style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
        </div>

        <button type="submit" className={styles.submitBtn} data-testid={'login-page-login-button'}>Войти</button>

        <div className={styles.links}>
          <Link to="/forgot-password" className={styles.link} data-testid={'login-page-forgot-password-link'}>Забыли пароль?</Link>
          <span>·</span>
          <Link to="/register" className={styles.link} data-testid={'login-page-registration-link'}>Регистрация</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
