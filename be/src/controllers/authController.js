const { validationResult } = require('express-validator');
const User = require('../models/User');
const UserRole = require('../models/UserRole');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const BlacklistedToken = require('../models/BlacklistedToken');

// In-memory store for reset tokens (for demo/dev only)
const resetTokens = {};

// Register User
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, username, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already exists' });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Assign plain password, let pre-save hook hash it
    const user = new User({
      email,
      username,
      password,
    });

    await user.save();

    let userRole = await Role.findOne({ name: 'USER' });

    const userRoleAssignment = new UserRole({
      userId: user._id,
      roleId: userRole._id,
    });

    await userRoleAssignment.save();

    const token = jwt.sign(
      { userId: user._id, roleId: userRole._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

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

// Login User
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Use the model's matchPassword method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const userRoleAssignment = await UserRole.find({ userId: user._id });
    const roles = await Promise.all(
      userRoleAssignment.map(async (assignment) => {
        const role = await Role.findById(assignment.roleId);
        return role.name;
      })
    );

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: roles,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Logout User
const logoutUser = async (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const blacklistedToken = new BlacklistedToken({
      token,
      expiresAt: new Date(decoded.exp * 1000)
    });

    await blacklistedToken.save();

    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

// Forgot Password: Generate token and return it in the response
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000;
    resetTokens[token] = { userId: user._id, expires };

    // For dev: return the token in the response
    res.json({ message: 'Password reset token generated', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const data = resetTokens[token];
    if (!data || data.expires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(data.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Assign plain password, let pre-save hook hash it
    user.password = newPassword;
    await user.save();

    delete resetTokens[token];

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Change Password: User must be authenticated
const changePassword = async (req, res) => {
  try {
    const userId = req.user._id; // Assumes auth middleware sets req.user
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new password are required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Use the model's matchPassword method
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword; // Assign plain password
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  changePassword,
};