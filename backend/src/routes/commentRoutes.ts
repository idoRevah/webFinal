import express from 'express';
import { createComment, getCommentsForPost } from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /comments/{postId}:
 *   post:
 *     summary: Create a comment for a post
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post('/:postId', authenticate, createComment);

/**
 * @swagger
 * /comments/{postId}:
 *   get:
 *     summary: Fetch all comments for a post
 *     responses:
 *       200:
 *         description: Returns a list of comments for the post
 */
router.get('/:postId', getCommentsForPost);

export default router;
