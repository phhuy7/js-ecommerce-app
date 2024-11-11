const express = require('express');
const router = express.Router();
const {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} = require('../controllers/permissionController');

// Create a new permission
router.post('/', createPermission);

// Get all permissions
router.get('/', getPermissions);

// Get a single permission by ID
router.get('/:id', getPermissionById);

// Update a permission
router.put('/:id', updatePermission);

// Delete a permission
router.delete('/:id', deletePermission);

module.exports = router;
