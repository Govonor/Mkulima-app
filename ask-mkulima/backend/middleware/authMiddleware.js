// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protect = (req, res, next) => {
  let token;

  // Check if token is sent in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;  // Add the user id to the request object
    next();  // Proceed to the next middleware
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = protect;
