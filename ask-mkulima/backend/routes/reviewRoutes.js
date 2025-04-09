const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Protect routes with authentication middleware
const {
  createReview,
  getReviewsForProduct,
  getProductRating,
} = require("../controllers/reviewController");

// POST /api/reviews/:productId - Create review for a product
router.post("/:productId", protect, createReview);

// GET /api/reviews/:productId - Get all reviews for a product
router.get("/:productId", getReviewsForProduct);

// GET /api/reviews/rating/:productId - Get average rating for a product
router.get("/rating/:productId", getProductRating);

module.exports = router;
