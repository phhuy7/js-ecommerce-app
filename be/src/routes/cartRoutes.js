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

router.post('/addToCart', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), addToCart);
router.get('/getCart', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getCart);
router.put('/updateCartItem', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateCartItem);
router.delete('/removeCartItem/:productId', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), removeCartItem);
router.delete('/clearCart', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), clearCart);

module.exports = router;
