import React from "react";

/**
 * Cart item row used in the Cart page.
 */
const CartItem = ({ item, onQtyChange, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <img src={item.image} alt={item.name} className="cart-item-image" />
        <div>
          <h4>{item.name}</h4>
          <p>Size: {item.size}</p>
          <p>Price: ₹{item.price}</p>
        </div>
      </div>
      <div className="cart-item-actions">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => onQtyChange(Number(e.target.value))}
        />
        <button className="btn-outline" onClick={onRemove}>
          Remove
        </button>
        <p className="cart-item-subtotal">₹{item.price * item.qty}</p>
      </div>
    </div>
  );
};

export default CartItem;
