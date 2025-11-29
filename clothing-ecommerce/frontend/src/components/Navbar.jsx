import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

/**
 * Navigation bar displayed at the top of all pages.
 * Contains links to core flows and shows basic user/cart information.
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">
          TrendMart
        </Link>
        <nav className="nav-links">
          <Link to="/products">Shop</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </nav>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="user-label">Hi, {user.name}</span>
            <button className="btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
