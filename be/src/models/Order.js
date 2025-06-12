const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
  product: { type: String, ref: 'Product', required: true }, // UUID
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // snapshot at order time
});

// Add shippingAddress snapshot to orderSchema
const shippingAddressSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String, default: '' },
  city: { type: String, required: true },
  state: { type: String, default: '' },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

// ...existing code...
const orderSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentStatus: { type: String, default: 'unpaid', enum: ['unpaid', 'paid', 'failed'] },
  paymentDetails: { type: Object, default: {} }, // e.g., transactionId, provider, etc.
  shippingAddress: { type: shippingAddressSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);