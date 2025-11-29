const Cart = require("../models/Cart");

/**
 * Helper function to get or create a cart for the authenticated user.
 */
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate("items.product");
  }
  return cart;
};

/**
 * @desc    Get logged-in user's cart
 * @route   GET /api/cart
 * @access  Private
 */
const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart/add
 * @access  Private
 */
const addToCart = async (req, res, next) => {
  try {
    const { productId, size, qty } = req.body;

    if (!productId || !size || !qty) {
      return res.status(400).json({ message: "Product, size and quantity are required" });
    }

    const cart = await getOrCreateCart(req.user._id);

    const existingItem = cart.items.find(
      (item) =>
        item.product._id.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.items.push({ product: productId, size, qty });
    }

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update item quantity
 * @route   PUT /api/cart/update
 * @access  Private
 */
const updateCartItem = async (req, res, next) => {
  try {
    const { productId, size, qty } = req.body;

    const cart = await getOrCreateCart(req.user._id);

    const item = cart.items.find(
      (i) => i.product._id.toString() === productId && i.size === size
    );

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.qty = qty;
    if (item.qty <= 0) {
      cart.items = cart.items.filter(
        (i) => !(i.product._id.toString() === productId && i.size === size)
      );
    }

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/cart/remove
 * @access  Private
 */
const removeCartItem = async (req, res, next) => {
  try {
    const { productId, size } = req.body;

    const cart = await getOrCreateCart(req.user._id);

    cart.items = cart.items.filter(
      (i) => !(i.product._id.toString() === productId && i.size === size)
    );

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Merge guest cart with user's cart after login
 * @route   POST /api/cart/merge
 * @access  Private
 */
const mergeCart = async (req, res, next) => {
  try {
    const { items } = req.body; // [{product, size, qty}]
    let cart = await getOrCreateCart(req.user._id);

    if (Array.isArray(items)) {
      items.forEach((incoming) => {
        const existingItem = cart.items.find(
          (item) =>
            item.product._id.toString() === incoming.product &&
            item.size === incoming.size
        );

        if (existingItem) {
          existingItem.qty += incoming.qty;
        } else {
          cart.items.push({
            product: incoming.product,
            size: incoming.size,
            qty: incoming.qty,
          });
        }
      });
    }

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  mergeCart,
};
