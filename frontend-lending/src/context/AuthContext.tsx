// src/context/AuthContext.tsx
import React, { createContext, useState, PropsWithChildren, useEffect } from 'react'

interface AuthContextType {
    isAuth: boolean
    login: (token: string) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    login: () => { },
    logout: () => { },
})

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isAuth, setIsAuth] = useState<boolean>(() =>
        Boolean(localStorage.getItem('token'))
    )

    // Если токен внезапно удалили из другого таба, будем реагировать
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'token') {
                setIsAuth(Boolean(e.newValue))
            }
        }
        window.addEventListener('storage', onStorage)
        return () => window.removeEventListener('storage', onStorage)
    }, [])

    const login = (token: string) => {
        localStorage.setItem('token', token)
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
