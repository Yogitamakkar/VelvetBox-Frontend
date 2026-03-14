import React, { lazy, Suspense, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import SellerDrawerList from '../components/SellerDrawerList';

// ── Lazy load every page so only the active one is bundled/rendered ──────────
const DashboardHome  = lazy(() => import('./DashBoardHome'));
const SellerOrders   = lazy(() => import('./SellerOrders'));
const SellerProducts = lazy(() => import('./SellerProducts'));
const SellerAddProduct = lazy(() => import('./SellerAddProduct'));
const SellerPayment  = lazy(() => import('./SellerPayment'));
const SellerTransaction = lazy(() => import('./SellerTransaction'));
const SellerAccount  = lazy(() => import('./SellerAccount'));

// ── Fallback shown while lazy chunk loads ─────────────────────────────────────
const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '60vh', flexDirection: 'column', gap: 16,
  }}>
    <div style={{
      width: 36, height: 36, borderRadius: '50%',
      border: '3px solid rgba(232,0,111,0.2)',
      borderTopColor: '#e8006f',
      animation: 'seller-spin 0.7s linear infinite',
    }} />
    <style>{`@keyframes seller-spin { to { transform: rotate(360deg); } }`}</style>
    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Loading...</span>
  </div>
);

// ── Sidebar is memo'd — never re-renders on route change ──────────────────────
const Sidebar = memo(() => (
  <aside style={{
    width: 220, flexShrink: 0,
    background: '#100815',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    display: 'flex', flexDirection: 'column',
    padding: '24px 16px',
    position: 'sticky', top: 0, height: '100vh',
  }}>
    <SellerDrawerList />
  </aside>
));

// ── Root shell ────────────────────────────────────────────────────────────────
export default function SellerDashboard() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .seller-root { font-family: 'DM Sans', sans-serif; }
        .seller-main { flex: 1; padding: 32px 36px; overflow-y: auto; max-height: 100vh; }
        .seller-main::-webkit-scrollbar { width: 4px; }
        .seller-main::-webkit-scrollbar-track { background: transparent; }
        .seller-main::-webkit-scrollbar-thumb { background: rgba(232,0,111,0.3); border-radius: 4px; }
      `}</style>

      <div className="seller-root" style={{ display: 'flex', minHeight: '100vh', background: '#0d0a10' }}>
        <Sidebar />
        <main className="seller-main">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route index                   element={<DashboardHome />} />
              <Route path="orders"           element={<SellerOrders />} />
              <Route path="products"         element={<SellerProducts />} />
              <Route path="add-product"      element={<SellerAddProduct />} />
              <Route path="payment"          element={<SellerPayment />} />
              <Route path="transaction"      element={<SellerTransaction />} />
              <Route path="account"          element={<SellerAccount />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </>
  );
}