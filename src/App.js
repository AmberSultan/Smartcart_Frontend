import React from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Page from '../src/components/beforeSignup/Page';
import Login from '../src/app/loginsignup/Login';
import Signup from '../src/app/loginsignup/Signup';
import HomePage from './components/HomePage';
import PopularRecipes from './components/PopularRecipes';
import Ingredients from './components/Ingredients';
import MealChoice from "./components/MealChoice";
import Cart from './components/Cart';
import YourCart from './components/YourCart';
import Checkout from './components/Checkout';
import Delivery from './components/Delivery';

import About from './components/About';
import Chatbot from './components/Chatbot';



/* ADMIN DASHBOARD ROUTES */

import DashboardLayout from './app/dashboard/DashboardLayout';
import HomeAdmin from './app/dashboard/left-side/HomeAdmin';
import MealCategoryAdmin from './app/dashboard/left-side/MealCategoryAdmin';
import DishAdmin from './app/dashboard/left-side/DishAdmin';
import IngredientsAdmin from './app/dashboard/left-side/IngredientsAdmin';
import DishIngredients from './app/dashboard/left-side/DishIngredients';
import CartItem from './app/dashboard/left-side/CartItem';
import Blog from './components/Blog';


function App() {
  return (
    <>
    <BrowserRouter>  
      <div className="App">
      <Routes>

         {/* USER SIDE ROUTES  */}
          <Route path="/" element={<Page />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} /> 
          <Route path='/recipes' element={<PopularRecipes/>} />
          <Route path='/ingredients' element={<Ingredients/>} />
          <Route path="/meal-choices/:category" element={<MealChoice />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/your-cart' element={<YourCart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/delivery' element={<Delivery/>} />

          <Route path='/about' element={<About/>} />
          <Route path='/planmeal' element={<Chatbot/>}/>
          <Route path='/blog' element={<Blog/>}/>


        {/* DASHBOARD ROUTES */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path='' element={<HomeAdmin />} />
          <Route path='meal-category' element={<MealCategoryAdmin />} />
          <Route path='dish' element={<DishAdmin />} />
          <Route path='ingredients' element={<IngredientsAdmin />} />
          <Route path='dishingredients' element={<DishIngredients />} />
          <Route path='cart-orders' element={< CartItem />} />

        </Route>


        </Routes>
        
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
