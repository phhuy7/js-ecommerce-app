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

router.post('/createProduct',authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createProduct);
router.get('/getAllProducts', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getProducts);
router.get('/getProduct/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getProductById);
router.put('/updateProduct/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updateProduct);
router.delete('/deleteProduct/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deleteProduct);

module.exports = router;
