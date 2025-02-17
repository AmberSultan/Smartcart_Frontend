import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./MealChoice.css";

const MealChoice = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const dummyData = {
    breakfast: [
      "Pancakes",
      "Omelette",
      "Smoothie",
      "Fruit Salad",
      "French Toast",
    ],
    lunch: [
      "Chicken Sandwich",
      "Caesar Salad",
      "Grilled Chicken",
      "Veggie Wrap",
      "Pasta",
    ],
    dinner: [
      "Chicken Karahi",
      "Biryani",
      "Seekh Kebabs",
      "Mutton Karahi",
      "Dum Ka Murgh",
    ],
    dessert: [
      "Chocolate Cake",
      "Ice Cream",
      "Fruit Tart",
      "Cheesecake",
      "Brownies",
    ],
    snacks: [
      "Spring Rolls",
      "Samosas",
      "French Fries",
      "Nachos",
      "Popcorn",
    ],
  };

  useEffect(() => {
    setItems(dummyData[category.toLowerCase()] || []);
  }, [category]);

  const filteredItems = items.filter((item) => {
    const normalizedItem = item.toLowerCase().replace(/\s+/g, " ").trim();
    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, " ").trim();

    return normalizedItem.includes(normalizedSearchTerm);
  });

  // Handle item selection/deselection
  const toggleSelection = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item); // Remove item
      } else {
        return [...prevSelectedItems, item]; // Add item
      }
    });
  };

  return (
    <div className="meal-choices-container">
      <div className="header">
        <Link to='/home'>
          <button className="back-button">←</button>
        </Link>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="header-text">
              <h2 className="choiceMainHeading">
                Make Your {category.charAt(0).toUpperCase() + category.slice(1)} Choices
              </h2>
              <p className="choiceMainP">
                Just select dishes of your choice, and SmartCart will handle the rest.
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link to='/ingredients'>
              <button className="proceed-button">PROCEED</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className={`grid-item ${selectedItems.includes(item) ? "selected" : ""}`}
            onClick={() => toggleSelection(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealChoice;
