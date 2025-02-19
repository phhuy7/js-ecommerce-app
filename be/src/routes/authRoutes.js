const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const loginValidation = require('../validators/loginValidation');
const registerValidation = require('../validators/registerValidation');
const authMiddleware = require('../middlewares/authMiddleware');
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
} = require('../controllers/authController');

router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.post('/refresh-token', refreshToken);

router.post
module.exports = router;
