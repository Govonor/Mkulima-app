// ask-mkulima/backend/services/authService.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');
const config = require('../config/config'); // Import your config file

const authService = {
  async register(userData) {
    try {
      const { password, ...rest } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ ...rest, password: hashedPassword });
      await user.save();

      // Generate JWT token on successful registration
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // Adjust expiration time

      return { user, token };

    } catch (error) {
      console.error('Error in register service:', error);
      throw error;
    }
  },

  async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return { error: 'Invalid credentials' };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { error: 'Invalid credentials' };
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }); // Adjust expiration time

      return { user, token };

    } catch (error) {
      console.error('Error in login service:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const user = await User.findById(userId).select('-password'); // Exclude password
      return user;
    } catch (error) {
      console.error('Error in getUserById service:', error);
      throw error;
    }
  },

  // Add other authentication-related service methods as needed
};

module.exports = authService;