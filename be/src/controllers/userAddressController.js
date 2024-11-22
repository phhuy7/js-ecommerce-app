const UserAddress = require('../models/UserAddress');

// Create a new userAddress
const createUserAddress = async (req, res) => {
  try {
    const { userId,
        type,
        street,
        city,
        state,
        postalCode,
        country,
        isDefault
    } = req.body;

    if(isDefault) {
        await UserAddress.updateMany({userId: userId}, {$set: {isDefault: false}});
    }

    // Create new userAddress
    userAddress = new UserAddress({ 
        userId: userId,
        type,
        street,
        city,
        state,
        postalCode,
        country,
        isDefault
     });
    await userAddress.save();

    res.status(201).json(userAddress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get addresses by UserId
const getUserAddresses = async (req, res) => {
    try {
        const userId = req.params.id
        const userAddress = await UserAddress.find({userId: userId});
        if (!userAddress) {
            return res.status(404).json({ msg: 'User Addreses not found' });
        }
        res.status(200).json(userAddress);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
  };

// Update a userAddress
const updateUserAddress = async (req, res) => {
  try {
    const { userId,
        type,
        street,
        city,
        state,
        postalCode,
        country,
        isDefault
    } = req.body;
    const userAddress = await UserAddress.findByIdAndUpdate(
      req.params.id,
      { userId,
        type,
        street,
        city,
        state,
        postalCode,
        country,
        isDefault },
      { new: true }
    );
    if (!userAddress) {
      return res.status(404).json({ msg: 'UserAddress not found' });
    }
    res.status(200).json(userAddress);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a userAddress
const deleteUserAddress = async (req, res) => {
  try {
    const userAddress = await UserAddress.findByIdAndDelete(req.params.id);
    if (!userAddress) {
      return res.status(404).json({ msg: 'UserAddress not found' });
    }
    res.status(200).json({ msg: 'UserAddress deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createUserAddress,
  getUserAddresses,
  updateUserAddress,
  deleteUserAddress,
};
