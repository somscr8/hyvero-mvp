import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/errors.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedError('Authentication required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new UnauthorizedError('Admin access required'));
  }
  next();
};