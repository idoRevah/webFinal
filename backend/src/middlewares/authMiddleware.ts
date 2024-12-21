// src/middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const authenticate = async (req: any, res: any, next: any) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || '');
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};