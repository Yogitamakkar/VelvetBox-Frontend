import { CreditCard, Truck, X } from "lucide-react";
import React, { useState } from "react";

export default function PaymentCard(){
    const [paymentMethod, setPaymentMethod] = useState('cod');

    return(
        <>
            <div className="space-y-4">
                <h4 className="font-medium text-gray-900 flex items-center">
                    <CreditCard className="h-5 w-5 text-teal-600 mr-2" />
                    Payment Method
                </h4>
              
                <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Pay On Delivery</span>
                    </div>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                    <input 
                        type="radio" 
                        name="payment" 
                        value="online"
                        checked={paymentMethod === 'online'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                    />
                    <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Online Payment</span>
                    </div>
                    </label>
                </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              Sold by - Ritam Clothing
            </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-white border border-red-300 text-red-600 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition-colors duration-200 flex items-center justify-center">
                        <X className="h-4 w-4 mr-2" />
                        CANCEL ORDER
                    </button>
                
                    <button className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 shadow-md">
                        PLACE ORDER
                    </button>
            </div>
            
            <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
          </div>
        </>
    )
}