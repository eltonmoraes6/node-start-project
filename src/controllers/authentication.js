const User = require('../models/account');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {
  SECRET,
  REFRESH_TOKEN_SECRET,
} = require('../config/environmentVariable');

let refreshTokens = [];

module.exports = {
  // Login User -> /users/login -> POST
  //authenticated: false
  login: [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        const user = await User.findOne({
          where: {
            email: email,
          },
        });

        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ message: 'Invalid Credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const payload = {
            email: user.email,
            id: user._id,
            name: user.name,
            familyName: user.familyName,
          };
          // Send JWT access token
          const accessToken = jwt.sign(payload, SECRET, {
            expiresIn: '15m',
          });

          // Refresh token
          const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: '1d',
          });

          // Set refersh token in refreshTokens array
          refreshTokens.push(refreshToken);

          res.json({
            message: 'User authenticated!',
            success: true,
            auth: true,
            accessToken,
            refreshToken,
          });
        } else {
          return res.status(400).json({
            errors: [{ success: false, message: 'Invalid Credentials' }],
          });
        }
      } catch (err) {
        console.log(err.message);
        res.status(500).json({
          errors: [{ success: false, message: 'Server Error', err }],
        });
      }
    },
  ],

  refreshToken: async (req, res) => {
    let refreshToken =
      req.body.refreshToken ||
      req.body.query ||
      req.headers['x-access-token'] ||
      req.headers['authorization'] ||
      req.header('x-auth-token');

    // If token is not provided, send error message
    if (!refreshToken) {
      return res.status(401).json({
        errors: [
          {
            msg: 'Token not found',
          },
        ],
      });
    }

    // // If token does not exist, send error message
    // if (!refreshTokens.includes(refreshToken)) {
    //   console.log('refreshTokens: ', refreshTokens);
    //   return res.status(403).json({
    //     errors: [
    //       {
    //         msg: 'Invalid refresh token',
    //       },
    //     ],
    //   });
    // }

    try {
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            success: false,
            errors: [
              {
                msg: 'Invalid token,try login again',
              },
            ],
          });
        }

        const payload = {
          email: decoded.email,
          id: decoded._id,
          name: decoded.name,
          familyName: decoded.familyName,
        };

        const accessToken = jwt.sign(payload, SECRET, { expiresIn: '15m' });
        // console.log('accessToken: ', accessToken);
        res.status(200).json({ success: true, accessToken, refreshToken });
      });
    } catch (error) {
      console.log('error: ', error);
      res.status(401).json({
        errors: [
          {
            msg: 'Invalid token',
          },
        ],
      });
    }
  },

  // Logout User -> /users/logout -> POST
  //authenticated: false
  logout: async (req, res) => {
    const { decoded } = req;
    try {
      // console.log('logout: ', decoded);
      // req.decoded.token = req.user.token.filter((token) => {
      //   return token.token !== req.token;
      // });
      // await req.user.save();
      let refreshToken =
        req.body.token ||
        req.body.query ||
        req.headers['x-access-token'] ||
        req.headers['authorization'] ||
        req.header('x-auth-token');
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      res.send();
    } catch (error) {
      console.log(error.message);
      res.status(500).send();
    }
  },
};
