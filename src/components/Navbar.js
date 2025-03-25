import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Navbar.css';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [user, setUser] = useState({ fullName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for the API
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzY5YjkyMGI2Nzc2M2I0Nzk3NzcyMSJ9';

        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (!userId) {
          throw new Error('User ID not found in token');
        }

        const response = await fetch(`${BASE_URL}/users/get-users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        const userData = data.find((u) => u._id === userId);

        if (userData) {
          setUser({
            fullName: userData.fullName,
            email: userData.email,
          });
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to fetch user details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <div>
      <nav className="navbar bg-light navpad navbar-expand-lg shadow-sm">
        <div className="container-fluid navcolor">
          <Link className="navbar-brand" to="/">
            <img className="logo" src="/images/fulllogo.png" alt="logo here" />
          </Link>

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
                <div className="icon-link navicons me-5 position-relative">
                  <i
                    className="far text-success fa-user"
                    onClick={toggleDropdown}
                    style={{ cursor: 'pointer' }}
                  ></i>

                  {/* Dropdown Menu for User Profile */}
                  {isDropdownOpen && (
                    <div className="dropdown-menu show">
                      <div className="dropdown-item-text p-3">
                        {loading ? (
                          <p style={{ fontSize: '14px', color: '#000' }}>Loading...</p>
                        ) : error ? (
                          <p style={{ fontSize: '14px', color: '#000' }}>{error}</p>
                        ) : (
                          <>
                            <p className="mb-0" style={{ fontSize: '16px', color: '#000' }}>
                              <strong>{user.fullName}</strong>
                            </p>
                            <hr />
                            <p className="mb-3" style={{ fontSize: '14px', color: '#000' }}>
                              {user.email}
                            </p>
                            <button
                              className="btn btn-danger w-100"
                              onClick={() => {
                                console.log('Logout clicked');
                                setIsDropdownOpen(false);
                              }}
                            >
                              Logout
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
          {/* <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5> */}
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
              <button className="btn signupbtn btn-outline-success w-100" type="button">
                SMARTCART SHOP
              </button>
            </Link>
            <Link to="/favorites" className="mb-3 text-dark text-decoration-none" onClick={toggleOffcanvas}>
              <i className="far text-success fa-heart me-2"></i> Favorites
            </Link>
            <Link to="/cart" className="mb-3 text-dark text-decoration-none" onClick={toggleOffcanvas}>
              <i className="fa-solid text-success fa-basket-shopping me-2"></i> Cart
            </Link>
            <Link to="/profile" className="mb-3 text-dark text-decoration-none" onClick={toggleOffcanvas}>
              <i className="far text-success fa-user me-2"></i> Profile
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

      {/* Backdrop for Dropdown */}
      {isDropdownOpen && (
        <div
          className="dropdown-backdrop"
          onClick={toggleDropdown}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 999,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        ></div>
      )}
    </div>
  );
}

export default Navbar;