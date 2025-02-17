import React, { useState } from 'react';
import './Login.css';
import './Signup.css';
import { Link } from 'react-router-dom';

function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

        <div className="col-md-6 rightlogin rightsignup">
          <p className="loginheading">
            Join <span className="greensmart">SMART</span>
            <span className="yellowcart">CART</span>
          </p>

          <p className="logintext">
            Effortless meal planning and grocery shopping by directly adding recipe ingredients into cart
          </p>

          <form>
            <div className="row signupform">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="formtitle" htmlFor="fullname">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className="formtitle" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="+92"
                  />
                </div>
              </div>
            </div>

            <div className="row signupform">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="formtitle" htmlFor="exampleInputEmail1">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group password-wrapper">
                  <label className="formtitle" htmlFor="exampleInputPassword1">
                    Password
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Enter your password"
                    />
                    <span
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group form-check d-flex justify-content-between align-items-center">
              <div>
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label remember" htmlFor="exampleCheck1">
                  Remember me
                </label>
              </div>
            </div>
          </form>
<Link to='/login' className='text-decoration-none'>
          <button className="loginBtn text-decoration-none">Create Account</button>
          </Link>
          <p className="signup-text">
            Already have an account?{" "}
            <Link to="/login" className='text-decoration-none'>
              <span className="signuplink">Login here</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
