const winston = require('winston');

// Set up custom logging levels
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'cyan',
    debug: 'blue',
    silly: 'magenta',
  },
};

// Create the logger
const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    // Console transport for development
    new winston.transports.Console({
      level: 'debug', // Only log messages with 'debug' level or higher
      format: winston.format.combine(
        winston.format.colorize(), // Colorize the output
        winston.format.simple(),   // Simple format (e.g., timestamp, level, message)
      ),
    }),

    // File transport for error logs
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error', // Log only error messages to file
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),

    // File transport for all logs
    new winston.transports.File({
      filename: 'logs/combined.log', // This will store all log messages
      level: 'info',  // Log messages with 'info' level or higher
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

// If we're in production, set up the transport for HTTP logs
if (process.env.NODE_ENV === 'production') {
  logger.add(
    new winston.transports.Http({
      host: 'localhost', // For example, can send logs to a remote server
      port: 3000,
      path: '/log',
      level: 'info',
    })
  );
}

// Adding colors to the logger levels for console output
winston.addColors(logLevels.colors);

// Export the logger for use in other files
module.exports = logger;
