const Order = require('../models/Order');
const Product = require('../models/Product');
const UserAddress = require('../models/UserAddress');

// Create an order
const createOrder = async (req, res) => {
  const userId = req.user._id
  const { items, shippingAddress, paymentDetails } = req.body;

  try {
    // Validate that the shipping address exists
    const address = await UserAddress.findById(shippingAddress);
    if (!address) {
      return res.status(400).json({ message: 'Invalid shipping address' });
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];
    
    for (let item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(400).json({ message: `Product ${item.productId} not found` });
      }

      const total = product.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        total
      });

      totalAmount += total;
    }

    // Create the order
    const newOrder = new Order({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentDetails,
      orderStatus: 'Processing', // default status
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

// Get a single order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order', error: err.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
  if (!validStatuses.includes(orderStatus)) {
    return res.status(400).json({ message: 'Invalid order status' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = orderStatus;
    if (orderStatus === 'Delivered') {
      order.deliveredDate = new Date(); // Add delivered date when shipped
    }

    await order.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status', error: err.message });
  }
};

// Delete an order (optional)
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.remove();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};
