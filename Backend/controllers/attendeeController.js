const Attendee = require('../models/Attendee');
const Event = require('../models/Event');

//  A route to add  new attendee
exports.addAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.create(req.body);
    res.status(201).json(attendee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all the attendees 
exports.getAttendees = async (req, res) => {
  try {
    const attendees = await Attendee.find(); // No population here
    res.json(attendees);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an attendee by finding them from Id 
exports.deleteAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    await Attendee.findByIdAndDelete(id);
    res.json({ message: 'Attendee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Assign an attendee to an event
exports.assignAttendeeToEvent = async (req, res) => {
  try {
    const { eventId, attendeeId } = req.params;
    const event = await Event.findById(eventId);
    const attendee = await Attendee.findById(attendeeId);

    if (!event || !attendee) {
      return res.status(404).json({ error: 'Event or Attendee not found' });
    }

    
    if (event.attendees.includes(attendeeId)) {
      return res.status(400).json({ error: 'Attendee is already assigned to this event' });
    }


    event.attendees.push(attendeeId);
    await event.save();

    res.json({ message: 'Attendee assigned to event', event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
