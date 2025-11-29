const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Authentication middleware.
 * - Reads JWT from HTTP-only cookie named "jwt".
 * - Verifies token and attaches user information to the request object.
 */
const protect = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = { protect };
