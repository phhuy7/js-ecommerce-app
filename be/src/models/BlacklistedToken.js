// Store in Redis for better performance
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlacklistedTokenSchema = new Schema({
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// TTL Index to automatically delete expired tokens
BlacklistedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);
