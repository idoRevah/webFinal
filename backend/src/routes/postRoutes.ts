import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
  getPostById,
} from "../controllers/postController";
import { upload } from "../middlewares/fileUploadMiddleware";
import { authenticate } from "../middlewares/authMiddleware";
import commentRoutes from "./commentRoutes";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subtitle
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               subtitle:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, upload.single("image"), createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Fetch all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: Returns a list of posts
 *       500:
 *         description: Internal server error
 */
router.get("/", getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Fetch post by ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Returns the post data
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getPostById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
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
 *               subtitle:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid request data
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", authenticate, upload.single("image"), updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
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
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authenticate, deletePost);

/**
 * @swagger
 * /posts/{id}/like:
 *   post:
 *     summary: Like a post by ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
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
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/like", authenticate, likePost);

// Mount comment routes under `/posts/:postId/comments`
router.use("/:postId/comments", commentRoutes);

export default router;
