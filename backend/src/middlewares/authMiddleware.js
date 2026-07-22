import jwt from 'jsonwebtoken';
import AppError from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Authentication required. Missing token.', 401));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new AppError('Server configuration error: JWT_SECRET environment variable is missing.', 500));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Token has expired. Please log in again.', 401));
    }
    return next(new AppError('Invalid token. Please log in again.', 401));
  }

  const userId = decoded.userId || decoded.id;
  if (!userId) {
    return next(new AppError('Invalid token payload.', 401));
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  req.user = user;
  next();
});
