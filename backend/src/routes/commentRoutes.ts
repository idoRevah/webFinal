import express from 'express';
import { createComment, getCommentsForPost } from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/:postId', authenticate, createComment);
router.get('/:postId', getCommentsForPost);

export default router;

