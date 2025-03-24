import React, { useEffect, useState } from 'react';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import './Delivery.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Delivery() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
      AOS.init({
        duration: 1500,
        easing: 'ease-in-out',
      });
    }, []);

  // Fetch userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      toast.error("User ID not found. Please log in.");
      setLoading(false);
      navigate('/login');
    }
  }, [navigate]);

  // Fetch the most recent order for the user
  useEffect(() => {
    if (!userId || !BASE_URL) return;

    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/checkoutorder/checkout/${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Order API Response:", data);

        if (!data.checkouts || !data.checkouts.length) {
          throw new Error("No orders found for this user");
        }

        setOrderDetails(data.checkouts[0]);
      } catch (error) {
        console.error("Error fetching order details:", error.message);
        toast.error("Failed to load order details. Please try again.");
        setOrderDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [userId, BASE_URL, navigate]);

  return (
    <>
      <div className="delivery-header">
        <Link to="/home">
          <button className="delivery-back-btn mt-3">Back to Home</button>
        </Link>
        <div className="delivery-content-wrapper">
          <Toaster />
          <h4 className="delivery-title">Your Order has been placed successfully!</h4>
          <div data-aos="fade-up-left" className="delivery-img-container mb-0">
            <img className="delivery-cart-img" src="./images/cartimg.png" alt="" />
          </div>

          {/* Display Order Details */}
          {loading ? (
            <div className="delivery-info-section">
              <p className="delivery-info-text">Loading order details...</p>
            </div>
          ) : orderDetails ? (
            <div className="delivery-info-section">
              <p className="delivery-info-text">
                <span className="delivery-info-label">Delivery Time:</span>{' '}
                {orderDetails.deliveryOption?.estimatedTime || 'N/A'}
              </p>
              <p className="delivery-info-text">
                <span className="delivery-info-label">Order Status:</span>{' '}
                <span
                  style={{
                    color:
                      orderDetails.orderStatus === 'Pending'
                        ? 'red'
                        : orderDetails.orderStatus === 'Completed'
                        ? 'green'
                        : 'inherit',
                  }}
                >
                  {orderDetails.orderStatus || 'N/A'}
                </span>
              </p>
              <p className="delivery-info-text">
                <span className="delivery-info-label">Order ID:</span>{' '}
                {orderDetails._id ? `ORD-${orderDetails._id.slice(-4)}` : 'N/A'}
              </p>
              <p className="delivery-info-text">
                <span className="delivery-info-label">Store Location:</span>{' '}
                {orderDetails.storeLocation || 'N/A'}
              </p>
              <p className="delivery-info-text">
                <span className="delivery-info-label">Delivery Address:</span>{' '}
                {orderDetails.deliveryAddress?.addressDetails || 'N/A'}
              </p>
            </div>
          ) : (
            <div className="delivery-info-section">
              <p className="delivery-info-text delivery-error-text">No order details available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Delivery;