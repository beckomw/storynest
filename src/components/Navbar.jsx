import React from 'react'
import { useStorynest } from '../context/StorynestContext';
import { Link } from "react-router-dom";

const Navbar = () => {
  const { name } = useStorynest();

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          StoryNest
        </Link>
        <h3>Hello, {name}!</h3>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/stories">Stories</Link>
        </li>
        <li>
          <Link to="/documentation">Documentation</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <span style={{
          backgroundColor: '#28a745',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px'
        }}>
          Demo Mode
        </span>
      </div>
    </div>
  );
}

export default Navbar
