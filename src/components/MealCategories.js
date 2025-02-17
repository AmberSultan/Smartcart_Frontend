import React from "react";
import { Link } from "react-router-dom"; // Import Link if you're using React Router
import "./MealCategories.css";

const MealCategories = () => {
  const categories = [
    { id: 1, name: "BREAKFAST", image: "breakfast.png", path: "/meal-choices/breakfast" },
    { id: 2, name: "LUNCH", image: "lunch.png", path: "/meal-choices/lunch" },
    { id: 3, name: "DINNER", image: "dinner.png", path: "/meal-choices/dinner" },
    { id: 4, name: "DESSERT", image: "dessert.png", path: "/meal-choices/dessert" },
    { id: 5, name: "SNACKS", image: "snack.png", path: "/meal-choices/snacks" },
  ];

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
          <Link key={category.id} to={category.path} className="category-link">
            <div className="category-card">
              <img
                src={require(`/public/images/${category.image}`)}
                alt={category.name}
                className="category-image"
              />
              <div className="category-overlay">
                <h3 className="category-title">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MealCategories;
