const router = require('express').Router();
const apiRoutes = require('./api');

// API routes

router.use('/api', apiRoutes);

// Path for Wrong Route

router.use((req, res) => {
  res.status(404).send("<h1>Incorrect route</h1>");
});

module.exports = router;
