const UserRole = require('../models/UserRole');
const Role = require('../models/Role');  // Import Role model

const roleMiddleware = (requiredRole) => async (req, res, next) => {
  const userId = req.user._id; // User extracted from the authMiddleware
  try {
    // Fetch all roles associated with the user and populate the role details from the Role collection
    const userRoles = await UserRole.find({ userId }).populate('roleId'); // Populate 'roleId' field with role details
    // Check if the user has the required role
    const roleNames = userRoles.map(userRole => userRole.roleId.name); // Access the role name after population
    if (!roleNames.includes(requiredRole)) {
      return res.status(403).json({ message: 'Access denied. Insufficient roles.' });
    }

    next();  // Proceed to the next middleware
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = roleMiddleware;
