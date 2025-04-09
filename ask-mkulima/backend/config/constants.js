// constants.js

const ROLES = {
    ADMIN: 'admin',
    FARMER: 'farmer',
    BUSINESS: 'business',
  };
  
  const PAYMENT_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
  };
  
  const ORDER_STATUS = {
    PENDING: 'pending',
    IN_TRANSIT: 'in_transit',
    DELIVERED: 'delivered',
  };
  
  const ERROR_MESSAGES = {
    USER_EXISTS: 'User already exists',
    INVALID_CREDENTIALS: 'Invalid credentials',
    SERVER_ERROR: 'Server Error',
    USER_NOT_FOUND: 'User not found',
    INVALID_PASSWORD: 'Invalid password',
  };
  
  const API_MESSAGES = {
    SUCCESS: 'Request was successful',
    FAILURE: 'Request failed',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'Unauthorized access',
  };
  
  const SOCKET_EVENTS = {
    NEW_MESSAGE: 'new_message',
    JOIN_ROOM: 'join_room',
    LEAVE_ROOM: 'leave_room',
  };
  
  module.exports = {
    ROLES,
    PAYMENT_STATUS,
    ORDER_STATUS,
    ERROR_MESSAGES,
    API_MESSAGES,
    SOCKET_EVENTS,
  };
  