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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               content:
 *                 type: string
 *                 description: Content of the post
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
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the post
 *               content:
 *                 type: string
 *                 description: Updated content of the post
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
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to delete
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
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to like
 *     responses:
 *       200:
 *         description: Post liked successfully
 */
router.post('/:id/like', authenticate, likePost);

export default router;
