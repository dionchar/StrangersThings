/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import './index.css'
import NavBar from './Components/NavBar'
import Home from './Components/Home'
import AllPosts from './Components/AllPosts'

export default function App() {
  const COHORT_NAME = '2302-ACC-PT-WEB-PT-A';
  const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<AllPosts BASE_URL={BASE_URL} />} />
      </Routes>
    </div>
  );
}





