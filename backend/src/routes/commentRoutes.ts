import express from "express";
import { createComment, getCommentsForPost } from "../controllers/commentController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Create a comment for a post
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
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post("/", authenticate, createComment);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Fetch all comments for a post
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
 */
router.get("/", getCommentsForPost);

export default router;
