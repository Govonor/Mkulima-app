const Chatbot = require('../models/Chatbot'); // Assuming you have a Chatbot model
const { generateResponse } = require('../utils/chatbotHelper'); // Helper function for generating responses

// @desc    Handle user queries to the chatbot
// @route   POST /api/chatbot/ask
// @access  Public
exports.askQuestion = async (req, res) => {
  try {
    const { userQuery } = req.body;

    // Validate user query
    if (!userQuery || userQuery.trim().length === 0) {
      return res.status(400).json({ message: 'Query cannot be empty' });
    }

    // Get chatbot response using a helper function
    const chatbotResponse = await generateResponse(userQuery);

    // Save conversation to the database if necessary (optional)
    const newConversation = new Chatbot({
      userQuery,
      chatbotResponse,
    });

    await newConversation.save();

    // Send back the chatbot response to the user
    res.status(200).json({ response: chatbotResponse });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all previous chatbot conversations
// @route   GET /api/chatbot/history
// @access  Admin
exports.getConversationHistory = async (req, res) => {
  try {
    const conversations = await Chatbot.find();

    if (!conversations.length) {
      return res.status(404).json({ message: 'No conversations found' });
    }

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
