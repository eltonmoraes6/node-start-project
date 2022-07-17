const express = require('express');
const router = express.Router();

const {
  index,
  show,
  store,
  update,
  destroy,
} = require('../controllers/person');

// @route    person api/v1/person
// @desc     Create a person
// @access   public
router.post('/', store);
// @route    GET api/v1/person
// @desc     Get all persons
// @access   public
router.get('/', index);
// @route    GET api/v1/person
// @desc     Get person by ID
// @access   public
router.get('/:id', show);
// @route    PUT api/v1/person/person/:id
// @desc     person a person
// @access   public
router.put('/:id', update);
// @route    DELETE api/v1/person
// @desc     Delete person
// @access   public
router.delete('/:id', destroy);

module.exports = router;
