import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">To Do</h1>
      <button onClick={logout} className="logout-button">Log out</button>
    </nav>
  );
};

export default Navbar;
