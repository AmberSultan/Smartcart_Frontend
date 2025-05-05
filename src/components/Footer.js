import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footeractions">
        <div className="col-md-4 footer-section">
        <h4 className="footerheading"><span className="greencolor">SMARTCART </span></h4>

        <p className="ptag"> Your recipe to hassle-free shopping and smarter cooking!</p>
        </div>

          <div className="col-md-4 footer-section">
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

          <div className="col-md-4 footer-section">
            <h4 className="footerheading">Explore More</h4>
            <ul>
              <li className="footerlink"><Link to="/about">Our Story</Link></li>
              <li className="footerlink"><Link to="/blog">Blogs</Link></li>
              <li className="footerlink"><Link to="/planmeal">Plan Meal</Link></li>
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
