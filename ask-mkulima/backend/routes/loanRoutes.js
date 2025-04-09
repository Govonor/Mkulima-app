const express = require('express');
const router = express.Router();
const { applyLoan, getUserLoans, approveRejectLoan, repayLoan, getLoanDetails } = require('../controllers/loanController');
const { protect, admin } = require('../middleware/authMiddleware');

// Apply for a loan (protected route)
router.post('/apply', protect, applyLoan);

// Get all loans for the authenticated user (protected route)
router.get('/user', protect, getUserLoans);

// Approve or reject a loan (admin only)
router.put('/:id/approve-reject', protect, admin, approveRejectLoan);

// Make a repayment (protected route)
router.put('/:id/repay', protect, repayLoan);

// Get loan details (protected route, only the borrower or admin can access)
router.get('/:id', protect, getLoanDetails);

module.exports = router;
