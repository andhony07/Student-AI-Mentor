import express from 'express';
import * as examController from '../controllers/examController.js';

const router = express.Router();

// Authentication will be added here when the auth module is merged
router.get('/', examController.getExams);
router.post('/', examController.createExam);
router.put('/:id', examController.updateExam);
router.delete('/:id', examController.deleteExam);

export default router;
