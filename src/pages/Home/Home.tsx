import React from 'react';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Добро пожаловать в наш сервис!</h1>
        <p className={styles.subtitle}>
          Мы помогаем бизнесам расти и развиваться с помощью инновационных решений.
        </p>
        <button className={styles.ctaButton} onClick={() => navigate('/subscriptions')}>Начать сейчас</button>
      </div>
    </section>
  );
};

export default Home;