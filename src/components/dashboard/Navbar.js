import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Optional: Clear any auth tokens here if you implement auth
    navigate("/login");
  };

  return (
    <nav className="dashboard-navbar">
      <span>Smarten Citizens, Welcome Back!</span>
      <button className="signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
