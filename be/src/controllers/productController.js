const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock, material, weight, size, style, tags } = req.body;

    // Check if product already exists
    let product = await Product.findOne({ name });
    if (product) {
      return res.status(400).json({ msg: 'Product already exists' });
    }

    // Create new product
    product = new Product({ name, description, price, imageUrl, category, stock, material, weight, size, style, tags });
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updateFields = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.status(200).json({ msg: 'Product deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};