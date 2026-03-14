// src/admin/AdminDrawerList.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { AC } from './AdminStyles';

const NAV_ITEMS = [
  { label: 'Dashboard',            icon: '⊞', path: '/admin' },
  { label: 'Coupons',              icon: '🏷', path: '/admin/coupons' },
  { label: 'Add New Coupon',       icon: '+',  path: '/admin/add-coupon' },
  { label: 'Home Page',            icon: '⌂',  path: '/admin/home-grid' },
  { label: 'Electronics Category', icon: '⚡', path: '/admin/electronics' },
  { label: 'Shop By Category',     icon: '🛒', path: '/admin/categories' },
  { label: 'Deals',                icon: '💰', path: '/admin/deals' },
];

export default function AdminDrawerList({ onClose }) {
  const navigate     = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) =>
    path === '/admin'
      ? pathname === '/admin' || pathname === '/admin/'
      : pathname.startsWith(path);

  const handleNav = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Logo */}
      <div style={{ padding: '20px 24px 16px', borderBottom: `1px solid ${AC.border}` }}>
        <div
          style={{ fontWeight: 700, fontSize: 20, color: AC.pink, cursor: 'pointer', letterSpacing: '-0.3px' }}
          onClick={() => handleNav('/')}
        >
          VelvetBox
        </div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
        {NAV_ITEMS.map(item => {
          const active = isActive(item.path);
          return (
            <div
              key={item.path}
              onClick={() => handleNav(item.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10, marginBottom: 2,
                cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400,
                background: active ? AC.pink : 'transparent',
                color: active ? '#fff' : AC.text,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = AC.pinkSubtle; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}