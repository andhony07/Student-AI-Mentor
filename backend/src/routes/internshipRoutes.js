import express from 'express';
import * as internshipController from '../controllers/internshipController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', internshipController.getInternships);
router.post('/', internshipController.addInternship);
router.get('/search', internshipController.searchJobs);

export default router;
