
const Task = require('../models/Task');
const Event = require('../models/Event');

exports.createTask = async (req, res) => {
  try {
    const { name, deadline, status, eventId } = req.body; 

    const task = await Task.create({
      name,
      deadline,
      status,
      event: eventId, 
    });
    console.log("Task created");

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasksForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    
    const tasks = await Task.find({ event: eventId });

    
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this event.' });
    }

   
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateTaskStatus = async (req, res) => {
  try {
    console.log("Update being called")
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { status }, 
      { new: true } 
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
