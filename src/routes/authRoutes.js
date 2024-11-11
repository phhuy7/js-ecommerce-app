const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const loginValidation = require('../validators/loginValidation'); // If you're using express-validator
const registerValidation = require('../validators/registerValidation'); // Same for register


const router = express.Router();

// POST /register - Register route
router.post('/register', registerValidation, authController.registerUser);

// POST /login - Login route
router.post('/login', loginValidation, authController.loginUser);

module.exports = router;
