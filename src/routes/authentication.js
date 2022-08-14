const express = require('express');
const router = express.Router();

const {
  login,
  refreshToken,
  logout,
} = require('../controllers/authentication');
const { ensureAuthorized } = require('../middleware/auth');

// @route    POST api/v1/user
// @desc     POST create user
// @access   Public
router.post('/login', login);

// @route    POST api/v1/user
// @desc     POST create user
// @access   Public
router.post('/refresh', refreshToken);

// @route    POST api/v1/user
// @desc     POST create user
// @access   Private
router.post('/logout', ensureAuthorized, logout);

module.exports = router;
