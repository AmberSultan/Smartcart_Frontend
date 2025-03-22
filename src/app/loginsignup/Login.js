import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast, Toaster} from 'react-hot-toast';
import './Login.css';

function Login() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store token, id, and email in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        localStorage.setItem('email', data.email);
  
        toast.success('Login successful');
        navigate('/home');
      } else {
        if (response.status === 401) {
          toast.error('Invalid email or password');
        } else {
          toast.error(data.error || 'Login failed');
        }
      }
    } catch (error) {
      toast.error('Something went wrong, please try again');
    }
  };
  
  return (
    
    <div className="container loginpage">
      <Toaster/>
      <div className="row">
        <div className="col-md-6 loginbgimg">
          <img className="loginbg" src="/images/loginbg.png" alt="loginbg" />
          <div className="loginimgtext">
            <h2 className="loginimgheading">
              Welcome to our <br /> <span className="yellowcart">Smart Grocery</span> Store
            </h2>
            <img className="logincomment" src="/images/logincomment.png" alt="loginbg" />
          </div>
        </div>
        <div className="col-md-6 rightlogin">
          <p className="loginheading">
            Login to <span className="greensmart">SMART</span>
            <span className="yellowcart">CART</span>
          </p>
          <p className="logintext">
            Effortless meal planning and grocery shopping by directly adding recipe ingredients into the cart.
          </p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="formtitle" htmlFor="exampleInputEmail1">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="exampleInputEmail1" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <small className="form-text text-muted emailformtext">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group position-relative">
              <label className="formtitle" htmlFor="exampleInputPassword1">Password</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="password-icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            <button type="submit" className="loginBtn">LOG IN</button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/signup" className='text-decoration-none'><span className="signuplink">Create Free Account</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
