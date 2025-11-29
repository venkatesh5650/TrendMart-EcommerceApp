/**
 * Centralized error handling middleware.
 * Ensures consistent error responses and helps debugging during development.
 */
const errorHandler = (err, req, res, next) => {
  console.error("Error middleware:", err);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = errorHandler;
