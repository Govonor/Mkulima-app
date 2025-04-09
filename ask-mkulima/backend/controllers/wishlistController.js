const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");
    if (!wishlist) {
      return res.status(404).json({ message: "No wishlist found for this user" });
    }
    res.status(200).json(wishlist.products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching wishlist", details: err.message });
  }
};

// @desc    Add a product to the user's wishlist
// @route   POST /api/wishlist/:productId
// @access  Private
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        products: [productId],
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
      }
    }

    await wishlist.save();
    res.status(200).json({ message: "Product added to wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ error: "Error adding to wishlist", details: err.message });
  }
};

// @desc    Remove a product from the user's wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter((item) => item.toString() !== productId);

    await wishlist.save();
    res.status(200).json({ message: "Product removed from wishlist", wishlist });
  } catch (err) {
    res.status(500).json({ error: "Error removing from wishlist", details: err.message });
  }
};
