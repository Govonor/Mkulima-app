import React from 'react';
import { Typography, Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" component="h1" sx={{ textAlign: 'center', color: 'green' }}>
        Welcome to Ask Mkulima
      </Typography>
      <Typography variant="h6" component="p" sx={{ textAlign: 'center' }}>
        Your go-to platform for fresh produce and farming resources.
      </Typography>
    </Box>
  );
};

export default Header;
