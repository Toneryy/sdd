import { useCallback, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { LoginCredentials, RegisterData, User } from '../types';
import { STORAGE_KEYS } from '../constants';

/**
 * Хук аутентификации на локальном состоянии и localStorage.
 * Синхронизируется между вкладками через storage event.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean>(() =>
    Boolean(localStorage.getItem(STORAGE_KEYS.accessToken) || localStorage.getItem('token'))
  );

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.accessToken || e.key === 'token') {
        setIsAuthed(Boolean(e.newValue));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const res = await authService.login(credentials);
    setUser(res.user);
    // совместимость со старым ключом
    localStorage.setItem('token', res.accessToken);
    setIsAuthed(true);
    return res;
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    const res = await authService.register(data);
    setUser(res.user);
    localStorage.setItem('token', res.accessToken);
    setIsAuthed(true);
    return res;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    setIsAuthed(false);
    localStorage.removeItem('token');
  }, []);

  return useMemo(
    () => ({ user, isAuthed, login, register, logout, setUser }),
    [user, isAuthed, login, register, logout]
  );
}


