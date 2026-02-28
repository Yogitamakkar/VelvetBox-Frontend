import React from "react";
import { Add, Remove, Delete, Favorite, FavoriteBorder, ShoppingCart, LocalShipping, Schedule} from '@mui/icons-material';
import {Card, CardContent, Typography, Button, IconButton, Chip,Divider,Box, Avatar, TextField} from '@mui/material';

export default function CartItemCard({cartItem}){
    const deliveryFee = 25;
    return(
        <>
            <Card className="shadow-xl border-0 hover:shadow-2xl cursor-pointer">
                  <CardContent className="p-3">
                    <div className="flex gap-4">
                      
                      <div className="relative">
                        <Box
                            component="img"
                            src={cartItem.image}
                            alt="Product"
                            sx={{ width: 120, height: 120, objectFit: 'contain', borderRadius: 2 }}
                            />
                        <div className="absolute -top-2 -right-2">
                          <Chip
                            label="Fresh"
                            size="small"
                            className="bg-gradient-to-r from-green-400 to-green-600 text-white font-bold shadow-lg"
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <Typography variant="h6" className="font-bold text-gray-800">
                            {cartItem.name}
                          </Typography>
                          <IconButton
                            onClick={() => toggleFavorite(item.id)}
                            color='secondary'
                          >
                            {cartItem.isFavorite ? <Favorite /> : <FavoriteBorder />}
                          </IconButton>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <Chip label="Standard Delivery" size="small" className="bg-blue-100 text-blue-800" />
                          <Typography variant="body2" className="text-gray-600">
                            ₹{deliveryFee} delivery fee
                          </Typography>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border-2 border-gray-200 rounded-full bg-white shadow-sm">
                              <IconButton size="small" onClick={() => updateQuantity(item.id, -1)} color='error'>
                                <Remove fontSize="small"  color='error'/>
                              </IconButton>
                              <Typography className="px-4 py-1 font-bold min-w-[40px] text-center">
                                {cartItem.quantity}
                              </Typography>
                              <IconButton size="small" onClick={() => updateQuantity(item.id, 1)} color='success'>
                                <Add fontSize="small" />
                              </IconButton>
                            </div>
                          </div>

                          <div className="flex items-center gap-7">
                            <Typography variant="h6" className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ₹{cartItem.price * cartItem.quantity}
                            </Typography>
                            <IconButton onClick={() => removeItem(cartItem.id)} sx={{ '&:hover':{color:'red'}}} >
                              <Delete />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
        </>
    )
}