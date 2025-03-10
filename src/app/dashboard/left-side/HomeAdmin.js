import React from 'react';
import './HomeAdmin.css';

import Charts from '../homecomponents/Charts';
import Notification from '../homecomponents/Notification';

function HomeAdmin() {
  // Example data (replace with actual data from your backend or state)
  const totalUsers = 1200;
  const totalIngredients = 350;
  const totalDishes = 500;

  return (
    <div>
      <div className="bg-success p-3">
        <h3 className="text-start text-warning ps-3 pt-3 welcome">Welcome back!</h3>
        <p className="text-white text-start ps-3">Let’s make meal planning effortless for users.</p>
        <div className="charts">
          <div className="row d-flex justify-content-center">
            {/* Total Users */}
            <div className="col-md-4 divinsights position-relative d-flex justify-content-center">
              <img src="../images/chartbg (1).png" alt="Total Users" className="img-fluid" />
              <div className="overlay-text">
                <h4>Total Users</h4>
                <p>{totalUsers}</p>
              </div>
            </div>

            {/* Total Ingredients */}
            <div className="col-md-4 divinsights position-relative d-flex justify-content-center">
              <img src="../images/chartbg (2).png" alt="Total Ingredients" className="img-fluid" />
              <div className="overlay-text">
                <h4 className='ms-5'>Total Ingredients</h4>
                <p>{totalIngredients}</p>
              </div>
            </div>

            {/* Total Dishes */}
            <div className="col-md-4 divinsights position-relative d-flex justify-content-center">
              <img src="../images/chartbg (1).png" alt="Total Dishes" className="img-fluid" />
              <div className="overlay-text">
                <h4>Total Dishes</h4>
                <p>{totalDishes}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
      <Charts/>
      </div>

      <div className="mt-3 mb-5">
      <Notification/>
      </div>
      
    </div>
  );
}

export default HomeAdmin;