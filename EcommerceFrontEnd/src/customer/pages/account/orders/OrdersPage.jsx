import React, { useState } from "react";
import OrderCard from "../../../components/account/order/OrderCard";
import { useNavigate, useParams } from "react-router-dom";

export default function OrdersPage({activeTab}){

    const {orderId,orderItemId} = useParams();
    const navigate = useNavigate();

      const orders = [
    {
      id: 'ORD-2024-001',
      status: 'shipped',
      date: 'Dec 15, 2024',
      items: [
        {
            id : "I-2",
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
            id:"I-4",
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

    // const handleViewDetails = (orderId,orderItemId)=>{
    //     navigate(`/account/orders/${orderId}/${orderItemId}`)
    // }
    return(
        <section>
            <div className="space-y-6">
                {orders.map((order, orderIndex) => (
                <OrderCard
                    key={order.id}
                    order={order}
                    orderIndex={orderIndex}
                    // onViewDetails={()=>handleViewDetails(order.id,order.items.id)}
                    // onBuyAgain={handleBuyAgain}
                />
                ))}
                
            </div>
            
        </section>
    )
}