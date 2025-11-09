import React from 'react';
import Seo from '../../Components/Seo';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiShield, FiHeadphones, FiTrendingUp } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <FiZap />, title: 'Мгновенная активация', desc: 'Начните сразу' },
    { icon: <FiShield />, title: 'Безопасность', desc: 'Защита данных' },
    { icon: <FiHeadphones />, title: 'Поддержка 24/7', desc: 'Всегда на связи' },
    { icon: <FiTrendingUp />, title: 'Рост бизнеса', desc: 'Проверенные решения' },
  ];

  return (
    <section className={styles.hero}>
      <Seo title="SDD — Лендинг" description="Мы помогаем бизнесам расти" />
      
      {/* Декоративные элементы фона */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />
      
      {/* Noise overlay для премиального ощущения */}
      <div className={styles.noiseOverlay} />
      
      <div className={styles.content}>
        {/* Tagline */}
        <p className={styles.tagline}>Профессиональная IT-поддержка</p>
        
        {/* Главный заголовок с выделением */}
        <h1 className={styles.title} data-testid={'home-page-welcome-title'}>
          Решения для{' '}
          <span className={styles.highlight}>успешного</span>{' '}
          развития бизнеса
        </h1>
        
        {/* Подзаголовок */}
        <p className={styles.subtitle}>
          Всё необходимое для автоматизации, безопасности и роста вашей компании. 
          Просто, надёжно, эффективно.
        </p>
        
        {/* CTA блок с двумя кнопками */}
        <div className={styles.ctaGroup}>
          <button 
            className={styles.ctaPrimary} 
            onClick={() => navigate('/subscriptions')}
          >
            <span>Начать сейчас</span>
          </button>
          <button 
            className={styles.ctaSecondary} 
            onClick={() => navigate('/shop')}
          >
            Посмотреть услуги
          </button>
        </div>
        
        {/* Блок преимуществ */}
        <div className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
