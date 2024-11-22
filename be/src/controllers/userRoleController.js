const UserRole = require('../models/UserRole');

// Create a new userRole
const createUserRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    userRole = new UserRole({ userId, roleId });
    await userRole.save();

    res.status(201).json(userRole);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all userRoles
const getUserRoles = async (req, res) => {
  try {
    const userRoles = await UserRole.find();
    res.status(200).json(userRoles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single userRole by ID
const getUserRoleById = async (req, res) => {
  try {
    const userRole = await UserRole.findById(req.params.id);
    if (!userRole) {
      return res.status(404).json({ msg: 'UserRole not found' });
    }
    res.status(200).json(userRole);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a userRole
const updateUserRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userRole = await UserRole.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!userRole) {
      return res.status(404).json({ msg: 'UserRole not found' });
    }
    res.status(200).json(userRole);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a userRole
const deleteUserRole = async (req, res) => {
  try {
    const userRole = await UserRole.findByIdAndDelete(req.params.id);
    if (!userRole) {
      return res.status(404).json({ msg: 'UserRole not found' });
    }
    res.status(200).json({ msg: 'UserRole deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUserRole,
  getUserRoles,
  getUserRoleById,
  updateUserRole,
  deleteUserRole,
};
