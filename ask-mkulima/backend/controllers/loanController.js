const Loan = require('../models/Loan');
const User = require('../models/User');

// @desc    Apply for a Loan
// @route   POST /api/loans/apply
// @access  Private (authenticated user)
exports.applyLoan = async (req, res) => {
  try {
    const { loanAmount, loanTerm, interestRate, repaymentSchedule, startDate, endDate } = req.body;

    // Validate loan amount and other fields
    if (!loanAmount || !loanTerm || !interestRate || !repaymentSchedule || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new loan
    const loan = new Loan({
      borrowerId: req.user.id, // Assuming req.user is populated with the authenticated user's info
      loanAmount,
      loanTerm,
      interestRate,
      repaymentSchedule,
      startDate,
      endDate,
    });

    await loan.save();

    res.status(201).json({
      message: 'Loan application submitted successfully',
      loan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all loans for a user
// @route   GET /api/loans/user
// @access  Private (authenticated user)
exports.getUserLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ borrowerId: req.user.id }).populate('borrowerId', 'name email');

    if (!loans || loans.length === 0) {
      return res.status(404).json({ message: 'No loans found for this user' });
    }

    res.status(200).json({ loans });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Approve or Reject a Loan (Admin Only)
// @route   PUT /api/loans/:id/approve-reject
// @access  Private (Admin)
exports.approveRejectLoan = async (req, res) => {
  try {
    const { loanStatus } = req.body;

    // Validate loanStatus
    if (!['Approved', 'Rejected'].includes(loanStatus)) {
      return res.status(400).json({ message: 'Invalid loan status' });
    }

    // Find the loan by ID
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Check if the user is admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update the loan status
    loan.loanStatus = loanStatus;
    await loan.save();

    res.status(200).json({
      message: `Loan ${loanStatus}`,
      loan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Make a Repayment
// @route   PUT /api/loans/:id/repay
// @access  Private (authenticated user)
exports.repayLoan = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Valid repayment amount required' });
    }

    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Check if the loan belongs to the authenticated user
    if (loan.borrowerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only repay your own loan' });
    }

    // Update the loan repayment details
    loan.amountPaid += amount;
    loan.outstandingBalance -= amount;
    if (loan.outstandingBalance <= 0) {
      loan.loanStatus = 'Paid';
      loan.repaymentStatus = 'Paid';
    }

    await loan.save();

    res.status(200).json({
      message: 'Repayment successful',
      loan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get Loan Details (Admin or User)
// @route   GET /api/loans/:id
// @access  Private (Admin or User)
exports.getLoanDetails = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate('borrowerId', 'name email');

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Check if the user is either an admin or the borrower
    if (req.user.role !== 'Admin' && loan.borrowerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json({ loan });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
