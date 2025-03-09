// ask-mkulima/backend/api/delivery.js

const express = require('express');
const router = express.Router();
const Delivery = require('../database/models/Delivery'); // Import your Delivery model
const logger = require('../utils/logger');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');
const { ObjectId } = require('mongoose').Types;

// Create a new delivery (requires admin or staff role)
router.post('/', authMiddleware(['admin', 'staff']), async (req, res) => {
  const { error, value } = validation.validate(validation.deliverySchema, req.body);
  if (error) {
    logger.warn(`Delivery creation validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const delivery = new Delivery(value);
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    logger.error(`Error creating delivery: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get all deliveries (requires admin or staff role)
router.get('/', authMiddleware(['admin', 'staff']), async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    logger.error(`Error getting deliveries: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get delivery by ID (requires admin or staff role)
router.get('/:id', authMiddleware(['admin', 'staff']), async (req, res) => {
  const deliveryId = req.params.id;

  if (!ObjectId.isValid(deliveryId)) {
    return res.status(400).json({ error: 'Invalid delivery ID' });
  }

  try {
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.json(delivery);
  } catch (err) {
    logger.error(`Error getting delivery by ID: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Update delivery by ID (requires admin or staff role)
router.put('/:id', authMiddleware(['admin', 'staff']), async (req, res) => {
  const deliveryId = req.params.id;

  if (!ObjectId.isValid(deliveryId)) {
    return res.status(400).json({ error: 'Invalid delivery ID' });
  }

  const { error, value } = validation.validate(validation.deliveryUpdateSchema, req.body);
  if (error) {
    logger.warn(`Delivery update validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(deliveryId, value, { new: true });
    if (!updatedDelivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.json(updatedDelivery);
  } catch (err) {
    logger.error(`Error updating delivery: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Delete delivery by ID (requires admin role)
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
  const deliveryId = req.params.id;

  if (!ObjectId.isValid(deliveryId)) {
    return res.status(400).json({ error: 'Invalid delivery ID' });
  }

  try {
    const deletedDelivery = await Delivery.findByIdAndDelete(deliveryId);
    if (!deletedDelivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    res.json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting delivery: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;