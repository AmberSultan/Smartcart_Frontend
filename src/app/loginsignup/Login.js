import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="container loginpage">
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

          <form>
            <div className="form-group">
              <label className="formtitle" htmlFor="fullname">
                Full Name
              </label>
              <input type="email" className="form-control" id="fullname" />
            </div>
            <div className="form-group">
              <label className="formtitle" htmlFor="exampleInputEmail1">
                Email address
              </label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <small id="emailHelp" className="form-text text-muted emailformtext">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group position-relative">
              <label className="formtitle" htmlFor="exampleInputPassword1">
                Password
              </label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                className="form-control"
                id="exampleInputPassword1"
              />
              <span
                className="password-icon"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            
          </form>
          <Link to='/home' className='text-decoration-none'>

          <button className="loginBtn">LOG IN</button>
          </Link>
          <p className="signup-text">
            Don't have an account?{' '}
            <Link to="/signup" className='text-decoration-none'>
              <span className="signuplink">Create Free Account</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
