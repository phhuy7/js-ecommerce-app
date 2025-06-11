const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const registerValidation = require('../validators/registerValidation');
const loginValidation = require('../validators/loginValidation');
const {
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user/email already exists
 *       500:
 *         description: Server error
 */
router.post(
  '/register',
  registerValidation,
  registerUser
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post(
  '/login',
  loginValidation,
  loginUser
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user (blacklist JWT)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       400:
 *         description: No token or invalid token
 */
router.post(
  '/logout',
  logoutUser
);

module.exports = router;
