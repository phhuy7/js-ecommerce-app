const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} = require('../controllers/permissionController');

// Create a new permission
router.post('/createPermission', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createPermission);
// Get all permissions
router.get('/getAllPermissions', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getPermissions);

// Get a single permission by ID
router.get('/getPermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getPermissionById);

// Update a permission
router.put('/updatePermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updatePermission);

// Delete a permission
router.delete('/deletePermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deletePermission);

module.exports = router;
