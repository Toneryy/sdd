import React from 'react';
import Header from '../Components/Header/Header';
import Home from 'pages/Home/Home';
import { About } from 'pages/About/About';
import { Features } from 'pages/Features/Features';
import { Contact } from 'pages/Contact/Contact';
import { FAQ } from 'pages/FAQ/FAQ';
import { Reviews } from 'pages/Reviews/Reviews';
// Footer добавим позже, пока можно оставить пустой компонент
// import Footer from '../Components/Footer/Footer';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <About />
        <Features />
        <Contact />
        <Reviews />
        <FAQ />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;