
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { authService, ROLES } from './AuthService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [jwt,  setJwt]  = useState(() => {
    // Validate session on boot — clear if JWT expired
    if (!authService.isSessionValid()) { authService.clearSession(); return null; }
    return authService.getJwt();
  });
  const [role, setRole] = useState(() => authService.getRole());

  // Persist and update state after any successful auth call
  const _persist = useCallback((data) => {
    authService.saveSession(data.jwt, data.role);
    setJwt(data.jwt);
    setRole(authService.getRole()); // use stored (JWT-derived) role
    return data;
  }, []);

  const sendOtp           = useCallback((p) => authService.sendOtp(p), []);
  const loginWithOtp      = useCallback((p) => authService.loginWithOtp(p).then(_persist), [_persist]);
  const loginWithPassword = useCallback((p) => authService.loginWithPassword(p).then(_persist), [_persist]);
  const signup            = useCallback((p) => authService.signup(p).then(_persist), [_persist]);

  const logout = useCallback(() => {
    authService.clearSession();
    setJwt(null);
    setRole(null);
  }, []);

  const value = useMemo(() => ({
    jwt, role,
    isLoggedIn: !!jwt,
    isAdmin:    role === ROLES.ADMIN,
    isSeller:   role === ROLES.SELLER,
    isCustomer: role === ROLES.CUSTOMER,
    sendOtp, loginWithOtp, loginWithPassword, signup, logout,
  }), [jwt, role, sendOtp, loginWithOtp, loginWithPassword, signup, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};