// paymentGateway.js

const dotenv = require('dotenv');
const axios = require('axios');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Stripe secret key

dotenv.config();

// M-Pesa Configurations
const mpesaConfig = {
  shortcode: process.env.MPESA_SHORTCODE,  // Shortcode for M-Pesa
  lipaNaMpesaOnline: process.env.LIPA_NA_MPESA_ONLINE, // Lipa na M-Pesa online shortcode
  lipaNaMpesaShortcode: process.env.LIPA_NA_MPESA_SHORTCODE,  // Lipa na M-Pesa shortcode
  lipaNaMpesaShortcodeShortcode: process.env.MPESA_SHORTCODE,  // Lipa na M-Pesa shortcode for validation
  lipaNaMpesaSecurityKey: process.env.MPESA_SECURITY_KEY,  // Lipa na M-Pesa security key
  lipaNaMpesaSecurityPassword: process.env.MPESA_SECURITY_PASSWORD,  // Lipa na M-Pesa password
  lipaNaMpesaPhoneNumber: process.env.MPESA_PHONE_NUMBER,  // Phone number for M-Pesa
  lipaNaMpesaShortcodeUser: process.env.MPESA_SHORTCODE_USER, // M-Pesa Shortcode User
};

// M-Pesa Payment Function
const initiateMpesaPayment = async (amount, phoneNumber) => {
  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      shortCode: mpesaConfig.shortcode,
      lipaNaMpesaOnline: mpesaConfig.lipaNaMpesaOnline,
      lipaNaMpesaSecurityKey: mpesaConfig.lipaNaMpesaSecurityKey,
      lipaNaMpesaSecurityPassword: mpesaConfig.lipaNaMpesaSecurityPassword,
      lipaNaMpesaShortcode: mpesaConfig.lipaNaMpesaShortcode,
      phoneNumber: mpesaConfig.lipaNaMpesaPhoneNumber,
      amount: amount,
      // Additional fields and configurations depending on the M-Pesa API you're using
    });

    // Handle response and return result
    return response.data;
  } catch (error) {
    console.error('M-Pesa Payment Error:', error);
    throw new Error('Error initiating M-Pesa payment');
  }
};

// Stripe Payment Function
const initiateStripePayment = async (amount, currency = 'usd') => {
  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,  // Stripe expects the amount in cents
      currency: currency,
    });

    return paymentIntent.client_secret; // Return the client secret for Stripe frontend handling
  } catch (error) {
    console.error('Stripe Payment Error:', error);
    throw new Error('Error initiating Stripe payment');
  }
};

// Export functions for usage in other parts of the application
module.exports = {
  initiateMpesaPayment,
  initiateStripePayment,
};
