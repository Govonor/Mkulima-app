import React from 'react';
import { Box, Typography } from '@mui/material';

interface TypingIndicatorProps {
  userId: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userId }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <Typography variant="caption" color="textSecondary">
        {userId} is typing...
      </Typography>
      {/* Add animated dots or other visual indicators here */}
      <Box
        sx={{
          display: 'inline-flex',
          marginLeft: '8px',
          '& span': {
            width: '6px',
            height: '6px',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '50%',
            margin: '0 2px',
            animation: 'typingDots 1.4s infinite ease-in-out both',
          },
          '& span:nth-child(2)': {
            animationDelay: '0.2s',
          },
          '& span:nth-child(3)': {
            animationDelay: '0.4s',
          },
        }}
      >
        <span />
        <span />
        <span />
      </Box>
      <style jsx>{`
        @keyframes typingDots {
          0%,
          80%,
          100% {
            transform: scale(0.3);
            background-color: rgba(0, 0, 0, 0.3);
          }
          40% {
            transform: scale(1);
            background-color: rgba(0, 0, 0, 0.7);
          }
        }
      `}</style>
    </Box>
  );
};

export default TypingIndicator;