'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  role: 'creator' | 'admin';
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  isLoading: false,
  login: () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('rayu_creator_session');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('rayu_creator_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim() || 'thisisrayu@gmail.com';
    const creatorUser: User = {
      email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@gmail.com`,
      name: 'Rayu',
      role: 'creator',
    };
    setUser(creatorUser);
    localStorage.setItem('rayu_creator_session', JSON.stringify(creatorUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rayu_creator_session');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
