import express from 'express';
import passport from 'passport';
import { generateToken } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiates Google OAuth login
 *     responses:
 *       302:
 *         description: Redirects to Google login page
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     responses:
 *       200:
 *         description: Returns a JWT after successful login
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req: any, res) => {
    const token = generateToken(req.user);
    res.json({ token });
  }
);

export default router;