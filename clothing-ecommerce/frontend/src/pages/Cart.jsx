import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";

/**
 * Cart page showing all cart items for both guest and logged-in users.
 */
const Cart = () => {
  const { items, total, updateQty, removeItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to complete checkout.");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="page">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Browse products</Link>.
        </p>
      ) : (
        <>
          <div className="cart-list">
            {items.map((item) => (
              <CartItem
                key={`${item.product}-${item.size}`}
                item={item}
                onQtyChange={(qty) => updateQty(item.product, item.size, qty)}
                onRemove={() => removeItem(item.product, item.size)}
              />
            ))}
          </div>
          <div className="cart-summary">
            <p>Total: ₹{total}</p>
            <button className="btn-primary full-width" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
