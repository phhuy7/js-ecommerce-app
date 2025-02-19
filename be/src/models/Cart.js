const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');


const cartItemSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4,
    },
    productId: {
        type: String,
        required: true,
        ref: 'Product',
    },
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true,
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1, 
        default: 1,
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
        default: 0, 
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
