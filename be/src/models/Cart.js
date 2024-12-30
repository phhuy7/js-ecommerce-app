const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');


const cartItemSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,  // Generate UUID for the permission _id
    },
    productId: {
        type: String, // Refers to Product _id (UUID)
        required: true,
        ref: 'Product', // Reference to the Product model
    },
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1, 
        default: 1 
    },
    imgUrl: { 
        type: String 
    },
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    items: [cartItemSchema],
    totalPrice: { 
        type: Number, 
        default: 0 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Cart', cartSchema);
