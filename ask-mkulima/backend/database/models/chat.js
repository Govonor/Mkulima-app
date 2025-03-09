// ask-mkulima/backend/database/models/Chat.js

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  roomId: { // optional if you want a room based chat.
    type: String
  }
});

module.exports = mongoose.model('Chat', chatSchema);