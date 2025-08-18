// src/routes/AppRouter.tsx
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LoginPage from 'pages/LoginPage/LoginPage'
import RegisterPage from 'pages/RegisterPage/RegisterPage'
import HomePage from 'pages/HomePage/HomePage'
import ForgotPasswordPage from 'pages/ForgotPassword/ForgotPasswordPage'
import Profile from 'pages/ProfilePage/Profile'
import { AuthContext } from '../context/AuthContext'
import Services from 'Components/Services/Services'
import ServiceDetails from 'pages/ServiceDetails/ServiceDetails'
import Shop from 'Components/Shop/Shop'
import ShopProduct from 'Components/Shop/ShopProduct/ShopProduct'
import ProductDetails from 'pages/ProductDetailsPage/ProductDetails'
import Cart from 'pages/Cart/Cart'
import ScrollToTop from 'utils/ScrollToTop'
import Favorites from 'pages/Favorites/Favorites'

// 👉 добавь:
import CheckoutDev from 'pages/CheckoutDev/CheckoutDev'
import CheckoutSuccessDev from 'pages/CheckoutSuccessDev/CheckoutSuccessDev'

const AppRouter: React.FC = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/subscriptions' element={<Services />} />
          <Route path="/subscriptions/:id" element={<ServiceDetails />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/shop/:id" element={<ShopProduct />} />
          <Route path="/favorites" element={<Favorites />} />

          <Route
            path="/cart"
            element={isAuth ? <Cart /> : <Navigate to="/login" replace />}
          />

          {/* 👉 dev-оплата */}
          <Route
            path="/checkout"
            element={isAuth ? <CheckoutDev /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/checkout/success/:orderNumber"
            element={isAuth ? <CheckoutSuccessDev /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/login"
            element={isAuth ? <Navigate to="/profile" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuth ? <Navigate to="/profile" replace /> : <RegisterPage />}
          />
          <Route
            path="/forgot-password"
            element={isAuth ? <Navigate to="/profile" replace /> : <ForgotPasswordPage />}
          />

          <Route
            path="/profile"
            element={isAuth ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/profile/:id"
            element={isAuth ? <ProductDetails /> : <Navigate to="/login" replace />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default AppRouter
