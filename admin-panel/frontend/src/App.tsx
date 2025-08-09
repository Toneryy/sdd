// src/App.tsx
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import Login from "./components/Login/Login";

import AdminLayout from "./components/AdminLayout/AdminLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Products";
import Users from "./components/Users/Users";
import Profile from "./components/Users/Profile/Profile";
import PromoCodes from "./components/PromoCodes/PromoCodes";
import Clients from "./components/Clients/Clients";
import Databases from "./components/Databases/Databases";
import KeyAliasesTable from "./components/Products/Tables/KeyAliasesTable";
import KeyLookup from "./components/Products/Tables/KeyLookup";
import PostEditor from "./components/PostEditor/PostEditor";
import DraftsList from "./components/DraftsList/DraftsList";

import "./App.scss";
import Register from "components/Register/Register";
import StaffList from "components/StaffList/StaffList";

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Публично только /login; авторизованных будет редиректить в /admin */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* редирект корня на /admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Всё под /admin/* — только для авторизованных */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="databases" element={<Databases />} />
          <Route path="keys" element={<KeyAliasesTable />} />
          <Route path="key-check" element={<KeyLookup />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<Profile />} />
          <Route path="promocodes" element={<PromoCodes />} />
          <Route path="clients" element={<Clients />} />
          <Route path="posts" element={<PostEditor />} />
          <Route path="drafts" element={<DraftsList />} />
          <Route path="register" element={<Register />} />
          <Route path="staff-members" element={<StaffList />} />
        </Route>

        {/* опционально 404: */}
        {/* <Route path="*" element={<Navigate to="/admin" replace />} /> */}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
