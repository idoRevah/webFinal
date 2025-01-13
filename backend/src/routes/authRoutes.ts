import express from 'express';
import { googleLogin } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   post:
 *     summary: Log in with Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: The ID token from Google login
 *     responses:
 *       200:
 *         description: Returns a JWT after successful login
 *       400:
 *         description: Invalid ID token
 *       500:
 *         description: Authentication failed
 */
router.post('/auth/google', googleLogin);

export default router;
