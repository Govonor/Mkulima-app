const Joi = require("joi");

// Validation for user registration
const registerValidation = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(10).max(15).required(),
    location: Joi.string().min(5).required(),
    role: Joi.string().valid("farmer", "business", "admin").required(),
  });

  return schema.validate(data);
};

// Validation for user login
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Validation for adding a product (e.g., for farmers)
const productValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    price: Joi.number().min(1).required(),
    category: Joi.string().required(),
    stock: Joi.number().min(1).required(),
    imageUrl: Joi.string().uri().required(),
  });

  return schema.validate(data);
};

// Validation for order placement
const orderValidation = (data) => {
  const schema = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
    deliveryAddress: Joi.string().min(10).required(),
    paymentMethod: Joi.string().valid("M-Pesa", "Stripe", "PayPal", "COD").required(),
  });

  return schema.validate(data);
};

// Validation for updating a user's profile
const updateProfileValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(10).max(15),
    location: Joi.string().min(5),
  });

  return schema.validate(data);
};

// Export all validation functions
module.exports = {
  registerValidation,
  loginValidation,
  productValidation,
  orderValidation,
  updateProfileValidation,
};
