import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Chip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Add,
  Remove,
  ShoppingCart,
  Delete,
  Share,
  Close
} from '@mui/icons-material';

const WishlistComponent = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      originalPrice: 179.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      rating: 4.5,
      category: 'Electronics',
      inStock: true,
      quantity: 1,
      dateAdded: '2024-01-15'
    },
    {
      id: 2,
      name: 'Eco-Friendly Water Bottle',
      price: 24.99,
      originalPrice: 34.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
      rating: 4.2,
      category: 'Lifestyle',
      inStock: true,
      quantity: 2,
      dateAdded: '2024-01-20'
    },
    {
      id: 3,
      name: 'Smart Fitness Tracker',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop',
      rating: 4.7,
      category: 'Health',
      inStock: false,
      quantity: 1,
      dateAdded: '2024-01-18'
    }
  ]);

  const [shareDialog, setShareDialog] = useState({ open: false, item: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleQuantityChange = (id, change) => {
    setWishlistItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    setSnackbar({
      open: true,
      message: 'Item removed from wishlist',
      severity: 'info'
    });
  };

  const addToCart = (item) => {
    setSnackbar({
      open: true,
      message: `${item.name} added to cart!`,
      severity: 'success'
    });
  };

  const handleShare = (item) => {
    setShareDialog({ open: true, item });
  };

  const closeShareDialog = () => {
    setShareDialog({ open: false, item: null });
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(`Check out this item: ${shareDialog.item?.name}`);
    setSnackbar({
      open: true,
      message: 'Link copied to clipboard!',
      severity: 'success'
    });
    closeShareDialog();
  };

  const totalItems = wishlistItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = wishlistItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 via-white to-pink-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge badgeContent={totalItems} color="primary" className="scale-110">
              <Favorite className="text-pink-500 text-4xl" />
            </Badge>
            <div>
              <Typography variant="h4" className="font-bold text-gray-800">
                My Wishlist
              </Typography>
              <Typography variant="body2" className="text-gray-600">
                {wishlistItems.length} items • Total value: ${totalValue.toFixed(2)}
              </Typography>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <Typography variant="h6" className="font-semibold">
                Total Items
              </Typography>
              <Typography variant="h3" className="font-bold">
                {totalItems}
              </Typography>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <Typography variant="h6" className="font-semibold">
                Total Value
              </Typography>
              <Typography variant="h3" className="font-bold">
                ${totalValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-4">
              <Typography variant="h6" className="font-semibold">
                In Stock
              </Typography>
              <Typography variant="h3" className="font-bold">
                {wishlistItems.filter(item => item.inStock).length}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card 
            key={item.id} 
            className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0"
          >
            <div className="relative overflow-hidden">
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                className="h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay Actions */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <IconButton 
                  size="small" 
                  className="bg-white/90 hover:bg-white shadow-lg"
                  onClick={() => handleShare(item)}
                >
                  <Share fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  className="bg-red-500/90 hover:bg-red-500 text-white shadow-lg"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </div>

              {/* Discount Badge */}
              {item.originalPrice > item.price && (
                <Chip
                  label={`-${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%`}
                  className="absolute top-2 left-2 bg-red-500 text-white font-bold"
                  size="small"
                />
              )}

              {/* Stock Status */}
              <Chip
                label={item.inStock ? 'In Stock' : 'Out of Stock'}
                className={`absolute bottom-2 left-2 ${
                  item.inStock 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}
                size="small"
              />
            </div>

            <CardContent className="p-4">
              <div className="mb-3">
                <Typography variant="h6" className="font-semibold text-gray-800 mb-1 line-clamp-2">
                  {item.name}
                </Typography>
                <Chip 
                  label={item.category} 
                  size="small" 
                  className="bg-purple-100 text-purple-700 mb-2"
                />
                
                <div className="flex items-center gap-2 mb-2">
                  <Rating value={item.rating} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" className="text-gray-600">
                    ({item.rating})
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Typography variant="h6" className="font-bold text-green-600">
                  ${item.price}
                </Typography>
                {item.originalPrice > item.price && (
                  <Typography variant="body2" className="line-through text-gray-500">
                    ${item.originalPrice}
                  </Typography>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography className="min-w-[40px] text-center font-semibold">
                    {item.quantity}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </div>
                
                <Typography variant="body2" className="text-gray-600">
                  Added {item.dateAdded}
                </Typography>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCart />}
                  onClick={() => addToCart(item)}
                  disabled={!item.inStock}
                  className={`${
                    item.inStock 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' 
                      : 'bg-gray-400'
                  } text-white font-semibold py-2 transition-all duration-300`}
                >
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {wishlistItems.length === 0 && (
        <div className="text-center py-16">
          <FavoriteBorder className="text-gray-300 text-8xl mb-4" />
          <Typography variant="h5" className="text-gray-500 mb-2">
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" className="text-gray-400">
            Start adding items you love to keep track of them!
          </Typography>
        </div>
      )}

      {/* Share Dialog */}
      <Dialog open={shareDialog.open} onClose={closeShareDialog} maxWidth="sm" fullWidth>
        <DialogTitle className="flex items-center justify-between">
          Share Item
          <IconButton onClick={closeShareDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center gap-4 mb-4">
            {shareDialog.item && (
              <>
                <img 
                  src={shareDialog.item.image} 
                  alt={shareDialog.item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <Typography variant="h6">{shareDialog.item?.name}</Typography>
                  <Typography variant="body2" className="text-gray-600">
                    ${shareDialog.item?.price}
                  </Typography>
                </div>
              </>
            )}
          </div>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={`Check out this amazing item: ${shareDialog.item?.name} for only $${shareDialog.item?.price}!`}
            variant="outlined"
            label="Share message"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeShareDialog}>Cancel</Button>
          <Button onClick={copyShareLink} variant="contained">
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default WishlistComponent;