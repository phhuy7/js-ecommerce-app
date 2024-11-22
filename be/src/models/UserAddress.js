const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userAddressSchema = new mongoose.Schema({
    _id: { 
        type: String,
        default: uuidv4,
    },
    userId: {
        type: String,  // User UUID
        required: true,
        ref: 'User',  // Reference to the User model
    },
    type: {
        type: String,
        enum: ['Home', 'Work', 'Billing', 'Shipping'],
        default: 'Home' 
    },
    street: {
        type: String,
        required: true

    },
    city: {
        type: String,
        required: true
    },
    state: { type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: { type: String,
        required: true
    },
    isDefault: { type: Boolean,
        default: false
    } // To mark the default address
}, {
  timestamps: true
});

module.exports = mongoose.model('UserAddress', userAddressSchema);

