export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: err.message
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.errors.map(e => e.message)
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
};