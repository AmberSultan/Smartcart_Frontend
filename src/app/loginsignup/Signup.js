import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";
import "./Signup.css";

function Signup() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Creating your account...");
  
    try {
      console.log("Sending data:", formData); // Debug request data
  
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important if using cookies for authentication
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("Response:", data); // Debug response
  
      toast.dismiss(toastId);
  
      if (response.ok) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.dismiss(toastId);
      toast.error("Error connecting to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container loginpage">
      <Toaster position="top-right" reverseOrder={false} />
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
          <p className="loginheading mt-5">
            Join <span className="greensmart">SMART</span>
            <span className="yellowcart">CART</span>
          </p>

          <p className="logintext">
            Effortless meal planning and grocery shopping by directly adding recipe ingredients into cart.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row signupform">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="formtitle" htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="formtitle" htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+92"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row signupform">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="formtitle" htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group password-wrapper">
                  <label className="formtitle" htmlFor="password">Password</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <span className="toggle-password" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group form-check d-flex justify-content-between align-items-center">
              <div>
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label remember" htmlFor="exampleCheck1">Remember me</label>
              </div>
            </div>

            <button type="submit" className="loginBtn text-decoration-none" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <Link to="/login" className="text-decoration-none"><span className="signuplink">Login here</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
