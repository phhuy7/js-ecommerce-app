const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

// Permission schema
const roleSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4,  // Generate UUID for the role _id
    },
    name: {
      type: String,
      required: true,
      unique: true, // Ensure unique role names
    },
    description: {
      type: String,
      default: '',  // Optional description
    },
  },
  {
    timestamps: true,  // Automatically handle createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Role', roleSchema);
