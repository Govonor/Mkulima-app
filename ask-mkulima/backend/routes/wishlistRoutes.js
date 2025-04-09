const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Protect routes with authentication middleware
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

// GET /api/wishlist - Get all products in user's wishlist
router.get("/", protect, getWishlist);

// POST /api/wishlist/:productId - Add a product to the wishlist
router.post("/:productId", protect, addToWishlist);

// DELETE /api/wishlist/:productId - Remove a product from the wishlist
router.delete("/:productId", protect, removeFromWishlist);

module.exports = router;
