import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: any, res: any) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: 'Invalid ID token' });
    }

    const { sub: googleId, email, name: username, picture: avatar } = payload;

    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({
        googleId,
        email,
        username,
        avatar,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1d' });
    res.json({ token });
  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    res.status(500).json({ message: 'Authentication failed' });
  }
};
