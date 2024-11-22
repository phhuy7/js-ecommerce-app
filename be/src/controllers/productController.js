const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const {
        name, 
        cardType,
        price,
        description,
        rarity,
        imgUrl,
        setName,
    } = req.body;

    // Create new product
    product = new Product({
        name, 
        cardType,
        price,
        description,
        rarity,
        imgUrl,
        setName,
    });
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
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
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
    const {
        name, 
        cardType,
        price,
        description,
        rarity,
        imgUrl,
        setName,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name, 
        cardType,
        price,
        description,
        rarity,
        imgUrl,
        setName
    },
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
