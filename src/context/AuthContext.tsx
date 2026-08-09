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
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => false,
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('rayu_creator_session');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('rayu_creator_session');
      }
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = pass.trim();

    if (
      (cleanEmail === 'thisisrayu@gmail.com' || cleanEmail === 'rayu' || cleanEmail === 'admin' || cleanEmail.includes('rayu')) &&
      cleanPass.length >= 1
    ) {
      const creatorUser: User = {
        email: 'thisisrayu@gmail.com',
        name: 'Rayu',
        role: 'creator',
      };
      setUser(creatorUser);
      localStorage.setItem('rayu_creator_session', JSON.stringify(creatorUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rayu_creator_session');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
