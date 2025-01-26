// MainNavigation.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { AiFillHome, AiFillPicture } from 'react-icons/ai';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa'
import { FaUser } from "react-icons/fa";

const MainNavigation = () => {


  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const LogoutHandler = () => {
    // Clear cache
    if (window.location.protocol === 'http:') {
      window.location.href = window.location.href.replace('http:', 'http:');
    } else {
      window.location.reload(true);
    }

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Display logout success toast
    toast.success('Logout successful!');

    // Perform logout
    signOut();

    // Navigate to the home page
    navigate("/");
  };

  return (
    <>
      <nav className={`${classes.blurredNavbar} ${classes.navFonts} navbar navbar-expand-lg p-1`}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <NavLink to="/" className={` ${classes.logo}`}>
              <img src="assetImages/icon.jpg" alt="logo img" />Video Galleria
            </NavLink>

            <button
              className={`navbar-toggler ${isOpen ? "active" : ""}`}
              type="button"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className="nav-link" 
                  end
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: isActive ? '0 3px 0px rgba(31, 38, 135)' : 'none'
                  })}
                >
                  <AiFillHome
                    style={({ isActive }) => ({
                      fontSize: '2rem',
                      marginRight: '4px',
                    })}
                  /> Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/gallery"
                  className="nav-link" 
                  end
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: isActive ? '0 3px 0px rgba(31, 38, 135)' : 'none'
                  })}
                >
                  <AiFillPicture
                    style={({ isActive }) => ({
                      fontSize: '2rem',
                      marginRight: '4px'
                    })}
                  /> Uploading Platform
                </NavLink>
              </li>
              {isAuthenticated() ? 
              <li className="nav-item">
                <NavLink 
                  to="/profile" 
                  className="nav-link" 
                  end
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '10px',
                    boxShadow: isActive ? '0 3px 0px rgba(31, 38, 135)' : 'none'
                  })}
                >
                  <FaUser
                    style={({ isActive }) => ({
                      fontSize: '2rem',
                      marginRight: '4px'
                    })}
                  /> My Account
                </NavLink>
              </li>:null}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!isAuthenticated() ? (
                <>
                  <li className="nav-item mx-3">
                    <NavLink to="login" className={classes.btn} end>
                      <FaSignInAlt /> Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="register" className={classes.btn} end>
                      <FaUserPlus /> Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink className={classes.btn} onClick={LogoutHandler}>
                  <FaSignOutAlt /> Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;