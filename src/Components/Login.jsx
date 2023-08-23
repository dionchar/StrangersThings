/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithHeaders } from "../Helpers/api";

function Login({ BASE_URL, handleLoginSuccess }) {
  // State to store username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // State to handle error messages
  const [errorMessage, setErrorMessage] = useState("");
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a login request with provided credentials
      const data = await fetchWithHeaders(`${BASE_URL}/users/login`, "POST", {
        user: {
          username,
          password,
        },
      });

      if (data.success) {
        // Call the handleLoginSuccess function to set the token
        handleLoginSuccess(data.data.token);
        // Store the token in localStorage
        localStorage.setItem("authToken", data.data.token);

        // Navigate to the posts page
        navigate("/posts");
      } else {
        // Display error message for incorrect credentials
        setErrorMessage("Incorrect username or password");
      }
    } catch (error) {
      // Display error message for any other login errors
      setErrorMessage("An error occurred during login");
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



