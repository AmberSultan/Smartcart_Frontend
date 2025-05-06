import React, { useState, useEffect } from 'react';
import { House, Banknote } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

import './Checkout.css';

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [name, setName] = useState('Enter Your Name');
  const [email, setEmail] = useState('email@example.com');
  const [phone, setPhone] = useState('03000000000');
  const [addressType, setAddressType] = useState('Home');
  const [addressDetails, setAddressDetails] = useState('Bahria Town');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [riderNote, setRiderNote] = useState('');

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  // Fetch userId from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      toast.error("User ID not found. Please log in.");
      setLoading(false);
    }
  }, []);

  // Fetch cart items when userId is available
  useEffect(() => {
    if (!userId || !BASE_URL) return;

    const fetchCartItems = async () => {
      setLoading(true);
      try {
        console.log("Fetching cart from:", `${BASE_URL}/cart/yourcart/${userId}`);
        const response = await fetch(`${BASE_URL}/cart/yourcart/${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Cart API Response:", data);
        if (!data.cart || !Array.isArray(data.cart)) {
          throw new Error("Invalid cart data format");
        }
        setCartItems(data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
        if (error.message === "Failed to fetch") {
          toast.error("Unable to connect to the server. Please check your network or server status.");
        } else {
          toast.error(`Failed to load cart items: ${error.message}`);
        }
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, BASE_URL]);

  // Calculate totals dynamically
  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalCost || 0), 0);
  const serviceFee = 10;
  const packagingFee = 25;
  const totalPrice = subtotal + serviceFee + packagingFee;

  // Handle Place Order
  const handlePlaceOrder = async () => {
    if (!userId) {
      toast.error("User ID not found. Please log in.");
      return;
    }

    if (
      !name ||
      name === 'Enter Your Name' ||
      !email ||
      email === 'email@example.com' ||
      !phone ||
      phone.length !== 11 // Ensure exactly 11 digits
    ) {
      toast.error("Please fill in all personal information with valid details, including an 11-digit phone number.");
      return;
    }

    if (!addressDetails || addressDetails.trim() === '') {
      toast.error("Please provide a valid delivery address.");
      return;
    }

    if (!cartItems.length) {
      toast.error("Your cart is empty. Add items to proceed.");
      return;
    }

    const checkoutData = {
      userId,
      deliveryAddress: {
        addressType,
        addressDetails,
        riderNote: riderNote || '',
      },
      deliveryOption: {
        deliveryType: "Standard Delivery",
        estimatedTime: "10-20 mins",
      },
      personalInfo: {
        name,
        email,
        phone,
      },
      paymentOption: {
        paymentMethod,
      },
      orderDetails: {
        items: cartItems.map(item => ({
          dishName: item.dishName || "Unknown Dish",
          price: item.totalCost || 0,
        })),
        subtotal,
        serviceFee,
        packagingFee,
        totalPrice,
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/checkoutorder/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Checkout Response:", data);
      toast.success("Order placed successfully!");
      navigate('/delivery');
    } catch (error) {
      console.error("Error placing order:", error.message);
      toast.error("Failed to place order. Please try again.");
    }
  };

  const handleEditPersonal = () => setIsEditingPersonal(!isEditingPersonal);
  const handleEditAddress = () => setIsEditingAddress(!isEditingAddress);

  return (
    <div className="container mt-4">
      <Toaster />
      <h5 className="text-start fw-bold">Checkout</h5>
      <div className="row">
        {/* Left Section */}
        <div className="col-md-8">
          {/* Delivery Address */}
          <div className="border bg-light rounded p-3 mb-3 text-start">
            <h5 className="fw-semibold mb-3">
              Delivery Address
              <span
                className="float-end fs-6 text-dark"
                onClick={handleEditAddress}
                style={{ cursor: 'pointer' }}
              >
                {isEditingAddress ? 'Save' : 'Change'}
              </span>
            </h5>
            {isEditingAddress ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  placeholder="Address Type (e.g., Home, Office)"
                />
                <input
                  type="text"
                  className="form-control"
                  value={addressDetails}
                  onChange={(e) => setAddressDetails(e.target.value)}
                  placeholder="Enter your address"
                />
              </>
            ) : (
              <p className="mb-3">
                <House size={20} /> {addressType}, {addressDetails}
              </p>
            )}
            <input
              type="text"
              className="form-control border rounded p-2 text-muted"
              placeholder="Note to rider: e.g. landmark, directions"
              value={riderNote}
              onChange={(e) => setRiderNote(e.target.value)}
            />
          </div>

          {/* Delivery Options */}
          <div className="border bg-light rounded p-3 mb-3">
            <h5 className="text-start fw-semibold mb-3">Delivery Options</h5>
            <div className="border rounded p-2 text-start">
              <div className="form-check">
                <input className="form-check-input" type="radio" name="delivery" checked readOnly />
                <div className="d-flex justify-content-between">
                  <label className="form-check-label">Standard Delivery</label>
                  <label className="form-check-label">10-20 mins</label>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="border bg-light rounded p-3 mb-3 text-start">
            <h5 className="fw-semibold mb-3">
              Personal Information
              <span
                className="float-end fs-6 text-dark"
                onClick={handleEditPersonal}
                style={{ cursor: 'pointer' }}
              >
                {isEditingPersonal ? 'Save' : 'Edit'}
              </span>
            </h5>
            {isEditingPersonal ? (
              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  maxLength={11}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 11) {
                      setPhone(value);
                    }
                  }}
                  placeholder="03000000000"
                />
              </>
            ) : (
              <>
                <small className="mb-1">{name}</small>
                <br />
                <small>{email}</small>
                <br />
                <small>{phone}</small>
              </>
            )}
          </div>

          {/* Payment Options */}
          <div className="border bg-light rounded p-3 mb-3">
            <h5 className="fw-semibold mb-3 text-start">Payment Options</h5>
            <div className="border text-start rounded p-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                />
                <label className="form-check-label fw-semibold">
                  <Banknote /> Cash on Delivery
                </label>
                <p className="mt-2 fs-6 text-muted">
                  Simply pay the rider when he is on your doorstep
                </p>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            className="btn btn-success w-100 py-2 mb-5"
            onClick={handlePlaceOrder}
            disabled={loading || !cartItems.length}
          >
            {loading ? 'Loading...' : 'PLACE ORDER'}
          </button>
        </div>

        {/* Right Section (Order Summary) */}
        <div className="col-md-4">
          <div className="ticket-container">
            <h6 className="ticket-header">Your Order - Bahria Town LHR</h6>
            <ul className="ticket-items">
              {loading ? (
                <li className="ticket-item">Loading cart items...</li>
              ) : cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <li key={index} className="ticket-item">
                    <span>{item.dishName || "Unknown Dish"}</span>
                    <span>Rs. {item.totalCost || 0}</span>
                  </li>
                ))
              ) : (
                <li className="ticket-item">No items in cart</li>
              )}
            </ul>
            <hr className="ticket-divider" />
            <h5 className="ticket-summary-title">Order Summary</h5>
            <div className="ticket-summary">
              <p className="ticket-summary-item">
                <span>Subtotal:</span>
                <span>Rs. {subtotal}</span>
              </p>
              <p className="ticket-summary-item">
                <span>Service Fee:</span>
                <span>Rs. {serviceFee}</span>
              </p>
              <p className="ticket-summary-item">
                <span>Packaging Fee:</span>
                <span>Rs. {packagingFee}</span>
              </p>
              <hr className="ticket-divider" />
              <h6 className="ticket-total">
                <span>
                  Total Price
                  <br />
                  <small>(incl. fees and tax)</small>
                </span>
                <span className="ticket-total-price">Rs. {totalPrice}</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;