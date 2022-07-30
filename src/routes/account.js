const express = require('express');
const router = express.Router();

const { signUp } = require('../controllers/account');

// @route    POST api/v1/product
// @desc     POST create product
// @access   Public
router.post('/', signUp);

module.exports = router;
