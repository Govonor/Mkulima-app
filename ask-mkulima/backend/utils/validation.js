// ask-mkulima/backend/utils/validation.js

const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('farmer', 'business', 'admin').required(),
  // Add other registration fields here
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

function validate(schema, data) {
  const { error, value } = schema.validate(data);
  if (error) {
    return { error: error.details[0].message };
  }
  return { value };
}

module.exports = {
  registerSchema,
  loginSchema,
  validate,
};