import React from "react";
import "./Page.css";

import "../Footer"

import { Link } from "react-router-dom";
import Testimonials from '../Testimonials';
import Footer from "../Footer";

function Page() {
  return (
    <div>
      <nav className="navbar bg-light navpad navbar-expand-lg shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img className="logo" src="/images/fulllogo.png" alt="logo here" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav me-auto">
  </ul>
  <div className=" ms-auto navbtns">
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

      {/* Happy Customer Section */}
      <h2 className="customerHeading">What happy customers say about us</h2>
      <Testimonials/>

      {/* <Footer/> */}
      
    </div>
  );
}

export default Page;
