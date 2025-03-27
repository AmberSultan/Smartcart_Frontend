import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [user, setUser] = useState({ fullName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartIngredientsCount, setCartIngredientsCount] = useState();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzY5YjkyMGI2Nzc2M2I0Nzk3NzcyMSJ9.QE3g1sMus3NI3Xs8XiihLmtZ6iLFx4oM2rR0vXuUPLI';
        if (!token) throw new Error('No token found');

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (!userId) throw new Error('User ID not found in token');

        const response = await fetch(`${BASE_URL}/users/get-users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`User fetch failed: ${response.status}`);
        const data = await response.json();
        const userData = data.find((u) => u._id === userId);
        if (userData) {
          setUser({ fullName: userData.fullName, email: userData.email });
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

    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzY5YjkyMGI2Nzc2M2I0Nzk3NzcyMSJ9.QE3g1sMus3NI3Xs8XiihLmtZ6iLFx4oM2rR0vXuUPLI';
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const url = `${BASE_URL}/cart/yourcart/${userId}`;
        console.log('Fetching cart from:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('Cart response status:', response.status);
        if (response.status === 204) {
          console.warn('No content returned from cart endpoint');
          setCartIngredientsCount(0);
          return;
        }

        if (!response.ok) {
          throw new Error(`Cart fetch failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Cart response data:', data);

        const cartData = data.cart || [];
        const totalIngredients = Array.isArray(cartData)
          ? cartData.reduce((sum, item) => sum + (item.selectedIngredients?.length || 0), 0)
          : 0;
        console.log('Total ingredients:', totalIngredients);
        setCartIngredientsCount(totalIngredients);
      } catch (err) {
        console.error('Error fetching cart items:', err);
        setCartIngredientsCount(0);
      }
    };

    fetchUserDetails();
    fetchCartItems();
  }, []);

  // const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the click from bubbling up and closing the dropdown prematurely
    setIsDropdownOpen((prev) => !prev);
};
  const toggleOffcanvas = () => setIsOffcanvasOpen(!isOffcanvasOpen);

  const handleLogout = (event) => {
    event.stopPropagation();
    console.log('Logout clicked, navigating to /');
    navigate('/');
};

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
            onClick={toggleOffcanvas}
            aria-controls="offcanvasNavbar"
            aria-expanded={isOffcanvasOpen}
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
              <div className="icons navicons d-flex align-items-center">
                <Link to="/favorites" className="icon-link navicons me-3">
                  <i className="far text-success fa-heart"></i>
                </Link>
                <Link to="/your-cart" className="icon-link navicons me-3 position-relative">
  <i className="fa-solid text-success fa-basket-shopping"></i>
  <span
    className={`cart-badge ${cartIngredientsCount === 0 ? 'empty' : 'filled'}`}
  >
    {cartIngredientsCount}
  </span>
</Link>
                <div className="icon-link navicons me-5 position-relative">
                  <i className="far text-success fa-user" onClick={toggleDropdown} style={{ cursor: 'pointer' }}></i>
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
                            {/* <button className="btn logoutbtn btn-danger w-100" onClick={handleLogout}>
                              Logout
                            </button> */}
                          </>
                        )}
                      </div>

                    </div>
                  
                  )}
                </div>
                <button className="btn logoutbtn w-100" onClick={handleLogout}>
                      <i class="fa fa-sign-out" aria-hidden="true"></i>
                                  </button>
              </div>
            </div>
           
          </div>
        </div>
      </nav>

      <div
        className={`offcanvas offcanvas-start ${isOffcanvasOpen ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style={{ visibility: isOffcanvasOpen ? 'visible' : 'hidden', width: '250px' }}
      >
        <div className="offcanvas-header">
          <button type="button" className="btn-close" onClick={toggleOffcanvas} aria-label="Close"></button>
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
            <Link
              to="/your-cart"
              className="mb-3 text-dark text-decoration-none d-flex align-items-center"
              onClick={toggleOffcanvas}
            >
              <i className="fa-solid text-success fa-basket-shopping me-2"></i> Cart
              <span
                className="badge bg-danger rounded-circle ms-2"
                style={{
              
                  fontSize: '10px',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: cartIngredientsCount === 0 ? '#gray' : '#dc3545', // Gray for 0, red for >0
                }}
              >
                {cartIngredientsCount}
              </span>
            </Link>
            <div className="mb-3 text-start w-100">
              <div className="d-flex align-items-center text-dark text-decoration-none mb-2">
                <i className="far text-success fa-user me-2"></i> Profile
              </div>
              {loading ? (
                <p style={{ fontSize: '14px', color: '#000' }}>Loading...</p>
              ) : error ? (
                <p style={{ fontSize: '14px', color: '#000' }}>{error}</p>
              ) : (
                <>
                  <p className="mb-0" style={{ fontSize: '16px', color: '#000', textAlign: 'left' }}>
                    <strong>{user.fullName}</strong>
                  </p>
                  <hr className="mobilehr text-start" />
                  <p className="mb-3" style={{ fontSize: '14px', color: '#000', textAlign: 'left' }}>
                    {user.email}
                  </p>
                  <button className="btn btn-danger text-start" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
               
            </div>
          </div>
        </div>
        
      </div>
  
      {isOffcanvasOpen && (
        <div className="offcanvas-backdrop fade show" onClick={toggleOffcanvas} style={{ zIndex: 1040 }}></div>
      )}
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