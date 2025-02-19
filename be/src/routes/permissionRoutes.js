const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const {
    createPermission,
    getPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
} = require('../controllers/permissionController');

router.post('/createPermission', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('CREATE'), createPermission);
router.get('/getAllPermissions', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getPermissions);
router.get('/getPermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('READ'), getPermissionById);
router.put('/updatePermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('UPDATE'), updatePermission);
router.delete('/deletePermission/:id', authMiddleware, roleMiddleware('ADMIN'), permissionMiddleware('DELETE'), deletePermission);

module.exports = router;
