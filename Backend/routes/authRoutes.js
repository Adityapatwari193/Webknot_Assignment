const express = require('express');
const { register, login, logout,listUsers } = require('../controllers/authController');
const router = express.Router();

//this is the route file to manage all the Login,Logout,Function using Passport.js
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/users', listUsers);

module.exports = router;
