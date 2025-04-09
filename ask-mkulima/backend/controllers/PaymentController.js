const Payment = require('../models/Payment');
const Order = require('../models/Order');
const { processPayment } = require('../services/paymentService'); // Placeholder for payment gateway integration

// @desc    Create Payment
// @route   POST /api/payments/create
// @access  Private
exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, paymentMethod } = req.body;
    
    // Find the order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Process payment through the chosen gateway (M-Pesa, Stripe, PayPal, etc.)
    const transactionId = await processPayment(amount, paymentMethod);
    if (!transactionId) {
      return res.status(400).json({ message: 'Payment failed' });
    }

    // Create payment record
    const payment = new Payment({
      user: order.user,
      order: order._id,
      amount,
      paymentMethod,
      status: 'Completed', // Payment status can be updated after gateway confirmation
      transactionId,
    });

    await payment.save();

    // Update order status
    order.paymentStatus = 'Paid';
    await order.save();

    res.status(201).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get Payments for a User
// @route   GET /api/payments/:userId
// @access  Private
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.params.userId });

    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this user' });
    }

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
