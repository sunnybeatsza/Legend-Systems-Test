import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { LoginContext } from "../../App";

export const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout-related actions here if needed
    // For now, just set isLoggedIn to false
    setIsLoggedIn(false);

    // Redirect the user to the homepage
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/Dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};
