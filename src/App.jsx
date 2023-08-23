/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
  // Check if there is a token in localStorage
  const storedToken = localStorage.getItem('authToken');
  // State to store the authentication token
  const [token, setToken] = useState(storedToken || ''); // Set initial value to storedToken

  useEffect(() => {
    // Check if there's a token in sessionStorage
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      // Set the token in state
      setToken(authToken);
    }
  }, []);

  

  // Function to handle successful login and set token
  const handleLoginSuccess = (newToken) => {
    // Store the token in localStorage
    localStorage.setItem('authToken', newToken);

    // Set the token in state
    setToken(newToken);
  };

  // Function to handle logout and clear token
  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('authToken');

    // Clear the token from state
    setToken('');
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





