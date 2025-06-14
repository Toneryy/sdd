// admin-panel/frontend/src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './components/AdminLayout/AdminLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Users from './components/Users/Users';
import PromoCodes from './components/PromoCodes/PromoCodes';
import ClientDatabase from './components/ClientDatabase/ClientDatabase';
import LandingEditor from './components/ProductEditor/ProductEditor';

import './App.scss';

const App: React.FC = () => (
  <Router>
    <Routes>
      {/* редирект со «среды по-умолчанию» на панель */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* ★ звёздочка — пропускаем все хвосты URL внутрь AdminLayout */}
      <Route path="/admin/*" element={<AdminLayout />}>
        {/* index-роут: /admin → Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="users" element={<Users />} />
        <Route path="promocodes" element={<PromoCodes />} />
        <Route path="clients" element={<ClientDatabase />} />
        <Route path="landing" element={<LandingEditor />} />
      </Route>

      {/* 404 – по желанию */}
      {/* <Route path="*" element={<h1>Страница не найдена</h1>} /> */}
    </Routes>
  </Router>
);

export default App;
