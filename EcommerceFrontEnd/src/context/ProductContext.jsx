// src/context/ProductContext.jsx
import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

const ProductContext = createContext(null);

const INITIAL = {
  searchQuery:    '',
  activeCategory: '',
  filters: {
    minPrice:  0,
    maxPrice:  100000,
    rating:    0,
    sortBy:    'relevance',   // 'relevance' | 'price_asc' | 'price_desc' | 'rating'
  },
};

function productReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query };
    case 'SET_CATEGORY':
      return { ...state, activeCategory: action.category };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.filters } };
    case 'RESET_FILTERS':
      return { ...state, filters: INITIAL.filters, searchQuery: '' };
    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, INITIAL);

  const setSearch      = useCallback((query)    => dispatch({ type: 'SET_SEARCH',   query }),    []);
  const setCategory    = useCallback((category) => dispatch({ type: 'SET_CATEGORY', category }), []);
  const setFilter      = useCallback((filters)  => dispatch({ type: 'SET_FILTER',   filters }),  []);
  const resetFilters   = useCallback(()         => dispatch({ type: 'RESET_FILTERS' }),           []);

  const value = useMemo(() => ({
    ...state,
    setSearch,
    setCategory,
    setFilter,
    resetFilters,
  }), [state, setSearch, setCategory, setFilter, resetFilters]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export const useProduct = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProduct must be used inside <ProductProvider>');
  return ctx;
};