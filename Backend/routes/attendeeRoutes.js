const express = require('express');
const router = express.Router();
const attendeeController = require('../controllers/attendeeController');

//this is the route to manage all atendee related routings
router.post('/', attendeeController.addAttendee); // Add an attendee 
router.get('/', attendeeController.getAttendees); // Get all attendees
router.delete('/:id', attendeeController.deleteAttendee); // Delete an attendee
router.post('/:eventId/assign/:attendeeId', attendeeController.assignAttendeeToEvent); // Assign attendee to event

module.exports = router;
