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

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management endpoints
 */

/**
 * @swagger
 * /api/permission/create-permission:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Permission created successfully
 *       400:
 *         description: Permission already exists or invalid input
 *       500:
 *         description: Server error
 */
router.post(
  '/create-permission',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PERMISSION_CREATE'),
  createPermission
);

/**
 * @swagger
 * /api/permission/get-all-permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of permissions
 *       500:
 *         description: Server error
 */
router.get(
  '/get-all-permissions',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PERMISSION_READ'),
  getPermissions
);

/**
 * @swagger
 * /api/permission/get-permission/{id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission data
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */
router.get(
  '/get-permission/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PERMISSION_READ'),
  getPermissionById
);

/**
 * @swagger
 * /api/permission/update-permission/{id}:
 *   put:
 *     summary: Update a permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */
router.put(
  '/update-permission/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PERMISSION_UPDATE'),
  updatePermission
);

/**
 * @swagger
 * /api/permission/delete-permission/{id}:
 *   delete:
 *     summary: Delete a permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/delete-permission/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PERMISSION_DELETE'),
  deletePermission
);

module.exports = router;