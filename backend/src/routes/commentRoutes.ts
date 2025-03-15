import express from "express";
import {
  createComment,
  getCommentsForPost,
} from "../controllers/commentController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create a comment for a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post("/", authenticate, createComment);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Fetch all comments for a post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to retrieve comments for
 *     responses:
 *       200:
 *         description: Returns a list of comments for the post
 *       404:
 *         description: No comments found for this post
 *       500:
 *         description: Internal server error
 */
router.get("/", getCommentsForPost);

export default router;
