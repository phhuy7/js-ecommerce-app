const RolePermission = require('../models/RolePermission');

// Create a new rolePermission
const createRolePermission = async (req, res) => {
  try {
    const { roleId, permissionId } = req.body;

    const rolePermission = new RolePermission({ roleId, permissionId });
    await rolePermission.save();

    // Option 1: Use a single populate with an array
    await rolePermission.populate([
      { path: 'roleId', select: 'name' },
      { path: 'permissionId', select: 'name' }
    ]);

    res.status(201).json(rolePermission);

    // Option 2: Re-fetch and populate (alternative)
    // const populatedRolePermission = await RolePermission.findById(rolePermission._id)
    //   .populate('roleId', 'name')
    //   .populate('permissionId', 'name');
    // res.status(201).json(populatedRolePermission);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all rolePermissions
const getRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.find()
      .populate('roleId', 'name')
      .populate('permissionId', 'name');
    res.status(200).json(rolePermissions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single rolePermission by ID
const getRolePermissionById = async (req, res) => {
  try {
    const rolePermission = await RolePermission.findById(req.params.id)
      .populate('roleId', 'name')
      .populate('permissionId', 'name');
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
    const { roleId, permissionId } = req.body;
    const rolePermission = await RolePermission.findByIdAndUpdate(
      req.params.id,
      { roleId, permissionId },
      { new: true }
    ).populate('roleId', 'name').populate('permissionId', 'name');
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