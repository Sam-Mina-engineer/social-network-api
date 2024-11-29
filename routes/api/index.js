const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// User routes

router.use('/users', userRoutes);

// Thought routes

router.use('/thoughts', thoughtRoutes);

module.exports = router;


