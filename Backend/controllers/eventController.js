
const mongoose = require('mongoose');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const Event = require('../models/Event');
const Task = require('../models/Task'); 

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees');

   
    const eventsWithTasks = await Promise.all(events.map(async (event) => {
      const tasks = await Task.find({ event: event._id }); 
      return { ...event.toObject(), tasks }; 
    }));

    res.json(eventsWithTasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateEvent = async (req, res) => {
  console.log("Patch is called");
  try {
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid Event ID' });
    }
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
