const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const userRoleSchema = new mongoose.Schema(
    {
    _id: {
        type: String,
        default: uuidv4,
    },
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    roleId: {
        type: String,
        required: true,
        ref: 'Role',
    },
},
{
    timestamp: true,
});

module.exports = mongoose.model('UserRole', userRoleSchema);
