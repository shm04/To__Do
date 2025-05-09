import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (await login(username, password)) {
      navigate("/dashboard");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-container">
      <div className="message">
        <h3>Check out with this user</h3>
        <p>Username: user</p>
        <p>Password: userpassword</p>
      </div>
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
        {error && <p className="error-message">{error}</p>}
        <a href="/register" className="register-link">
          Regístrate
        </a>
      </div>
    </div>
  );
}

export default Login;
