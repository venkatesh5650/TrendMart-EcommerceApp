const mongoose = require("mongoose");

/**
 * Product schema represents clothing items in the catalog.
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
    },
    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      required: [true, "Product category is required"],
    },
    sizes: [
      {
        type: String,
        enum: ["S", "M", "L", "XL"],
      },
    ],
    stock: {
      type: Number,
      default: 100,
      min: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
