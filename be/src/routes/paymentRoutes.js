const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createMomoPayment,
  createVNPayPayment,
  handleMomoIPN,
  handleVNPayIPN,
} = require('../controllers/paymentController');

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: Payment endpoints for Momo and VNPay
 */

/**
 * @swagger
 * /api/payment/momo:
 *   post:
 *     summary: Create a Momo payment request
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Momo payment URL or response
 *       500:
 *         description: Momo payment error
 */
router.post(
  '/momo',
  authMiddleware,
  createMomoPayment
);

/**
 * @swagger
 * /api/payment/vnpay:
 *   post:
 *     summary: Create a VNPay payment request
 *     tags: [Payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *             properties:
 *               orderId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: VNPay payment URL
 *       500:
 *         description: VNPay payment error
 */
router.post(
  '/vnpay',
  authMiddleware,
  createVNPayPayment
);

/**
 * @swagger
 * /api/payment/momo-ipn:
 *   post:
 *     summary: Momo payment notification (IPN)
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               resultCode:
 *                 type: integer
 *               transId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment notification processed
 *       500:
 *         description: Momo IPN error
 */
router.post(
  '/momo-ipn',
  handleMomoIPN
);

/**
 * @swagger
 * /api/payment/vnpay-ipn:
 *   get:
 *     summary: VNPay payment notification (IPN)
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: vnp_TxnRef
 *         schema:
 *           type: string
 *       - in: query
 *         name: vnp_ResponseCode
 *         schema:
 *           type: string
 *       - in: query
 *         name: vnp_TransactionNo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment notification processed
 *       500:
 *         description: VNPay IPN error
 */
router.get(
  '/vnpay-ipn',
  handleVNPayIPN
);

module.exports = router;