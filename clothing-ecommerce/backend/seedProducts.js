const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();

/**
 * Demo product data to seed the database.
 * Contains more than 20 products across Men, Women and Kids categories.
 */
const products = [
  {
    name: "Classic White T-Shirt",
    description: "Soft cotton crew neck t-shirt perfect for everyday wear.",
    price: 499,
    image: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Slim Fit Blue Jeans",
    description: "Stretchable slim fit jeans with a modern look.",
    price: 1499,
    image: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Black Hoodie",
    description: "Cozy fleece hoodie with kangaroo pocket.",
    price: 1299,
    image: "https://images.pexels.com/photos/6311579/pexels-photo-6311579.jpeg",
    category: "Men",
    sizes: ["M", "L", "XL"],
    stock: 35,
  },
  {
    name: "Formal Blue Shirt",
    description: "Full sleeve slim fit shirt for office wear.",
    price: 999,
    image: "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    name: "Sporty Joggers",
    description: "Comfortable joggers with elastic waistband.",
    price: 899,
    image: "https://images.pexels.com/photos/7671163/pexels-photo-7671163.jpeg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 45,
  },
  {
    name: "Floral Summer Dress",
    description: "Lightweight floral dress for casual outings.",
    price: 1599,
    image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 30,
  },
  {
    name: "High Waist Denim Skirt",
    description: "Trendy high waist skirt with front buttons.",
    price: 1199,
    image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25,
  },
  {
    name: "Striped Casual Top",
    description: "Striped half sleeve top for daily wear.",
    price: 799,
    image: "https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Black Leggings",
    description: "Stretchable leggings for comfort and style.",
    price: 699,
    image: "https://images.pexels.com/photos/3738084/pexels-photo-3738084.jpeg",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 50,
  },
  {
    name: "Denim Jacket",
    description: "Classic denim jacket ideal for layering.",
    price: 1799,
    image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 20,
  },
  {
    name: "Kids Graphic T-Shirt",
    description: "Fun printed t-shirt for kids.",
    price: 399,
    image: "https://images.pexels.com/photos/1100790/pexels-photo-1100790.jpeg",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 60,
  },
  {
    name: "Kids Denim Shorts",
    description: "Comfortable shorts for active kids.",
    price: 499,
    image: "https://images.pexels.com/photos/1002634/pexels-photo-1002634.jpeg",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 45,
  },
  {
    name: "Kids Hoodie",
    description: "Warm hoodie suitable for winter.",
    price: 899,
    image: "https://images.pexels.com/photos/3661550/pexels-photo-3661550.jpeg",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  {
    name: "Kids Track Pants",
    description: "Soft and durable track pants.",
    price: 599,
    image: "https://images.pexels.com/photos/1813922/pexels-photo-1813922.jpeg",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 40,
  },
  {
    name: "Checked Casual Shirt",
    description: "Casual checked shirt for outings.",
    price: 1099,
    image: "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    name: "Polo T-Shirt",
    description: "Classic polo t-shirt with collar.",
    price: 899,
    image: "https://images.pexels.com/photos/1002638/pexels-photo-1002638.jpeg",
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
  },
  {
    name: "Office Pencil Skirt",
    description: "Elegant pencil skirt for office wear.",
    price: 1399,
    image: "https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg",
    category: "Women",
    sizes: ["S", "M", "L"],
    stock: 25,
  },
  {
    name: "Printed Kurti",
    description: "Comfortable printed kurti for daily wear.",
    price: 999,
    image: "https://images.pexels.com/photos/3746211/pexels-photo-3746211.jpeg",
    category: "Women",
    sizes: ["S", "M", "L", "XL"],
    stock: 35,
  },
  {
    name: "Kids Party Dress",
    description: "Cute party dress for special occasions.",
    price: 1499,
    image: "https://images.pexels.com/photos/1435823/pexels-photo-1435823.jpeg",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 20,
  },
  {
    name: "Kids Cotton Pajama Set",
    description: "Soft pajama set for comfortable sleep.",
    price: 799,
    image: "https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg",
    category: "Kids",
    sizes: ["S", "M", "L"],
    stock: 30,
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
};

seedProducts();
