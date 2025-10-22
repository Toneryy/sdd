import React from 'react';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom'
import Footer from 'Components/Footer/Footer';
import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;