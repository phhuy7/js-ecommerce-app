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

/**
 * @swagger
 * tags:
 *   name: RolePermissions
 *   description: Role-Permission management endpoints
 */

/**
 * @swagger
 * /api/role-permission/create-role-permission:
 *   post:
 *     summary: Create a new role-permission mapping
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *               - permissionId
 *             properties:
 *               roleId:
 *                 type: string
 *               permissionId:
 *                 type: string
 *     responses:
 *       201:
 *         description: RolePermission created successfully
 *       500:
 *         description: Server error
 */
router.post(
  '/create-role-permission',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLEPERMISSION_CREATE'),
  createRolePermission
);

/**
 * @swagger
 * /api/role-permission/get-all-role-permissions:
 *   get:
 *     summary: Get all role-permission mappings
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of role-permission mappings
 *       500:
 *         description: Server error
 */
router.get(
  '/get-all-role-permissions',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLEPERMISSION_READ'),
  getRolePermissions
);

/**
 * @swagger
 * /api/role-permission/get-role-permission/{id}:
 *   get:
 *     summary: Get a role-permission mapping by ID
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: RolePermission ID
 *     responses:
 *       200:
 *         description: RolePermission data
 *       404:
 *         description: RolePermission not found
 *       500:
 *         description: Server error
 */
router.get(
  '/get-role-permission/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLEPERMISSION_READ'),
  getRolePermissionById
);

/**
 * @swagger
 * /api/role-permission/update-role-permission/{id}:
 *   put:
 *     summary: Update a role-permission mapping
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: RolePermission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleId:
 *                 type: string
 *               permissionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: RolePermission updated successfully
 *       404:
 *         description: RolePermission not found
 *       500:
 *         description: Server error
 */
router.put(
  '/update-role-permission/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLEPERMISSION_UPDATE'),
  updateRolePermission
);

/**
 * @swagger
 * /api/role-permission/delete-role-permission/{id}:
 *   delete:
 *     summary: Delete a role-permission mapping
 *     tags: [RolePermissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: RolePermission ID
 *     responses:
 *       200:
 *         description: RolePermission deleted successfully
 *       404:
 *         description: RolePermission not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/delete-role-permission/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLEPERMISSION_DELETE'),
  deleteRolePermission
);

module.exports = router;