const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  createUserAddress,
  getUserAddresses,
  updateUserAddress,
  deleteUserAddress,
} = require('../controllers/userAddressController');

// Create a new user address
router.post('/createUserAddress', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createUserAddress);

// Get all user addresses
router.get('/getAllUserAddresses/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getUserAddresses);

// Update a user address
router.put('/updateUserAddress/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateUserAddress);

// Delete a user address
router.delete('/deleteUserAddress/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deleteUserAddress);

module.exports = router;
