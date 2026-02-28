import { Button, Card, CardContent, Divider, TextField, Typography } from "@mui/material";
import React from "react";

export default function OrderSummary({title,cartItem,totalItems,total,subtotal ,deliveryFee,showPaymentMethods,discount,BtnText,onBtnClick}){
    return(
        <>
            <div className="lg:col-span-1">
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 sticky top-4">
              <CardContent className="p-6">
                <Typography variant="h5" className="font-bold pb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {title}
                </Typography>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <Typography variant="body1" className="text-gray-600">
                      Total Products:
                    </Typography>
                    <Typography variant="body1" className="font-bold">
                      {totalItems}
                    </Typography>
                  </div>

                  <div className="flex justify-between items-center">
                    <Typography variant="body1" className="text-gray-600">
                      Subtotal:
                    </Typography>
                    <Typography variant="body1" className="font-bold">
                      ₹{subtotal}
                    </Typography>
                  </div>

                  <div className="flex justify-between items-center">
                    <Typography variant="body1" className="text-gray-600">
                      Delivery Fee:
                    </Typography>
                    <Typography variant="body1" className="font-bold">
                      ₹{deliveryFee}
                    </Typography>
                  </div>

                  {discount && (
                    <div className="flex justify-between items-center">
                    <Typography variant="body1" className="text-gray-600">
                      Discount
                    </Typography>
                    <Typography variant="body1" className="font-bold">
                      ₹{discount}
                    </Typography>
                  </div>
                  )}

                  <Divider className="my-4" />

                  <div className="flex justify-between items-center">
                    <Typography variant="h7" className="font-bold">
                      Total Amount:
                    </Typography>
                    <Typography variant="h6" className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ₹{total}
                    </Typography>
                  </div>
                </div>

                <div className="mb-6">
                  <TextField
                    fullWidth
                    placeholder="Enter code"
                    variant="outlined"
                    size="small"
                    className="mb-2"
                    InputProps={{
                      endAdornment: (
                        <Button
                          variant="contained"
                          size="small"
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
                        >
                          Apply
                        </Button>
                      ),
                    }}
                  />
                </div>

                <Button
                  variant="contained"
                  fullWidth
                  size="medium"
                //   disabled={cartItem.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={onBtnClick}
                >
                  {BtnText}
                </Button>

                <div className="mt-4 text-center">
                  <Typography variant="body2" className="text-gray-500">
                    🔒 Secure checkout with 256-bit SSL encryption
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        
        </>
    )
}