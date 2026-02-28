import {
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  CardGiftcard as CardGiftcardIcon,
  AccountCircle as AccountCircleIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

export default function CustomDrawer({
  children,
  textColorIcon = "#4d194d", 
  className,
  categories = [],
  mobileOpen,
  handleDrawerToggle,
  ...props
}) {
  const drawer = (
    <div className={`p-4 ${className}`}>
      <div className="flex justify-end">
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon style={{ color: textColorIcon }} />
        </IconButton>
      </div>
      <div className="p-4 flex justify-center">
        <Typography
          variant="h6"
          style={{ fontWeight: "bold", color: textColorIcon }}
        >
          Gift Haven
        </Typography>
      </div>
      <Divider className="my-3" />
      <div className="p-2">
        <InputBase
          placeholder="Search for gifts..."
          className="bg-gray-100 w-full p-2 rounded-lg"
          startAdornment={<SearchIcon className="text-gray-400 mr-2" />}
        />
      </div>
      <Divider className="my-3" />
      <List>
        <ListItem button>
          <ListItemIcon>
            <CardGiftcardIcon style={{ color: textColorIcon }} />
          </ListItemIcon>
          <ListItemText primary="Shop All Gifts" />
        </ListItem>

        {categories.map((category) => (
          <ListItem button key={category.name}>
            <ListItemIcon>
              {React.cloneElement(category.icon, {
                style: { color: textColorIcon },
              })}
            </ListItemIcon>
            <ListItemText primary={category.name} />
          </ListItem>
        ))}
      </List>
      <Divider className="my-3" />
      <List>
        <ListItem button>
          <ListItemIcon>
            <AccountCircleIcon style={{ color: textColorIcon }} />
          </ListItemIcon>
          <ListItemText primary="My Account" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon style={{ color: textColorIcon }} />
          </ListItemIcon>
          <ListItemText primary="Wishlist" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
    >
      {drawer}
    </Drawer>
  );
}
