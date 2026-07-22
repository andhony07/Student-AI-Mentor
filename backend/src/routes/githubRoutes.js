import express from 'express';
import * as githubController from '../controllers/githubController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', githubController.getProfile);
router.post('/sync', githubController.syncProfile);

export default router;
