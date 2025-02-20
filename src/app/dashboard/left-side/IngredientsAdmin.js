import React, { useState } from 'react';

function IngredientsAdmin() {
  const [ingredients, setIngredients] = useState([
    { name: 'Flour', price: '2.5', unit: 'kg' },
    { name: 'Sugar', price: '1.8', unit: 'kg' },
    { name: 'Olive Oil', price: '5.0', unit: '1 jar' },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', unit: 'kg' });

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(ingredients[index]);
  };

  const handleDelete = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingIndex !== null) {
      const updatedIngredients = [...ingredients];
      updatedIngredients[editingIndex] = formData;
      setIngredients(updatedIngredients);
      setEditingIndex(null);
    } else {
      setIngredients([...ingredients, formData]);
    }
    setFormData({ name: '', price: '', unit: 'kg' });
  };

  return (
    <div className='container mt-4'>
      <div className="d-flex justify-content-between">
        <h5 className="adminhead">Ingredients List</h5>
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
                    value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="mb-3">
                  <label htmlFor="pricePerUnit" className="form-label d-flex justify-content-start">Price Per Unit</label>
                  <div className="d-flex">
                    <input type="number" className="form-control me-2" id="pricePerUnit" placeholder="Enter price" required
                      value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                    <select className="form-select" id="unitType" required
                      value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })}>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
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
      {ingredients.length > 0 && (
        <div className="mt-4">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Ingredient Name</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.price}</td>
                  <td>{ingredient.unit}</td>
                  <td>
                    <button className="btn editbtn btn-sm me-2" data-bs-toggle="modal" data-bs-target="#ingredientModal" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn deletebtn btn-sm" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default IngredientsAdmin;
