import React from "react";
import OrderStepper from "../../../components/account/order/OrderStepper";

export default function OrderDetails(){
    return(
        <>
            <OrderStepper orderStatus={'shipped'}/>
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
                </div>
        </>
    )
}