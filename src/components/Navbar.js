import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
       <nav className="navbar bg-light navpad navbar-expand-lg shadow-sm">
        <div className="container-fluid navcolor">
          <Link className="navbar-brand" to="/">
            <img className="logo" src="/images/fulllogo.png" alt="logo here" />
          </Link>
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
            <ul className="navbar-nav me-auto"></ul>
            <div className="ms-auto navbtns d-flex align-items-center">
              
              <Link to="/login">
                <button className="btn signupbtn btn-outline-success me-2" type="button">
                  SMARTCART SHOP
                </button>
              </Link>

              {/* Icons Section */}
              <div className="icons navicons d-flex align-items-center">
                <Link to="/favorites" className="icon-link navicons me-3">
                  <i className="far text-success fa-heart"></i>
                </Link>
                <Link to="/cart" className="icon-link navicons me-3">
                  <i className="fa-solid text-success fa-basket-shopping"></i>
                </Link>
                <Link to="/profile" className="icon-link navicons me-5">
                  <i className="far text-success fa-user"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
