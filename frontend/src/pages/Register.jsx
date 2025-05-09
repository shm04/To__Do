import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async () => {
    const success = await register(username, password);
    if (success) {
      setMessage('Registro exitoso');
      setIsSuccess(true);
    } else {
      setMessage('Error al registrar');
      setIsSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registrarse</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button onClick={handleRegister}>Registrar</button>
        {message && (
          <p className={`message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
