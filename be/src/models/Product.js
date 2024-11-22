const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
  _id: {  // Override the default `_id` field to use UUID
    type: String,
    default: uuidv4,  // Generate UUID for the identifier
  },
  name: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
    enum: ['Monster', 'Spell', 'Trap']
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: { 
    type: String 
  },
  rarity: { 
    type: String, 
    enum: ['Common', 'Rare', 'Super Rare', 'Ultra Rare', 'Secret Rare', 'Holofoil Rare', 'Pharaoh Rare',
        'Ultimate Rare', 'Platinum Secret Rare', 'Quarter Century Rare', 'Prismatic Secret Rare',
        'Starfoil Rare', 'Ghost Rare', 'Gold Ultra Rare','Starlight Rare'
    ], 
    default: 'Common' 
  },
  imgUrl: {
    type: String,
  },
  setName: {
    type: String,
  }
},
    {
        timestamp: true,
    },

);

module.exports = mongoose.model('Product', productSchema);