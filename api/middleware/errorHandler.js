export const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.errors.map(e => e.message).join(', ')
    });
  }

  // Sequelize database errors
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).json({
      error: 'Database Error',
      message: 'A database error occurred while processing your request'
    });
  }

  // Custom validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message
    });
  }

  // Authentication errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message || 'Authentication required'
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'An unexpected error occurred'
  });
};