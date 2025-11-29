import axios from "axios";

/**
 * Axios instance used across the frontend.
 * - `baseURL` points to the backend API.
 * - `withCredentials` allows cookies (JWT token) to be sent automatically.
 */
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default api;
