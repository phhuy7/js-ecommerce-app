const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const permissionMiddleware = require('../middleware/permissionMiddleware');
const Role = require('../models/Role');
const User = require('../models/User');
const express = require('express');
const router = express.Router();

const {
  createRolePermission,
  getRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
} = require('../controllers/rolePermissionController');





// Create a new rolePermission
router.post('/',authMiddleware,roleMiddleware('ADMIN'),permissionMiddleware('CREATE'), createRolePermission);

// Get all rolePermissions
router.get('/', authMiddleware,roleMiddleware('ADMIN'),permissionMiddleware('READ'), getRolePermissions);

// Get a single rolePermission by ID
router.get('/:id', getRolePermissionById);

// Update a rolePermission
router.put('/:id', updateRolePermission);

// Delete a rolePermission
router.delete('/:id', deleteRolePermission);

module.exports = router;
