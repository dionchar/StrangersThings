/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

function Form({ BASE_URL }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegistrationSuccess = token => {
    setSuccessMessage('Registration successful! You are now logged in.');
    // Optionally, save the token to sessionStorage for automatic login
    sessionStorage.setItem('authToken', token);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username,
            password,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        handleRegistrationSuccess(data.data.token);
      } else {
        setErrorMessage('Registration failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred during registration');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            minLength={4} // Set minimum length
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8} // Set minimum length
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            minLength={8} // Set minimum length
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Form;