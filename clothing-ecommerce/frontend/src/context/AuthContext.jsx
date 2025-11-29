import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to fetch current user on initial load to persist login state.
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/api/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const register = async (payload) => {
    const res = await api.post("/api/auth/register", payload);
    setUser(res.data);
    return res.data;
  };

  const login = async (payload, guestCartItems) => {
    const res = await api.post("/api/auth/login", payload);
    setUser(res.data);

    // Merge guest cart with server cart after successful login.
    if (guestCartItems && guestCartItems.length > 0) {
      await api.post("/api/cart/merge", { items: guestCartItems });
    }

    return res.data;
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
