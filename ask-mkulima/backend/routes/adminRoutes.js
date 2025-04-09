const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware"); // Protect and check for admin role
const {
  getAllUsers,
  getUserById,
  deleteUser,
  getAllProducts,
  getProductById,
  deleteProduct,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/adminController");

// Admin Routes (Protected and Restricted to Admin)

// Users Management
router.get("/users", protect, admin, getAllUsers); // Get all users
router.get("/users/:id", protect, admin, getUserById); // Get a specific user by ID
router.delete("/users/:id", protect, admin, deleteUser); // Delete a user

// Products Management
router.get("/products", protect, admin, getAllProducts); // Get all products
router.get("/products/:id", protect, admin, getProductById); // Get a specific product by ID
router.delete("/products/:id", protect, admin, deleteProduct); // Delete a product

// Orders Management
router.get("/orders", protect, admin, getAllOrders); // Get all orders
router.get("/orders/:id", protect, admin, getOrderById); // Get a specific order by ID
router.put("/orders/:id", protect, admin, updateOrderStatus); // Update order status

module.exports = router;
