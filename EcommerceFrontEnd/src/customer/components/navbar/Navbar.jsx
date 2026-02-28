import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Menu, 
  MenuItem, 
  Button, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  InputBase, 
  Divider, 
  Avatar, 
  Box, 
  useTheme, 
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import CategoryBar from '../category/CategoryBar';
import CustomDrawer from './CustomDrawer';
import CategoryMegaMenu from '../category/CategoryMegaMenu';
import Logo from '../logo/Logo';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuId = 'profile-account-menu';
  // const renderMenu = (
  //   <Menu
  //     anchorEl={anchorEl}
  //     id={menuId}
  //     keepMounted
  //     open={Boolean(anchorEl)}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>My Orders</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Wishlist</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Become Seller</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
      
  //   </Menu>
  // );

  return (
    <div className="flex flex-col">
      {/* Promo Banner */}
      <div className="bg-pink-600 text-white py-2 text-center text-sm">
        Free shipping on orders over $50 | Use code GIFT10 for 10% off
      </div>
      
      <AppBar position="static" color="default" elevation={0} className="bg-white">
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className="lg:hidden"
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} className="flex justify-center" >
                <Typography variant="h6" className="font-bold text-pink-600">
                  Gift Haven
                </Typography>
              </Box>
            </>
          ) : (
            <>
              {/* <Typography variant="h6" className="font-bold text-pink-600 mr-6">
                Gift Haven
              </Typography> */}
              {/* <div className='max-w-35 max-h-3' >
                <Logo/>
              </div> */}
              <Typography >
                <h1 onClick={()=>navigate("/")} className='cursor-pointer'>Velvet Box</h1>
              </Typography>
              
              <CategoryMegaMenu/>
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />
          
          {!isMobile && (
            <div className="relative mx-4 w-64 border border-gray-400 rounded-lg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="text-gray-400" />
              </div>
              <InputBase
                placeholder="Search for gifts..."
                className="bg-gray-100 pl-10 pr-3 py-1 rounded-lg w-full "
              />
            </div>
          )}

          <div className="flex items-center">
            <IconButton aria-label="show wishlist" color="inherit">
              <Badge badgeContent={3} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            
            <IconButton aria-label="show cart items" color="inherit" className="mx-2" onClick={()=>navigate('/cart')}>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={()=>navigate("/account")}
              color="inherit"
            >
              <Avatar className="w-8 h-8 bg-pink-100 text-pink-600 mr-2">
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            {!isMobile && (
                <Button className="bg-pink-400 ml-0.5" variant='outlined'>
                become seller
                </Button>
              )}
          </div>
        </Toolbar>
      </AppBar>
      
      {/* Using CustomDrawer component instead of inline drawer */}
      <CustomDrawer 
        textColorIcon="oklch(0.59 0.25 0.58 / 1)"
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      
      {/* {renderMenu} */}
    </div>
  );
};

export default Navbar;