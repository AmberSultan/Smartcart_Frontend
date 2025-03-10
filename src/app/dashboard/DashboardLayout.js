import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Utensils, List, Leaf, Soup, Home, ShoppingCart } from "lucide-react";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldSidebarBeOpen = isSidebarOpen || windowWidth > 768;

  return (
    <>
      <nav className="dashboard-navbar">
        <button className="hamburger-icon" onClick={toggleSidebar}>
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* <h2>Dashboard</h2> */}
        
      </nav>

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className={`sidebar ${shouldSidebarBeOpen ? "open" : ""}`}>
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <Link to="/dashboard" className={location.pathname === "/dashboard/home" ? "active" : ""}>
                <Home size={16} className="icon" /> Home
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/dashboard/meal-category" className={location.pathname.includes("/dashboard/meal-category") ? "active" : ""}>
                <Utensils size={16} className="icon" /> Meal Category
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/dashboard/dish" className={location.pathname.endsWith("/dashboard/dish") ? "active" : ""}>
                <List size={16} className="icon" /> Dish
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/dashboard/ingredients" className={location.pathname.includes("/dashboard/ingredients") ? "active" : ""}>
                <Leaf size={16} className="icon" /> Ingredients
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/dashboard/dishingredients" className={location.pathname.endsWith("/dashboard/dishingredients") ? "active" : ""}>
                <Soup size={16} className="icon" /> Dish Ingredients
              </Link>
            </li>
            <li className="sidebar-item">
              <Link to="/dashboard/cart-orders" className={location.pathname === "/dashboard/cartorders" ? "active" : ""}>
                <ShoppingCart size={16} className="icon" /> Cart Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Main content area */}
        <div className="mainContent">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
