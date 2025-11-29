import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

/**
 * Home page shows a hero section and a small featured product grid.
 */
const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/products?limit=8");
        setProducts(res.data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <h1>Discover Your Style</h1>
          <p>
            Browse a curated collection of clothing for Men, Women and Kids.
            Simple shopping experience, powered by a robust MERN backend.
          </p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="link-inline">
            View all
          </Link>
        </div>
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {products.length === 0 && <p>No products loaded yet.</p>}
        </div>
      </section>
    </div>
  );
};

export default Home;
