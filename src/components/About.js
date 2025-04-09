// src/components/About.js
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Import the separate CSS file

function About() {
  return (
    <>
      <div className="imgstory">
        <img className="imageofstory" src="/images/ourstory.png" alt="story" />
      </div>
      <div className="smartcart-page">
        {/* Header Section */}
        <header className="smartcart-header">
          <h1 className="smartcart-title">Our Story</h1>
          <p className="smartcart-tagline">From Kitchen Dreams to Easy Shopping</p>
        </header>

        {/* Main Content Section */}
        <section className="smartcart-content">
          <p className="smartcart-opening">
            <strong>SMARTCART started with a simple idea:</strong> grocery shopping should be as fun as cooking.
          </p>
          <p className="smartcart-body">
            Tired of missing ingredients or endless store trips? So were we. That’s why we created a platform where you pick a dish—breakfast, dinner, dessert, whatever—and <em>boom</em>, your cart fills with everything you need. Customize it your way, and you’re set.
          </p>
          <p className="smartcart-body">
            Need help with recipes? We’ve got you covered with <strong className="smartcart-highlight">ChefBot</strong>, our chatbot for your assistance. Ask ChefBot how to cook any dish, and it’ll guide you step-by-step with ingredients and instructions. <Link to="/planmeal" className="smartcart-chatbot-link">Try it now!</Link>
          </p>
          <p className="smartcart-body">
            We’re foodies and tech lovers on a mission to make your kitchen life easier and tastier. <strong className="smartcart-highlight">Less hassle, more flavor</strong>—that’s SMARTCART.
          </p>
        </section>

        {/* Call-to-Action Footer */}
        <footer className="smartcart-cta mb-5">
          <Link to="/home">
            <button className="smartcart-button">Start Cooking Now</button>
          </Link>
        </footer>
      </div>
    </>
  );
}

export default About;