// src/components/ProtectedRoute/GuestRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ReactNode } from 'react';

export default function GuestRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    if (loading) return null;           // можно показать спиннер
    return user ? <Navigate to="/admin" replace /> : children;
}
