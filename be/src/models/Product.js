const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

// Product schema for a silver jewellery shop
const productSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4, // Generate UUID for the product _id
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      ref: 'Category', // Reference to Category by UUID
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    material: {
      type: String,
      default: 'Silver',
    },
    weight: {
      type: Number, // in grams
      min: 0,
    },
    size: {
      type: String, // e.g., "6", "7", "Adjustable", "Medium", etc.
      default: '',
    },
    style: {
      type: String, // e.g., "Ring", "Necklace", "Bracelet", etc.
      default: '',
    },
    tags: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);