const express = require('express');
const connectDB = require('./config/connection'); // Import the connection function
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use(routes);

// Connect to MongoDB and start the server

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
