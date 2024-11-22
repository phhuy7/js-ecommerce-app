// permissionMiddleware.js
const RolePermission = require('../models/RolePermission');
const UserRole = require('../models/UserRole');

const permissionMiddleware = (requiredPermission) => async (req, res, next) => {
  const userId = req.user._id; // Extracted from authMiddleware
  try {
    const userRoles = await UserRole.find({ userId });
    const roleIds = userRoles.map(userRole => userRole.roleId);

    // Fetch permissions for the user's roles
    const rolePermissions = await RolePermission.find({ roleId: { $in: roleIds } }).populate('permissionId');
    const userPermissions = rolePermissions.map(rp => rp.permissionId.name);
    // Check if the user has the required permission
    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();  // Proceed to the next middleware
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = permissionMiddleware;
