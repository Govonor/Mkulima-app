const moment = require('moment');

// Utility function to format date
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  // Use Moment.js to format the date
  if (!date) return null; // If date is not provided, return null

  return moment(date).format(format);
};

module.exports = formatDate;
