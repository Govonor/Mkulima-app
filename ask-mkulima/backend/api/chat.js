const express = require('express');
const router = express.Router();
const chatService = require('../services/chatService');

// Example: Get chat messages for a user (or room)
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const messages = await chatService.getMessages(userId);
    res.json(messages);
  } catch (error) {
    console.error('Error getting chat messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Example: Send a chat message (if needed via API)
router.post('/', async (req, res) => {
    try {
        const { sender, message, timestamp } = req.body;
        const newMessage = await chatService.createMessage({ sender, message, timestamp });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;