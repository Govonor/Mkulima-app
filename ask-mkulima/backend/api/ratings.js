// ask-mkulima/backend/api/ratings.js

const express = require('express');
const router = express.Router();
const Rating = require('../database/models/Rating'); // Import your Rating model
const logger = require('../utils/logger');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');
const { ObjectId } = require('mongoose').Types;

// Create a new rating (requires user authentication)
router.post('/', authMiddleware(['user', 'admin', 'staff']), async (req, res) => {
  const { error, value } = validation.validate(validation.ratingSchema, req.body);
  if (error) {
    logger.warn(`Rating creation validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const rating = new Rating({
      ...value,
      userId: req.user.id, // Set the userId from the authenticated user
    });
    await rating.save();
    res.status(201).json(rating);
  } catch (err) {
    logger.error(`Error creating rating: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get all ratings (public access)
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (err) {
    logger.error(`Error getting ratings: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get rating by ID (public access)
router.get('/:id', async (req, res) => {
  const ratingId = req.params.id;

  if (!ObjectId.isValid(ratingId)) {
    return res.status(400).json({ error: 'Invalid rating ID' });
  }

  try {
    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }
    res.json(rating);
  } catch (err) {
    logger.error(`Error getting rating by ID: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Update rating by ID (requires user authentication and ownership or admin)
router.put('/:id', authMiddleware(['user', 'admin', 'staff']), async (req, res) => {
  const ratingId = req.params.id;

  if (!ObjectId.isValid(ratingId)) {
    return res.status(400).json({ error: 'Invalid rating ID' });
  }

  const { error, value } = validation.validate(validation.ratingUpdateSchema, req.body);
  if (error) {
    logger.warn(`Rating update validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    // Check if the user is authorized to update this rating
    if (req.user.role !== 'admin' && req.user.role !== 'staff' && rating.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedRating = await Rating.findByIdAndUpdate(ratingId, value, { new: true });
    res.json(updatedRating);
  } catch (err) {
    logger.error(`Error updating rating: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Delete rating by ID (requires user authentication and ownership or admin)
router.delete('/:id', authMiddleware(['user', 'admin', 'staff']), async (req, res) => {
  const ratingId = req.params.id;

  if (!ObjectId.isValid(ratingId)) {
    return res.status(400).json({ error: 'Invalid rating ID' });
  }

  try {
    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    // Check if the user is authorized to delete this rating
    if (req.user.role !== 'admin' && req.user.role !== 'staff' && rating.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Rating.findByIdAndDelete(ratingId);
    res.json({ message: 'Rating deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting rating: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;