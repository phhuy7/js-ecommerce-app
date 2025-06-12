const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product: { type: String, ref: 'Product', required: true }, // UUID
  quantity: { type: Number, default: 1, min: 1 },
});

const cartSchema = new Schema({
  user: { type: String, ref: 'User', required: true, unique: true }, // UUID
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Cart', cartSchema);