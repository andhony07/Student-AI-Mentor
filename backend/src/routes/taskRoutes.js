import express from 'express';
import * as taskController from '../controllers/taskController.js';

const router = express.Router();

// Authentication will be added here when the auth module is merged
router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
