import express from 'express';
import multer from 'multer';
import * as lmsController from '../controllers/lmsController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Memory storage for processing buffer directly
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.use(protect);
router.post('/upload', upload.single('file'), lmsController.uploadLMSProgress);
router.get('/progress', lmsController.getLMSProgress);

export default router;
