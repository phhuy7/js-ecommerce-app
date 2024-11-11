const express = require('express');
const router = express.Router();
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

// Create a new role
router.post('/', createRole);

// Get all roles
router.get('/', getRoles);

// Get a single role by ID
router.get('/:id', getRoleById);

// Update a role
router.put('/:id', updateRole);

// Delete a role
router.delete('/:id', deleteRole);

module.exports = router;
