const express = require('express');
const apiRoutes = require('./api');

const router = express.Router();

router.use('/resume', apiRoutes);

module.exports = router;
