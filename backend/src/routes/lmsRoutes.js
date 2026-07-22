import express from 'express';
import multer from 'multer';
import * as lmsController from '../controllers/lmsController.js';


const router = express.Router();

// Multer: memory storage with 10 MB file size limit
// File-type filtering is handled inside the controller for better error messages
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// Authentication will be added here when the auth module is merged

// POST /api/lms/upload  — Upload and store LMS Excel data
router.post('/upload', upload.single('file'), lmsController.uploadLMS);

// GET  /api/lms/analyze — Generate Gemini-powered analysis from stored data
router.get('/analyze', lmsController.analyzeLMS);

// POST /api/lms/chat   — Ask natural language questions about LMS data
router.post('/chat', lmsController.chatWithLMS);

export default router;
