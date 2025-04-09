import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'; // Import toast and Toaster

import './HomePage.css';
import Testimonials from './Testimonials';
import Navbar from './Navbar';
import Footer from './Footer';
import MealCategories from './MealCategories';

import AOS from 'aos';
import 'aos/dist/aos.css';

function HomePage() {
  const [recipes, setRecipes] = useState([]); // State to store fetched recipes
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Static image mapping based on dish name
  const imageMap = {
    'Chicken Karahi':
      'https://images.unsplash.com/photo-1694579740719-0e601c5d2437?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Lasagna:
      'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Chicken Biryani':
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Beef Burger':
      'https://images.unsplash.com/photo-1543392765-620e968d2162?q=80&w=1387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init();

    // Fetch recipes from the API
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipe-ingredients/dish-ingredient`);
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data); // Update state with fetched recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [BASE_URL]); // Dependency array includes BASE_URL

  // Filter recipes to only include Chicken Biryani, Lasagna, Chicken Karahi, and Beef Burger
  const allowedDishes = ['Chicken Biryani', 'Lasagna', 'Chicken Karahi', 'Beef Burger'];
  const filteredRecipes = recipes.filter((recipe) => allowedDishes.includes(recipe.dish));

  // Handle form submission for subscription
  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    toast.success("Thank you for subscribing!"); // Show toast message
  };

  return (
    <div>
      <Navbar />
      <Toaster />

      <div className="herosection1">
        <img className="herosectionimg" src="/images/herosection1.jpg" alt="herosection" />

        
        <div className="herosection-content">
          <h1 data-aos="fade-up" className="heroheadinghome">
            BUY GROCERIES WITH <span className="greensmart">SMART</span>
            <span className="yellowcart">CART</span>
          </h1>
          <p data-aos="fade-right" className="herotexthome">
            Effortless meal planning and grocery shopping at your fingertips
          </p>
          <div className="cta-block mt-4">
            <Link to="/planmeal" className="btn btn-success me-3">Plan a Meal</Link>
            <Link to="/about" className="btn btn-outline-light">Our Story</Link>
          </div>
        </div>
      </div>

      {/* All Categories Section */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="allcategoryheading">Weekly Special</h2>
        </div>

        {/* Main Content */}
        <div className="row categorygrid gy-4">
          <div className="col-12 col-md-6 col-lg-2 mb-4 fandv me-1">
            <div className="text-center">
              <img className="fandvimg img-fluid" alt="fandv" src="/images/fandv.png" />
              <p className="fandvtext">Chicken Bread</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4 me-1">
            <div className="row milk mb-1">
              <div className="col-6">
                <p className="oiltext">Tomato Pasta</p>
              </div>
              <div className="col-6">
                <img className="fandvimg img-fluid" alt="milk" src="/images/milk1.png" />
              </div>
            </div>
            <div className="row bread">
              <div className="col-6">
                <p className="oiltext">Chicken Tender</p>
              </div>
              <div className="col-6">
                <img className="breadimg img-fluid" alt="bread" src="/images/bread1.png" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4 me-1">
            <div className="row mb-1 oil">
              <div className="col-6">
                <p className="oiltext">BluBerry Custard</p>
              </div>
              <div className="col-6">
                <img className="oilimg img-fluid" alt="oil" src="/images/oil1.png" />
              </div>
            </div>
            <div className="row noodles">
              <div className="col-6">
                <p className="oiltext">Chocolate Brownie</p>
              </div>
              <div className="col-6">
                <img className="fandvimg img-fluid" alt="noodles" src="/images/noodles1.png" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3 mb-4 snacks">
            <div className="d-flex align-items-center flex-wrap">
              <p className="oiltext mb-0 me-3 text-center">Cinnamon Rolls</p>
              <img className="snackimg img-fluid" alt="snacks" src="/images/snacks1.png" />
            </div>
          </div>
        </div>
      </div>

      <MealCategories />

      {/* POPULAR RECIPES */}
      <div className="container my-4 mb-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title allcategoryheading">Popular Recipes</h2>
          <Link to="/recipes" className="view-all-recipe">View All</Link>
        </div>
        <div className="row popularrecipegrid g-4">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="col-6 col-sm-6 col-md-4 col-lg-3">
              <div className="card popularrecipe-card position-relative">
                <img
                  src={imageMap[recipe.dish] || 'https://via.placeholder.com/150'} // Map image or use fallback
                  alt={recipe.dish}
                  className="card-img-top recipe-img"
                />
                {/* <Link to={`/ingredients`}>
                <button className="add-to-cart-btn btn btn-success position-absolute">
                  <span className="plus-icon">+</span>
                </button>
                </Link> */}
                <div className="card-body">
                  <h5 className="card-title popularecipletitle">{recipe.dish}</h5>
                  <Link to={`/ingredients`} state={{ selectedDishes: [recipe.dish] }}>
  <button className="btn view-recipe-btn">Quick Review</button>
</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h2 className="section-title allcategoryheading happytext">What happy customers say about us</h2>
      </div>
      <Testimonials />

      {/* BLOG SECTION */}
      <div className="container my-5">
        <div className="row align-items-center">
          {/* Left Section */}
          <div className="col-md-6">
            <h2 className="fw-bold latest textleftblog allcategoryheading">Latest From Our Blog</h2>
            <p className="subheading textleftblog subheadingCategory">
              Stay inspired with the latest recipes, cooking tips, and exclusive offers. Subscribe to our blog and never miss a bite!
            </p>
            <form className="d-flex blogform" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="form-control subscribeemail me-2"
                placeholder="Enter Email address"
                required // Optional: Ensures email is entered
              />
              <button type="submit" className="btn btn-dark subscribe">SUBSCRIBE</button>
            </form>
          </div>

          {/* Right Section */}
          <div className="col-md-6">
            <div className="card border-0 shadow-sm">
              <div className="position-relative">
                <img
                  src="/images/blogimg.png"
                  alt="Blog Thumbnail"
                  className="card-img-top rounded"
                  style={{ objectFit: 'cover', height: '300px' }}
                />
                <div
                  className="date position-absolute top-0 end-0 bg-dark text-white px-3 py-1 rounded"
                  style={{ fontSize: '0.8rem', margin: '10px' }}
                >
                  Posted on: 01 Feb, 2025
                </div>
                <div
                  className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3 d-flex flex-column align-items-start"
                  style={{ height: '100%', justifyContent: 'flex-end' }}
                >
                  <h5 className="card-title mb-2 quickblog text-decoration-underline">10 Quick Weeknight Meals</h5>
                  <Link to="/blog" className="btn btn-success readnow">READ NOW</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
}

export default HomePage;