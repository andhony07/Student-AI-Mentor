import jwt from 'jsonwebtoken';
import AppError from '../utils/errorHandler.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to get access.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_12345');
    
    // Attach decoded user token info directly without querying the DB
    req.user = { _id: decoded.id };
    next();
  } catch (error) {
    return next(new AppError('Invalid token or token expired.', 401));
  }
});
