import React, { useState, useEffect } from 'react';
import {toast, Toaster} from "react-hot-toast";

function IngredientsAdmin() {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4001';
  const [ingredients, setIngredients] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ ingredientName: '', price: '', quantity: '1kg' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch(`${BASE_URL}/ingredientDetail/ingredient`);
      if (!response.ok) throw new Error('Failed to fetch ingredients');
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(ingredients[index]);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/ingredientDetail/ingredient/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete ingredient');
      fetchIngredients(); // Refresh the list
      toast.success('Ingredient deleted successfully!');
    } catch (error) {
      console.error('Failed to delete ingredient:', error);
      toast.error('Failed to delete ingredient');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isDuplicate = ingredients.some(
      (ingredient) => ingredient.ingredientName.toLowerCase() === formData.ingredientName.toLowerCase()
    );

    if (isDuplicate) {
      toast.error('Ingredient already exists!');
      return;
    }

    try {
      const url = editingIndex !== null
        ? `${BASE_URL}/ingredientDetail/ingredient/${formData._id}`
        : `${BASE_URL}/ingredientDetail/ingredient`;
      const method = editingIndex !== null ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit ingredient');

      fetchIngredients(); // Refresh the list
      setEditingIndex(null);
      setFormData({ ingredientName: '', price: '', quantity: '1kg' });
      toast.success(`Ingredient ${editingIndex !== null ? 'updated' : 'added'} successfully!`);
    } catch (error) {
      console.error('Failed to submit ingredient:', error);
      toast.error('Failed to submit ingredient');
    }
  };

  const filteredIngredients = ingredients.filter(ingredient =>
    ingredient.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='container mt-4'>
      <Toaster />
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="adminhead">Ingredients List</h5>
        <div>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn bg-success text-white"
          data-bs-toggle="modal"
          data-bs-target="#ingredientModal"
        >
          + {editingIndex !== null ? 'Edit' : 'Add'} Ingredient
        </button>
      </div>

      {/* MODAL */}
      <div className="modal fade" id="ingredientModal" tabIndex="-1" aria-labelledby="ingredientModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="ingredientModalLabel">{editingIndex !== null ? 'Edit' : 'Add New'} Ingredient</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="ingredientForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="ingredientName" className="form-label d-flex justify-content-start">Ingredient Name</label>
                  <input type="text" className="form-control" id="ingredientName" placeholder="Enter ingredient name" required
                    value={formData.ingredientName} onChange={(e) => setFormData({ ...formData, ingredientName: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="pricePerUnit" className="form-label d-flex justify-content-start">Price Per Unit</label>
                  <div className="d-flex">
                    <input type="number" className="form-control me-2" id="pricePerUnit" placeholder="Enter price" required
                      value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    <select className="form-select" id="unitType" required
                      value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}>
                      <option value="1kg">1 kg</option>
                      <option value="1g">1 g</option>
                      <option value="1 packet">1 packet</option>
                      <option value="1 jar">1 jar</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal">{editingIndex !== null ? 'Update' : 'Add'} Ingredient</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* DISPLAY INGREDIENTS */}
      {filteredIngredients.length > 0 ? (
        <div className="mt-4">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ingredient Name</th>
                <th>Price</th>
                <th>Per Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIngredients.map((ingredient, index) => (
                <tr key={ingredient._id}>
                  <td>{index + 1}</td>
                  <td>{ingredient.ingredientName}</td>
                  <td>{ingredient.price} Rs</td>
                  <td>{ingredient.quantity}</td>
                  <td>
                    <button className="btn editbtn btn-sm me-2" data-bs-toggle="modal" data-bs-target="#ingredientModal" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn deletebtn btn-sm" onClick={() => handleDelete(ingredient._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4">
          <p>No ingredients found.</p>
        </div>
      )}
    </div>
  );
}

export default IngredientsAdmin;