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
      setError("Incorrect username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="message">
        <h3>Try with this user</h3>
        <p>Username: user</p>
        <p>Password: userpassword</p>
      </div>
      <div className="login-card">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
        {error && <p className="error-message">{error}</p>}
        <a href="/register" className="register-link">
          Sign Up
        </a>
      </div>
    </div>
  );
}

export default Login;
