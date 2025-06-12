const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

// Category schema
const categorySchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4, // Generate UUID for the category _id
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Category', categorySchema);