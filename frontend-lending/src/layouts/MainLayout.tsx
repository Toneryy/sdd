import React from 'react';
import Header from '../Components/Header/Header';
import { Outlet } from 'react-router-dom'
import Footer from 'Components/Footer/Footer';
// Footer добавим позже, пока можно оставить пустой компонент
// import Footer from '../Components/Footer/Footer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;