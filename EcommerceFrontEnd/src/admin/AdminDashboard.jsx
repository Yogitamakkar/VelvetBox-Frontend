// src/admin/AdminDashboard.jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDrawerList from './Admindrawerlist';

const AdminOverview    = lazy(() => import('./AdminOverview'));
// const AdminCoupons     = lazy(() => import('./AdminCoupons'));
// const AdminAddCoupon   = lazy(() => import('./AdminAddCoupon'));
const AdminHomePage    = lazy(() => import('./home//AdminHomePage'));
// const AdminElectronics = lazy(() => import('./AdminElectronics'));
const AdminCategories  = lazy(() => import('./categories/AdminCategories'));
const AdminDeals       = lazy(() => import('./deals/AdminDeals'));

function PageLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', flexDirection: 'column', gap: 14 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid rgba(232,0,111,0.15)', borderTopColor: '#e8006f', animation: 'adm-spin 0.65s linear infinite' }} />
      <style>{`@keyframes adm-spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: '#9ca3af', fontSize: 13 }}>Loading...</span>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: 240, flexShrink: 0, background: '#fff', borderRight: '1px solid #e5e7eb', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        <AdminDrawerList />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route index                  element={<AdminOverview />}    />
            {/* <Route path="coupons"         element={<AdminCoupons />}     /> */}
            {/* <Route path="add-coupon"      element={<AdminAddCoupon />}   /> */}
            <Route path="home-grid"       element={<AdminHomePage />}    />
            {/* <Route path="electronics"     element={<AdminElectronics />} /> */}
            <Route path="categories"      element={<AdminCategories />}  />
            <Route path="deals"           element={<AdminDeals />}       />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}