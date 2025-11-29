const mongoose = require("mongoose");

/**
 * Connect to MongoDB using Mongoose.
 * This function is imported and executed in server.js during app startup.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 6+ uses sensible defaults; explicit options not required.
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure so issues are surfaced early.
  }
};

module.exports = connectDB;
