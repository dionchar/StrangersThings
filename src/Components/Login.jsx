/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithHeaders } from '../Helpers/api';

function Login({ BASE_URL, handleLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async event => {
    event.preventDefault();

    try {
      const data = await fetchWithHeaders(`${BASE_URL}/users/login`, 'POST', {
        user: {
          username,
          password,
        },
      });

      if (data.success) {
        handleLoginSuccess(data.data.token);
        navigate('/posts');
      } else {
        setErrorMessage('Incorrect username or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred during login');
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
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;