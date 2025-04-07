import {React, useState, useEffect} from "react";  // Added useEffect import
import "./Page.css";
import { Link, useNavigate } from "react-router-dom";
import Testimonials from '../Testimonials';
import Footer from "../Footer";

function Page() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);  // Changed initial state to false
  const navigate = useNavigate();

  // Add useEffect to show modal after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);  // 4000 milliseconds = 4 seconds

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);  // Empty dependency array means it runs once on mount

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div>
      <div>
        <nav className="navbar bg-light navpad navbar-expand-lg shadow-sm">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img className="logo" src="/images/fulllogo.png" alt="logo here" />
            </a>

            {/* Hamburger Button for Mobile */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleOffcanvas}
              aria-controls="offcanvasNavbar"
              aria-expanded={isOffcanvasOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Desktop Navbar Items */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto"></ul>
              <div className="ms-auto navbtns">
                <Link to="/login">
                  <button
                    className="btn loginbtn btn-outline-success me-2"
                    type="button"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="btn signupbtn btn-outline-success me-5"
                    type="button"
                  >
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Offcanvas for Mobile */}
        <div
          className={`offcanvas offcanvas-start ${isOffcanvasOpen ? 'show' : ''}`}
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ visibility: isOffcanvasOpen ? 'visible' : 'hidden', width: '250px' }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              onClick={toggleOffcanvas}
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="d-flex flex-column align-items-start">
              <Link to="/login" className="mb-3" onClick={toggleOffcanvas}>
                <button className="btn loginbtn btn-outline-success w-100" type="button">
                  Login
                </button>
              </Link>
              <Link to="/signup" className="mb-3" onClick={toggleOffcanvas}>
                <button className="btn signupbtn btn-outline-success w-100" type="button">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Backdrop for Offcanvas */}
        {isOffcanvasOpen && (
          <div
            className="offcanvas-backdrop fade show"
            onClick={toggleOffcanvas}
            style={{ zIndex: 1040 }}
          ></div>
        )}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="video-overlay"></div>
        <video className="hero-video" autoPlay muted loop>
          <source src="/images/bgvideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-content">
          <h3 className="welcome">
            WELCOME TO <span className="greensmart">SMART</span>
            <span className="yellowcart">CART</span>
          </h3>
          <p className="choose">
            Choose A <span className="yellowcart">Recipe</span>, And We'll{" "}
            <span className="yellowcart">Handle The Rest</span>
          </p>
          <div className="emojidiv d-flex">
            <div className="emojione">
              <img className="emojiiamge" src="/images/cartemoji1.png" alt="" />
              <br />
              <p className="tagname">
                Shopping <br /> made simple
              </p>
            </div>
            <div className="emojione">
              <img
                className="emojiiamge"
                src="/images/sissoremoji.png"
                alt=""
              />
              <br />
              <p className="tagname">
                Customize
                <br /> Your cart
              </p>
            </div>
            <div className="emojione">
              <img className="emojiiamge" src="/images/clockemoji.png" alt="" />
              <br />
              <p className="tagname">
                Save time
                <br /> and effort{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login/Signup Modal */}
      {showModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Unlock Your Shopping Experience</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Login or Sign Up to create personalized meal plans and shop for ingredients with ease!</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-outline-success" 
                  onClick={() => {
                    setShowModal(false);
                    navigate('/login');
                  }}
                >
                  Login
                </button>
                <button 
                  type="button" 
                  className="btn btn-success" 
                  onClick={() => {
                    setShowModal(false);
                    navigate('/signup');
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Happy Customer Section */}
      <h2 className="customerHeading">What happy customers say about us</h2>
      <Testimonials/>

    </div>
  );
}

export default Page;