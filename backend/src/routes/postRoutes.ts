import express from 'express';
import { createPost, getPosts, updatePost, deletePost, likePost } from '../controllers/postController';
import { upload } from '../middlewares/fileUploadMiddleware';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     responses:
 *       201:
 *         description: Post created successfully
 */
router.post('/', authenticate, upload.single('image'), createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Fetch all posts
 *     responses:
 *       200:
 *         description: Returns a list of posts
 */
router.get('/', getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
router.put('/:id', authenticate, upload.single('image'), updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete('/:id', authenticate, deletePost);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Like a post by ID
 *     responses:
 *       200:
 *         description: Post liked successfully
 */
router.post('/:id/like', authenticate, likePost);

export default router;