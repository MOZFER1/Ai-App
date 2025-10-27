import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../AI.css";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // تقدر هنا تمسح التوكن أو حالة الدخول من الـ context
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <span className="logo-icon">⚡</span>
        <span className="logo-text">AICreate Studio</span>
      </div>

      <nav className="nav">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/gallery" className="nav-link">
          Gallery
        </NavLink>
        <NavLink to="/feedback" className="nav-link">
          Feedback
        </NavLink>
        <NavLink to="/subscription" className="nav-link">
          Subscription
        </NavLink>
        <NavLink to="/profile" className="nav-link">
          Profile
        </NavLink>
      </nav>

      <div className="user-menu">
        <button className="nav-link" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
