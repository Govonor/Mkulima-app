const Product = require("../models/Product");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    
    // Create a new product and associate it with the logged-in user
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      seller: req.user.id, // Seller is linked to the current authenticated user
    });

    // Save the product to the database
    await product.save();
    res.status(201).json(product); // Respond with the created product
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" }); // Error handling
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller"); // Populating the seller field
    res.json(products); // Return the list of products
  } catch (err) {
    res.status(500).json({ error: "Could not fetch products" }); // Error handling
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller"); // Fetch product by ID and populate seller info
    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Handle case where product doesn't exist
    }
    res.json(product); // Return product details
  } catch (err) {
    res.status(500).json({ error: "Error fetching product" }); // Error handling
  }
};

// Update product details
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update product and return updated version
    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Handle case where product doesn't exist
    }
    res.json(product); // Return the updated product
  } catch (err) {
    res.status(500).json({ error: "Error updating product" }); // Error handling
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id); // Delete product by ID
    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Handle case where product doesn't exist
    }
    res.json({ message: "Product deleted successfully" }); // Return success message
  } catch (err) {
    res.status(500).json({ error: "Error deleting product" }); // Error handling
  }
};

// Get products based on category or price range (filtering)
exports.getFilteredProducts = async (req, res) => {
  const { category, priceRange, sortBy } = req.query; // Extract filtering and sorting parameters from query string

  try {
    const filters = {}; // Object to hold filter conditions

    // Add category filter if provided
    if (category) {
      filters.category = category;
    }

    // Add price range filter if provided
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split(',').map(Number); // Parse price range (e.g., '10,50' becomes [10, 50])
      filters.price = { $gte: minPrice, $lte: maxPrice }; // Filter by price range
    }

    // Find products matching the filter conditions
    let products = await Product.find(filters);

    // Sort products if 'sortBy' query parameter is provided
    if (sortBy) {
      const sortCriteria = sortBy === 'price_asc' ? { price: 1 } : (sortBy === 'price_desc' ? { price: -1 } : {});
      products = products.sort((a, b) => {
        if (sortCriteria.price === 1) {
          return a.price - b.price;
        } else if (sortCriteria.price === -1) {
          return b.price - a.price;
        }
        return 0;
      });
    }

    res.json(products); // Return the filtered and sorted products
  } catch (err) {
    res.status(500).json({ error: "Error fetching filtered products" }); // Error handling
  }
};
