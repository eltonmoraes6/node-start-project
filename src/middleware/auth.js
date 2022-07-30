const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/environmentVariable');

module.exports = {
  ensureAuthorized: async (req, res, next) => {
    try {
      let token =
        req.body.token ||
        req.body.query ||
        req.headers['x-access-token'] ||
        req.headers['authorization'] ||
        req.header('x-auth-token');

      if (!token) {
        return res
          .status(404)
          .json({ errors: [{ success: false, msg: 'Token not found' }] });
      }

      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }

      if (token) {
        //verify token
        jwt.verify(token, SECRET, (err, decoded) => {
          if (err) {
            res
              .status(401)
              .json({ errors: [{ success: false, msg: 'Token invalid' }] });
          } else {
            req.decoded = decoded;
            next();
          }
        });
      }
    } catch (err) {
      console.log(err);
      // res.status(500).json([{ msg: 'Server Error' }]);
      return res.status(401).json({ success: false, msg: error.message });
    }
  },
};
