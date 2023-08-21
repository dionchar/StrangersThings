/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
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
        <li className="navbar-item">
          <Link to="/login">Login</Link> {/* Add this line */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;