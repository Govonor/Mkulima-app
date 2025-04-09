const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,  // MongoDB URI from .env
  SERVER_PORT: process.env.PORT || 5000,  // Port to run the server on, default to 5000
};

module.exports = config;
