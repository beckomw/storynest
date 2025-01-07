import React, {useState, useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useStorynest } from '../context/StorynestContext';
import { Link } from "react-router-dom";

const Navbar = () => {

  const { name, isAuthenticated, loginWithRedirect, logout } = useStorynest();
  const {user} = useAuth0();
  useEffect(() => {
    console.log({isAuthenticated});
  }, [])

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem('jwt');
  }


  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          StoryNest
        </Link>
        <h3>{name ? `Hello, ${name}!` : "Welcome, Guest!"}</h3>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        {
          user && 
          <li>
            <Link to="/stories">Stories</Link>
          </li>
        }
        <li>
          <Link to="/documentation">Documentation</Link>
        </li>

        
      </ul>

      <div className="navbar-right">
        {isAuthenticated ? (
          <button onClick={handleLogout}> Log Out</button>
        ) : (
          <button onClick={() => loginWithRedirect()}> Log In </button>
        )}
      </div>
    </div>
  );

}

export default Navbar