import React from 'react';
import './PopularRecipes.css';
import Navbar from './Navbar';

const recipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A classic Italian pasta dish.',
  },
  {
    id: 2,
    title: 'Chicken Tikka',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Flavorful grilled chicken.',
  },
  {
    id: 3,
    title: 'Vegetable Stir Fry',
    image: 'https://images.unsplash.com/photo-1695606452846-b71f5936dcf7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A quick and healthy stir fry.',
  },
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    image: 'https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'A classic Italian pasta dish.',
  },
  {
    id: 2,
    title: 'Chicken Tikka',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1550&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Flavorful grilled chicken.',
  }
];

function PopularRecipes() {
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
                      <button className="recipe-btn">Quick Review +</button>
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
