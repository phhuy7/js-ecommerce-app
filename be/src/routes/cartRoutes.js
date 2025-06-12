const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management endpoints
 */

/**
 * @swagger
 * /api/cart/get-cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's cart
 *       500:
 *         description: Server error
 */
router.get(
  '/get-cart',
  authMiddleware,
  getCart
);

/**
 * @swagger
 * /api/cart/add-to-cart:
 *   post:
 *     summary: Add or update an item in the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart updated
 *       500:
 *         description: Server error
 */
router.post(
  '/add-to-cart',
  authMiddleware,
  addToCart
);

/**
 * @swagger
 * /api/cart/remove-item:
 *   delete:
 *     summary: Remove an item from the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *             properties:
 *               product:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item removed
 *       500:
 *         description: Server error
 */
router.delete(
  '/remove-item',
  authMiddleware,
  removeFromCart
);

/**
 * @swagger
 * /api/cart/clear-cart:
 *   delete:
 *     summary: Clear the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared
 *       500:
 *         description: Server error
 */
router.delete(
  '/clear-cart',
  authMiddleware,
  clearCart);

module.exports = router;