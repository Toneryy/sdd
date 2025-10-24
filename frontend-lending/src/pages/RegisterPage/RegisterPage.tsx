import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerUser } from '../../api/auth';
import { toast } from 'react-toastify';
import styles from './RegisterPage.module.scss';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { formatRuPhone, normalizeRuPhoneToE164 } from '../../utils/phone';

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); // Для перенаправления после успешной регистрации

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Пароли не совпадают', { toastId: 'register-error' });
      return;
    }

    // Удаляем все нецифровые символы из телефона и форматируем
    const formattedPhone = normalizeRuPhoneToE164(form.phone);

    try {
      await registerUser({
        username: form.username,
        email: form.email,
        phone: formattedPhone,
        password: form.password,
      });
      toast.success('Регистрация успешна!'); // Уведомление об успешной регистрации
      navigate('/login'); // Перенаправление на страницу входа
    } catch (error: any) {
      console.error('Ошибка при регистрации:', error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || 'Ошибка регистрации',
        { toastId: 'register-error' },
      );
    }
  };

  const testId = 'registration-page-create-account';

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title} data-testid={`${testId}-title-text`}>Создать аккаунт</h2>

        <div className={styles.inputGroup}>
          <FiUser className={styles.icon} data-testid={`${testId}-username-input-icon`} />
          <input
            name="username"
            type="text"
            placeholder="Имя"
            required
            onChange={handleChange}
            data-testid={`${testId}-username-input`}
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
            data-testid={`${testId}-email-input-icon`}
          />
        </div>

        <div className={styles.inputGroup}>
          <FiPhone className={styles.icon} data-testid={`${testId}-phone-input-icon`} />
          <input
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: formatRuPhone(e.target.value) })}
            required
            data-testid={`${testId}-phone-input`}
          />
        </div>

        <div className={styles.inputGroup}>
          <FiLock className={styles.icon} data-testid={`${testId}-password-input-icon`} />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            required
            onChange={handleChange}
            data-testid={`${testId}-password-input`}
          />
        </div>

        <div className={styles.inputGroup}>
          <FiLock className={styles.icon} data-testid={`${testId}-confirm-password-input-icon`} />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            required
            onChange={handleChange}
            data-testid={`${testId}-confirm-password-input`}
          />
        </div>

        <button type="submit" className={styles.submitBtn} data-testid={`${testId}-registration-button`}>
          Зарегистрироваться
        </button>

        <div className={styles.links}>
          <span data-testid={`${testId}-already-have-account-text`}>Уже есть аккаунт?</span>
          <Link to="/login" className={styles.link} data-testid={`${testId}-login-link`}>
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
