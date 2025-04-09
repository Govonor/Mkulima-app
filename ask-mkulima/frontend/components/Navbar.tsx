import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import ChatIcon from '@mui/icons-material/Chat';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthService } from '../services/authService';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState<string>('en');
  const isMenuOpen = Boolean(anchorEl);
  const user = AuthService.getUser(); // This is where you get the user data

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    // Implement actual language change here, e.g., switching text in components
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'green' }}>
              Ask Mkulima
            </Typography>
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" component={Link} href="/chat" aria-label="chat">
              <ChatIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => changeLanguage(language === 'en' ? 'sw' : 'en')}>
              <LanguageIcon />
            </IconButton>
            {user && (
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
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {}}>Profile</MenuItem>
        <MenuItem onClick={() => {}}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Navbar;
