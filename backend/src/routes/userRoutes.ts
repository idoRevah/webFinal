import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Fetch a user's profile by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Updated username of the user
 *     responses:
 *       200:
 *         description: User profile updated successfully
 */
router.put('/:id', authenticate, updateUserProfile);

export default router;
