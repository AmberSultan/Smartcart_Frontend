import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Ingredients.css";
import Navbar from "./Navbar";
import { toast, Toaster } from "react-hot-toast";

function Ingredients() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDishes = location.state?.selectedDishes || [];
  const [dishes, setDishes] = useState([]);
  const [allDishes, setAllDishes] = useState([]);
  const [collapsedDishes, setCollapsedDishes] = useState({});

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const userId = localStorage.getItem("id");

  useEffect(() => {
    console.log("Selected Dishes:", selectedDishes);

    const fetchIngredients = async () => {
      try {
        const dishesResponse = await fetch(`${BASE_URL}/dishName/dishes`);
        if (!dishesResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const dishesData = await dishesResponse.json();
        setAllDishes(dishesData);

        const ingredientsResponse = await fetch(`${BASE_URL}/recipe-ingredients/dish-ingredient`);
        if (!ingredientsResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const ingredientsData = await ingredientsResponse.json();
        console.log("Ingredients Data:", ingredientsData);

        const filteredDishes = ingredientsData.filter((dish) =>
          selectedDishes.some((selected) => 
            selected.toLowerCase().trim() === dish.dish.toLowerCase().trim()
          )
        );
        console.log("Filtered Dishes:", filteredDishes);

        const mappedDishes = filteredDishes.map((dish) => ({
          _id: dish._id,
          name: dish.dish.trim(),
          ingredients: dish.ingredients.map((ingredient) => ({
            _id: ingredient._id,
            name: `${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`,
            price: ingredient.price,
            quantity: 1,
            checked: true,
          })),
        }));

        console.log("Mapped Dishes:", mappedDishes);
        setDishes(mappedDishes);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    if (selectedDishes.length > 0) {
      fetchIngredients();
    }
  }, [selectedDishes]);

  const hasCheckedItems = () => {
    return dishes.some((dish) =>
      dish.ingredients.some((item) => item.checked)
    );
  };

  const handleAddToCart = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("User ID is missing. Please log in.");
        toast.error("User ID is missing. Please log in.");
        return;
      }

      const selectedCartItems = dishes.map((dish) => ({
        userId,
        dishId: dish._id,
        dishName: dish.name,
        selectedIngredients: dish.ingredients
          .filter((ing) => ing.checked)
          .map((ing) => ({
            ingredientId: ing._id,
            ingredientName: ing.name.split(":")[0].trim(),
            quantity: ing.quantity,
            price: ing.price,
          })),
        totalCost: calculateTotal(dish.ingredients),
      }));

      if (selectedCartItems.length === 0 || !hasCheckedItems()) {
        console.error("No items selected for the cart.");
        toast.error("You have not selected any item.");
        return;
      }

      console.log("Data sent to backend:", selectedCartItems);

      for (const cartItem of selectedCartItems) {
        const response = await fetch(`${BASE_URL}/cart/yourcart/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        });

        if (!response.ok) {
          throw new Error("Failed to add items to cart");
        }

        const data = await response.json();
        console.log("Cart updated:", data);
      }

      toast.success("Items successfully added to the cart!");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding items to cart:", error);
      toast.error("Failed to add items to the cart. Please try again.");
    }
  };

  const handleButtonClick = () => {
    if (!hasCheckedItems()) {
      toast.error("You have not selected any item.");
    } else {
      handleAddToCart();
    }
  };

  if (selectedDishes.length === 0) {
    return (
      <div className="container ingredientBox">
        <div className="row ingredientpage align-items-center">
          <div className="col-12 text-center">
            <h2 className="ingredientsHeading">No Dishes Selected</h2>
            <p className="ingredientsP">
              Please go back and select some dishes to view their ingredients.
            </p>
            <Link to="/home">
              <button className="add-to-cart">GO BACK</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const dishesWithNoIngredients = selectedDishes.filter(
    (dish) => {
      const matchingDish = dishes.find((d) => 
        d.name.toLowerCase().trim() === dish.toLowerCase().trim()
      );
      return !matchingDish || matchingDish.ingredients.length === 0;
    }
  );

  const calculateTotal = (ingredients) => {
    return ingredients
      .filter((item) => item.checked)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const updateQuantity = (dishId, ingredientId, increment) => {
    const updatedDishes = dishes.map((dish) => {
      if (dish._id === dishId) {
        const updatedIngredients = dish.ingredients.map((item) => {
          if (item._id === ingredientId) {
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
      if (dish._id === dishId) {
        const updatedIngredients = dish.ingredients.map((item) => {
          if (item._id === ingredientId) {
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
    setCollapsedDishes((prevState) => ({
      ...prevState,
      [dishId]: !prevState[dishId],
    }));
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="container ingredientBox">
        <div className="row ingredientpage align-items-center">
          <div className="col-6">
            <h2 className="ingredientsHeading">Review Your List</h2>
            <p className="ingredientsP">
              Review to remove ingredients that are not required.
            </p>
          </div>
          

          <div className="col-6 text-end">
            <button
              className={`add-to-cart me-5 ${!hasCheckedItems() ? "disabled" : ""}`}
              onClick={handleButtonClick}
              disabled={!hasCheckedItems()}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <p className="text-start">
  <strong>Note:</strong> Some ingredients (like oil, flour, sugar, etc.) are delivered in 
  <em>standard full-size packs</em> — even if your selected recipe requires only a small amount. 
  This helps reduce waste, saves cost in the long run, and lets you reuse items for future meals.
</p>
        {dishes.map((dish) => (
          dish.ingredients.length > 0 ? (
            <div key={dish._id} className="ingredient-list card mb-3">
              <div
                className="card-header d-flex justify-content-between align-items-center"
                onClick={() => toggleCollapse(dish._id)}
                style={{ cursor: "pointer" }}
              >
                <h3 className="DishNameH">{dish.name}</h3>
                {collapsedDishes[dish._id] ? (
                  <i className="fas fa-chevron-up" style={{ fontSize: "20px" }}></i>
                ) : (
                  <i className="fas fa-chevron-down" style={{ fontSize: "20px" }}></i>
                )}
              </div>
              <div
                id={`collapse-${dish._id}`}
                className={`collapse ${collapsedDishes[dish._id] ? "show" : ""}`}
                aria-labelledby={`heading-${dish._id}`}
                data-bs-parent="#accordionExample"
              >
                <div className="card-body listcard">
                  {dish.ingredients.map((item) => (
                    <div key={item._id} className="ingredient-item">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleCheck(dish._id, item._id)}
                        className="custom-checkbox"
                      />
                      <span className="item-name">{item.name}</span>
                      <div className="quantity-control">
                        <button
                          onClick={() => updateQuantity(dish._id, item._id, -1)}
                          disabled={!item.checked}
                          className="addsubbtn"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(dish._id, item._id, 1)}
                          disabled={!item.checked}
                          className="addsubbtn"
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
          ) : null
        ))}

        {dishesWithNoIngredients.length > 0 || dishes.some((dish) => dish.ingredients.length === 0) ? (
          <div className="ingredient-list card mb-3">
            <div className="card-header">
              {[...dishesWithNoIngredients, ...dishes.filter((dish) => dish.ingredients.length === 0).map((dish) => dish.name)].map((dishName, index) => (
                <div key={index} className="ingredient-item">
                  <h3 className="DishNameH">{dishName}</h3>
                </div>
              ))}
            </div>
            <div className="card-body">
              {[...dishesWithNoIngredients, ...dishes.filter((dish) => dish.ingredients.length === 0).map((dish) => dish.name)].map((dishName, index) => (
                <div key={index} className="ingredient-item">
                  <p className="item-name">
                    Oops! No ingredients found for <strong>{dishName}</strong>. Let us know if you'd like us to add them!
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Ingredients;