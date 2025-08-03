// admin-panel/frontend/src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './components/AdminLayout/AdminLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Products from './components/Products/Products';
import Users from './components/Users/Users';
import PromoCodes from './components/PromoCodes/PromoCodes';

import './App.scss';
import Databases from 'components/Databases/Databases';
import KeyAliasesTable from 'components/Products/Tables/KeyAliasesTable';
import KeyLookup from 'components/Products/Tables/KeyLookup';
import Profile from 'components/Users/Profile/Profile';
import UserSearch from 'components/UserSearch/UserSearch';
import Clients from 'components/Clients/Clients';
import PostEditor from 'components/PostEditor/PostEditor';
import DraftsList from 'components/DraftsList/DraftsList';

const App: React.FC = () => (
  <Router>
    <UserSearch />
    <Routes>
      {/* редирект со «среды по-умолчанию» на панель */}
      <Route path="/" element={<Navigate to="/admin" replace />} />

      {/* ★ звёздочка — пропускаем все хвосты URL внутрь AdminLayout */}
      <Route path="/admin/*" element={<AdminLayout />}>
        {/* index-роут: /admin → Dashboard */}
        <Route path="databases" element={<Databases />} />
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="keys" element={<KeyAliasesTable />} />
        <Route path="key-check" element={<KeyLookup />} />
        <Route path="products" element={<Products />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<Profile />} />
        <Route path="promocodes" element={<PromoCodes />} />
        <Route path="clients" element={<Clients />} />
        <Route path="posts" element={<PostEditor />} />
        <Route path="drafts" element={<DraftsList />} />
      </Route>

      {/* 404 – по желанию */}
      {/* <Route path="*" element={<h1>Страница не найдена</h1>} /> */}
    </Routes>
  </Router>
);

export default App;
