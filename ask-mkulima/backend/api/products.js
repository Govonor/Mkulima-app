// ask-mkulima/backend/api/products.js

const express = require('express');
const router = express.Router();
const Product = require('../database/models/Product'); // Import your Product model
const logger = require('../utils/logger');
const authMiddleware = require('../middleware/authMiddleware');
const validation = require('../utils/validation');
const { ObjectId } = require('mongoose').Types;
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create a new product (requires admin or staff role)
router.post('/', authMiddleware(['admin', 'staff']), upload.single('image'), async (req, res) => {
  const { error, value } = validation.validate(validation.productSchema, req.body);
  if (error) {
    logger.warn(`Product creation validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const product = new Product({
      ...value,
      image: req.file ? req.file.filename : null, // Store the filename
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    logger.error(`Error creating product: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get all products (public access)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    logger.error(`Error getting products: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Get product by ID (public access)
router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    logger.error(`Error getting product by ID: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Update product by ID (requires admin or staff role)
router.put('/:id', authMiddleware(['admin', 'staff']), upload.single('image'), async (req, res) => {
  const productId = req.params.id;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const { error, value } = validation.validate(validation.productUpdateSchema, req.body);
  if (error) {
    logger.warn(`Product update validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const updateData = {
      ...value,
      ...(req.file && { image: req.file.filename }),
    };

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    logger.error(`Error updating product: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Delete product by ID (requires admin role)
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
  const productId = req.params.id;

  if (!ObjectId.isValid(productId)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    logger.error(`Error deleting product: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;