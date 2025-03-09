import React, { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthService } from '../services/authService';
import { User } from '../types/user';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PaymentIcon from '@mui/icons-material/Payment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Ask Mkulima' }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    setUser(AuthService.getUser());
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    router.push('/login');
    handleMenuClose();
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getDrawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} href="/">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {user ? (
          <>
            <ListItem button component={Link} href={user.role === 'farmer' ? '/farmers/profile' : '/businesses/profile'}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            {user.role === 'farmer' && (
              <>
                <ListItem button component={Link} href="/farmers/listings">
                  <ListItemIcon><ListAltIcon /></ListItemIcon>
                  <ListItemText primary="Listings" />
                </ListItem>
                <ListItem button component={Link} href="/farmers/add-product">
                  <ListItemIcon><AddCircleIcon /></ListItemIcon>
                  <ListItemText primary="Add Product" />
                </ListItem>
                <ListItem button component={Link} href="/farmers/orders">
                  <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem button component={Link} href="/farmers/payments">
                  <ListItemIcon><PaymentIcon /></ListItemIcon>
                  <ListItemText primary="Payments" />
                </ListItem>
              </>
            )}
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} href="/login">
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} href="/register">
              <ListItemIcon><AppRegistrationIcon /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
        <ListItem button component={Link} href="/terms">
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="Terms" />
        </ListItem>
      </List>
    </Box>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>{title}</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <Image
              src="/images/logo.png"
              alt="Ask Mkulima Application Logo"
              width={40}
              height={40}
              style={{ marginRight: '10px' }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'green' }}>
              Ask Mkulima
            </Typography>
          </Link>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" component={Link} href="/chat" aria-label="chat">
                <ChatIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt={user.name} src={user.profilePicture} />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {getDrawerList()}
      </Drawer>
      <main style={{ padding: '20px', flex: '1' }}>{children}</main>
      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {' Ask Mkulima.'}
          </Typography>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;