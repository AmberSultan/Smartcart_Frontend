import React from 'react'
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div>
        <div className="header">
        <Link to='/home'>
          <button className="back-button">←</button>
        </Link>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="header-text">
              <h2 className="choiceMainHeading">
                Your Cart
              </h2>
              <p className="choiceMainP">
              Ready to checkout? Review your items below
              </p>
            </div>
          </div>
          
        </div>
      </div>

      <div className="container">
        
      </div>
    </div>
  )
}

export default Cart
