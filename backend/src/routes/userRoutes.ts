import express from 'express';
import { getUserProfile } from '../controllers/userController';
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

export default router;
