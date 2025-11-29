import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";

/**
 * Order success page.
 * Displays a simple confirmation with order id. For more detailed view,
 * backend API can be called using the order id.
 */
const OrderSuccess = () => {
  const { id } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="page">
      <h2>Order Placed Successfully 🎉</h2>
      <p>Your order ID is: {id}</p>
      {order && (
        <div className="order-success-summary">
          <p>
            Total Items:{" "}
            {order.items.reduce((sum, item) => sum + item.qty, 0)}
          </p>
          <p>Total Amount: ₹{order.totalPrice}</p>
        </div>
      )}
      <p>
        A confirmation email (with order summary) will be sent to your
        registered email address.
      </p>
      <Link to="/products" className="btn-primary">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
