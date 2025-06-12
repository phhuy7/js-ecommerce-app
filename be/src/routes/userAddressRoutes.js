const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} = require('../controllers/userAddressController');

/**
 * @swagger
 * tags:
 *   name: UserAddress
 *   description: User address management endpoints
 */

/**
 * @swagger
 * /api/user-address/create-address:
 *   post:
 *     summary: Create a new address for the current user
 *     tags: [UserAddress]
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
 *               - phone
 *               - addressLine1
 *               - city
 *               - postalCode
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Address created
 *       500:
 *         description: Server error
 */
router.post(
    '/create-address',
    authMiddleware,
    createAddress
);

/**
 * @swagger
 * /api/user-address/get-all-addresses:
 *   get:
 *     summary: Get all addresses for the current user
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 *       500:
 *         description: Server error
 */
router.get(
    '/get-all-addresses',
    authMiddleware,
    getAddresses
);

/**
 * @swagger
 * /api/user-address/get-address/{id}:
 *   get:
 *     summary: Get a single address by ID
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address data
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.get('/get-address/:id', authMiddleware, getAddressById);

/**
 * @swagger
 * /api/user-address/update-address/{id}:
 *   put:
 *     summary: Update an address
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               addressLine1:
 *                 type: string
 *               addressLine2:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               country:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Address updated
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.put('/update-address/:id', authMiddleware, updateAddress);

/**
 * @swagger
 * /api/user-address/delete-address/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [UserAddress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Address ID
 *     responses:
 *       200:
 *         description: Address deleted
 *       404:
 *         description: Address not found
 *       500:
 *         description: Server error
 */
router.delete('/delete-address/:id', authMiddleware, deleteAddress);

module.exports = router;