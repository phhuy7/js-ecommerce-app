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

// Create a new product
router.post('/createProduct', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createProduct);
// Get all products
router.get('/getAllProducts', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getProducts);

// Get a single product by ID
router.get('/getProduct/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getProductById);

// Update a product
router.put('/updateProduct/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateProduct);

// Delete a product
router.delete('/deleteProduct/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deleteProduct);

module.exports = router;
