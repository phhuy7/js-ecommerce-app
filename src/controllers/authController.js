const { validationResult } = require('express-validator');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already exists' });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    const user = new User({
      email,
      username,
      password, // Password will be hashed automatically due to pre-save hook
    });

    // Save the user
    await user.save();

    // Assign 'USER' role to the user
    let userRole = await Role.findOne({ name: 'USER' });
    if (!userRole) {
      userRole = new Role({
        name: 'USER',
        description: 'Default role for regular users',
      });
      await userRole.save();
    }

    const userRoleAssignment = new UserRole({
      userId: user._id,
      roleId: userRole._id,
    });

    await userRoleAssignment.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, roleId: userRole._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send response
    res.status(201).json({
      msg: 'User registered successfully',
      token,
      user,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
