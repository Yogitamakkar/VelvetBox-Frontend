import React, { useState } from 'react';
import {
  User,
  Package,
  CreditCard,
  MapPin,
  Heart,
  Bell,
  Settings,
} from 'lucide-react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AccountHeader from '../../components/account/AccountHeader';
import AccountSidebar from '../../components/account/AccountSidebar';
import UserDetails from '../../components/account/profile/UserDetails';
import OrdersPage from './orders/OrdersPage';
import OrderDetails from './orders/OrderDetailsPage';
import SavedAddresses from './savedAddresses/SavedAddresses';
import ComingSoonCard from '../../components/missing/ComingSoon';

export default function AccountPage() {
  const location = useLocation();

  const menuItems = [
    { id: 'orders', label: 'Orders', icon: Package, itemPath: '/account/orders' },
    { id: 'profile', label: 'Profile', icon: User, itemPath: '/account/profile' },
    { id: 'cards', label: 'Payment Methods', icon: CreditCard, itemPath: '/account/saved-cards' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, itemPath: '/account/addresses' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, itemPath: '/account/wishlist' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <AccountHeader />
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Bell size={20} className="text-gray-600" />
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <AccountSidebar menuItems={menuItems} />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Routes>
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:orderId/:orderItemId" element={<OrderDetails />} />
              <Route path="/addresses" element={<SavedAddresses />} />
              <Route path="/profile" element={<UserDetails />} />
              <Route
                path="/wishlist"
                element={<ComingSoonCard icon={Heart} label="Wishlist" />}
              />
              <Route
                path="/saved-cards"
                element={<ComingSoonCard icon={CreditCard} label="Payment Methods" />}
              />
              <Route
                path="*"
                element={<ComingSoonCard icon={User} label="Page Not Found" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
