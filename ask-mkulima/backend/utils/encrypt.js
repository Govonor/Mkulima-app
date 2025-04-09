const bcrypt = require('bcryptjs');

/**
 * Encrypt password using bcryptjs
 * @param {string} password - Plaintext password
 * @returns {string} - Encrypted password
 */
const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt
    const encryptedPassword = await bcrypt.hash(password, salt);  // Hash the password with the salt
    return encryptedPassword;
  } catch (error) {
    throw new Error("Error encrypting password: " + error.message);
  }
};

/**
 * Compare a plaintext password with an encrypted password
 * @param {string} password - Plaintext password
 * @param {string} encryptedPassword - The encrypted password to compare against
 * @returns {boolean} - Returns true if passwords match, false otherwise
 */
const comparePassword = async (password, encryptedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, encryptedPassword);  // Compare the two passwords
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing passwords: " + error.message);
  }
};

module.exports = {
  encryptPassword,
  comparePassword
};
