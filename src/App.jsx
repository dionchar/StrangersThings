/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';
import NavBar from './Components/NavBar'; 
import Home from './Components/Home';
import AllPosts from './Components/AllPosts';
import RegistrationForm from './Components/RegistrationForm';
import Login from './Components/Login';
import { logIn, logOut, isLoggedIn } from './Helpers/authHelpers';
import CreatePostForm from './Components/CreatePostForm';
import { fetchWithHeaders } from './Helpers/api';

export default function App() {
  const COHORT_NAME = '2302-ACC-PT-WEB-PT-A';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
  // State to store the authentication token
  const [token, setToken] = useState('');
  // Function to handle successful login and set token
  const handleLoginSuccess = newToken => {
    setToken(newToken);
  };
  // Function to handle logout and clear token
  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('authToken'); 
  };

  return (
    <Router>
      <div className="app">
      <NavBar isLoggedIn={Boolean(token)} logout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<AllPosts BASE_URL={BASE_URL} token={token} />} />
          <Route path="/register" element={<RegistrationForm BASE_URL={BASE_URL} />} />
          <Route path="/login" element={<Login BASE_URL={BASE_URL} handleLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
}





