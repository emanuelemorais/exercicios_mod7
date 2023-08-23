'use client'
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState('');

  const login = (token) => {
    setAuthToken(token);
  };

  return (
    <AuthContext.Provider value={{ authToken, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
