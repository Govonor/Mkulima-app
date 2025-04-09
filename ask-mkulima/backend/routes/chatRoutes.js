const express = require("express");
const router = express.Router();

// Sample route for getting chat history
router.get("/:chatId", (req, res) => {
  const { chatId } = req.params;
  
  // Logic to fetch chat history from a database (e.g., MongoDB)
  // Replace this with your actual logic
  const chatHistory = [
    { sender: "User1", message: "Hello!", timestamp: "2025-04-08 12:00" },
    { sender: "User2", message: "Hi there!", timestamp: "2025-04-08 12:05" },
  ];

  res.json(chatHistory); // Return chat history as a response
});

// Sample route for sending a message
router.post("/send", (req, res) => {
  const { sender, message, chatId } = req.body;

  if (!sender || !message || !chatId) {
    return res.status(400).json({ error: "Sender, message, and chatId are required" });
  }

  // Logic to save the message in the database (e.g., MongoDB)
  // Replace this with your actual logic
  const newMessage = { sender, message, chatId, timestamp: new Date() };

  // Simulating saving to database
  console.log("Message saved:", newMessage);

  res.status(201).json({ message: "Message sent successfully", data: newMessage });
});

module.exports = router;
