// src/context/WishlistContext.jsx
// Hybrid wishlist: uses backend API when logged in, localStorage when not.
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';
import { wishlistApi, mapProduct } from '../api/api';

const WishlistContext = createContext(null);

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.items ?? [];
    case 'TOGGLE': {
      const exists = state.find(i => i.id === action.item.id);
      return exists
        ? state.filter(i => i.id !== action.item.id)
        : [...state, action.item];
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

function isLoggedIn() {
  return !!localStorage.getItem('vb_jwt');
}

export function WishlistProvider({ children }) {
  const [items, dispatch] = useReducer(wishlistReducer, [], loadWishlist);

  useEffect(() => {
    localStorage.setItem('vb_wishlist', JSON.stringify(items));
  }, [items]);

  // Sync from backend when user is logged in
  useEffect(() => {
    if (!isLoggedIn()) return;
    wishlistApi.get()
      .then((wishlist) => {
        const products = wishlist.products ?? [];
        if (products.length > 0) {
          const mapped = products.map(p => {
            const mp = mapProduct(p);
            return { id: mp.id, name: mp.name, price: mp.price, image: mp.image };
          });
          dispatch({ type: 'SET', items: mapped });
        }
      })
      .catch(() => { /* backend unavailable */ });
  }, []);

  const toggleWishlist = useCallback((item) => {
    dispatch({ type: 'TOGGLE', item });
    if (isLoggedIn()) {
      wishlistApi.toggleProduct(item.id).catch(() => {});
    }
  }, []);

  const removeFromWishlist = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
    // Backend toggle also removes, so we call toggle
    if (isLoggedIn()) {
      wishlistApi.toggleProduct(id).catch(() => {});
    }
  }, []);

  const clearWishlist = useCallback(() => dispatch({ type: 'CLEAR' }), []);
  const isWishlisted  = useCallback((id) => items.some(i => i.id === id), [items]);

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
