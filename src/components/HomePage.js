import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';
import Testimonials from './Testimonials';
import Navbar from './Navbar';
import Footer from './Footer';
import MealCategories from './MealCategories';

import AOS from 'aos'; 
import 'aos/dist/aos.css';

function HomePage() {
  useEffect(() => {
    // Initialize AOS after the component mounts
    AOS.init();
  }, []);

  const recipes = [
    {
      id: 1,
      title: 'Chicken Karahi',
      image: 'https://images.unsplash.com/photo-1694579740719-0e601c5d2437?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      title: 'Lasagna',
      image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      title: 'Chicken Biryani',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      title: 'Beef Burger',
      image: 'https://images.unsplash.com/photo-1543392765-620e968d2162?q=80&w=1387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    
  ];


  return (
    <div>
     
     <Navbar/>

      <div className="herosection1">
        <img className="herosectionimg" src="/images/herosection1.jpg" alt="herosection" />

        {/* Text and Search Bar */}
        <div className="herosection-content">
          <h1 data-aos="fade-up" className='heroheadinghome'>
            BUY GROCERIES WITH <span className="greensmart">SMART</span>
            <span className="yellowcart">CART</span>
          </h1>
          <p data-aos="fade-right" className='herotexthome'>
            Effortless meal planning and grocery shopping by directly adding recipe ingredients into cart
          </p>

          <div className="search-bar-container">
            <input type="text" className="search-bar herosearch" placeholder="Enter Dish you wanna make..." />
            <button className="search-btn herosearch">Search</button>
          </div>
        </div>
      </div>

  
      {/* All Categories Section */}
      <div className=" container">

  <div className="d-flex justify-content-between align-items-center mb-2">
    <h2 className="allcategoryheading">All Categories</h2>
    {/* <Link to="/categories" className="text-decoration-none text-success fw-semibold">
      View All
    </Link> */}
  </div>

  {/* Main Content */}
<div className="row categorygrid gy-4">
  <div className="col-12 col-md-6 col-lg-2 mb-4 fandv me-1">
    <div className="text-center">
      <img className="fandvimg img-fluid" alt="fandv" src="/images/fandv.png" />
      <p className="fandvtext">Fruits and Vegetables</p>
    </div>
  </div>
  <div className="col-12 col-md-6 col-lg-3 mb-4 me-1">
    <div className="row milk mb-1">
      <div className="col-6 ">
        <p className="oiltext">Dairy Products</p>
      </div>
      <div className="col-6">
        <img className="fandvimg img-fluid" alt="milk" src="/images/milk.png" />
      </div>
    </div>
    <div className="row bread">
      <div className="col-6">
        <p className="oiltext">Bakery</p>
      </div>
      <div className="col-6">
        <img className="breadimg img-fluid" alt="bread" src="/images/bread.png" />
      </div>
    </div>
  </div>
  <div className="col-12 col-md-6 col-lg-3 mb-4 me-1">
    <div className="row mb-1 oil">
      <div className="col-6">
        <p className="oiltext">Oil, Ghee, and Spices</p>
      </div>
      <div className="col-6">
        <img className="oilimg img-fluid" alt="oil" src="/images/oil.png" />
      </div>
    </div>
    <div className="row noodles">
      <div className="col-6">
        <p className="oiltext">Noodles and Pastas</p>
      </div>
      <div className="col-6">
        <img className="fandvimg img-fluid" alt="noodles" src="/images/noodles.png" />
      </div>
    </div>
  </div>
  <div className="col-12 col-md-6 col-lg-3 mb-4 snacks">
    <div className="d-flex align-items-center flex-wrap">
      <p className="oiltext mb-0 me-3 text-center">Variety of Beverages and Snacks</p>
      <img className="snackimg img-fluid" alt="snacks" src="/images/snacks.png" />
    </div>
  </div>
</div>



</div>

<MealCategories/>



{/* POPULAR RECIPES*/}

<div className="container my-4 mb-2">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="section-title allcategoryheading">Popular Recipes</h2>
    <Link to="/recipes" className="view-all-recipe">View All</Link>
  </div>
  <div className="row popularrecipegrid g-4">
    {recipes.map((recipe) => (
      <div key={recipe.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
        <div className="card popularrecipe-card position-relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="card-img-top recipe-img"
          />
          <button className="add-to-cart-btn btn btn-success position-absolute">
            <span className="plus-icon">+</span>
          </button>
          <div className="card-body">
            <h5 className="card-title popularecipletitle">{recipe.title}</h5>
           < Link to= '/ingredients'>
            <button className="btn view-recipe-btn">
              Quick Review
            </button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



{/* WHY CHOOSE SMARTCART */}
{/* 
<div className="container my-5">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="section-title allcategoryheading">Why choose SmartCart</h2>
    
  </div>

  
  </div> */}


{/* TESTIMONIALS */}

<div className="d-flex justify-content-between align-items-center mt-5">
    <h2 className="section-title allcategoryheading happytext">What happy customers say about us</h2>
    
  </div>

<Testimonials/>



{/* BLOG SECTION */}

<div className="container my-5">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-md-6">
          <h2 className="fw-bold latest textleftblog allcategoryheading">Latest From Our Blog</h2>
          <p className="subheading textleftblog subheadingCategory">
            Stay inspired with the latest recipes, cooking tips, and exclusive
            offers. Subscribe to our blog and never miss a bite!
          </p>
          <form className="d-flex blogform">
            <input
              type="email"
              className="form-control subscribeemail me-2"
              placeholder="Enter Email address"
            />
            <button type="submit" className="btn btn-dark subscribe">
              SUBSCRIBE
            </button>
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
        style={{ objectFit: "cover", height: "300px"}}
      />
      <div
        className="date position-absolute top-0 end-0 bg-dark text-white px-3 py-1 rounded"
        style={{ fontSize: "0.8rem", margin: "10px" }}
      >
        Posted on: 01 Feb, 2025
      </div>
      <div
        className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3 d-flex flex-column align-items-start"
        style={{ height: "100%", justifyContent: "flex-end" }}
      >
        <h5 className="card-title mb-2 quickblog text-decoration-underline">10 Quick Weeknight Meals</h5>
        <Link to="/" className="btn btn-success readnow">
          READ NOW
        </Link>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>


    {/* FOOTER SECTION */}

    <Footer/>

    </div>
  );
}

export default HomePage;
