// src/pages/HomePage/HomePage.tsx
import React from 'react'
import Home from '../Home/Home'
import { About } from '../About/About'
import { Features } from '../Features/Features'
import { Contact } from '../Contact/Contact'
import { Reviews } from '../Reviews/Reviews'
import { FAQ } from '../FAQ/FAQ'
import LandingPost from 'pages/LandingPost/LandingPost'

const HomePage: React.FC = () => (
    <>
        <Home />
        <LandingPost />
        <About />
        <Features />
        <Contact />
        <Reviews />
        <FAQ />
    </>
)

export default HomePage
