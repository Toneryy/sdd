// src/App.tsx
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { PermissionsProvider } from "./contexts/PermissionsContext";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import { GuardRoute } from "./components/Permissions/GuardRoute";

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
import Register from "./components/Register/Register";
import StaffList from "./components/StaffList/StaffList";

import "./App.scss";
import StaffRightsManager from "components/StaffRightsManager/StaffRightsManager";
import NotFound from "components/NotFound/NotFound";

const App: React.FC = () => (
  <AuthProvider>
    <PermissionsProvider>
      <Router>
        <Routes>
          {/* Публично только /login; авторизованных редиректим в /admin */}
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

            {/* Разделы, управляемые правами */}
            <Route
              path="products"
              element={
                <GuardRoute feature="PRODUCTS_PAGE">
                  <Products />
                </GuardRoute>
              }
            />
            <Route
              path="databases"
              element={
                <GuardRoute feature="DATABASES_PAGE">
                  <Databases />
                </GuardRoute>
              }
            />
            <Route
              path="keys"
              element={
                <GuardRoute feature="KEYS_LINKING">
                  <KeyAliasesTable />
                </GuardRoute>
              }
            />
            <Route
              path="key-check"
              element={
                <GuardRoute feature="KEY_CHECK">
                  <KeyLookup />
                </GuardRoute>
              }
            />
            <Route
              path="posts"
              element={
                <GuardRoute feature="POSTS_EDITOR">
                  <PostEditor />
                </GuardRoute>
              }
            />
            <Route
              path="drafts"
              element={
                <GuardRoute feature="DRAFTS_PAGE">
                  <DraftsList />
                </GuardRoute>
              }
            />
            <Route
              path="promocodes"
              element={
                <GuardRoute feature="PROMOCODES_PAGE">
                  <PromoCodes />
                </GuardRoute>
              }
            />

            {/* Остальное как есть (не привязано к фичам пока) */}
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<Profile />} />
            <Route path="clients" element={<Clients />} />
            <Route
              path="register"
              element={
                <GuardRoute feature="SERVICE_REGISTER">
                  <Register />
                </GuardRoute>
              }
            />

            <Route
              path="staff-members"
              element={
                <GuardRoute feature="SERVICE_STAFF_MEMBERS">
                  <StaffList />
                </GuardRoute>
              }
            />

            <Route
              path="staff-rights"
              element={
                <GuardRoute feature="SERVICE_STAFF_RIGHTS">
                  <StaffRightsManager />
                </GuardRoute>
              }
            />

            {/* <Route
              path="backup"
              element={
                <GuardRoute feature="SERVICE_BACKUP">
                  <BackupPage />
                </GuardRoute>
              }
            /> */}
            {/* 404 внутри админки */}
            <Route path="*" element={<NotFound withinAdmin />} />
          </Route>

          {/* глобальная 404 для любых левых путей вне /admin */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PermissionsProvider>
  </AuthProvider>
);

export default App;
