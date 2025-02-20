import React, { useState } from "react";
import "./DishAdmin.css";
import { Search, Edit, Trash } from "lucide-react";

function DishAdmin() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([
    { id: 1, img: "/images/dish1.jpg", name: "Pancakes", category: "Breakfast" },
    { id: 2, img: "/images/dish2.jpg", name: "Burger", category: "Lunch" },
    { id: 3, img: "/images/dish3.jpg", name: "Steak", category: "Dinner" },
    { id: 4, img: "/images/dish4.jpg", name: "Fries", category: "Snacks" },
    { id: 5, img: "/images/dish5.jpg", name: "Ice Cream", category: "Dessert" },
  ]);

  const [editDish, setEditDish] = useState(null);

  // Filter dishes based on search query (both name & category)
  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete action
  const handleDelete = (id) => {
    setDishes(dishes.filter((dish) => dish.id !== id));
  };

  // Handle edit action
  const handleEdit = (dish) => {
    setEditDish(dish);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h5 className="adminhead">Your Dishes</h5>

        <button
          type="button"
          className="btn bg-success text-white"
          data-bs-toggle="modal"
          data-bs-target="#dishModal"
          onClick={() => setEditDish(null)}
        >
          + Create Dish
        </button>
      </div>

      {/* MODAL */}
      <div
        className="modal fade"
        id="dishModal"
        tabIndex="-1"
        aria-labelledby="dishModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="dishModalLabel">
                {editDish ? "Edit Dish" : "Add Dish"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form id="dishForm">
                {/* Dish Name */}
                <div className="mb-3">
                  <label className="form-label d-flex justify-content-start">
                    Dish Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={editDish ? editDish.name : ""}
                    required
                  />
                </div>

                {/* Dish Image */}
                <div className="mb-3">
                  <label className="form-label d-flex justify-content-start">
                    Dish Image
                  </label>
                  <input type="file" className="form-control" required />
                </div>

                {/* Category Dropdown */}
                <div className="mb-3">
                  <label className="form-label d-flex justify-content-start">
                    Select Category
                  </label>
                  <select className="form-select" defaultValue={editDish ? editDish.category : ""} required>
                    <option value="">Choose a category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-success" form="dishForm">
                {editDish ? "Update Dish" : "Add Dish"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Filter */}
      <div className="mb-3 dishinput">
        <div className="input-group">
          <span className="input-group-text bg-white">
            <Search className="text-success" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search dish by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Display Filtered Dishes */}
      <div className="container">
        <div className="row g-3 gx-4">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <div key={dish.id} className="col-md-5 col-12 p-3 border rounded d-flex justify-content-between align-items-center dishcol">
                <img src={dish.img} alt={dish.name} className="img-fluid rounded" />
                <span className="dishname">{dish.name}</span>
                <span className="badge bg-warning text-success">{dish.category}</span>
                <div className="d-flex">
                  <button
                    className="btn btn-sm editbtn me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#dishModal"
                    onClick={() => handleEdit(dish)}
                  >
                    <Edit size={16} />
                  </button>
                  <button className="btn btn-sm deletebtn" onClick={() => handleDelete(dish.id)}>
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No dishes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DishAdmin;