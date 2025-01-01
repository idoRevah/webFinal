import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Fetch a user's profile by ID
 *     responses:
 *       200:
 *         description: Returns the user's profile
 */
router.get('/:id', getUserProfile);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user's profile by ID
 *     responses:
 *       200:
 *         description: User profile updated successfully
 */
router.put('/:id', authenticate, updateUserProfile);

export default router;
