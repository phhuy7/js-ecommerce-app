const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /api/order/place-order:
 *   post:
 *     summary: Place an order from the user's cart
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - name
 *                   - phone
 *                   - addressLine1
 *                   - city
 *                   - postalCode
 *                   - country
 *                 properties:
 *                   name:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   addressLine1:
 *                     type: string
 *                   addressLine2:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *     responses:
 *       201:
 *         description: Order placed
 *       400:
 *         description: Cart is empty or shipping address is incomplete
 *       500:
 *         description: Server error
 */
router.post(
  '/place-order',
  authMiddleware,
  placeOrder
);

/**
 * @swagger
 * /api/order/get-user-orders:
 *   get:
 *     summary: Get current user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *       500:
 *         description: Server error
 */
router.get(
  '/get-user-orders',
  authMiddleware,
  getUserOrders
);

/**
 * @swagger
 * /api/order/get-all-orders:
 *   get:
 *     summary: (Admin) Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       500:
 *         description: Server error
 */
router.get(
  '/get-all-orders',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ORDER_READ'),
  getAllOrders
);

/**
 * @swagger
 * /api/order/update-order/{id}/status:
 *   put:
 *     summary: (Admin) Update order status
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order status updated
 *       404:
 *         description: Order not found
 *       400:
 *         description: Invalid status or cannot update cancelled/delivered order
 *       500:
 *         description: Server error
 */
router.put(
  '/update-order/:id/status',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('ORDER_UPDATE'),
  updateOrderStatus
);

module.exports = router;