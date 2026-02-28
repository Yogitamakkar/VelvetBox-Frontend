import React, { useState } from "react";
import OrderSummary from "../../components/cart/OrderSummary";
import CartItemCard from "../../components/cart/CartItemCard";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CartPage(){
    const [cartItems, setCartItems] = useState([
        {
          id: 1,
          name: 'Choco Mango Fusion Cake',
          price: 875,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop&crop=center',
          isFavorite: false
        }
      ]);
    const [couponCode,setCouponCode]  = useState();

    const navigate = useNavigate();
    const handleChange = (e)=>{
        setCouponCode(e.target.value);
    }
    const handleBuyNow = ()=>{
      navigate("/checkout")
    }
      const deliveryFee = 25;
      const deliveryInfo = {
        date: '02nd Jun 2025',
        time: '5pm-9pm',
        pincode: '401107',
        location: 'Thane'
      };
    
      const totalItems = cartItems.length;
      const updateQuantity = (id, change) => {
        setCartItems(items =>
          items.map(item =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + change) }
              : item
          )
        );
      };
    
      const toggleFavorite = (id) => {
        setCartItems(items =>
          items.map(item =>
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
          )
        );
      };
    
      const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
      };
    
      const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const total = subtotal + deliveryFee;
    
      return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">

        <div className="lg:flex lg:items-start mb-6 ">
          <div className="flex items-center justify-center gap-3 mb-4 w-full lg:w-4xl lg:max-h-5">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shopping Cart
            </Typography>
          </div> 

            <div className='lg:max-h-5'>
                {
                    cartItems.map((cartItem)=>(
                        <OrderSummary key={cartItem.id} cartItems={cartItem} totalItems={totalItems} total={total} subtotal={subtotal} deliveryFee={deliveryFee} BtnText={"PROCEED TO CHECKOUT"} onBtnClick={()=>handleBuyNow()}/>
                    ))
                }
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card className="shadow-xl border-0">
                <CardContent className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <Typography variant="h6" className="text-gray-500">
                    Your cart is empty
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item) => (
                <CartItemCard key={item.id} cartItem={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}