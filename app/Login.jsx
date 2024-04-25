import React, { useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { login } from './lib';
import Link from 'next/link';
import { useNavigate  } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', credentials);
      console.log('User logged in successfully:', response.data);
      if (response.data.success) {
        alert('Login Successful!');
        // sessionStorage.setItem('USERDATA', credentials.email);
        // sessionStorage.setItem('authenticated', 'true');
    navigate('/main');
      } else {
        alert('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="loginCard">
        <h2 className="heading">Login to Bloggo</h2>
        <form className="form">
          <label className="label">
            Email:
            <br />
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <label className="label">
            Password:
             <br />
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="input"
            />
          </label>
          <br />
          <button type="button" onClick={handleLogin} className="button">
            Login
          </button>
          Don't have an account? <Link to="/register">
            <button
          type="button"
          onClick={() => (navigate('/register'))}
          className="button"
        >
          Sign Up
        </button>
        </Link>
          
        </form>
        
        <p className="info">
          As an example, you can use:<br /> Email: matthew.a@example.com <br /> Password: yourpassword
        </p>
      </div>
    </div>
  );
};

export default Login;
