// components/Features/Features.tsx
import styles from './Features.module.scss';
import { FiLayers, FiClock, FiTrendingUp, FiShield } from 'react-icons/fi';

export const Features = () => {
  const features = [
    {
      icon: <FiLayers className={styles.icon} />,
      title: "Интуитивно понятный интерфейс",
      description: "Сделайте работу с нами лёгкой и приятной"
    },
    {
      icon: <FiClock className={styles.icon} />,
      title: "Поддержка 24/7",
      description: "Всегда готовы помочь вам, когда это необходимо"
    },
    {
      icon: <FiTrendingUp className={styles.icon} />,
      title: "Инновационные решения",
      description: "Применяем самые современные технологии для вашего бизнеса"
    },
    {
      icon: <FiShield className={styles.icon} />,
      title: "Безопасность данных",
      description: "Ваша информация защищена по высшим стандартам"
    }
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.title}>Наши особенности</h2>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardText}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};