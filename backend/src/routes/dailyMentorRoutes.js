import express from 'express';
import * as dailyMentorController from '../controllers/dailyMentorController.js';

const router = express.Router();

// Authentication will be added here when the auth module is merged
router.post('/chat', dailyMentorController.chat);

export default router;
