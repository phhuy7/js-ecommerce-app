const Role = require('../models/Role');

// Create a new role
const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if role already exists
    let role = await Role.findOne({ name });
    if (role) {
      return res.status(400).json({ msg: 'Role already exists' });
    }

    // Create new role
    role = new Role({ name, description });
    await role.save();

    res.status(201).json(role);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a role
const updateRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }
    res.status(200).json({ msg: 'Role deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
