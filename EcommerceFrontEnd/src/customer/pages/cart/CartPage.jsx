// src/customer/pages/cart/CartPage.jsx
import React from "react";
import OrderSummary from "../../components/cart/OrderSummary";
import CartItemCard from "../../components/cart/CartItemCard";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useWishlist } from "../../../context/WishlistContext";

export default function CartPage() {
  const navigate = useNavigate();
  const {
    items: cartItems,
    totalItems,
    subtotal,
    deliveryFee,
    total,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">

        {/* Header + Order Summary row */}
        <div className="lg:flex lg:items-start mb-6">
          <div className="flex items-center justify-center gap-3 mb-4 w-full lg:w-4xl lg:max-h-5">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
            <Typography variant="h4" className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Shopping Cart
            </Typography>
          </div>

          <div className="lg:max-h-5">
            <OrderSummary
              totalItems={totalItems}
              total={total}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              BtnText="PROCEED TO CHECKOUT"
              onBtnClick={() => navigate("/checkout")}
            />
          </div>
        </div>

        {/* Cart items */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card className="shadow-xl border-0">
                <CardContent className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <Typography variant="h6" className="text-gray-500 mb-2">
                    Your cart is empty
                  </Typography>
                  <button
                    onClick={() => navigate('/')}
                    style={{
                      marginTop: 12, padding: '10px 24px', borderRadius: 8,
                      background: '#e8006f', color: '#fff', border: 'none',
                      fontWeight: 600, cursor: 'pointer', fontSize: 14,
                    }}
                  >
                    Continue Shopping
                  </button>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  cartItem={item}
                  onUpdateQuantity={(change) =>
                    updateQuantity(item.id, item.quantity + change, item.cartItemId)
                  }
                  onRemove={() => removeFromCart(item.id, item.cartItemId)}
                  onToggleWishlist={() =>
                    toggleWishlist({ id: item.id, name: item.name, price: item.price, image: item.image })
                  }
                  isWishlisted={isWishlisted(item.id)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}