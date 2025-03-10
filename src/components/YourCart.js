import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

function YourCart() {
  const [cartItems, setCartItems] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API
  const userId = "679222b7604daee88a60cb5b"; // Replace with actual user ID

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cart/yourcart/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalCost, 0);
  const serviceFee = 10;
  const packagingFee = 25;
  const totalDiscount = 0; // Adjust based on your logic

  return (
    <>
      <Link to="/cart">
        <button className="back-button">←</button>
      </Link>

      <div className="container">
        <h4 className="mt-5 text-start fw-bold">Your Cart</h4>
        <p className="text-start">Items in your cart will be displayed here</p>
      </div>
      <div className="container mt-4">
        <div className="border shadow-lg rounded p-3">
          <p className="text-end text-muted">
            Your order from <strong>Bahria Town LHR store</strong> <br />
            Standard delivery time: 15-20 mins
          </p>
          <hr />
          {cartItems.map((item) => (
            <div key={item._id} className="row align-items-center border-bottom py-2">
              <div className="col-md-2 d-flex justify-content-start">
                <img
                  src="https://via.placeholder.com/50" // Replace with actual image URL
                  alt={item.dishId}
                  className="rounded-circle"
                  width="50"
                  height="50"
                />
              </div>
              <div className="col-md-7 text-start">
                <h6 className="mb-0">{item.dishId} (Ingredients)</h6>
                <small className="text-muted">
                  {item.selectedIngredients.length} items selected
                </small>
              </div>
              <div className="col-md-2 text-end">
                <p className="mb-0">
                  <strong>Rs. {item.totalCost}</strong>
                </p>
              </div>
              <div className="col-auto">
                <button className="btn btn-outline-danger">
                  <Trash />
                </button>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="mt-3">
            <h5 className="fw-semibold">Order Summary</h5>
            <p>
              Subtotal: <span className="float-end">Rs. {subtotal}</span>
            </p>
            <p>
              Service Fee: <span className="float-end">Rs. {serviceFee}</span>
            </p>
            <p>
              Packaging Fee: <span className="float-end">Rs. {packagingFee}</span>
            </p>
            <hr />
          </div>
        </div>
      </div>

      <div className="Footer bg-warning fixed-bottom">
        <div className="d-flex justify-content-between mt-2 p-3">
          <p className="fw-bold">
            Total (incl. fees and tax): Rs.{" "}
            {subtotal + serviceFee + packagingFee - totalDiscount}
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