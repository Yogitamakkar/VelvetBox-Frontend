import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge, 
  Button, 
  InputBase, 
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
} from '@mui/icons-material';
import CategoryBar from '../category/CategoryBar';
import CustomDrawer from './CustomDrawer';
import CategoryMegaMenu from '../category/CategoryMegaMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useAuth } from '../../../auth/AuthContext';

// Pages that use a dark background
const DARK_ROUTES = ['/become-seller'];

const Navbar = ({ forceLight = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const isDark = !forceLight && DARK_ROUTES.some(route => location.pathname.startsWith(route));
  const { totalItems: cartCount } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isLoggedIn } = useAuth();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Theme tokens
  const bg = isDark ? '#0d0a10' : '#ffffff';
  const textColor = isDark ? '#ffffff' : '#111111';
  const subTextColor = isDark ? 'rgba(255,255,255,0.5)' : '#6b7280';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#e5e7eb';
  const searchBg = isDark ? 'rgba(255,255,255,0.07)' : '#f3f4f6';
  const searchBorder = isDark ? 'rgba(255,255,255,0.12)' : '#d1d5db';
  const iconColor = isDark ? 'rgba(255,255,255,0.75)' : '#374151';
  const promoBg = isDark ? '#1a0814' : '#e8006f';

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Promo Banner */}
      <div style={{
        backgroundColor: promoBg,
        color: isDark ? 'rgba(255,255,255,0.7)' : '#ffffff',
        padding: '8px 0',
        textAlign: 'center',
        fontSize: '13px',
        borderBottom: isDark ? '1px solid rgba(232,0,111,0.2)' : 'none',
        letterSpacing: '0.02em',
      }}>
        Free shipping on orders over $50 | Use code GIFT10 for 10% off
      </div>

      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: bg,
          borderBottom: `1px solid ${borderColor}`,
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Toolbar sx={{ gap: 0.5, flexWrap: 'nowrap', minHeight: '64px !important', px: { xs: 1, sm: 2 } }}>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: iconColor }}
              >
                <MenuIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography
                  variant="h6"
                  onClick={() => navigate('/')}
                  sx={{
                    fontWeight: 700,
                    color: isDark ? '#e8006f' : '#e8006f',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Velvet Box
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Typography
                onClick={() => navigate('/')}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: textColor,
                  fontFamily: 'Georgia, serif',
                  mr: 1,
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s',
                  '&:hover': { color: '#e8006f' },
                }}
              >
                Velvet Box
              </Typography>

              <CategoryMegaMenu isDark={isDark} />
            </>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Search */}
          {!isMobile && (
            <div style={{
              position: 'relative',
              width: '220px',
              border: `1px solid ${searchBorder}`,
              borderRadius: '10px',
              backgroundColor: searchBg,
              display: 'flex',
              alignItems: 'center',
              padding: '2px 12px',
              transition: 'all 0.3s',
            }}>
              <SearchIcon style={{ color: subTextColor, fontSize: 18, marginRight: 8 }} />
              <InputBase
                placeholder="Search for gifts..."
                sx={{
                  fontSize: '14px',
                  color: textColor,
                  width: '100%',
                  '& ::placeholder': { color: subTextColor, opacity: 1 },
                }}
              />
            </div>
          )}

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ color: iconColor }}>
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteIcon fontSize="small" />
              </Badge>
            </IconButton>

            <IconButton sx={{ color: iconColor }} onClick={() => navigate('/cart')}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </IconButton>

            <IconButton
              onClick={() => navigate(isLoggedIn ? '/account' : '/auth')}
              sx={{ color: iconColor }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: isDark ? 'rgba(232,0,111,0.15)' : '#fce7f3',
                  color: '#e8006f',
                }}
              >
                <AccountCircleIcon fontSize="small" />
              </Avatar>
            </IconButton>

            {!isMobile && (
              <Button
                onClick={() => navigate('/become-seller')}
                variant="contained"
                sx={{
                  ml: 1,
                  backgroundColor: '#e8006f',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderRadius: '8px',
                  px: 2,
                  py: 0.8,
                  whiteSpace: 'nowrap',
                  minWidth: 'auto',
                  boxShadow: isDark
                    ? '0 0 20px rgba(232,0,111,0.35)'
                    : '0 2px 8px rgba(232,0,111,0.3)',
                  '&:hover': {
                    backgroundColor: '#c4005d',
                    boxShadow: '0 4px 16px rgba(232,0,111,0.5)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Become Seller
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <CustomDrawer
        textColorIcon="oklch(0.59 0.25 0.58 / 1)"
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
    </div>
  );
};

export default Navbar;