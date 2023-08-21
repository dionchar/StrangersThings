/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationForm({ BASE_URL }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // New state for registration success
  const navigate = useNavigate();

  const handleRegistrationSuccess = token => {
    setRegistrationSuccess(true); // Set registration success state to true
    // Reset form input fields
    setUsername('');
    setPassword('');
    setConfirmPassword('');

    // Navigate to the login page
    navigate('/login');
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
      {!registrationSuccess ? ( // Render the registration form if not successful
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
      ) : (
        <div>
          <p className="success-message">Registration successful! You can now log in.</p>
          <button onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      )}
    </div>
  );
}

export default RegistrationForm;