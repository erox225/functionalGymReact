// src/authContext/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);  // Nuevo estado para el token
  const navigate = useNavigate();

  const login = (role, tokenJWT) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setToken(tokenJWT);  // Guarda el token
    navigate('/dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setToken(null);  // Limpia el token al hacer logout
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
