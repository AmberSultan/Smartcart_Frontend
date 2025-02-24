import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { Trash } from 'lucide-react';

function YourCart() {
    const cartItems = [
        {
          id: 1,
          name: "Chicken Karahi",
          image: "https://images.immediate.co.uk/production/volatile/sites/30/2024/12/Chicken-Karahi-847828f.jpg?resize=768,574",
          selectedItems: 7,
          totalItems: 10,
          originalPrice: 850,
          discountedPrice: 700,
          discount: 150,
        },
        {
          id: 2,
          name: "Kachumber Salad",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp8YZLvz3h6wdQsR7qbuedJ3c89O67DGlv2g&s",
          selectedItems: 7,
          totalItems: 10,
          originalPrice: 400,
          discountedPrice: 350,
          discount: 50,
        },
      ];
    
      const subtotal = cartItems.reduce((acc, item) => acc + item.discountedPrice, 0);
      const serviceFee = 10;
      const packagingFee = 25;
      const totalDiscount = cartItems.reduce((acc, item) => acc + item.discount, 0);
  return (
    <>
        <Link to='/cart'>
          <button className="back-button">←</button>
        </Link>

        <div className="container">
            <h4 className='mt-5 text-start fw-bold'>Your Cart</h4>
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
          <div key={item.id} className="row align-items-center border-bottom py-2">
          {/* Image Column */}
          <div className="col-md-2 d-flex justify-content-start">
            <img src={item.image} alt={item.name} className="rounded-circle" width="50" height="50" />
          </div>
        
          {/* Item Details Column */}
          <div className="col-md-7 text-start">
            <h6 className="mb-0">{item.name} (Ingredients)</h6>
            <small className="text-muted">{item.selectedItems} out of {item.totalItems} items selected</small>
          </div>
        
          {/* Price Column */}
          <div className="col-md-2 text-end">
            <p className="mb-0">
              <strong>Rs. {item.discountedPrice}</strong>
            </p>
          </div>
        
          {/* Delete Button Column */}
          <div className="col-auto">
            <button className="btn btn-outline-danger">
              <Trash />
            </button>
          </div>
        </div>
        
        ))}

        {/* Order Summary */}
        <div className="mt-3">
          <h5 className='fw-semibold'>Order Summary</h5>
          <p>Subtotal: <span className="float-end">Rs. {subtotal}</span></p>
          <p>Service Fee: <span className="float-end">Rs. {serviceFee}</span></p>
          <p>Packaging Fee: <span className="float-end">Rs. {packagingFee}</span></p>
          {/* <p className="text-danger">Total Discount: <span className="float-end">-Rs. {totalDiscount}</span></p> */}
          <hr />

        </div>
      </div>
    </div>

    <div className="Footer bg-warning fixed-bottom">
        <div className='d-flex justify-content-between mt-2 p-3'>
            <p className='fw-bold '>
            Total (incl. fees and tax): Rs. {subtotal + serviceFee + packagingFee - totalDiscount}
            </p>
            <Link to='/checkout'>
            <button className='btn bg-success text-white'>
                Go To Checkout
            </button>
            </Link>
        </div>

    </div>
    </>
  )
}

export default YourCart
