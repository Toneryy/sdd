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

const AppRouter: React.FC = () => {
  const { isAuth } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

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
      </Route>
    </Routes>
  )
}

export default AppRouter
