import React, { useState } from 'react';
import { 
  User, 
  Package, 
  CreditCard, 
  MapPin, 
  Heart,
  Bell,
  Settings,
  X
} from 'lucide-react';
import AccountSidebar from './AccountSidebar';
import AccountHeader from './AccountHeader';
import OrderCard from './order/OrderCard';
import ComingSoonCard from '../missing/ComingSoon';
import OrderStepper from './order/OrderStepper';
import OrderStepperDemo from './order/OrderStepper';
import AddressCard from '../../pages/checkout/AddressCard';
import { Button, Divider } from '@mui/material';
import PaymentCard from '../payment/PaymentCard';
import { Payment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import UserDetails from './profile/UserDetails';
import WishlistComponent from './wishlist/WishlistComponent';

export default function ProfileOrdersComponent() {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // const navigate = useNavigate()

   const handleViewDetails = (order) => {
    console.log('View details for order:', order.id);
  };

   const handleBuyAgain = (order) => {
    console.log('Buy again for order:', order.id);
    
  };
  const orders = [
    {
      id: 'ORD-2024-001',
      status: 'shipped',
      date: 'Dec 15, 2024',
      items: [
        {
          name: 'Premium Wireless Headphones',
          brand: 'AudioTech Pro',
          size: 'Universal',
          color: 'Midnight Black',
          price: 299.99,
          rating: 4.8,
          reviews: 1247
        }
      ],
      total: 299.99,
      estimatedDelivery: 'Dec 18, 2024'
    },
    {
      id: 'ORD-2024-002',
      status: 'delivered',
      date: 'Dec 10, 2024',
      items: [
        {
          name: 'Smart Fitness Watch',
          brand: 'FitTech',
          size: '42mm',
          color: 'Space Gray',
          price: 249.99,
          rating: 4.6,
          reviews: 892
        }
      ],
      total: 249.99,
      deliveredDate: 'Dec 12, 2024'
    },
    {
      id: 'ORD-2024-003',
      status: 'cancelled',
      date: 'Dec 08, 2024',
      items: [
        {
          name: 'Bluetooth Speaker',
          brand: 'SoundWave',
          size: 'Portable',
          color: 'Ocean Blue',
          price: 89.99,
          rating: 4.3,
          reviews: 534
        }
      ],
      total: 89.99,
      cancelledDate: 'Dec 09, 2024'
    }
  ];

  const menuItems = [
    { id: 'orders', label: 'Orders', icon: Package, count: 12 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'cards', label: 'Payment Methods', icon: CreditCard },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: 8 }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <AccountHeader/>
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
          <div className="lg:col-span-1">
            <AccountSidebar menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab}/>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <>
                <div className="mb-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex flex-wrap gap-3">
                    {filterOptions.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => setSelectedFilter(filter.id)}
                        className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                          selectedFilter === filter.id 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md hover:scale-102'
                        }`}
                      >
                        {filter.label} ({filter.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Orders List */}
                <section >
                  {/* <div className="space-y-6">
                  {filteredOrders.map((order, orderIndex) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      orderIndex={orderIndex}
                      onViewDetails={handleViewDetails}
                      onBuyAgain={handleBuyAgain}
                    />
                  ))}
                </div> */}
                {/* <OrderStepper orderStatus={'shipped'}/>
                <section>
                  <div className="p-6 border-b bg-white border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <MapPin className="h-5 w-5 text-teal-600 mr-2" />
                      Delivery Address
                    </h2>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">Zooh</span>
                        <span className="text-gray-600">9021379136</span>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md inline-block text-sm">
                        Vrindavan Choke, Banglore, karnataka - 530008
                      </div>
                    </div>
                  </div>
              </div>

                <div className='space-y-4 bg-white p-5'>
                  <div className=' text-sm  px-4'>
                    <div className='space-y-2'>
                      <p className='font-bold text-lg'>Total Item Price</p>
                      <p>You Saved <span className='text-green-500 font-medium text-xs '> {699} </span>on this item</p>
                      <p className='font-medium text-lg'>${799}</p>
                      <div className='py-3'>
                        <div className='bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3 w-full'>
                          <Payment/>
                          <div >Pay On Delivery</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </section> 
                
                <Divider/>
                <div className='px-5 py-5 bg-white'>
                  <p className='text-sm'><strong>Sold by: </strong>{"yogita enterprises"}</p>
                </div>

                <div className='py-5 bg-white px-7'>
                  <Button disabled={false} color='error'variant='outlined' sx={{py:"0.7rem"}} fullWidth>{true?"cancel order":" order cancelled"}</Button>
                </div> */}

                {/* <UserDetails/>/ */}
                  <div className='bg-white px-10 py-5 mt-4 shadow shadow-lg rounded-xl'>
                    <AddressCard/>
                  </div>
                  <div className='bg-white px-10 py-5 mt-4 shadow shadow-lg rounded-xl'>
                    <AddressCard/>
                  </div>
                  </section>

              </>
            )}

            {activeTab !== 'orders' && (
              <ComingSoonCard icon={activeTab?.icon || User} label={activeTab?.label || "This"}/>
            )}

            </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}