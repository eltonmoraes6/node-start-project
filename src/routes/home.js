const express = require('express');
const router = express.Router();

const { index } = require('../controllers/home');

// @route    GET api/v1/home
// @desc     Get all home
// @access   Private
router.get('/', index);

module.exports = router;
