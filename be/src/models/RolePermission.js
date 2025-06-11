const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const rolePermissionSchema = new mongoose.Schema({
  _id: {  // Use UUID as the unique identifier
    type: String,
    default: uuidv4,
  },
  roleId: {
    type: String,  // Role UUID
    required: true,
    ref: 'Role',  // Reference to the Role model
  },
  permissionId: {
    type: String,  // Permission UUID
    required: true,
    ref: 'Permission',  // Reference to the Permission model
  },
});

module.exports = mongoose.model('RolePermission', rolePermissionSchema);
