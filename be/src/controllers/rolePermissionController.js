const RolePermission = require('../models/RolePermission');

// Create a new rolePermission
const createRolePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    // Create new rolePermission
    rolePermission = new RolePermission({ roleId, permissionId });
    await rolePermission.save();

    res.status(201).json(rolePermission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all rolePermissions
const getRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.find();
    res.status(200).json(rolePermissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single rolePermission by ID
const getRolePermissionById = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findById(req.params.id);
    if (!rolePermission) {
      return res.status(404).json({ msg: 'RolePermission not found' });
    }
    res.status(200).json(rolePermission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a rolePermission
const updateRolePermission = async (req, res) => {
  try {
    const { name, description } = req.body;
    const rolePermission = await RolePermission.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!rolePermission) {
      return res.status(404).json({ msg: 'RolePermission not found' });
    }
    res.status(200).json(rolePermission);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a rolePermission
const deleteRolePermission = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findByIdAndDelete(req.params.id);
    if (!rolePermission) {
      return res.status(404).json({ msg: 'RolePermission not found' });
    }
    res.status(200).json({ msg: 'RolePermission deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createRolePermission,
  getRolePermissions,
  getRolePermissionById,
  updateRolePermission,
  deleteRolePermission,
};
