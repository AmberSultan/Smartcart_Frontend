import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./MealCategory.css";


function MealCategoryAdmin() {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4001';
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = `${BASE_URL}/mealcategory/category`;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch categories");
  
        const data = await response.json();
        console.log("Fetched Categories:", data); // Debugging
  
        setCategories(data.categories || []); // Ensure it's an array
      } catch (err) {
        toast.error(err.message);
        setCategories([]);
      }
    };
  
    fetchCategories();
  }, []);
  
  

  // Add new meal category
  const handleAddCategory = async () => {
    if (category.trim() === "") {
      toast.error("Category name cannot be empty!");
      return;
    }
  
    try {
      setLoading(true);
  
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: category.trim() }),
      });
  
      if (!response.ok) throw new Error("Category already exists or invalid input");
  
      const data = await response.json();
      console.log("New Category Response:", data); // Debugging
  
      // Add the newly created category to the list
      setCategories([...categories, data.category]);
  
      setCategory("");
      toast.success("Category added successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container mt-4">
      <Toaster position="top-right" />

      <h5 className="adminhead">Your Meal Categories</h5>

      {/* Input Field */}
      <div className="input-group mealinput col-12  mt-3 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Meal Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddCategory} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Display Meal Categories */}
      <div className="row">
      {categories.map((item, index) => (
  <div key={index} className="col-md-6 col-6 mb-3">
    <div className="list-group-item text-center p-3 bg-light border rounded">
      {item.categoryName} {/* Now correctly displays category name */}
    </div>
  </div>
))}

      </div>
    </div>
  );
}

export default MealCategoryAdmin;
