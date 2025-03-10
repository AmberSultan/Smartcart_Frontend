import React, { useEffect } from 'react';
import './Cart.css'
import { Link } from "react-router-dom";

import AOS from 'aos'; 
import 'aos/dist/aos.css';

function Delivery() {
      useEffect(() => {
        AOS.init({
          duration: 1500,
          easing: 'ease-in-out',
        });
      }, []);
  return (
    <>
         <div className="header">
              <Link to='/home'>
                <button className="back-button">←</button>
              </Link>
              <div className="container">
              <h4 className='itemadded'>Your Order has been place sucessfully!</h4>
              <div data-aos="fade-up-left">
              <img className='cartimg' src="./images/cartimg.png" alt="" />
              </div>
      
      {/* <img className='gifsize mt-5' src="./images/gif.gif" alt="Animated GIF" /> */}
      
      
      
              <div className="d-flex justify-content-center mt-4 ">
                <p className='fw-semibold fs-5'>Delivery Time : 15 - 30 Mins</p>
              </div>
              </div>
              
            </div>
    </>
  )
}

export default Delivery
