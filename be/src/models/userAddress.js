const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const userAddressSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4, // UUID for each address
    },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true, // Recipient's name
    },
    phone: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserAddress', userAddressSchema);