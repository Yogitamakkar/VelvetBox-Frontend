// src/context/WishlistContext.jsx
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

const WishlistContext = createContext(null);

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.find(i => i.id === action.item.id);
      return exists
        ? state.filter(i => i.id !== action.item.id)   // remove
        : [...state, action.item];                       // add
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function loadWishlist() {
  try {
    const saved = localStorage.getItem('vb_wishlist');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(wishlistReducer, [], loadWishlist);

  useEffect(() => {
    localStorage.setItem('vb_wishlist', JSON.stringify(items));
  }, [items]);

  const toggleWishlist  = useCallback((item) => dispatch({ type: 'TOGGLE', item }), []);
  const removeFromWishlist = useCallback((id) => dispatch({ type: 'REMOVE', id }),  []);
  const clearWishlist   = useCallback(()      => dispatch({ type: 'CLEAR' }),        []);
  const isWishlisted    = useCallback((id)    => items.some(i => i.id === id),       [items]);

  const value = useMemo(() => ({
    items,
    totalItems: items.length,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
    isWishlisted,
  }), [items, toggleWishlist, removeFromWishlist, clearWishlist, isWishlisted]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside <WishlistProvider>');
  return ctx;
};