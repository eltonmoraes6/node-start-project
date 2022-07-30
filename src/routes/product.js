const express = require('express');
const router = express.Router();

const {
  index,
  store,
  show,
  destroy,
  update,
} = require('../controllers/product');

const { ensureAuthorized } = require('../middleware/auth');

// @route    GET api/v1/product
// @desc     Get all products
// @access   Private
router.get('/', ensureAuthorized, index);

// @route    POST api/v1/product
// @desc     POST create product
// @access   Private
router.post('/', ensureAuthorized, store);

// @route    GET api/v1/product/:id
// @desc     GET create product
// @access   Private
router.get('/:id', ensureAuthorized, show);

// @route    DELETE api/v1/product/:id
// @desc     DELETE create product
// @access   Private
router.delete('/:id', ensureAuthorized, destroy);

// @route    PATCH api/v1/product/:id
// @desc     PATCH create product
// @access   Private
router.patch('/:id', ensureAuthorized, update);

module.exports = router;
