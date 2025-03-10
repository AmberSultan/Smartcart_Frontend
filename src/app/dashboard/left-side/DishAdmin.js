import React, { useState, useEffect, useRef } from "react";
import "./DishAdmin.css";
import { Search, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "bootstrap"; // Import Bootstrap Modal

function DishAdmin() {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [searchQuery, setSearchQuery] = useState("");
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editDish, setEditDish] = useState(null);
  const [formData, setFormData] = useState({
    dishName: "",
    categoryId: "",
  });

  const modalRef = useRef(null); // Ref for the modal

  // Fetch dishes from the API
  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dishName/dishes`);
      const data = await response.json();
      setDishes(data);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    }
  };

  // Fetch categories from the API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4001/mealcategory/category");
      const data = await response.json();
      if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (add or edit dish)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editDish ? "PUT" : "POST";
    const url = editDish
      ? `${BASE_URL}/dishName/dishes/${editDish._id}`
      : `${BASE_URL}/dishName/dishes`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save dish");

      const updatedDish = await response.json();
      console.log("API Response:", updatedDish);

      // Refetch dishes to update the state with the latest data
      await fetchDishes();

      toast.success(editDish ? "Dish updated successfully!" : "Dish added successfully!");

      // Reset form and close modal
      setFormData({ dishName: "", categoryId: "" });
      setEditDish(null);
      hideModal(); // Close the modal
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  // Handle dish deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;

    try {
      const response = await fetch(`${BASE_URL}/dishName/dishes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete dish");

      // Refetch dishes to update the state with the latest data
      await fetchDishes();

      toast.success("Dish deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete dish.");
    }
  };

  // Open modal for adding or editing a dish
  const openModal = (dish = null) => {
    setEditDish(dish);
    setFormData(
      dish
        ? { dishName: dish.dishName, categoryId: dish.categoryId._id } // Use categoryId._id for the form
        : { dishName: "", categoryId: "" }
    );
    showModal(); // Show the modal
  };

  // Show the modal
  const showModal = () => {
    const modal = new Modal(modalRef.current);
    modal.show();
  };

  // Hide the modal
  const hideModal = () => {
    const modal = Modal.getInstance(modalRef.current);
    if (modal) modal.hide();
  };

  // Filter dishes based on search query
  const filteredDishes = dishes.filter((dish) =>
    dish.dishName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h5 className="adminhead">Your Dishes</h5>
        <button
          className="btn bg-success text-white"
          onClick={() => openModal()}
        >
          + Create Dish
        </button>
      </div>

      {/* Modal for adding/editing a dish */}
      <div className="modal fade" id="dishModal" tabIndex="-1" aria-hidden="true" ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">{editDish ? "Edit Dish" : "Add Dish"}</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Dish Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="dishName"
                    value={formData.dishName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Category</label>
                  <select
                    className="form-select"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    {editDish ? "Update Dish" : "Add Dish"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-3 dishinput">
        <div className="input-group">
          <span className="input-group-text bg-white">
            <Search className="text-success" />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search dish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Display filtered dishes */}
      <div className="container">
        <div className="row g-3 gx-4">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <div
                key={dish._id}
                className="col-md-5 col-12 p-3 border rounded d-flex justify-content-between align-items-center dishcol"
              >
                <span className="dishname">{dish.dishName}</span>
                <span className="badge bg-warning text-success">
                  {dish.categoryId?.categoryName || "Unknown"}
                </span>
                <div className="d-flex">
                  <button
                    className="btn btn-sm editbtn me-2"
                    onClick={() => openModal(dish)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-sm deletebtn"
                    onClick={() => handleDelete(dish._id)}
                  >
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