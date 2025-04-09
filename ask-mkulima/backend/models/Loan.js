const mongoose = require('mongoose');

const loanSchema = mongoose.Schema(
  {
    borrowerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    loanTerm: {
      type: Number, // Loan term in months or years
      required: true,
    },
    interestRate: {
      type: Number,
      required: true, // Interest rate as a percentage
    },
    repaymentSchedule: {
      type: String, // e.g., 'Monthly', 'Quarterly'
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    amountPaid: {
      type: Number,
      default: 0, // Amount the borrower has paid so far
    },
    outstandingBalance: {
      type: Number,
      default: 0, // Remaining balance of the loan
    },
    loanStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected', 'Paid'], // Status of the loan
      default: 'Pending',
    },
    repaymentStatus: {
      type: String,
      enum: ['Pending', 'Paid'],
      default: 'Pending', // Status of repayment
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
