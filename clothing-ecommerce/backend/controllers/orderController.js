const Cart = require("../models/Cart");
const Order = require("../models/Order");
const { sendOrderEmail } = require("../utils/sendEmail");

/**
 * @desc    Create order from current user's cart
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      size: item.size,
      qty: item.qty,
      price: item.product.price,
    }));

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items,
      totalPrice,
      orderDate: new Date(),
    });

    // Clear cart after successful order creation
    cart.items = [];
    await cart.save();

    // Send order confirmation email (non-blocking best-effort)
    try {
      await sendOrderEmail(order, req.user);
    } catch (emailError) {
      console.error("Failed to send order confirmation email:", emailError.message);
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get orders of logged-in user
 * @route   GET /api/orders/my
 * @access  Private
 */
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
