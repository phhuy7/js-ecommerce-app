const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
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
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               material:
 *                 type: string
 *               weight:
 *                 type: number
 *               size:
 *                 type: string
 *               style:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Product already exists or invalid input
 *       500:
 *         description: Server error
 */
router.post(
  '/create-product',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PRODUCT_CREATE'),
  createProduct
);

/**
 * @swagger
 * /api/product/get-all-products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Server error
 */
router.get(
  '/get-all-products',
  getProducts
  );

/**
 * @swagger
 * /api/product/get-product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get(
  '/get-product/:id',
  getProductById
);

/**
 * @swagger
 * /api/product/update-product/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
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
 *               price:
 *                 type: number
 *               imageUrl:
 *                 type: string
 *               category:
 *                 type: string
 *               stock:
 *                 type: number
 *               material:
 *                 type: string
 *               weight:
 *                 type: number
 *               size:
 *                 type: string
 *               style:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put(
  '/update-product/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PRODUCT_UPDATE'),
  updateProduct
);

/**
 * @swagger
 * /api/product/delete-product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/delete-product/:id',
  authMiddleware,
  roleMiddleware('ADMIN'),
  permissionMiddleware('PRODUCT_DELETE'),
  deleteProduct
);

module.exports = router;