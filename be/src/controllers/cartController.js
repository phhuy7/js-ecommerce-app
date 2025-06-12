const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get current user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { user: req.user._id, items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add or update item in cart
const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }
    const itemIndex = cart.items.findIndex(i => i.product === product);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { product } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.items = cart.items.filter(i => i.product !== product);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart
};