const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
      required: true, // Product is required
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (the person who wrote the review)
      required: true, // Reviewer is required
    },
    rating: {
      type: Number,
      required: true, // Rating is required
      min: 1, // Minimum rating value
      max: 5, // Maximum rating value
    },
    comment: {
      type: String,
      required: true, // Comment is required
      minlength: 5, // Minimum length of the comment
      maxlength: 500, // Maximum length of the comment
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set to current date
    },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt` fields
);

// Create and export the model for the Review schema
module.exports = mongoose.model('Review', reviewSchema);
