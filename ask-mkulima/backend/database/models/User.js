// ask-mkulima/backend/database/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'business', 'admin'], required: true },
  // Add other user fields as needed
}, { timestamps: true }); // Add timestamps

module.exports = mongoose.model('User', userSchema);