/**
 * Global error handling middleware.
 * Catches errors and sends a JSON response with the error message.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  };
  
  module.exports = errorHandler;
  