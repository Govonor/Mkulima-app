require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
//const reviewRoutes = require('./routes/reviewRoutes');
const chatRoutes = require('./routes/chatRoutes');
const loanRoutes = require('./routes/loanRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Middleware
const errorHandler = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing request bodies
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data

// Serve static files (for example, images uploaded by users)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI not found in environment variables. Check your .env file.");
  process.exit(1); // Exit the app if URI is missing
}

mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit the app if connection fails
  });

// Routes for different features
app.use('/api/auth', authRoutes);          // Authentication (sign up, login)
app.use('/api/users', userRoutes);         // User profile management
app.use('/api/products', productRoutes);  // Product management (CRUD)
app.use('/api/orders', orderRoutes);      // Order management (create, view, etc.)
app.use('/api/payments', paymentRoutes);  // Payment processing (M-Pesa, Stripe, etc.)
app.use('/api/deliveries', deliveryRoutes);  // Delivery (tracking, logistics)
//app.use('/api/reviews', reviewRoutes);    // Reviews (product ratings, feedback)
app.use('/api/chats', chatRoutes);        // Chatbot (AI assistant, inquiries)
app.use('/api/loans', loanRoutes);        // Loan (microloan and financial services)
app.use('/api/admin', adminRoutes);      // Admin routes for platform management

// Sample route
app.get('/', (req, res) => {
  res.send('🌱 Welcome to Ask Mkulima Backend');
});

// Error Handling Middleware (catch all errors)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
