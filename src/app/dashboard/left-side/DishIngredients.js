import React, { useState, useEffect } from 'react';

function DishIngredients() {
  const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4001';

  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedDish, setSelectedDish] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [savedDishes, setSavedDishes] = useState([]);
  const [openDishIndex, setOpenDishIndex] = useState(null);
  const [editMode, setEditMode] = useState(null);

  // Fetch dishes from API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/dishName/dishes`);
        if (!response.ok) {
          throw new Error('Failed to fetch dishes');
        }
        const data = await response.json();
        const dishNames = data.map(item => item.dishName);
        setDishes(dishNames);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();
  }, [BASE_URL]);

  // Fetch ingredients from API
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ingredientDetail/ingredient`);
        if (!response.ok) {
          throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        const ingredientNames = data.map(item => item.ingredientName);
        setIngredients(ingredientNames);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, [BASE_URL]);

  // Fetch saved dishes from API
  useEffect(() => {
    const fetchSavedDishes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipe-ingredients/dish-ingredient`);
        if (!response.ok) {
          throw new Error('Failed to fetch saved dishes');
        }
        const data = await response.json();
        setSavedDishes(data);
      } catch (error) {
        console.error('Error fetching saved dishes:', error);
      }
    };

    fetchSavedDishes();
  }, [BASE_URL]);

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...selectedIngredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setSelectedIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setSelectedIngredients([...selectedIngredients, { ingredient: '', quantity: '', unit: 'kg', price: 0 }]);
  };

  const deleteIngredient = (index) => {
    const updatedIngredients = selectedIngredients.filter((_, i) => i !== index);
    setSelectedIngredients(updatedIngredients);
  };

  const saveDish = async () => {
    if (selectedDish && selectedIngredients.length > 0) {
      const dishWithIngredients = {
        dish: selectedDish,
        ingredients: selectedIngredients,
      };

      try {
        const response = await fetch(`${BASE_URL}/recipe-ingredients/dish-ingredient`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dishWithIngredients),
        });

        if (!response.ok) {
          throw new Error('Failed to save dish and ingredients');
        }

        const result = await response.json();
        console.log('Dish and ingredients saved successfully:', result);

        // Update local state
        setSavedDishes([...savedDishes, dishWithIngredients]);
        setSelectedDish('');
        setSelectedIngredients([]);
      } catch (error) {
        console.error('Error saving dish and ingredients:', error);
      }
    }
  };

  const toggleCollapse = (index) => {
    setOpenDishIndex(openDishIndex === index ? null : index);
    setEditMode(null);
  };

  const enterEditMode = (index) => {
    setEditMode(index);
  };

  const saveEditedDish = (index) => {
    setEditMode(null);
  };

  const deleteDish = (index) => {
    const updatedDishes = savedDishes.filter((_, i) => i !== index);
    setSavedDishes(updatedDishes);
  };

  const handleEditIngredientChange = (dishIndex, ingredientIndex, field, value) => {
    const updatedDishes = [...savedDishes];
    updatedDishes[dishIndex].ingredients[ingredientIndex][field] = value;
    setSavedDishes(updatedDishes);
  };

  return (
    <div className='container mt-4'>
      <div className="d-flex justify-content-between">
        <h5 className="adminhead">Dishes along with their Ingredients</h5>
      </div>
      <div className='mt-3'>
        <div className="row">
          <div className="col-md-6">
            <label className='d-flex justify-content-start mb-2 fw-semibold'>Select Dish:</label>
            <select className='form-control' value={selectedDish} onChange={(e) => setSelectedDish(e.target.value)}>
              <option value="">Choose a Dish</option>
              {dishes.map((dish, index) => (
                <option key={index} value={dish}>{dish}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='mt-3'>
        <label className='d-flex justify-content-start mb-2 fw-semibold'>Ingredients and Quantities:</label>
        {selectedIngredients.map((item, index) => (
          <div key={index} className='d-flex mt-2 '>
            <select className='form-control' value={item.ingredient} onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}>
              <option value="">Choose an Ingredient</option>
              {ingredients.map((ingredient, idx) => (
                <option key={idx} value={ingredient}>{ingredient}</option>
              ))}
            </select>
            <input type='number' className='form-control ml-2 ms-3 me-3' value={item.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} placeholder='Quantity' />
            <select className='form-control ml-2 me-3' value={item.unit} onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}>
              <option value='kg'>kg</option>
              <option value='g'>g</option>
              <option value='pcs'>pcs</option>
              <option value='packet'>packet</option>
            </select>
            <input type='number' className='form-control ml-2 me-3' value={item.price} onChange={(e) => handleIngredientChange(index, 'price', e.target.value)} placeholder='Price' />
            <button className='btn btn-danger ml-2' onClick={() => deleteIngredient(index)}>-</button>
          </div>
        ))}
        <button className='btn btn-success mt-2 d-flex justify-content-start' onClick={addIngredient}>+</button>
        {selectedIngredients.length > 0 && (
          <button className='btn btn-success mt-2 d-flex justify-content-start' onClick={saveDish}>Submit Complete Dish</button>
        )}
      </div>
      <div className='mt-4'>
        <h5 className="adminhead">Saved Dishes:</h5>
        <div className="row">
          {savedDishes.map((dish, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-header">
                  <button
                    className="btn btn-link d-flex justify-content-between w-100 text-decoration-none"
                    onClick={() => toggleCollapse(index)}
                    aria-expanded={openDishIndex === index}
                  >
                    <span className='text-dark'>{dish.dish}</span>
                    <span className='text-success'>{openDishIndex === index ? '▲' : '▼'}</span>
                  </button>
                  <div className="d-flex justify-content-end">
                    <button className='btn btn-warning btn-sm me-2' onClick={() => enterEditMode(index)}>Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={() => deleteDish(index)}>Delete</button>
                  </div>
                </div>
                <div className={`collapse ${openDishIndex === index ? 'show' : ''}`}>
                  <div className="card-body">
                    <ul className="list-group">
                      {dish.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="list-group-item">
                          {editMode === index ? (
                            <div className='d-flex'>
                              <select
                                className='form-control me-2'
                                value={ingredient.ingredient}
                                onChange={(e) => handleEditIngredientChange(index, idx, 'ingredient', e.target.value)}
                              >
                                <option value="">Choose an Ingredient</option>
                                {ingredients.map((ing, i) => (
                                  <option key={i} value={ing}>{ing}</option>
                                ))}
                              </select>
                              <input
                                type='number'
                                className='form-control me-2'
                                value={ingredient.quantity}
                                onChange={(e) => handleEditIngredientChange(index, idx, 'quantity', e.target.value)}
                              />
                              <select
                                className='form-control me-2'
                                value={ingredient.unit}
                                onChange={(e) => handleEditIngredientChange(index, idx, 'unit', e.target.value)}
                              >
                                <option value='kg'>kg</option>
                                <option value='g'>g</option>
                                <option value='pcs'>pcs</option>
                              </select>
                              <input
                                type='number'
                                className='form-control me-2'
                                value={ingredient.price}
                                onChange={(e) => handleEditIngredientChange(index, idx, 'price', e.target.value)}
                                placeholder='Price'
                              />
                            </div>
                          ) : (
                            `${ingredient.ingredient} - ${ingredient.quantity} ( Rs.${ingredient.price} )`
                          )}
                        </li>
                      ))}
                    </ul>
                    {editMode === index && (
                      <button className='btn btn-success mt-2' onClick={() => saveEditedDish(index)}>Save Changes</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DishIngredients;