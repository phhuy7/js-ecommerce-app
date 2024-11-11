const Permission = require('../models/Permission');

// Create a new permission
const createPermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if permission already exists
    let permission = await Permission.findOne({ name });
    if (permission) {
      return res.status(400).json({ msg: 'Permission already exists' });
    }

    // Create new permission
    permission = new Permission({ name, description });
    await permission.save();

    res.status(201).json(permission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all permissions
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single permission by ID
const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ msg: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a permission
const updatePermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ msg: 'Permission not found' });
    }
    res.status(200).json(permission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a permission
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).json({ msg: 'Permission not found' });
    }
    res.status(200).json({ msg: 'Permission deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createPermission,
  getPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
};
