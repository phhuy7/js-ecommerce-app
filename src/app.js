const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Optional: for Cross-Origin Resource Sharing
const permissionRoutes = require('./routes/permissionRoutes'); // Permission routes
const roleRoutes = require('./routes/roleRoutes');

const app = express();

// Middleware setup
app.use(express.json()); // To parse JSON data in request bodies
app.use(cors()); // Enable CORS if you plan to allow cross-origin requests

// Routes
app.use('/api/permissions', permissionRoutes); // Mounting permission routes on '/api/permissions'
app.use('/api/roles', roleRoutes);  // Mounting role routes on '/api/roles'

// Default route for root
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

module.exports = app;
