const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  createRolePermission,
  getRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
} = require('../controllers/rolePermissionController');

// Create a new rolePermission
router.post('/createRolePermission',authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createRolePermission);

// Get all rolePermissions
router.get('/getAllRolePermissions', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getRolePermissions);

// Get a single rolePermission by ID
router.get('/getRolePermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getRolePermissionById);

// Update a rolePermission
router.put('/updateRolePermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateRolePermission);

// Delete a rolePermission
router.delete('/deleteRolePermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deleteRolePermission);

module.exports = router;
