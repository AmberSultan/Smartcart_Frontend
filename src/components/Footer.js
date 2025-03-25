import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footeractions">
          <div className="col-md-3 footer-section">
            <h4 className="footerheading">Connect With Us</h4>
            <div className="social-icons">
              <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </Link>
              <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
          </div>

          <div className="col-md-3 footer-section">
            <h4 className="footerheading">Customer Service</h4>
            <ul className="footerlink">
              <li className="footerlink"><Link to="/contact-us">Contact Us</Link></li>
              <li className="footerlink"><Link to="/returns">Returns & Exchanges</Link></li>
              <li className="footerlink"><Link to="/shipping">Shipping Information</Link></li>
              <li className="footerlink"><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div className="col-md-3 footer-section">
            <h4 className="footerheading">Quick Links</h4>
            <ul>
              <li className="footerlink"><Link to="/shop">Shop</Link></li>
              <li className="footerlink"><Link to="/offers">Special Offers</Link></li>
              <li className="footerlink"><Link to="/new-arrivals">New Arrivals</Link></li>
            </ul>
          </div>

          <div className="col-md-3 footer-section">
            <h4 className="footerheading">About Us</h4>
            <ul>
              <li className="footerlink"><Link to="/about">Our Story</Link></li>
              <li className="footerlink"><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li className="footerlink"><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center mt-4">
        <p className="footer-bottom">&copy; 2025 SMARTCART. All rights reserved.</p>
      </div>
      </div>
      
      
    </footer>
  );
};

export default Footer;
