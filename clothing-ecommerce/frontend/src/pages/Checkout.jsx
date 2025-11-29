import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

/**
 * Checkout page shows a summary and allows the user to place an order.
 * Payment is mocked (no real payment integration).
 */
const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/orders");
      clearCart();
      navigate(`/order/${res.data._id}`, { state: { order: res.data } });
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="page">
        <p>No items in cart. Add some products first.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Checkout</h2>
      <div className="checkout-layout">
        <div className="checkout-items">
          {items.map((item) => (
            <div
              key={`${item.product}-${item.size}`}
              className="checkout-item"
            >
              <div>
                <h4>{item.name}</h4>
                <p>
                  Size: {item.size} | Qty: {item.qty}
                </p>
              </div>
              <p>₹{item.price * item.qty}</p>
            </div>
          ))}
        </div>
        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {items.length}</p>
          <p>Total Amount: ₹{total}</p>
          <button
            className="btn-primary full-width"
            onClick={placeOrder}
            disabled={loading}
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
