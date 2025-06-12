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

/**
 * @swagger
 * tags:
 *   name: UserRoles
 *   description: User-Role management endpoints
 */

/**
 * @swagger
 * /api/userRole/create-user-role:
 *   post:
 *     summary: Create a new user-role mapping
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - roleId
 *             properties:
 *               userId:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       201:
 *         description: UserRole created successfully
 *       500:
 *         description: Server error
 */
router.post(
  '/create-user-role',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('USERROLE_CREATE'),
  createUserRole
);

/**
 * @swagger
 * /api/userRole/get-all-user-roles:
 *   get:
 *     summary: Get all user-role mappings
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user-role mappings
 *       500:
 *         description: Server error
 */
router.get(
  '/get-all-user-roles',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('USERROLE_READ'),
  getUserRoles
);

/**
 * @swagger
 * /api/userRole/get-user-role/{id}:
 *   get:
 *     summary: Get a user-role mapping by ID
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserRole ID
 *     responses:
 *       200:
 *         description: UserRole data
 *       404:
 *         description: UserRole not found
 *       500:
 *         description: Server error
 */
router.get(
  '/get-user-role/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('USERROLE_READ'),
  getUserRoleById
);

/**
 * @swagger
 * /api/userRole/update-user-role/{id}:
 *   put:
 *     summary: Update a user-role mapping
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserRole ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               roleId:
 *                 type: string
 *     responses:
 *       200:
 *         description: UserRole updated successfully
 *       404:
 *         description: UserRole not found
 *       500:
 *         description: Server error
 */
router.put(
  '/update-user-role/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('USERROLE_UPDATE'),
  updateUserRole
);

/**
 * @swagger
 * /api/userRole/delete-user-role/{id}:
 *   delete:
 *     summary: Delete a user-role mapping
 *     tags: [UserRoles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: UserRole ID
 *     responses:
 *       200:
 *         description: UserRole deleted successfully
 *       404:
 *         description: UserRole not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/delete-user-role/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('USERROLE_DELETE'),
  deleteUserRole
);

module.exports = router;