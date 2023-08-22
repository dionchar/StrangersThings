/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar({ isLoggedIn, logout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/posts">All Posts</Link>
        </li>
        <li className="navbar-item">
          <Link to="/register">Register</Link>
        </li>
        {!isLoggedIn ? ( // Render login link if not logged in
          <li className="navbar-item">
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li className="navbar-item">
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;