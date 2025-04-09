const mongoose = require('mongoose');

const deliverySchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // Reference to the Order model
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (buyer)
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (farmer)
      required: true,
    },
    deliveryProvider: {
      type: String,
      enum: ['Glovo', 'Sendy', 'Panda'], // Allowed delivery services
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'In-Transit', 'Delivered', 'Failed'],
      default: 'Pending',
    },
    trackingId: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Date,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['M-Pesa', 'Stripe', 'PayPal', 'Cash'],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
