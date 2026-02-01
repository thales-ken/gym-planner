'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types';
import { readSession, getCurrentUser, clearSession } from '@/lib/mockData';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has an active session on mount
    const loadUser = () => {
      const session = readSession();
      if (session) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
      setIsLoading(false);
    };

    loadUser();

    // Listen for storage changes (e.g., from login on another tab/window)
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
