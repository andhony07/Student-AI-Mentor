import express from 'express';
import * as githubController from '../controllers/githubController.js';

const router = express.Router();

// Authentication will be added here when the auth module is merged
router.get('/', githubController.getProfile);
router.post('/sync', githubController.syncProfile);

export default router;
