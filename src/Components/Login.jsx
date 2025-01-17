/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithHeaders } from "../Helpers/api";

function Login({ BASE_URL, handleLoginSuccess }) {
  const [username, setUsername] = useState("");  // State to store username 
  const [password, setPassword] = useState(""); // State to store password inputs
  const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle login form submission
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await fetchWithHeaders(`${BASE_URL}/users/login`, "POST", { // Make a login request with provided credentials
        user: {
          username,
          password,
        },
      });

      if (data.success) {
        handleLoginSuccess(data.data.token); // Call the handleLoginSuccess function to set the token
        localStorage.setItem("authToken", data.data.token); // Store the token in localStorage
        navigate("/posts"); // Navigate to the posts page
      } else {
        setErrorMessage("Incorrect username or password"); // Display error message for incorrect credentials
      }
    } catch (error) {
      setErrorMessage("An error occurred during login"); // Display error message for any other login errors
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="loginUsername">Username</label>
          <input
            type="text"
            id="loginUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;



