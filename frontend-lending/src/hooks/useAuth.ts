import { useCallback, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { LoginCredentials, RegisterData, User } from '../types';
import { getAccessToken, clearTokens } from '../services/token';

/**
 * Хук аутентификации на локальном состоянии и localStorage.
 * Синхронизируется между вкладками через storage event.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(() =>
    Boolean(getAccessToken())
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'access_token' || e.key === 'token') {
        setIsAuthed(Boolean(getAccessToken()));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await authService.login(credentials);
    setUser(res.user);
    setIsAuthed(true);
    return res;
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await authService.register(data);
    setUser(res.user);
    setIsAuthed(true);
    return res;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setIsAuthed(false);
    clearTokens();
  }, []);

  return useMemo(
    () => ({ user, isAuthed, login, register, logout, setUser }),
    [user, isAuthed, login, register, logout]
  );
}


