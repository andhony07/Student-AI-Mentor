import express from 'express';
import * as examController from '../controllers/examController.js';

const router = express.Router();

// Authentication will be added here when the auth module is merged
router.post('/create', examController.createExam);
router.get('/plan', examController.getPlan);
router.post('/chat', examController.chatWithPlan);

export default router;
