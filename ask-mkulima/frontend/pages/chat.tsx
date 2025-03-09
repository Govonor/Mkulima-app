// ask-mkulima/frontend/pages/chat.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { AuthService } from '../services/authService';
import { User } from '../types/user';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TypingIndicator from '../components/Chat/TypingIndicator';

const ChatPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const socket = useRef<any>(null);
  const [typing, setTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    setUser(AuthService.getUser());

    if (!user) {
      router.push('/login');
      return;
    }

    socket.current = io('http://localhost:3001'); // Replace with your server URL

    socket.current.on('connect', () => {
      console.log('Connected to server');
      socket.current.emit('join_room', user.id);
    });

    socket.current.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.current.on('typing', (userId) => {
      if (!typingUsers.includes(userId)) {
        setTypingUsers((prev) => [...prev, userId]);
      }
    });

    socket.current.on('stopped typing', (userId) => {
      setTypingUsers((prev) => prev.filter((id) => id !== userId));
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) return;

    const newMessage = {
      sender: user.id,
      message: message,
      timestamp: new Date().toISOString(),
    };

    if (socket.current) {
      socket.current.emit('send_message', newMessage);
    }

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (socket.current && !typing) {
      socket.current.emit('typing', user.id);
      setTyping(true);
    }
    if (e.target.value === "" && typing) {
      socket.current.emit('stopped typing', user.id);
      setTyping(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, backgroundColor: '#e8f5e9' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ marginBottom: '10px', backgroundColor: '#fff', borderRadius: '8px', padding: '15px' }}>
              <Avatar sx={{ marginRight: '15px' }}>{msg.sender.substring(0, 2).toUpperCase()}</Avatar>
              <ListItemText
                primary={<Typography variant="body1">{msg.message}</Typography>}
                secondary={<Typography variant="caption">{new Date(msg.timestamp).toLocaleTimeString()}</Typography>}
              />
            </ListItem>
          ))}
          {typingUsers.map((userId) => (
            <ListItem key={userId}>
              <TypingIndicator userId={userId} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
            variant="outlined"
            size="small"
            sx={{ marginRight: '10px' }}
          />
          <Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
            Send
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ChatPage;