import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { toast, Toaster } from 'react-hot-toast';

function YourCart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    console.log("Stored User ID from localStorage:", storedUserId);
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError("User ID not found in localStorage.");
    }
  }, []);

  useEffect(() => {
    if (!userId || !BASE_URL) return;

    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/cart/yourcart/${userId}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("API Response Data:", data);
        setCartItems(data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId, BASE_URL]);

  // Function to remove an item from the cart
  const handleRemoveItem = async (cartId) => {
    if (!userId || !cartId) {
      toast.error("Missing user ID or cart ID.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/cart/yourcart/${userId}/${cartId}`, { 
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Remove Item Response:", data);

      setCartItems((prevItems) => prevItems.filter((item) => item._id !== cartId));
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
      toast.error("Failed to remove item. Please try again.");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalCost || 0), 0);
  const serviceFee = 10;
  const packagingFee = 25;
  const totalAmount = subtotal + serviceFee + packagingFee;

  useEffect(() => {
    console.log("Cart Items:", cartItems);
    console.log("User ID:", userId);
  }, [cartItems, userId]);

  return (
    <>
      <Toaster />
      {/* <Link to="/cart">
        <button className="back-button">←</button>
      </Link> */}

      <div className="container">
        <h4 className="mt-5 text-start fw-bold">Your Cart</h4>
        <p className="text-start">Items in your cart will be displayed here</p>
      </div>

      <div className="container mt-4 mb-4">
        <div className="border shadow-sm rounded p-3">
          {/* <p className="text-end text-muted">
            Your order from <strong>Bahria Town LHR store</strong> <br />
            Standard delivery time: 15-20 mins
          </p>
          <hr /> */}

          {loading ? (
            <p className="text-center">Loading cart items...</p>
          ) : error ? (
            <p className="text-center text-danger">{error}</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="row align-items-center border-bottom py-2">
                <div className="col-md-9 text-start">
                  <h6 className="mb-0">{item.dishName || "Unknown Dish"}</h6>
                  <small className="text-muted">
                    {item.selectedIngredients?.length || 0} ingredients selected
                  </small>
                </div>
                <div className="col-md-2 text-end">
                  <p className="mb-0">
                    <strong>Rs. {item.totalCost || 0}</strong>
                  </p>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">Your cart is empty.</p>
          )}

<div className="mt-3">
  <h5 className="fw-semibold">Order Summary</h5>
  <div className="d-flex justify-content-between">
    <p>Subtotal:</p>
    <span>Rs. {subtotal}</span>
  </div>
  <div className="d-flex justify-content-between">
    <p>Service Fee:</p>
    <span>Rs. {serviceFee}</span>
  </div>
  <div className="d-flex justify-content-between">
    <p>Packaging Fee:</p>
    <span>Rs. {packagingFee}</span>
  </div>
</div>

        </div>
      </div>

      <div className="Footer mt-auto bg-warning ">
        <hr className="bg-warning"/>
        <div className="d-flex ms-5 me-5 justify-content-between mt-2 p-3">
          <p className="fw-bold">
            Total (incl. fees and tax): Rs. {totalAmount}
          </p>
          <Link to="/checkout">
            <button className="btn bg-success text-white">Go To Checkout</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default YourCart;