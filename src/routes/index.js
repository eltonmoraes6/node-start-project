const { Router } = require('express');
const router = Router();

router.use('/api/v1/person', require('./person'));
router.use('/api/v1/home', require('./home'));

module.exports = router;
