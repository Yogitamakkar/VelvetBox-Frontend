import React, { useState } from 'react';
import { 
  Package, 
  ShoppingBag,
  Truck,
  XCircle,
  CheckCircle,
  Star,
  ArrowRight,
} from 'lucide-react';

const OrderCard = ({ order, orderIndex, onViewDetails, onBuyAgain }) => {
  const getStatusConfig = (status) => {
    const configs = {
      shipped: { 
        icon: Truck, 
        label: 'Shipped',
        bgColor: 'bg-blue-50 border-blue-200',
        textColor: 'text-blue-700',
        iconColor: 'text-blue-600'
      },
      delivered: { 
        icon: CheckCircle, 
        label: 'Delivered',
        bgColor: 'bg-green-50 border-green-200',
        textColor: 'text-green-700',
        iconColor: 'text-green-600'
      },
      cancelled: { 
        icon: XCircle, 
        label: 'Cancelled',
        bgColor: 'bg-red-50 border-red-200',
        textColor: 'text-red-700',
        iconColor: 'text-red-600'
      }
    };
    return configs[status] || configs.shipped;
  };

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div 
      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
      style={{
        animationDelay: `${orderIndex * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out'
      }}
    >
      <div className="p-6">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${statusConfig.bgColor}`}>
              <StatusIcon size={16} className={statusConfig.iconColor} />
              <span className={`text-sm font-semibold ${statusConfig.textColor}`}>
                {statusConfig.label}
              </span>
            </div>
          </div>
          <p className="text-gray-500 font-medium">Ordered on {order.date}</p>
        </div>

        <div className="border-t border-gray-100 pt-6 mb-6">
          {/* Order Items */}
          {order.items.map((item, index) => (
            <div key={index} className="flex space-x-6 mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h4>
                <p className="text-gray-600 mb-3">{item.brand} • {item.size} • {item.color}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-700">{item.rating}</span>
                    <span className="text-gray-500">({item.reviews} reviews)</span>
                  </div>
                  <div className="text-xl font-bold text-green-600">${item.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-6">
          {/* Order Footer */}
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 mb-2">
                Total: <span className="font-bold text-gray-900 text-lg">${order.total}</span>
              </p>
              {order.status === 'shipped' && (
                <p className="text-blue-600 font-medium">
                  📦 Estimated delivery: {order.estimatedDelivery}
                </p>
              )}
              {order.status === 'delivered' && (
                <p className="text-green-600 font-medium">
                  ✅ Delivered on {order.deliveredDate}
                </p>
              )}
              {order.status === 'cancelled' && (
                <p className="text-red-600 font-medium">
                  ❌ Cancelled on {order.cancelledDate}
                </p>
              )}
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => onViewDetails && onViewDetails(order)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2"
              >
                <Package size={16} />
                <span>View Details</span>
              </button>
              {order.status === 'delivered' && (
                <button 
                  onClick={() => onBuyAgain && onBuyAgain(order)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <span>Buy Again</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderCard;