const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require('../controllers/cartController');

// Add item to Cart
router.post('/addToCart', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), addToCart);

// Get cart
router.get('/getCart', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getCart);

// Update cart
router.put('/updateCartItem', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateCartItem);

// Remove cart
router.delete('/removeCartItem/:productId', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), removeCartItem);

// Clear cart
router.delete('/clearCart', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), clearCart);

module.exports = router;
