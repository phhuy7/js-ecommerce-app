// server.js
const mongoose = require('mongoose');
const app = require('./app'); // Import the app from app.js

require('dotenv').config(); // Load environment variables from .env file


// MongoDB connection URI from .env
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
