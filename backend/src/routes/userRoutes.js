import express from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

export default router;
