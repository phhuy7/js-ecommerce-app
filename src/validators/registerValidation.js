const { body } = require('express-validator');

const registerValidation = [
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email'),
];

module.exports = registerValidation;
