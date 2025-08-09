// src/contexts/AuthContext.tsx
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";
import { loginApi, logoutApi, meApi, registerApi, type User, type Role } from "../api/auth";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    register: (p: { username: string; email: string; role: Role; password: string }) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Пытаемся подтянуть сессию по куке при старте
    useEffect(() => {
        (async () => {
            try {
                const me = await meApi();
                setUser(me);
            } catch {
                // не авторизован — это ок
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const login = async (username: string, password: string) => {
        const u = await loginApi(username, password);
        setUser(u);
    };

    const register = async (p: { username: string; email: string; role: Role; password: string }) => {
        const u = await registerApi(p);
        // если это первый сотрудник — сервер сразу логинит; в любом случае опресним me
        setUser(u);
    };

    const logout = async () => {
        await logoutApi();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
