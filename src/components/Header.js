import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Badge
} from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import SearchInput from "./Form/Searchinput";
import { useCart } from '../context/cart';

export const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [cart] = useCart();

  // Dropdown state for person icon
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    alert("You have been logged out successfully!");
    navigate("/auth");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0'
      }}
    >
      <Toolbar>

        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ color: 'black', fontWeight: 'bold' }}
        >
          Build Smart
        </Typography>

        {/* Main Navigation */}
        <Box display="flex" marginLeft={4} gap={3} sx={{ flexGrow: 1 }}>
          <Button
            sx={{ color: 'black', textTransform: 'none' }}
            LinkComponent={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            sx={{ color: 'black', textTransform: 'none' }}
            LinkComponent={Link}
            to="/interior"
          >
            Interior Design
          </Button>
          <Button
            sx={{ color: 'black', textTransform: 'none' }}
            LinkComponent={Link}
            to="/exterior"
          >
            Exterior Design
          </Button>

          {/* Search Bar */}
          <SearchInput />

          <Button
            sx={{ color: 'black', textTransform: 'none' }}
            LinkComponent={Link}
            to="/contact"
          >
            Contact
          </Button>
        </Box>

        {/* Person Icon Dropdown */}
        <IconButton onClick={handleClick} sx={{ color: 'black' }}>
          <PersonIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          {!auth.user ? (
            <MenuItem component={Link} to="/auth" onClick={handleClose}>
              Login / Register
            </MenuItem>
          ) : (
            <>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            </>
          )}
        </Menu>

        {/* Cart Icon */}
        <IconButton sx={{ color: 'black' }} component={Link} to="/cart">
          <Badge badgeContent={cart?.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
