import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User, LoginPayload, RegisterPayload } from '../types/auth.types';
import AuthService from '../services/auth.service';
import { tokenUtils } from '../utils/token';
import toast from 'react-hot-toast';

export interface AuthContextType {
  user: User | null;
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authenticated: boolean;
  isLoading: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(tokenUtils.getUser());
  const [token, setToken] = useState<string | null>(tokenUtils.getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = useCallback(() => {
    tokenUtils.clearAll();
    setUser(null);
    setToken(null);
    toast.success('Logged out successfully');
  }, []);

  const fetchUser = useCallback(async () => {
    const existingToken = tokenUtils.getToken();
    if (!existingToken) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await AuthService.getMe();
      if (res.user) {
        setUser(res.user);
        tokenUtils.setUser(res.user);
      }
    } catch {
      tokenUtils.clearAll();
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (payload: LoginPayload) => {
    try {
      const res = await AuthService.login(payload);
      if (res.token && res.user) {
        tokenUtils.setToken(res.token);
        tokenUtils.setUser(res.user);
        setToken(res.token);
        setUser(res.user);
        toast.success(`Welcome back, ${res.user.fullName || 'Student'}!`);
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Login failed';
      toast.error(msg);
      throw err;
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      const res = await AuthService.register(payload);
      toast.success(res.message || 'Registration successful! Please login.');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      const msg = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(msg);
      throw err;
    }
  };

  const isAuth = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        currentUser: user,
        token,
        isAuthenticated: isAuth,
        authenticated: isAuth,
        isLoading,
        loading: isLoading,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
