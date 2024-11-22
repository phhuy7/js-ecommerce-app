const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// Create a new user
router.post('/createUser', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createUser);

// Get all users
router.get('/getAllUsers', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getUsers);

// Get a single user by ID
router.get('/getUser/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getUserById);

// Update a user
router.put('/updateUser/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateUser);

// Delete a user
router.delete('/deleteUser/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deleteUser);

module.exports = router;
