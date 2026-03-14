import { Button, FormControlLabel, Radio } from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import OrderSummary from "../../components/cart/OrderSummary";

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
  const [paymentGateway, setPaymentGateway] = useState('RAZORPAY');

  const handleSubmitAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
  };

  const paymentGatewayList = [
    {
      value: "RAZORPAY",
      img: "https://www.google.com/imgres?q=razorpay&imgurl=https%3A%2F%2F5.imimg.com%2Fdata5%2FSELLER%2FDefault%2F2023%2F9%2F348603242%2FKE%2FOR%2FXP%2F29083784%2Frazorpay-software-500x500.png&imgrefurl=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Frazorpay-payment-gateway-software-2852574442097.html%3Fsrsltid%3DAfmBOorcSTGq9EDdTAetWxPDeeEXZ-hDVArQyUXHrz4AdmfWiuwgKMnG&docid=vSJjPVpQjqEL7M&tbnid=XJHbYdl23EODxM&vet=12ahUKEwiMyeqxo_-SAxVExzgGHZriMJoQnPAOegQIExAB..i&w=500&h=296&hcb=2&ved=2ahUKEwiMyeqxo_-SAxVExzgGHZriMJoQnPAOegQIExAB",
    },
    {
      value: "STRIPE",
      img: "data:image/png;base64,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",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-5 sm:px-10 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ── Left: Address ── */}
        <div className="lg:col-span-2 space-y-6 py-10">

          {/* Title row */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Select Address
            </h1>
            <Button variant="contained" size="small" onClick={() => setOpen(true)} sx={btnPink}>
              + Add New Address
            </Button>
          </div>

          {/* Saved addresses */}
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
                addresses.map((item, index) => <AddressCard key={index} data={item} />)
              )}
            </div>
          </div>

          {/* Bottom add button */}
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
        </div>

        {/* ── Right: Payment + Summary ── */}
        <div className="lg:col-span-1">

          {/* Payment gateway */}
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
                  <img
                    src={item.img}
                    alt={item.value}
                    style={{
                      height: 22,
                      width: item.value === 'STRIPE' ? 46 : 70,
                      objectFit: 'contain',
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="rounded-b-xl overflow-hidden">
            <OrderSummary totalItems={6} total={600} subtotal={760} BtnText={"CHECKOUT"} />
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