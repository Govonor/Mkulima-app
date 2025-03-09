// ask-mkulima/backend/api/payments.js

const express = require('express');
const router = express.Router();
const Payment = require('../database/models/Payment'); // Import your Payment model
const logger = require('../utils/logger');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');
const { ObjectId } = require('mongoose').Types;

// Create a new payment (requires admin or staff role)
router.post('/', authMiddleware(['admin', 'staff']), async (req, res) => {
  const { error, value } = validation.validate(validation.paymentSchema, req.body);
  if (error) {
    logger.warn(`Payment creation validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const payment = new Payment(value);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    logger.error(`Error creating payment: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get all payments (requires admin or staff role)
router.get('/', authMiddleware(['admin', 'staff']), async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    logger.error(`Error getting payments: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get payment by ID (requires admin or staff role)
router.get('/:id', authMiddleware(['admin', 'staff']), async (req, res) => {
  const paymentId = req.params.id;

  if (!ObjectId.isValid(paymentId)) {
    return res.status(400).json({ error: 'Invalid payment ID' });
  }

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    logger.error(`Error getting payment by ID: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Update payment by ID (requires admin or staff role)
router.put('/:id', authMiddleware(['admin', 'staff']), async (req, res) => {
  const paymentId = req.params.id;

  if (!ObjectId.isValid(paymentId)) {
    return res.status(400).json({ error: 'Invalid payment ID' });
  }

  const { error, value } = validation.validate(validation.paymentUpdateSchema, req.body);
  if (error) {
    logger.warn(`Payment update validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, value, { new: true });
    if (!updatedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(updatedPayment);
  } catch (err) {
    logger.error(`Error updating payment: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Delete payment by ID (requires admin role)
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
  const paymentId = req.params.id;

  if (!ObjectId.isValid(paymentId)) {
    return res.status(400).json({ error: 'Invalid payment ID' });
  }

  try {
    const deletedPayment = await Payment.findByIdAndDelete(paymentId);
    if (!deletedPayment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting payment: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;