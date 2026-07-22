import express from 'express';
import multer from 'multer';
import * as resumeController from '../controllers/resumeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.use(protect);
router.post('/upload', upload.single('file'), resumeController.uploadResume);
router.post('/analyze', resumeController.analyzeResume);

export default router;
