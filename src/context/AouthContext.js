"use client"
// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired
          logout();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        logout();
      }
    }
  }, []);

  // Login function
  // const login = (token) => {
  //   localStorage.setItem('token', token);
  //   const decoded = jwt.decode(token);
  //   setUser(decoded);
  //   router.push('/pages/dashboard');
  // };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/pages/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);