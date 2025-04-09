const mongoose = require('mongoose');

const chatbotSchema = mongoose.Schema(
  {
    userQuery: {
      type: String,
      required: true,
      trim: true,
    },
    chatbotResponse: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Chatbot = mongoose.model('Chatbot', chatbotSchema);

module.exports = Chatbot;
