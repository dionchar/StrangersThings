/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar'; 
import Home from './Components/Home';
import AllPosts from './Components/AllPosts';
import Form from './Components/RegistrationForm';

function App() {
  const COHORT_NAME = '2302-ACC-PT-WEB-PT-A';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<AllPosts BASE_URL={BASE_URL} />} />
          <Route path="/register" element={<Form BASE_URL={BASE_URL} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



