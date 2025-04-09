// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate phone number (Kenyan phone format: +254xxxxxxxxx)
const isValidPhone = (phone) => {
  const phoneRegex = /^\+254\d{9}$/;
  return phoneRegex.test(phone);
};

// Helper function to generate a random alphanumeric string (e.g., for order IDs or verification codes)
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Helper function to calculate the total price of an order (example: based on product price and quantity)
const calculateTotalPrice = (productPrice, quantity) => {
  return productPrice * quantity;
};

// Helper function to convert currency (example: KES to USD - this can be expanded for other currencies)
const convertCurrency = (amount, rate) => {
  return amount * rate;
};

// Helper function to check if a string is empty
const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};

// Helper function to format a date to a readable string (useful for order timestamps or logs)
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  const moment = require('moment');
  return moment(date).format(format);
};

module.exports = {
  isValidEmail,
  isValidPhone,
  generateRandomString,
  calculateTotalPrice,
  convertCurrency,
  isEmpty,
  formatDate,
};
