import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Divider, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Corrected import

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = { role: 'business' }; // Dummy user data, replace with actual user state

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    // Handle logout logic here (e.g., clearing user session, etc.)
    console.log('User logged out');
    router.push('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Ask Mkulima</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} href="/">
            <ListItemText primary="Home" />
          </ListItem>

          {user ? (
            <>
              <ListItem button component={Link} href={user.role === 'farmer' ? '/farmers/profile' : '/businesses/profile'}>
                <ListItemText primary="Profile" />
              </ListItem>

              {/* Farmer-specific links */}
              {user.role === 'farmer' && (
                <>
                  <ListItem button component={Link} href="/farmers/listings">
                    <ListItemText primary="Listings" />
                  </ListItem>
                  <ListItem button component={Link} href="/farmers/add-product">
                    <ListItemText primary="Add Product" />
                  </ListItem>
                  <ListItem button component={Link} href="/farmers/orders">
                    <ListItemText primary="Orders" />
                  </ListItem>
                  <ListItem button component={Link} href="/farmers/payments">
                    <ListItemText primary="Payments" />
                  </ListItem>
                </>
              )}

              {/* Business-specific links */}
              {user.role === 'business' && (
                <>
                  <ListItem button component={Link} href="/businesses/orders">
                    <ListItemText primary="Orders" />
                  </ListItem>
                  <ListItem button component={Link} href="/businesses/market">
                    <ListItemText primary="Market Trends" />
                  </ListItem>
                </>
              )}

              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button component={Link} href="/login">
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={Link} href="/register">
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}

          <Divider />
          <ListItem button component={Link} href="/terms">
            <ListItemText primary="Terms" />
          </ListItem>
        </List>
      </Drawer>

      <main>
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default Layout;
