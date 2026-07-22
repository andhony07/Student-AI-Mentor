import express from 'express';
import * as internshipController from '../controllers/internshipController.js';

const router = express.Router();

// Authentication will be added here when the auth module is merged
router.get('/', internshipController.searchJobs);
router.post('/', internshipController.addInternship);
router.get('/search', internshipController.searchJobs);

export default router;
