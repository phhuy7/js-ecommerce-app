const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const orderSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },
    items: [{
        productId: { type: String, required: true, ref: 'Product' },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        total: { type: Number, required: true },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAddress',
        required: true,
    },
    paymentDetails: {
        method: { type: String, enum: ['Credit Card', 'PayPal', 'COD'], required: true },
        transactionId: { type: String },
        status: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Processing',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    deliveredDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Order', orderSchema);
