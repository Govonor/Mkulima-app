import React from 'react';
import { Typography, Box } from '@mui/material';

interface TypingIndicatorProps {
  userId: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userId }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <Typography variant="body2" color="textSecondary">
        {userId} is typing...
      </Typography>
    </Box>
  );
};

export default TypingIndicator;
