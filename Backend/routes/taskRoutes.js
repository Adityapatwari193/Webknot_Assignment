const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// this file is router Routes for task related routes
router.post('/', taskController.createTask); // Create a task
router.get('/:eventId', taskController.getTasksForEvent); // Get tasks for a specific event
router.patch('/:id/status', taskController.updateTaskStatus); // Update task status

module.exports = router;
