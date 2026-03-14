import React, { memo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Defined outside component — stable references, never recreated on render
const NAV_ITEMS = [
  { icon: '⊞', label: 'Dashboard',   path: '/seller' },
  { icon: '📦', label: 'Orders',      path: '/seller/orders' },
  { icon: '🛍️', label: 'Products',    path: '/seller/products' },
  { icon: '＋', label: 'Add Product', path: '/seller/add-product' },
  { icon: '💳', label: 'Payment',     path: '/seller/payment' },
  { icon: '📋', label: 'Transaction', path: '/seller/transaction' },
];

const BOTTOM_NAV = [
  { icon: '👤', label: 'Account', path: '/seller/account' },
  { icon: '→',  label: 'Logout',  path: '/' },
];

// NavItem is memo'd — only re-renders when its own active state changes
const NavItem = memo(({ icon, label, active, onClick }) => (
  <div className={`snav-item${active ? ' active' : ''}`} onClick={onClick}>
    <span className="snav-icon">{icon}</span>
    {label}
  </div>
));

const SellerDrawerList = memo(() => {
  const navigate  = useNavigate();
  const { pathname } = useLocation();

  const isActive = useCallback((path) =>
    path === '/seller'
      ? pathname === '/seller' || pathname === '/seller/'
      : pathname.startsWith(path),
  [pathname]);

  // Stable click handlers via useCallback keyed by path
  const goTo = useCallback((path) => () => navigate(path), [navigate]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        .snav-item {
          display: flex; align-items: center; gap: 14px;
          padding: 11px 20px; border-radius: 10px; cursor: pointer;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.55);
          transition: color 0.2s, background 0.2s, border-color 0.2s, box-shadow 0.2s;
          margin-bottom: 2px; border: 1px solid transparent;
          font-family: 'DM Sans', sans-serif; user-select: none;
        }
        .snav-item:hover {
          color: #fff;
          background: rgba(232,0,111,0.08);
          border-color: rgba(232,0,111,0.12);
        }
        .snav-item.active {
          color: #fff; font-weight: 600;
          background: linear-gradient(135deg, #e8006f, #c4005d);
          border-color: transparent;
          box-shadow: 0 4px 16px rgba(232,0,111,0.35);
        }
        .snav-icon {
          width: 20px; text-align: center;
          font-size: 15px; flex-shrink: 0;
        }
      `}</style>

      {/* Logo */}
      <div
        onClick={goTo('/')}
        style={{ marginBottom: 36, paddingLeft: 8, cursor: 'pointer' }}
      >
        <div style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 20, fontWeight: 700, color: '#fff',
        }}>
          Velvet<span style={{ color: '#e8006f' }}>Box</span>
        </div>
        <div style={{
          fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Seller Portal
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            active={isActive(item.path)}
            onClick={goTo(item.path)}
          />
        ))}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }} />

      {/* Bottom nav */}
      {BOTTOM_NAV.map(item => (
        <NavItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          active={item.label !== 'Logout' && isActive(item.path)}
          onClick={goTo(item.path)}
        />
      ))}
    </>
  );
});

export default SellerDrawerList;