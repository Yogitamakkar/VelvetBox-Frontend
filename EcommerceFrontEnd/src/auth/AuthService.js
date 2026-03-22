// services/authService.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// ── Role constants — single source of truth across the app ──────────────────
// These must match your Spring Boot USER_ROLE enum exactly
export const ROLES = {
  ADMIN:    'ROLE_ADMIN',
  CUSTOMER: 'ROLE_CUSTOMER',
  SELLER:   'ROLE_SELLER',
};

// Route each role to its home path after login
export const ROLE_HOME = {
  [ROLES.ADMIN]:    '/admin',
  [ROLES.SELLER]:   '/seller',
  [ROLES.CUSTOMER]: '/',
};

// ── Decode JWT payload without a library ────────────────────────────────────
export function decodeJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

async function post(path, body) {
  const res  = await fetch(`${BASE_URL}${path}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export const authService = {
  // ── 1. Send OTP ─────────────────────────────────────────────────────────
  sendOtp({ email, role, purpose }) {
    return post('/auth/sent/login-signup-otp', { email, role, purpose });
  },

  // ── 2. Verify OTP ───────────────────────────────────────────────────────
  loginWithOtp({ email, otp, role }) {
    return post('/auth/signin-otp', { email, otp, role });
  },

  // ── 3. Password login ────────────────────────────────────────────────────
  loginWithPassword({ email, password, role }) {
    return post('/auth/login-signin-password', { email, password, role });
  },

  // ── 4. Signup ────────────────────────────────────────────────────────────
  signup({ fullName, email, password, otp }) {
    return post('/auth/signup', { fullName, email, password, otp });
  },

  // ── Session ──────────────────────────────────────────────────────────────
  saveSession(jwt, role) {
    localStorage.setItem('vb_jwt', jwt);
    // Derive role from JWT payload first — covers all 3 roles (ADMIN/SELLER/CUSTOMER)
    // Spring Boot typically puts role in: payload.role | payload.authorities[0] | payload.scope
    const payload     = decodeJwt(jwt);
    const fromJwt     = payload?.role
                     || payload?.authorities?.[0]?.authority
                     || payload?.authorities?.[0]
                     || payload?.scope;
    const resolvedRole = fromJwt || role; // fallback to response body role
    localStorage.setItem('vb_role', resolvedRole);
  },
  clearSession() {
    localStorage.removeItem('vb_jwt');
    localStorage.removeItem('vb_role');
  },
  getJwt()     { return localStorage.getItem('vb_jwt');  },
  getRole()    { return localStorage.getItem('vb_role'); },
  isLoggedIn() { return !!localStorage.getItem('vb_jwt'); },

  // Check if stored JWT is still valid (not expired)
  isSessionValid() {
    const jwt = localStorage.getItem('vb_jwt');
    if (!jwt) return false;
    const payload = decodeJwt(jwt);
    if (!payload?.exp) return true; // no expiry claim — assume valid
    return payload.exp * 1000 > Date.now();
  },
};