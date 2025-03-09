// ask-mkulima/backend/utils/errorHandler.js

function errorHandler(err, req, res, next) {
    console.error('Error:', err.stack); // Log the error stack for debugging
  
    // Default error response
    let statusCode = 500;
    let message = 'Internal Server Error';
  
    // Customize error response based on error type (optional)
    if (err.name === 'ValidationError') {
      statusCode = 400;
      message = err.message; // Use the validation error message
    } else if (err.name === 'CastError') {
      statusCode = 400;
      message = 'Invalid data provided.'; // Generic message for cast errors
    } else if (err.name === 'UnauthorizedError') {
      statusCode = 401;
      message = 'Unauthorized access.';
    } else if (err.code === 11000) { // MongoDB duplicate key error
      statusCode = 400;
      message = 'Duplicate key error.';
    } else if (err.message === 'Not Found') {
      statusCode = 404;
      message = 'Resource not found.';
    }
  
    res.status(statusCode).json({
      error: {
        message: message,
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Include stack in dev mode
      },
    });
  }
  
  module.exports = errorHandler;