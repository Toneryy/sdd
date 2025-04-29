// src/routes/AppRouter.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const AppRouter: React.FC = () => {
  // Заглушка авторизации, позже заменим на реальную логику
  const isAuth = false;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route
          path="dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" replace />}
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
