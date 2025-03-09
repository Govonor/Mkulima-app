// ask-mkulima/backend/api/loans.js

const express = require('express');
const router = express.Router();
const Loan = require('../database/models/Loan'); // Import your Loan model
const logger = require('../utils/logger');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');
const { ObjectId } = require('mongoose').Types;

// Create a new loan (requires admin or staff role)
router.post('/', authMiddleware(['admin', 'staff']), async (req, res) => {
  const { error, value } = validation.validate(validation.loanSchema, req.body);
  if (error) {
    logger.warn(`Loan creation validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const loan = new Loan(value);
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    logger.error(`Error creating loan: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get all loans (requires admin or staff role)
router.get('/', authMiddleware(['admin', 'staff']), async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json(loans);
  } catch (err) {
    logger.error(`Error getting loans: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get loan by ID (requires admin or staff role)
router.get('/:id', authMiddleware(['admin', 'staff']), async (req, res) => {
  const loanId = req.params.id;

  if (!ObjectId.isValid(loanId)) {
    return res.status(400).json({ error: 'Invalid loan ID' });
  }

  try {
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(loan);
  } catch (err) {
    logger.error(`Error getting loan by ID: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Update loan by ID (requires admin or staff role)
router.put('/:id', authMiddleware(['admin', 'staff']), async (req, res) => {
  const loanId = req.params.id;

  if (!ObjectId.isValid(loanId)) {
    return res.status(400).json({ error: 'Invalid loan ID' });
  }

  const { error, value } = validation.validate(validation.loanUpdateSchema, req.body);
  if (error) {
    logger.warn(`Loan update validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(loanId, value, { new: true });
    if (!updatedLoan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json(updatedLoan);
  } catch (err) {
    logger.error(`Error updating loan: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Delete loan by ID (requires admin role)
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
  const loanId = req.params.id;

  if (!ObjectId.isValid(loanId)) {
    return res.status(400).json({ error: 'Invalid loan ID' });
  }

  try {
    const deletedLoan = await Loan.findByIdAndDelete(loanId);
    if (!deletedLoan) {
      return res.status(404).json({ error: 'Loan not found' });
    }
    res.json({ message: 'Loan deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting loan: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;