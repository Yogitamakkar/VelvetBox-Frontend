// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

const ACTIONS = {
  ADD:         'ADD',
  REMOVE:      'REMOVE',
  UPDATE_QTY:  'UPDATE_QTY',
  CLEAR:       'CLEAR',
};

function cartReducer(state, action) {
  switch (action.type) {

    case ACTIONS.ADD: {
      const existing = state.find(i => i.id === action.item.id);
      if (existing) {
        // Already in cart — bump quantity
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

// Load initial cart from localStorage
function loadCart() {
  try {
    const saved = localStorage.getItem('vb_cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem('vb_cart', JSON.stringify(items));
  }, [items]);

  const addToCart     = useCallback((item)           => dispatch({ type: ACTIONS.ADD,        item }),        []);
  const removeFromCart = useCallback((id)             => dispatch({ type: ACTIONS.REMOVE,     id }),          []);
  const updateQuantity = useCallback((id, quantity)   => dispatch({ type: ACTIONS.UPDATE_QTY, id, quantity }), []);
  const clearCart      = useCallback(()               => dispatch({ type: ACTIONS.CLEAR }),                    []);

  const value = useMemo(() => {
    const totalItems    = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal      = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee   = subtotal > 500 ? 0 : 25;   // free delivery above ₹500
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