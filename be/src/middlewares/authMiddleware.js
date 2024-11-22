const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken'); // Ensure this is imported

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized: Token is blacklisted.' });
    }

    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload to the request
    req.user = decoded;

    // Optionally, fetch the full user data from the database
    const user = await User.findById(decoded.userId); // `decoded.userId` should match what you encoded in the JWT
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Attach the user document to the request for further use
    req.user = user;
    next();
  } catch (err) {
    console.error(err); // Log errors for debugging
    return res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
