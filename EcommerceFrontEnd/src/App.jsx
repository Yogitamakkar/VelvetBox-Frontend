import { ThemeProvider } from '@mui/material';
import customTheme from './theme/CustomTheme';
import Home from './customer/pages/home/Home';
import ProductsPage from './customer/pages/product/ProductsPage';
import { Route, Routes } from 'react-router-dom';
import ProductDetails from './customer/pages/product/ProductDetails';
import ProductReviewPage from './customer/pages/product/ProductReviewPage';
import CartPage from './customer/pages/cart/CartPage';
import Checkout from './customer/pages/checkout/Checkout';
import AccountPage from './customer/pages/account/AccountPage';
import Navbar from './customer/components/Navbar/Navbar';
import BecomeSeller from './seller/becomeSeller/BecomeSeller';
import { lazy, Suspense } from 'react';
import { ROLES } from './auth/AuthService';
import { AuthProvider } from './auth/AuthContext.jsx'
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import ProtectedRoute from './auth/ProtectedRoute';

const AuthPage        = lazy(() => import('./auth/AuthPage'));
const AdminDashboard  = lazy(() => import('./admin/AdminDashboard'));
const SellerDashboard = lazy(() => import('./seller/pages/SellerDashboard'));

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', background: '#09090f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 14 }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.15)', borderTopColor: '#6366f1', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13, fontFamily: 'DM Sans, sans-serif' }}>Loading...</span>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ProductProvider>
              <Suspense fallback={<PageLoader />}>
                <Navbar />
                <Routes>
                  {/* Public routes */}
                  <Route path='/'                                              element={<Home />} />
                  <Route path='/products/:category'                           element={<ProductsPage />} />
                  <Route path='/reviews/:productId'                           element={<ProductReviewPage />} />
                  <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails />} />
                  <Route path='/cart'                                         element={<CartPage />} />
                  <Route path='/account/*'                                    element={<AccountPage />} />
                  <Route path='/become-seller'                                element={<BecomeSeller />} />
                  <Route path='/auth'                                         element={<AuthPage />} />

                  {/* Protected routes */}
                  <Route path='/checkout' element={
                    <ProtectedRoute role={ROLES.CUSTOMER}><Checkout /></ProtectedRoute>
                  } />
                  <Route path='/seller/*' element={
                    <ProtectedRoute role={ROLES.SELLER}><SellerDashboard /></ProtectedRoute>
                  } />
                  <Route path='/admin/*' element={
                    <ProtectedRoute role={ROLES.ADMIN}><AdminDashboard /></ProtectedRoute>
                  } />
                </Routes>
              </Suspense>
            </ProductProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;