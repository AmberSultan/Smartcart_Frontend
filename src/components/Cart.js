import React, { useEffect } from 'react';
import './Cart.css'
import { Link } from "react-router-dom";

import AOS from 'aos'; 
import 'aos/dist/aos.css';

function Cart() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: 'ease-in-out',
    });
  }, []);
  
  return (
    <>
        <div className="header">
        <Link to='/ingredients'>
          <button className="back-button">←</button>
        </Link>
        <div className="container">
        <h4 className='itemadded'>Items Added to Cart Sucessfully</h4>
        <div data-aos="fade-up-left">
        <img className='cartimg' src="./images/cartimg.png" alt="" />
        </div>

{/* <img className='gifsize mt-5' src="./images/gif.gif" alt="Animated GIF" /> */}



        <div className="d-flex justify-content-center mt-4 ">
          <Link to='/home'>
          <button className='btn btn-outline-success me-4'>CONTINUE SHOPPING</button>
          </Link>
          <Link to='/your-cart'>
          <button className='btn bg-success text-white btn-outline-success'>GO TO CART</button>
          </Link>
        </div>
        </div>
        
      </div>

     
    </>
  )
}

export default Cart
