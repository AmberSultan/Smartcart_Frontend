import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './PopularRecipes.css';
import Navbar from './Navbar';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dishes we want to check with their corresponding images
  const dishesToCheck = {
    'Chicken Karahi':
    'https://images.unsplash.com/photo-1694579740719-0e601c5d2437?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  Lasagna:
    'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Chicken Biryani':
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'Beef Burger':
    'https://images.unsplash.com/photo-1543392765-620e968d2162?q=80&w=1387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
                        <Link
                          to="/ingredients"
                          state={{ selectedDishes: [recipe.title] }} // Pass the dish name as an array
                        >
                          <button className="recipe-btn">Quick Review +</button>
                        </Link>
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