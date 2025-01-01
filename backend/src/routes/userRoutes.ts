// src/routes/userRoutes.ts
import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/:id', getUserProfile);
router.put('/:id', authenticate, updateUserProfile);

export default router;
