import React from 'react';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom'
import Footer from 'Components/Footer/Footer';
import ScrollToTopButton from '../Components/ScrollToTopButton/ScrollToTopButton';
import NavigationProgress from '../Components/NavigationProgress';
import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <NavigationProgress />
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;