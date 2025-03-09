const express = require('express');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const connectDB = require('./config/database');
const authRoutes = require('./api/auth/auth');
const userRoutes = require('./api/users');
const productRoutes = require('./api/products');
const orderRoutes = require('./api/orders');
const paymentRoutes = require('./api/payments');
const deliveryRoutes = require('./api/deliveries');
const loanRoutes = require('./api/loans');
const ratingRoutes = require('./api/ratings');
const chatRoutes = require('./api/chat');
const { setupSocket } = require('./utils/socket');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/chat', chatRoutes);

// Socket.IO setup
const server = http.createServer(app);
setupSocket(server);

// Error handler (must be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});

module.exports = app;