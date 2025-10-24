import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as loginUser } from '../../api/auth';
import { toast } from 'react-toastify';
import styles from './LoginPage.module.scss';
import { FiMail, FiLock } from 'react-icons/fi';
import { AuthContext } from 'context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      // ApiResponse<AuthResponse>
      login(res.data.data.accessToken);
      toast.success('Успешный вход!', { toastId: 'login-success' });
      navigate('/profile');
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Ошибка входа',
        { toastId: 'login-error' },
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title} data-testid={'login-page-login-form-title-text'}>Войти в аккаунт</h2>

        <div className={styles.inputGroup}>
          <FiMail className={styles.icon} data-testid={'login-page-email-input-icon'} />
          <input name="email" type="email" placeholder="Email" required onChange={handleChange}
                 data-testid={'login-page-email-input'} />
        </div>

        <div className={styles.inputGroup}>
          <FiLock className={styles.icon} data-testid={'login-page-password-input-icon'} />
          <input name="password" type="password" placeholder="Пароль" required onChange={handleChange}
                 data-testid={'login-page-password-input'} />
        </div>

        <button type="submit" className={styles.submitBtn} data-testid={'login-page-login-button'}>Войти</button>

        <div className={styles.links}>
          <Link to="/forgot-password" className={styles.link} data-testid={'login-page-forgot-password-link'}>Забыли
            пароль?</Link>
          <span>·</span>
          <Link to="/register" className={styles.link} data-testid={'login-page-registration-link'}>Регистрация</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
