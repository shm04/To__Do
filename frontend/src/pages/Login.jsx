import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (await login(username, password)) {
      navigate('/dashboard');
    } else {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl">Iniciar Sesión</h2>
      <input 
        type="text" 
        placeholder="Usuario" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        className="border p-2 mt-2 w-full"
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className="border p-2 mt-2 w-full"
      />
      <button onClick={handleLogin} className="mt-2 p-2 bg-blue-500 text-white">
        Ingresar
      </button>
    </div>
  );
}

export default Login;
