import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import ApiError from '../utils/apiError.js';

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authorization token missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = { id: decoded.userId };
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
};
