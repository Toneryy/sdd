import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './NavigationProgress.module.scss';

const NavigationProgress: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Показываем прогресс-бар при начале навигации
    setLoading(true);
    
    // Скрываем через небольшую задержку (имитация загрузки)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!loading) return null;

  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} />
    </div>
  );
};

export default NavigationProgress;

