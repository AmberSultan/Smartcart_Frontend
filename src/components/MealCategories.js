import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link if you're using React Router
import "./MealCategories.css";

const MealCategories = () => {
  const [categories, setCategories] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Fetch meal categories from the API
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/mealcategory/category`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data.categories); 
      } catch (error) {
        console.error("Error fetching meal categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container meal-categories-container">
      <h2 className="allcategoryheading chooseHeading">
        Choose The Type Of Meal You Want To Make
      </h2>
      <p className="subheading subheadingCategory">
        Select your category, and SmartCart will guide you to the perfect recipes and all the ingredients you need, making meal prep simple, fun, and stress-free.
      </p>
      <div className="mealcategories">
        {categories.map((category) => (
          <Link
            key={category._id}
            to={`/meal-choices/${category.categoryName.toLowerCase()}`} // Dynamically generate the path
            className="category-link"
          >
            <div className="category-card">
              <img
                src={require(`/public/images/${category.categoryName.toLowerCase()}.png`)} // Dynamically load images based on categoryName
                alt={category.categoryName}
                className="category-image"
              />
              <div className="category-overlay">
                <h3 className="category-title">{category.categoryName}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealCategories;