import express from 'express';
import { createPost, getPosts, updatePost, deletePost, likePost } from '../controllers/postController';
import { upload } from '../middlewares/fileUploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, upload.single('image'), createPost);
router.get('/', getPosts);
router.put('/:id', authenticate, upload.single('image'), updatePost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);

export default router;


