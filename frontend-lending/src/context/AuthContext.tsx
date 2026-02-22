// src/context/AuthContext.tsx
import React, { createContext, useState, PropsWithChildren, useEffect } from 'react'
import { getAccessToken, clearTokens } from '../services/token'

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
        Boolean(getAccessToken())
    )

    // Слушаем изменения токенов в storage (для синхронизации между вкладками и после clearTokens)
    useEffect(() => {
        const checkAuth = () => {
            setIsAuth(Boolean(getAccessToken()))
        }
        
        // Проверяем при монтировании
        checkAuth()
        
        // Слушаем события storage (изменения из других вкладок)
        const onStorage = (e: StorageEvent) => {
            if (e.key === 'access_token' || e.key === 'token' || e.key === 'refresh_token') {
                checkAuth()
            }
        }
        window.addEventListener('storage', onStorage)
        
        // Слушаем custom event для синхронизации в той же вкладке
        const onAuthChange = () => checkAuth()
        window.addEventListener('auth-changed', onAuthChange)
        
        return () => {
            window.removeEventListener('storage', onStorage)
            window.removeEventListener('auth-changed', onAuthChange)
        }
    }, [])

    const login = (token: string) => {
        // Токен уже сохранен через setTokens перед вызовом этой функции
        // Обновляем состояние авторизации
        setIsAuth(Boolean(getAccessToken()))
    }

    const logout = () => {
        clearTokens()
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
