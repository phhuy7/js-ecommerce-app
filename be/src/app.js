const express = require('express');
const cors = require('cors'); // Optional: for Cross-Origin Resource Sharing
const permissionRoutes = require('./routes/permissionRoutes'); // Permission routes
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const rolePermissionRoutes = require('./routes/rolePermissionRoutes');
const userAddressRoutes = require('./routes/userAddressRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const app = express();

// Middleware setup
app.use(express.json()); // To parse JSON data in request bodies
app.use(cors()); // Enable CORS if you plan to allow cross-origin requests

// Routes
app.use('/api/permission', permissionRoutes); // Mounting permission routes on '/api/permissions'
app.use('/api/role', roleRoutes);  // Mounting role routes on '/api/roles'
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/userRole', userRoleRoutes);
app.use('/api/rolePermission', rolePermissionRoutes);
app.use('/api/userAddress', userAddressRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

// Default route for root
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

module.exports = app;
