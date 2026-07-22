import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', aiController.askMentor);

export default router;
