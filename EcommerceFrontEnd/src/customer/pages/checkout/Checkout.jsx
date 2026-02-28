import { Button, Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import { Label } from "@mui/icons-material";
import OrderSummary from "../../components/cart/OrderSummary";

export default function Checkout() {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [paymentGateway,setPaymentGateway] = useState('RAZORPAY')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePaymentChange = (e)=>{
    setPaymentGateway(e.target.value);
  }

  const handleSubmitAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
  };

  const paymentGatewayList = [
    {
      value: "RAZORPAY",
      img: "https://imgs.search.brave.com/HkxR47o_NAaau5FMamSqwpCoHrfKG_B_V83kYCySw7w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2IzL1Jhem9ycGF5/X2xvZ28ud2VicA",
      label: ""
    },
    {
      value: "STRIPE",
      img: "https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png",
      label: ""
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-5 px-5 sm:px-10 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left side - Address Selection */}
        <div className="lg:col-span-2 space-y-6 py-10">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              Select Address
            </h1>
            <Button variant="contained" size="small" color="primary" onClick={handleOpen}>
              Add New Address
            </Button>
          </div>

          <div className="text-sm font-medium text-gray-600 space-y-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Saved Addresses
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {addresses.length === 0 ? (
                <p className="text-gray-400">No addresses saved yet.</p>
              ) : (
                addresses.map((item, index) => <AddressCard key={index} data={item} />)
              )}
            </div>
          </div>

          <div className="py-5 px-6 rounded-md border border-gray-200 bg-white shadow-sm">
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth 
              onClick={handleOpen}
              sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                border: 0,
                borderRadius: 3,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                color: 'white',
                height: 48,
                padding: '0 30px',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
                }
              }}
            >
              Add New Address
            </Button>
          </div>
        </div>

        
        <div className="lg:col-span-1 space-y-0">
          
          <div className="bg-white p-4 pb-0 rounded-t-lg shadow-sm border border-gray-200 border-b-0">
            <h2 className="text-sm font-semibold text-gray-700 mb-4">
              Choose Payment Gateway
            </h2>
            <div className="flex">
            {paymentGatewayList.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={
                  <Radio
                    name="payment-method"
                    value={item.value}
                    checked={paymentGateway === item.value} 
                    size="small"
                  />
                }
                label={
                  <img
                    src={item.img}
                    alt={item.value}
                    className={`${item.value === "STRIPE" ? "w-20 object-contain h-2" : "w-30"} h-10 object-cover ml-2`}
                  />
                }
              />
            ))}
          </div>
          </div>
          
          <div className="rounded-b-lg m-0 p-0">
            <OrderSummary totalItems={6} total={600} subtotal={760} BtnText={"CHECKOUT"}  />
          </div>
        </div>
      </div>

      <AddressForm
        open={open}
        handleClose={handleClose}
        handleSubmitAddress={handleSubmitAddress}
      />
    </div>
  );
}