const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  createUserRole,
  getUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
} = require('../controllers/userRoleController');

// Create a new userRole
router.post('/createUserRole', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createUserRole);

// Get all userRoles
router.get('/getAllUserRoles', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getUserRoles);

// Get a single userRole by ID
router.get('/getUserRole/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getUserRoleById);

// Update a userRole
router.put('/updateUserRole/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateUserRole);

// Delete a userRole
router.delete('/deleteUserRolke/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deleteUserRole);

module.exports = router;
