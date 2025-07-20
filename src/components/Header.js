import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  Badge
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { useCart } from '../context/cart';
import SearchInput from './Form/Searchinput';

export const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  const isMobile = useMediaQuery('(max-width:576px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setAuth({ user: null, token: '' });
    localStorage.removeItem('auth');
    alert('You have been logged out successfully!');
    navigate('/auth');
    setDrawerOpen(false);
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Interior Design', to: '/interior' },
    { label: 'Exterior Design', to: '/exterior' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar>
          {/* Hamburger for mobile */}
          {isMobile && (
            <IconButton
              edge="start"
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'black', mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: 'black',
              fontWeight: 'bold',
              flexGrow: 1,
            }}
          >
            Build Smart
          </Typography>

          {/* Desktop Nav (unchanged) */}
          {!isMobile && (
            <Box display="flex" marginLeft={4} gap={3} sx={{ flexGrow: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.label}
                  sx={{ color: 'black', textTransform: 'none' }}
                  LinkComponent={Link}
                  to={link.to}
                >
                  {link.label}
                </Button>
              ))}
              <SearchInput />
              
            </Box>
          )}

          {/* Person Menu (only for desktop) */}
          {!isMobile && (
            <>
              <IconButton onClick={handleClick} sx={{ color: 'black' }}>
                <PersonIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
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
                      component={Link}
                      to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                      onClick={handleClose}
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
            </>
          )}

          {/* Cart icon (always visible) */}
          <IconButton sx={{ color: 'black' }} component={Link} to="/cart">
            <Badge badgeContent={cart?.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar Drawer */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 250, p: 2 }}>
            <SearchInput />
            <Divider sx={{ my: 2 }} />
            {navLinks.map((link) => (
              <ListItem
                button
                key={link.label}
                component={Link}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
            {!auth.user ? (
              <ListItem
                button
                component={Link}
                to="/auth"
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemText primary="Login / Register" />
              </ListItem>
            ) : (
              <>
                <ListItem
                  button
                  component={Link}
                  to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )}
          </Box>
        </Drawer>
      )}
    </>
  );
};
