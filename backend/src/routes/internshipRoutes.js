import express from 'express';
import * as internshipController from '../controllers/internshipController.js';

const router = express.Router();

router.get('/', internshipController.getInternships);
router.post('/', internshipController.addInternship);
router.get('/search', internshipController.searchJobs);

export default router;
