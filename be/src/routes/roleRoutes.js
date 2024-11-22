const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');

// Create a new role
router.post('/createRole', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createRole);

// Get all roles
router.get('/getAllRoles', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getRoles);

// Get a single role by ID
router.get('/getRole/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getRoleById);

// Update a role
router.put('/updateRole/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateRole);

// Delete a role
router.delete('/deleteRole/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), deleteRole);

module.exports = router;
