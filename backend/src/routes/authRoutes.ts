import express from 'express';
import passport from 'passport';
import { generateToken, refreshToken } from '../controllers/authController';

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

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh the JWT using a refresh token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token
 *     responses:
 *       200:
 *         description: Returns a new JWT
 *       401:
 *         description: No token provided
 *       403:
 *         description: Invalid token
 */
router.post('/refresh', refreshToken);

export default router;
