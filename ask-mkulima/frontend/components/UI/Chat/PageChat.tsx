// ask-mkulima/frontend/components/Chat/PageChat.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const ChatPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6">Chat</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
        {/* Chat messages will go here */}
        <Typography variant="body2" color="textSecondary">
          This is where the chat messages will be displayed.
        </Typography>
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
        {/* Input area for typing messages */}
        <Typography variant="body2" color="textSecondary">
          This is where the input area for typing messages will be.
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatPage;