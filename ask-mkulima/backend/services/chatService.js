const Chat = require('../database/models/Chat');

const chatService = {
  async getMessages(userId) {
    try {
      // Example: Get messages for a specific user (or room)
      const messages = await Chat.find({
        $or: [{ sender: userId }, { roomId: userId }], // Example: Get messages for user or room
      }).sort({ timestamp: 1 });
      return messages;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  },

  async createMessage(messageData) {
    try {
        const newMessage = new Chat(messageData);
        await newMessage.save();
        return newMessage;
    } catch (error) {
        console.error('Error creating message:', error);
        throw error;
    }
  },

  // Add other chat-related service methods as needed
};

module.exports = chatService;