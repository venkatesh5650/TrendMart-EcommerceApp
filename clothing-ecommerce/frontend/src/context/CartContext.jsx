import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);
const LOCAL_STORAGE_KEY = "clothing_cart";

/**
 * Helper to read cart from localStorage for guest users.
 */
const getGuestCart = () => {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveGuestCart = (items) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load initial cart based on authentication state.
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (user) {
          const res = await api.get("/api/cart");
          const mapped = res.data.items.map((item) => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
            size: item.size,
            qty: item.qty,
          }));
          setItems(mapped);
        } else {
          setItems(getGuestCart());
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  const syncServerCart = async (newItems) => {
    try {
      // For simplicity we will call /merge with the updated items array.
      await api.post("/api/cart/merge", {
        items: newItems.map((i) => ({
          product: i.product,
          size: i.size,
          qty: i.qty,
        })),
      });
    } catch (error) {
      console.error("Failed to sync server cart:", error);
    }
  };

  const addItem = async (product, size, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product === product._id && i.size === size
      );
      let updated;
      if (existing) {
        updated = prev.map((i) =>
          i.product === product._id && i.size === size
            ? { ...i, qty: i.qty + qty }
            : i
        );
      } else {
        updated = [
          ...prev,
          {
            product: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            qty,
          },
        ];
      }
      if (!user) saveGuestCart(updated);
      return updated;
    });

    if (user) {
      try {
        await api.post("/api/cart/add", {
          productId: product._id,
          size,
          qty,
        });
      } catch (error) {
        console.error("Failed to add to server cart:", error);
      }
    }
  };

  const updateQty = async (productId, size, qty) => {
    setItems((prev) => {
      const updated = prev
        .map((i) =>
          i.product === productId && i.size === size ? { ...i, qty } : i
        )
        .filter((i) => i.qty > 0);
      if (!user) saveGuestCart(updated);
      return updated;
    });

    if (user) {
      try {
        await api.put("/api/cart/update", {
          productId,
          size,
          qty,
        });
      } catch (error) {
        console.error("Failed to update server cart:", error);
      }
    }
  };

  const removeItem = async (productId, size) => {
    setItems((prev) => {
      const updated = prev.filter(
        (i) => !(i.product === productId && i.size === size)
      );
      if (!user) saveGuestCart(updated);
      return updated;
    });

    if (user) {
      try {
        await api.delete("/api/cart/remove", {
          data: { productId, size },
        });
      } catch (error) {
        console.error("Failed to remove from server cart:", error);
      }
    }
  };

  const clearCart = () => {
    setItems([]);
    if (!user) saveGuestCart([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
