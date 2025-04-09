const Review = require("../models/Review");
const Product = require("../models/Product");

// @desc    Create a product review
// @route   POST /api/reviews/:productId
// @access  Private
exports.createReview = async (req, res) => {
  try {
    // Destructure rating and comment from the request body
    const { rating, comment } = req.body;
    const { productId } = req.params;

    // Validate the rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Find the product to associate with the review
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create the review object
    const review = new Review({
      product: productId,
      reviewer: req.user.id, // Assuming the user is authenticated
      rating,
      comment,
    });

    // Save the review to the database
    await review.save();

    // Return the created review with a success message
    res.status(201).json({
      message: "Review created successfully",
      review,
    });
  } catch (err) {
    // Log and send error response
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Failed to create review", details: err.message });
  }
};

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
exports.getReviewsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Retrieve reviews for the product
    const reviews = await Review.find({ product: productId })
      .populate("reviewer", "name email") // Populate reviewer details
      .populate("product", "name price"); // Populate product details

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    // Send back the reviews
    res.status(200).json(reviews);
  } catch (err) {
    // Log and send error response
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews", details: err.message });
  }
};

// @desc    Get the average rating of a product
// @route   GET /api/reviews/rating/:productId
// @access  Public
exports.getProductRating = async (req, res) => {
  try {
    const { productId } = req.params;

    // Retrieve all reviews for the product
    const reviews = await Review.find({ product: productId });

    if (reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    // Calculate the average rating
    const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRatings / reviews.length;

    // Send back the average rating and number of reviews
    res.status(200).json({
      averageRating,
      numberOfReviews: reviews.length,
    });
  } catch (err) {
    // Log and send error response
    console.error("Error calculating average rating:", err);
    res.status(500).json({ error: "Failed to calculate rating", details: err.message });
  }
};
