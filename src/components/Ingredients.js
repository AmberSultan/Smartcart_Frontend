import React, { useState } from 'react';
import { Link} from "react-router-dom";
import './Ingredients.css';
import Navbar from './Navbar';

function Ingredients() {
  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Chicken Karahi",
      ingredients: [
        { id: 1, name: "Chicken (bone-in, cut into pieces): 1 kg", price: 500, quantity: 1, checked: true },
        { id: 2, name: "Tomatoes: 250g", price: 150, quantity: 1, checked: true },
        { id: 3, name: "Green Chilies and Fresh Coriander: A handful", price: 100, quantity: 1, checked: true },
        { id: 4, name: "Red Chili Powder: 10g packet", price: 100, quantity: 1, checked: true },
        { id: 5, name: "Ginger garlic Paste: 100g bottle", price: 100, quantity: 1, checked: true },
      ]
    },
    {
      id: 2,
      name: "Biryani",
      ingredients: [
        { id: 1, name: "Rice: 500g", price: 200, quantity: 1, checked: true },
        { id: 2, name: "Chicken (cut into pieces): 500g", price: 350, quantity: 1, checked: true },
        { id: 3, name: "Yogurt: 100g", price: 100, quantity: 1, checked: true },
        { id: 4, name: "Biryani Masala: 50g", price: 50, quantity: 1, checked: true },
      ]
    },
  ]);

  const [collapsedDishes, setCollapsedDishes] = useState({});

  const calculateTotal = (ingredients) => {
    return ingredients
      .filter((item) => item.checked)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const updateQuantity = (dishId, ingredientId, increment) => {
    const updatedDishes = dishes.map((dish) => {
      if (dish.id === dishId) {
        const updatedIngredients = dish.ingredients.map((item) => {
          if (item.id === ingredientId) {
            const newQuantity = item.quantity + increment;
            return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
          }
          return item;
        });
        return { ...dish, ingredients: updatedIngredients };
      }
      return dish;
    });

    setDishes(updatedDishes);
  };

  const toggleCheck = (dishId, ingredientId) => {
    const updatedDishes = dishes.map((dish) => {
      if (dish.id === dishId) {
        const updatedIngredients = dish.ingredients.map((item) => {
          if (item.id === ingredientId) {
            return { ...item, checked: !item.checked };
          }
          return item;
        });
        return { ...dish, ingredients: updatedIngredients };
      }
      return dish;
    });

    setDishes(updatedDishes);
  };

  const toggleCollapse = (dishId) => {
    setCollapsedDishes(prevState => ({
      ...prevState,
      [dishId]: !prevState[dishId],
    }));
  };

  return (
    <>
      <Navbar />

      <div className="container ingredientBox">
        <div className="row ingredientpage align-items-center">
          <div className="col-6">
            <h2 className="ingredientsHeading">Review your list</h2>
            <p className="ingredientsP">Review to remove ingredients that are not required</p>
          </div>
          <div className="col-6 text-end">
            <Link to='/cart'>
            <button className="add-to-cart me-5">ADD TO CART</button>
            </Link>
          </div>
        </div>

        {dishes.map((dish) => (
          <div key={dish.id} className="ingredient-list card mb-3">
            <div
              className="card-header d-flex justify-content-between align-items-center"
              onClick={() => toggleCollapse(dish.id)}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="DishNameH">{dish.name}</h3>
              {collapsedDishes[dish.id] ? (
                <i className="fas fa-chevron-up" style={{ fontSize: '20px' }}></i> // Up Arrow
              ) : (
                <i className="fas fa-chevron-down" style={{ fontSize: '20px' }}></i> // Down Arrow
              )}
            </div>
            <div
              id={`collapse-${dish.id}`}
              className={`collapse ${collapsedDishes[dish.id] ? 'show' : ''}`}
              aria-labelledby={`heading-${dish.id}`}
              data-bs-parent="#accordionExample"
            >
              <div className="card-body listcard">
                {dish.ingredients.map((item) => (
                  <div key={item.id} className="ingredient-item">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheck(dish.id, item.id)}
                      className="custom-checkbox"
                    />
                    <span className="item-name">{item.name}</span>
                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(dish.id, item.id, -1)}
                        disabled={!item.checked}
                        className='addsubbtn'
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(dish.id, item.id, 1)}
                        disabled={!item.checked}
                        className='addsubbtn'
                      >
                        +
                      </button>
                    </div>
                    <span className="item-price">
                      Rs {item.checked ? item.price * item.quantity : 0}
                    </span>
                  </div>
                ))}
                <div className="total-section">
                  <strong>Total: Rs {calculateTotal(dish.ingredients)}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Ingredients;
