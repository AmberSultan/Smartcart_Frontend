import React, { useState } from "react";
import "./MealCategory.css";
import "bootstrap/dist/css/bootstrap.min.css";

function MealCategoryAdmin() {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (category.trim() !== "") {
      setCategories([...categories, category]);
      setCategory(""); // Clear input field
    }
  };

  return (
    <div className="container mt-4">
      <h5 className="adminhead">Your Meal Categories</h5>

      {/* Input Field */}
      <div className="input-group mealinput mt-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Meal Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddCategory}>
          Add
        </button>
      </div>

      {/* Display Entered Meal Categories */}
      <div className="row">
        {categories.map((item, index) => (
          <div key={index} className="col-md-6 col-sm-6 mb-3">
            <div className="list-group-item text-center p-3 bg-light border rounded">
              {item}
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default MealCategoryAdmin;
