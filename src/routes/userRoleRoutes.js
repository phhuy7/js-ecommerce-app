const express = require('express');
const router = express.Router();
const {
  createUserRole,
  getUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
} = require('../controllers/userRoleController');

// Create a new userRole
router.post('/', createUserRole);

// Get all userRoles
router.get('/', getUserRoles);

// Get a single userRole by ID
router.get('/:id', getUserRoleById);

// Update a userRole
router.put('/:id', updateUserRole);

// Delete a userRole
router.delete('/:id', deleteUserRole);

module.exports = router;
