
module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/askmkulima',
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
  mpesaConsumerKey: process.env.MPESA_CONSUMER_KEY,
  mpesaConsumerSecret: process.env.MPESA_CONSUMER_SECRET,
  mpesaSandboxUrl: process.env.MPESA_SANDBOX_URL || 'https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
  
  logLevel: process.env.LOG_LEVEL || 'info',
  dialogflowProjectId: process.env.DIALOGFLOW_PROJECT_ID,
  // Add other configurations here
};