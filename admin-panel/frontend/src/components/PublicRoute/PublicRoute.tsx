import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function PublicRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    const loc = useLocation();

    if (loading) return null; // тут можно показать спиннер

    // Уже авторизован → отправляем туда, откуда пришёл, либо в /admin
    if (user) {
        const to = (loc.state as any)?.from?.pathname || "/admin";
        return <Navigate to={to} replace />;
    }

    return <>{children}</>;
}
