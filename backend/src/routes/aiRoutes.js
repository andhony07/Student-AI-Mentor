import express from 'express';
import * as aiController from '../controllers/aiController.js';

const router = express.Router();

// Authentication will be added here when the auth module is merged
router.post('/', aiController.askMentor);

export default router;
