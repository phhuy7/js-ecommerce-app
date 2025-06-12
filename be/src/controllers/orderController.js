const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

const allowedStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];

// Place an order from the user's cart
const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Get shipping address from request body
    const {
      name,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    } = req.body.shippingAddress || {};

    if (!name || !phone || !addressLine1 || !city || !postalCode || !country) {
      return res.status(400).json({ message: 'Shipping address is incomplete' });
    }

    // Calculate total and snapshot prices
    let total = 0;
    const items = cart.items.map(item => {
      total += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const order = new Order({
      user: req.user._id,
      items,
      total,
      status: 'pending',
      shippingAddress: {
        name,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
      },
    });

    await order.save();
    // Optionally clear cart after order
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// (Admin) Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.product user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// (Admin) Update order status with validation and transition check
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Prevent updating a cancelled or delivered order
    if (['cancelled', 'delivered'].includes(order.status)) {
      return res.status(400).json({ message: `Cannot update a ${order.status} order` });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateOrderStatus };