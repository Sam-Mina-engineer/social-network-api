const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use(routes);

// Server starting and connecting to Mongo

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running at ${PORT}!`);
  });
});

db.on('error', (err) => {
  console.error('MongoDB error:', err);
});

