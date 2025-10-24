// src/pages/ForgotPassword/ForgotPasswordPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import styles from './ForgotPasswordPage.module.scss';

const testId = 'forgot-page';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className={styles.title} data-testid={`${testId}-title-text`}>Восстановление пароля</h2>

        <p className={styles.subtitle} data-testid={`${testId}-subtitle-text`}>
          Введите ваш email, и мы отправим вам ссылку для сброса пароля.
        </p>

        <div className={styles.inputGroup}>
          <FiMail className={styles.icon} data-testid={`${testId}-email-input-icon`} />
          <input
            type="email"
            placeholder="Email"
            required
            data-tetsid={`${testId}-email-input`}
          />
        </div>

        <button type="submit" className={styles.submitBtn} data-testid={`${testId}-submit-button`}>
          Отправить ссылку
        </button>

        <div className={styles.links}>
          <Link to="/login" className={styles.link} data-testid={`${testId}-login-link`}>Вернуться ко входу</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
