const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../database/models/User');
const validation = require('../../utils/validation');
const logger = require('../../utils/logger');
const config = require('../../config/config');

// Register route
router.post('/register', async (req, res) => {
  const { error, value } = validation.validate(validation.registerSchema, req.body);
  if (error) {
    logger.warn(`Registration validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const { password, ...userData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

    logger.info(`User registered: ${user.email}`);
    res.json({ user, token });
  } catch (err) {
    logger.error(`Registration error: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { error, value } = validation.validate(validation.loginSchema, req.body);
  if (error) {
    logger.warn(`Login validation failed: ${error}`);
    return res.status(400).json({ error });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn(`Login failed: Invalid credentials for ${email}`);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logger.warn(`Login failed: Invalid credentials for ${email}`);
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

    logger.info(`User logged in: ${user.email}`);
    res.json({ user, token });
  } catch (err) {
    logger.error(`Login error: ${err.message}`, err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;