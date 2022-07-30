const { Router } = require('express');
const router = Router();

router.use('/api/v1/person', require('./person'));
router.use('/api/v1/home', require('./home'));
router.use('/api/v1/products', require('./product'));
router.use('/api/v1/account', require('./account'));
router.use('/api/v1/users', require('./authentication'));

module.exports = router;
