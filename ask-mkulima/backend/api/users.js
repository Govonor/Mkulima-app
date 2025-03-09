const express = require('express');
const router = express.Router();
const User = require('/workspaces/Mkulima-app/ask-mkulima/backend/database/models/User.js');
const logger = require('../../utils/logger');
const authMiddleware = require('../../middleware/authMiddleware');
const validation = require('../../utils/validation');
const { ObjectId } = require('mongoose').Types;

// Get all users (admin only)
router.get('/', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    logger.error(`Error getting users: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID (admin or own user)
router.get('/:id', authMiddleware(['admin', 'user']), async (req, res) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(user);
  } catch (err) {
    logger.error(`Error getting user by ID: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Update user profile (admin or own user)
router.put('/:id', authMiddleware(['admin', 'user']), async (req, res) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const { error, value } = validation.validate(validation.updateProfileSchema, req.body);
  if (error) {
    logger.warn(`Update user validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, value, { new: true }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    logger.error(`Error updating user: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Delete user (admin only)
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting user: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;