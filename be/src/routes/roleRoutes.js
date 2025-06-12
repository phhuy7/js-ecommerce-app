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

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

/**
 * @swagger
 * /api/role/create-role:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *         description: Role created successfully
 *       400:
 *         description: Role already exists or invalid input
 *       500:
 *         description: Server error
 */
router.post(
  '/create-role',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLE_CREATE'),
  createRole
);

/**
 * @swagger
 * /api/role/get-all-roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Server error
 */
router.get(
  '/get-all-roles',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLE_READ'),
  getRoles
);

/**
 * @swagger
 * /api/role/get-role/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role data
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.get('/get-role/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLE_READ'),
  getRoleById
);

/**
 * @swagger
 * /api/role/update-role/{id}:
 *   put:
 *     summary: Update a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
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
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.put(
  '/update-role/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLE_UPDATE'),
  updateRole
);

/**
 * @swagger
 * /api/role/delete-role/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/delete-role/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ROLE_DELETE'),
  deleteRole
);

module.exports = router;