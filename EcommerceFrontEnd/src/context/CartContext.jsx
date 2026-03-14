// src/context/CartContext.jsx
// Hybrid cart: uses backend API when logged in, localStorage when not.
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import { cartApi, mapCartItem } from '../api/api';

const CartContext = createContext(null);

const ACTIONS = {
  SET:         'SET',
  ADD:         'ADD',
  REMOVE:      'REMOVE',
  UPDATE_QTY:  'UPDATE_QTY',
  CLEAR:       'CLEAR',
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET:
      return action.items ?? [];

    case ACTIONS.ADD: {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) {
        return state.map(i =>
          i.id === action.item.id
            ? { ...i, quantity: i.quantity + (action.item.quantity || 1) }
            : i
        );
      }
      return [...state, { ...action.item, quantity: action.item.quantity || 1 }];
    }

    case ACTIONS.REMOVE:
      return state.filter(i => i.id !== action.id);

    case ACTIONS.UPDATE_QTY:
      return state.map(i =>
        i.id === action.id
          ? { ...i, quantity: Math.max(1, action.quantity) }
          : i
      );

    case ACTIONS.CLEAR:
      return [];

    default:
      return state;
  }
}

function loadCart() {
  try {
    const saved = localStorage.getItem('vb_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function isLoggedIn() {
  return !!localStorage.getItem('vb_jwt');
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('vb_cart', JSON.stringify(items));
  }, [items]);

  // Sync from backend when user is logged in
  useEffect(() => {
    if (!isLoggedIn()) return;
    cartApi.get()
      .then((cart) => {
        const mapped = (cart.cartItems ?? []).map(mapCartItem).filter(Boolean);
        if (mapped.length > 0) {
          dispatch({ type: ACTIONS.SET, items: mapped });
        }
      })
      .catch(() => { /* backend unavailable, use localStorage */ });
  }, []);

  const addToCart = useCallback((item) => {
    dispatch({ type: ACTIONS.ADD, item });
    if (isLoggedIn()) {
      cartApi.addItem(item.id, item.size, item.quantity || 1).catch(() => {});
    }
  }, []);

  const removeFromCart = useCallback((id, cartItemId) => {
    dispatch({ type: ACTIONS.REMOVE, id });
    if (isLoggedIn()) {
      cartApi.removeItem(cartItemId || id).catch(() => {});
    }
  }, []);

  const updateQuantity = useCallback((id, quantity, cartItemId) => {
    dispatch({ type: ACTIONS.UPDATE_QTY, id, quantity });
    if (isLoggedIn()) {
      cartApi.updateItem(cartItemId || id, quantity).catch(() => {});
    }
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR });
  }, []);

  const value = useMemo(() => {
    const totalItems    = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal      = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee   = subtotal > 500 ? 0 : 25;
    const total         = subtotal + deliveryFee;

    return {
      items, totalItems, subtotal, deliveryFee, total,
      addToCart, removeFromCart, updateQuantity, clearCart,
    };
  }, [items, addToCart, removeFromCart, updateQuantity, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
