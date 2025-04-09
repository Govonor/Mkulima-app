// errorMiddleware.js

// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
    // Set default status code to 500 if not already set
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    // Log the error details in the server (for development purposes)
    console.error(err.stack); // In production, you may want to log to a file or an error logging service
  
    // Send error response to the client
    res.status(statusCode).json({
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, // Don't show stack trace in production
    });
  };
  
  module.exports = errorHandler;
  