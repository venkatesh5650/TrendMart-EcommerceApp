const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  mergeCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove", protect, removeCartItem);
router.post("/merge", protect, mergeCart);

module.exports = router;
