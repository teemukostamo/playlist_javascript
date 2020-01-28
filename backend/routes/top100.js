const express = require('express');
const verifyUser = require('../middleware/auth');
const router = express.Router();

const { getTop100 } = require('../controllers/top100');

router.route('/').get(verifyUser, getTop100);

module.exports = router;
