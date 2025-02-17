import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Page from '../src/components/beforeSignup/Page';
import Login from '../src/app/loginsignup/Login';
import Signup from '../src/app/loginsignup/Signup';
import HomePage from './components/HomePage';
import PopularRecipes from './components/PopularRecipes';
import Ingredients from './components/Ingredients';
import MealChoice from "./components/MealChoice";
import Cart from './components/Cart';



function App() {
  return (
    <BrowserRouter>  
      <div className="App">
      <Routes>
          <Route path="/" element={<Page />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} /> 
          <Route path='/recipes' element={<PopularRecipes/>} />
          <Route path='/ingredients' element={<Ingredients/>} />
          <Route path="/meal-choices/:category" element={<MealChoice />} />
          <Route path='/cart' element={<Cart/>} />

        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
