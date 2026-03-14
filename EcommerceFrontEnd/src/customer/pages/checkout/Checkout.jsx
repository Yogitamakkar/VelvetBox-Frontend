import { Button, FormControlLabel, Radio, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import OrderSummary from "../../components/cart/OrderSummary";
import { useCart } from "../../../context/CartContext";
import { orderApi } from "../../../api/api";

const btnPink = {
  backgroundColor: '#e8006f',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 2px 8px rgba(232,0,111,0.3)',
  '&:hover': { backgroundColor: '#c4005d', boxShadow: '0 4px 12px rgba(232,0,111,0.4)' },
};

export default function Checkout() {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentGateway, setPaymentGateway] = useState('RAZORPAY');
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const { items, totalItems, total, subtotal, clearCart } = useCart();

  const handleSubmitAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress(newAddress);
  };

  const handleCheckout = async () => {
    if (!selectedAddress) {
      setOrderError('Please select a delivery address.');
      return;
    }
    setPlacing(true);
    setOrderError(null);

    try {
      const paymentMethod = paymentGateway === 'RAZORPAY' ? 'RAZOR_PAY' : 'STRIPE';
      const response = await orderApi.create(selectedAddress, paymentMethod);

      // Backend returns { paymentLinkUrl, paymentLinkId }
      if (response.paymentLinkUrl) {
        clearCart();
        window.location.href = response.paymentLinkUrl;
      } else if (response.paymentLinkId) {
        clearCart();
        alert('Order placed! Payment ID: ' + response.paymentLinkId);
      } else {
        clearCart();
        alert('Order placed successfully!');
      }
    } catch (err) {
      setOrderError(err.message);
    } finally {
      setPlacing(false);
    }
  };

  const paymentGatewayList = [
    { value: "RAZORPAY", label: "Razorpay" },
    { value: "STRIPE", label: "Stripe" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-5 sm:px-10 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left: Address */}
        <div className="lg:col-span-2 space-y-6 py-10">

          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Select Address
            </h1>
            <Button variant="contained" size="small" onClick={() => setOpen(true)} sx={btnPink}>
              + Add New Address
            </Button>
          </div>

          <div className="space-y-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Saved Addresses
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {addresses.length === 0 ? (
                <div className="col-span-2 flex flex-col items-center justify-center py-14 text-center">
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'rgba(232,0,111,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, marginBottom: 12,
                  }}>📍</div>
                  <p className="text-gray-500 text-sm">No addresses saved yet.</p>
                  <p className="text-gray-400 text-xs mt-1">Add one to continue with checkout</p>
                </div>
              ) : (
                addresses.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedAddress(item)}
                    style={{
                      cursor: 'pointer',
                      border: selectedAddress === item ? '2px solid #e8006f' : '1px solid #e5e7eb',
                      borderRadius: 12,
                      padding: 4,
                    }}
                  >
                    <AddressCard data={item} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="py-4 px-6 rounded-xl border border-dashed border-pink-200 bg-white">
            <Button
              fullWidth
              onClick={() => setOpen(true)}
              sx={{
                borderColor: '#e8006f', color: '#e8006f',
                borderRadius: '8px', textTransform: 'none',
                fontWeight: 600, height: 46, fontSize: '14px',
                border: '1.5px solid #e8006f',
                '&:hover': { backgroundColor: 'rgba(232,0,111,0.04)', borderColor: '#c4005d', color: '#c4005d' },
              }}
            >
              + Add New Address
            </Button>
          </div>

          {orderError && (
            <p className="text-red-500 text-sm mt-2">{orderError}</p>
          )}
        </div>

        {/* Right: Payment + Summary */}
        <div className="lg:col-span-1">

          <div className="bg-white p-4 rounded-t-xl shadow-sm border border-gray-200 border-b-0">
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              Choose Payment Gateway
            </h2>
            <div className="flex gap-3">
              {paymentGatewayList.map((item) => (
                <label
                  key={item.value}
                  onClick={() => setPaymentGateway(item.value)}
                  style={{
                    flex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '8px 12px', borderRadius: 10, cursor: 'pointer',
                    border: `2px solid ${paymentGateway === item.value ? '#e8006f' : '#e5e7eb'}`,
                    background: paymentGateway === item.value ? 'rgba(232,0,111,0.04)' : '#fff',
                    transition: 'all 0.2s',
                  }}
                >
                  <Radio
                    value={item.value}
                    checked={paymentGateway === item.value}
                    onChange={() => setPaymentGateway(item.value)}
                    size="small"
                    sx={{ p: 0, color: '#d1d5db', '&.Mui-checked': { color: '#e8006f' } }}
                  />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-b-xl overflow-hidden">
            <OrderSummary
              totalItems={totalItems}
              total={total}
              subtotal={subtotal}
              BtnText={placing ? "Placing Order..." : "CHECKOUT"}
              onBtnClick={handleCheckout}
            />
          </div>
        </div>
      </div>

      <AddressForm
        open={open}
        handleClose={() => setOpen(false)}
        handleSubmitAddress={handleSubmitAddress}
      />
    </div>
  );
}
