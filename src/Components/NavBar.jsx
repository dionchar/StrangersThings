/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">All Posts</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;