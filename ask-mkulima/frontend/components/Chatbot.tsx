// frontend/components/Chatbot.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  TextField,
  Button,
  Paper,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

interface ChatbotProps {
  onClose: () => void;
  chatServiceUrl: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  file?: File;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose, chatServiceUrl }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
      setMessages(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async (file?: File) => {
    if (input.trim() || file) {
      const userMessage: Message = {
        id: uuidv4(),
        text: input,
        sender: 'user',
        timestamp: new Date(),
        file: file,
      };
      setMessages([...messages, userMessage]);
      setInput('');
      setLoading(true);
      setAnchorEl(null);

      try {
        let formData = new FormData();
        if (file) {
          formData.append('file', file);
          formData.append('message', input);
        } else {
          formData.append('message', input);
        }

        const response = await fetch(chatServiceUrl, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bot response');
        }

        const data = await response.json();
        const botMessage: Message = {
          id: uuidv4(),
          text: data.response,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Chatbot error:', error);
        const errorMessage: Message = {
          id: uuidv4(),
          text: 'Sorry, I encountered an error. Please try again later.',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleSendMessage(e.target.files[0]);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    handleMenuClose();
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    handleSendMessage();
    handleMenuClose();
  };

  return (
    <Paper
      elevation={3}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '300px',
        maxHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" p={1} bgcolor="#f0f0f0">
        <Typography variant="subtitle1">Chatbot</Typography>
        <IconButton onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <div
        ref={chatContainerRef}
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '10px',
        }}
        aria-live="polite"
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            style={{
              marginBottom: '8px',
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: message.sender === 'user' ? '#dcf8c6' : '#e8e8e8',
              padding: '8px',
              borderRadius: '8px',
              maxWidth: '70%',
            }}
          >
            <Typography variant="body2">{message.text}</Typography>
            {message.file && (
              <Typography variant="caption" style={{ fontSize: '0.7em', color: '#888' }}>
                {message.file.name}
              </Typography>
            )}
            <Typography variant="caption" style={{ fontSize: '0.7em', color: '#888' }}>
              {format(message.timestamp, 'HH:mm')}
            </Typography>
          </Box>
        ))}
        {loading && (
          <Box display="flex" justifyContent="center" mt={1}>
            <CircularProgress size={20} />
          </Box>
        )}
      </div>
      <Box p={1} display="flex" alignItems="center">
        <IconButton onClick={handleMenuOpen} aria-label="attach">
          <AttachFileIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleUploadClick}>
            <ListItemIcon>
              <AttachFileIcon fontSize="small" />
            </ListItemIcon>
            Upload File
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleQuickReply('Hello')}>
            Quick Reply: Hello
          </MenuItem>
          <MenuItem onClick={() => handleQuickReply('How are you')}>
            Quick Reply: How are you
          </MenuItem>
        </Menu>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          aria-label="chat input"
        />
        <IconButton onClick={handleSendMessage} color="primary" aria-label="send">
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default Chatbot;