// src/routes/AppRouter.tsx
import React, { Suspense, lazy, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Skeleton from 'Components/Skeleton/Skeleton'
import MainLayout from '../layouts/MainLayout'
const LoginPage = lazy(() => import('pages/LoginPage/LoginPage'))
const RegisterPage = lazy(() => import('pages/RegisterPage/RegisterPage'))
const HomePage = lazy(() => import('pages/HomePage/HomePage'))
const ForgotPasswordPage = lazy(() => import('pages/ForgotPassword/ForgotPasswordPage'))
const Profile = lazy(() => import('pages/ProfilePage/Profile'))
import { AuthContext } from '../context/AuthContext'
const Services = lazy(() => import('Components/Services/Services'))
const ServiceDetails = lazy(() => import('pages/ServiceDetails/ServiceDetails'))
const Shop = lazy(() => import('Components/Shop/Shop'))
const ShopProduct = lazy(() => import('Components/Shop/ShopProduct/ShopProduct'))
const ProductDetails = lazy(() => import('pages/ProductDetailsPage/ProductDetails'))
const Cart = lazy(() => import('pages/Cart/Cart'))
import ScrollToTop from 'utils/ScrollToTop'
const Favorites = lazy(() => import('pages/Favorites/Favorites'))

// 👉 добавь:
const CheckoutDev = lazy(() => import('pages/CheckoutDev/CheckoutDev'))
const CheckoutSuccessDev = lazy(() => import('pages/CheckoutSuccessDev/CheckoutSuccessDev'))
const NewsPage = lazy(() => import('pages/NewsPage/NewsPage'))
const NewsDetail = lazy(() => import('pages/NewsPage/NewsDetail'))
const NotFoundPage = lazy(() => import('pages/ErrorPages/NotFoundPage'))
const ServerErrorPage = lazy(() => import('pages/ErrorPages/ServerErrorPage'))
const ForbiddenPage = lazy(() => import('pages/ErrorPages/ForbiddenPage'))

const AppRouter: React.FC = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div style={{ padding: 24 }}><Skeleton width={200} height={24} /><div style={{height:8}} /><Skeleton height={16} /><div style={{height:8}} /><Skeleton width={280} height={16} /></div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/subscriptions' element={<Services />} />
          <Route path="/subscriptions/:id" element={<ServiceDetails />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/shop/:id" element={<ShopProduct />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
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
          
          {/* Error pages */}
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      </Suspense>
    </>
  )
}

export default AppRouter
