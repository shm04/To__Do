import React from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setUser({ username: response.data.username });
      return true;
    } catch (error) {
      console.error('Error en el login:', error.response?.data?.message || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post('/users/register', { username, password });
      console.log('Registro exitoso:', response.data);
      return true;
    } catch (error) {
      console.error('Error en el registro:', error.response?.data?.message || error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
