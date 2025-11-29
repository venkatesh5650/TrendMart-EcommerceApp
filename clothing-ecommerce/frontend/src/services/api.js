import axios from "axios";

/**
 * Axios instance used across the frontend.
 * - `baseURL` points to the backend API.
 * - `withCredentials` allows cookies (JWT token) to be sent automatically.
 */
const api = axios.create({
  baseURL: "https://trendmart-ecommerceapp.onrender.com",
  withCredentials: true, // keep this for JWT cookie auth
});

export default api;
