
// src/controllers/authController.ts
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export const generateToken = (user: any) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
};

export const refreshToken = (req: any, res: any) => {
  const token = req.body.refreshToken;
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  jwt.verify(token, process.env.JWT_REFRESH_SECRET || '', (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    const newToken = generateToken(user);
    res.json({ token: newToken });
  });
};