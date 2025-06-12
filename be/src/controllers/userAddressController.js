const UserAddress = require('../models/userAddress');

// Create a new address
const createAddress = async (req, res) => {
  try {
    const { name, phone, addressLine1, addressLine2, city, state, postalCode, country, isDefault } = req.body;
    const address = new UserAddress({
      user: req.user._id,
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault: !!isDefault,
    });

    // If isDefault, unset previous default addresses for this user
    if (isDefault) {
      await UserAddress.updateMany(
        { user: req.user._id, isDefault: true },
        { $set: { isDefault: false } }
      );
    }

    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all addresses for current user
const getAddresses = async (req, res) => {
  try {
    const addresses = await UserAddress.find({ user: req.user._id });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single address by ID
const getAddressById = async (req, res) => {
  try {
    const address = await UserAddress.findOne({ _id: req.params.id, user: req.user._id });
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an address
const updateAddress = async (req, res) => {
  try {
    const { isDefault } = req.body;
    if (isDefault) {
      await UserAddress.updateMany(
        { user: req.user._id, isDefault: true },
        { $set: { isDefault: false } }
      );
    }
    const address = await UserAddress.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const address = await UserAddress.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!address) return res.status(404).json({ message: 'Address not found' });
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};