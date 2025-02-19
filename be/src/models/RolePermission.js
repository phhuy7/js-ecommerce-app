const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const rolePermissionSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    roleId: {
        type: String,
        required: true,
        ref: 'Role',
    },
    permissionId: {
        type: String,
        required: true,
        ef: 'Permission',
    },
});

module.exports = mongoose.model('RolePermission', rolePermissionSchema);
