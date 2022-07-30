const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const database = require('../config/db');
const Account = require('../models/account');
const { SECRET } = require('../config/environmentVariable');

module.exports = {
  // Account register -> api/v1/account/signup -> POST
  //authenticated: false
  signUp: [
    check('name', 'Name is required').not().isEmpty(),
    check('familyName', 'Family Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters')
      .isLength({
        min: 6,
        max: 30,
      })
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.confirmPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, familyName, email, password } = req.body;
      try {
        await database.sync();
        const user = await Account.findOne({
          email,
        });
        if (user) {
          errors.email = 'Email already exists';
          return res.status(400).json(errors);
        } else {
          const newUser = new Account({
            name,
            email,
            givenName: name,
            familyName: familyName,
            password,
          });
          bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              const user = await newUser.save();
              res.status(201).json({
                data: {
                  name: user.name,
                  familyName: user.familyName,
                  email: user.email,
                },
                success: true,
                message: 'Account registered!',
              });
            });
          });
        }
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ errors: [{ success: false, message: 'Server Error' }] });
      }
    },
  ],
};
