const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const userAddressSchema = new Schema({
    _id: { 
        type: String,
        default: uuidv4,
    },
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    type: {
        type: String,
        enum: ['Home', 'Work', 'Billing', 'Shipping'],
        default: 'Home',
    },
    street: {
        type: String,
        required: true,

    },
    city: {
        type: String,
        required: true,
    },
    state: { type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: { type: String,
        required: true,
    },
    isDefault: { type: Boolean,
        default: false,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('UserAddress', userAddressSchema);

