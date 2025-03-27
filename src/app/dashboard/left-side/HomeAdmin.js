import React, { useState, useEffect } from 'react';
import './HomeAdmin.css';
import Charts from '../homecomponents/Charts';
import Notification from '../homecomponents/Notification';

function HomeAdmin() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalIngredients, setTotalIngredients] = useState(0);
  const [totalDishes, setTotalDishes] = useState(0);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Fetch Total Users
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/get-users`);
        const data = await response.json();
        const userCount = Array.isArray(data) ? data.length : data.total || 0;
        setTotalUsers(userCount);
      } catch (error) {
        console.error('Error fetching users:', error);
        setTotalUsers(1200);
      }
    };

    // Fetch Total Ingredients
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ingredientDetail/ingredient`);
        const data = await response.json();
        const ingredientCount = Array.isArray(data) ? data.length : data.total || 0;
        setTotalIngredients(ingredientCount);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setTotalIngredients(350);
      }
    };

    // Fetch Total Dishes
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipe-ingredients/dish-ingredient`);
        const data = await response.json();
        const dishCount = Array.isArray(data) ? data.length : data.total || 0;
        setTotalDishes(dishCount);
      } catch (error) {
        console.error('Error fetching dishes:', error);
        setTotalDishes(500);
      }
    };

    // Call all fetch functions
    fetchUsers();
    fetchIngredients();
    fetchDishes();
  }, [BASE_URL]);

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