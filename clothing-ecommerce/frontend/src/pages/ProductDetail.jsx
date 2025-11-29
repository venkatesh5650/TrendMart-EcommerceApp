import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

/**
 * Product detail page with size selection and Add to Cart.
 */
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to load product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size");
      return;
    }
    addItem(product, size, qty);
    alert("Item added to cart");
  };

  if (!product) return <div className="page">Loading...</div>;

  return (
    <div className="page">
      <div className="product-detail">
        <img
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <div className="product-detail-body">
          <h2>{product.name}</h2>
          <p className="product-detail-category">{product.category}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-price">₹{product.price}</p>

          <div className="product-detail-options">
            <div className="option-group">
              <label>Size</label>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-pill ${size === s ? "active" : ""}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </div>
          </div>

          <button className="btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
