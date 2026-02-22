import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {
  code: number;
  title: string;
  message: string;
  description?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ code, title, message, description }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.code}>{code}</div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.message}>{message}</p>
          {description && <p className={styles.description}>{description}</p>}
          
          <div className={styles.actions}>
            <button 
              onClick={() => navigate(-1)} 
              className={styles.button}
            >
              <FiArrowLeft />
              <span>Назад</span>
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.button}
            >
              <FiRefreshCw />
              <span>Обновить</span>
            </button>
            <Link to="/" className={styles.buttonPrimary}>
              <FiHome />
              <span>На главную</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

