import React from "react";
import { Link } from "react-router-dom";

/**
 * Reusable product card used on the home and product listing pages.
 */
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-body">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">₹{product.price}</p>
        <Link to={`/product/${product._id}`} className="btn-secondary full-width">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
