const Cart = require("../models/Cart");
const Product = require("../models/Product");


// Add item to cart
const addToCart = async (req, res) => {
    const userId = req.user._id; // Assume userId is extracted from a decoded JWT token
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({ userId, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId === productId);

        if (itemIndex > -1) {
        // If item exists in cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
        } else {
        // Else, add the item to the cart
            cart.items.push({
                productId,
                name: product.name,
                price: product.price,
                quantity,
                imgUrl: product.imgUrl,
            });
        }

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to add to cart", error: err.message });
    }
};

// Get user cart
const getCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve cart", error: err.message });
    }
};

// Update item quantity
const updateCartItem = async (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId === productId);

        if (itemIndex > -1) {
            if (quantity <= 0) {
            // Remove item if quantity is zero or less
            cart.items.splice(itemIndex, 1);
            } else {
                // Update the quantity
                cart.items[itemIndex].quantity = quantity;
            }

            // Recalculate the total price
            cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Item not found in cart" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update cart", error: err.message });
    }
};

// Remove item from cart
const removeCartItem = async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter((item) => item.productId !== productId);

        // Recalculate the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to remove item", error: err.message });
    }
};

// Clear the cart
const clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: "Failed to clear cart", error: err.message });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
};
