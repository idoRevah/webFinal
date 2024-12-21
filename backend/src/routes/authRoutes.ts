import express from 'express';
import passport from 'passport';
import { generateToken } from '../controllers/authController';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: any, res) => {
    const token = generateToken(req.user);
    res.json({ token });
  }
);

export default router;
