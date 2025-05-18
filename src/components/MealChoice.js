import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"; // Add useNavigate
import "./MealChoice.css";

const MealChoice = () => {
  const { category } = useParams(); // Get the selected category from the URL
  const [dishes, setDishes] = useState([]); // State to store all dishes
  const [filteredDishes, setFilteredDishes] = useState([]); // State to store filtered dishes
  const [searchTerm, setSearchTerm] = useState(""); // State for search functionality
  const [selectedItems, setSelectedItems] = useState([]); // State to store selected dishes
  const navigate = useNavigate(); // Use useNavigate for navigation

  const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API

  useEffect(() => {
    // Fetch all dishes from the API
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dishName/dishes`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDishes(data); // Set all dishes
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchDishes();
  }, []);

  useEffect(() => {
    // Filter dishes based on the selected category
    if (dishes.length > 0) {
      const filtered = dishes.filter(
        (dish) =>
          dish.categoryId.categoryName.toLowerCase() === category.toLowerCase()
      );
      setFilteredDishes(filtered); // Set filtered dishes
    }
  }, [category, dishes]);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter dishes based on search term
  const searchedDishes = filteredDishes.filter((dish) =>
    dish.dishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle item selection/deselection
  const toggleSelection = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem !== item
        ); // Remove item
      } else {
        return [...prevSelectedItems, item]; // Add item
      }
    });
  };

  // Handle proceed button click
  const handleProceed = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one dish.");
      return;
    }
    navigate("/ingredients", { state: { selectedDishes: selectedItems } }); // Pass selectedItems as state
  };

  return (
    <div className="meal-choices-container">
      <div className="header">
        <Link to="/home">
          <button className="back-button">←</button>
        </Link>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="header-text">
              <h2 className="choiceMainHeading">
                Make Your {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
                Choices
              </h2>
              <p className="choiceMainP">
                Just select dishes of your choice, and SmartCart will handle the
                rest.
              </p>
              
            </div>
          </div>
          <div className="col-md-6">
            <div className="actions">
              <input
                type="text"
                placeholder="Search"
                className="search-barChoice"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="proceed-button" onClick={handleProceed}>
                PROCEED
              </button>
            </div>
          </div>
        </div>


        <p className="text-start">
  <strong>Note:</strong> Some ingredients (like oil, flour, sugar, etc.) are delivered in 
  <em>standard full-size packs</em> — even if your selected recipe requires only a small amount. 
  This helps reduce waste, saves cost in the long run, and lets you reuse items for future meals.
</p>

      </div>

      <div className="grid">
        {searchedDishes.map((dish) => (
          <div
            key={dish._id}
            className={`grid-item ${
              selectedItems.includes(dish.dishName) ? "selected" : ""
            }`}
            onClick={() => toggleSelection(dish.dishName)}
          >
            {dish.dishName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealChoice;
