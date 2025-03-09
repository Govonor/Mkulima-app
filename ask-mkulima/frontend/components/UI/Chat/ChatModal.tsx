// ask-mkulima/frontend/components/Chat/ChatModal.tsx

import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChatPage from '../../../pages/chat'; // Assuming chat.tsx is in pages/chat.tsx

interface ChatModalProps {
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, borderBottom: '1px solid #e0e0e0' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <ChatPage />
      </Box>
    </Box>
  );
};

export default ChatModal;