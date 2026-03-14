// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { ROLE_HOME } from './AuthService';

/**
 * <ProtectedRoute>                         — requires any login
 * <ProtectedRoute role="ROLE_SELLER">      — requires exact role
 * <ProtectedRoute role={["ROLE_ADMIN","ROLE_SELLER"]}> — requires one of
 */
export default function ProtectedRoute({ children, role }) {
  const { isLoggedIn, role: userRole } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  if (role) {
    const allowed = Array.isArray(role) ? role : [role];
    if (!allowed.includes(userRole)) {
      // Wrong role — send to their own home
      return <Navigate to={ROLE_HOME[userRole] || '/'} replace />;
    }
  }

  return children;
}