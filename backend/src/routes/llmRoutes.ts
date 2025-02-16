import express from 'express';
import { sendToLLM } from '../controllers/llmController';

const router = express.Router();

/**
 * @swagger
 * /llm/send:
 *   post:
 *     summary: Send text to LLM API
 *     tags:
 *       - LLM
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text to send to LLM API
 *     responses:
 *       200:
 *         description: Successfully received a response from LLM API
 *       400:
 *         description: Text is required
 *       500:
 *         description: Failed to communicate with LLM API
 */
router.post('/send', sendToLLM);

export default router;
