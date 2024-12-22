
const express = require('express');
const router = express.Router();

//Just a testing route to ensure that data is being sent to the frontend
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route is working!', data: { example: 'This is some test data' } });
});

module.exports = router;
