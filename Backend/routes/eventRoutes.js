
const express = require('express');
const Event = require('../models/Event'); 
const {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', async (req, res) => { 
  try {
    const event = await Event.findById(req.params.id); 
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    console.log("is method called"); 
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
