import React, { useState, useEffect } from 'react';
import './PopularRecipes.css';
import Navbar from './Navbar';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dishes we want to check with their corresponding images
  const dishesToCheck = {
    'Chicken Karahi': 'https://images.unsplash.com/photo-1626501418910-8c839ac2dcdb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Lasagna': 'https://images.unsplash.com/photo-1632778145676-4e7a6a389ac9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Chicken Biryani': 'https://images.unsplash.com/photo-1604151949097-5414d0b2e82f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
    'Beef Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3'
  };

  // Descriptions for each dish
  const dishDescriptions = {
    'Chicken Karahi': 'Spicy Pakistani chicken curry.',
    'Lasagna': 'Layered Italian pasta dish.',
    'Chicken Biryani': 'Fragrant spiced rice with chicken.',
    'Beef Burger': 'Juicy beef patty in a bun.'
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/recipe-ingredients/dish-ingredient`);
        const data = await response.json();

        // Map over the desired dishes and check if they exist in the API response
        const filteredRecipes = Object.keys(dishesToCheck).map((dishName, index) => {
          const foundDish = data.find(item => item.dish.toLowerCase() === dishName.toLowerCase());
          return {
            id: foundDish ? (foundDish.id || foundDish._id) : `not-found-${index}`,
            title: dishName,
            image: foundDish ? dishesToCheck[dishName] : 'https://via.placeholder.com/150?text=Not+Found',
            description: foundDish ? dishDescriptions[dishName] : 'This dish is not available in our database.',
            found: !!foundDish
          };
        });

        setRecipes(filteredRecipes);
      } catch (err) {
        setError('Failed to fetch recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="recipecart">
        <h1 className="recipeheading">Discover Your Next Favorite Dish!</h1>
        <div className="container">
          <div className="row">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col-md-6 mb-4">
                <div className="recipe-card">
                  <div className="row align-items-center">
                    <div className="col-4">
                      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                    </div>
                    <div className="col-8 recipecardright">
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <p className="recipe-description">{recipe.description}</p>
                      {recipe.found && (
                        <button className="recipe-btn">Quick Review +</button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularRecipes;