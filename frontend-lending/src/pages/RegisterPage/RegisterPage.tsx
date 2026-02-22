import React, { useState, useRef } from 'react';
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
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const phoneInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 12;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Очистка ошибки при вводе
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const cursorPosition = input.selectionStart || 0;
    const oldValue = form.phone;
    const newValue = formatRuPhone(input.value);

    setForm({ ...form, phone: newValue });
    if (errors.phone) {
      setErrors({ ...errors, phone: undefined });
    }

    // Восстанавливаем позицию курсора
    setTimeout(() => {
      if (phoneInputRef.current) {
        let newCursorPosition = cursorPosition;

        if (newValue.length < oldValue.length) {
          const deletedChars = oldValue.length - newValue.length;
          newCursorPosition = Math.max(0, cursorPosition - deletedChars);
        } else {
          const addedChars = newValue.length - oldValue.length;
          newCursorPosition = cursorPosition + addedChars;
        }

        if (newCursorPosition > newValue.length) {
          newCursorPosition = newValue.length;
        }

        phoneInputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!form.username || !form.username.trim()) {
      newErrors.username = 'Имя обязательно';
    }

    if (!form.email) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!form.phone) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = 'Некорректный номер телефона';
    }

    if (!form.password) {
      newErrors.password = 'Пароль обязателен';
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.confirmPassword) {
        toast.error('Пароли не совпадают', { toastId: 'register-error' });
      }
      return;
    }

    const formattedPhone = normalizeRuPhoneToE164(form.phone);

    try {
      await registerUser({
        username: form.username,
        email: form.email,
        phone: formattedPhone,
        password: form.password
      });
      toast.success('Регистрация успешна!');
      navigate('/login');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      console.error('Ошибка при регистрации:', err.response?.data || err.message);
      toast.error(
        err.response?.data?.message || err.message || 'Ошибка регистрации',
        { toastId: 'register-error' }
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
            value={form.username}
            onChange={handleChange}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'username-error' : undefined}
            data-testid={`${testId}-username-input`}
          />
          {errors.username && <span id="username-error" style={{ color: 'red', fontSize: '12px' }}>{errors.username}</span>}
        </div>

        <div className={styles.inputGroup}>
          <FiMail className={styles.icon} data-testid={`${testId}-email-input-icon`} />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            data-testid={`${testId}-email-input`}
          />
          {errors.email && <span id="email-error" style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div className={styles.inputGroup}>
          <FiPhone className={styles.icon} data-testid={`${testId}-phone-input-icon`} />
          <input
            ref={phoneInputRef}
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handlePhoneChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            data-testid={`${testId}-phone-input`}
          />
          {errors.phone && <span id="phone-error" style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>}
        </div>

        <div className={styles.inputGroup}>
          <FiLock className={styles.icon} data-testid={`${testId}-password-input-icon`} />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            data-testid={`${testId}-password-input`}
          />
          {errors.password && <span id="password-error" style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
        </div>

        <div className={styles.inputGroup}>
          <FiLock className={styles.icon} data-testid={`${testId}-confirm-password-input-icon`} />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            value={form.confirmPassword}
            onChange={handleChange}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            data-testid={`${testId}-confirm-password-input`}
          />
          {errors.confirmPassword && <span id="confirmPassword-error" style={{ color: 'red', fontSize: '12px' }}>{errors.confirmPassword}</span>}
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
