const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userRoleSchema = new mongoose.Schema(
    {
    _id: {  // Use UUID as the unique identifier
        type: String,
        default: uuidv4,
    },
    userId: {
        type: String,  // User UUID
        required: true,
        ref: 'User',  // Reference to the User model
    },
    roleId: {
        type: String,  // Role UUID
        required: true,
        ref: 'Role',  // Reference to the Role model
    },
    },
    {
    timestamp: true,
    },
);

// Index for faster lookup (unique combination of user and role)
userRoleSchema.index({ user: 1, role: 1 }, { unique: true });

module.exports = mongoose.model('UserRole', userRoleSchema);
