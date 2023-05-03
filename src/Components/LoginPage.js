import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LoginPage.css';
import axios from 'axios';
import { Button } from 'semantic-ui-react'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await 
      fetch('http://localhost:8083/users/upload', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const login = await response.json();
      if (login.success) {
        localStorage.setItem('token', login.token);
        <Navigate to="/ReadExcel" />;
      } else {
        setErrorMsg(login.message);
      }
    } catch (err) {
      setErrorMsg('Unable to login. Please try again.');
    }
  };


  return (
    <div className="body">
      <div className="login-form">
        <h1>Login Page</h1>
        
        <form onSubmit={handleLogin}>
          <div className="user-name">
            <label>User Name</label>
            <br />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
          </div>

          <div className="password">
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
          </div>
          <Button primary type='submit'>Login</Button>
          {errorMsg && <div className="error">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;