// src/components/ProtectedRoute/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const loc = useLocation();

    if (loading) return null;
    if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;

    return <>{children}</>;
}
